import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, OrbitControls, Environment, Points, PointMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const DNAHelix = () => {
    const helixRef = useRef();
    const numSpheres = 30;
    const radius = 2;
    const height = 10;
    const step = height / numSpheres;

    const spheres = useMemo(() => {
        const arr = [];
        for (let i = 0; i < numSpheres; i++) {
            const y = i * step - height / 2;
            const angle = (i / numSpheres) * Math.PI * 4;

            // First strand
            arr.push({
                position: [Math.cos(angle) * radius, y, Math.sin(angle) * radius],
                color: i % 2 === 0 ? '#6366f1' : '#ec4899',
            });

            // Second strand (opposite side)
            const angle2 = angle + Math.PI;
            arr.push({
                position: [Math.cos(angle2) * radius, y, Math.sin(angle2) * radius],
                color: i % 2 === 0 ? '#ec4899' : '#6366f1',
            });
        }
        return arr;
    }, [numSpheres, radius, height, step]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (helixRef.current) {
            helixRef.current.rotation.y = t * 0.5;
            helixRef.current.position.y = Math.sin(t * 0.2) * 0.5;
        }
    });

    return (
        <group ref={helixRef} rotation={[0, 0, Math.PI / 6]}>
            {spheres.map((s, i) => (
                <mesh key={i} position={s.position}>
                    <sphereGeometry args={[0.15, 16, 16]} />
                    <meshStandardMaterial color={s.color} emissive={s.color} emissiveIntensity={0.5} />
                </mesh>
            ))}
            {/* Connecting bars */}
            {Array.from({ length: numSpheres }).map((_, i) => {
                if (i % 2 !== 0) return null;
                const y = i * step - height / 2;
                const angle = (i / numSpheres) * Math.PI * 4;
                return (
                    <mesh key={`bar-${i}`} position={[0, y, 0]} rotation={[0, angle, Math.PI / 2]}>
                        <cylinderGeometry args={[0.02, 0.02, radius * 2, 8]} />
                        <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
                    </mesh>
                );
            })}
        </group>
    );
};

const BackgroundParticles = () => {
    const count = 1000;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return pos;
    }, []);

    return (
        <Points positions={positions} stride={3}>
            <PointMaterial
                transparent
                color="#ffffff"
                size={0.05}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.4}
            />
        </Points>
    );
};

const Scene = () => {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} color="#6366f1" intensity={2} />

            <DNAHelix />
            <BackgroundParticles />

            <Environment preset="city" />
        </>
    );
};

const Layout = ({ children }) => {
    return (
        <div className="app">
            <div className="canvas-container">
                <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                    <Suspense fallback={null}>
                        <Scene />
                        <OrbitControls enableZoom={false} enablePan={false} />
                    </Suspense>
                </Canvas>
            </div>

            <div className="container">
                <nav>
                    <motion.div
                        className="logo"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>GENOMIX</Link>
                    </motion.div>
                    <motion.div
                        className="nav-links"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <a href="#contact">Contact</a>
                    </motion.div>
                </nav>
                {children}
            </div>
        </div>
    );
};

export default Layout;

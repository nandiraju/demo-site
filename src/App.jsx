import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, OrbitControls, Environment, Points, PointMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Dna, Shield, Activity, Database, ArrowRight } from 'lucide-react';

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

function App() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

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
                        GENOMIX
                    </motion.div>
                    <motion.div
                        className="nav-links"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <a href="#features">Analysis</a>
                        <a href="#about">Bio-Bank</a>
                        <a href="#contact">Contact</a>
                    </motion.div>
                </nav>

                <motion.section
                    className="hero"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        className="badge"
                        variants={itemVariants}
                        style={{
                            background: 'rgba(99, 102, 241, 0.1)',
                            padding: '0.5rem 1rem',
                            borderRadius: '2rem',
                            border: '1px solid rgba(99, 102, 241, 0.2)',
                            fontSize: '0.8rem',
                            marginBottom: '1rem',
                            display: 'inline-block'
                        }}
                    >
                        The Next Evolution in Personal Health
                    </motion.div>
                    <motion.h1 variants={itemVariants}>
                        Decode Your <br /> Future Today.
                    </motion.h1>
                    <motion.p variants={itemVariants}>
                        Unlock the secrets hidden in your DNA. Genomix provides
                        cutting-edge genetic insights with unprecedented accuracy and security.
                    </motion.p>
                    <motion.div variants={itemVariants}>
                        <a href="#" className="cta-button">
                            Start Decoding <ArrowRight size={18} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
                        </a>
                    </motion.div>
                </motion.section>

                <section id="features" className="features">
                    {[
                        { icon: <Activity />, title: "Live Synthesis", text: "Real-time genetic sequencing delivered straight to your mobile device." },
                        { icon: <Shield />, title: "Bio-Encryption", text: "Quantum-grade security for your most personal biological data." },
                        { icon: <Database />, title: "Helix Storage", text: "Decentralized storage ensuring your genetic map is forever yours." }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            className="feature-card"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            whileHover={{ scale: 1.05, translateY: -10 }}
                        >
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.text}</p>
                        </motion.div>
                    ))}
                </section>
            </div>
        </div>
    );
}

export default App;

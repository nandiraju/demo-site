import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Shield, Database, ArrowRight } from 'lucide-react';

const Home = () => {
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

            <section id="features" className="features" style={{ width: '100%', marginTop: '4rem' }}>
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
        </motion.section>
    );
};

export default Home;

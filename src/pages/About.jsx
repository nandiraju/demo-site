import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Rocket, Award } from 'lucide-react';

const About = () => {
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
            className="about-page"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ paddingTop: '4rem', paddingBottom: '8rem' }}
        >
            <motion.h1 variants={itemVariants} style={{ fontSize: '4rem', marginBottom: '2rem' }}>
                About Genomix
            </motion.h1>
            <motion.p variants={itemVariants} style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '800px', marginBottom: '4rem' }}>
                We are a team of scientists, engineers, and dreamers dedicated to making the power of genetic information accessible to everyone. Our mission is to empower individuals with the data they need to live longer, healthier lives.
            </motion.p>

            <div className="features" style={{ width: '100%' }}>
                {[
                    { icon: <Users />, title: "Expert Team", text: "Led by world-class geneticists and software architects." },
                    { icon: <Target />, title: "Precision", text: "Achieving 99.99% accuracy in all our genetic analysis reports." },
                    { icon: <Rocket />, title: "Innovation", text: "Constantly pushing the boundaries of biotechnology." },
                    { icon: <Award />, title: "Certified", text: "Fully accredited by international health and data security boards." }
                ].map((stat, index) => (
                    <motion.div
                        key={index}
                        className="feature-card"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, translateY: -10 }}
                    >
                        <div className="feature-icon">{stat.icon}</div>
                        <h3>{stat.title}</h3>
                        <p>{stat.text}</p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default About;

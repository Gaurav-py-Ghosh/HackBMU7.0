import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './about.css';

const About = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 100 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.7 + 0.3
      }));
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="hackathon-container">
      <div className="particle-background">
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            className="particle"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity
            }}
            animate={{
              x: [0, Math.random() * 20 - 10, 0],
              y: [0, Math.random() * 20 - 10, 0],
              opacity: [particle.opacity, 0.1, particle.opacity]
            }}
            transition={{
              duration: particle.speed * 10,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="holographic-effect">
        <div className="orbit-large"></div>
        <div className="orbit-small"></div>
      </div>

      <motion.div 
        className="content-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h1 className="title">About Us</h1>
          
          <p className="description">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis, quod eligendi, repellat aspernatur in accusantium iste soluta obcaecati ipsum nemo vitae deleniti sunt sequi illum dolorem perspiciatis! Tempore, reprehenderit expedita!
            Fugit nihil ad aperiam praesentium incidunt beatae at nostrum laboriosam, placeat temporibus aut facere nulla quas natus officiis, in animi consectetur saepe. Accusamus porro iure molestias aliquam, rem ipsa ex!
            Quos, obcaecati sequi atque dicta adipisci fugiat assumenda nulla nemo libero deserunt consequuntur soluta magnam rem praesentium, officiis error voluptate, cumque explicabo voluptatum magni quam nobis numquam. Beatae, quis atque?
          </p>
          
          <div className="button-container">
            <button className="explore-button">
              <span className="button-glow"></span>
              Explore Quantum Realms
              
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;

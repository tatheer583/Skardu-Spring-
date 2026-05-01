'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { IoWaterOutline } from 'react-icons/io5';
import { HiArrowRight } from 'react-icons/hi';
import styles from './Hero.module.css';

export default function Hero() {
  const containerRef = useRef(null);
  const [particles, setParticles] = useState([]);

  // Generate particle data in useEffect to avoid purity issues during render
  useEffect(() => {
    const data = [...Array(12)].map((_, i) => ({
      id: i,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    
    // Set state asynchronously to avoid cascading render warning
    Promise.resolve().then(() => setParticles(data));
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: custom * 0.2, 
        duration: 0.8, 
        ease: [0.33, 1, 0.68, 1] 
      }
    })
  };

  return (
    <section className={`${styles.hero} premium-noise`} id="hero-section" ref={containerRef}>
      {/* Background Image with Parallax */}
      <motion.div 
        className={styles.heroBg}
        style={{ y, scale }}
      >
        <Image
          src="/images/climber-peak.png"
          alt="Mountain climber at peak with Skardu Spring"
          fill
          priority
          quality={90}
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div className={styles.heroOverlay}></div>

      {/* Floating Water Particles */}
      <div className={styles.particles}>
        {particles.map((particle) => (
          <motion.div 
            key={`particle-${particle.id}`} 
            className={styles.particle}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
            style={{
              left: particle.left,
              top: particle.top,
            }}
          ></motion.div>
        ))}
      </div>

      {/* Content */}
      <motion.div 
        className={styles.heroContent}
        style={{ opacity }}
      >
        <motion.div 
          className={styles.heroLabel}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <IoWaterOutline />
          <span>Premium Natural Mineral Water</span>
        </motion.div>

        <motion.h1 
          className={styles.heroTitle}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          Experience <span className={styles.heroTitleAccent}>Absolute</span> <br />
          Purity.
        </motion.h1>

        <motion.p 
          className={styles.heroDesc}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          Born from the crystalline heart of the Karakoram glaciers. 
          A 10,000-year journey of natural filtration, delivered 
          directly to your urban doorstep.
        </motion.p>

        <motion.div 
          className={styles.heroCtas}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <Link href="/shop" className={`${styles.ctaPrimary} glass-card`} id="hero-cta-shop">
            <span>Shop Collection</span>
            <HiArrowRight />
          </Link>
          <Link href="/source" className={styles.ctaSecondary} id="hero-cta-source">
            <span>Discover Our Source</span>
          </Link>
        </motion.div>

        <motion.div 
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className={styles.scrollText}>Scroll to explore</span>
          <div className={styles.scrollMouse}>
            <motion.div 
              className={styles.scrollDot}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            ></motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

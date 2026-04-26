'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoWaterOutline } from 'react-icons/io5';
import { HiArrowRight } from 'react-icons/hi';
import styles from './Hero.module.css';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const bgImg = heroRef.current.querySelector(`.${styles.heroBg} img`);
      if (bgImg) {
        bgImg.style.transform = `scale(1.1) translateY(${scrollY * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.hero} id="hero-section" ref={heroRef}>
      {/* Background Image */}
      <div className={styles.heroBg}>
        <Image
          src="/images/climber-peak.png"
          alt="Mountain climber at peak with Skardu Spring"
          fill
          priority
          quality={85}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className={styles.heroOverlay}></div>

      {/* Floating Water Particles */}
      <div className={styles.particles}>
        {[...Array(8)].map((_, i) => (
          <div key={`particle-${i}`} className={styles.particle}></div>
        ))}
      </div>

      {/* Content */}
      <div className={styles.heroContent}>
        <div className={styles.heroLabel}>
          <IoWaterOutline />
          <span>Premium Natural Mineral Water</span>
        </div>

        <h1 className={styles.heroTitle}>
          Experience <span className={styles.heroTitleAccent}>Absolute</span> <br />
          Purity.
        </h1>

        <p className={styles.heroDesc}>
          Born from the crystalline heart of the Karakoram glaciers. 
          A 10,000-year journey of natural filtration, delivered 
          directly to your urban doorstep.
        </p>

        <div className={styles.heroCtas}>
          <Link href="/shop" className={styles.ctaPrimary} id="hero-cta-shop">
            <span>Shop Collection</span>
            <HiArrowRight />
          </Link>
          <Link href="/source" className={styles.ctaSecondary} id="hero-cta-source">
            <span>Discover Our Source</span>
          </Link>
        </div>

        <div className={styles.scrollIndicator}>
          <span className={styles.scrollText}>Scroll to explore</span>
          <div className={styles.scrollMouse}>
            <div className={styles.scrollDot}></div>
          </div>
        </div>
      </div>
    </section>
  );
}

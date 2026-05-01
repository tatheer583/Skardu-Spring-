'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { IoDiamondOutline, IoGlobeOutline, IoShieldCheckmarkOutline, IoHeartOutline } from 'react-icons/io5';
import styles from './About.module.css';

export default function AboutPage() {
  return (
    <div className={styles.aboutWrapper}>
      {/* Hero */}
      <section className={styles.hero}>
        <Image 
          src="/images/climber-peak.png" 
          alt="Skardu Peaks" 
          fill 
          priority
          className={styles.heroImg}
        />
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <motion.span 
            className={styles.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Since 10,000 BC
          </motion.span>
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            The Legacy of <span>Skardu</span>
          </motion.h1>
          <motion.p 
            className={styles.desc}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Our story is etched in the ice and rock of the Karakoram. 
            A journey of patience, time, and absolute natural perfection.
          </motion.p>
        </div>
      </section>

      {/* Main Narrative */}
      <section className={styles.narrative}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.textSide}>
              <h2 className={styles.sectionTitle}>Where Time Stands <span>Still</span></h2>
              <p>
                The story of Skardu Spring begins 10,000 years ago. While civilizations rose and fell, 
                the pristine snow of the Karakoram glaciers was undergoing a silent transformation. 
                Naturally filtered through deep layers of mineral-rich rock, our water has been 
                maturing in a protected sanctuary, far from the reach of the modern world.
              </p>
              <p>
                We founded Skardu Spring with a simple mission: to share this geological masterpiece 
                with the world while preserving the sanctity of its source. We don&apos;t just bottle water; 
                we bottle heritage.
              </p>
            </div>
            <div className={styles.visualSide}>
              <div className={styles.imageBox}>
                <Image 
                  src="/images/bottle-1l.png" 
                  alt="Skardu Spring Premium Bottle" 
                  width={400} 
                  height={600}
                  className={styles.bottleImg}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={styles.values}>
        <div className={styles.container}>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <IoDiamondOutline />
              <h3>Unmatched Purity</h3>
              <p>Naturally alkaline and enriched with essential minerals through centuries of geological filtration.</p>
            </div>
            <div className={styles.valueCard}>
              <IoGlobeOutline />
              <h3>Sustainability</h3>
              <p>We are committed to preserving the Karakoram ecosystem through zero-impact sourcing and 100% recyclable packaging.</p>
            </div>
            <div className={styles.valueCard}>
              <IoShieldCheckmarkOutline />
              <h3>Excellence</h3>
              <p>Every batch is tested to international WHO and ISO standards to ensure the highest quality hydration.</p>
            </div>
            <div className={styles.valueCard}>
              <IoHeartOutline />
              <h3>Community</h3>
              <p>We support the local communities of Skardu, investing in education and clean water initiatives for the people of the peaks.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

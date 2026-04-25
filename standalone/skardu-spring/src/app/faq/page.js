'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import FAQ from '@/components/home/FAQ';
import styles from './FAQPage.module.css';

export default function FAQPage() {
  return (
    <div className={styles.faqPageWrapper}>
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
            Support Center
          </motion.span>
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            How can we <span>help you?</span>
          </motion.h1>
          <motion.p 
            className={styles.desc}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Find answers to frequently asked questions about our source, 
            purification process, and delivery services.
          </motion.p>
        </div>
      </section>

      {/* FAQ Component */}
      <div className={styles.contentSection}>
        <FAQ />
      </div>
    </div>
  );
}

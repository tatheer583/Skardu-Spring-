'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoFlaskOutline, IoDiamondOutline, IoSparklesOutline, IoCloudOutline } from 'react-icons/io5';
import styles from './FiltrationProcess.module.css';

const steps = [
  {
    icon: <IoFlaskOutline />,
    title: 'Molecular Purification',
    desc: 'Utilizing advanced Reverse Osmosis to eliminate 99.9% of micro-particles while preserving the liquid structure.',
  },
  {
    icon: <IoDiamondOutline />,
    title: 'Mineral Enrichment',
    desc: 'A precise infusion of essential electrolytes, mimicking the natural enrichment of mountain rock.',
  },
  {
    icon: <IoSparklesOutline />,
    title: 'Ultraviolet Synthesis',
    desc: 'High-intensity UV treatment ensures absolute biological safety without altering the natural taste.',
  },
  {
    icon: <IoCloudOutline />,
    title: 'Active Oxygenation',
    desc: 'A final touch of medical-grade Ozone to ensure every bottle remains as fresh as the mountain spring.',
  },
];

export default function FiltrationProcess() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className={styles.filtration} id="process">
      {/* Background decorative elements */}
      <div className={styles.bgGlow}></div>

      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.label}>Our Process</span>
          <h2 className={styles.title}>The Path to <span>Absolute Purity</span></h2>
          <p className={styles.subtitle}>
            We employ a rigorous multi-stage purification system to ensure every drop meets
            international standards while retaining essential natural minerals.
          </p>
        </div>

        <div className={styles.grid}>
          {isMounted && steps.map((step, index) => (
            <motion.div
              key={index}
              className={styles.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              {/* Step number badge */}
              <div className={styles.stepBadge}>
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className={styles.connector}></div>
              )}

              {/* Card content */}
              <div className={styles.card}>
                <div className={styles.iconWrapper}>
                  {step.icon}
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

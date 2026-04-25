'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Certifications.module.css';

const certs = [
  {
    id: 'iso-9001',
    icon: '🏛️',
    title: 'ISO 9001:2015',
    desc: 'Internationally recognized quality management standards ensuring excellence in every drop.',
    tag: 'Quality Certified',
    link: '/assets/certs/gb-food-cert.pdf',
    linkText: 'View Standards'
  },
  {
    id: 'who-compliant',
    icon: '🩺',
    title: 'WHO Compliant',
    desc: 'Full adherence to the World Health Organization guidelines for premium drinking water.',
    tag: 'Health Approved',
    link: '#',
    linkText: 'View Guidelines'
  },
  {
    id: 'gb-food',
    icon: '📜',
    title: 'GB Food Authority',
    desc: 'Official certification from the Gilgit-Baltistan Food Authority, ensuring compliance with provincial food safety regulations.',
    tag: 'Safety Certified',
    link: '/assets/certs/gb-food-cert.pdf',
    linkText: 'View Certificate'
  },
  {
    id: 'als-uk',
    icon: '🇬🇧',
    title: 'ALS UK Laboratory',
    desc: 'Independent verification by ALS UK, a world leader in testing, inspection, and certification services for water quality.',
    tag: 'Purity Verified',
    link: '/assets/certs/ALSCERT-UK-2025.pdf',
    linkText: 'View Certificate'
  },
  {
    id: 'lab-verified',
    icon: '🔬',
    title: 'Laboratory Verified',
    desc: 'Rigorously tested by independent labs to verify mineral balance and 100% absence of contaminants.',
    tag: 'Tested & Approved',
    link: '#',
    linkText: 'View Report'
  },
];

export default function Certifications() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className={styles.certs} id="certifications">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.label}>Global Standards</span>
          <h2 className={styles.title}>Certified <span>Purity & Safety</span></h2>
        </div>

        <div className={styles.grid}>
          {certs.map((cert, index) => (
            <motion.div
              key={cert.id}
              className={styles.card}
              initial={false}
              whileInView={isMounted ? { opacity: 1, scale: 1 } : {}}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.icon}>{cert.icon}</div>
              <h3>{cert.title}</h3>
              <p>{cert.desc}</p>
              <div className={styles.actions}>
                <span className={styles.tag}>{cert.tag}</span>
                <a
                  href={cert.link}
                  target={cert.link !== '#' ? '_blank' : undefined}
                  rel={cert.link !== '#' ? 'noopener noreferrer' : undefined}
                  className={styles.viewBtn}
                >
                  {cert.linkText}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

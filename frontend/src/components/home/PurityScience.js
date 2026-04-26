'use client';

import { motion } from 'framer-motion';
import styles from './PurityScience.module.css';

const stats = [
  {
    icon: '🧪',
    title: 'Optimal Alkalinity',
    desc: 'With a pH of 7.5, Skardu Spring helps maintain your body\'s equilibrium and natural energy flow.',
  },
  {
    icon: '🦴',
    title: 'Calcium & Magnesium',
    desc: 'Essential electrolytes that support bone density and muscle function, naturally occurring at the source.',
  },
  {
    icon: '⚡',
    title: 'Cellular Vitality',
    desc: 'Experience rapid hydration and detoxification through nature\'s most efficient mineral delivery system.',
  },
];

export default function PurityScience() {
  return (
    <section className={styles.science} id="science">
      <div className={styles.inner}>
        <div className={styles.visualCol}>
          <div className={styles.visualWrapper}>
            <div className={styles.moleculeBlob}>
              <span className={styles.phBadge}>pH 7.5</span>
            </div>
            {/* Animated floating particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={styles.particle}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>

        <div className={styles.contentCol}>
          <span className={styles.label}>Composition & Science</span>
          <h2 className={styles.title}>The Biological <span>Signature of Skardu</span></h2>
          
          <div className={styles.stats}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className={styles.statItem}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={styles.statIcon}>{stat.icon}</div>
                <div className={styles.statText}>
                  <h4>{stat.title}</h4>
                  <p>{stat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

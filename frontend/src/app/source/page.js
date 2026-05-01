'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { IoLocationOutline, IoSnowOutline, IoTimeOutline, IoShieldCheckmarkOutline } from 'react-icons/io5';
import styles from './Source.module.css';

const milestones = [
  {
    icon: <IoSnowOutline />,
    title: 'Glacial Origin',
    desc: 'Our journey begins at 2,500m altitude, where ancient snow melts into the pristine heart of the Karakoram range.',
  },
  {
    icon: <IoTimeOutline />,
    title: '10,000 Year Journey',
    desc: 'Every drop is naturally filtered through layers of mineral-rich glacial rock for over a millennium.',
  },
  {
    icon: <IoLocationOutline />,
    title: 'The Soul of Skardu',
    desc: 'Emerging from a protected deep-rock spring, far from industrial impact or human interference.',
  },
  {
    icon: <IoShieldCheckmarkOutline />,
    title: 'Pristine Protection',
    desc: 'Captured at the source under strict hygiene standards to preserve its natural biological signature.',
  },
];

export default function SourcePage() {
  return (
    <div className={styles.sourceWrapper}>
      {/* Hero Section */}
      <header className={styles.hero}>
        <Image 
          src="/images/hero-bg.png" 
          alt="Skardu Mountains" 
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
            The Origin Story
          </motion.span>
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Born from the <span>Glaciers</span>
          </motion.h1>
          <motion.p 
            className={styles.desc}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Discover the 10,000-year journey of nature&apos;s most perfect water, 
            sourced from the pristine peaks of the Karakoram.
          </motion.p>
        </div>
      </header>

      {/* Story Section */}
      <section className={styles.story}>
        <div className={styles.container}>
          <div className={styles.storyGrid}>
            <div className={styles.textContent}>
              <h2 className={styles.sectionTitle}>A Sanctuary of <span>Purity</span></h2>
              <p>
                In the remote highlands of Gilgit-Baltistan, Skardu stands as a testament to Earth&apos;s 
                untouched beauty. Here, glaciers that have existed for tens of thousands of years 
                slowly release their crystalline essence.
              </p>
              <p>
                This isn&apos;t just water. It&apos;s a biological legacy. As the glacial melt-water seeps 
                into the earth, it begins a slow, deliberate descent through deep volcanic rock 
                and ancient glacial moraines. This natural process takes centuries, during which 
                the water is purified of all contaminants while being enriched with a unique 
                balance of essential minerals.
              </p>
            </div>
            <div className={styles.imageContent}>
              <div className={styles.imageWrapper}>
                <Image 
                  src="/images/bottle-tilted-lake.png" 
                  alt="Pristine Lake in Skardu" 
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline/Milestones */}
      <section className={styles.milestones}>
        <div className={styles.container}>
          <div className={styles.milestoneGrid}>
            {milestones.map((m, i) => (
              <motion.div 
                key={i} 
                className={styles.milestoneCard}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={styles.milestoneIcon}>{m.icon}</div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* High Altitude Section */}
      <section className={styles.altitude}>
        <div className={styles.altitudeContent}>
          <h2 className={styles.sectionTitle}>Sourced at <span>2,500m</span></h2>
          <p>
            At this extreme altitude, the air is thin, the environment is pristine, and the water 
            is at its most vital. Skardu Spring is captured exactly as nature intended, 
            bottled with love and care for those who seek the peak of hydration.
          </p>
        </div>
      </section>
    </div>
  );
}

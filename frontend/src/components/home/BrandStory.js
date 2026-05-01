'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoWaterOutline, IoLeafOutline, IoShieldCheckmarkOutline, IoDiamondOutline } from 'react-icons/io5';
import styles from './BrandStory.module.css';

const features = [
  {
    id: 'glacial',
    icon: <IoWaterOutline />,
    title: 'Glacial Source',
    desc: 'Sourced from 2,500m altitude Karakoram glaciers',
  },
  {
    id: 'natural',
    icon: <IoLeafOutline />,
    title: '100% Natural',
    desc: 'Zero additives, naturally mineral-rich composition',
  },
  {
    id: 'lab',
    icon: <IoShieldCheckmarkOutline />,
    title: 'Lab Tested',
    desc: 'Every batch tested to international purity standards',
  },
  {
    id: 'premium',
    icon: <IoDiamondOutline />,
    title: 'Premium Quality',
    desc: 'Pristine taste with balanced mineral profile',
  },
];

export default function BrandStory() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => setIsMounted(true));
  }, []);

  return (
    <section className={styles.brandStory} id="brand-story">
      <div className={styles.inner}>
        {/* Image Column */}
        <div className={styles.imageCol}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/bottle-tilted-lake.png"
              alt="Skardu Spring Premium Water Bottle by the Lake"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className={styles.imageAccent}>
            <span className={styles.accentNumber}>10K+</span>
            <span className={styles.accentText}>Years of Natural Filtration</span>
          </div>
        </div>

        {/* Text Column */}
        <div className={styles.textCol}>
          <span className={styles.sectionLabel}>Our Story</span>
          <h2 className={styles.title}>
            A Geological <span>Masterpiece</span>
          </h2>
          <p className={styles.desc}>
            High within the remote sanctuary of Gilgit-Baltistan, Skardu remains one of the last 
            unspoiled frontiers on Earth. It is here that our story begins, among the 
            monumental peaks and silent glaciers of the Karakoram.
          </p>
          <p className={styles.desc}>
            As the glacial ice slowly yields to the mountain sun, the water begins a 
            deliberate, century-long descent through deep layers of volcanic and 
            mineral-rich rock. This natural odyssey purifies and balances every drop, 
            creating a water of exceptional character and vitality.
          </p>

          <div className={styles.features}>
            {isMounted && features.map((f) => (
              <div key={f.id} className={styles.feature}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <div className={styles.featureText}>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

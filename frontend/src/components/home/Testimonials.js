'use client';

import { useState, useEffect } from 'react';
import { IoStar } from 'react-icons/io5';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    id: 'sarah',
    text: "Skardu Spring has completely changed how I think about water. The taste is unbelievably fresh — you can feel the purity from the Karakoram glaciers in every sip.",
    name: 'Sarah Ahmed',
    role: 'Health Coach',
    initials: 'SA',
    rating: 5,
  },
  {
    id: 'hassan',
    text: "As a restaurant owner, water quality matters. Since switching to Skardu Spring, our guests consistently compliment the water. The mineral balance is perfect.",
    name: 'Hassan Malik',
    role: 'Executive Chef',
    initials: 'HM',
    rating: 5,
  },
  {
    id: 'amina',
    text: "I love that Skardu Spring is committed to sustainability. The eco-friendly packaging and glacier conservation program make me proud to support this brand.",
    name: 'Amina Khan',
    role: 'Environmentalist',
    initials: 'AK',
    rating: 5,
  },
];

export default function Testimonials() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => setIsMounted(true));
  }, []);

  return (
    <section className={styles.testimonials} id="testimonials-section">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.label}>Testimonials</span>
          <h2 className={styles.title}>What People Say</h2>
          <p className={styles.subtitle}>
            Trusted by thousands across Pakistan.
          </p>
        </div>
        <div className={styles.grid}>
          {isMounted && testimonials.map((t) => (
            <div key={t.id} className={styles.card} id={`testimonial-${t.id}`}>
              <div className={styles.stars}>
                {[...Array(t.rating)].map((_, i) => (
                  <IoStar key={`${t.id}-star-${i}`} className={styles.star} />
                ))}
              </div>
              <div className={styles.quoteIcon}>&ldquo;</div>
              <p className={styles.cardText}>{t.text}</p>
              <div className={styles.cardAuthor}>
                <div className={styles.authorAvatar}>{t.initials}</div>
                <div className={styles.authorInfo}>
                  <h4>{t.name}</h4>
                  <p>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

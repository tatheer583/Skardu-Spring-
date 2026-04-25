'use client';

import { useState, useEffect, useRef } from 'react';
import { IoWaterOutline, IoGlobeOutline, IoLeafOutline, IoPeopleOutline } from 'react-icons/io5';
import styles from './StatsCounter.module.css';

const stats = [
  { id: 'delivered', icon: <IoWaterOutline />, target: 5, suffix: 'M+', label: 'Bottles Delivered' },
  { id: 'cities', icon: <IoGlobeOutline />, target: 15, suffix: '+', label: 'Cities Served' },
  { id: 'packaging', icon: <IoLeafOutline />, target: 100, suffix: '%', label: 'Eco-Friendly Packaging' },
  { id: 'customers', icon: <IoPeopleOutline />, target: 50, suffix: 'K+', label: 'Happy Customers' },
];

function useCountUp(target, inView, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return count;
}

function StatItem({ icon, target, suffix, label }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const count = useCountUp(target, inView);

  useEffect(() => {
    setIsMounted(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.stat} ref={ref}>
      <div className={styles.statIcon}>{icon}</div>
      <div className={styles.statNumber}>
        {isMounted ? count : 0}{suffix}
      </div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

export default function StatsCounter() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className={styles.stats} id="stats-section">
      <div className={styles.inner}>
        {isMounted && stats.map((stat) => (
          <StatItem key={stat.id} {...stat} />
        ))}
      </div>
    </section>
  );
}

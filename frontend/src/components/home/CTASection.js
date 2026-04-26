'use client';

import Image from 'next/image';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import { IoShieldCheckmarkOutline, IoLeafOutline, IoRibbonOutline } from 'react-icons/io5';
import styles from './CTASection.module.css';

export default function CTASection() {
  return (
    <section className={styles.cta} id="cta-section">
      <div className={styles.ctaBg}>
        <Image
          src="/images/bottles-mountain.png"
          alt="Skardu Spring bottles lineup with Mountain backdrop"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className={styles.ctaOverlay}></div>

      <div className={styles.inner}>
        <h2 className={styles.title}>
          Experience the <span className={styles.titleAccent}>Purest Water</span> on Earth
        </h2>
        <p className={styles.desc}>
          Join thousands of families who trust Skardu Spring for their daily hydration.
          Order now and taste the difference that 10,000 years of natural filtration makes.
        </p>
        <div className={styles.buttons}>
          <Link href="/shop" className={styles.btnPrimary} id="cta-order">
            <span>Order Now</span>
            <HiArrowRight />
          </Link>
          <Link href="#contact" className={styles.btnSecondary} id="cta-contact">
            <span>Become a Distributor</span>
          </Link>
        </div>
        <div className={styles.badges}>
          <div className={styles.badge}>
            <div className={styles.badgeIcon}><IoShieldCheckmarkOutline /></div>
            <span>ISO 22000 Certified</span>
          </div>
          <div className={styles.badge}>
            <div className={styles.badgeIcon}><IoLeafOutline /></div>
            <span>100% Recyclable</span>
          </div>
          <div className={styles.badge}>
            <div className={styles.badgeIcon}><IoRibbonOutline /></div>
            <span>PSQCA Approved</span>
          </div>
        </div>
      </div>
    </section>
  );
}

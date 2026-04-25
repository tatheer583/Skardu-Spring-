'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IoWaterOutline } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('idle'); // idle, loading, success, error

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setNewsletterStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setNewsletterStatus('success');
        setEmail('');
        setTimeout(() => setNewsletterStatus('idle'), 5000);
      } else {
        setNewsletterStatus('error');
        setTimeout(() => setNewsletterStatus('idle'), 3000);
      }
    } catch {
      setNewsletterStatus('error');
      setTimeout(() => setNewsletterStatus('idle'), 3000);
    }
  };

  return (
    <footer className={styles.footer} id="site-footer">
      {/* Newsletter Section */}
      <div className={styles.footerNewsletter}>
        <div className={styles.newsletterInner}>
          <div className={styles.newsletterText}>
            <h3>Stay Refreshed</h3>
            <p>Subscribe for exclusive offers, wellness tips, and sustainability updates.</p>
          </div>
          <form className={styles.newsletterForm} onSubmit={handleNewsletter} id="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.newsletterInput}
              aria-label="Email for newsletter"
              id="newsletter-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={newsletterStatus === 'loading'}
            />
            <button 
              type="submit" 
              className={`${styles.newsletterBtn} ${newsletterStatus === 'success' ? styles.newsletterSuccess : ''}`}
              id="newsletter-submit"
              disabled={newsletterStatus === 'loading'}
            >
              {newsletterStatus === 'loading' ? 'Subscribing...' :
               newsletterStatus === 'success' ? '✓ Subscribed!' :
               newsletterStatus === 'error' ? 'Try Again' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className={styles.footerMain}>
        {/* Brand Column */}
        <div className={styles.footerBrand}>
          <div className={styles.footerLogo}>
            <div className={styles.footerLogoIcon}>
              <IoWaterOutline />
            </div>
            <span className={styles.footerLogoText}>Skardu Spring</span>
          </div>
          <p className={styles.footerBrandDesc}>
            Born from the pristine glaciers of the Karakoram mountains, Skardu Spring
            delivers nature&apos;s purest mineral water to your doorstep. Every drop tells
            a story of 10,000 years of natural filtration.
          </p>
          <div className={styles.footerSocial}>
            <a href="#" className={styles.socialLink} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="#" className={styles.socialLink} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="#" className={styles.socialLink} aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="#" className={styles.socialLink} aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
          </div>
          <div className={styles.certBadges}>
            <span className={styles.certBadge}>ISO 22000</span>
            <span className={styles.certBadge}>PSQCA</span>
            <span className={styles.certBadge}>HACCP</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.footerColumn}>
          <h4>Explore</h4>
          <ul>
            <li><Link href="/#brand-story">Our Story</Link></li>
            <li><Link href="/#product-showcase">Our Products</Link></li>
            <li><Link href="/source">The Source</Link></li>
            <li><Link href="/#science">Water Science</Link></li>
            <li><Link href="/#certifications">Quality Standards</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div className={styles.footerColumn}>
          <h4>Support</h4>
          <ul>
            <li><Link href="/#contact">Contact Us</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/shop">Order Online</Link></li>
            <li><a href="tel:+923492899537">+92 349 2899537</a></li>
            <li><a href="mailto:info@skarduspring.com">info@skarduspring.com</a></li>
          </ul>
        </div>

        {/* Company */}
        <div className={styles.footerColumn}>
          <h4>Company</h4>
          <ul>
            <li><Link href="/about">Our Story</Link></li>
            <li><Link href="/source">Eco Initiatives</Link></li>
            <li><Link href="/#contact">Careers</Link></li>
            <li><Link href="/#contact">Distributors</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.footerBottom}>
        <p className={styles.footerCopyright}>
          &copy; {currentYear} Skardu Spring. All rights reserved.
        </p>
        <div className={styles.footerBottomLinks}>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
          <Link href="/faq">Support</Link>
        </div>
      </div>
    </footer>
  );
}

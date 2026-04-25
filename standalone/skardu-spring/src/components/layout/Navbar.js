'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IoWaterOutline, IoCartOutline } from 'react-icons/io5';
import { useCart } from '@/context/CartContext';
import styles from './Navbar.module.css';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Our Story', href: '/about' },
  { label: 'The Source', href: '/source', prefetch: true },
  { label: 'Purity', href: '/#science' },
  { label: 'Shop', href: '/shop', prefetch: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <nav
      className={`${styles.navbar} ${scrolled ? styles.navScrolled : styles.navTransparent}`}
      id="main-navbar"
    >
      <div className={styles.navInner}>
        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="Skardu Spring Home">
          <div className={styles.logoIcon}>
            <IoWaterOutline />
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoName}>Skardu Spring</span>
            <span className={styles.logoTagline}>Pure Mountain Water</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className={styles.navLinks}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink} prefetch={item.prefetch}>
              {item.label}
            </Link>
          ))}
          <button 
            className={styles.cartBtn} 
            onClick={() => setIsCartOpen(true)}
            aria-label="Open Cart"
          >
            <IoCartOutline />
            {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
          </button>
          <Link href="/shop" className={styles.navCta} prefetch={true}>
            Shop Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`${styles.mobileToggle} ${mobileOpen ? styles.toggleOpen : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          id="mobile-menu-toggle"
        >
          <span className={styles.toggleBar}></span>
          <span className={styles.toggleBar}></span>
          <span className={styles.toggleBar}></span>
        </button>

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileOpen : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.navLink}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/shop" className={styles.navCta} onClick={() => setMobileOpen(false)}>
            Shop Now
          </Link>
        </div>
      </div>
    </nav>
  );
}

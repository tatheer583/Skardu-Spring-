'use client';

import { useTheme } from '@/context/ThemeContext';
import { IoMoon, IoSun } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className={styles.toggleIconWrapper}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={theme}
            initial={{ y: 20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className={styles.toggleIcon}
          >
            {theme === 'light' ? (
              <IoMoon className={styles.moonIcon} />
            ) : (
              <IoSun className={styles.sunIcon} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </button>
  );
}

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCheckmarkCircle, IoInformationCircle } from 'react-icons/io5';
import { useCart } from '@/context/CartContext';
import styles from './Toast.module.css';

export default function ToastContainer() {
  const { toasts } = useCart();

  return (
    <div className={styles.toastContainer}>
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`${styles.toast} ${styles[toast.type]}`}
          >
            {toast.type === 'success' ? (
              <IoCheckmarkCircle className={styles.icon} />
            ) : (
              <IoInformationCircle className={styles.icon} />
            )}
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

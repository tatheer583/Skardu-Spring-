'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { IoClose, IoTrashOutline, IoCartOutline, IoArrowForward } from 'react-icons/io5';
import { useCart } from '@/context/CartContext';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div 
            className={styles.drawer}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className={styles.header}>
              <h2>Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className={styles.closeBtn}>
                <IoClose />
              </button>
            </div>

            <div className={styles.itemsList}>
              {cart.length === 0 ? (
                <div className={styles.empty}>
                  <IoCartOutline className={styles.emptyIcon} />
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <div className={styles.itemImage}>
                      <Image src={item.image} alt={item.name} fill style={{ objectFit: 'contain' }} />
                    </div>
                    <div className={styles.itemInfo}>
                      <h4 className={styles.itemName}>{item.name}</h4>
                      <p className={styles.itemPrice}>Rs. {item.price}</p>
                      <div className={styles.itemControls}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <button 
                            className={styles.qtyBtn}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >-</button>
                          <span>{item.quantity}</span>
                          <button 
                            className={styles.qtyBtn}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >+</button>
                        </div>
                        <button 
                          className={styles.removeBtn}
                          onClick={() => removeFromCart(item.id)}
                        >
                          <IoTrashOutline />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className={styles.footer}>
                <div className={styles.totalRow}>
                  <span>Total:</span>
                  <span>Rs. {cartTotal}</span>
                </div>
                <button className={styles.checkoutBtn} onClick={() => { setIsCartOpen(false); router.push('/checkout'); }}>
                  Proceed to Checkout <IoArrowForward />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

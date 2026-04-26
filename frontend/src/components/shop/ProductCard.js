'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { IoStar, IoCartOutline, IoHeartOutline, IoHeart } from 'react-icons/io5';
import { useCart } from '@/context/CartContext';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <button 
        className={`${styles.wishlistBtn} ${isWishlisted ? styles.wishlisted : ''}`}
        onClick={() => toggleWishlist(product)}
        aria-label="Toggle Wishlist"
      >
        {isWishlisted ? <IoHeart /> : <IoHeartOutline />}
      </button>

      <Link href={`/shop/${product.id}`} className={styles.imageWrapper}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      <div className={styles.content}>
        <span className={styles.category}>{product.category}</span>
        <Link href={`/shop/${product.id}`}>
          <h3 className={styles.name}>{product.name}</h3>
        </Link>
        
        <div className={styles.rating}>
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <IoStar key={i} color={i < Math.floor(product.rating) ? '#f1c40f' : '#e0e0e0'} />
            ))}
          </div>
          <span className={styles.reviewCount}>({product.reviews} reviews)</span>
        </div>

        <div className={styles.footer}>
          <span className={styles.price}>Rs. {product.price}</span>
          <button 
            className={styles.addBtn}
            onClick={() => addToCart(product)}
            aria-label="Add to Cart"
          >
            <IoCartOutline />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

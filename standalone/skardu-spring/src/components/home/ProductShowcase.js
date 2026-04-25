'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import { IoCartOutline } from 'react-icons/io5';
import { useCart } from '@/context/CartContext';
import PRODUCTS from '@/data/products';
import styles from './ProductShowcase.module.css';

export default function ProductShowcase() {
  const [isMounted, setIsMounted] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show first 6 products for homepage showcase (balanced 3-column grid)
  const showcaseProducts = PRODUCTS.slice(0, 6);

  return (
    <section className={styles.products} id="product-showcase">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.label}>Our Collection</span>
          <h2 className={styles.title}>Purity in Every Drop</h2>
          <p className={styles.subtitle}>
            Choose from our range of naturally mineral-rich water,
            bottled at the source for unmatched freshness.
          </p>
        </div>

        <div className={styles.grid}>
          {isMounted && showcaseProducts.map((product) => (
            <div
              key={product.id}
              className={`${styles.card} ${product.popular ? styles.cardPopular : ''}`}
              id={`product-card-${product.id}`}
            >
              {product.popular && (
                <span className={styles.popularBadge}>Most Popular</span>
              )}

              <Link href={`/shop/${product.id}`} className={styles.cardImage}>
                <Image
                  src={product.image}
                  alt={`${product.name} - ${product.size}`}
                  width={180}
                  height={260}
                  sizes="(max-width: 768px) 150px, 180px"
                  style={{ objectFit: 'contain' }}
                />
              </Link>

              <Link href={`/shop/${product.id}`}>
                <h3 className={styles.cardName}>{product.name}</h3>
              </Link>
              <p className={styles.cardSize}>{product.size}</p>

              <div className={styles.cardMinerals}>
                {product.minerals.map((m) => (
                  <span key={`${product.id}-${m}`} className={styles.mineral}>{m}</span>
                ))}
              </div>

              <div className={styles.cardPrice}>
                Rs. {product.price} <span>{product.size === '500ml' ? '/ bottle' : `/ ${product.size}`}</span>
              </div>

              <button 
                className={styles.cardBtn} 
                onClick={() => addToCart(product)}
                aria-label={`Add ${product.name} to cart`}
              >
                <IoCartOutline />
                <span>Add to Cart</span>
              </button>
            </div>
          ))}
        </div>

        <div className={styles.viewAll}>
          <Link href="/shop" className={styles.viewAllBtn}>
            <span>View Full Collection</span>
            <HiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

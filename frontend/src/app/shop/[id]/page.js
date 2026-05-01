'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  IoArrowBackOutline, 
  IoStar, 
  IoCartOutline, 
  IoHeartOutline, 
  IoHeart,
  IoShieldCheckmarkOutline,
  IoLeafOutline,
  IoWaterOutline,
  IoTimerOutline,
  IoShareSocialOutline
} from 'react-icons/io5';
import { useCart } from '@/context/CartContext';
import PRODUCTS from '@/data/products';
import styles from './ProductDetail.module.css';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  // Memoize the product lookup to avoid using state and useEffect for initialization
  const product = useMemo(() => PRODUCTS.find(p => p.id === params.id), [params.id]);

  useEffect(() => {
    if (!product) {
      router.push('/shop');
    }
  }, [product, router]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (!product) return (
    <div className={styles.productDetail}>
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading product details...</p>
        </div>
      </div>
    </div>
  );

  const isWishlisted = wishlist.some(item => item.id === product.id);
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  // Suggest related products
  const relatedProducts = PRODUCTS.filter(
    p => p.id !== product.id && p.category === product.category
  ).slice(0, 3);

  return (
    <div className={styles.productDetail}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/shop">Shop</Link>
          <span>/</span>
          <span className={styles.breadcrumbCurrent}>{product.name}</span>
        </div>

        <div className={styles.grid}>
          {/* Image Section */}
          <div className={styles.imageSection}>
            <motion.div 
              className={styles.mainImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              {discount > 0 && (
                <span className={styles.discountBadge}>-{discount}%</span>
              )}
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                priority
                style={{ objectFit: 'contain' }}
              />
            </motion.div>
            
            <div className={styles.thumbnails}>
              {[...Array(4)].map((_, i) => (
                <div 
                  key={`thumb-${i}`} 
                  className={`${styles.thumbnail} ${activeImage === i ? styles.activeThumbnail : ''}`}
                  onClick={() => setActiveImage(i)}
                >
                  <Image src={product.image} alt={product.name} width={80} height={80} style={{ objectFit: 'contain' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <motion.div 
            className={styles.infoSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className={styles.category}>{product.category}</span>
            <h1 className={styles.title}>{product.name}</h1>
            
            <div className={styles.rating}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <IoStar key={`star-${i}`} color={i < Math.floor(product.rating) ? '#f1c40f' : '#e0e0e0'} />
                ))}
              </div>
              <span className={styles.reviews}>{product.rating} / 5 ({product.reviews} reviews)</span>
            </div>

            <div className={styles.priceRow}>
              <span className={styles.price}>Rs. {product.price}</span>
              {product.originalPrice && (
                <span className={styles.originalPrice}>Rs. {product.originalPrice}</span>
              )}
              {discount > 0 && (
                <span className={styles.saveBadge}>Save {discount}%</span>
              )}
            </div>

            <p className={styles.description}>{product.description}</p>

            {/* Specs */}
            <div className={styles.specsSection}>
              <h3 className={styles.specsTitle}>Specifications</h3>
              <ul className={styles.specsList}>
                {product.specs.map((spec, i) => (
                  <li key={`spec-${i}`} className={styles.specItem}>
                    <span className={styles.specDot}></span>
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            {/* Minerals */}
            {product.minerals && (
              <div className={styles.mineralsRow}>
                {product.minerals.map((m, i) => (
                  <span key={`mineral-${i}`} className={styles.mineralTag}>{m}</span>
                ))}
              </div>
            )}

            <div className={styles.actions}>
              <div className={styles.qtyWrapper}>
                <button 
                  className={styles.qtyBtn} 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >−</button>
                <span className={styles.qtyValue}>{quantity}</span>
                <button 
                  className={styles.qtyBtn} 
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >+</button>
              </div>

              <button 
                className={`${styles.addBtn} ${addedToCart ? styles.addedBtn : ''}`}
                onClick={handleAddToCart}
                id="add-to-cart-btn"
              >
                <IoCartOutline />
                {addedToCart ? 'Added!' : 'Add to Cart'}
              </button>

              <button 
                className={`${styles.wishlistBtn} ${isWishlisted ? styles.wishlisted : ''}`}
                onClick={() => toggleWishlist(product)}
                aria-label="Toggle wishlist"
              >
                {isWishlisted ? <IoHeart /> : <IoHeartOutline />}
              </button>

              <button 
                className={styles.shareBtn}
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: product.name, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
                aria-label="Share product"
              >
                <IoShareSocialOutline />
              </button>
            </div>

            <div className={styles.features}>
              <div className={styles.featureItem}>
                <IoShieldCheckmarkOutline className={styles.featureIcon} />
                <span>Certified Purity</span>
              </div>
              <div className={styles.featureItem}>
                <IoLeafOutline className={styles.featureIcon} />
                <span>100% Natural</span>
              </div>
              <div className={styles.featureItem}>
                <IoWaterOutline className={styles.featureIcon} />
                <span>Glacial Minerals</span>
              </div>
              <div className={styles.featureItem}>
                <IoTimerOutline className={styles.featureIcon} />
                <span>Fast Delivery</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className={styles.relatedSection}>
            <h2 className={styles.relatedTitle}>You May Also Like</h2>
            <div className={styles.relatedGrid}>
              {relatedProducts.map((rp) => (
                <Link href={`/shop/${rp.id}`} key={rp.id} className={styles.relatedCard}>
                  <div className={styles.relatedImage}>
                    <Image src={rp.image} alt={rp.name} width={120} height={160} style={{ objectFit: 'contain' }} />
                  </div>
                  <div className={styles.relatedInfo}>
                    <h4>{rp.name}</h4>
                    <span>Rs. {rp.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

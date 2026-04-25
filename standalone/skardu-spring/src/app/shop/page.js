'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoSearchOutline, IoFilterOutline, IoChevronDownOutline, IoStar, IoCloseOutline } from 'react-icons/io5';
import ProductCard from '@/components/shop/ProductCard';
import SkeletonCard from '@/components/shop/SkeletonCard';
import PRODUCTS, { CATEGORIES } from '@/data/products';
import styles from './Shop.module.css';

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState(1000);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesPrice = product.price <= priceRange;
      return matchesSearch && matchesCategory && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'lowToHigh') return a.price - b.price;
      if (sortBy === 'highToLow') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.reviews - a.reviews;
      return 0;
    });
  }, [searchQuery, selectedCategory, sortBy, priceRange]);

  const activeFilterCount = [
    selectedCategory !== 'All',
    priceRange < 1000,
    searchQuery.length > 0,
  ].filter(Boolean).length;

  return (
    <div className={styles.shopContainer}>
      <header className={styles.hero}>
        <motion.div 
          className="container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={styles.heroLabel}>Premium Collection</span>
          <h1>Skardu Shop</h1>
          <p>Pure Himalayan hydration, delivered directly to your doorstep.</p>
        </motion.div>
      </header>

      <main className={styles.mainContent}>
        <div className="container">
          {/* Mobile Filter Toggle */}
          <button 
            className={styles.mobileFilterToggle}
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          >
            <IoFilterOutline />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className={styles.filterBadge}>{activeFilterCount}</span>
            )}
          </button>

          <div className={styles.layout}>
            {/* Sidebar Filters */}
            <aside className={`${styles.sidebar} ${mobileFiltersOpen ? styles.sidebarOpen : ''}`}>
              <div className={styles.sidebarHeader}>
                <h3>Filters</h3>
                <button 
                  className={styles.closeSidebar}
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <IoCloseOutline />
                </button>
              </div>

              <div className={styles.searchBox}>
                <IoSearchOutline className={styles.searchIcon} />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  id="shop-search"
                />
              </div>

              <div className={styles.filterSection}>
                <h3>Categories</h3>
                <div className={styles.categoryList}>
                  {CATEGORIES.map(cat => (
                    <div 
                      key={cat} 
                      className={`${styles.categoryItem} ${selectedCategory === cat ? styles.active : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                      <span>{cat === 'All' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === cat).length}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.filterSection}>
                <h3>Price Range</h3>
                <div className={styles.priceRange}>
                  <input 
                    type="range" 
                    min="0" 
                    max="1000" 
                    step="10"
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    className={styles.rangeInput}
                    id="price-range-slider"
                  />
                  <div className={styles.priceLabels}>
                    <span>Rs. 0</span>
                    <span>Rs. {priceRange}</span>
                  </div>
                </div>
              </div>

              <div className={styles.filterSection}>
                <h3>Minimum Rating</h3>
                <div className={styles.stars}>
                  {[5, 4, 3, 2, 1].map(star => (
                    <div key={star} className={styles.starRow}>
                      <div className={styles.starIcons}>
                        {[...Array(5)].map((_, i) => <IoStar key={i} color={i < star ? '#f1c40f' : '#e0e0e0'} />)}
                      </div>
                      <span className={styles.starLabel}>& Up</span>
                    </div>
                  ))}
                </div>
              </div>

              {activeFilterCount > 0 && (
                <button
                  className={styles.clearFiltersBtn}
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setPriceRange(1000);
                  }}
                >
                  Clear All Filters
                </button>
              )}
            </aside>

            {/* Overlay for mobile */}
            {mobileFiltersOpen && (
              <div 
                className={styles.sidebarOverlay} 
                onClick={() => setMobileFiltersOpen(false)}
              />
            )}

            {/* Product Grid Area */}
            <div className={styles.productsArea}>
              <div className={styles.toolbar}>
                <div className={styles.resultsCount}>
                  Showing <strong>{filteredProducts.length}</strong> of {PRODUCTS.length} products
                </div>
                <div className={styles.sortWrapper}>
                  <span>Sort by:</span>
                  <select 
                    className={styles.sortSelect}
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    id="sort-select"
                  >
                    <option value="featured">Featured</option>
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                    <option value="rating">Average Rating</option>
                    <option value="newest">Most Reviewed</option>
                  </select>
                </div>
              </div>

              <div className={styles.productGrid}>
                <AnimatePresence mode="popLayout">
                  {isLoading ? (
                    [...Array(6)].map((_, i) => <SkeletonCard key={`skeleton-${i}`} />)
                  ) : (
                    filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))
                  )}
                </AnimatePresence>
              </div>

              {!isLoading && filteredProducts.length === 0 && (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>🔍</div>
                  <h3>No products found</h3>
                  <p>Try adjusting your filters or search query.</p>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setPriceRange(1000);
                    }}
                    className={styles.clearBtn}
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

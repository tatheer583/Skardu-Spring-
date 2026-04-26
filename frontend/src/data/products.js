/**
 * Skardu Spring — Centralized Product Data
 * Single source of truth for all product information.
 * Used by: Shop page, Product Detail page, ProductShowcase, API routes.
 */

const PRODUCTS = [
  {
    id: 'artisanal-pure-500',
    name: 'Artisanal Pure',
    size: '500ml',
    category: 'Still Water',
    price: 60,
    originalPrice: 75,
    rating: 4.8,
    reviews: 124,
    image: '/images/bottle-500ml.png',
    shortDesc: 'Perfectly balanced mineral content for daily hydration.',
    description:
      'Our signature 500ml bottle, perfect for on-the-go hydration. Sourced directly from the pristine glaciers of Skardu, this water is naturally filtered through ancient rock formations, retaining essential minerals that give it a crisp, refreshing taste.',
    specs: [
      'Size: 500ml',
      'pH: 7.4 (Naturally Alkaline)',
      'TDS: 120 mg/l',
      'Source: Deosai Glaciers',
    ],
    minerals: ['Ca²⁺', 'Mg²⁺', 'K⁺'],
    popular: false,
    inStock: true,
  },
  {
    id: 'glacial-reserve-1000',
    name: 'Glacial Reserve',
    size: '1 Liter',
    category: 'Premium Still',
    price: 100,
    originalPrice: 130,
    rating: 4.9,
    reviews: 89,
    image: '/images/bottle-1l.png',
    shortDesc: 'Rare glacial water with superior clarity and taste.',
    description:
      'The 1 Liter Glacial Reserve is for those who demand the finest. This premium selection comes from the highest altitude springs in the Karakoram range, bottled at the source to preserve its molecular structure and purity.',
    specs: [
      'Size: 1 Liter',
      'pH: 7.6',
      'TDS: 95 mg/l',
      'Source: Baltoro Glacier',
    ],
    minerals: ['Ca²⁺', 'Mg²⁺', 'SiO₂'],
    popular: true,
    inStock: true,
  },
  {
    id: 'mountain-essence-1500',
    name: 'Mountain Essence',
    size: '1.5 Liter',
    category: 'Still Water',
    price: 140,
    originalPrice: 170,
    rating: 4.7,
    reviews: 215,
    image: '/images/bottle-1.5l.png',
    shortDesc: 'The essence of Karakoram in every drop.',
    description:
      'Experience the essence of the mountains with our 1.5L bottle. Designed for daily family use or long treks, it provides long-lasting hydration with a mineral profile optimized for electrolyte balance.',
    specs: [
      'Size: 1.5 Liter',
      'pH: 7.4',
      'TDS: 110 mg/l',
      'Source: Skardu Springs',
    ],
    minerals: ['Ca²⁺', 'Mg²⁺', 'HCO₃⁻'],
    popular: false,
    inStock: true,
  },
  {
    id: 'mega-hydrate-5000',
    name: 'Mega Hydrate',
    size: '5 Liter',
    category: 'Family Pack',
    price: 350,
    originalPrice: 420,
    rating: 4.6,
    reviews: 56,
    image: '/images/bottle-5l.png',
    shortDesc: 'Value pack for active families and groups.',
    description:
      'Hydrate the whole family with our 5-liter Mega Hydrate. This eco-friendly bulk option reduces plastic waste while ensuring you always have access to the purest mountain water in your kitchen.',
    specs: [
      'Size: 5 Liter',
      'pH: 7.5',
      'TDS: 115 mg/l',
      'Source: Regional Glaciers',
    ],
    minerals: ['Ca²⁺', 'Mg²⁺', 'Na⁺'],
    popular: false,
    inStock: true,
  },
  {
    id: 'office-home-10000',
    name: 'Office & Home',
    size: '10 Liter',
    category: 'Bulk Pack',
    price: 600,
    originalPrice: 750,
    rating: 4.8,
    reviews: 42,
    image: '/images/bottle-5l.png',
    shortDesc: 'Bulk hydration solutions for your workplace or home.',
    description:
      "The ultimate hydration solution for professional environments. Our 10-liter bulk pack is designed for easy dispensing and consistent quality, bringing the freshness of Skardu to your office desk.",
    specs: [
      'Size: 10 Liter',
      'pH: 7.5',
      'TDS: 115 mg/l',
      'Source: Regional Glaciers',
    ],
    minerals: ['Ca²⁺', 'Mg²⁺', 'HCO₃⁻'],
    popular: false,
    inStock: true,
  },
  {
    id: 'sparkling-glacier-500',
    name: 'Sparkling Glacier',
    size: '500ml',
    category: 'Sparkling',
    price: 120,
    originalPrice: 150,
    rating: 4.9,
    reviews: 31,
    image: '/images/bottle-500ml.png',
    shortDesc: 'Crisp, refreshing bubbles from the mountain depths.',
    description:
      "Naturally sparkling water from the deep crystalline aquifers of Skardu. Lightly carbonated to enhance its mineral complexity, it's the perfect sophisticated accompaniment to any meal.",
    specs: [
      'Size: 500ml',
      'pH: 6.8',
      'Carbonation: Light/Natural',
      'TDS: 150 mg/l',
    ],
    minerals: ['Ca²⁺', 'Mg²⁺', 'CO₂'],
    popular: false,
    inStock: true,
  },
];

export const CATEGORIES = [
  'All',
  'Still Water',
  'Premium Still',
  'Family Pack',
  'Bulk Pack',
  'Sparkling',
];

export default PRODUCTS;

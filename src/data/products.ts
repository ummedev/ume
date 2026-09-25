export interface Product {
  id: string;
  name: string;
  category: 'Knitwear' | 'Shirts' | 'Trousers' | 'Jackets' | 'Basics' | 'Accessories';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  details: string[];
  fabric: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  image: string;
  secondaryImage?: string;
  tag?: string;
  isNew?: boolean;
  isFavorite?: boolean;
  inStock: boolean;
}

export interface CuratedLook {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  itemIds: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Relaxed Merino Sweater',
    category: 'Knitwear',
    price: 120,
    rating: 4.9,
    reviewCount: 84,
    description: 'Knitted from ultra-fine 100% Australian Merino wool with a soft drape and ribbed cuffs. Perfect for light layering throughout transitional weather.',
    details: [
      '100% extra-fine 19.5-micron Merino wool',
      'Naturally temperature-regulating and breathable',
      'Dropped shoulder seam for an effortless silhouette',
      'Hand wash cold or dry clean'
    ],
    fabric: '100% Extra-fine Merino Wool',
    colors: [
      { name: 'Sage Green', hex: '#8A9A86' },
      { name: 'Oatmeal', hex: '#D8CEBE' },
      { name: 'Charcoal', hex: '#343434' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: '/images/cat_knitwear_stack_1790326626332.jpg',
    tag: 'New Season',
    isNew: true,
    inStock: true
  },
  {
    id: 'prod-2',
    name: 'Oversized Oxford Shirt',
    category: 'Shirts',
    price: 85,
    rating: 4.8,
    reviewCount: 112,
    description: 'An architectural take on the classic button-down, crafted from crisp certified organic long-staple cotton with a fluid tailored drape.',
    details: [
      '100% GOTS certified organic long-staple cotton',
      'Natural mother-of-pearl buttons',
      'Extended split back hem with locker loop',
      'Pre-washed for a soft lived-in touch'
    ],
    fabric: '100% Organic Crisp Cotton Poplin',
    colors: [
      { name: 'Crisp Ivory', hex: '#F9F8F5' },
      { name: 'Sky Blue', hex: '#CAD6DF' },
      { name: 'Warm Sand', hex: '#E2DBD2' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: '/images/cat_silk_shirt_1790326639054.jpg',
    tag: 'Core Essential',
    isNew: true,
    inStock: true
  },
  {
    id: 'prod-3',
    name: 'Wide-Leg Pleated Trouser',
    category: 'Trousers',
    price: 140,
    rating: 4.9,
    reviewCount: 96,
    description: 'High-waisted trousers tailored with deep double front pleats and fluid wide legs that elongate the frame. Cut from breathable European linen-viscose blend.',
    details: [
      '62% European Linen, 38% Viscose for liquid drape',
      'Deep double front pleats with pressed center crease',
      'Internal hook-and-bar waistband closure',
      'Side slant pockets and welt rear pockets'
    ],
    fabric: 'Linen & Viscose Drape Blend',
    colors: [
      { name: 'Stone Beige', hex: '#DDD6CA' },
      { name: 'Black', hex: '#1C1C1A' },
      { name: 'Olive Green', hex: '#586150' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: '/images/cat_trousers_linen_1790326675520.jpg',
    tag: 'Bestseller',
    isNew: true,
    inStock: true
  },
  {
    id: 'prod-4',
    name: 'Relaxed Linen Blazer',
    category: 'Jackets',
    price: 190,
    originalPrice: 220,
    rating: 4.9,
    reviewCount: 78,
    description: 'An unconstructed single-breasted blazer that balances tailoring with summer ease. Tailored with clean notch lapels and natural horn buttons.',
    details: [
      '100% Belgian Flax Linen with cotton buggy lining',
      'Soft unstructured shoulder pad for relaxed poise',
      'Dual rear vents and patch pockets',
      'Breathable, airy summer silhouette'
    ],
    fabric: '100% Belgian Flax Linen',
    colors: [
      { name: 'Sand Beige', hex: '#D7CEBF' },
      { name: 'Espresso', hex: '#3B3029' },
      { name: 'Chalk White', hex: '#F3EFE9' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/images/cat_blazer_jacket_1790326688535.jpg',
    tag: 'Editorial Pick',
    isNew: true,
    inStock: true
  },
  {
    id: 'prod-5',
    name: 'Cashmere Crew Neck',
    category: 'Knitwear',
    price: 180,
    rating: 4.9,
    reviewCount: 152,
    description: 'Ethically sourced Grade-A Mongolian cashmere with a cloud-like brushed feel and subtle rolled collar edges.',
    details: [
      '100% Grade-A Mongolian Cashmere',
      '2-ply 12-gauge knit for year-round warmth',
      'Ribbed cuffs and hem with reinforced elastane',
      'Includes cedar knitwear storage pouch'
    ],
    fabric: '100% Grade-A Mongolian Cashmere',
    colors: [
      { name: 'Oatmeal Heather', hex: '#D5C9B8' },
      { name: 'Forest Moss', hex: '#3F4A3E' },
      { name: 'Camel', hex: '#A88968' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: '/images/cat_knitwear_stack_1790326626332.jpg',
    tag: 'Customer Favorite',
    isFavorite: true,
    inStock: true
  },
  {
    id: 'prod-6',
    name: 'Everyday Tote',
    category: 'Accessories',
    price: 110,
    rating: 4.8,
    reviewCount: 89,
    description: 'Handcrafted from vegetable-tanned full-grain Italian leather that patinas beautifully with daily wear. Spacious interior fits a 15-inch laptop.',
    details: [
      'Full-grain Italian vegetable-tanned leather',
      'Interior magnetic closure with detachable key leash',
      'Reinforced shoulder drop straps (26cm drop)',
      'Unlined suede interior with leather slip pocket'
    ],
    fabric: '100% Full-grain Tuscan Calf Leather',
    colors: [
      { name: 'Rich Cognac', hex: '#7E4D2C' },
      { name: 'Deep Espresso', hex: '#2A1F18' },
      { name: 'Warm Taupe', hex: '#9C9084' }
    ],
    sizes: ['One Size'],
    image: '/images/cat_leather_bag_1790326661170.jpg',
    tag: 'Customer Favorite',
    isFavorite: true,
    inStock: true
  },
  {
    id: 'prod-7',
    name: 'Ribbed Tank Top',
    category: 'Basics',
    price: 45,
    rating: 4.9,
    reviewCount: 210,
    description: 'An elevated wardrobe staple with a subtle square scoop neckline and compact micro-rib structure that holds its form all day.',
    details: [
      '95% Organic Combed Cotton, 5% Elastane',
      'Double-stitched bindings along neckline and armholes',
      'Form-hugging but non-sheer density',
      'Hypoallergenic certified dyes'
    ],
    fabric: '95% Organic Cotton Rib, 5% Elastane',
    colors: [
      { name: 'Chalk White', hex: '#FBF9F4' },
      { name: 'Warm Sand', hex: '#DED6C9' },
      { name: 'Olive Gray', hex: '#63675E' },
      { name: 'Deep Black', hex: '#1C1B1A' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: '/images/cat_basics_tees_1790326714834.jpg',
    tag: 'Customer Favorite',
    isFavorite: true,
    inStock: true
  },
  {
    id: 'prod-8',
    name: 'Classic Trench Coat',
    category: 'Jackets',
    price: 260,
    rating: 5.0,
    reviewCount: 67,
    description: 'A modern, fluid trench coat cut from weatherproof cotton gabardine. Features a storm flap, belted cuffs, and detachable waist tie.',
    details: [
      '100% Water-repellent compact cotton gabardine',
      'Full viscose cupro lining for smooth layering',
      'Tortoiseshell horn buckle and buttons',
      'Deep welt storm pockets'
    ],
    fabric: 'Weatherproof Cotton Gabardine',
    colors: [
      { name: 'Classic Khaki', hex: '#C6B99E' },
      { name: 'Dark Navy', hex: '#1C2536' },
      { name: 'Black Onyx', hex: '#171717' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    image: '/images/seasonal_trench_edit_1790326649251.jpg',
    tag: 'Seasonal Hero',
    isFavorite: true,
    inStock: true
  },
  {
    id: 'prod-9',
    name: 'Heavyweight Organic Tee',
    category: 'Basics',
    price: 55,
    rating: 4.8,
    reviewCount: 145,
    description: 'A 240gsm dense cotton tee with structured drape, clean crew neckline, and seamless tubular knit body.',
    details: [
      '100% Heavyweight 240gsm Organic Cotton',
      'Reinforced ribbed collar that never sags',
      'Pre-shrunk to retain exact measurements',
      'OEKO-TEX Standard 100 certified'
    ],
    fabric: '240 GSM Heavy Cotton',
    colors: [
      { name: 'Off White', hex: '#F7F5EE' },
      { name: 'Muted Sage', hex: '#7D8A77' },
      { name: 'Heather Gray', hex: '#C2C2BD' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: '/images/cat_basics_tees_1790326714834.jpg',
    tag: 'Everyday Essential',
    inStock: true
  },
  {
    id: 'prod-10',
    name: 'Minimalist Leather Belt',
    category: 'Accessories',
    price: 65,
    rating: 4.9,
    reviewCount: 73,
    description: 'Slim 25mm vegetable-tanned bridle leather belt with brushed brass buckle. Hand-burnished edges.',
    details: [
      'Vegetable-tanned full-grain saddle leather',
      'Solid antique brushed brass hardware',
      'Hand-waxed and polished edges',
      'Made in Florence, Italy'
    ],
    fabric: '100% Italian Bridle Leather',
    colors: [
      { name: 'Walnut Brown', hex: '#4B3621' },
      { name: 'Matte Black', hex: '#1A1A1A' }
    ],
    sizes: ['75cm', '85cm', '95cm', '105cm'],
    image: '/images/cat_leather_bag_1790326661170.jpg',
    tag: 'Handcrafted',
    inStock: true
  }
];

export const CATEGORIES = [
  {
    id: 'knitwear',
    name: 'Knitwear',
    count: 14,
    image: '/images/cat_knitwear_stack_1790326626332.jpg',
    description: 'Luxurious cashmere, superfine merino, and breathable organic cotton knits.'
  },
  {
    id: 'shirts',
    name: 'Shirts',
    count: 18,
    image: '/images/cat_silk_shirt_1790326639054.jpg',
    description: 'Crisp poplin, draped silk, and relaxed linen button-downs.'
  },
  {
    id: 'trousers',
    name: 'Trousers',
    count: 12,
    image: '/images/cat_trousers_linen_1790326675520.jpg',
    description: 'Wide-leg pleats, tailored straight cuts, and fluid daytime silhouettes.'
  },
  {
    id: 'jackets',
    name: 'Jackets',
    count: 9,
    image: '/images/cat_blazer_jacket_1790326688535.jpg',
    description: 'Unstructured blazers, water-repellent trenches, and lightweight jackets.'
  },
  {
    id: 'basics',
    name: 'Basics',
    count: 22,
    image: '/images/cat_basics_tees_1790326714834.jpg',
    description: 'Heavyweight organic tees, micro-rib tanks, and everyday essentials.'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    count: 15,
    image: '/images/cat_leather_bag_1790326661170.jpg',
    description: 'Vegetable-tanned leather totes, pouches, belts, and silk scarves.'
  }
];

export const CURATED_LOOKS: CuratedLook[] = [
  {
    id: 'look-1',
    title: 'SOFT LAYERS',
    subtitle: 'Cozy Morning Minimal',
    description: 'Effortless cashmere layers paired with relaxed wide-leg trousers for quiet luxury living.',
    image: '/images/look_soft_layers_1790326703250.jpg',
    itemIds: ['prod-1', 'prod-7', 'prod-3']
  },
  {
    id: 'look-2',
    title: 'MODERN MINIMAL',
    subtitle: 'Editorial Gallery Walk',
    description: 'Fluid trench silhouette layered over tone-on-tone ivory tailoring and clean accessories.',
    image: '/images/seasonal_trench_edit_1790326649251.jpg',
    itemIds: ['prod-8', 'prod-2', 'prod-3', 'prod-6']
  },
  {
    id: 'look-3',
    title: 'CITY ELEGANT',
    subtitle: 'Effortless Suiting',
    description: 'Unstructured linen blazer balanced with tailored pleats and an artisanal leather tote.',
    image: '/images/hero_fashion_model_1790326612233.jpg',
    itemIds: ['prod-4', 'prod-7', 'prod-3', 'prod-6']
  },
  {
    id: 'look-4',
    title: 'WEEKEND TAILORED',
    subtitle: 'Casual Transition',
    description: 'Crisp oversized button-down paired with fine merino knit draped over shoulders.',
    image: '/images/cat_silk_shirt_1790326639054.jpg',
    itemIds: ['prod-2', 'prod-1', 'prod-3']
  }
];

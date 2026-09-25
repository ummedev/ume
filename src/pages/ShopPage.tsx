import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Heart, SlidersHorizontal, Plus, Eye, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORIES, Product } from '../data/products';

export const ShopPage: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    openProductDetail,
    addToCart,
    toggleWishlist,
    isInWishlist
  } = useShop();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const categoriesList = ['All', ...CATEGORIES.map((c) => c.name)];

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedCategory && selectedCategory !== 'All') {
      list = list.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (selectedSize) {
      list = list.filter((p) => p.sizes.includes(selectedSize));
    }

    switch (sortBy) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      default:
        return list;
    }
  }, [selectedCategory, selectedSize, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#868177] font-semibold">
          Wardrobe Archetypes
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-medium text-[#1E1E1C]">
          {selectedCategory && selectedCategory !== 'All' ? selectedCategory : 'All Garments & Essentials'}
        </h1>
        <p className="text-xs sm:text-sm text-[#736E65] font-light leading-relaxed">
          Functional modern tailoring crafted with uncompromised material integrity. Built for daily comfort and enduring form.
        </p>
      </div>

      {/* Category Pills & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 pb-6 border-b border-[#E8E2D7]">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
          {categoriesList.map((cat) => {
            const isActive = (!selectedCategory && cat === 'All') || selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat === 'All' ? null : cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#242321] text-[#FAF8F5] shadow-sm'
                    : 'bg-[#EFECE5] text-[#555148] hover:bg-[#E5DFD4] hover:text-[#181816]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Sort & Size Filters */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end text-xs">
          {/* Size Filter */}
          <div className="flex items-center gap-1">
            <span className="text-[#868177] text-[11px] uppercase tracking-wider hidden md:inline">Size:</span>
            {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                className={`w-7 h-7 rounded border text-[11px] font-medium transition-colors ${
                  selectedSize === size
                    ? 'border-[#242321] bg-[#242321] text-white'
                    : 'border-[#DDD7CB] text-[#5B574F] hover:border-[#A8A193] bg-[#FAF8F5]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 border border-[#DDD7CB] bg-[#FAF8F5] rounded-lg px-3 py-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#736E65]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs text-[#222220] focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Results Count */}
      <div className="flex items-center justify-between text-xs text-[#7B766D]">
        <span>Showing {filteredProducts.length} results</span>
        {selectedSize && (
          <button
            onClick={() => setSelectedSize(null)}
            className="text-[#4E5C4E] hover:underline"
          >
            Clear size filter ({selectedSize})
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center space-y-3">
          <p className="font-editorial text-2xl text-[#222220]">No garments found</p>
          <p className="text-xs text-[#7A756D]">Try changing your size or category selection.</p>
          <button
            onClick={() => { setSelectedCategory(null); setSelectedSize(null); }}
            className="px-5 py-2 bg-[#252422] text-white rounded-lg text-xs font-medium"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="group flex flex-col justify-between"
            >
              {/* Product Media Box */}
              <div
                className="aspect-[4/5] rounded-xl overflow-hidden bg-[#ECE8DF] border border-[#E6E1D7] relative cursor-pointer"
                onClick={() => openProductDetail(product.id)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Wishlist toggle button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-[#4A4741] hover:text-[#8E4341] transition-all shadow-sm z-10"
                  aria-label="Save to Wishlist"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      isInWishlist(product.id) ? 'fill-[#8E4341] text-[#8E4341]' : ''
                    }`}
                  />
                </button>

                {/* Color swatches hint on top-left */}
                <div className="absolute top-3 left-3 flex items-center gap-1">
                  {product.colors.map((c) => (
                    <span
                      key={c.name}
                      style={{ backgroundColor: c.hex }}
                      className="w-2.5 h-2.5 rounded-full border border-black/20 shadow-xs"
                      title={c.name}
                    />
                  ))}
                </div>

                {/* Quick Add Overlay */}
                <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product, product.sizes[0], product.colors[0], 1);
                    }}
                    className="flex-1 py-2 bg-[#20201E]/90 hover:bg-[#20201E] text-white rounded-lg text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5 shadow"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Quick Add</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openProductDetail(product.id);
                    }}
                    className="p-2 bg-white/90 hover:bg-white text-[#222220] rounded-lg text-[11px] transition-colors shadow"
                    title="View Details"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Product Metadata */}
              <div
                className="pt-3 pb-1 cursor-pointer"
                onClick={() => openProductDetail(product.id)}
              >
                <div className="flex items-center justify-between text-[10px] text-[#8A8478] uppercase tracking-wider mb-0.5">
                  <span>{product.category}</span>
                  {product.tag && <span>{product.tag}</span>}
                </div>
                <h3 className="text-xs sm:text-sm font-medium text-[#20201E] group-hover:text-[#455345] transition-colors truncate">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs sm:text-sm font-semibold text-[#20201E] tabular-nums">
                    ${product.price}
                  </span>
                  <span className="text-[11px] text-[#736E65] font-light">
                    {product.sizes.length} sizes
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

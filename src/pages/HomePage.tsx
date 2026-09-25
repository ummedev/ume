import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Heart,
  Truck,
  RotateCcw,
  Lock,
  Headphones,
  Star,
  Eye,
  Plus
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORIES, CURATED_LOOKS } from '../data/products';

export const HomePage: React.FC = () => {
  const {
    setActivePage,
    setSelectedCategory,
    openProductDetail,
    openLookModal,
    addToCart,
    toggleWishlist,
    isInWishlist
  } = useShop();

  const handleCategoryClick = (catName: string) => {
    setSelectedCategory(catName);
    setActivePage('shop');
  };

  // Products for New Arrivals (first 4 items)
  const newArrivals = PRODUCTS.filter((p) => p.isNew).slice(0, 4);

  // Products for Customer Favorites
  const customerFavorites = PRODUCTS.filter((p) => p.isFavorite).slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="bg-[#EFECE5]/80 backdrop-blur-md rounded-3xl overflow-hidden border border-[#E6E1D7]/80 grid grid-cols-1 lg:grid-cols-12 items-center shadow-sm">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1E1E1C] leading-[1.08] tracking-tight">
                Modern Essentials.
                <br />
                <span className="italic font-light text-[#3C3A35]">Effortless Every Day.</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm sm:text-base text-[#6E6960] max-w-md leading-relaxed font-light"
            >
              Timeless pieces. Thoughtful design. Made for real life. Crafted from sustainable organic textiles and European flax linen.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2"
            >
              <button
                onClick={() => { setSelectedCategory(null); setActivePage('shop'); }}
                className="px-8 py-3.5 bg-[#4A574A] hover:bg-[#3D473D] text-white rounded-lg text-xs uppercase tracking-widest font-medium transition-all shadow-sm hover:shadow active:scale-[0.98]"
              >
                Shop Now
              </button>
              <button
                onClick={() => { setSelectedCategory(null); setActivePage('shop'); }}
                className="group flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-[#2E2C28] hover:text-[#141412] transition-colors py-2"
              >
                <span>New Arrivals</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-6 h-[420px] sm:h-[500px] lg:h-[620px] relative overflow-hidden bg-[#ECE8E0]">
            <motion.img
              initial={{ scale: 1.05, opacity: 0.9 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              src="/images/hero_fashion_model_1790326612233.jpg"
              alt="AURA Modern Essentials Model in Tailored Blazer and Pleated Trousers"
              className="w-full h-full object-cover object-center lg:object-top"
            />
            {/* Subtle editorial watermark tag */}
            <div className="absolute bottom-5 right-5 bg-white/85 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/60 shadow-sm text-[10px] uppercase tracking-widest text-[#4A4740] font-medium hidden sm:block">
              Spring Atelier 2026
            </div>
          </div>

        </div>
      </section>

      {/* 2. SHOP BY CATEGORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#E8E3D8]">
          <div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#1E1E1C]">
              Shop By Category
            </h2>
            <p className="text-xs text-[#7B766D] mt-1 font-light">
              Essential wardrobe archetypes refined for versatility
            </p>
          </div>
          <button
            onClick={() => { setSelectedCategory(null); setActivePage('shop'); }}
            className="group flex items-center gap-1.5 text-xs text-[#4F4B43] hover:text-[#181816] font-medium tracking-wide"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => handleCategoryClick(cat.name)}
              className="group cursor-pointer flex flex-col"
            >
              <div className="aspect-[4/5] rounded-xl overflow-hidden bg-[#ECE8DF] border border-[#E6E1D7] relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              </div>
              <div className="pt-3 pb-1 text-center">
                <h3 className="text-xs sm:text-sm font-medium text-[#222220] group-hover:text-[#455345] transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[10px] text-[#868177] font-light mt-0.5 block">
                  {cat.count} styles
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. CURATED LOOKS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* Left Feature Card (Greige/Sage Tinted) */}
          <div className="lg:col-span-3 bg-[#E5E9E2]/80 backdrop-blur-md border border-[#D5DCD0]/80 rounded-2xl p-7 sm:p-8 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#556754] font-semibold">
                Lookbook Edit
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[#212E21] leading-tight">
                Curated
                <br />
                Looks
              </h2>
              <p className="text-xs text-[#526351] leading-relaxed pt-1">
                Outfits designed for how you live. Each look is coordinated with tonal harmony and pure textures.
              </p>
            </div>

            <div className="pt-8">
              <button
                onClick={() => setActivePage('looks')}
                className="group flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#253525] hover:text-[#111A11] transition-colors"
              >
                <span>Explore Looks</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* 4 Editorial Look Cards */}
          <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {CURATED_LOOKS.map((look, idx) => (
              <motion.div
                key={look.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group relative rounded-2xl overflow-hidden border border-[#E6E1D7] bg-[#EFECE6] flex flex-col justify-between"
              >
                {/* Look Photo */}
                <div className="aspect-[3/4] overflow-hidden bg-[#EAE5DC] relative">
                  <img
                    src={look.image}
                    alt={look.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Bottom Bar: Title & "Shop the look" */}
                <div className="p-3.5 text-center bg-[#FAF8F5] border-t border-[#E8E3DA]">
                  <h4 className="text-[11px] uppercase tracking-wider font-semibold text-[#222220]">
                    {look.title}
                  </h4>
                  <button
                    onClick={() => openLookModal(look.id)}
                    className="mt-1 text-[10px] uppercase tracking-widest text-[#556754] hover:text-[#202E20] font-semibold underline underline-offset-2 block w-full transition-colors"
                  >
                    Shop The Look
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. NEW ARRIVALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#E8E3D8]">
          <div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#1E1E1C]">
              New Arrivals
            </h2>
            <p className="text-xs text-[#7B766D] mt-1 font-light">
              Crafted for the season with refined textures and natural fibres.
            </p>
          </div>
          <button
            onClick={() => { setSelectedCategory(null); setActivePage('shop'); }}
            className="group flex items-center gap-1.5 text-xs text-[#4F4B43] hover:text-[#181816] font-medium tracking-wide"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Product Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group flex flex-col justify-between"
            >
              {/* Product Image Card */}
              <div className="aspect-[4/5] rounded-xl overflow-hidden bg-[#ECE8DF] border border-[#E6E1D7] relative cursor-pointer"
                onClick={() => openProductDetail(product.id)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Wishlist toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-[#4A4741] hover:text-[#8E4341] transition-all shadow-sm"
                  aria-label="Save to Wishlist"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      isInWishlist(product.id) ? 'fill-[#8E4341] text-[#8E4341]' : ''
                    }`}
                  />
                </button>

                {/* Quick Add overlay button */}
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

              {/* Product Info */}
              <div className="pt-3 pb-1 cursor-pointer" onClick={() => openProductDetail(product.id)}>
                <h3 className="text-xs sm:text-sm font-medium text-[#20201E] group-hover:text-[#455345] transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs sm:text-sm font-semibold text-[#20201E] tabular-nums">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-[#8E8980] line-through tabular-nums">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. CUSTOMER FAVORITES & SEASONAL EDIT (SPLIT SECTION) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Customer Favorites */}
          <div className="lg:col-span-6 bg-[#EFECE5]/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-[#E5E0D6]/80 flex flex-col justify-between">
            <div>
              <div className="flex items-end justify-between mb-6 pb-2 border-b border-[#DFD8CC]">
                <div>
                  <h3 className="font-editorial text-2xl font-medium text-[#1E1E1C]">
                    Customer Favorites
                  </h3>
                  <p className="text-xs text-[#78736A] mt-0.5 font-light">
                    Timeless pieces. Loved every day.
                  </p>
                </div>
                <button
                  onClick={() => { setSelectedCategory(null); setActivePage('shop'); }}
                  className="group flex items-center gap-1 text-xs text-[#4F4B43] hover:text-[#181816] font-medium"
                >
                  <span>View all</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* 4 Favorites in 4 columns / 2x2 grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {customerFavorites.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => openProductDetail(item.id)}
                    className="group cursor-pointer flex flex-col"
                  >
                    <div className="aspect-[4/5] rounded-lg overflow-hidden bg-[#ECE8DF] border border-[#E0D9CD] relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="pt-2">
                      <h4 className="text-[11px] font-medium text-[#222220] truncate group-hover:text-[#455345]">
                        {item.name}
                      </h4>
                      <p className="text-xs font-semibold text-[#222220] tabular-nums mt-0.5">
                        ${item.price}
                      </p>
                      {/* Star Rating & Review Count */}
                      <div className="flex items-center gap-1 mt-1 text-[10px] text-[#7A746B]">
                        <div className="flex items-center text-[#937C42]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-current" />
                          ))}
                        </div>
                        <span className="tabular-nums">({item.reviewCount})</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Seasonal Edit Banner */}
          <div className="lg:col-span-6 bg-[#EBE7DF]/80 backdrop-blur-md rounded-2xl overflow-hidden border border-[#DFD9CD]/80 grid grid-cols-1 sm:grid-cols-12 min-h-[380px]">
            {/* Promo Text */}
            <div className="sm:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#6E695F] font-semibold">
                  Seasonal Edit
                </span>
                <h3 className="font-editorial text-3xl sm:text-4xl font-medium text-[#1E1E1C] mt-2">
                  Spring Refresh
                </h3>
                <p className="text-xs text-[#6F6960] mt-2 leading-relaxed">
                  Light layers. Fresh tones. New textures. Now arriving.
                </p>

                <div className="mt-5 pt-4 border-t border-[#DED7CB]">
                  <span className="font-editorial text-3xl font-medium text-[#2F3E30]">
                    20% Off
                  </span>
                  <p className="text-xs text-[#706B62] mt-0.5">
                    Selected styles for a limited time.
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => { setSelectedCategory(null); setActivePage('shop'); }}
                  className="px-6 py-2.5 bg-[#455345] hover:bg-[#374437] text-white rounded-lg text-xs uppercase tracking-widest font-medium transition-all shadow-sm"
                >
                  Shop The Edit →
                </button>
              </div>
            </div>

            {/* Editorial Photo */}
            <div className="sm:col-span-5 relative h-64 sm:h-auto bg-[#E5DFD4]">
              <img
                src="/images/seasonal_trench_edit_1790326649251.jpg"
                alt="Spring Seasonal Edit Trench Coat Model"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 6. TRUST & VALUE PROPOSITIONS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-b border-[#E3DDD2] py-8 sm:py-10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#EFECE5] border border-[#DDD7CB] flex items-center justify-center text-[#4A574A] shrink-0">
              <Truck className="w-4.5 h-4.5 stroke-[1.6]" />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-[#1E1E1C]">Free Shipping</h5>
              <p className="text-[11px] text-[#78736A] mt-0.5">On orders over $150</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#EFECE5] border border-[#DDD7CB] flex items-center justify-center text-[#4A574A] shrink-0">
              <RotateCcw className="w-4.5 h-4.5 stroke-[1.6]" />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-[#1E1E1C]">Easy Returns</h5>
              <p className="text-[11px] text-[#78736A] mt-0.5">30-day return policy</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#EFECE5] border border-[#DDD7CB] flex items-center justify-center text-[#4A574A] shrink-0">
              <Lock className="w-4.5 h-4.5 stroke-[1.6]" />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-[#1E1E1C]">Secure Payments</h5>
              <p className="text-[11px] text-[#78736A] mt-0.5">Safe & encrypted</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#EFECE5] border border-[#DDD7CB] flex items-center justify-center text-[#4A574A] shrink-0">
              <Headphones className="w-4.5 h-4.5 stroke-[1.6]" />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-[#1E1E1C]">Customer Care</h5>
              <p className="text-[11px] text-[#78736A] mt-0.5">Here to help 24/7</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

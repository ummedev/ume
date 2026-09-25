import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Heart, ShoppingBag, Sparkles, ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/products';

export const MenuDrawer: React.FC = () => {
  const {
    isMenuOpen,
    setIsMenuOpen,
    activePage,
    setActivePage,
    setSelectedCategory,
    wishlist,
    cartCount
  } = useShop();

  const handlePageClick = (pageId: string, categoryFilter: string | null = null) => {
    setSelectedCategory(categoryFilter);
    setActivePage(pageId);
    setIsMenuOpen(false);
  };

  const navLinks = [
    { id: 'home', label: 'Home', kicker: 'Brand & Overview' },
    { id: 'shop', label: 'Shop All', kicker: 'Full Collection' },
    { id: 'looks', label: 'Curated Looks', kicker: 'Editorial Outfits' },
    { id: 'wishlist', label: 'Saved Wishlist', kicker: `${wishlist.length} Items Saved` },
    { id: 'about', label: 'Our Story & Atelier', kicker: 'Sustainable Craftsmanship' },
    { id: 'contact', label: 'Customer Care & FAQ', kicker: 'Concierge & Inquiries' }
  ];

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-[#161514]/40 backdrop-blur-sm z-50"
          />

          {/* Side Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed top-0 left-0 bottom-0 w-full sm:w-[460px] bg-[#FAF8F5] z-50 shadow-2xl flex flex-col justify-between overflow-y-auto no-scrollbar border-r border-[#E8E3DA]"
          >
            {/* Drawer Top Header */}
            <div>
              <div className="px-6 sm:px-8 pt-7 pb-6 flex items-center justify-between border-b border-[#EAE5DC]">
                <div>
                  <span className="font-editorial text-2xl tracking-[0.24em] font-medium text-[#1E1E1C] uppercase">
                    A U R A
                  </span>
                  <span className="block text-[9px] uppercase tracking-[0.28em] text-[#827D73] mt-0.5">
                    Navigation Index
                  </span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 -mr-2 text-[#464440] hover:text-[#181816] hover:bg-[#EFEBE4] rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 stroke-[1.8]" />
                </button>
              </div>

              {/* Main Pages Navigation */}
              <div className="px-6 sm:px-8 py-6">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#8F8A7F] font-semibold mb-4">
                  Browse Pages
                </p>
                <nav className="flex flex-col space-y-1">
                  {navLinks.map((item, idx) => {
                    const isActive = activePage === item.id;
                    return (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * idx, duration: 0.25 }}
                        onClick={() => handlePageClick(item.id)}
                        className={`w-full text-left py-3 px-3 -mx-3 rounded-lg flex items-center justify-between group transition-all ${
                          isActive
                            ? 'bg-[#EFECE5] text-[#1E1E1C]'
                            : 'text-[#3E3C38] hover:bg-[#F3EFE9] hover:text-[#141412]'
                        }`}
                      >
                        <div>
                          <span className="font-editorial text-2xl sm:text-2xl tracking-wide group-hover:translate-x-1 inline-block transition-transform duration-200">
                            {item.label}
                          </span>
                          <span className="block text-xs text-[#878278] font-normal mt-0.5">
                            {item.kicker}
                          </span>
                        </div>
                        <ArrowRight
                          className={`w-4 h-4 transition-all duration-200 ${
                            isActive
                              ? 'text-[#3C4A3E] translate-x-0 opacity-100'
                              : 'text-[#969186] -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                          }`}
                        />
                      </motion.button>
                    );
                  })}
                </nav>
              </div>

              {/* Category Quick Filter */}
              <div className="px-6 sm:px-8 py-5 border-t border-[#EAE5DC] bg-[#F5F2EC]/60">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#8F8A7F] font-semibold">
                    Shop By Wardrobe
                  </p>
                  <button
                    onClick={() => handlePageClick('shop', null)}
                    className="text-xs text-[#526051] hover:underline font-medium"
                  >
                    View All Categories
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handlePageClick('shop', cat.name)}
                      className="text-left px-3 py-2.5 rounded bg-[#FAF8F5] border border-[#E9E4DB] hover:border-[#CFCABF] text-xs font-medium text-[#383734] hover:text-[#181816] flex items-center justify-between group transition-colors"
                    >
                      <span>{cat.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#989389] group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Editorial Spotlight Card */}
              <div className="px-6 sm:px-8 py-5">
                <div
                  onClick={() => handlePageClick('looks')}
                  className="relative rounded-xl overflow-hidden cursor-pointer group bg-[#2A2B29] text-white p-5 flex flex-col justify-between min-h-[140px]"
                >
                  <img
                    src="/images/look_soft_layers_1790326703250.jpg"
                    alt="Spring Lookbook"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 group-hover:opacity-45 transition-all duration-500"
                  />
                  <div className="relative z-10">
                    <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#D3DECE] font-medium">
                      <Sparkles className="w-3 h-3" /> Lookbook 2026
                    </span>
                    <h4 className="font-editorial text-xl font-medium mt-1">
                      Effortless Everyday Layers
                    </h4>
                  </div>
                  <div className="relative z-10 flex items-center gap-1 text-xs text-[#E7E2D8] font-medium mt-3">
                    <span>Explore Lookbook</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Utility Bar */}
            <div className="px-6 sm:px-8 py-5 border-t border-[#EAE5DC] bg-[#FAF8F5]">
              <div className="flex items-center justify-between text-xs text-[#6F6B62]">
                <div className="flex items-center gap-3">
                  <span>Currency: <strong>USD ($)</strong></span>
                  <span>·</span>
                  <span>Shipping: <strong>Worldwide</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageClick('wishlist')}
                    className="p-1.5 text-[#5A574E] hover:text-[#181816]"
                    title="Wishlist"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      // Cart is opened in context
                    }}
                    className="p-1.5 text-[#5A574E] hover:text-[#181816]"
                    title="Bag"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

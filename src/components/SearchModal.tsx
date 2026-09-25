import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    openProductDetail,
    toggleWishlist,
    isInWishlist
  } = useShop();

  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query]);

  const quickSearches = ['Merino Knitwear', 'Linen Blazer', 'Trousers', 'Silk Shirt', 'Tote Bag', 'Cashmere'];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 bg-[#141312]/45 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ type: 'spring', damping: 25, stiffness: 260 }}
            className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E5E0D6] overflow-hidden z-10"
          >
            {/* Input Bar */}
            <div className="px-6 py-4 border-b border-[#EAE5DC] flex items-center gap-3">
              <Search className="w-5 h-5 text-[#736E65]" />
              <input
                type="text"
                autoFocus
                placeholder="Search styles, fabrics, or essentials..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-base sm:text-lg text-[#222220] placeholder:text-[#969186] focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-[#8C877D] hover:text-[#222220]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="ml-2 px-2.5 py-1 text-xs text-[#7A756C] hover:text-[#181816] rounded bg-[#EFECE5]"
              >
                ESC
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 max-h-[60vh] overflow-y-auto no-scrollbar">
              {!query.trim() ? (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8C877D] mb-3">
                    Popular Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {quickSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-3.5 py-1.5 rounded-full bg-[#EFECE5] hover:bg-[#E4DFD5] text-xs font-medium text-[#44423E] transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#EAE5DC]">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8C877D] mb-3">
                      Featured Pieces
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {PRODUCTS.slice(0, 4).map((p) => (
                        <div
                          key={p.id}
                          onClick={() => {
                            setIsSearchOpen(false);
                            openProductDetail(p.id);
                          }}
                          className="cursor-pointer group"
                        >
                          <div className="aspect-[4/5] rounded-lg overflow-hidden bg-[#ECE8DF] mb-2">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <h5 className="text-xs font-medium text-[#222220] truncate">
                            {p.name}
                          </h5>
                          <span className="text-xs text-[#6F6B62] tabular-nums">${p.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-sm text-[#736E66]">No styles found for &ldquo;{query}&rdquo;</p>
                  <p className="text-xs text-[#9E998F] mt-1">
                    Try searching for &quot;Knitwear&quot;, &quot;Blazer&quot;, &quot;Linen&quot;, or &quot;Shirt&quot;
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8C877D]">
                    {filteredProducts.length} Results
                  </p>
                  {filteredProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/70 hover:bg-white border border-[#ECE7DD] transition-all group cursor-pointer"
                      onClick={() => {
                        setIsSearchOpen(false);
                        openProductDetail(prod.id);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-12 h-14 object-cover rounded-md bg-[#ECE7DC]"
                        />
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#8A8479]">
                            {prod.category}
                          </span>
                          <h4 className="text-sm font-semibold text-[#222220] group-hover:text-[#3B483B] transition-colors">
                            {prod.name}
                          </h4>
                          <span className="text-xs text-[#6E6A61] tabular-nums font-medium">
                            ${prod.price}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(prod.id);
                          }}
                          className="p-2 text-[#888378] hover:text-[#8E4341] transition-colors"
                          aria-label="Save to wishlist"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isInWishlist(prod.id) ? 'fill-[#8E4341] text-[#8E4341]' : ''
                            }`}
                          />
                        </button>
                        <ArrowRight className="w-4 h-4 text-[#A39E93] group-hover:text-[#222220] group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

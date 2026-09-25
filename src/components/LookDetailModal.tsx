import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, ArrowRight, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CURATED_LOOKS, PRODUCTS } from '../data/products';

export const LookDetailModal: React.FC = () => {
  const {
    selectedLookId,
    closeLookModal,
    addToCart,
    openProductDetail,
    toggleWishlist,
    isInWishlist
  } = useShop();

  const look = CURATED_LOOKS.find((l) => l.id === selectedLookId);

  if (!look) return null;

  const items = look.itemIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as typeof PRODUCTS;

  const totalLookPrice = items.reduce((sum, item) => sum + item.price, 0);

  const handleAddAllToBag = () => {
    items.forEach((item) => {
      addToCart(item, item.sizes[0], item.colors[0], 1);
    });
    closeLookModal();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLookModal}
          className="fixed inset-0 bg-[#141312]/50 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 240 }}
          className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E6E0D6] overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row"
        >
          {/* Close button */}
          <button
            onClick={closeLookModal}
            className="absolute top-4 right-4 z-20 p-2 text-[#4A4742] hover:text-[#181816] bg-white/80 hover:bg-white rounded-full transition-all shadow-sm"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Editorial Image */}
          <div className="md:w-1/2 relative bg-[#ECE7DE] min-h-[300px] md:min-h-full">
            <img
              src={look.image}
              alt={look.title}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
            <div className="absolute bottom-4 left-4 right-4 text-white md:hidden">
              <span className="text-[10px] uppercase tracking-widest text-[#D6DECE]">
                Curated Look
              </span>
              <h3 className="font-editorial text-2xl font-medium">{look.title}</h3>
            </div>
          </div>

          {/* Right: Outfit Breakdown & Shop pieces */}
          <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto no-scrollbar">
            <div>
              <div className="hidden md:block mb-5">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#868175] font-semibold">
                  Curated Outfit Breakdown
                </span>
                <h3 className="font-editorial text-3xl font-medium text-[#1E1E1C] mt-1">
                  {look.title}
                </h3>
                <p className="text-xs text-[#706B62] mt-1.5 leading-relaxed">
                  {look.description}
                </p>
              </div>

              {/* Items in this look */}
              <div className="space-y-3 my-4">
                <p className="text-[11px] uppercase tracking-widest text-[#8F8A7F] font-medium">
                  Garments in this Outfit ({items.length})
                </p>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#ECE7DD] group hover:border-[#D0CABE] transition-all"
                  >
                    <div
                      className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                      onClick={() => {
                        closeLookModal();
                        openProductDetail(item.id);
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-14 object-cover rounded-md bg-[#ECE8DF] shrink-0"
                      />
                      <div className="truncate pr-2">
                        <span className="text-[10px] uppercase tracking-wider text-[#8A8479]">
                          {item.category}
                        </span>
                        <h4 className="text-xs font-semibold text-[#222220] truncate group-hover:text-[#425042] transition-colors">
                          {item.name}
                        </h4>
                        <span className="text-xs text-[#524E47] font-medium tabular-nums">
                          ${item.price}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => toggleWishlist(item.id)}
                        className="p-1.5 text-[#888379] hover:text-[#8E4341] transition-colors"
                        title="Save to wishlist"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isInWishlist(item.id) ? 'fill-[#8E4341] text-[#8E4341]' : ''
                          }`}
                        />
                      </button>
                      <button
                        onClick={() => addToCart(item, item.sizes[0], item.colors[0], 1)}
                        className="px-3 py-1.5 bg-[#252422] text-[#F8F6F2] hover:bg-[#3D3A35] rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Total & Buy Complete Look */}
            <div className="pt-4 border-t border-[#EAE5DC] space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#706B62]">Complete Outfit Total</span>
                  <p className="text-xs text-[#8A8478]">All {items.length} wardrobe pieces</p>
                </div>
                <span className="font-editorial text-2xl font-medium text-[#1E1E1C] tabular-nums">
                  ${totalLookPrice}
                </span>
              </div>
              <button
                onClick={handleAddAllToBag}
                className="w-full py-3 bg-[#425042] hover:bg-[#364236] text-white rounded-lg text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Add Complete Look to Bag</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, openProductDetail, setActivePage } = useShop();

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleAddAllToCart = () => {
    savedProducts.forEach((p) => {
      addToCart(p, p.sizes[0], p.colors[0], 1);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E8E2D7]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#868177] font-semibold">
            Personal Wardrobe
          </span>
          <h1 className="font-editorial text-4xl font-medium text-[#1E1E1C] mt-1">
            Saved Wishlist ({savedProducts.length})
          </h1>
          <p className="text-xs text-[#736E65] mt-1">
            Garments saved for later consideration or seasonal styling.
          </p>
        </div>

        {savedProducts.length > 0 && (
          <button
            onClick={handleAddAllToCart}
            className="px-5 py-2.5 bg-[#252422] hover:bg-[#3D3B36] text-white rounded-lg text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2 self-start sm:self-auto"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Move All to Bag</span>
          </button>
        )}
      </div>

      {/* Grid or Empty state */}
      {savedProducts.length === 0 ? (
        <div className="py-24 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#EFECE5] flex items-center justify-center text-[#8C877D] mx-auto">
            <Heart className="w-7 h-7 stroke-[1.4]" />
          </div>
          <h3 className="font-editorial text-3xl text-[#1E1E1C]">Your Wishlist is Empty</h3>
          <p className="text-xs text-[#736E65] leading-relaxed">
            Save your favorite silhouettes by tapping the heart icon on any product or look card.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActivePage('shop')}
              className="px-6 py-2.5 bg-[#252422] text-[#F8F6F2] text-xs uppercase tracking-widest font-medium rounded-lg hover:bg-[#3E3C38] transition-colors"
            >
              Explore Collection
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {savedProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="group flex flex-col justify-between"
            >
              <div
                className="aspect-[4/5] rounded-xl overflow-hidden bg-[#ECE8DF] border border-[#E6E1D7] relative cursor-pointer"
                onClick={() => openProductDetail(product.id)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-[#8E4341] transition-all shadow-sm"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="pt-3 pb-1">
                <span className="text-[10px] uppercase tracking-wider text-[#8A8478]">
                  {product.category}
                </span>
                <h3
                  onClick={() => openProductDetail(product.id)}
                  className="text-xs sm:text-sm font-medium text-[#20201E] group-hover:text-[#455345] transition-colors truncate cursor-pointer"
                >
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-1 mb-3">
                  <span className="text-xs sm:text-sm font-semibold text-[#20201E] tabular-nums">
                    ${product.price}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(product, product.sizes[0], product.colors[0], 1)}
                  className="w-full py-2 bg-[#252422] hover:bg-[#3D3A35] text-white rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

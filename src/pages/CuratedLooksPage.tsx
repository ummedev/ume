import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CURATED_LOOKS, PRODUCTS } from '../data/products';

export const CuratedLooksPage: React.FC = () => {
  const { openLookModal, openProductDetail, addToCart } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-14">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#868177] font-semibold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#556754]" /> Seasonal Lookbook
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-medium text-[#1E1E1C]">
          Curated Looks
        </h1>
        <p className="text-xs sm:text-sm text-[#736E65] font-light leading-relaxed">
          Complete outfit formulas designed for ease, quiet elegance, and tactile comfort. Tap any look to explore and shop the component pieces.
        </p>
      </div>

      {/* Grid of Looks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {CURATED_LOOKS.map((look, idx) => {
          const items = look.itemIds
            .map((id) => PRODUCTS.find((p) => p.id === id))
            .filter(Boolean) as typeof PRODUCTS;
          const totalCost = items.reduce((s, i) => s + i.price, 0);

          return (
            <motion.div
              key={look.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#FAF8F5] rounded-3xl overflow-hidden border border-[#E5E0D5] flex flex-col justify-between group shadow-xs"
            >
              {/* Image with zoom effect */}
              <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#ECE8DF] relative">
                <img
                  src={look.image}
                  alt={look.title}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-semibold text-[#252422]">
                  {look.subtitle}
                </div>
              </div>

              {/* Look Info & Breakdown */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-editorial text-3xl font-medium text-[#1E1E1C]">
                      {look.title}
                    </h3>
                    <span className="text-sm font-semibold text-[#1E1E1C] tabular-nums">
                      ${totalCost}
                    </span>
                  </div>
                  <p className="text-xs text-[#736E65] leading-relaxed mb-6 font-light">
                    {look.description}
                  </p>

                  {/* Garment item chips */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C867B] font-medium block">
                      Includes {items.length} Pieces:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => openProductDetail(item.id)}
                          className="px-3 py-1.5 rounded-lg bg-[#EFECE5] hover:bg-[#E5DFD4] text-xs text-[#3E3C38] flex items-center gap-2 transition-colors border border-[#E4DFD4]"
                        >
                          <span className="font-medium">{item.name}</span>
                          <span className="text-[#78746B] tabular-nums">${item.price}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Primary Button */}
                <div className="pt-4 border-t border-[#ECE7DC] flex items-center justify-between gap-4">
                  <button
                    onClick={() => openLookModal(look.id)}
                    className="flex-1 py-3 bg-[#242321] hover:bg-[#3C3A36] text-white rounded-xl text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>Shop The Complete Look</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

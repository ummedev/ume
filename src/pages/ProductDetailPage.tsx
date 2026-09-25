import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Heart,
  ShoppingBag,
  ArrowLeft,
  Star,
  Check,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Ruler
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, Product } from '../data/products';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    setActivePage,
    setSelectedCategory,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openProductDetail
  } = useShop();

  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string>('details');
  const [showSizeModal, setShowSizeModal] = useState(false);

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? '' : section);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-[#7B766D]">
        <button
          onClick={() => setActivePage('home')}
          className="hover:text-[#181816] transition-colors"
        >
          Home
        </button>
        <span>/</span>
        <button
          onClick={() => {
            setSelectedCategory(product.category);
            setActivePage('shop');
          }}
          className="hover:text-[#181816] transition-colors"
        >
          {product.category}
        </button>
        <span>/</span>
        <span className="text-[#1E1E1C] font-medium truncate max-w-[200px]">
          {product.name}
        </span>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        
        {/* Left: Product Imagery Showcase */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#ECE8DF] border border-[#E4DFD5] relative group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.tag && (
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-medium text-[#383632]">
                {product.tag}
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#4A4740] hover:text-[#8E4341] transition-all shadow-sm"
              aria-label="Save to Wishlist"
            >
              <Heart
                className={`w-4 h-4 ${
                  isInWishlist(product.id) ? 'fill-[#8E4341] text-[#8E4341]' : ''
                }`}
              />
            </button>
          </div>

          {/* Secondary Thumbnail Strip */}
          <div className="grid grid-cols-3 gap-3">
            {[product.image, product.image, product.image].map((img, i) => (
              <div
                key={i}
                className="aspect-[4/5] rounded-xl overflow-hidden bg-[#ECE8DF] border border-[#E4DFD5] opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          <div>
            <div className="flex items-center justify-between text-xs text-[#7B766D] mb-1">
              <span className="uppercase tracking-widest font-medium text-[#8F8A7E]">
                {product.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[#222220]">
                <div className="flex items-center text-[#937C42]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <span className="tabular-nums font-medium">{product.rating}</span>
                <span className="text-[#848077]">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl font-normal text-[#1E1E1C]">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 mt-3">
              <span className="font-editorial text-2xl sm:text-3xl font-medium text-[#1E1E1C] tabular-nums">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#8F8A80] line-through tabular-nums">
                  ${product.originalPrice}
                </span>
              )}
              <span className="text-xs text-[#3E5540] font-medium bg-[#E7EFE6] px-2 py-0.5 rounded">
                In Stock & Ready to Ship
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#666259] mt-4 leading-relaxed font-light">
              {product.description}
            </p>
          </div>

          <div className="border-t border-b border-[#E8E2D7] py-6 space-y-5">
            {/* Color Swatches */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2.5">
                <span className="font-medium text-[#2E2C28]">
                  Color: <strong className="text-[#181816] font-semibold">{selectedColor.name}</strong>
                </span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-7 h-7 rounded-full border-2 transition-all relative ${
                      selectedColor.name === c.name
                        ? 'border-[#222220] scale-110 shadow-sm'
                        : 'border-white hover:border-[#BBB5A8]'
                    }`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2.5">
                <span className="font-medium text-[#2E2C28]">
                  Size: <strong className="text-[#181816] font-semibold">{selectedSize}</strong>
                </span>
                <button
                  onClick={() => setShowSizeModal(true)}
                  className="flex items-center gap-1 text-[11px] text-[#556754] hover:underline"
                >
                  <Ruler className="w-3 h-3" />
                  <span>Size & Measurements</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 rounded-lg text-xs font-medium transition-all ${
                      selectedSize === size
                        ? 'bg-[#222220] text-white shadow-sm'
                        : 'bg-[#FAF8F5] border border-[#DDD7CD] text-[#44413B] hover:border-[#B3ABA0]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Bag */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center border border-[#DDD7CD] rounded-lg bg-[#FAF8F5] h-12 px-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-sm font-semibold text-[#66625A] hover:text-[#181816] px-1"
                >
                  -
                </button>
                <span className="px-3 text-xs font-semibold text-[#1E1E1C] tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="text-sm font-semibold text-[#66625A] hover:text-[#181816] px-1"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 h-12 bg-[#222220] hover:bg-[#393733] text-white rounded-lg text-xs uppercase tracking-widest font-medium transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.99]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag · ${(product.price * quantity).toFixed(0)}</span>
              </button>
            </div>
          </div>

          {/* Accordion Tabs */}
          <div className="space-y-2 pt-1 text-xs">
            {/* Accordion 1: Fabric & Craftsmanship */}
            <div className="border border-[#E5E0D6] rounded-xl overflow-hidden bg-[#FAF8F5]">
              <button
                onClick={() => toggleAccordion('details')}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left font-medium text-[#222220]"
              >
                <span>Material & Sustainable Origin</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#8C877D] transition-transform ${
                    openAccordion === 'details' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === 'details' && (
                <div className="px-4 pb-4 pt-1 text-[#66625A] space-y-2 border-t border-[#ECE7DC]">
                  <p className="font-semibold text-[#222220]">{product.fabric}</p>
                  <ul className="list-disc pl-4 space-y-1">
                    {product.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Accordion 2: Shipping & Returns */}
            <div className="border border-[#E5E0D6] rounded-xl overflow-hidden bg-[#FAF8F5]">
              <button
                onClick={() => toggleAccordion('shipping')}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left font-medium text-[#222220]"
              >
                <span>Shipping, Duties & 30-Day Returns</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#8C877D] transition-transform ${
                    openAccordion === 'shipping' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === 'shipping' && (
                <div className="px-4 pb-4 pt-1 text-[#66625A] space-y-2 border-t border-[#ECE7DC] leading-relaxed">
                  <p>
                    Complimentary carbon-neutral standard delivery on orders exceeding $150.
                    Orders ship inside recyclable organic cotton dust pouches within 24 hours.
                  </p>
                  <p>
                    We offer hassle-free 30-day global returns and instant sizing exchanges.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 gap-3 pt-3">
            <div className="flex items-center gap-2 text-[11px] text-[#635F56]">
              <Truck className="w-3.5 h-3.5 text-[#4A594A]" />
              <span>Complimentary shipping over $150</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#635F56]">
              <RotateCcw className="w-3.5 h-3.5 text-[#4A594A]" />
              <span>Free 30-day exchange service</span>
            </div>
          </div>
        </div>

      </div>

      {/* Recommended / Matching Pairings Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-16 border-t border-[#E5E0D6]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#8F8A7E] font-semibold">
                Complete The Silhouette
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-[#1E1E1C]">
                Wear It With
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                onClick={() => openProductDetail(item.id)}
                className="group cursor-pointer flex flex-col justify-between"
              >
                <div className="aspect-[4/5] rounded-xl overflow-hidden bg-[#ECE8DF] border border-[#E6E1D7] relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="pt-3">
                  <h4 className="text-xs sm:text-sm font-medium text-[#20201E] group-hover:text-[#455345] transition-colors truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-[#20201E] tabular-nums mt-0.5">
                    ${item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sizing Modal */}
      {showSizeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-[#FAF8F5] rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-[#E6E1D7] shadow-2xl relative">
            <h3 className="font-editorial text-2xl font-medium text-[#1E1E1C] mb-2">
              Size & Measurements Guide
            </h3>
            <p className="text-xs text-[#706B62] mb-6">
              All garments are tailored true to European standard sizing with an effortless relaxed drape.
            </p>
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#DDD7CD] text-[#706B62]">
                    <th className="py-2">Size</th>
                    <th className="py-2">Chest (cm)</th>
                    <th className="py-2">Waist (cm)</th>
                    <th className="py-2">Hip (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBE5DC]">
                  <tr><td className="py-2 font-medium">XS (34)</td><td>82 - 86</td><td>64 - 68</td><td>88 - 92</td></tr>
                  <tr><td className="py-2 font-medium">S (36)</td><td>86 - 90</td><td>68 - 72</td><td>92 - 96</td></tr>
                  <tr><td className="py-2 font-medium">M (38)</td><td>90 - 94</td><td>72 - 76</td><td>96 - 100</td></tr>
                  <tr><td className="py-2 font-medium">L (40)</td><td>94 - 100</td><td>76 - 82</td><td>100 - 106</td></tr>
                  <tr><td className="py-2 font-medium">XL (42)</td><td>100 - 106</td><td>82 - 88</td><td>106 - 112</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowSizeModal(false)}
                className="px-5 py-2 bg-[#222220] text-white rounded-lg text-xs font-medium"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

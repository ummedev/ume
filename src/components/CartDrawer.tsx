import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    setActivePage
  } = useShop();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  const freeShippingThreshold = 150;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);
  const progressPercent = Math.min(100, (cartTotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'SPRING20' || promoCode.trim().toUpperCase() === 'AURA10') {
      const discount = promoCode.trim().toUpperCase() === 'SPRING20' ? cartTotal * 0.2 : cartTotal * 0.1;
      setPromoDiscount(discount);
      setPromoApplied(true);
    }
  };

  const finalTotal = Math.max(0, cartTotal - promoDiscount);

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setActivePage('checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-[#141312]/45 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[440px] bg-[#FAF8F5] z-50 shadow-2xl flex flex-col justify-between overflow-hidden border-l border-[#E8E2D8]"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#E8E3DA] flex items-center justify-between bg-[#FAF8F5]">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#2A2926]" />
                <h3 className="font-editorial text-xl font-medium tracking-wide text-[#1A1918]">
                  Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 -mr-2 text-[#5E5A53] hover:text-[#181816] hover:bg-[#EFEBE4] rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Meter */}
            <div className="bg-[#EFECE5] px-6 py-3 border-b border-[#E6E1D7]">
              <div className="text-xs text-[#4F4B43] mb-1.5 flex items-center justify-between">
                <span>
                  {remainingForFreeShipping > 0
                    ? `Add $${remainingForFreeShipping.toFixed(0)} more for Complimentary Shipping`
                    : '🎉 You have unlocked Free Standard Shipping!'}
                </span>
                <span className="font-medium text-[#2C382E] tabular-nums">
                  ${cartTotal.toFixed(0)} / ${freeShippingThreshold}
                </span>
              </div>
              <div className="w-full bg-[#DFD9CD] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#485648] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 no-scrollbar">
              {cart.length === 0 ? (
                <div className="py-20 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#EFECE6] flex items-center justify-center text-[#8C877D] mb-4">
                    <ShoppingBag className="w-8 h-8 stroke-[1.4]" />
                  </div>
                  <h4 className="font-editorial text-2xl text-[#222220] mb-2">Your Bag is Empty</h4>
                  <p className="text-xs text-[#736E66] max-w-[240px] mb-6">
                    Discover timeless wardrobe essentials designed for effortless everyday wear.
                  </p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setActivePage('shop');
                    }}
                    className="px-6 py-2.5 bg-[#252422] text-[#F8F6F2] text-xs uppercase tracking-widest font-medium rounded-lg hover:bg-[#3E3C38] transition-colors"
                  >
                    Explore Collection
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <motion.div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}-${idx}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-4 p-3 bg-white/80 rounded-xl border border-[#ECE7DD] shadow-sm relative group"
                  >
                    <div className="w-20 h-24 rounded-lg overflow-hidden bg-[#EFECE6] shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-semibold text-[#1F1E1C] truncate">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(idx)}
                            className="text-[#9C968B] hover:text-[#8B3A36] p-1 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-[#7A756D] mt-0.5">
                          Size: {item.selectedSize} &nbsp;·&nbsp; {item.selectedColor.name}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#D9D3C8] rounded-md bg-[#FAF8F5]">
                          <button
                            onClick={() => updateCartQuantity(idx, -1)}
                            className="p-1 text-[#645F56] hover:text-[#181816]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-medium text-[#222220] tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(idx, 1)}
                            className="p-1 text-[#645F56] hover:text-[#181816]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-sm font-semibold text-[#1F1E1C] tabular-nums">
                          ${(item.product.price * item.quantity).toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Calculation & Actions */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-[#E8E2D8] bg-[#FAF8F5] space-y-4">
                {/* Promo Code Input */}
                {!promoApplied ? (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. SPRING20)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white border border-[#D9D4CB] rounded-lg text-xs placeholder:text-[#A19B91] focus:outline-none focus:border-[#4A5D4E]"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-[#EFECE5] text-[#2F2D2A] text-xs font-medium rounded-lg hover:bg-[#E5E0D5] transition-colors whitespace-nowrap"
                    >
                      Apply
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between text-xs bg-[#EAF0E9] text-[#2E4731] px-3 py-2 rounded-lg">
                    <span>Discount applied ({promoCode.toUpperCase()})</span>
                    <span className="font-semibold tabular-nums">-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}

                {/* Subtotal lines */}
                <div className="space-y-1.5 text-xs text-[#6B665E]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-[#1E1E1C] tabular-nums">${cartTotal.toFixed(2)}</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-[#2D4E32]">
                      <span>Seasonal Promotion</span>
                      <span className="tabular-nums">-${promoDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span>{remainingForFreeShipping === 0 ? 'Complimentary' : '$12.00'}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-[#181816] pt-2 border-t border-[#EAE4DA]">
                    <span>Total</span>
                    <span className="tabular-nums">${(finalTotal + (remainingForFreeShipping === 0 ? 0 : 12)).toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3.5 bg-[#222220] hover:bg-[#3A3834] text-white rounded-lg text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 group shadow-sm"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#7C776E]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#485648]" />
                  <span>Secure 256-bit encrypted SSL checkout</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

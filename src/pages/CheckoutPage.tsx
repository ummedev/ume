import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Truck,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  Banknote
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CheckoutPage: React.FC = () => {
  const { cart, cartTotal, clearCart, setActivePage } = useShop();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    firstName: 'Clara',
    lastName: 'Vandermeer',
    email: 'clara.vandermeer@atelier.com',
    phone: '+1 (555) 382-9102',
    address: '742 Evergreen Terrace, Apt 4B',
    city: 'New York',
    state: 'NY',
    postalCode: '10013',
    country: 'United States',
    shippingMethod: 'standard', // 'standard' | 'express'
    paymentMethod: 'card', // 'card' | 'cod' | 'applepay'
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '08/28',
    cardCvc: '•••'
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  const shippingCost = formData.shippingMethod === 'express' ? 18 : (cartTotal >= 150 ? 0 : 12);
  const tax = cartTotal * 0.08;
  const grandTotal = cartTotal + shippingCost + tax;

  const handleInputChange = (field: string, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handlePlaceOrder = () => {
    const generatedId = `AURA-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderConfirmed(true);
    clearCart();
  };

  if (orderConfirmed) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 20 }}
          className="w-16 h-16 rounded-full bg-[#E5EFE2] text-[#345837] flex items-center justify-center mx-auto"
        >
          <CheckCircle2 className="w-8 h-8" />
        </motion.div>

        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#556754] font-semibold">
            Order Confirmed
          </span>
          <h1 className="font-editorial text-4xl font-normal text-[#1E1E1C] mt-1">
            Thank you for your order, {formData.firstName}.
          </h1>
          <p className="text-xs text-[#736E65] mt-2">
            Order Reference: <strong className="text-[#1E1E1C] font-mono">{orderId}</strong>
          </p>
        </div>

        <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#E8E2D7] text-left text-xs space-y-3">
          <div className="flex justify-between border-b border-[#ECE6DC] pb-2">
            <span className="text-[#736E65]">Delivery Address</span>
            <span className="font-medium text-[#1E1E1C] text-right">
              {formData.address}, {formData.city}, {formData.postalCode}
            </span>
          </div>
          <div className="flex justify-between border-b border-[#ECE6DC] pb-2">
            <span className="text-[#736E65]">Shipping Method</span>
            <span className="font-medium text-[#1E1E1C]">
              {formData.shippingMethod === 'express' ? 'Express Courier (1-2 days)' : 'Complimentary Standard (3-5 days)'}
            </span>
          </div>
          <div className="flex justify-between border-b border-[#ECE6DC] pb-2">
            <span className="text-[#736E65]">Payment Method</span>
            <span className="font-medium text-[#1E1E1C] uppercase">
              {formData.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Credit Card (•••• 4242)'}
            </span>
          </div>
          <div className="flex justify-between pt-1 font-semibold text-sm text-[#1E1E1C]">
            <span>Total Paid</span>
            <span className="tabular-nums">${grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <p className="text-xs text-[#858076] leading-relaxed max-w-sm mx-auto">
          A confirmation dispatch email and tracking token have been sent to <strong>{formData.email}</strong>.
        </p>

        <button
          onClick={() => setActivePage('home')}
          className="px-8 py-3 bg-[#242321] text-white rounded-lg text-xs uppercase tracking-widest font-medium hover:bg-[#3E3C38] transition-colors"
        >
          Return to Boutique
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-editorial text-3xl text-[#1E1E1C]">Bag is empty</h2>
        <p className="text-xs text-[#736E65]">You have no garments queued for checkout.</p>
        <button
          onClick={() => setActivePage('shop')}
          className="px-6 py-2.5 bg-[#252422] text-white text-xs uppercase tracking-widest font-medium rounded-lg"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-[#E8E2D7] mb-8">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#868177] font-semibold">
            Secure Checkout
          </span>
          <h1 className="font-editorial text-3xl font-medium text-[#1E1E1C]">
            Order Information
          </h1>
        </div>
        <button
          onClick={() => setActivePage('shop')}
          className="text-xs text-[#526051] hover:underline flex items-center gap-1 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Checkout Steps & Forms */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Shipping Address */}
          <div className="bg-[#FAF8F5] rounded-2xl p-6 sm:p-8 border border-[#E8E2D7] space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm uppercase tracking-wider font-semibold text-[#1E1E1C]">
                1. Delivery Address
              </h3>
              <span className="text-xs text-[#8C867B]">Required for shipment</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-[#69645B] block mb-1">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#D9D3C7] rounded-lg text-xs text-[#222220] focus:outline-none focus:border-[#4A5D4E]"
                />
              </div>
              <div>
                <label className="text-[11px] text-[#69645B] block mb-1">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#D9D3C7] rounded-lg text-xs text-[#222220] focus:outline-none focus:border-[#4A5D4E]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-[#69645B] block mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#D9D3C7] rounded-lg text-xs text-[#222220] focus:outline-none focus:border-[#4A5D4E]"
                />
              </div>
              <div>
                <label className="text-[11px] text-[#69645B] block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#D9D3C7] rounded-lg text-xs text-[#222220] focus:outline-none focus:border-[#4A5D4E]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-[#69645B] block mb-1">Street Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#D9D3C7] rounded-lg text-xs text-[#222220] focus:outline-none focus:border-[#4A5D4E]"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-[#69645B] block mb-1">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#D9D3C7] rounded-lg text-xs text-[#222220] focus:outline-none focus:border-[#4A5D4E]"
                />
              </div>
              <div>
                <label className="text-[11px] text-[#69645B] block mb-1">Postal Code</label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#D9D3C7] rounded-lg text-xs text-[#222220] focus:outline-none focus:border-[#4A5D4E]"
                />
              </div>
              <div>
                <label className="text-[11px] text-[#69645B] block mb-1">Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#D9D3C7] rounded-lg text-xs text-[#222220] focus:outline-none focus:border-[#4A5D4E]"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Shipping Method */}
          <div className="bg-[#FAF8F5] rounded-2xl p-6 sm:p-8 border border-[#E8E2D7] space-y-4">
            <h3 className="text-sm uppercase tracking-wider font-semibold text-[#1E1E1C]">
              2. Shipping Method
            </h3>
            <div className="space-y-2.5">
              <label
                onClick={() => handleInputChange('shippingMethod', 'standard')}
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                  formData.shippingMethod === 'standard'
                    ? 'border-[#222220] bg-white'
                    : 'border-[#E4DFD5] bg-[#F5F2EC]/60 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={formData.shippingMethod === 'standard'}
                    onChange={() => handleInputChange('shippingMethod', 'standard')}
                    className="accent-[#222220]"
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#1E1E1C]">Complimentary Carbon-Neutral Standard</p>
                    <p className="text-[11px] text-[#78746B]">Delivery in 3–5 business days</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#1E1E1C]">
                  {cartTotal >= 150 ? 'Free' : '$12.00'}
                </span>
              </label>

              <label
                onClick={() => handleInputChange('shippingMethod', 'express')}
                className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                  formData.shippingMethod === 'express'
                    ? 'border-[#222220] bg-white'
                    : 'border-[#E4DFD5] bg-[#F5F2EC]/60 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={formData.shippingMethod === 'express'}
                    onChange={() => handleInputChange('shippingMethod', 'express')}
                    className="accent-[#222220]"
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#1E1E1C]">Priority Air Courier</p>
                    <p className="text-[11px] text-[#78746B]">Delivered in 1–2 business days via DHL Express</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#1E1E1C]">$18.00</span>
              </label>
            </div>
          </div>

          {/* Step 3: Payment Options */}
          <div className="bg-[#FAF8F5] rounded-2xl p-6 sm:p-8 border border-[#E8E2D7] space-y-4">
            <h3 className="text-sm uppercase tracking-wider font-semibold text-[#1E1E1C]">
              3. Payment Selection
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleInputChange('paymentMethod', 'card')}
                className={`p-3.5 rounded-xl border text-left flex items-center gap-2.5 transition-colors ${
                  formData.paymentMethod === 'card'
                    ? 'border-[#222220] bg-white shadow-xs'
                    : 'border-[#E4DFD5] bg-[#F5F2EC]/50 hover:bg-white'
                }`}
              >
                <CreditCard className="w-4 h-4 text-[#3E3C38]" />
                <span className="text-xs font-semibold text-[#1E1E1C]">Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => handleInputChange('paymentMethod', 'cod')}
                className={`p-3.5 rounded-xl border text-left flex items-center gap-2.5 transition-colors ${
                  formData.paymentMethod === 'cod'
                    ? 'border-[#222220] bg-white shadow-xs'
                    : 'border-[#E4DFD5] bg-[#F5F2EC]/50 hover:bg-white'
                }`}
              >
                <Banknote className="w-4 h-4 text-[#3E3C38]" />
                <span className="text-xs font-semibold text-[#1E1E1C]">Cash on Delivery</span>
              </button>
            </div>

            {formData.paymentMethod === 'card' ? (
              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-[11px] text-[#69645B] block mb-1">Card Number</label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D9D3C7] rounded-lg text-xs font-mono text-[#222220] focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-[#69645B] block mb-1">Expiry Date</label>
                    <input
                      type="text"
                      value={formData.cardExpiry}
                      onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#D9D3C7] rounded-lg text-xs font-mono text-[#222220] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#69645B] block mb-1">CVC Code</label>
                    <input
                      type="text"
                      value={formData.cardCvc}
                      onChange={(e) => handleInputChange('cardCvc', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#D9D3C7] rounded-lg text-xs font-mono text-[#222220] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-[#EAF0E8] border border-[#CAD9C7] rounded-xl text-xs text-[#2A472D] leading-relaxed">
                <p className="font-semibold">Cash on Delivery selected.</p>
                <p className="mt-1">
                  You can inspect the garments upon arrival and hand payment directly to the courier agent.
                </p>
              </div>
            )}
          </div>

          {/* Complete Purchase Button */}
          <button
            onClick={handlePlaceOrder}
            className="w-full py-4 bg-[#242321] hover:bg-[#3D3A35] text-white rounded-xl text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.99]"
          >
            <span>Complete Order · ${grandTotal.toFixed(2)}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5 bg-[#FAF8F5] rounded-2xl p-6 sm:p-8 border border-[#E8E2D7] space-y-6 lg:sticky lg:top-28">
          <div className="flex items-center justify-between border-b border-[#ECE6DC] pb-4">
            <h3 className="text-sm uppercase tracking-wider font-semibold text-[#1E1E1C]">
              Order Summary ({cart.length})
            </h3>
            <span className="text-xs text-[#7A756B]">{cart.reduce((s, i) => s + i.quantity, 0)} items</span>
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto no-scrollbar">
            {cart.map((item, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-14 h-16 object-cover rounded-md bg-[#ECE7DC]"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-medium text-[#222220] truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-[11px] text-[#7A756B]">
                    Size: {item.selectedSize} · Qty: {item.quantity}
                  </p>
                  <span className="text-xs font-semibold text-[#222220] tabular-nums">
                    ${(item.product.price * item.quantity).toFixed(0)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[#ECE6DC] pt-4 space-y-2 text-xs text-[#6B665E]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-[#1E1E1C] font-medium tabular-nums">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Sales Tax</span>
              <span className="tabular-nums">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-semibold text-[#1E1E1C] pt-2 border-t border-[#ECE6DC]">
              <span>Total Amount</span>
              <span className="tabular-nums">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#777269] pt-2">
            <ShieldCheck className="w-4 h-4 text-[#4A574A]" />
            <span>Encrypted checkout with 30-day money-back guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ArrowRight, Instagram, Twitter, Compass, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { setActivePage, setSelectedCategory, showToast } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    showToast('Subscribed to AURA Journal', 'Enjoy 10% off your first order.');
    setEmail('');
  };

  const handleCategoryNav = (cat: string) => {
    setSelectedCategory(cat);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#EFECE5]/85 backdrop-blur-md text-[#222220] border-t border-[#E4DFD5]/80 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-[#DFD8CC]">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-editorial text-2xl tracking-[0.25em] font-medium text-[#1E1E1C] uppercase">
                A U R A
              </span>
              <span className="block text-[10px] uppercase tracking-[0.28em] text-[#858076] mt-0.5">
                Elevated Essentials
              </span>
            </div>
            
            <p className="text-xs text-[#6F6A60] max-w-sm leading-relaxed">
              Designed for life. Made to last. We craft enduring wardrobe staples grounded in natural textiles, architectural silhouettes, and thoughtful minimalism.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#instagram"
                onClick={(e) => { e.preventDefault(); showToast('AURA Atelier on Instagram', '@aura.studios'); }}
                className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#DDD7CC] flex items-center justify-center text-[#555148] hover:text-[#181816] hover:border-[#B5AEA1] transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="#pinterest"
                onClick={(e) => { e.preventDefault(); showToast('AURA Moodboard on Pinterest', 'aura.essentials'); }}
                className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#DDD7CC] flex items-center justify-center text-[#555148] hover:text-[#181816] hover:border-[#B5AEA1] transition-all"
                aria-label="Pinterest"
              >
                <Compass className="w-3.5 h-3.5" />
              </a>
              <a
                href="#twitter"
                onClick={(e) => { e.preventDefault(); showToast('AURA on X', '@auraclothing'); }}
                className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#DDD7CC] flex items-center justify-center text-[#555148] hover:text-[#181816] hover:border-[#B5AEA1] transition-all"
                aria-label="Twitter / X"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#8C867B] mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5 text-xs text-[#524E45]">
              <li>
                <button
                  onClick={() => { setSelectedCategory(null); setActivePage('shop'); }}
                  className="hover:text-[#181816] transition-colors"
                >
                  All Products
                </button>
              </li>
              {['Knitwear', 'Shirts', 'Trousers', 'Jackets', 'Basics', 'Accessories'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryNav(cat)}
                    className="hover:text-[#181816] transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#8C867B] mb-4">
              About
            </h4>
            <ul className="space-y-2.5 text-xs text-[#524E45]">
              <li>
                <button onClick={() => setActivePage('about')} className="hover:text-[#181816] transition-colors">
                  Our Story
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('about')} className="hover:text-[#181816] transition-colors">
                  Sustainability
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('about')} className="hover:text-[#181816] transition-colors">
                  Craftsmanship
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('looks')} className="hover:text-[#181816] transition-colors">
                  Curated Looks
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('contact')} className="hover:text-[#181816] transition-colors">
                  Careers & Press
                </button>
              </li>
            </ul>
          </div>

          {/* Help & Newsletter Column */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#8C867B] mb-4">
              Newsletter
            </h4>
            <p className="text-xs text-[#6F6A60] mb-3 leading-relaxed">
              Join our private list for seasonal releases, archive previews, and private styling notes.
            </p>

            {subscribed ? (
              <div className="bg-[#E4EDE2] border border-[#CCDBC8] text-[#29422B] px-3 py-2 rounded-lg text-xs flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#3E6542]" />
                <span>Thank you. Your 10% code is <strong>AURA10</strong></span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D3C7] rounded-lg text-xs placeholder:text-[#A19B90] text-[#1E1E1C] focus:outline-none focus:border-[#4B5E4F] transition-colors pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-2 bg-[#252422] text-[#F8F6F2] hover:bg-[#3D3A35] rounded-md transition-colors flex items-center justify-center"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <div className="mt-5 pt-4 border-t border-[#DFD8CC]">
              <h5 className="text-[10px] uppercase tracking-wider font-semibold text-[#8C867B] mb-1.5">
                Customer Care
              </h5>
              <p className="text-xs text-[#6B665C]">
                concierge@auraclothing.com
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#807B71] gap-4">
          <p>© 2026 AURA Studios. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs">
            <button onClick={() => setActivePage('contact')} className="hover:text-[#222220] transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => setActivePage('contact')} className="hover:text-[#222220] transition-colors">
              Terms & Conditions
            </button>
            <button onClick={() => setActivePage('contact')} className="hover:text-[#222220] transition-colors">
              Accessibility
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

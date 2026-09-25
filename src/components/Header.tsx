import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Heart, ShoppingBag, User } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Header: React.FC = () => {
  const {
    setActivePage,
    activePage,
    cartCount,
    wishlist,
    isMenuOpen,
    setIsMenuOpen,
    setIsCartOpen,
    setIsSearchOpen
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [showPromo, setShowPromo] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Quiet Announcement Bar */}
      {showPromo && (
        <div className="bg-[#EFECE6]/80 backdrop-blur-md border-b border-[#E5E0D8]/60 text-[#55524B] px-4 py-2 text-xs text-center font-normal tracking-wide relative flex items-center justify-center">
          <span>Free shipping on orders over $150 &nbsp;·&nbsp; Easy 30-day returns</span>
          <button
            onClick={() => setShowPromo(false)}
            className="absolute right-4 text-[#8C877D] hover:text-[#222220] transition-colors p-1"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Top Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F8F6F2]/85 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.04)] border-b border-[#ECE7DE]/80'
            : 'bg-[#F8F6F2]/60 backdrop-blur-sm border-b border-[#E8E2D7]/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Top-Left: Menu bar button (all pages are inside this drawer) */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group flex items-center gap-2.5 px-3 py-2 -ml-3 rounded-lg text-[#2A2926] hover:bg-[#EFECE6] transition-colors focus-visible:outline-2 focus-visible:outline-[#4A5D4E]"
              aria-label="Toggle Navigation Menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between py-0.5">
                <span
                  className={`block h-0.5 bg-[#2A2926] transition-all duration-300 origin-left ${
                    isMenuOpen ? 'w-5 rotate-45 translate-x-0.5 -translate-y-0.5' : 'w-5'
                  }`}
                />
                <span
                  className={`block h-0.5 bg-[#2A2926] transition-all duration-200 ${
                    isMenuOpen ? 'opacity-0' : 'w-3.5'
                  }`}
                />
                <span
                  className={`block h-0.5 bg-[#2A2926] transition-all duration-300 origin-left ${
                    isMenuOpen ? 'w-5 -rotate-45 translate-x-0.5 translate-y-0.5' : 'w-4'
                  }`}
                />
              </div>
              <span className="text-xs uppercase tracking-widest font-medium text-[#484642] group-hover:text-[#181816]">
                Menu
              </span>
            </button>
          </div>

          {/* Center: Brand Name "AURA" */}
          <div className="flex-1 flex flex-col items-center justify-center cursor-pointer select-none" onClick={() => setActivePage('home')}>
            <span className="font-editorial text-2xl sm:text-3xl tracking-[0.28em] font-medium text-[#1E1E1C] uppercase pl-1">
              A U R A
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-[#868278] -mt-0.5 font-light">
              Elevated Essentials
            </span>
          </div>

          {/* Right Action Icons: Search, User, Wishlist, Bag */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#3A3834] hover:text-[#181816] hover:bg-[#EFECE6] rounded-full transition-colors"
              aria-label="Search items"
            >
              <Search className="w-4.5 h-4.5 stroke-[1.6]" />
            </button>

            {/* Profile / Account */}
            <button
              onClick={() => setActivePage('contact')}
              className="hidden sm:flex p-2 text-[#3A3834] hover:text-[#181816] hover:bg-[#EFECE6] rounded-full transition-colors"
              aria-label="User account and atelier"
            >
              <User className="w-4.5 h-4.5 stroke-[1.6]" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setActivePage('wishlist')}
              className="relative p-2 text-[#3A3834] hover:text-[#181816] hover:bg-[#EFECE6] rounded-full transition-colors"
              aria-label="Wishlist"
            >
              <Heart className={`w-4.5 h-4.5 stroke-[1.6] ${wishlist.length > 0 ? 'fill-[#8A4A48] text-[#8A4A48]' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#4A564A] text-white text-[10px] font-semibold flex items-center justify-center rounded-full leading-none">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#3A3834] hover:text-[#181816] hover:bg-[#EFECE6] rounded-full transition-colors"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-4.5 h-4.5 stroke-[1.6]" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#222220] text-white text-[10px] font-medium flex items-center justify-center rounded-full leading-none">
                {cartCount}
              </span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

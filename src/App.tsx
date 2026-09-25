import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { MenuDrawer } from './components/MenuDrawer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { LookDetailModal } from './components/LookDetailModal';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';
import { Image as ImageIcon } from 'lucide-react';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CuratedLooksPage } from './pages/CuratedLooksPage';
import { AboutPage } from './pages/AboutPage';
import { WishlistPage } from './pages/WishlistPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ContactPage } from './pages/ContactPage';

const AppContent: React.FC = () => {
  const { activePage } = useShop();
  // Background visibility preset: 'vivid' | 'standard' | 'soft'
  const [bgMode, setBgMode] = useState<'vivid' | 'standard' | 'soft'>('standard');

  const renderActivePage = () => {
    switch (activePage) {
      case 'shop':
        return <ShopPage />;
      case 'product':
        return <ProductDetailPage />;
      case 'looks':
        return <CuratedLooksPage />;
      case 'about':
        return <AboutPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  const getOverlayClass = () => {
    switch (bgMode) {
      case 'vivid':
        return 'bg-[#F8F6F2]/40 backdrop-blur-[0.5px]';
      case 'soft':
        return 'bg-[#F8F6F2]/75 backdrop-blur-[2px]';
      case 'standard':
      default:
        return 'bg-[#F8F6F2]/55 backdrop-blur-[1px]';
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col text-[#222220] selection:bg-[#4A5D4E] selection:text-white">
      {/* 
        GLOBAL FULL-PAGE BACKGROUND FROM HOME PAGE
        Applies the iconic home page model & Mediterranean colonnade picture as a full-bleed backdrop across all pages.
      */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <img
          src="/images/hero_fashion_model_1790326612233.jpg"
          alt="AURA Background Atmosphere"
          className="w-full h-full object-cover object-center scale-[1.01] transition-transform duration-700 will-change-transform"
        />
        {/* Atmospheric luxury wash that keeps all text and products readable while highlighting the background photograph */}
        <div className={`absolute inset-0 transition-colors duration-500 ${getOverlayClass()}`} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-[#F8F6F2]/60 pointer-events-none" />
      </div>

      {/* Floating Background Clarity Controller */}
      <div className="fixed bottom-5 left-5 z-40 hidden sm:flex items-center gap-1.5 bg-[#FAF8F5]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#DFD9CD] shadow-lg text-[11px] text-[#4F4B43]">
        <ImageIcon className="w-3.5 h-3.5 text-[#5A6859]" />
        <span className="font-medium mr-1">Backdrop:</span>
        <button
          onClick={() => setBgMode('vivid')}
          className={`px-2 py-0.5 rounded-full transition-all ${
            bgMode === 'vivid'
              ? 'bg-[#222220] text-white font-semibold shadow-xs'
              : 'hover:bg-[#EFEBE4] text-[#69655C]'
          }`}
          title="Maximum picture visibility"
        >
          Vivid
        </button>
        <button
          onClick={() => setBgMode('standard')}
          className={`px-2 py-0.5 rounded-full transition-all ${
            bgMode === 'standard'
              ? 'bg-[#222220] text-white font-semibold shadow-xs'
              : 'hover:bg-[#EFEBE4] text-[#69655C]'
          }`}
          title="Balanced editorial background"
        >
          Normal
        </button>
        <button
          onClick={() => setBgMode('soft')}
          className={`px-2 py-0.5 rounded-full transition-all ${
            bgMode === 'soft'
              ? 'bg-[#222220] text-white font-semibold shadow-xs'
              : 'hover:bg-[#EFEBE4] text-[#69655C]'
          }`}
          title="Subtle atmospheric backdrop"
        >
          Soft
        </button>
      </div>

      {/* Content wrapper sitting proudly on top of the background */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Navigation Bar with Menu Bar Trigger on top left */}
        <Header />

        {/* Global Interactive Overlays */}
        <MenuDrawer />
        <CartDrawer />
        <SearchModal />
        <LookDetailModal />
        <ToastContainer />

        {/* Main Page Content with Smooth Transition */}
        <main className="flex-1 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {renderActivePage()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}

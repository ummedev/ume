import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ToastContainer: React.FC = () => {
  const { toasts } = useShop();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto bg-[#1E1E1C] text-[#FAF8F5] p-3.5 rounded-xl shadow-xl border border-[#3A3834] flex items-center gap-3 min-w-[280px]"
          >
            {toast.image ? (
              <img
                src={toast.image}
                alt=""
                className="w-10 h-12 object-cover rounded-md bg-[#33322E] shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#3F4F3F] text-white flex items-center justify-center shrink-0">
                <Check className="w-4 h-4" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#F7F5F0] truncate">{toast.title}</p>
              {toast.subtitle && (
                <p className="text-[11px] text-[#A6A095] truncate">{toast.subtitle}</p>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

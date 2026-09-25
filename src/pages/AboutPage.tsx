import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShieldCheck, Heart, Leaf, Globe, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AboutPage: React.FC = () => {
  const { setActivePage } = useShop();

  const values = [
    {
      icon: Leaf,
      title: 'Material Purity',
      desc: 'We strictly source 100% natural fibers: GOTS certified organic cotton, certified Belgian linen, and cruelty-free Grade-A Mongolian cashmere.'
    },
    {
      icon: ShieldCheck,
      title: 'Built For Longevity',
      desc: 'Every seam is double-bound with high-tensile core stitching and French seams to ensure our pieces endure through years of continuous wear.'
    },
    {
      icon: Globe,
      title: 'Zero-Waste Patterning',
      desc: 'Our pattern cutters operate with tight digital nesting algorithms, minimizing fabric scrap loss to under 3% across our manufacturing cycle.'
    },
    {
      icon: Heart,
      title: 'Fair Human Labor',
      desc: 'Crafted exclusively in small family-owned ateliers in Portugal and Northern Italy where artisans receive living wages and safe conditions.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 sm:space-y-24">
      {/* Hero Brand Statement */}
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#868177] font-semibold">
          The AURA Philosophy
        </span>
        <h1 className="font-editorial text-4xl sm:text-6xl font-normal text-[#1E1E1C] leading-[1.12]">
          Thoughtful clothes for considered living.
        </h1>
        <p className="text-sm sm:text-base text-[#6E6960] font-light leading-relaxed">
          Founded on the principle that true luxury is quiet, tactile, and grounded in purpose. We reject seasonal trends in favor of enduring silhouettes that seamlessly integrate into your daily life.
        </p>
      </div>

      {/* Editorial Photo Collage */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-7 rounded-3xl overflow-hidden bg-[#ECE8DF] aspect-[16/10] border border-[#E6E1D7]">
          <img
            src="/images/hero_fashion_model_1790326612233.jpg"
            alt="AURA Atelier Craftsmanship"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:col-span-5 bg-[#EFECE5] rounded-3xl p-8 sm:p-10 border border-[#E5E0D5] space-y-4">
          <span className="text-[10px] uppercase tracking-widest text-[#556754] font-semibold">
            The Atelier Story
          </span>
          <h2 className="font-editorial text-3xl font-medium text-[#1E1E1C]">
            From yarn to garment
          </h2>
          <p className="text-xs sm:text-sm text-[#6C675E] leading-relaxed font-light">
            Every garment begins in our fabric archive, where natural raw materials dictate the drape. We believe when clothing fits effortlessly, it frees you to focus on what matters most.
          </p>
          <div className="pt-4 border-t border-[#DFD8CC]">
            <p className="text-xs font-semibold text-[#252422]">
              &ldquo;Simplicity is the ultimate sophistication.&rdquo;
            </p>
            <span className="text-[11px] text-[#8C867B] block mt-0.5">
              — AURA Design Atelier
            </span>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars */}
      <div>
        <div className="text-center max-w-xl mx-auto mb-12">
          <h3 className="font-editorial text-3xl font-medium text-[#1E1E1C]">
            Our Four Commitments
          </h3>
          <p className="text-xs text-[#7B766D] mt-2 font-light">
            How we make decisions every single day in the studio
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#E8E2D7] space-y-3"
              >
                <div className="w-10 h-10 rounded-full bg-[#EFECE5] border border-[#DDD7CD] flex items-center justify-center text-[#4A574A]">
                  <Icon className="w-4.5 h-4.5 stroke-[1.6]" />
                </div>
                <h4 className="text-sm font-semibold text-[#1E1E1C]">{v.title}</h4>
                <p className="text-xs text-[#716C62] leading-relaxed font-light">{v.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Atelier Locations */}
      <div className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-12 border border-[#E8E2D7]">
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-10">
          <span className="text-[10px] uppercase tracking-widest text-[#868177] font-semibold">
            Visit Us
          </span>
          <h3 className="font-editorial text-3xl font-medium text-[#1E1E1C]">
            Atelier Showrooms
          </h3>
          <p className="text-xs text-[#736E65]">
            Experience the tactile quality of our fabrics in person at our appointment-only spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs">
          <div className="p-5 rounded-xl bg-[#F5F2EC] border border-[#EAE4DA]">
            <h5 className="font-semibold text-sm text-[#1E1E1C] mb-1">Paris Atelier</h5>
            <p className="text-[#6D685E]">24 Rue de Turenne, Le Marais</p>
            <p className="text-[#8E887E] mt-1">Tue – Sat, 11:00 – 19:00</p>
          </div>
          <div className="p-5 rounded-xl bg-[#F5F2EC] border border-[#EAE4DA]">
            <h5 className="font-semibold text-sm text-[#1E1E1C] mb-1">Copenhagen Studio</h5>
            <p className="text-[#6D685E]">Gothersgade 44, Indre By</p>
            <p className="text-[#8E887E] mt-1">Mon – Fri, 10:00 – 18:00</p>
          </div>
          <div className="p-5 rounded-xl bg-[#F5F2EC] border border-[#EAE4DA]">
            <h5 className="font-semibold text-sm text-[#1E1E1C] mb-1">New York Showroom</h5>
            <p className="text-[#6D685E]">182 Franklin St, Tribeca</p>
            <p className="text-[#8E887E] mt-1">Wed – Sun, 11:00 – 18:30</p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => setActivePage('shop')}
            className="px-8 py-3 bg-[#242321] text-white rounded-lg text-xs uppercase tracking-widest font-medium hover:bg-[#3E3C38] transition-colors"
          >
            Explore The Current Collection
          </button>
        </div>
      </div>
    </div>
  );
};

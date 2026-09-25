import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, ChevronDown, CheckCircle2, MessageSquare } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useShop();

  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Sizing & Styling Advice',
    message: ''
  });

  const faqs = [
    {
      q: 'Where are AURA garments manufactured?',
      a: 'All our tailoring, knitwear, and trousers are produced in certified heritage ateliers across Northern Portugal and Biella, Italy. Our partner facilities adhere strictly to Fair Labor Association standards and use closed-loop water treatment.'
    },
    {
      q: 'How does your 30-day return & exchange policy work?',
      a: 'We offer complimentary 30-day returns and exchanges for all unworn garments with original security tags intact. Simply start an online return, download our prepaid shipping label, and drop off the package at any UPS or DHL collection point.'
    },
    {
      q: 'What is the complimentary shipping threshold?',
      a: 'We provide complimentary carbon-neutral shipping on all domestic and international orders over $150. For orders under $150, standard shipping is flat $12.'
    },
    {
      q: 'How do I care for 100% Merino wool and Grade-A cashmere?',
      a: 'We recommend gentle hand-washing in cool water using pH-neutral wool detergent, followed by flat drying away from direct sunlight. Never tumble dry fine knitwear.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
    showToast('Message Dispatched', 'Our atelier concierge will respond within 24 hours.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#868177] font-semibold">
          Client Care & Atelier
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-medium text-[#1E1E1C]">
          How can we assist you?
        </h1>
        <p className="text-xs sm:text-sm text-[#736E65] font-light leading-relaxed">
          From personalized sizing advice and fabric swatch requests to order logistics, our client care advisors are dedicated to your comfort.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-6 bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 border border-[#E8E2D7]">
          <h3 className="font-editorial text-2xl font-medium text-[#1E1E1C] mb-2">
            Send an Atelier Inquiry
          </h3>
          <p className="text-xs text-[#7A756B] mb-6">
            We reply to all inquiries within one business day.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-12 text-center space-y-3 bg-[#EAF1E7] border border-[#CCDBC8] rounded-2xl p-6 text-[#2E4A31]"
            >
              <CheckCircle2 className="w-8 h-8 mx-auto text-[#3D6442]" />
              <h4 className="font-editorial text-2xl font-medium">Thank you, {formData.name}</h4>
              <p className="text-xs leading-relaxed max-w-sm mx-auto text-[#48664B]">
                Your note has been received by our styling team. A concierge specialist will reach out to <strong>{formData.email}</strong> shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-semibold underline text-[#2A422D]"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] text-[#69645B] block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D9D3C7] rounded-xl text-xs text-[#222220] focus:outline-none focus:border-[#4A5D4E]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#69645B] block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. elena@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D9D3C7] rounded-xl text-xs text-[#222220] focus:outline-none focus:border-[#4A5D4E]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#69645B] block mb-1">Inquiry Subject</label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D9D3C7] rounded-xl text-xs text-[#222220] focus:outline-none focus:border-[#4A5D4E]"
                >
                  <option value="Sizing & Styling Advice">Sizing & Styling Consultation</option>
                  <option value="Order Tracking & Logistics">Order Tracking & Logistics</option>
                  <option value="Returns & Exchanges">Returns & Exchanges</option>
                  <option value="Fabric & Material Care">Fabric & Material Care</option>
                  <option value="Press & Commercial Partnerships">Press & Commercial Partnerships</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-[#69645B] block mb-1">Your Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we assist you with our garments?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D9D3C7] rounded-xl text-xs text-[#222220] focus:outline-none focus:border-[#4A5D4E] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#222220] hover:bg-[#3B3935] text-white rounded-xl text-xs uppercase tracking-widest font-medium transition-colors shadow-sm"
              >
                Send Message to Concierge
              </button>
            </form>
          )}
        </div>

        {/* FAQ Accordions & Direct Contact info */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <h3 className="font-editorial text-2xl font-medium text-[#1E1E1C] mb-2">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-[#7A756B] mb-6">
              Quick answers regarding shipping, fabrics, sizing, and guarantees.
            </p>

            <div className="space-y-2.5">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-[#E5E0D6] rounded-xl overflow-hidden bg-[#FAF8F5]"
                >
                  <button
                    onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                    className="w-full px-4 py-3.5 flex items-center justify-between text-left text-xs font-semibold text-[#222220]"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8C877D] transition-transform ${
                        faqOpen === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {faqOpen === idx && (
                    <div className="px-4 pb-4 pt-1 text-xs text-[#6B665E] border-t border-[#EBE5DC] leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Contact Cards */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2D7] space-y-1">
              <Mail className="w-4 h-4 text-[#4A574A] mb-2" />
              <p className="font-semibold text-[#1E1E1C]">Direct Email</p>
              <p className="text-[#736E65]">concierge@auraclothing.com</p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E2D7] space-y-1">
              <Phone className="w-4 h-4 text-[#4A574A] mb-2" />
              <p className="font-semibold text-[#1E1E1C]">Client Advisory</p>
              <p className="text-[#736E65]">+1 (800) 492-AURA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

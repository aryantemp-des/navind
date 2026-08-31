import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQAccordion: React.FC<{ items: FAQItem[]; title?: string; subtitle?: string }> = ({
  items,
  title = "Frequently Asked Questions",
  subtitle = "Clear, direct answers about our architecture, delivery, and commercial standards.",
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900/80">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="clay-badge inline-flex items-center gap-2 px-4 py-2 text-red-300 text-xs font-semibold uppercase tracking-widest mb-4 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            Clarity &amp; Assurance
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading mb-4">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`clay-card overflow-hidden transition-all duration-300 ${
                  isOpen ? "border-red-500/40 shadow-[0_0_25px_rgba(239,68,68,0.15)]" : "border-white/10"
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer group focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-white group-hover:text-red-200 transition-colors font-heading flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-red-400 shrink-0" />
                    {item.question}
                  </span>
                  <div
                    className={`clay-icon-well w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-red-500/20 text-red-300" : "text-zinc-400"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-zinc-300 font-light leading-relaxed border-t border-white/5 whitespace-pre-line">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;

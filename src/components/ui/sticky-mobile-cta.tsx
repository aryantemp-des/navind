import React, { useState, useEffect, useRef } from "react";
import { Phone, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { COMPANY_CONFIG } from "@/config/founder";

export const StickyMobileCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const scrollHeight = document.documentElement.scrollHeight;
          const windowHeight = window.innerHeight;
          const nearBottom = windowHeight + scrollY >= scrollHeight - 300;
          const shouldShow = scrollY > 300 && !nearBottom;

          if (isVisibleRef.current !== shouldShow) {
            isVisibleRef.current = shouldShow;
            setIsVisible(shouldShow);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-30 block md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 px-4 py-2.5 shadow-[0_-10px_25px_rgba(0,0,0,0.8)] pb-[calc(0.625rem+env(safe-area-inset-bottom,0px))]"
        >
          <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
            {/* Direct Company Phone Call */}
            <a
              href={COMPANY_CONFIG.phone.link}
              className="clay-btn-secondary flex-1 py-2.5 px-3 rounded-full text-xs font-semibold text-white flex items-center justify-center gap-1.5 cursor-pointer border border-white/15"
              aria-label={`${COMPANY_CONFIG.phone.label}: ${COMPANY_CONFIG.phone.display}`}
            >
              <Phone className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span>{COMPANY_CONFIG.phone.label}</span>
            </a>

            {/* Primary Action: Get a Quote */}
            <a
              href="/pricing"
              className="clay-btn-primary flex-[1.4] py-2.5 px-4 rounded-full text-xs font-bold text-white flex items-center justify-center gap-1.5 uppercase tracking-wider cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.4)]"
              aria-label="Get a Custom Quote from Navya Tech Industry"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyMobileCTA;

import React, { useState, useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 400;
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

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] md:bottom-6 left-4 md:left-6 z-40"
        >
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 group bg-gradient-to-br from-red-600 via-red-500 to-rose-600 border border-red-400/50 shadow-[0_4px_18px_rgba(239,68,68,0.5)] hover:shadow-[0_6px_28px_rgba(239,68,68,0.85)] hover:scale-105 active:scale-95"
            aria-label="Scroll back to top"
            title="Scroll to top"
          >
            <ArrowUp
              className="w-5 h-5 text-black group-hover:-translate-y-0.5 transition-transform duration-200 stroke-[2.5]"
            />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;

import React, { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("navya-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = (accepted: boolean) => {
    localStorage.setItem("navya-cookie-consent", accepted ? "accepted" : "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-6 right-6 md:left-6 md:right-auto md:max-w-md z-40"
        >
          <div className="clay-card p-5 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-white/10">
            <div className="flex items-start gap-3">
              <div className="clay-icon-well w-9 h-9 flex items-center justify-center rounded-xl shrink-0 mt-0.5">
                <Cookie className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                We use essential cookies to ensure optimal performance and enhance your digital experience.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
              <button
                onClick={() => handleChoice(false)}
                className="clay-btn-secondary px-3.5 py-1.5 rounded-full text-xs text-zinc-400 hover:text-white transition-all cursor-pointer font-mono"
              >
                Decline
              </button>
              <button
                onClick={() => handleChoice(true)}
                className="clay-btn-primary px-4 py-1.5 rounded-full text-xs font-bold text-white transition-all cursor-pointer font-mono"
              >
                Accept
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="p-1 text-zinc-500 hover:text-white rounded-lg transition-colors cursor-pointer sm:hidden"
                aria-label="Dismiss cookie notice"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const springScaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.1,
    restDelta: 0.0005,
  });

  const activeScaleX = isMobile ? scrollYProgress : springScaleX;

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-red-600 via-red-500 to-amber-400 origin-left shadow-[0_0_12px_rgba(239,68,68,0.85)]"
        style={{ scaleX: activeScaleX }}
      />
    </div>
  );
};

export default ScrollProgress;

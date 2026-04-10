"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MoveDown } from "lucide-react";
import { heroSplineLayerOpacity } from "@/lib/heroScroll";

/**
 * Visible with the 3D hero until the first image frame advances (1 → 2), then fades with the robot; never returns after leaving hero top.
 */
export default function ScrollBelowSplineButton() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, (v) => heroSplineLayerOpacity(v));
  const pointerEvents = useTransform(opacity, (o) => (o <= 0 ? "none" : "auto"));
  const visibility = useTransform(opacity, (o) => (o <= 0 ? "hidden" : "visible"));

  const scrollBelow = () => {
    document.getElementById("process")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.button
      type="button"
      className="primary-btn flex-center btn-gradient-border scroll-below-spline"
      aria-label="Scroll below to continue"
      onClick={scrollBelow}
      initial={{ opacity: 1, visibility: "visible" }}
      style={{
        opacity,
        pointerEvents: pointerEvents as unknown as "auto" | "none",
        visibility: visibility as unknown as "visible" | "hidden",
        gap: "0.5rem",
        zIndex: 9999
      }}
    >
      Scroll Down
      <motion.span
        aria-hidden
        animate={{ y: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        style={{ display: "inline-flex" }}
      >
        <MoveDown size={18} strokeWidth={2.25} color="#ffffff" />
      </motion.span>
    </motion.button>
  );
}

"use client";

import { useState } from "react";
import Script from "next/script";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import {
  HERO_FADE_AFTER_FIRST_FRAME,
  SCROLL_AT_FIRST_FRAME_TRANSITION,
  heroSplineLayerOpacity
} from "@/lib/heroScroll";

export default function SplineBackground() {
  const [isPermanentlyHidden, setIsPermanentlyHidden] = useState(false);
  const { scrollYProgress } = useScroll();

  const pointerEvents = useTransform(scrollYProgress, [0, SCROLL_AT_FIRST_FRAME_TRANSITION * 0.85], ["auto", "none"]);

  const splineOpacity = useTransform(scrollYProgress, (v) => heroSplineLayerOpacity(v));

  const splineVisibility = useTransform(scrollYProgress, (v) =>
    v >= SCROLL_AT_FIRST_FRAME_TRANSITION + HERO_FADE_AFTER_FIRST_FRAME ? "hidden" : "visible"
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isPermanentlyHidden && latest >= SCROLL_AT_FIRST_FRAME_TRANSITION + HERO_FADE_AFTER_FIRST_FRAME) {
      setIsPermanentlyHidden(true);
    }
  });

  return (
    <>
      <Script type="module" src="https://unpkg.com/@splinetool/viewer@1.12.79/build/spline-viewer.js" strategy="afterInteractive" />
      <motion.div
        className="spline-container"
        style={{
          pointerEvents: pointerEvents as unknown as "auto" | "none",
          opacity: splineOpacity,
          visibility: splineVisibility as unknown as "visible" | "hidden",
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div style={{
          width: "100%",
          height: "100%",
          position: "relative"
        }}>

        <spline-viewer url="https://prod.spline.design/05GBhajSH2sAmrNb/scene.splinecode">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="data:image/png;base64,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" alt="Spline preview" style={{width: '100%', height: '100%'}} />
        </spline-viewer>
        </div>
      </motion.div>
    </>
  );
}

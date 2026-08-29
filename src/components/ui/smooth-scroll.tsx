import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  interface Window {
    __lenis?: Lenis;
    __liquidVelocity?: number;
  }
}

// Register ScrollTrigger globally with GSAP
gsap.registerPlugin(ScrollTrigger);

export const SmoothScrollProvider = () => {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Initialize Lenis with liquid, buttery inertia physics
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.1,
      infinite: false,
    });

    window.__lenis = lenis;

    // Liquid velocity physics state
    let rawVelocity = 0;
    let smoothedVelocity = 0;
    const rootStyle = document.documentElement.style;

    // Bridge Lenis with GSAP ScrollTrigger & track liquid velocity
    lenis.on("scroll", (e: any) => {
      ScrollTrigger.update();
      rawVelocity = typeof e?.velocity === "number" ? e.velocity : (lenis as any).velocity || 0;
    });

    // Sync GSAP's high-performance ticker with Lenis (Single Centralized rAF Loop)
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);

      // Smooth liquid velocity calculation (lerp dampening)
      smoothedVelocity += (rawVelocity - smoothedVelocity) * 0.14;
      // Decay velocity when scrolling ceases
      rawVelocity *= 0.92;
      window.__liquidVelocity = smoothedVelocity;

      // Stream hardware-friendly CSS variables to root
      const clampedVel = Math.max(-1.5, Math.min(1.5, smoothedVelocity));
      rootStyle.setProperty("--scroll-velocity", clampedVel.toFixed(3));
      rootStyle.setProperty("--liquid-shift", `${(clampedVel * 2.2).toFixed(2)}px`);
      rootStyle.setProperty("--liquid-scale", `${(1.0 + Math.min(0.012, Math.abs(clampedVel) * 0.0035)).toFixed(4)}`);
      rootStyle.setProperty("--liquid-glow-y", `${(clampedVel * 7.5).toFixed(1)}px`);
    };

    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(500, 33);

    // Global smooth anchor handler
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a, button");
      if (!target) return;
      
      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const element = document.querySelector(href);
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element as HTMLElement, { offset: -70, duration: 1.35 });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { passive: false });

    // Refresh ScrollTrigger once DOM is stabilized
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(tickerUpdate);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      delete window.__lenis;
      delete window.__liquidVelocity;
      rootStyle.removeProperty("--scroll-velocity");
      rootStyle.removeProperty("--liquid-shift");
      rootStyle.removeProperty("--liquid-scale");
      rootStyle.removeProperty("--liquid-glow-y");
    };
  }, []);

  return null;
};

export default SmoothScrollProvider;

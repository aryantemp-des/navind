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

    // Detect if device is a touch-first mobile device
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    // Initialize Lenis with liquid inertia physics
    const lenis = new Lenis({
      duration: isTouchDevice ? 1.0 : 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      infinite: false,
      syncTouch: false,
    });

    window.__lenis = lenis;

    let rawVelocity = 0;
    let smoothedVelocity = 0;

    // Bridge Lenis with GSAP ScrollTrigger & track liquid velocity
    lenis.on("scroll", (e: any) => {
      ScrollTrigger.update();
      rawVelocity = typeof e?.velocity === "number" ? e.velocity : (lenis as any).velocity || 0;
    });

    // Sync GSAP's high-performance ticker with Lenis
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);

      // Smooth liquid velocity calculation (lerp dampening)
      smoothedVelocity += (rawVelocity - smoothedVelocity) * 0.14;
      rawVelocity *= 0.92;
      window.__liquidVelocity = smoothedVelocity;
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
          lenis.scrollTo(element as HTMLElement, { offset: -70, duration: 1.2 });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { passive: false });

    // Handle tab visibility changes to avoid background GPU/CPU drain
    const handleVisibilityChange = () => {
      if (document.hidden) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Refresh ScrollTrigger once DOM is stabilized
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(tickerUpdate);
      document.removeEventListener("click", handleAnchorClick);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      lenis.destroy();
      delete window.__lenis;
      delete window.__liquidVelocity;
    };
  }, []);

  return null;
};

export default SmoothScrollProvider;


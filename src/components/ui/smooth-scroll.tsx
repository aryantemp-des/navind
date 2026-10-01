import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToTarget, prefersReducedMotion } from "@/lib/scroll";

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

let activeLenisInstance: Lenis | null = null;
let instanceRefCount = 0;
let tickerCallback: ((time: number) => void) | null = null;

export const SmoothScrollProvider: React.FC = () => {
  useEffect(() => {
    // 1. Accessibility: Check for prefers-reduced-motion
    if (prefersReducedMotion()) {
      return;
    }

    instanceRefCount++;

    // 2. Singleton Guard: Ensure only ONE Lenis instance and ONE central RAF loop exist
    if (!activeLenisInstance) {
      /**
       * Lenis Configuration:
       * - lerp: 0.1 (Target 0.08–0.12 for liquid acceleration and natural deceleration)
       * - smoothWheel: true (Inertia-based buttery wheel response)
       * - syncTouch: true (Controlled touch synchronization as specified)
       * - wheelMultiplier: 1.0 (Natural 1:1 input responsiveness)
       * - touchMultiplier: 1.0 (Preserves natural finger responsiveness on touchscreens)
       */
      const lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.0,
        infinite: false,
        orientation: "vertical",
        gestureOrientation: "vertical",
      });

      activeLenisInstance = lenis;
      window.__lenis = lenis;
      window.__lenisInitialized = true;

      let rawVelocity = 0;
      let smoothedVelocity = 0;

      // Synchronize ScrollTrigger and track liquid velocity on scroll
      lenis.on("scroll", (e: any) => {
        ScrollTrigger.update();
        rawVelocity = typeof e?.velocity === "number" ? e.velocity : (lenis as any).velocity || 0;
      });

      // Central RequestAnimationFrame loop driven by GSAP's high-precision ticker
      tickerCallback = (time: number) => {
        lenis.raf(time * 1000);

        // Calculate continuous smoothed velocity without causing React re-renders
        smoothedVelocity += (rawVelocity - smoothedVelocity) * 0.12;
        rawVelocity *= 0.92;
        window.__liquidVelocity = smoothedVelocity;
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(500, 33);

      // Handle OS reduced motion preference change dynamically
      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const handleMotionChange = (e: MediaQueryListEvent) => {
        if (e.matches && activeLenisInstance) {
          activeLenisInstance.destroy();
          activeLenisInstance = null;
          delete window.__lenis;
          if (tickerCallback) {
            gsap.ticker.remove(tickerCallback);
            tickerCallback = null;
          }
        }
      };

      if (motionQuery.addEventListener) {
        motionQuery.addEventListener("change", handleMotionChange);
      }

      // Handle tab visibility to prevent GPU/CPU drain while tab is in background
      const handleVisibilityChange = () => {
        if (document.hidden) {
          lenis.stop();
        } else {
          lenis.start();
        }
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);

      // Initial ScrollTrigger layout refresh once DOM stabilizes
      const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);

      // Store cleanup on instance for global tear-down
      (lenis as any).__cleanup = () => {
        clearTimeout(refreshTimeout);
        if (tickerCallback) {
          gsap.ticker.remove(tickerCallback);
          tickerCallback = null;
        }
        if (motionQuery.removeEventListener) {
          motionQuery.removeEventListener("change", handleMotionChange);
        }
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        lenis.destroy();
        delete window.__lenis;
        delete window.__liquidVelocity;
        window.__lenisInitialized = false;
      };
    }

    // 3. Central Anchor & Navigation Scroll Interceptor
    // Intercepts all internal #hash links to prevent abrupt jumps and provide smooth gliding with sticky navbar offset
    const handleGlobalAnchorClick = (e: MouseEvent) => {
      // Ignore modified clicks (cmd, ctrl, shift) or right clicks
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const target = (e.target as HTMLElement)?.closest("a, button[data-scroll-to]");
      if (!target) return;

      let href = target.getAttribute("href") || target.getAttribute("data-scroll-to");
      if (!href) return;

      // Handle same-page hash links (e.g. href="#services" or href="/#services" when already on homepage)
      if (href.startsWith("/#") && window.location.pathname === "/") {
        href = href.substring(1);
      }

      if (href.startsWith("#") && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          scrollToTarget(targetElement as HTMLElement, {
            offset: -85,
            duration: 1.1,
          });

          // Update URL hash without causing an instant browser jump
          if (window.history && window.history.pushState) {
            window.history.pushState(null, "", href);
          }
        }
      }
    };

    document.addEventListener("click", handleGlobalAnchorClick, { passive: false });

    return () => {
      document.removeEventListener("click", handleGlobalAnchorClick);

      instanceRefCount--;
      if (instanceRefCount <= 0 && activeLenisInstance) {
        if ((activeLenisInstance as any).__cleanup) {
          (activeLenisInstance as any).__cleanup();
        }
        activeLenisInstance = null;
        instanceRefCount = 0;
      }
    };
  }, []);

  return null;
};

export default SmoothScrollProvider;

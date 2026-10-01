import Lenis from "@studio-freight/lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
    __liquidVelocity?: number;
    __lenisInitialized?: boolean;
  }
}

export interface ScrollToOptions {
  offset?: number;
  duration?: number;
  immediate?: boolean;
  lock?: boolean;
  onComplete?: () => void;
}

const DEFAULT_NAVBAR_OFFSET = -80;

/**
 * Returns the active global Lenis instance, if initialized.
 */
export function getLenis(): Lenis | undefined {
  if (typeof window !== "undefined") {
    return window.__lenis;
  }
  return undefined;
}

/**
 * Checks whether user has enabled prefers-reduced-motion in their OS/browser.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Single authoritative scroll function across the entire application.
 * Seamlessly routes through Lenis when active, or falls back to native scrolling.
 */
export function scrollToTarget(
  target: string | HTMLElement | number,
  options: ScrollToOptions = {}
): void {
  if (typeof window === "undefined") return;

  const {
    offset = DEFAULT_NAVBAR_OFFSET,
    duration,
    immediate = false,
    lock = false,
    onComplete,
  } = options;

  const reducedMotion = prefersReducedMotion();
  const effectiveImmediate = immediate || reducedMotion;

  const lenis = window.__lenis;

  // 1. Scroll to top or specific numeric Y coordinate
  if (typeof target === "number") {
    if (lenis) {
      lenis.scrollTo(target, {
        offset: 0,
        immediate: effectiveImmediate,
        duration: effectiveImmediate ? 0 : duration,
        lock,
        onComplete,
      });
    } else {
      window.scrollTo({
        top: target,
        left: 0,
        behavior: effectiveImmediate ? "auto" : "smooth",
      });
      if (onComplete) {
        setTimeout(onComplete, effectiveImmediate ? 0 : 400);
      }
    }
    return;
  }

  // 2. Resolve HTML Element from selector string or element reference
  let targetElement: HTMLElement | null = null;

  if (typeof target === "string") {
    const cleanSelector = target.startsWith("#") ? target : `#${target}`;
    try {
      targetElement = document.querySelector(cleanSelector) as HTMLElement | null;
    } catch {
      // In case target was not a valid ID selector, try querySelector directly
      try {
        targetElement = document.querySelector(target) as HTMLElement | null;
      } catch {
        targetElement = null;
      }
    }
  } else if (target instanceof HTMLElement) {
    targetElement = target;
  }

  if (!targetElement) {
    console.warn(`[Scroll Engine] Target element not found:`, target);
    return;
  }

  // 3. Dispatch smooth scroll via Lenis or fallback
  if (lenis) {
    lenis.scrollTo(targetElement, {
      offset,
      immediate: effectiveImmediate,
      duration: effectiveImmediate ? 0 : duration,
      lock,
      onComplete,
    });
  } else {
    const headerOffset = Math.abs(offset);
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: effectiveImmediate ? "auto" : "smooth",
    });

    if (onComplete) {
      setTimeout(onComplete, effectiveImmediate ? 0 : 500);
    }
  }
}

/**
 * Temporarily pause the smooth-scroll engine (e.g., when full-screen modal is open).
 */
export function stopScroll(): void {
  if (typeof window !== "undefined" && window.__lenis) {
    window.__lenis.stop();
  }
}

/**
 * Resume the smooth-scroll engine (e.g., after modal is closed).
 */
export function startScroll(): void {
  if (typeof window !== "undefined" && window.__lenis) {
    window.__lenis.start();
  }
}

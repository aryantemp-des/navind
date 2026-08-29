import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface ParticleHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButton?: {
    text: string;
    onClick: () => void;
  };
  secondaryButton?: {
    text: string;
    onClick: () => void;
  };
  interactiveHint?: string;
  className?: string;
  particleCount?: number;
  children?: ReactNode;
}

export const ParticleHero: React.FC<ParticleHeroProps> = ({
  title = "NAVYA",
  subtitle = "Tech Industry",
  description = "Growth shouldn’t be this stressful. We’ll take the headache. You handle the business. We’ll handle the chaos behind the growth.",
  primaryButton,
  secondaryButton,
  interactiveHint = "Hover to Interact",
  className = "",
  particleCount = 12,
  children
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // Responsive particle density: 9 rows on mobile, 12 on desktop
  const [activeRows, setActiveRows] = useState<number>(particleCount);

  useEffect(() => {
    const updateDensity = () => {
      const isMobile = window.innerWidth < 640;
      setActiveRows(isMobile ? Math.min(9, particleCount) : particleCount);
    };
    updateDensity();
    window.addEventListener('resize', updateDensity, { passive: true });
    return () => window.removeEventListener('resize', updateDensity);
  }, [particleCount]);

  // Position refs to avoid high-frequency React re-renders
  const cursorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const staticCursorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isAutoModeRef = useRef<boolean>(true);
  const isStaticAnimationRef = useRef<boolean>(false);
  const startTimeRef = useRef<number>(Date.now());
  const lastMouseMoveRef = useRef<number>(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalParticles = activeRows * activeRows;

  // Initialize particles once into DOM
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = '';
    particlesRef.current = [];

    for (let i = 0; i < totalParticles; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle absolute rounded-full pointer-events-none will-change-transform';

      const row = Math.floor(i / activeRows);
      const col = i % activeRows;
      const centerRow = Math.floor(activeRows / 2);
      const centerCol = Math.floor(activeRows / 2);

      const distanceFromCenter = Math.sqrt(
        Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2)
      );

      const scale = Math.max(0.1, 1.2 - distanceFromCenter * 0.12);
      const opacity = Math.max(0.08, 1 - distanceFromCenter * 0.1);
      const lightness = Math.max(15, 75 - distanceFromCenter * 6);
      const glowSize = Math.max(0.5, 6 - distanceFromCenter * 0.5);

      particle.style.cssText = `
        width: 0.4rem;
        height: 0.4rem;
        left: ${col * 1.8}rem;
        top: ${row * 1.8}rem;
        transform: translate3d(0, 0, 0) scale(${scale});
        opacity: ${opacity};
        background: hsl(4, 85%, ${lightness}%);
        box-shadow: 0 0 ${glowSize * 0.2}rem 0 hsl(4, 85%, 60%);
        z-index: ${Math.round(totalParticles - distanceFromCenter * 5)};
        pointer-events: none;
      `;

      container.appendChild(particle);
      particlesRef.current.push(particle);
    }
  }, [activeRows, totalParticles]);

  // High-performance animation loop (Zero CPU drain when off-screen)
  useEffect(() => {
    let lastRenderTime = 0;
    let isRunning = false;

    const animate = (timestamp: number) => {
      if (!isVisibleRef.current || document.hidden) {
        isRunning = false;
        return;
      }

      if (timestamp - lastRenderTime >= 16) {
        lastRenderTime = timestamp;
        const currentTime = (Date.now() - startTimeRef.current) * 0.001;

        if (isAutoModeRef.current) {
          const x = Math.sin(currentTime * 0.05) * 140 + Math.sin(currentTime * 0.03) * 70;
          const y = Math.cos(currentTime * 0.04) * 100 + Math.cos(currentTime * 0.035) * 50;
          cursorRef.current = { x, y };
        } else if (isStaticAnimationRef.current) {
          const timeSinceLastMove = Date.now() - lastMouseMoveRef.current;
          if (timeSinceLastMove > 200) {
            const strength = Math.min((timeSinceLastMove - 200) / 1000, 1);
            const subtleX = Math.sin(currentTime * 0.3) * 10 * strength;
            const subtleY = Math.cos(currentTime * 0.25) * 8 * strength;
            cursorRef.current = {
              x: staticCursorRef.current.x + subtleX,
              y: staticCursorRef.current.y + subtleY
            };
          }
        }

        const currentX = cursorRef.current.x;
        const currentY = cursorRef.current.y;
        const particles = particlesRef.current;
        const centerRow = Math.floor(activeRows / 2);
        const centerCol = Math.floor(activeRows / 2);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          if (!p) continue;

          const row = Math.floor(i / activeRows);
          const col = i % activeRows;
          const dist = Math.sqrt(Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2));
          const originalScale = Math.max(0.1, 1.2 - dist * 0.12);
          const dampening = Math.max(0.3, 1 - dist * 0.08);

          const moveX = currentX * dampening;
          const moveY = currentY * dampening;

          p.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(${originalScale})`;
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startLoop();
        }
      },
      { threshold: 0.02 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    startLoop();

    const handleVisibility = () => {
      if (!document.hidden && isVisibleRef.current) {
        startLoop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      isRunning = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [activeRows]);

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    const event = 'touches' in e ? e.touches[0] : e;
    if (!event) return;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const newCursor = {
      x: (event.clientX - centerX) * 0.75,
      y: (event.clientY - centerY) * 0.75
    };

    cursorRef.current = newCursor;
    staticCursorRef.current = newCursor;
    isAutoModeRef.current = false;
    isStaticAnimationRef.current = false;
    lastMouseMoveRef.current = Date.now();

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      isStaticAnimationRef.current = true;
    }, 500);

    setTimeout(() => {
      if (Date.now() - lastMouseMoveRef.current >= 3500) {
        isAutoModeRef.current = true;
        isStaticAnimationRef.current = false;
        startTimeRef.current = Date.now();
      }
    }, 3500);
  };

  return (
    <section
      id="landing-hero"
      ref={sectionRef}
      className={`relative w-full min-h-screen bg-black/50 overflow-hidden flex items-center justify-center ${className}`}
      onMouseMove={handlePointerMove}
      onTouchStart={handlePointerMove}
    >
      {/* Particle Animation Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          ref={containerRef}
          className="relative"
          style={{
            width: `${activeRows * 1.8}rem`,
            height: `${activeRows * 1.8}rem`
          }}
        />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20">
        {children ? (
          children
        ) : (
          <div className="text-center max-w-6xl mx-auto">
            {/* 1. Main Title: NAVYA */}
            <div className="mb-10 sm:mb-16">
              <h1 className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[12.5rem] font-black tracking-[0.06em] sm:tracking-[0.09em] md:tracking-[0.12em] leading-[0.9] mb-6 sm:mb-8 select-none font-heading uppercase pl-[0.06em] sm:pl-[0.09em] md:pl-[0.12em]">
                <span className="navya-text-shine inline-block">
                  {title}
                </span>
              </h1>

              {/* 2. Subtitle: BOLD "Tech Industry" with continuous shine sweep */}
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-[0.22em] uppercase font-heading drop-shadow-lg">
                  <span className="navya-subtext-shine inline-block">
                    {subtitle}
                  </span>
                </h2>
                <div className="w-28 sm:w-36 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto rounded-full"></div>
              </div>
            </div>

            {/* 3. Description: BOLD & ITALIC */}
            {description && (
              <div className="mb-12 sm:mb-16">
                <p className="italic font-bold text-white text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto leading-relaxed drop-shadow-md">
                  "{description}"
                </p>
              </div>
            )}

            {/* Call to Action with Claymorphic Tactile Buttons */}
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                {primaryButton && (
                  <button
                    onClick={primaryButton.onClick}
                    className="clay-btn-primary group relative px-10 sm:px-14 py-4 sm:py-5 text-white font-bold text-base sm:text-lg tracking-widest uppercase rounded-full overflow-hidden cursor-pointer"
                  >
                    <span className="relative z-10 flex items-center gap-2 font-heading">
                      {primaryButton.text}
                      <span className="text-red-200 group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </button>
                )}

                {secondaryButton && (
                  <button
                    onClick={secondaryButton.onClick}
                    className="clay-btn-secondary px-8 py-4 text-white hover:text-red-200 font-semibold text-sm tracking-wider uppercase rounded-full cursor-pointer font-heading"
                  >
                    {secondaryButton.text}
                  </button>
                )}
              </div>

              {/* Interactive hint - Clay Badge */}
              {interactiveHint && (
                <div className="inline-flex items-center justify-center">
                  <div className="clay-badge px-5 py-2 inline-flex items-center gap-3 text-red-300 text-xs sm:text-sm uppercase tracking-[0.25em] font-mono">
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                    <span>{interactiveHint}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-red-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 sm:w-[30rem] h-80 sm:h-[30rem] bg-orange-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Cinematic bottom fade mask into Main Intro */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default ParticleHero;


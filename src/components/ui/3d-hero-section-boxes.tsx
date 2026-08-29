import React, { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Shield, Sparkles, ArrowRight } from 'lucide-react';
import PlexusCanvas from './plexus-canvas';
import { GradientBars } from './gradient-bars-background';

function HeroSplineBackground() {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.0 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden opacity-60 mix-blend-screen"
      style={{
        visibility: isVisible ? 'visible' : 'hidden',
        willChange: 'opacity',
      }}
    >
      <div className={`relative w-full h-full transition-opacity duration-700 ${splineLoaded ? 'opacity-100' : 'opacity-40'}`}>
        <Spline
          style={{
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
          scene="https://prod.spline.design/dJqTIQ-tE3ULUPMi/scene.splinecode"
          onLoad={() => setSplineLoaded(true)}
        />
      </div>
    </div>
  );
}

function HeroContent({ onStartClick }: { onStartClick?: () => void }) {
  const scrollToContact = () => {
    const el = document.getElementById('final-project');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else if (onStartClick) onStartClick();
  };

  return (
    <div className="relative z-20 text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col justify-center min-h-screen py-24 pointer-events-none">
      
      {/* Claymorphic Section Title Banner */}
      <div className="mb-6 pointer-events-auto">
        <div className="clay-badge inline-flex items-center gap-2.5 px-5 py-2.5 text-red-200 text-xs sm:text-sm font-semibold uppercase tracking-widest font-mono">
          <Sparkles className="w-4 h-4 text-red-400" />
          <span>Enterprise Infrastructure and Intelligent Operations &amp; Real-time Yield Systems</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column */}
        <div className="lg:col-span-7 pr-0 lg:pr-8 pointer-events-auto">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.05] tracking-tight font-heading text-white drop-shadow-2xl">
            We’re building technology that moves business forward.
          </h2>

          <div className="clay-badge inline-block text-xs sm:text-sm font-mono text-red-300 tracking-widest uppercase px-4 py-2">
            AI \ WEB3 \ UI \ 3D \ MOTION
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 pl-0 lg:pl-6 flex flex-col items-start pointer-events-auto">
          <div className="clay-card p-8 sm:p-10 space-y-6">
            <p className="text-base sm:text-xl text-zinc-200 leading-relaxed font-light drop-shadow-md">
              Engineering digital experiences that make businesses memorable. Intelligent systems engineered to deliver enterprise reliability, visual excellence, and measurable yield.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={scrollToContact}
                className="clay-btn-secondary text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 cursor-pointer text-center text-sm uppercase tracking-wider font-heading"
              >
                Contact Us
              </button>

              <button
                onClick={scrollToContact}
                className="clay-btn-primary text-white font-bold py-4 px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm uppercase tracking-wider font-heading"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export const HeroSection: React.FC = () => {
  return (
    <section 
      id="body-hero" 
      className="relative w-full min-h-screen bg-black/40 overflow-hidden"
    >
      {/* Layer 1: Gradient bars — orange flame equalizer rising from bottom */}
      <GradientBars
        numBars={22}
        gradientFrom="rgba(255, 80, 0, 0.55)"
        gradientTo="transparent"
        animationDuration={2.4}
        className="z-[1]"
      />

      {/* Layer 2: Dark directional overlay for readability */}
      <div 
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background: `
            linear-gradient(
              to right,
              rgba(0, 0, 0, 0.88) 0%,
              rgba(0, 0, 0, 0.65) 50%,
              rgba(0, 0, 0, 0.82) 100%
            ),
            linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.80) 0%,
              rgba(10, 2, 2, 0.40) 50%,
              rgba(0, 0, 0, 0.90) 100%
            ),
            radial-gradient(
              circle at 20% 50%,
              rgba(239, 68, 68, 0.12) 0%,
              transparent 60%
            )
          `,
        }}
      />

      {/* Layer 3: Plexus network animation — scroll-parallax reactive */}
      <PlexusCanvas />

      {/* Layer 4: Spline 3D Interactive */}
      <HeroSplineBackground />

      {/* Layer 5: Content */}
      <HeroContent />
    </section>
  );
};

export default HeroSection;

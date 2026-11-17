import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import SolarArcCanvas from "./solar-arc-canvas";
import { GradientBars } from "./gradient-bars-background";

// Inline Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost" | "gradient" | "red";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "default", className = "", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      default: "clay-btn-secondary text-white font-medium",
      secondary: "clay-btn-secondary text-white font-medium",
      ghost: "text-zinc-300 hover:text-white hover:bg-white/5 transition-all",
      gradient: "clay-btn-secondary text-white font-bold",
      red: "clay-btn-primary text-white font-bold shadow-[0_10px_25px_rgba(239,68,68,0.45)]"
    };
    
    const sizes = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-10 px-5 text-sm",
      lg: "h-12 px-8 text-base"
    };
    
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

// Icons
const Menu = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const X = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

// Navigation Component
const Navigation = React.memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 w-full z-50 border-b border-gray-800/50 bg-black/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-white">Logo</div>
          
          <div className="hidden md:flex items-center justify-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <a href="#getting-started" className="text-sm text-white/60 hover:text-white transition-colors">
              Getting started
            </a>
            <a href="#components" className="text-sm text-white/60 hover:text-white transition-colors">
              Components
            </a>
            <a href="#documentation" className="text-sm text-white/60 hover:text-white transition-colors">
              Documentation
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button type="button" variant="ghost" size="sm">
              Sign in
            </Button>
            <Button type="button" variant="default" size="sm">
              Sign Up
            </Button>
          </div>

          <button
            type="button"
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800/50 animate-[slideDown_0.3s_ease-out]">
          <div className="px-6 py-4 flex flex-col gap-4">
            <a
              href="#getting-started"
              className="text-sm text-white/60 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Getting started
            </a>
            <a
              href="#components"
              className="text-sm text-white/60 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Components
            </a>
            <a
              href="#documentation"
              className="text-sm text-white/60 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Documentation
            </a>
            <div className="flex flex-col gap-2 pt-4 border-t border-gray-800/50">
              <Button type="button" variant="ghost" size="sm">
                Sign in
              </Button>
              <Button type="button" variant="default" size="sm">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
});

Navigation.displayName = "Navigation";

// Hero Component — also exported so App.tsx can render just this section
export const SaaSHero = React.memo<{ heading?: string }>(({ heading = "Best Internet marketing Company in india" }) => {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative flex flex-col items-center justify-center px-6 py-14 md:py-18 overflow-hidden"
      style={{
        minHeight: "420px",
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Gradient bars — orange equalizer effect from bottom */}
      <GradientBars
        numBars={18}
        gradientFrom="rgba(255, 70, 0, 0.35)"
        gradientTo="transparent"
        animationDuration={2.8}
        className="z-[0]"
      />

      {/* Dynamic solar-arc wallpaper animation */}
      <SolarArcCanvas />

      {/* Top fade from above — smooth blend into preceding section */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-44 md:h-64 pointer-events-none z-[1]"
        style={{
          background: "linear-gradient(to bottom, #08080c 0%, rgba(8, 8, 12, 0.92) 25%, rgba(8, 8, 12, 0.5) 65%, transparent 100%)",
        }}
      />

      {/* Overlay to keep text legible over the bright arc */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 70% 80% at 50% 60%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.0) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Floating Eyebrow Badge */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: -16, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full clay-badge text-xs font-mono text-zinc-300 uppercase tracking-widest border border-red-500/30 bg-black/60 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
      >
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>Next-Gen Web &amp; AI Engineering</span>
      </motion.div>

      {/* Staggered Heading */}
      <motion.h1
        initial={reduced ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-center max-w-4xl px-4 sm:px-6 leading-tight mb-6 break-words"
        style={{
          background: "linear-gradient(to bottom, #ffffff, #ffffff, rgba(255, 255, 255, 0.6))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.05em",
          zIndex: 2,
        }}
      >
        {heading}
      </motion.h1>

      {/* Staggered Subtitle */}
      <motion.p
        initial={reduced ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="relative text-sm md:text-base text-center max-w-3xl px-4 sm:px-6 mb-8 md:mb-10 leading-relaxed font-bold text-zinc-100"
        style={{ zIndex: 2 }}
      >
        <strong>
          Building automation-supported business plans, high-converting websites, intelligent AI agents, and AI-powered receptionists that help businesses operate smarter, attract customers, and grow efficiently.
        </strong>
      </motion.p>

      {/* Staggered CTA Actions */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 relative mb-8 w-full sm:w-auto px-4"
        style={{ zIndex: 2 }}
      >
        <motion.a
          href="/get-started"
          whileHover={{ scale: 1.04, boxShadow: "0 0 35px rgba(239,68,68,0.65)" }}
          whileTap={{ scale: 0.98 }}
          className="clay-btn-primary rounded-full flex items-center justify-center gap-2 cursor-pointer h-12 w-full sm:w-auto px-8 text-sm md:text-base text-white font-bold tracking-wider uppercase shadow-[0_10px_25px_rgba(239,68,68,0.45)] group transition-all min-h-[48px]"
          aria-label="Start project with Navya Tech Industry"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.a>
        <motion.a
          href="/pricing"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="clay-btn-secondary rounded-full flex items-center justify-center gap-2 cursor-pointer h-12 w-full sm:w-auto px-7 text-sm text-zinc-200 hover:text-white font-mono uppercase tracking-wider transition-all border border-white/10 hover:border-white/25 min-h-[48px]"
          aria-label="Explore Custom Quotation"
        >
          <span>Explore Quotes</span>
        </motion.a>
      </motion.div>
    </section>
  );
});

SaaSHero.displayName = "SaaSHero";

// Main Component (standalone usage with its own nav)
export default function Component() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />
      <SaaSHero />
    </main>
  );
}

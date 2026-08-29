import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowRight, Search, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ui/theme-toggle";

export interface GlobalHeaderProps {
  onOpenSearch?: () => void;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isScrolledRef = useRef(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldBeScrolled = window.scrollY > 30;
          if (isScrolledRef.current !== shouldBeScrolled) {
            isScrolledRef.current = shouldBeScrolled;
            setIsScrolled(shouldBeScrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling while mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Escape key closes mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      if (window.__lenis) {
        window.__lenis.scrollTo(element, { offset: -70, duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "py-2.5 clay-header shadow-2xl"
            : "py-4 sm:py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Brand Identity / Official Navya Logo */}
          <button
            onClick={() => scrollTo("landing-hero")}
            className="flex items-center gap-3 cursor-pointer group text-left focus:outline-none shrink-0"
            aria-label="Navya Tech Industry Home"
          >
            <div className="relative flex items-center justify-center p-1 rounded-2xl transition-all duration-300 group-hover:scale-105">
              <img
                src="/logoimg.png"
                alt="Navya Tech Industry Logo"
                width={140}
                height={44}
                className="h-8 sm:h-10 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                loading="eager"
              />
            </div>
          </button>

          {/* Desktop Primary Navigation */}
          <nav className="hidden lg:flex items-center gap-6 clay-pill-nav px-6 py-2">
            <button
              onClick={() => scrollTo("main-intro")}
              className="text-xs uppercase tracking-wider text-zinc-300 hover:text-white transition-colors font-mono cursor-pointer hover:scale-105"
            >
              Overview
            </button>
            <button
              onClick={() => scrollTo("services")}
              className="text-xs uppercase tracking-wider text-zinc-300 hover:text-white transition-colors font-mono cursor-pointer hover:scale-105"
            >
              Capabilities
            </button>
            <button
              onClick={() => scrollTo("ai-section")}
              className="text-xs uppercase tracking-wider text-zinc-300 hover:text-white transition-colors font-mono cursor-pointer hover:scale-105"
            >
              AI &amp; Automation
            </button>
            <button
              onClick={() => scrollTo("pricing")}
              className="text-xs uppercase tracking-wider text-zinc-300 hover:text-white transition-colors font-mono cursor-pointer hover:scale-105"
            >
              Packages
            </button>
            <button
              onClick={() => scrollTo("testimonials")}
              className="text-xs uppercase tracking-wider text-zinc-300 hover:text-white transition-colors font-mono cursor-pointer hover:scale-105"
            >
              Proof
            </button>
          </nav>

          {/* Desktop Actions (Search, Theme, Call, CTA) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Search Trigger */}
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                className="clay-btn-secondary px-3.5 py-2 rounded-full text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-2 cursor-pointer"
                title="Search (Ctrl+K)"
                aria-label="Search website"
              >
                <Search className="w-3.5 h-3.5 text-red-400" />
                <span className="hidden xl:inline">Search</span>
                <kbd className="text-[10px] text-zinc-500 bg-white/5 px-1.5 py-0.5 rounded border border-white/10 font-mono">⌘K</kbd>
              </button>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Direct Phone Call Button */}
            <a
              href="tel:+919355412903"
              className="clay-btn-secondary px-3.5 py-2 rounded-full text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(239,68,68,0.25)] hover:shadow-[0_0_20px_rgba(239,68,68,0.6)] border border-red-500/30 hover:border-red-500/80 hover:scale-105 transition-all duration-300"
              title="Call Navya Tech Industry"
              aria-label="Call +919355412903"
            >
              <Phone className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden xl:inline">+91 93554 12903</span>
            </a>

            {/* Primary CTA */}
            <button
              onClick={() => scrollTo("final-project")}
              className="clay-btn-primary group relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              <span>Start Project</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Actions Toggle */}
          <div className="flex md:hidden items-center gap-2">
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                className="clay-btn-secondary p-2 rounded-full text-white cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-4 h-4 text-red-400" />
              </button>
            )}
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="clay-btn-secondary p-2.5 rounded-2xl text-white cursor-pointer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Polished Full-Overlay Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl md:hidden flex flex-col justify-between p-6 pt-20"
          >
            {/* Header Close Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <img
                src="/logoimg.png"
                alt="Navya Tech Logo"
                className="h-8 w-auto object-contain"
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="clay-btn-secondary p-2.5 rounded-full text-white cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-red-400" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col space-y-3 py-6 overflow-y-auto">
              {[
                { label: "Home", id: "landing-hero" },
                { label: "Overview (Navya Tech)", id: "main-intro" },
                { label: "Capabilities & Services", id: "services" },
                { label: "AI & Agent Workflows", id: "ai-section" },
                { label: "Technology Standards", id: "features-cards" },
                { label: "Packages & Pricing ($1,000 / $1,500)", id: "pricing" },
                { label: "Testimonials & Proof", id: "testimonials" },
                { label: "Start a Project", id: "final-project" },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="clay-card text-left p-4 rounded-2xl text-base font-bold text-white flex items-center justify-between group hover:border-red-500/40 transition-colors"
                >
                  <span className="font-heading">{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-red-400 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </nav>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <a
                  href="tel:+919355412903"
                  className="clay-btn-secondary flex-1 py-3 rounded-full text-xs font-mono uppercase text-center text-white flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-red-400" />
                  <span>Call Us</span>
                </a>
                <a
                  href="https://wa.me/919355412903?text=Hi%20we%20would%20like%20to%20know%20more%20about%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clay-btn-secondary flex-1 py-3 rounded-full text-xs font-mono uppercase text-center text-emerald-300 border-emerald-500/40"
                >
                  WhatsApp
                </a>
              </div>

              <button
                onClick={() => scrollTo("final-project")}
                className="clay-btn-primary w-full py-3.5 rounded-full text-white font-bold text-sm uppercase tracking-wider text-center"
              >
                Start a Project Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalHeader;

import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowRight, Search, Phone, ChevronDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ui/theme-toggle";
import { scrollToTarget, stopScroll, startScroll, getLenis } from "@/lib/scroll";
import { COMPANY_CONFIG } from "@/config/founder";

export interface GlobalHeaderProps {
  onOpenSearch?: () => void;
}

const WEBSITE_SOLUTIONS = [
  { label: "Website Development", href: "/services/website-development", desc: "Next.js & full-stack architecture" },
  { label: "Ecommerce Website Development", href: "/services/ecommerce-website-development", desc: "0% commission digital storefronts" },
  { label: "Business Website Development", href: "/services/business-website-development", desc: "High-intent lead acquisition engines" },
  { label: "Website Redesign", href: "/services/website-redesign", desc: "Modernize with 100% SEO safety" },
  { label: "Web App Development", href: "/services/web-app-development", desc: "Scalable interactive web applications" },
];

const INTERNET_MARKETING = [
  { label: "Internet Marketing Bundle", href: "/services/internet-marketing-bundle", desc: "Unified SEO + GEO omni-growth package" },
  { label: "SEO", href: "/services/seo", desc: "Search Engine Optimization & technical schema" },
  { label: "GEO", href: "/services/geo", desc: "Generative Engine Optimization for AI answers" },
  { label: "AEO", href: "/services/aeo", desc: "Answer Engine Optimization for conversational search" },
];

const INDUSTRIES_MENU = [
  { label: "SaaS & Voice Automation", href: "/industries/saas", desc: "AI voice agents & onboarding workflows" },
  { label: "Real Estate & Luxury", href: "/industries/real-estate", desc: "Retina galleries & WhatsApp tour booking" },
  { label: "Healthcare & Clinics", href: "/industries/healthcare", desc: "Doctor profiles & patient intake triage" },
  { label: "E-commerce & Retail", href: "/industries/ecommerce", desc: "0% commission stores & order updates" },
  { label: "Professional Services", href: "/industries/professional-services", desc: "Legal, CPA & client onboarding" },
  { label: "Education & Academics", href: "/industries/education", desc: "Course catalogs & 24/7 AI counselors" },
  { label: "Technology & AI Labs", href: "/industries/technology", desc: "Deep tech WebGL & multi-agent workflows" },
  { label: "Small Businesses", href: "/industries/small-business", desc: "One-tap calls & missed-call receptionists" },
  { label: "Restaurant & Hospitality", href: "/industries/restaurants", desc: "Digital menus & WhatsApp food ordering" },
  { label: "Consulting & Advisory", href: "/industries/consulting", desc: "Thought leadership & pre-screening funnels" },
];

const PRICING_MENU = [
  { label: "Get a Custom Quote", href: "/pricing", desc: "Interactive quotation wizard & scope builder" },
  { label: "Talk to Decision-Makers", href: "/pricing#consult-decision-makers", desc: "Direct requirement review & consultation" },
  { label: "Previous Month's Average ($2,500)", href: "/pricing#pricing-insights", desc: "Internet Marketing investment benchmark" },
  { label: "Four-Step Quotation Flow", href: "/pricing#quotation-wizard", desc: "Select services & define your scope" },
];

const RESOURCES_MENU = [
  { label: "Resource Center", href: "/resources", desc: "Curated guides & tools" },
  { label: "Blog Index", href: "/blog", desc: "Latest engineering insights" },
  { label: "Website Development", href: "/blog/website-development", desc: "Architecture & costs" },
  { label: "Website Design", href: "/blog/website-design", desc: "UI/UX & design tokens" },
  { label: "3D Websites & WebGL", href: "/blog/3d-websites", desc: "Three.js & shaders" },
  { label: "Business Strategy", href: "/blog/business-websites", desc: "Conversion & growth" },
  { label: "Technical SEO", href: "/blog/seo", desc: "Core Web Vitals & schema" },
  { label: "Modern Web Tech", href: "/blog/web-development", desc: "Next.js & TypeScript" },
];

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isScrolledRef = useRef(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("services");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMobileSection = (section: string) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  const handleMouseEnter = (menu: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  useEffect(() => {
    let ticking = false;
    const updateNavbarState = (currentY: number) => {
      // Threshold with hysteresis (activates at 35px, deactivates at 15px)
      const shouldBeScrolled = isScrolledRef.current ? currentY > 15 : currentY > 35;
      if (isScrolledRef.current !== shouldBeScrolled) {
        isScrolledRef.current = shouldBeScrolled;
        setIsScrolled(shouldBeScrolled);
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateNavbarState(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Synchronize directly with Lenis scroll if present, plus window scroll listener
    const lenis = getLenis();
    const handleLenisScroll = (e: any) => {
      const scrollY = typeof e?.scroll === "number" ? e.scroll : window.scrollY;
      updateNavbarState(scrollY);
    };

    if (lenis) {
      lenis.on("scroll", handleLenisScroll);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (lenis) {
        lenis.off("scroll", handleLenisScroll);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Prevent background scrolling while mobile menu is open, pausing Lenis
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      stopScroll();
    } else {
      document.body.style.overflow = "";
      startScroll();
    }
    return () => {
      document.body.style.overflow = "";
      startScroll();
    };
  }, [mobileMenuOpen]);

  // Escape key closes mobile menu & dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    if (window.location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    scrollToTarget(id, { offset: -85, duration: 1.1 });
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
          <a
            href="/"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                scrollTo("landing-hero");
              }
            }}
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
          </a>

          {/* Desktop Primary Navigation with Dropdowns */}
          <nav className="hidden lg:flex items-center gap-1.5 clay-pill-nav px-4 py-1.5 relative">
            <a
              href="/"
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  scrollTo("landing-hero");
                }
              }}
              className="text-xs uppercase tracking-wider text-zinc-300 hover:text-white px-3 py-1.5 rounded-full transition-colors font-mono cursor-pointer hover:bg-white/5"
            >
              Home
            </a>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("services")}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href="/services"
                className="text-xs uppercase tracking-wider text-zinc-300 hover:text-white px-3 py-1.5 rounded-full transition-colors font-mono cursor-pointer hover:bg-white/5 flex items-center gap-1"
              >
                <span>Services</span>
                <ChevronDown className={`w-3 h-3 text-red-400 transition-transform ${activeDropdown === "services" ? "rotate-180" : ""}`} />
              </a>

              <AnimatePresence>
                {activeDropdown === "services" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[620px] clay-card p-4 shadow-2xl border border-red-500/30 grid grid-cols-2 gap-4 z-50 bg-black/95 backdrop-blur-2xl"
                  >
                    <div className="col-span-2 pb-2 mb-1 border-b border-white/10 flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold uppercase text-red-400">Approved Services Catalog</span>
                      <a href="/services" className="text-[11px] font-mono text-zinc-400 hover:text-white flex items-center gap-1">
                        <span>All 9 Services</span>
                        <ArrowRight className="w-3 h-3 text-red-400" />
                      </a>
                    </div>

                    {/* Website Solutions Column */}
                    <div className="space-y-1.5">
                      <div className="pb-1 mb-1 border-b border-white/5 flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-300">Website Solutions</span>
                        <span className="text-[9px] font-mono text-zinc-500">5 Services</span>
                      </div>
                      {WEBSITE_SOLUTIONS.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          className="p-2 rounded-xl hover:bg-white/5 transition-colors group/item block"
                        >
                          <div className="text-xs font-bold text-white group-hover/item:text-red-300 transition-colors font-heading">
                            {item.label}
                          </div>
                          <div className="text-[10px] text-zinc-400 font-light truncate">
                            {item.desc}
                          </div>
                        </a>
                      ))}
                    </div>

                    {/* Internet Marketing Column */}
                    <div className="space-y-1.5 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <div className="pb-1 mb-1 border-b border-white/5 flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-300">Internet Marketing</span>
                          <span className="text-[9px] font-mono text-zinc-500">4 Services</span>
                        </div>
                        {INTERNET_MARKETING.map((item) => (
                          <a
                            key={item.href}
                            href={item.href}
                            className="p-2 rounded-xl hover:bg-white/5 transition-colors group/item block"
                          >
                            <div className="text-xs font-bold text-white group-hover/item:text-red-300 transition-colors font-heading flex items-center justify-between">
                              <span>{item.label}</span>
                              {item.label.includes("Bundle") && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-300 font-mono">
                                  SEO + GEO
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-zinc-400 font-light truncate">
                              {item.desc}
                            </div>
                          </a>
                        ))}
                      </div>

                      {/* Featured Growth Callout */}
                      <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/20 mt-2">
                        <div className="text-[11px] font-bold text-white flex items-center gap-1.5 font-heading">
                          <Sparkles className="w-3 h-3 text-red-400" />
                          <span>Internet Marketing Bundle</span>
                        </div>
                        <p className="text-[10px] text-zinc-400 mt-1 leading-relaxed">
                          Unified search optimization combining SEO for Google and GEO for ChatGPT, Perplexity & AI engines.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Industries Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("industries")}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href="/industries"
                className="text-xs uppercase tracking-wider text-zinc-300 hover:text-white px-3 py-1.5 rounded-full transition-colors font-mono cursor-pointer hover:bg-white/5 flex items-center gap-1"
              >
                <span>Industries</span>
                <ChevronDown className={`w-3 h-3 text-red-400 transition-transform ${activeDropdown === "industries" ? "rotate-180" : ""}`} />
              </a>

              <AnimatePresence>
                {activeDropdown === "industries" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] clay-card p-4 shadow-2xl border border-red-500/30 grid grid-cols-2 gap-2 z-50 bg-black/95 backdrop-blur-2xl"
                  >
                    <div className="col-span-2 pb-2 mb-1 border-b border-white/10 flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold uppercase text-red-400">Industries We Power</span>
                      <a href="/industries" className="text-[11px] font-mono text-zinc-400 hover:text-white flex items-center gap-1">
                        <span>All Industries</span>
                        <ArrowRight className="w-3 h-3 text-red-400" />
                      </a>
                    </div>
                    {INDUSTRIES_MENU.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="p-2.5 rounded-xl hover:bg-white/5 transition-colors group/item block"
                      >
                        <div className="text-xs font-bold text-white group-hover/item:text-red-300 transition-colors font-heading">
                          {item.label}
                        </div>
                        <div className="text-[10px] text-zinc-400 font-light truncate">
                          {item.desc}
                        </div>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pricing Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("pricing")}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href="/pricing"
                className="text-xs uppercase tracking-wider text-zinc-300 hover:text-white px-3 py-1.5 rounded-full transition-colors font-mono cursor-pointer hover:bg-white/5 flex items-center gap-1"
              >
                <span>Pricing</span>
                <ChevronDown className={`w-3 h-3 text-red-400 transition-transform ${activeDropdown === "pricing" ? "rotate-180" : ""}`} />
              </a>

              <AnimatePresence>
                {activeDropdown === "pricing" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[420px] clay-card p-4 shadow-2xl border border-red-500/30 grid grid-cols-1 gap-2 z-50 bg-black/95 backdrop-blur-2xl"
                  >
                    <div className="pb-2 mb-1 border-b border-white/10 flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold uppercase text-red-400">Pocket-Friendly Quotations</span>
                      <a href="/pricing" className="text-[11px] font-mono text-zinc-400 hover:text-white flex items-center gap-1">
                        <span>Get a Quote</span>
                        <ArrowRight className="w-3 h-3 text-red-400" />
                      </a>
                    </div>
                    {PRICING_MENU.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="p-2.5 rounded-xl hover:bg-white/5 transition-colors group/item block"
                      >
                        <div className="text-xs font-bold text-white group-hover/item:text-red-300 transition-colors font-heading flex items-center justify-between">
                          <span>{item.label}</span>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 text-red-400 transition-opacity" />
                        </div>
                        <div className="text-[10px] text-zinc-400 font-light">
                          {item.desc}
                        </div>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("resources")}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href="/resources"
                className="text-xs uppercase tracking-wider text-zinc-300 hover:text-white px-3 py-1.5 rounded-full transition-colors font-mono cursor-pointer hover:bg-white/5 flex items-center gap-1"
              >
                <span>Resources</span>
                <ChevronDown className={`w-3 h-3 text-red-400 transition-transform ${activeDropdown === "resources" ? "rotate-180" : ""}`} />
              </a>

              <AnimatePresence>
                {activeDropdown === "resources" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] clay-card p-4 shadow-2xl border border-red-500/30 grid grid-cols-2 gap-2 z-50 bg-black/95 backdrop-blur-2xl"
                  >
                    <div className="col-span-2 pb-2 mb-1 border-b border-white/10 flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold uppercase text-red-400">Knowledge & Insights</span>
                      <a href="/blog" className="text-[11px] font-mono text-zinc-400 hover:text-white flex items-center gap-1">
                        <span>Blog Home</span>
                        <ArrowRight className="w-3 h-3 text-red-400" />
                      </a>
                    </div>
                    {RESOURCES_MENU.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="p-2.5 rounded-xl hover:bg-white/5 transition-colors group/item block"
                      >
                        <div className="text-xs font-bold text-white group-hover/item:text-red-300 transition-colors font-heading flex items-center justify-between">
                          <span>{item.label}</span>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 text-red-400 transition-opacity" />
                        </div>
                        <div className="text-[10px] text-zinc-400 font-light truncate">
                          {item.desc}
                        </div>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="/services/internet-marketing-bundle"
              className="text-xs uppercase tracking-wider text-red-400 hover:text-red-300 px-3 py-1.5 rounded-full transition-colors font-mono cursor-pointer hover:bg-white/5 font-bold"
            >
              Marketing Bundle
            </a>

            <a
              href="/contact"
              className="text-xs uppercase tracking-wider text-zinc-300 hover:text-white px-3 py-1.5 rounded-full transition-colors font-mono cursor-pointer hover:bg-white/5"
            >
              Contact
            </a>
          </nav>

          {/* Desktop Actions (>= lg) */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Search Trigger */}
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                className="clay-btn-secondary px-3.5 py-2 rounded-full text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-2 cursor-pointer min-h-[44px]"
                title="Search (Ctrl+K)"
                aria-label="Search website"
              >
                <Search className="w-3.5 h-3.5 text-red-400" />
                <span className="hidden xl:inline">Search</span>
                <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-white/10 text-zinc-400 rounded">
                  ⌘K
                </kbd>
              </button>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Direct Company Call Button */}
            <a
              href={COMPANY_CONFIG.phone.link}
              className="clay-btn-secondary px-3.5 py-2 rounded-full text-xs font-mono uppercase text-zinc-200 hover:text-white flex items-center gap-1.5 transition-all min-h-[44px]"
              aria-label={`${COMPANY_CONFIG.phone.label}: ${COMPANY_CONFIG.phone.display}`}
            >
              <Phone className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden xl:inline">{COMPANY_CONFIG.phone.display}</span>
              <span className="xl:hidden">{COMPANY_CONFIG.phone.label}</span>
            </a>

            {/* Custom Quote CTA Button */}
            <a
              href="/pricing"
              className="clay-btn-whatsapp px-4 sm:px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5 shadow-[0_0_15px_rgba(37,211,102,0.45)] cursor-pointer min-h-[44px]"
            >
              <span>Get a Custom Quote</span>
              <ArrowRight className="w-3 h-3 text-white" />
            </a>
          </div>

          {/* Mobile & Tablet Actions (< lg) */}
          <div className="flex lg:hidden items-center gap-2">
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                className="clay-btn-secondary p-2.5 rounded-full text-white cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Search website"
              >
                <Search className="w-4 h-4 text-red-400" />
              </button>
            )}

            {/* Tablet Action Buttons (md to lg) */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href={COMPANY_CONFIG.phone.link}
                className="clay-btn-secondary px-3.5 py-2 rounded-full text-xs font-mono uppercase text-zinc-200 hover:text-white flex items-center gap-1.5 min-h-[44px]"
                aria-label={`${COMPANY_CONFIG.phone.label}: ${COMPANY_CONFIG.phone.display}`}
              >
                <Phone className="w-3.5 h-3.5 text-red-400" />
                <span>{COMPANY_CONFIG.phone.label}</span>
              </a>
              <a
                href="/pricing"
                className="clay-btn-whatsapp px-4 py-2 rounded-full text-xs font-bold uppercase text-white flex items-center gap-1 shadow-[0_0_12px_rgba(37,211,102,0.4)] min-h-[44px]"
              >
                <span>Quote</span>
              </a>
            </div>

            <ThemeToggle />

            {/* Hamburger / Close Drawer Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="clay-btn-secondary p-2.5 rounded-2xl text-white cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center border border-white/15"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-red-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Polished Full-Overlay Mobile & Tablet Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl lg:hidden flex flex-col justify-between p-4 sm:p-6 overflow-hidden pt-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]"
          >
            {/* Header Close Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
              <a
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2"
                aria-label="Navya Tech Industry Home"
              >
                <img
                  src="/logoimg.png"
                  alt="Navya Tech Logo"
                  width={140}
                  height={44}
                  className="h-8 w-auto object-contain"
                />
              </a>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="clay-btn-secondary p-2.5 rounded-full text-white cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center border border-white/15"
                aria-label="Close menu"
                autoFocus
              >
                <X className="w-5 h-5 text-red-400" />
              </button>
            </div>

            {/* Scrollable Navigation Tree */}
            <nav className="flex-1 overflow-y-auto py-3 space-y-2.5 pr-1" aria-label="Mobile Navigation">
              {/* Home */}
              <a
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="clay-card min-h-[44px] px-4 py-3 rounded-2xl text-sm font-bold text-white flex items-center justify-between hover:border-red-500/40 transition-colors font-heading"
              >
                <span>Home</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
              </a>

              {/* Accordion 1: Services (Website Solutions + Internet Marketing) */}
              <div className="clay-card rounded-2xl overflow-hidden border border-white/10">
                <button
                  type="button"
                  onClick={() => toggleMobileSection("services")}
                  className="w-full min-h-[44px] px-4 py-3 flex items-center justify-between text-left font-bold text-sm text-white font-heading"
                  aria-expanded={expandedSection === "services"}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-red-400" />
                    <span>Services &amp; Capabilities</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-950/40 text-red-300 border border-red-500/30">
                      9
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-red-400 transition-transform duration-200 ${expandedSection === "services" ? "rotate-180" : ""}`} />
                </button>

                {expandedSection === "services" && (
                  <div className="px-3 pb-3 pt-1 space-y-1 border-t border-white/5 bg-black/40">
                    <div className="pt-1.5 pb-1 px-2 text-[10px] font-mono font-bold uppercase tracking-widest text-red-400">
                      Website Solutions
                    </div>
                    {WEBSITE_SOLUTIONS.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="min-h-[44px] px-3 py-2 rounded-xl text-xs text-zinc-200 hover:text-white flex items-center justify-between hover:bg-white/5 transition-colors"
                      >
                        <span className="font-medium">{item.label}</span>
                        <ArrowRight className="w-3 h-3 text-red-400/70" />
                      </a>
                    ))}

                    <div className="pt-3 pb-1 px-2 text-[10px] font-mono font-bold uppercase tracking-widest text-red-400 border-t border-white/5">
                      Internet Marketing (SEO + GEO + AEO)
                    </div>
                    {INTERNET_MARKETING.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="min-h-[44px] px-3 py-2 rounded-xl text-xs text-zinc-200 hover:text-white flex items-center justify-between hover:bg-white/5 transition-colors"
                      >
                        <span className="font-medium">{item.label}</span>
                        <ArrowRight className="w-3 h-3 text-red-400/70" />
                      </a>
                    ))}

                    <a
                      href="/services"
                      onClick={() => setMobileMenuOpen(false)}
                      className="mt-2 block min-h-[44px] px-3 py-2 text-center text-xs font-mono font-bold uppercase tracking-wider text-red-300 rounded-xl bg-red-950/30 border border-red-500/20"
                    >
                      View All 9 Services Catalog &rarr;
                    </a>
                  </div>
                )}
              </div>

              {/* Accordion 2: Industries */}
              <div className="clay-card rounded-2xl overflow-hidden border border-white/10">
                <button
                  type="button"
                  onClick={() => toggleMobileSection("industries")}
                  className="w-full min-h-[44px] px-4 py-3 flex items-center justify-between text-left font-bold text-sm text-white font-heading"
                  aria-expanded={expandedSection === "industries"}
                >
                  <div className="flex items-center gap-2">
                    <span>Industries</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-zinc-400">
                      10
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-red-400 transition-transform duration-200 ${expandedSection === "industries" ? "rotate-180" : ""}`} />
                </button>

                {expandedSection === "industries" && (
                  <div className="px-3 pb-3 pt-1 space-y-1 border-t border-white/5 bg-black/40">
                    {INDUSTRIES_MENU.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="min-h-[44px] px-3 py-2 rounded-xl text-xs text-zinc-200 hover:text-white flex items-center justify-between hover:bg-white/5 transition-colors"
                      >
                        <span className="font-medium">{item.label}</span>
                        <ArrowRight className="w-3 h-3 text-red-400/70" />
                      </a>
                    ))}
                    <a
                      href="/industries"
                      onClick={() => setMobileMenuOpen(false)}
                      className="mt-2 block min-h-[44px] px-3 py-2 text-center text-xs font-mono font-bold uppercase tracking-wider text-red-300 rounded-xl bg-red-950/30 border border-red-500/20"
                    >
                      Explore All Industries &rarr;
                    </a>
                  </div>
                )}
              </div>

              {/* Accordion 3: Pricing & Quotations */}
              <div className="clay-card rounded-2xl overflow-hidden border border-white/10">
                <button
                  type="button"
                  onClick={() => toggleMobileSection("pricing")}
                  className="w-full min-h-[44px] px-4 py-3 flex items-center justify-between text-left font-bold text-sm text-white font-heading"
                  aria-expanded={expandedSection === "pricing"}
                >
                  <span>Pricing &amp; Quotations</span>
                  <ChevronDown className={`w-4 h-4 text-red-400 transition-transform duration-200 ${expandedSection === "pricing" ? "rotate-180" : ""}`} />
                </button>

                {expandedSection === "pricing" && (
                  <div className="px-3 pb-3 pt-1 space-y-1 border-t border-white/5 bg-black/40">
                    {PRICING_MENU.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="min-h-[44px] px-3 py-2 rounded-xl text-xs text-zinc-200 hover:text-white flex items-center justify-between hover:bg-white/5 transition-colors"
                      >
                        <span className="font-medium">{item.label}</span>
                        <ArrowRight className="w-3 h-3 text-red-400/70" />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Accordion 4: Resources & Insights */}
              <div className="clay-card rounded-2xl overflow-hidden border border-white/10">
                <button
                  type="button"
                  onClick={() => toggleMobileSection("resources")}
                  className="w-full min-h-[44px] px-4 py-3 flex items-center justify-between text-left font-bold text-sm text-white font-heading"
                  aria-expanded={expandedSection === "resources"}
                >
                  <span>Resources &amp; Insights</span>
                  <ChevronDown className={`w-4 h-4 text-red-400 transition-transform duration-200 ${expandedSection === "resources" ? "rotate-180" : ""}`} />
                </button>

                {expandedSection === "resources" && (
                  <div className="px-3 pb-3 pt-1 space-y-1 border-t border-white/5 bg-black/40">
                    {RESOURCES_MENU.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="min-h-[44px] px-3 py-2 rounded-xl text-xs text-zinc-200 hover:text-white flex items-center justify-between hover:bg-white/5 transition-colors"
                      >
                        <span className="font-medium">{item.label}</span>
                        <ArrowRight className="w-3 h-3 text-red-400/70" />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Direct Quick Links */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="clay-card min-h-[44px] p-3 rounded-2xl text-xs font-bold text-white text-center flex items-center justify-center border hover:border-red-500/40"
                >
                  Contact Founder Directly
                </a>
                <a
                  href="/request-a-quote"
                  onClick={() => setMobileMenuOpen(false)}
                  className="clay-card min-h-[44px] p-3 rounded-2xl text-xs font-bold text-white text-center flex items-center justify-center border hover:border-red-500/40"
                >
                  Request a Quote
                </a>
              </div>
            </nav>

            {/* Bottom Actions Bar */}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5 shrink-0">
              <div className="flex items-center justify-between gap-2.5">
                <a
                  href={COMPANY_CONFIG.phone.link}
                  className="clay-btn-secondary flex-1 min-h-[44px] py-2.5 px-3 rounded-full text-xs font-mono uppercase text-center text-white flex items-center justify-center gap-1.5"
                  aria-label={`${COMPANY_CONFIG.phone.label}: ${COMPANY_CONFIG.phone.display}`}
                >
                  <Phone className="w-3.5 h-3.5 text-red-400" />
                  <span>{COMPANY_CONFIG.phone.label}</span>
                </a>
                <a
                  href={COMPANY_CONFIG.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clay-btn-secondary flex-1 min-h-[44px] py-2.5 px-3 rounded-full text-xs font-mono uppercase text-center text-emerald-300 border-emerald-500/40 flex items-center justify-center gap-1.5"
                  aria-label={COMPANY_CONFIG.whatsapp.label}
                >
                  <span>WhatsApp Us</span>
                </a>
              </div>

              <a
                href="/get-started"
                onClick={() => setMobileMenuOpen(false)}
                className="clay-btn-whatsapp w-full min-h-[48px] py-3 rounded-full text-white font-bold text-sm uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.45)]"
              >
                <span>Start a Project Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalHeader;

import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowRight, Search, Phone, ChevronDown, Sparkles, Globe, Layers, Building2, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ui/theme-toggle";

export interface GlobalHeaderProps {
  onOpenSearch?: () => void;
}

const SERVICES_MENU = [
  { label: "Website Development", href: "/services/website-development", desc: "Next.js & full-stack architecture" },
  { label: "Website Design", href: "/services/website-design", desc: "Claymorphic UI/UX systems" },
  { label: "3D Website Development", href: "/services/3d-website-development", desc: "WebGL & 60fps Three.js" },
  { label: "Custom Web Development", href: "/services/custom-web-development", desc: "Bespoke operational logic" },
  { label: "Business Website Development", href: "/services/business-website-development", desc: "Lead acquisition engines" },
  { label: "Landing Page Development", href: "/services/landing-page-development", desc: "High-conversion ad funnels" },
  { label: "Ecommerce Website Development", href: "/services/ecommerce-website-development", desc: "0% commission storefronts" },
  { label: "Web App Development", href: "/services/web-app-development", desc: "Interactive web applications" },
  { label: "Website Redesign", href: "/services/website-redesign", desc: "Modernize with 301 SEO safety" },
  { label: "Website Maintenance", href: "/services/website-maintenance", desc: "On-demand $50/request SLA" },
  { label: "Performance Optimization", href: "/services/website-performance-optimization", desc: "Sub-second Core Web Vitals" },
  { label: "Technical SEO", href: "/services/seo", desc: "JSON-LD schema & crawl readiness" },
];

const INDUSTRIES_MENU = [
  { label: "Startups & Scaleups", href: "/industries/startups", desc: "7-day launch & waitlist intake" },
  { label: "Small Business & Local", href: "/industries/small-business", desc: "One-tap calls & local SEO" },
  { label: "SaaS Platforms", href: "/industries/saas", desc: "Interactive tours & pricing" },
  { label: "Restaurants & Hospitality", href: "/industries/restaurants", desc: "Digital menus & WhatsApp orders" },
  { label: "Real Estate & Luxury", href: "/industries/real-estate", desc: "Retina galleries & virtual tours" },
  { label: "Consulting & Advisory", href: "/industries/consulting", desc: "Thought leadership & call booking" },
  { label: "Healthcare & Clinics", href: "/industries/healthcare", desc: "Doctor profiles & patient intake" },
  { label: "Education & Academies", href: "/industries/education", desc: "Course catalogs & enrollment" },
  { label: "Ecommerce & Retail", href: "/industries/ecommerce", desc: "D2C online store systems" },
  { label: "Technology & AI Labs", href: "/industries/technology", desc: "Deep tech dark mode & WebGL" },
  { label: "Professional Services", href: "/industries/professional-services", desc: "Legal, CPA & agency authority" },
];

const PRICING_MENU = [
  { label: "Global Pricing Overview", href: "/pricing", desc: "Complete $1,000 / $1,500 packages" },
  { label: "India Pricing (₹10,000)", href: "/pricing/india", desc: "GST invoices & local payments" },
  { label: "USA Pricing ($1,000)", href: "/pricing/usa", desc: "USD Stripe & ACH/Wire support" },
  { label: "Business Website Pricing", href: "/pricing/business-website", desc: "Corporate package inclusions" },
  { label: "3D Website Pricing", href: "/pricing/3d-website", desc: "Immersive WebGL & Three.js" },
  { label: "Ecommerce Store Pricing", href: "/pricing/ecommerce", desc: "Turnkey digital storefronts" },
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[540px] clay-card p-4 shadow-2xl border border-red-500/30 grid grid-cols-2 gap-2 z-50 bg-black/95 backdrop-blur-2xl"
                  >
                    <div className="col-span-2 pb-2 mb-1 border-b border-white/10 flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold uppercase text-red-400">Services Ecosystem</span>
                      <a href="/services" className="text-[11px] font-mono text-zinc-400 hover:text-white flex items-center gap-1">
                        <span>All Services</span>
                        <ArrowRight className="w-3 h-3 text-red-400" />
                      </a>
                    </div>
                    {SERVICES_MENU.map((item) => (
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
                      <span className="text-[11px] font-mono font-bold uppercase text-red-400">Fixed Commercial Packages</span>
                      <a href="/pricing" className="text-[11px] font-mono text-zinc-400 hover:text-white flex items-center gap-1">
                        <span>Pricing Matrix</span>
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
              href="/3d-website"
              className="text-xs uppercase tracking-wider text-red-400 hover:text-red-300 px-3 py-1.5 rounded-full transition-colors font-mono cursor-pointer hover:bg-white/5 font-bold"
            >
              3D Web
            </a>

            <a
              href="/contact"
              className="text-xs uppercase tracking-wider text-zinc-300 hover:text-white px-3 py-1.5 rounded-full transition-colors font-mono cursor-pointer hover:bg-white/5"
            >
              Contact
            </a>
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
                <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-white/10 text-zinc-400 rounded">
                  ⌘K
                </kbd>
              </button>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Direct Call Button (+91 93554 12903) */}
            <a
              href="tel:+919355412903"
              className="clay-btn-secondary px-3.5 py-2 rounded-full text-xs font-mono uppercase text-zinc-200 hover:text-white flex items-center gap-1.5 transition-all"
              aria-label="Call Navya Tech Industry directly"
            >
              <Phone className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden lg:inline">+91 93554 12903</span>
              <span className="lg:hidden">Call</span>
            </a>

            {/* Start Project CTA Button */}
            <a
              href="/get-started"
              className="clay-btn-primary px-4 sm:px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5 shadow-[0_0_15px_rgba(239,68,68,0.5)] cursor-pointer"
            >
              <span>Start Project</span>
              <ArrowRight className="w-3 h-3" />
            </a>
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
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl md:hidden flex flex-col justify-between p-6 pt-20"
          >
            {/* Header Close Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <a href="/" onClick={() => setMobileMenuOpen(false)}>
                <img
                  src="/logoimg.png"
                  alt="Navya Tech Logo"
                  className="h-8 w-auto object-contain"
                />
              </a>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="clay-btn-secondary p-2.5 rounded-full text-white cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-red-400" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col space-y-2.5 py-4 overflow-y-auto max-h-[62vh]">
              {[
                { label: "Home", href: "/" },
                { label: "Services Ecosystem", href: "/services" },
                { label: "• Website Development", href: "/services/website-development" },
                { label: "• 3D Web Development", href: "/services/3d-website-development" },
                { label: "• Website Design", href: "/services/website-design" },
                { label: "Industries We Power", href: "/industries" },
                { label: "• Startups & Scaleups", href: "/industries/startups" },
                { label: "• SaaS Platforms", href: "/industries/saas" },
                { label: "• Small Business", href: "/industries/small-business" },
                { label: "Packages & Pricing", href: "/pricing" },
                { label: "• India Pricing (₹10k)", href: "/pricing/india" },
                { label: "• USA Pricing ($1,000)", href: "/pricing/usa" },
                { label: "Resources & Blog", href: "/resources" },
                { label: "• Blog Home", href: "/blog" },
                { label: "• 3D Web Guides", href: "/blog/3d-websites" },
                { label: "• Technical SEO", href: "/blog/seo" },
                { label: "3D Web Systems", href: "/3d-website" },
                { label: "Build Website", href: "/build-website" },
                { label: "Custom Website", href: "/custom-website" },
                { label: "Request a Quote", href: "/request-a-quote" },
                { label: "Book a Strategy Call", href: "/book-a-call" },
                { label: "Contact & Consultation", href: "/contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`clay-card text-left p-3.5 rounded-2xl text-sm font-bold text-white flex items-center justify-between group hover:border-red-500/40 transition-colors ${
                    link.label.startsWith("•") ? "pl-6 text-xs text-zinc-300 font-medium" : ""
                  }`}
                >
                  <span className="font-heading">{link.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-red-400 group-hover:translate-x-1 transition-transform" />
                </a>
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

              <a
                href="/get-started"
                onClick={() => setMobileMenuOpen(false)}
                className="clay-btn-primary w-full py-3.5 rounded-full text-white font-bold text-sm uppercase tracking-wider text-center block"
              >
                Start a Project Now →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalHeader;

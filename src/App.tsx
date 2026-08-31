import React, { useState, useEffect } from "react";
import GlobalHeader from "@/components/ui/global-header";
import ParticleHero from "@/components/ui/animated-hero";
import { SaaSHero } from "@/components/ui/saa-s-template";
import HeroSection from "@/components/ui/3d-hero-section-boxes";
import HeroParallax from "@/components/ui/hero-parallax";
import GlassmorphismTrustHero from "@/components/ui/glassmorphism-trust-hero";
import ServicesSection from "@/components/ui/services-section";
import FeaturesCards from "@/components/ui/feature-shader-cards";
import { PricingSection } from "@/components/ui/aurora-background-2";
import AISection from "@/components/ui/hero-carousel";
import ParallaxComponent from "@/components/ui/parallax-scrolling";
import TestimonialsSection from "@/components/ui/community-testimonial";
import ParallaxFloatingShowcase from "@/components/ui/parallax-floating";
import WaitlistHero from "@/components/ui/waitlist-hero";
import Footer from "@/components/ui/footer";
import FloatingChatbot from "@/components/ui/floating-chatbot";
import ScrollProgress from "@/components/ui/scroll-progress";
import ScrollToTop from "@/components/ui/scroll-to-top";
import CookieBanner from "@/components/ui/cookie-banner";
import GlobalSearch from "@/components/ui/global-search";
import SmoothScrollProvider from "@/components/ui/smooth-scroll";
import TermsModal from "@/components/ui/terms-modal";
import GlobalPlexusBg from "@/components/ui/global-plexus-bg";
import StickyMobileCTA from "@/components/ui/sticky-mobile-cta";
import GenericSubpage from "@/components/templates/GenericSubpage";
import BlogArticleTemplate from "@/components/templates/BlogArticleTemplate";
import BlogHubTemplate from "@/components/templates/BlogHubTemplate";
import { getSubpageConfig } from "@/config/subpages";
import { getBlogArticle, getBlogCategory } from "@/config/blogs";
import { RouteProvider, useRoute } from "@/context/RouteContext";

function MainContent() {
  const { currentPath, navigate } = useRoute();
  const [searchOpen, setSearchOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  // Check Terms & Conditions acceptance on initial load
  useEffect(() => {
    const accepted = localStorage.getItem("navya-terms-accepted");
    if (!accepted) {
      const timer = setTimeout(() => setTermsOpen(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptTerms = () => {
    localStorage.setItem("navya-terms-accepted", "true");
    setTermsOpen(false);
  };

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleGetStarted = () => {
    navigate("/get-started");
  };

  const handleStartProject = () => {
    navigate("/get-started");
  };

  // 1. Check if route matches an individual blog article
  const blogArticle = getBlogArticle(currentPath);
  if (blogArticle) {
    return <BlogArticleTemplate article={blogArticle} />;
  }

  // 2. Check if route matches a blog category hub
  const blogCategory = getBlogCategory(currentPath);
  if (blogCategory) {
    return <BlogHubTemplate hubType="category" categoryHub={blogCategory} />;
  }

  // 3. Check if route matches /resources or /blog main hubs
  if (currentPath === "/resources") {
    return <BlogHubTemplate hubType="resources" />;
  }
  if (currentPath === "/blog") {
    return <BlogHubTemplate hubType="blog" />;
  }

  // 4. Check if currentPath matches one of our 44 subpages
  const subpageConfig = getSubpageConfig(currentPath);
  if (subpageConfig) {
    return <GenericSubpage config={subpageConfig} />;
  }

  // Otherwise render primary "/" Homepage
  return (
    <div className="relative min-h-screen text-foreground selection:bg-red-600/30 selection:text-red-200 overflow-x-hidden" style={{ background: "transparent" }}>
      {/* Global orange/black plexus background — fixed, behind everything */}
      <GlobalPlexusBg />

      {/* Smooth inertia scrolling provider */}
      <SmoothScrollProvider />

      {/* 0. Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* 1. Global Navigation Bar with Search & Theme Toggle */}
      <GlobalHeader onOpenSearch={() => setSearchOpen(true)} />

      <main className="relative w-full">
        {/* 1. Navya Tech Industry Parallax Title Section (Cinematic Hero Opening) */}
        <ParallaxComponent />

        {/* 2. SaaS Hero Section (Main Intro) */}
        <SaaSHero />

        {/* 3. Body Hero — 3D Spline Engine & Platform Showcase */}
        <HeroSection />

        {/* 4. Capability Ecosystem Parallax Scroller */}
        <HeroParallax />

        {/* 5. Trust & Performance Hero */}
        <GlassmorphismTrustHero
          onViewWorkClick={() => {
            const el = document.getElementById("services");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          onShowreelClick={() => {
            const el = document.getElementById("ai-section");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* 6. Services — 3 Core Capability Blocks */}
        <ServicesSection />

        {/* 7. Web Features — Interactive WebGL Shader Cards */}
        <FeaturesCards />

        {/* 8. Packages & Pricing ($1,000 / $1,500) */}
        <PricingSection onSelectPlan={() => handleStartProject()} />

        {/* 9. AI & Automation — The Navya Intelligent Workflow Architecture */}
        <AISection />

        {/* 10. Navya Tech Industry Particle Hero ("Growth shouldn't be this stressful...") */}
        <ParticleHero
          title="NAVYA"
          subtitle="Tech Industry"
          description="Growth shouldn’t be this stressful. We’ll take the headache. You handle the business. We’ll handle the chaos behind the growth."
          primaryButton={{
            text: "Let's Fix!",
            onClick: handleGetStarted,
          }}
          interactiveHint="Hover to Interact"
        />

        {/* 11. Testimonials — 3-Row Alternating Horizontal Marquee */}
        <TestimonialsSection />

        {/* 12. Commitment Showcase — Parallax Floating Showcase */}
        <ParallaxFloatingShowcase />

        {/* 13. Final Project Inquiry — 3D Celestial Conversion & Confetti Form */}
        <WaitlistHero />
      </main>

      {/* 15. Global Footer */}
      <Footer onOpenTerms={() => setTermsOpen(true)} />

      {/* 16. Global Search Modal (⌘K) */}
      <GlobalSearch
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onOpenTerms={() => setTermsOpen(true)}
      />

      {/* 17. Bottom-Left Scroll-To-Top Button */}
      <ScrollToTop />

      {/* 18. Minimal Cookie Banner */}
      <CookieBanner />

      {/* 19. Floating AI Chatbot with Direct Contact Actions */}
      <FloatingChatbot />

      {/* 20. Sticky Mobile CTA for Mobile Screens */}
      <StickyMobileCTA />

      {/* 21. Floating Terms & Conditions Modal (Dismissed only via 'I Accept') */}
      <TermsModal isOpen={termsOpen} onAccept={handleAcceptTerms} />
    </div>
  );
}

export function App() {
  return (
    <RouteProvider>
      <MainContent />
    </RouteProvider>
  );
}

export default App;

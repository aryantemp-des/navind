import React from "react";
import { Link } from "@/context/RouteContext";
import { ShieldCheck, Zap, Code, Sparkles, Check, ArrowRight, Phone, MessageSquare } from "lucide-react";
import PageHero from "@/components/ui/page-hero";
import FeatureGrid from "@/components/ui/feature-grid";
import ProcessSection from "@/components/ui/process-section";
import FAQAccordion from "@/components/ui/faq-accordion";
import RelatedLinks from "@/components/ui/related-links";
import SEOHead from "@/components/seo/SEOHead";
import SubpageLayout from "@/components/layout/SubpageLayout";

export interface SubpageConfig {
  slug: string;
  category: string;
  title: string;
  h1: string;
  metaDescription: string;
  primaryKeyword: string;
  breadcrumbs: { label: string; href?: string }[];
  heroDescription: string;
  heroImageAlt: string;
  heroImageSrc?: string;
  heroStats?: { label: string; value: string }[];
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  whatsappMessage?: string;
  overviewTitle: string;
  overviewDescription: string;
  overviewCards: {
    title: string;
    description: string;
    badge?: string;
    points?: string[];
    href?: string;
    ctaText?: string;
    ctaLink?: string;
  }[];
  capabilitiesTitle?: string;
  capabilitiesSubtitle?: string;
  capabilitiesId?: string;
  capabilitiesVariant?: "default" | "yellow-glow";
  capabilitiesBottomAction?: {
    text: string;
    href: string;
    variant?: "red" | "default";
  };
  capabilities: {
    title: string;
    description: string;
    badge?: string;
    points?: string[];
    href?: string;
  }[];
  processTitle?: string;
  processSubtitle?: string;
  processSteps?: {
    number: string;
    title: string;
    description: string;
    deliverables?: string[];
  }[];
  differentiatorsTitle?: string;
  differentiators?: {
    title: string;
    description: string;
    badge?: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedLinks: {
    title: string;
    description: string;
    href: string;
    category?: string;
  }[];
  customSections?: React.ReactNode;
}

export const GenericSubpage: React.FC<{ config: SubpageConfig }> = ({ config }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: config.title,
    description: config.metaDescription,
    provider: {
      "@type": "Organization",
      name: "Navya Tech Industry",
      url: "https://www.navyatech.co.in",
      logo: "https://www.navyatech.co.in/logoimg.png",
      telephone: "+919355412903",
    },
    areaServed: ["India", "United States", "Global"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Engineering & Web Packages",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website Engineering Package",
          },
          price: "1000",
          priceCurrency: "USD",
        },
      ],
    },
  };

  return (
    <SubpageLayout breadcrumbs={config.breadcrumbs}>
      {/* 1. SEO Head Meta Management */}
      <SEOHead
        title={config.title}
        description={config.metaDescription}
        canonicalPath={config.slug}
        keywords={[
          config.primaryKeyword,
          "Navya Tech Industry",
          "web engineering",
          "custom websites",
          "Next.js development",
        ]}
        structuredData={structuredData}
        breadcrumbs={config.breadcrumbs}
      />

      {/* 2. Hero Section */}
      <PageHero
        category={config.category}
        title={config.h1}
        description={config.heroDescription}
        imageAlt={config.heroImageAlt}
        imageSrc={config.heroImageSrc || "/ai1.png"}
        stats={config.heroStats}
        whatsappMessage={config.whatsappMessage}
        primaryCtaText={config.primaryCtaText}
        primaryCtaLink={config.primaryCtaLink}
        secondaryCtaText={config.secondaryCtaText || "Pricing Plans"}
        secondaryCtaLink={config.secondaryCtaLink || "/pricing"}
      />

      {/* 3. Deep Overview Section */}
      <section className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900/80">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            <div className="lg:col-span-5 space-y-4">
              <div className="clay-badge inline-flex items-center gap-2 px-3.5 py-1.5 text-red-300 text-xs font-semibold uppercase tracking-widest font-mono">
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                Strategic Overview
              </div>
              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black text-white tracking-tight font-heading leading-tight">
                {config.overviewTitle}
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-base sm:text-xl text-zinc-300 font-light leading-relaxed">
                {config.overviewDescription}
              </p>
            </div>
          </div>

          {/* Overview Value Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {config.overviewCards.map((card, idx) => (
              <div
                key={idx}
                className="clay-card-interactive p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-red-400">
                      0{idx + 1}
                    </span>
                    {card.badge && (
                      <span className="clay-badge text-[10px] font-mono uppercase px-2 py-0.5 text-zinc-300">
                        {card.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-heading">
                    {card.title}
                  </h3>
                  <p className="text-sm text-zinc-300 font-light leading-relaxed mb-4">
                    {card.description}
                  </p>
                </div>

                {card.points && (
                  <div className="pt-4 border-t border-white/10 space-y-2">
                    {card.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2 text-xs text-zinc-300 font-light">
                        <Check className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                )}

                {(config.slug.startsWith("/pricing") || card.ctaText) && (
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <Link
                      href={card.ctaLink || "/get-started"}
                      className="clay-btn-primary group w-full py-3.5 px-4 rounded-full text-white font-bold text-xs uppercase tracking-wider cursor-pointer text-center flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.65)] hover:scale-[1.02] transition-all"
                    >
                      <span>{card.ctaText || "Start Project"}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Capabilities Grid */}
      {config.capabilities && config.capabilities.length > 0 && (
        <FeatureGrid
          id={config.capabilitiesId || (config.slug === "/services" ? "explore-services" : undefined)}
          category={config.capabilitiesSubtitle || "Core Architecture"}
          title={config.capabilitiesTitle || "Engineering Capabilities & Deliverables"}
          features={config.capabilities}
          columns={config.capabilities.length > 3 ? 3 : 3}
          variant={config.capabilitiesVariant || (config.slug === "/services" ? "yellow-glow" : "default")}
          bottomAction={config.capabilitiesBottomAction}
        />
      )}

      {/* Optional Custom Sections (e.g. interactive 3D demos or pricing tiers) */}
      {config.customSections}

      {/* 5. Contextual WhatsApp & Direct Engineering Intake Banner */}
      <section className="relative w-full py-12 px-4 sm:px-6 lg:px-8 border-t border-zinc-900/80">
        <div className="max-w-7xl mx-auto">
          <div className="clay-card-interactive p-8 sm:p-12 relative overflow-hidden bg-gradient-to-r from-red-950/20 via-black to-emerald-950/20 border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="clay-badge inline-flex items-center gap-2 px-3 py-1 text-emerald-300 text-xs font-mono uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Direct Technical Inquiry
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
                  Ready to Discuss {config.h1}?
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 font-light max-w-2xl">
                  Connect directly with our engineering team on WhatsApp to review requirements, custom features, delivery timeline, and fixed commercial pricing.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <a
                  href={`https://wa.me/919355412903?text=${encodeURIComponent(config.whatsappMessage || `Hi, I’m interested in ${config.h1}. I’d like to discuss building our project with Navya.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clay-btn-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-white font-bold text-xs uppercase tracking-wider cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] border border-emerald-500/50"
                  aria-label={`Chat on WhatsApp about ${config.h1}`}
                >
                  <MessageSquare className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>WhatsApp Engineering</span>
                </a>
                <a
                  href="tel:+919355412903"
                  className="clay-btn-secondary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-mono text-zinc-200 hover:text-white uppercase tracking-wider border border-white/10"
                >
                  <Phone className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>Call +91 93554 12903</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Execution Roadmap Process */}
      {config.processSteps && (
        <ProcessSection
          title={config.processTitle}
          subtitle={config.processSubtitle}
          steps={config.processSteps}
        />
      )}

      {/* 7. Why Navya Differentiators Section */}
      {config.differentiators && config.differentiators.length > 0 && (
        <section className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900/80 bg-black/40">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="clay-badge inline-flex items-center gap-2 px-4 py-2 text-red-300 text-xs font-semibold uppercase tracking-widest mb-4 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                The Navya Standard
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading mb-4">
                {config.differentiatorsTitle || "Why Industry Leaders Partner With Navya"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {config.differentiators.map((diff, dIdx) => (
                <div key={dIdx} className="clay-card p-6 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 clay-icon-well flex items-center justify-center mb-4">
                      <Zap className="w-5 h-5 text-red-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white font-heading mb-2">
                      {diff.title}
                    </h3>
                    <p className="text-xs text-zinc-300 font-light leading-relaxed">
                      {diff.description}
                    </p>
                  </div>
                  {diff.badge && (
                    <div className="pt-4 mt-4 border-t border-white/5 text-[10px] font-mono text-red-400 uppercase">
                      {diff.badge}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. FAQ Accordion */}
      {config.faqs && config.faqs.length > 0 && (
        <FAQAccordion items={config.faqs} />
      )}

      {/* 9. Connected Ecosystem Links */}
      {config.relatedLinks && config.relatedLinks.length > 0 && (
        <RelatedLinks links={config.relatedLinks} />
      )}
    </SubpageLayout>
  );
};

export default GenericSubpage;

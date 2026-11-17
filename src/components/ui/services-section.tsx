import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Globe,
  ShoppingCart,
  Building2,
  RefreshCw,
  Layers,
  Sparkles,
  Search,
  Bot,
  HelpCircle,
  ArrowRight,
  ArrowUpRight
} from "lucide-react";

export interface ApprovedServiceItem {
  id: string;
  category: "Website Solutions" | "Internet Marketing";
  title: string;
  subtitle?: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
  ctaText: string;
  highlight?: boolean;
}

const APPROVED_SERVICES: ApprovedServiceItem[] = [
  // 1. Website Development
  {
    id: "website-development",
    category: "Website Solutions",
    title: "Website Development",
    description:
      "Enterprise Next.js architecture, type-safe TypeScript backends, seamless API integrations, and sub-second edge deployment.",
    href: "/services/website-development",
    icon: Globe,
    tags: ["Next.js", "TypeScript", "REST & GraphQL", "Lighthouse 95+"],
    ctaText: "Explore Website Dev",
  },
  // 2. Ecommerce Website Development
  {
    id: "ecommerce-website-development",
    category: "Website Solutions",
    title: "Ecommerce Website Development",
    description:
      "High-conversion digital storefronts with 0% platform take-rates, rapid faceted product filtering, and instant checkout flows.",
    href: "/services/ecommerce-website-development",
    icon: ShoppingCart,
    tags: ["0% Commission", "Stripe & Razorpay", "Instant Cart", "Inventory Sync"],
    ctaText: "Explore Ecommerce",
  },
  // 3. Business Website Development
  {
    id: "business-website-development",
    category: "Website Solutions",
    title: "Business Website Development",
    description:
      "Conversion-focused corporate platforms built to command industry authority, qualify inbound prospects, and generate high-intent leads.",
    href: "/services/business-website-development",
    icon: Building2,
    tags: ["Inbound Funnels", "WhatsApp Integration", "Executive Credibility", "Lead Capture"],
    ctaText: "Explore Business Web",
  },
  // 4. Website Redesign
  {
    id: "website-redesign",
    category: "Website Solutions",
    title: "Website Redesign",
    description:
      "Complete interface modernization and Core Web Vitals speed overhaul with 100% 301 redirect mapping to protect your existing SEO equity.",
    href: "/services/website-redesign",
    icon: RefreshCw,
    tags: ["SEO Equity Safe", "301 Redirect Maps", "UI/UX Refresh", "Speed Overhaul"],
    ctaText: "Explore Redesign",
  },
  // 5. Web App Development
  {
    id: "web-app-development",
    category: "Website Solutions",
    title: "Web App Development",
    description:
      "Interactive, full-stack web platforms engineered around proprietary workflows, complex state logic, and secure authentication.",
    href: "/services/web-app-development",
    icon: Layers,
    tags: ["SaaS Dashboards", "Role-Based Auth", "Real-Time Telemetry", "Scalable DB"],
    ctaText: "Explore Web Apps",
  },
  // 6. Internet Marketing Bundle
  {
    id: "internet-marketing-bundle",
    category: "Internet Marketing",
    title: "Internet Marketing Bundle",
    subtitle: "SEO + GEO Dual Engine",
    description:
      "Unified omni-search marketing package combining technical SEO for Google dominance with Generative Engine Optimization (GEO) for AI citations.",
    href: "/services/internet-marketing-bundle",
    icon: Sparkles,
    tags: ["SEO + GEO Dual Engine", "ChatGPT & Perplexity", "Omni-Search", "Max Growth"],
    ctaText: "Explore Marketing Bundle",
    highlight: true,
  },
  // 7. SEO
  {
    id: "seo",
    category: "Internet Marketing",
    title: "SEO",
    subtitle: "Search Engine Optimization",
    description:
      "Improve website visibility in traditional search engines, strengthen organic rankings, and attract relevant search traffic.",
    href: "/services/seo",
    icon: Search,
    tags: ["Technical Crawl", "JSON-LD Schema", "Core Web Vitals", "Zero Bloat"],
    ctaText: "Explore SEO",
  },
  // 8. GEO
  {
    id: "geo",
    category: "Internet Marketing",
    title: "GEO",
    subtitle: "Generative Engine Optimization",
    description:
      "Improve brand visibility and discoverability across generative AI platforms by structuring authoritative, relevant, and useful content.",
    href: "/services/geo",
    icon: Bot,
    tags: ["AI Search Citations", "Knowledge Graph", "AEO Direct Answers", "LLM Authority"],
    ctaText: "Explore GEO",
  },
  // 9. AEO
  {
    id: "aeo",
    category: "Internet Marketing",
    title: "AEO",
    subtitle: "Answer Engine Optimization",
    description:
      "Optimize content and brand information to improve discoverability and eligibility for direct answers in AI-powered answer engines, conversational search, and question-based search experiences.",
    href: "/services/aeo",
    icon: HelpCircle,
    tags: ["Direct Answers", "Conversational Search", "Question-Based Queries", "AI Discoverability"],
    ctaText: "Explore AEO",
  },
];

export const ServicesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Website Solutions" | "Internet Marketing">("All");
  const reduced = useReducedMotion();

  const filteredServices = selectedCategory === "All"
    ? APPROVED_SERVICES
    : APPROVED_SERVICES.filter((s) => s.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="services" className="relative w-full bg-black/60 py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-14"
        >
          <div className="clay-badge inline-flex items-center gap-2 px-4 py-2 text-red-300 text-xs font-semibold uppercase tracking-widest mb-6 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            Approved Services Catalog
          </div>

          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] font-heading mb-6">
            Services &amp; Capabilities
          </h2>

          <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed">
            Nine specialized service offerings across two focused pillars: high-performance <strong className="text-white font-medium">Website Solutions</strong> and full-spectrum <strong className="text-white font-medium">Internet Marketing</strong>.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 md:mb-14">
          {(["All", "Website Solutions", "Internet Marketing"] as const).map((cat) => {
            const count = cat === "All"
              ? APPROVED_SERVICES.length
              : APPROVED_SERVICES.filter((s) => s.category === cat).length;
            const isActive = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "clay-btn-primary text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] scale-105"
                    : "clay-btn-secondary text-zinc-400 hover:text-white"
                }`}
              >
                <span>{cat === "All" ? "All Approved Services" : cat}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  isActive ? "bg-black/30 text-white" : "bg-white/10 text-zinc-400"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Services Cards Grid with Staggered Entrance */}
        <motion.div
          key={selectedCategory}
          variants={containerVariants}
          initial={reduced ? false : "hidden"}
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={reduced ? undefined : { y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
                className={`clay-card-interactive p-7 sm:p-8 flex flex-col justify-between group rounded-3xl transition-colors duration-300 ${
                  service.highlight
                    ? "border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)] bg-gradient-to-b from-red-950/30 via-zinc-950 to-black hover:border-red-400/80"
                    : "hover:border-red-500/50"
                }`}
              >
                <div>
                  {/* Top Row: Icon + Category Badge + Index Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="clay-icon-well w-13 h-13 flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-red-400" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-red-400/80 px-2.5 py-1 rounded-full bg-red-950/30 border border-red-500/20">
                        {service.category}
                      </span>
                      <span className="font-mono text-zinc-500 group-hover:text-red-400 font-bold text-xs tracking-wider transition-colors">
                        0{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mb-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-red-200 transition-colors font-heading flex items-center justify-between">
                      <span>{service.title}</span>
                      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-red-400 shrink-0 ml-2" />
                    </h3>
                    {service.subtitle && (
                      <div className="text-[11px] font-mono text-red-400/90 font-medium mt-0.5">
                        {service.subtitle}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-zinc-300 font-light leading-relaxed mb-6 text-sm">
                    {service.description}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div className="pt-4 border-t border-white/10 mb-6">
                    <div className="flex flex-wrap gap-1.5">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="clay-badge text-[10px] font-mono uppercase tracking-wider text-zinc-400 px-2.5 py-1 group-hover:border-red-500/20 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Service Specific CTA Button */}
                  <a
                    href={service.href}
                    className="clay-btn-secondary w-full py-2.5 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white hover:text-red-200 flex items-center justify-center gap-2 group/btn transition-all hover:border-red-500/40"
                  >
                    <span>{service.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-red-400 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Hub Actions */}
        <div className="mt-14 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h4 className="text-base font-bold text-white font-heading">
              Ready to start or need a custom combination?
            </h4>
            <p className="text-xs text-zinc-400 font-light mt-0.5">
              Explore our full service catalog or talk directly with our engineering team.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/services"
              className="clay-btn-secondary inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider text-white hover:text-red-300"
            >
              <span>View Full Services Catalog</span>
              <ArrowRight className="w-3.5 h-3.5 text-red-400" />
            </a>

            <a
              href="/get-started"
              className="clay-btn-primary inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

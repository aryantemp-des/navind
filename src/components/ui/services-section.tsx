import React from "react";
import { Globe, Bot, ShieldCheck, ArrowUpRight, Sparkles } from "lucide-react";

export interface ServiceCardItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
  gradient: string;
  borderGlow: string;
}

const servicesData: ServiceCardItem[] = [
  {
    id: "digital-experiences",
    title: "Digital Experiences",
    description: "High-performance websites and digital platforms designed to turn attention into engagement and business growth.",
    href: "/services/website-development",
    icon: Globe,
    tags: ["Next.js", "WebGL / 3D", "UI/UX Systems", "Core Web Vitals"],
    gradient: "from-red-950/40 via-zinc-900 to-black",
    borderGlow: "border-red-500/30 hover:border-red-500/70 shadow-[0_0_20px_rgba(239,68,68,0.15)] hover:shadow-[0_0_35px_rgba(239,68,68,0.35)]"
  },
  {
    id: "ai-agents-automation",
    title: "AI Agents & Automation",
    description: "Intelligent AI agents that handle repetitive work, respond to customers, automate workflows, and help teams move faster.",
    href: "/services/web-app-development",
    icon: Bot,
    tags: ["Agentic Workflows", "CRM & ERP Sync", "Lead Automation", "Human-in-the-Loop"],
    gradient: "from-amber-950/40 via-zinc-900 to-black",
    borderGlow: "border-amber-500/30 hover:border-amber-500/70 shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:shadow-[0_0_35px_rgba(245,158,11,0.35)]"
  },
  {
    id: "security-architecture",
    title: "Security Architecture",
    description: "Secure-by-design systems, infrastructure, and architecture built to protect your data, applications, and business operations.",
    href: "/services/custom-web-development",
    icon: ShieldCheck,
    tags: ["Threat Modeling", "Zero-Trust", "Data Governance", "Audit Readiness"],
    gradient: "from-rose-950/40 via-zinc-900 to-black",
    borderGlow: "border-rose-500/30 hover:border-rose-500/70 shadow-[0_0_20px_rgba(244,63,94,0.15)] hover:shadow-[0_0_35px_rgba(244,63,94,0.35)]"
  }
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="relative w-full bg-black/50 py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="clay-badge inline-flex items-center gap-2 px-4 py-2 text-red-300 text-xs font-semibold uppercase tracking-widest mb-6 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            Core Capabilities
          </div>

          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] font-heading mb-6">
            Capabilities
          </h2>

          <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed">
            Building intelligent digital systems, AI agents, and secure technology that turn complex business challenges into measurable growth.
          </p>
        </div>

        {/* Services 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            const Icon = service.icon;
            return (
              <a
                key={service.id}
                href={service.href}
                className="clay-card-interactive p-8 sm:p-10 flex flex-col justify-between group cursor-pointer block"
              >
                <div>
                  {/* Top Row: Icon + Number */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="clay-icon-well w-14 h-14 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-red-400" />
                    </div>
                    <span className="font-mono text-zinc-500 group-hover:text-red-400 font-bold text-sm tracking-wider transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-red-200 transition-colors font-heading flex items-center justify-between">
                    {service.title}
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-red-400" />
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-300 font-light leading-relaxed mb-8 text-sm sm:text-base">
                    {service.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="pt-6 border-t border-white/10">
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="clay-badge text-[11px] font-mono uppercase tracking-wider text-zinc-300 px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Bottom Hub Link */}
        <div className="mt-12 text-center">
          <a
            href="/services"
            className="clay-btn-secondary inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider text-white hover:text-red-300"
          >
            <span>Explore All 12 Services in Ecosystem</span>
            <ArrowUpRight className="w-4 h-4 text-red-400" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

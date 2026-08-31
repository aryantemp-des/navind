import React from "react";
import { ArrowRight, Sparkles, Phone } from "lucide-react";
import { Link } from "@/context/RouteContext";

export interface PageHeroProps {
  category: string;
  title: string;
  description: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  showCallNow?: boolean;
  imageSrc?: string;
  imageAlt: string;
  stats?: { label: string; value: string }[];
  badgeText?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  category,
  title,
  description,
  primaryCtaText = "Start Project",
  primaryCtaLink = "/get-started",
  secondaryCtaText = "Commercial Packages",
  secondaryCtaLink = "/pricing",
  showCallNow = true,
  imageSrc = "/ai1.png",
  imageAlt,
  stats = [
    { label: "Lighthouse Performance", value: "98/100" },
    { label: "Core Web Vitals", value: "Sub-second" },
    { label: "Source Code Ownership", value: "100% Full" },
  ],
}) => {
  return (
    <section className="relative w-full pt-4 pb-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headings & Conversion CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 clay-badge px-4 py-2 text-xs font-mono uppercase tracking-widest text-red-300">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>{category}</span>
            </div>

            {/* Page H1 Title */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.08] font-heading">
              {title}
            </h1>

            {/* Concise Value Description */}
            <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl">
              {description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Primary Start Project CTA */}
              <Link
                href={primaryCtaLink}
                className="clay-btn-primary group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-white font-bold text-sm uppercase tracking-wider cursor-pointer shadow-[0_0_25px_rgba(239,68,68,0.45)] hover:shadow-[0_0_35px_rgba(239,68,68,0.7)]"
              >
                <span>{primaryCtaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Call Now Button */}
              {showCallNow && (
                <a
                  href="tel:+919355412903"
                  className="clay-btn-secondary inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-mono text-zinc-200 hover:text-white uppercase tracking-wider border border-red-500/30 hover:border-red-500/70 cursor-pointer"
                  title="Call Navya Tech Industry directly"
                >
                  <Phone className="w-4 h-4 text-red-400" />
                  <span>Call Now (+91 93554 12903)</span>
                </a>
              )}

              {/* Secondary CTA */}
              {secondaryCtaLink && (
                <Link
                  href={secondaryCtaLink}
                  className="clay-btn-secondary inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-mono text-zinc-300 hover:text-white uppercase tracking-wider cursor-pointer"
                >
                  <span>{secondaryCtaText}</span>
                </Link>
              )}
            </div>

            {/* Quick Proof Stats */}
            {stats && stats.length > 0 && (
              <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <div className="text-xl sm:text-2xl font-bold text-white font-heading">
                      {stat.value}
                    </div>
                    <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl p-3 clay-card border border-red-500/30 shadow-[0_20px_50px_rgba(239,68,68,0.2)] group overflow-hidden">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/60">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  width={720}
                  height={540}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                
                {/* Floating Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 clay-surface p-3 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-white font-heading">{title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-red-300 uppercase">Navya Production</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PageHero;

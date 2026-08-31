import React from "react";
import { ArrowRight, ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Link } from "@/context/RouteContext";

export interface FeatureItem {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  points?: string[];
  href?: string;
}

export interface FeatureGridProps {
  id?: string;
  category?: string;
  title: string;
  subtitle?: string;
  features: FeatureItem[];
  columns?: 2 | 3 | 4;
  variant?: "default" | "yellow-glow";
  bottomAction?: {
    text: string;
    href: string;
    variant?: "red" | "default";
  };
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  id,
  category = "Capabilities",
  title,
  subtitle,
  features,
  columns = 3,
  variant = "default",
  bottomAction,
}) => {
  const colClass =
    columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : columns === 4
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  const isYellowGlow = variant === "yellow-glow";

  return (
    <section
      id={id}
      className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900/80 scroll-mt-24 md:scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
          {category && (
            <div
              className={`clay-badge inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-widest mb-4 font-mono ${
                isYellowGlow ? "text-amber-300 border-amber-500/30" : "text-red-300"
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${isYellowGlow ? "text-amber-400" : "text-red-400"}`} />
              {category}
            </div>
          )}
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base sm:text-lg text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Cards Grid */}
        <div className={`grid ${colClass} gap-6 sm:gap-8 items-stretch`}>
          {features.map((item, index) => {
            const Icon = item.icon;
            const cardHref = item.href || (item.badge && item.badge.startsWith("/") ? item.badge : undefined);
            const indexNumber = String(index + 1).padStart(2, "0");

            const cardContent = (
              <>
                <div>
                  <div className="flex items-center justify-between mb-6">
                    {Icon ? (
                      <div className="clay-icon-well w-12 h-12 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                        <Icon className={`w-6 h-6 ${isYellowGlow ? "text-amber-400" : "text-red-400"}`} />
                      </div>
                    ) : (
                      <span className={`font-mono text-xs font-bold ${isYellowGlow ? "text-amber-400" : "text-red-400"}`}>
                        {indexNumber}
                      </span>
                    )}
                    {item.badge && (
                      <span
                        className={`clay-badge text-[10px] font-mono uppercase px-2.5 py-1 ${
                          isYellowGlow ? "text-amber-200/90 border-amber-500/30" : "text-zinc-300"
                        }`}
                      >
                        {item.badge.startsWith("/") ? "Service" : item.badge}
                      </span>
                    )}
                  </div>

                  <h3
                    className={`text-xl font-bold text-white mb-3 font-heading transition-colors flex items-center justify-between gap-2 ${
                      isYellowGlow ? "group-hover:text-amber-200" : "group-hover:text-red-200"
                    }`}
                  >
                    <span>{item.title}</span>
                    {cardHref && (
                      <ArrowUpRight
                        className={`w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ${
                          isYellowGlow ? "text-amber-400" : "text-red-400"
                        }`}
                      />
                    )}
                  </h3>

                  <p className="text-zinc-300 text-sm font-light leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {item.points && item.points.length > 0 && (
                  <div className={`pt-4 border-t space-y-2 mt-auto ${isYellowGlow ? "border-amber-500/20" : "border-white/10"}`}>
                    {item.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-xs text-zinc-300 font-light">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isYellowGlow ? "text-amber-400" : "text-red-400"}`} />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                )}

                {cardHref && (
                  <div
                    className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-mono text-zinc-400 transition-colors ${
                      isYellowGlow
                        ? "border-amber-500/20 group-hover:text-amber-300"
                        : "border-white/10 group-hover:text-red-300"
                    }`}
                  >
                    <span>Explore Service</span>
                    <ArrowRight className={`w-3.5 h-3.5 group-hover:translate-x-1 transition-transform ${isYellowGlow ? "text-amber-400" : "text-red-400"}`} />
                  </div>
                )}
              </>
            );

            const cardClasses = isYellowGlow
              ? "service-card-yellow-glow p-6 sm:p-8 flex flex-col justify-between group cursor-pointer block transition-all duration-300"
              : "clay-card-interactive p-6 sm:p-8 flex flex-col justify-between group hover:border-red-500/60 cursor-pointer block transition-all duration-300";

            if (cardHref) {
              return (
                <a key={index} href={cardHref} className={cardClasses}>
                  {cardContent}
                </a>
              );
            }

            return (
              <div key={index} className={cardClasses}>
                {cardContent}
              </div>
            );
          })}
        </div>

        {/* Optional Bottom Action Button */}
        {bottomAction && (
          <div className="mt-12 md:mt-16 text-center flex items-center justify-center">
            <Link
              href={bottomAction.href}
              className="clay-btn-primary group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-white font-bold text-sm uppercase tracking-wider cursor-pointer shadow-[0_0_25px_rgba(239,68,68,0.45)] hover:shadow-[0_0_35px_rgba(239,68,68,0.7)] hover:scale-105 transition-all"
            >
              <span>{bottomAction.text}</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeatureGrid;

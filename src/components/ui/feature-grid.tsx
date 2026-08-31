import React from "react";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Link } from "@/context/RouteContext";

export interface FeatureItem {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  points?: string[];
}

export interface FeatureGridProps {
  category?: string;
  title: string;
  subtitle?: string;
  features: FeatureItem[];
  columns?: 2 | 3 | 4;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  category = "Capabilities",
  title,
  subtitle,
  features,
  columns = 3,
}) => {
  const colClass =
    columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : columns === 4
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900/80">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
          {category && (
            <div className="clay-badge inline-flex items-center gap-2 px-4 py-2 text-red-300 text-xs font-semibold uppercase tracking-widest mb-4 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
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
            return (
              <div
                key={index}
                className="clay-card-interactive p-6 sm:p-8 flex flex-col justify-between group hover:border-red-500/50"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    {Icon ? (
                      <div className="clay-icon-well w-12 h-12 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-red-400" />
                      </div>
                    ) : (
                      <span className="font-mono text-xs font-bold text-red-400">0{index + 1}</span>
                    )}
                    {item.badge && (
                      <span className="clay-badge text-[10px] font-mono uppercase px-2.5 py-1 text-zinc-300">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 font-heading group-hover:text-red-200 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-zinc-300 text-sm font-light leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {item.points && item.points.length > 0 && (
                  <div className="pt-4 border-t border-white/10 space-y-2 mt-auto">
                    {item.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-xs text-zinc-300 font-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;

import React from "react";
import { ArrowUpRight, Sparkles, Link2 } from "lucide-react";
import { Link } from "@/context/RouteContext";

export interface InternalLinkItem {
  title: string;
  description: string;
  href: string;
  category?: string;
}

export const RelatedLinks: React.FC<{
  title?: string;
  subtitle?: string;
  links: InternalLinkItem[];
}> = ({
  title = "Explore Related Capabilities & Solutions",
  subtitle = "Discover how our digital engineering ecosystem connects to accelerate your business growth.",
  links,
}) => {
  return (
    <section className="relative w-full py-14 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900/80 bg-black/40">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="clay-badge inline-flex items-center gap-2 px-3.5 py-1.5 text-red-300 text-xs font-semibold uppercase tracking-widest mb-3 font-mono">
              <Link2 className="w-3.5 h-3.5 text-red-400" />
              Connected Ecosystem
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-heading">
              {title}
            </h2>
          </div>
          <p className="text-sm text-zinc-400 font-light max-w-md leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {links.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="clay-card-interactive p-6 flex flex-col justify-between group hover:border-red-500/50 block transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  {item.category ? (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-red-300">
                      {item.category}
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                      Related
                    </span>
                  )}
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <h3 className="text-base font-bold text-white font-heading group-hover:text-red-200 transition-colors mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-zinc-400 font-light line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-1.5 text-xs text-red-400 font-mono group-hover:translate-x-1 transition-transform">
                <span>View Details</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedLinks;

import React from "react";
import { 
  ArrowRight, 
  Play, 
  Target, 
  Crown, 
  Star,
  Hexagon,
  Triangle,
  Command,
  Ghost,
  Gem,
  Cpu
} from "lucide-react";

const CLIENTS = [
  { name: "Acme Corp", icon: Hexagon },
  { name: "Quantum", icon: Triangle },
  { name: "Command+Z", icon: Command },
  { name: "Phantom", icon: Ghost },
  { name: "Ruby", icon: Gem },
  { name: "Chipset", icon: Cpu },
];

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1 cursor-default">
    <span className="text-xl font-bold text-white sm:text-2xl">{value}</span>
    <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium sm:text-xs">{label}</span>
  </div>
);

export default function GlassmorphismTrustHero({
  onViewWorkClick,
  onShowreelClick
}: {
  onViewWorkClick?: () => void;
  onShowreelClick?: () => void;
}) {
  return (
    <section id="trust-hero" className="relative w-full bg-zinc-950 text-white overflow-hidden font-sans py-16 md:py-24 border-t border-zinc-900">
      {/* Background Image with Gradient Mask */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.15), transparent 70%)',
          maskImage: "linear-gradient(180deg, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage: "linear-gradient(180deg, transparent, black 20%, black 80%, transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            
            {/* Badge - Claymorphic Pill */}
            <div className="inline-flex items-center gap-2">
              <div className="clay-badge inline-flex items-center gap-2 px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-200 flex items-center gap-2 font-mono">
                  Enterprise-Grade Performance
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                </span>
              </div>
            </div>

            {/* Heading */}
            <h2 
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] font-heading drop-shadow-md text-white"
            >
              Crafting Digital<br />
              <span className="bg-gradient-to-br from-white via-red-100 to-amber-200 bg-clip-text text-transparent">
                Experiences
              </span><br />
              That Matter
            </h2>

            {/* Description */}
            <p className="max-w-xl text-base sm:text-lg text-zinc-300 leading-relaxed font-light">
              We design intelligent interfaces that balance clarity, functionality, and impact, creating experiences users love and businesses grow from in not more than 24 hours
            </p>

            {/* CTA Buttons with Claymorphic Tactile Physics */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else if (onViewWorkClick) onViewWorkClick();
                }}
                className="clay-btn-primary group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white transition-all cursor-pointer"
              >
                <span>View Services &amp; Capabilities</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={() => {
                  const el = document.getElementById('ai-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else if (onShowreelClick) onShowreelClick();
                }}
                className="clay-btn-secondary group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-white transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current text-red-400" />
                <span>Explore AI Workflows</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Stats Card - Claymorphic Card */}
            <div className="clay-card relative overflow-hidden p-8 sm:p-10">
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="clay-icon-well flex h-14 w-14 items-center justify-center flex-shrink-0">
                    <Target className="h-7 w-7 text-red-400" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold tracking-tight text-white font-heading">150+</div>
                    <div className="text-sm text-zinc-400">Projects Delivered</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Client Satisfaction</span>
                    <span className="text-white font-medium">98%</span>
                  </div>
                  <div className="clay-input h-3 w-full p-0.5 overflow-hidden">
                    <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-red-500 to-amber-300 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                  </div>
                </div>

                <div className="h-px w-full bg-white/10 mb-6" />

                {/* Mini Stats Grid */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <StatItem value="5+" label="Years" />
                  <div className="w-px h-full bg-white/10 mx-auto" />
                  <StatItem value="24/7" label="Support" />
                  <div className="w-px h-full bg-white/10 mx-auto" />
                  <StatItem value="100%" label="Quality" />
                </div>

                {/* Tag Pills */}
                <div className="mt-8 flex flex-wrap gap-2">
                  <div className="clay-badge inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[10px] font-medium tracking-wide text-emerald-300">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    ACTIVE
                  </div>
                  <div className="clay-badge inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[10px] font-medium tracking-wide text-yellow-300">
                    <Crown className="w-3 h-3 text-yellow-400" />
                    PREMIUM
                  </div>
                </div>
              </div>
            </div>

            {/* Marquee Card - Claymorphic Surface */}
            <div className="clay-card relative overflow-hidden py-6">
              <h3 className="mb-4 px-8 text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono">
                Trusted by Industry Leaders
              </h3>
              
              <div 
                className="relative flex overflow-hidden mask-fade"
              >
                <div className="animate-marquee flex gap-8 whitespace-nowrap px-4 py-2">
                  {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, i) => (
                    <div 
                      key={i}
                      className="clay-badge px-4 py-2 flex items-center gap-2.5 opacity-85 transition-all hover:opacity-100 hover:scale-105 cursor-default"
                    >
                      <client.icon className="h-4 w-4 text-red-400" />
                      <span className="text-sm font-bold text-zinc-200 tracking-tight font-heading">
                        {client.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

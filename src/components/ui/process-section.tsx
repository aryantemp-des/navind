import React from "react";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "@/context/RouteContext";

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverables?: string[];
}

export const ProcessSection: React.FC<{
  steps?: ProcessStep[];
  title?: string;
  subtitle?: string;
}> = ({
  title = "Our Engineering & Delivery Process",
  subtitle = "A structured, milestone-driven execution model ensuring flawless code quality, security, and velocity.",
  steps = [
    {
      number: "01",
      title: "Discovery & Architecture Blueprint",
      description: "We map business objectives, user flows, technical stack selection, and establish the data & security model.",
      deliverables: ["Technical spec sheet", "Wireframe system", "SEO roadmap"],
    },
    {
      number: "02",
      title: "UI/UX & High-Fidelity Prototyping",
      description: "Crafting bespoke interfaces, responsive grid layouts, custom typography scales, and tactile claymorphic interactions.",
      deliverables: ["Interactive design files", "Design token library", "Component specifications"],
    },
    {
      number: "03",
      title: "Full-Stack Development & 3D WebGL",
      description: "Building production React/Next.js components, high-performance WebGL shaders, and rigorous type-safe APIs.",
      deliverables: ["TypeScript codebase", "Optimized WebGL assets", "Zero-dependency utilities"],
    },
    {
      number: "04",
      title: "Quality Assurance & CWV Optimization",
      description: "Automated browser testing, Lighthouse score benchmarking, security vulnerability scan, and cross-device QA.",
      deliverables: ["Lighthouse 95+ report", "Cross-browser verification", "Security audit report"],
    },
    {
      number: "05",
      title: "Global Deployment & Handover",
      description: "Zero-downtime deployment to Vercel/AWS Edge CDN, full source code transfer, DNS configuration, and post-launch telemetry.",
      deliverables: ["Full GitHub repository", "Domain & SSL active", "Lifetime source ownership"],
    },
  ],
}) => {
  return (
    <section className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900/80">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <div className="clay-badge inline-flex items-center gap-2 px-4 py-2 text-red-300 text-xs font-semibold uppercase tracking-widest mb-4 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            Execution Standard
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading mb-4">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="clay-card-interactive p-6 sm:p-8 flex flex-col justify-between group hover:border-red-500/40 relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl sm:text-3xl font-black text-red-400">
                    {step.number}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-red-400 group-hover:scale-150 transition-transform" />
                </div>

                <h3 className="text-xl font-bold text-white font-heading group-hover:text-red-200 transition-colors">
                  {step.title}
                </h3>

                <p className="text-sm text-zinc-300 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>

              {step.deliverables && step.deliverables.length > 0 && (
                <div className="pt-6 border-t border-white/10 mt-6 space-y-2">
                  <div className="text-[11px] font-mono uppercase text-zinc-400 tracking-wider mb-2">
                    Key Outputs:
                  </div>
                  {step.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-zinc-300 font-light">
                      <CheckCircle2 className="w-3 h-3 text-red-400 shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;

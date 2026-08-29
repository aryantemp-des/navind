import React from "react";
import { motion } from "framer-motion";
import { Check, Zap, Sparkles, Shield, ArrowRight } from "lucide-react";

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`relative flex flex-col items-center justify-center bg-black text-slate-100 transition-colors overflow-hidden ${className}`}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Base blurred gradient */}
        <div className="absolute h-full w-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-red-900/30 via-amber-900/20 to-zinc-950 opacity-40 [filter:blur(100px)]"></div>

        {/* Animated blobs */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
          className="absolute bottom-0 left-[-10%] top-[-10%] h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(239,68,68,0.18),rgba(0,0,0,0))]"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
          className="absolute bottom-0 right-[-10%] top-[10%] h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(245,158,11,0.15),rgba(0,0,0,0))]"
        />
      </div>

      {children}
    </div>
  );
};

export const PricingSection: React.FC<{ onSelectPlan?: (plan: string) => void }> = ({ onSelectPlan }) => {
  const handleSelect = (plan: string) => {
    const el = document.getElementById('final-project');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (onSelectPlan) {
      onSelectPlan(plan);
    }
  };

  return (
    <section id="pricing" className="relative w-full bg-black/50 py-16 md:py-24 border-t border-zinc-900">
      <AuroraBackground className="w-full py-8">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <div className="clay-badge inline-flex items-center gap-2 px-4 py-2 text-red-300 text-xs font-semibold uppercase tracking-widest mb-6 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              Transparent Commercial Packages
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight font-heading mb-6"
            >
              Worried about payment?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto"
            >
              We have designed most affordable payment quotation keeping best reaources and services to serve
            </motion.p>
          </div>

          {/* Pricing Cards Grid with Claymorphic Tactile Surfaces */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* Package 1: Website Package */}
            <div className="clay-card-interactive p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Digital Experience</div>
                <h3 className="text-2xl font-bold text-white font-heading mb-4">Website Package</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-black text-white font-heading">$1,000</span>
                  <span className="text-zinc-400 text-xs font-mono">/ One-time lifetime access</span>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-8 font-light">
                  Complete modern digital presence built with Next.js, 3D WebGL interactions, and responsive design systems.
                </p>

                <ul className="space-y-3.5 mb-8">
                  {[
                    "Custom Next.js & React Architecture",
                    "3D WebGL & Spline Integration",
                    "Enterprise UI/UX Design System",
                    "SEO & Core Web Vitals Optimization",
                    "Full Source Code & Lifetime Ownership"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                      <div className="clay-icon-well-inset w-5 h-5 flex items-center justify-center rounded-full shrink-0">
                        <Check className="w-3 h-3 text-red-400" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleSelect('Website Package')}
                className="clay-btn-secondary w-full py-4 px-6 rounded-full text-white font-semibold text-sm tracking-wider uppercase cursor-pointer text-center"
              >
                Choose Website Package
              </button>
            </div>

            {/* Package 3: Both Packages Together (Featured in Center) */}
            <div className="clay-card-interactive relative p-8 sm:p-10 flex flex-col justify-between lg:-translate-y-4 border-2 border-red-500/70 shadow-[0_20px_50px_rgba(239,68,68,0.35)]">
              <div className="clay-badge absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 text-white font-mono text-xs font-bold uppercase tracking-wider bg-red-600 border-red-400">
                Best Value — Save $500
              </div>

              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-red-300 mb-2">Complete Ecosystem</div>
                <h3 className="text-2xl font-bold text-white font-heading mb-4">Both Packages Together</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-black text-white font-heading">$1,500</span>
                  <span className="text-zinc-400 text-xs font-mono">/ One-time lifetime access</span>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-8 font-light">
                  The complete Navya technology powerhouse: enterprise web experience unified with intelligent autonomous AI workflows.
                </p>

                <ul className="space-y-3.5 mb-8">
                  {[
                    "Complete Website Package Included ($1,000 value)",
                    "Complete AI Agents & Automation ($1,000 value)",
                    "Unified CRM, Database & Lead Sync",
                    "Priority Architecture & Deployment",
                    "Direct WhatsApp & Phone Engineering Channel",
                    "Full Lifetime Commercial Rights"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white">
                      <div className="clay-icon-well-inset w-5 h-5 flex items-center justify-center rounded-full shrink-0">
                        <Zap className="w-3 h-3 text-amber-400" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleSelect('Both Packages Together')}
                className="clay-btn-primary w-full py-4 px-6 rounded-full text-white font-bold text-sm tracking-wider uppercase cursor-pointer text-center flex items-center justify-center gap-2"
              >
                <span>Get Complete Ecosystem ($1,500)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Package 2: AI Agents & Automation */}
            <div className="clay-card-interactive p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">Intelligent Systems</div>
                <h3 className="text-2xl font-bold text-white font-heading mb-4">AI Agents &amp; Automation</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-black text-white font-heading">$1,000</span>
                  <span className="text-zinc-400 text-xs font-mono">/ One-time lifetime access</span>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-8 font-light">
                  Autonomous agents and agentic workflows to eliminate manual work, automate lead response, and connect internal databases.
                </p>

                <ul className="space-y-3.5 mb-8">
                  {[
                    "Custom Multi-Agent Orchestrator",
                    "Automated Lead Qualification & Routing",
                    "CRM, Email, & WhatsApp Tool Integrations",
                    "Automated Business Reporting",
                    "Human-in-the-Loop Safeguards"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                      <div className="clay-icon-well-inset w-5 h-5 flex items-center justify-center rounded-full shrink-0">
                        <Check className="w-3 h-3 text-amber-400" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleSelect('AI Agents & Automation')}
                className="clay-btn-secondary w-full py-4 px-6 rounded-full text-white font-semibold text-sm tracking-wider uppercase cursor-pointer text-center"
              >
                Choose AI Automation
              </button>
            </div>

          </div>

          {/* Ongoing Support & Maintenance Note */}
          <div className="clay-card mt-12 text-center max-w-2xl mx-auto p-6 rounded-2xl">
            <div className="flex items-center justify-center gap-2 text-zinc-200 text-sm mb-1 font-medium">
              <Shield className="w-4 h-4 text-red-400" />
              <span>Ongoing Maintenance &amp; Customization</span>
            </div>
            <p className="text-xs text-zinc-400 font-light">
              All packages include one-time lifetime access. Ongoing maintenance, customizations, or feature expansions after launch are billed simply at <span className="text-white font-semibold">$50 per request or service</span>.
            </p>
          </div>

        </div>
      </AuroraBackground>
    </section>
  );
};

export default AuroraBackground;

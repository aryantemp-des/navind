import React from "react";
import { motion } from "framer-motion";
import {
  Check,
  Sparkles,
  ArrowRight,
  Clock,
  Layers,
  UserCheck,
  Building2,
  Info
} from "lucide-react";

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

export const PricingSection: React.FC<{ onSelectPlan?: (plan: string) => void }> = () => {
  return (
    <section id="pricing" className="relative w-full bg-black/50 py-16 md:py-24 border-t border-zinc-900">
      <AuroraBackground className="w-full py-8">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <div className="clay-badge inline-flex items-center gap-2 px-4 py-2 text-red-300 text-xs font-semibold uppercase tracking-widest mb-6 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              Tailored Quotations &amp; Flexibility
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight font-heading mb-6"
            >
              Get a Pocket-Friendly Quote for Your Business
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto"
            >
              Every business has different requirements. Choose the services you need, discuss your goals with our decision-makers, and get a customized quotation designed around your budget and business objectives.
            </motion.p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/pricing"
                className="clay-btn-primary group w-full sm:w-auto py-4 px-8 rounded-full text-white font-bold text-sm uppercase tracking-wider cursor-pointer text-center flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(239,68,68,0.5)] hover:shadow-[0_0_35px_rgba(239,68,68,0.75)] hover:scale-[1.02] transition-all"
              >
                <span>Get My Custom Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/pricing#consult-decision-makers"
                className="clay-btn-secondary group w-full sm:w-auto py-4 px-8 rounded-full text-zinc-200 hover:text-white font-medium text-sm tracking-wide cursor-pointer text-center flex items-center justify-center gap-2 border border-white/10 hover:border-red-500/40 transition-all"
              >
                <UserCheck className="w-4 h-4 text-red-400" />
                <span>Talk to Our Decision Makers</span>
              </a>
            </div>
          </div>

          {/* Four-Step Visual Quotation Process Overview */}
          <div className="mb-14">
            <div className="text-center mb-8">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400">
                OUR PERSONALIZED FOUR-STEP APPROACH
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-heading mt-1">
                How Your Custom Quote is Created
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="clay-card-interactive p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-red-400">STEP 01</span>
                    <Building2 className="w-4 h-4 text-zinc-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white font-heading mb-2">
                    Choose Your Services
                  </h4>
                  <p className="text-xs text-zinc-300 font-light leading-relaxed mb-4">
                    Choose from Website Solutions (Web Dev, Ecommerce, Redesign, Web Apps) or Internet Marketing (Bundle, SEO, GEO).
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-zinc-400">
                  Multiple selections supported
                </div>
              </div>

              {/* Step 2 */}
              <div className="clay-card-interactive p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-red-400">STEP 02</span>
                    <Layers className="w-4 h-4 text-zinc-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white font-heading mb-2">
                    Tell Us About Your Business
                  </h4>
                  <p className="text-xs text-zinc-300 font-light leading-relaxed mb-4">
                    Outline your industry, requirements, timeline, and budget preferences in a simple, mobile-friendly format.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-zinc-400">
                  Tailored to your budget
                </div>
              </div>

              {/* Step 3 */}
              <div className="clay-card-interactive p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-red-400">STEP 03</span>
                    <UserCheck className="w-4 h-4 text-red-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white font-heading mb-2">
                    Consult with Decision-Makers
                  </h4>
                  <p className="text-xs text-zinc-300 font-light leading-relaxed mb-4">
                    Discuss your goals directly with our leadership team to identify suitable solutions and clarify project milestones.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-zinc-400">
                  Direct senior consultation
                </div>
              </div>

              {/* Step 4 */}
              <div className="clay-card-interactive p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-red-400">STEP 04</span>
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white font-heading mb-2">
                    Receive Your Custom Quote
                  </h4>
                  <p className="text-xs text-zinc-300 font-light leading-relaxed mb-4">
                    Get an itemized proposal with confirmed deliverables, roadmap, and milestone billing tailored to your scope.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-emerald-400">
                  Pocket-friendly &amp; transparent
                </div>
              </div>
            </div>
          </div>

          {/* Last Month's Average Pricing Highlight Card */}
          <div className="max-w-4xl mx-auto mb-10">
            <div className="clay-card-interactive p-6 sm:p-10 relative overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.1)]">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="clay-badge inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-amber-300 border-amber-500/30">
                    <Clock className="w-3 h-3 text-amber-400" />
                    Previous Month's Average
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black text-white font-heading">
                    What Businesses Invested Last Month
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 font-light">
                    Last month's average pricing for Internet Marketing services at Navya Tech Industry.
                  </p>
                </div>

                <div className="flex flex-col items-start md:items-end justify-center shrink-0 p-5 rounded-xl bg-black/60 border border-amber-500/30">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                    Average Investment
                  </span>
                  <span className="text-4xl sm:text-5xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">
                    $2,500
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 mt-0.5">
                    Historical Benchmark
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-start gap-2.5">
                <Info className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                  Actual pricing varies depending on service requirements, project scope, competition, deliverables, and business objectives. Contact our team for a personalized quotation.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Quotation Link Action */}
          <div className="text-center">
            <a
              href="/pricing"
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-300 hover:text-white transition-colors underline underline-offset-4 decoration-red-500/60 hover:decoration-red-400"
            >
              <span>Launch the Full Interactive Quotation Wizard on our Pricing Page</span>
              <ArrowRight className="w-3.5 h-3.5 text-red-400" />
            </a>
          </div>
        </div>
      </AuroraBackground>
    </section>
  );
};

export default AuroraBackground;

import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  ShieldCheck,
  Globe2,
  Building2,
  Cpu,
  Sparkles,
} from "lucide-react";
import { FOUNDER_CONFIG } from "@/config/founder";
import {
  calculateDynamicGrowthDays,
  getMsUntilNextGrowthDay,
} from "@/config/growth-counter";

export const VerifiedExecutionTrackRecord: React.FC = () => {
  // Dynamic Day Counter (Asia/Kolkata IST Anchor Engine)
  const [growthDays, setGrowthDays] = useState<number>(() =>
    calculateDynamicGrowthDays()
  );

  useEffect(() => {
    // Initial evaluation
    setGrowthDays(calculateDynamicGrowthDays());

    // Schedule lightweight trigger when next 24-hour interval completes in Asia/Kolkata
    let timerId: NodeJS.Timeout | null = null;
    const scheduleNextTick = () => {
      const msUntilNext = getMsUntilNextGrowthDay();
      timerId = setTimeout(() => {
        setGrowthDays(calculateDynamicGrowthDays());
        scheduleNextTick();
      }, msUntilNext);
    };

    scheduleNextTick();

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  return (
    <div id="verified-track-record" className="w-full text-zinc-100 selection:bg-red-500/30">
      {/* =================================================================== */}
      {/* A. VERIFIED EXECUTION TRACK RECORD & DYNAMIC DURATION COUNTER       */}
      {/* =================================================================== */}
      <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Main Headline & Context */}
          <div className="text-center space-y-3">
            <div className="clay-badge inline-flex items-center gap-2 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-red-300">
              <TrendingUp className="w-3.5 h-3.5 text-red-400" />
              Verified Execution Track Record
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white font-heading tracking-tight">
              18 Businesses Supported with Organic Growth in{" "}
              <span className="text-red-500 underline decoration-red-500/40 decoration-wavy decoration-2">
                {growthDays} Days
              </span>
            </h2>

            <p className="text-sm sm:text-base font-mono text-zinc-400">
              Organic Growth &amp; Digital Presence Development
            </p>
          </div>

          {/* Interactive Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Total Businesses */}
            <div className="clay-card p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-white/10 hover:border-red-500/40 transition-all text-center space-y-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                Total Businesses Supported
              </span>
              <div className="text-5xl sm:text-6xl font-black text-white font-heading tracking-tight">
                18
              </div>
              <p className="text-xs text-zinc-400 font-light">
                Enterprise, SME &amp; high-growth venture engagements
              </p>
            </div>

            {/* Card 2: Dynamic Duration Counter (IST Engine) */}
            <div className="clay-card p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-950 to-red-950/30 border border-red-500/40 text-center space-y-2 relative overflow-hidden">
              <div className="absolute top-2 right-3">
                <span className="text-[10px] font-mono text-red-400 uppercase px-2 py-0.5 rounded-full bg-red-950/80 border border-red-500/30">
                  IST Engine
                </span>
              </div>
              <span className="text-xs font-mono text-red-300 uppercase tracking-wider block">
                Dynamic Duration Counter
              </span>
              <div className="text-5xl sm:text-6xl font-black text-red-400 font-heading tracking-tight">
                {growthDays}
                <span className="text-2xl text-zinc-400 ml-1 font-mono">Days</span>
              </div>
              <p className="text-xs text-zinc-300 font-light">
                Active campaign duration incrementing every completed 24-hr interval
              </p>
            </div>

            {/* Card 3: Organic Visibility Channels */}
            <div className="clay-card p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-white/10 hover:border-white/20 transition-all text-center space-y-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                Organic Visibility Channels
              </span>
              <div className="text-3xl sm:text-4xl font-bold text-white font-heading pt-2">
                SEO + GEO + AEO
              </div>
              <p className="text-xs text-zinc-400 font-light pt-1">
                Generative AI engine indexing &amp; high-intent organic rankings
              </p>
            </div>
          </div>

          {/* Campaign baseline verification note */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Baseline Campaign Metric: Verified client engagements across domestic &amp; global markets.
              </span>
            </div>
            <span className="text-[11px] text-zinc-500">
              Authority Timezone: Asia/Kolkata (IST)
            </span>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* B. GEOGRAPHICAL PORTFOLIO BREAKDOWN (18: 11 Intl, 7 Indian)        */}
      {/* =================================================================== */}
      <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-black/60">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-red-400 block font-bold">
              Geographical Portfolio Breakdown
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white font-heading">
              Cross-Border Footprint: 18 Businesses
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              Demonstrated capability serving both rigorous international markets and domestic enterprises
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* International Businesses Card */}
            <div className="clay-card p-6 sm:p-8 rounded-3xl bg-zinc-950/70 border border-sky-500/30 hover:border-sky-500/60 transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-sky-950/50 border border-sky-500/40 flex items-center justify-center text-sky-400">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white font-heading">
                      International Businesses
                    </h4>
                    <span className="text-xs font-mono text-sky-400">
                      Global Client Engagements
                    </span>
                  </div>
                </div>
                <div className="text-4xl font-black text-sky-400 font-heading">
                  11
                </div>
              </div>

              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                Strategic digital presence, web applications, and generative engine optimization engineered for clients across the United States, United Kingdom, Norway, Singapore, and APAC regions.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-zinc-400">
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">United States</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">United Kingdom</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">Norway / EU</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">Singapore</span>
              </div>
            </div>

            {/* Indian Businesses Card */}
            <div className="clay-card p-6 sm:p-8 rounded-3xl bg-zinc-950/70 border border-amber-500/30 hover:border-amber-500/60 transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-950/50 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white font-heading">
                      Indian Businesses
                    </h4>
                    <span className="text-xs font-mono text-amber-400">
                      Domestic Market Enterprises
                    </span>
                  </div>
                </div>
                <div className="text-4xl font-black text-amber-400 font-heading">
                  7
                </div>
              </div>

              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                High-performance custom websites, local search dominance, and intelligent workflow automation built for Indian clinical networks, professional advisory practices, and high-growth retail brands.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-zinc-400">
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">Delhi NCR</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">Mumbai</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">Bengaluru</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">Pan-India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* C. CORE EXPERTISE & EXECUTION                                       */}
      {/* =================================================================== */}
      <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-red-400 block font-bold">
              Core Expertise &amp; Execution
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white font-heading">
              Engineering Disciplines &amp; Strategic Solutions
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              Three core execution pillars delivering organic growth, high-performance web engineering, and intelligent automation
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1: Digital Growth & Internet Marketing */}
            <div className="clay-card p-6 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-red-950/40 border border-red-500/30 flex items-center justify-center text-red-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white font-heading">
                {FOUNDER_CONFIG.expertise.digitalGrowth.title}
              </h4>
              <ul className="space-y-2 text-xs text-zinc-300 font-light">
                {FOUNDER_CONFIG.expertise.digitalGrowth.skills.map((skill, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1 shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pillar 2: Website Development */}
            <div className="clay-card p-6 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white font-heading">
                {FOUNDER_CONFIG.expertise.websiteDevelopment.title}
              </h4>
              <ul className="space-y-2 text-xs text-zinc-300 font-light">
                {FOUNDER_CONFIG.expertise.websiteDevelopment.skills.map((skill, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1 shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pillar 3: AI & Business Automation */}
            <div className="clay-card p-6 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white font-heading">
                {FOUNDER_CONFIG.expertise.aiAutomation.title}
              </h4>
              <ul className="space-y-2 text-xs text-zinc-300 font-light">
                {FOUNDER_CONFIG.expertise.aiAutomation.skills.map((skill, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VerifiedExecutionTrackRecord;

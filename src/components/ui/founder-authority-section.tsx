import React, { useState, useEffect } from "react";
import {
  Phone,
  MessageSquare,
  Mail,
  Linkedin,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  User,
  ExternalLink,
  Globe2,
  TrendingUp,
  Cpu,
  Building2
} from "lucide-react";
import { FOUNDER_CONFIG } from "@/config/founder";
import { calculateDynamicGrowthDays, getMsUntilNextGrowthDay } from "@/config/growth-counter";

export interface FounderAuthoritySectionProps {
  onOpenAdminModal?: () => void;
}

export const FounderAuthoritySection: React.FC<FounderAuthoritySectionProps> = () => {
  // 1. Dynamic Day Counter (Asia/Kolkata IST Anchor Engine)
  const [growthDays, setGrowthDays] = useState<number>(() => calculateDynamicGrowthDays());

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
    <div className="w-full text-zinc-100 selection:bg-red-500/30">
      {/* =================================================================== */}
      {/* 1. MAIN CONTACT HERO                                                */}
      {/* =================================================================== */}
      <section className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient background radiance */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-5">
          <div className="clay-badge inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-red-300 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            Executive Leadership &amp; Direct Accessibility
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-heading leading-tight">
            {FOUNDER_CONFIG.heading}
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed">
            {FOUNDER_CONFIG.subheading}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Verified Direct Line
            </span>
            <span>•</span>
            <span>No Account Managers</span>
            <span>•</span>
            <span>Technical Decision-Maker Consultation</span>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 2. FEATURED FOUNDER PROFILE & 3. FOUNDER INTRODUCTION               */}
      {/* =================================================================== */}
      <section className="relative w-full py-8 md:py-12 px-4 sm:px-6 lg:px-8 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto">
          <div className="clay-card-interactive p-6 sm:p-10 md:p-12 relative overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900/90 to-black border border-red-500/30 rounded-3xl shadow-[0_0_50px_rgba(239,68,68,0.12)]">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
              {/* Reserved Photo Area (Clean, Elegant Placeholder) */}
              <div className="md:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left space-y-4">
                <div className="relative group">
                  <div className="w-48 h-60 sm:w-52 sm:h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border-2 border-red-500/40 p-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.85)] flex flex-col items-center justify-center">
                    {FOUNDER_CONFIG.photoSrc ? (
                      <img
                        src={FOUNDER_CONFIG.photoSrc}
                        alt={`${FOUNDER_CONFIG.name} - ${FOUNDER_CONFIG.designation}`}
                        className="w-full h-full object-cover rounded-xl"
                        loading="lazy"
                      />
                    ) : (
                      /* Clean portrait presentation with subtle borders and styling */
                      <div className="w-full h-full rounded-xl bg-zinc-900/90 border border-white/5 flex flex-col items-center justify-between p-5 text-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600/30 via-red-950/50 to-black border border-red-500/50 flex items-center justify-center shadow-inner">
                          <span className="font-heading font-black text-white text-xl tracking-wider">
                            AS
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="w-6 h-6 mx-auto text-zinc-500">
                            <User className="w-full h-full stroke-[1.5]" />
                          </div>
                          <span className="text-xs font-mono uppercase tracking-widest text-zinc-200 block font-bold">
                            {FOUNDER_CONFIG.name}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400 block">
                            Founder Photograph Area
                          </span>
                        </div>
                        <div className="text-[9px] font-mono text-red-400 uppercase tracking-widest border border-red-500/30 px-2 py-0.5 rounded-full bg-red-950/40">
                          Reserved Placeholder
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Verified Founder Badge */}
                  <div className="absolute -bottom-3 -right-2 clay-badge px-3 py-1 text-xs font-mono uppercase bg-black/95 border border-emerald-500/60 text-emerald-300 flex items-center gap-1.5 shadow-xl">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Verified Founder</span>
                  </div>
                </div>

                <div className="text-center sm:text-left pt-2 space-y-1">
                  <div className="text-xs font-mono text-zinc-400">
                    Location: <strong className="text-zinc-200">{FOUNDER_CONFIG.location}</strong>
                  </div>
                  <div className="text-xs font-mono text-zinc-400">
                    Company: <strong className="text-zinc-200">{FOUNDER_CONFIG.company}</strong>
                  </div>
                </div>
              </div>

              {/* Founder Header, Titles & Executive Introduction */}
              <div className="md:col-span-7 space-y-5">
                <div className="space-y-2">
                  <div className="clay-badge inline-flex items-center gap-2 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-red-300 border-red-500/30">
                    <span>Official Profile</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black text-white font-heading tracking-tight">
                    {FOUNDER_CONFIG.name}
                  </h2>
                  <p className="text-sm sm:text-base font-mono text-red-400 font-medium">
                    {FOUNDER_CONFIG.designation}
                  </p>
                </div>

                {/* Executive Introduction */}
                <div className="space-y-3 text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                  <p>{FOUNDER_CONFIG.executiveIntro}</p>
                </div>

                {/* Personal Intro Quote */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 relative">
                  <span className="text-3xl text-red-500/20 font-serif absolute top-1 left-3 select-none pointer-events-none">
                    “
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed pl-4 italic">
                    {FOUNDER_CONFIG.personalIntro}
                  </p>
                </div>

                {/* Direct LinkedIn Profile Connection */}
                <div>
                  <a
                    href={FOUNDER_CONFIG.linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="clay-btn-secondary inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-mono text-zinc-200 hover:text-white border border-sky-500/40 hover:border-sky-500/80 hover:bg-sky-950/30 transition-all cursor-pointer group"
                  >
                    <Linkedin className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform shrink-0" />
                    <span>{FOUNDER_CONFIG.linkedin.label}</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-sky-300 transition-colors" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 4. BUSINESS ACHIEVEMENT HIGHLIGHT & 5. DYNAMIC 43-DAY COUNTER       */}
      {/* =================================================================== */}
      <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Main Headline & Context */}
          <div className="text-center space-y-3">
            <div className="clay-badge inline-flex items-center gap-2 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-red-300">
              <TrendingUp className="w-3.5 h-3.5 text-red-400" />
              Verified Execution Track Record
            </div>
            
            <h3 className="text-3xl sm:text-5xl font-black text-white font-heading tracking-tight">
              18 Businesses Supported with Organic Growth in{" "}
              <span className="text-red-500 underline decoration-red-500/40 decoration-wavy decoration-2">
                {growthDays} Days
              </span>
            </h3>
            
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

            {/* Card 3: Organic Methodologies */}
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
      {/* 6. BUSINESS PORTFOLIO STATISTICS (18: 11 Intl, 7 Indian)           */}
      {/* =================================================================== */}
      <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-black/60">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-red-400 block font-bold">
              06. Geographical Portfolio Breakdown
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white font-heading">
              Cross-Border Footprint: 18 Businesses
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              Demonstrated capability serving both rigorous international markets and domestic enterprises
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* International Card */}
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
      {/* 7. CORE EXPERTISE & TECHNICAL SPECIALIZATION                        */}
      {/* =================================================================== */}
      <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-red-400 block font-bold">
              07. Core Expertise &amp; Execution
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

      {/* =================================================================== */}
      {/* 8. DIRECT FOUNDER CONTACT INFORMATION                               */}
      {/* =================================================================== */}
      <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-red-400 block font-bold">
              08. Verified Direct Communication
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white font-heading">
              Direct Contact Channels
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              Connect directly with Aryan Singh across any of these verified communication channels
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone Call */}
            <a
              href={FOUNDER_CONFIG.phone.link}
              className="p-5 rounded-2xl bg-zinc-950 border border-white/10 hover:border-red-500/60 hover:bg-red-950/20 transition-all flex items-center justify-between group cursor-pointer"
              aria-label={`${FOUNDER_CONFIG.phone.label}: ${FOUNDER_CONFIG.phone.display}`}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-red-950/50 border border-red-500/40 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                    Direct Phone Line
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white font-heading">
                    {FOUNDER_CONFIG.phone.display}
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-red-400 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* WhatsApp */}
            <a
              href={FOUNDER_CONFIG.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-zinc-950 border border-white/10 hover:border-emerald-500/60 hover:bg-emerald-950/20 transition-all flex items-center justify-between group cursor-pointer"
              aria-label={`${FOUNDER_CONFIG.whatsapp.label}: ${FOUNDER_CONFIG.whatsapp.display}`}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/50 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                    WhatsApp Direct
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white font-heading">
                    {FOUNDER_CONFIG.whatsapp.display}
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Email */}
            <a
              href={FOUNDER_CONFIG.email.link}
              className="p-5 rounded-2xl bg-zinc-950 border border-white/10 hover:border-amber-500/60 hover:bg-amber-950/20 transition-all flex items-center justify-between group cursor-pointer"
              aria-label={`${FOUNDER_CONFIG.email.label}: ${FOUNDER_CONFIG.email.address}`}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-950/50 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                    Official Business Email
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white font-mono break-all">
                    {FOUNDER_CONFIG.email.address}
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* LinkedIn */}
            <a
              href={FOUNDER_CONFIG.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-zinc-950 border border-white/10 hover:border-sky-500/60 hover:bg-sky-950/20 transition-all flex items-center justify-between group cursor-pointer"
              aria-label={`${FOUNDER_CONFIG.linkedin.label}: LinkedIn Profile`}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-950/50 border border-sky-500/40 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform shrink-0">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                    Executive Profile
                  </span>
                  <span className="text-sm font-bold text-white font-heading">
                    {FOUNDER_CONFIG.linkedin.label}
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-sky-400 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 9. PROJECT ENQUIRY / CUSTOM QUOTE CTA                               */}
      {/* =================================================================== */}
      <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="clay-card p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-red-950/30 border border-red-500/40 text-center space-y-6 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
            <div className="clay-badge inline-flex items-center gap-2 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-red-300">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              09. Discuss Your Project
            </div>

            <h3 className="text-3xl sm:text-5xl font-black text-white font-heading">
              Ready to Strengthen Your Digital Presence?
            </h3>

            <p className="text-sm sm:text-base text-zinc-300 font-light max-w-xl mx-auto leading-relaxed">
              Every business has unique requirements. Choose the services you need, discuss your goals with our founder, and get a customized quotation designed around your budget.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
              <a
                href="/pricing"
                className="clay-btn-primary group w-full sm:w-auto py-3.5 sm:py-4 px-5 sm:px-8 rounded-full text-white font-bold text-xs uppercase tracking-wider cursor-pointer inline-flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(239,68,68,0.5)] min-h-[48px] text-center"
              >
                <span>Discuss Project &amp; Get Custom Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={FOUNDER_CONFIG.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-btn-secondary w-full sm:w-auto py-3.5 sm:py-4 px-5 sm:px-8 rounded-full text-zinc-200 hover:text-white font-medium text-xs tracking-wider inline-flex items-center justify-center gap-2 border border-white/10 hover:border-emerald-500/50 min-h-[48px] text-center"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Talk to Founder on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FounderAuthoritySection;
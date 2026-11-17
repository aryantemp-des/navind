import React from "react";
import {
  Phone,
  MessageSquare,
  Mail,
  Linkedin,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  User,
  ExternalLink
} from "lucide-react";
import { FOUNDER_CONFIG } from "@/config/founder";

export interface FounderContactSectionProps {
  id?: string;
  variant?: "full" | "card" | "embedded";
  heading?: string;
  subheading?: string;
  className?: string;
  showEnquiryCta?: boolean;
}

export const FounderContactSection: React.FC<FounderContactSectionProps> = ({
  id = "founder-contact",
  variant = "full",
  heading = FOUNDER_CONFIG.heading,
  subheading = FOUNDER_CONFIG.subheading,
  className = "",
  showEnquiryCta = true,
}) => {
  const isCard = variant === "card" || variant === "embedded";

  return (
    <section
      id={id}
      className={`relative w-full ${isCard ? "py-4" : "py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900/80"} ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading & Context */}
        {!isCard && (
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <div className="clay-badge inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-red-300 font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              Direct Accessibility &amp; Trust
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading">
              {heading}
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 font-light mt-3 leading-relaxed">
              {subheading}
            </p>
          </div>
        )}

        {/* Main Founder Card Container */}
        <div className="clay-card-interactive p-6 sm:p-10 md:p-12 relative overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900/90 to-black border border-red-500/30 rounded-3xl shadow-[0_0_40px_rgba(239,68,68,0.12)]">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* ========================================================= */}
            {/* LEFT SECTION: FOUNDER PROFILE & PERSONAL INTRO            */}
            {/* ========================================================= */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {/* Reserved Photograph Area (Clean Elegant Placeholder) */}
                <div className="relative shrink-0">
                  <div className="w-36 h-44 sm:w-40 sm:h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border-2 border-red-500/30 p-1 shadow-[0_10px_25px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center text-center group transition-all duration-300 hover:border-red-500/60">
                    {FOUNDER_CONFIG.photoSrc ? (
                      <img
                        src={FOUNDER_CONFIG.photoSrc}
                        alt={`${FOUNDER_CONFIG.name} - ${FOUNDER_CONFIG.designation}`}
                        className="w-full h-full object-cover rounded-xl"
                        loading="lazy"
                      />
                    ) : (
                      /* Clean Portrait Placeholder — No AI faces, no stock portraits */
                      <div className="w-full h-full rounded-xl bg-zinc-900/80 border border-white/5 flex flex-col items-center justify-between p-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600/30 via-red-950/40 to-black border border-red-500/40 flex items-center justify-center shadow-inner">
                          <span className="font-heading font-black text-white text-base tracking-wider">
                            AS
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="w-6 h-6 mx-auto text-zinc-500">
                            <User className="w-full h-full stroke-[1.5]" />
                          </div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block font-semibold">
                            Aryan Singh
                          </span>
                          <span className="text-[9px] font-mono text-zinc-500 block">
                            Photo Area Reserved
                          </span>
                        </div>
                        <div className="text-[8px] font-mono text-red-400/80 uppercase tracking-widest">
                          Official Profile
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Verification Badge */}
                  <div className="absolute -bottom-2 -right-2 clay-badge px-2.5 py-1 text-[10px] font-mono uppercase bg-black/90 border border-emerald-500/50 text-emerald-300 flex items-center gap-1 shadow-md">
                    <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>Founder</span>
                  </div>
                </div>

                {/* Name, Title & Status */}
                <div className="space-y-1.5">
                  <div className="clay-badge inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-red-300 border-red-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Direct Channel Open
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-heading tracking-tight">
                    {FOUNDER_CONFIG.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-zinc-400">
                    {FOUNDER_CONFIG.designation}
                  </p>
                  <p className="text-[11px] text-zinc-500 font-mono pt-1">
                    Direct executive contact for prospective clients &amp; partners
                  </p>
                </div>
              </div>

              {/* Personal Introduction Quote */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 relative">
                <div className="text-2xl text-red-500/30 font-serif absolute top-2 left-3 select-none pointer-events-none">
                  “
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed pl-3 italic">
                  {FOUNDER_CONFIG.personalIntro}
                </p>
              </div>

              {/* LinkedIn CTA */}
              <div>
                <a
                  href={FOUNDER_CONFIG.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clay-btn-secondary inline-flex items-center gap-2.5 px-5 py-3 rounded-full text-xs font-mono font-medium text-zinc-200 hover:text-white border border-sky-500/30 hover:border-sky-500/60 hover:bg-sky-950/20 transition-all cursor-pointer group"
                  aria-label={`${FOUNDER_CONFIG.linkedin.label} on LinkedIn`}
                >
                  <Linkedin className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform shrink-0" />
                  <span>{FOUNDER_CONFIG.linkedin.label}</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-sky-300 transition-colors" />
                </a>
              </div>
            </div>

            {/* ========================================================= */}
            {/* RIGHT SECTION: DIRECT VERIFIED CONTACT INFORMATION       */}
            {/* ========================================================= */}
            <div className="lg:col-span-6 space-y-4">
              <div className="pb-2 border-b border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400">
                  DIRECT CONTACT CHANNELS
                </span>
                <span className="text-[11px] font-mono text-zinc-400">
                  Verified Executive Line
                </span>
              </div>

              {/* Action 1: Direct Phone Call */}
              <a
                href={FOUNDER_CONFIG.phone.link}
                className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/10 hover:border-red-500/60 hover:bg-red-950/20 transition-all flex items-center justify-between group cursor-pointer block"
                aria-label={`${FOUNDER_CONFIG.phone.label}: ${FOUNDER_CONFIG.phone.display}`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-red-950/50 border border-red-500/40 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-zinc-400 block">
                      Direct Calling Phone
                    </span>
                    <span className="text-sm sm:text-base font-bold text-white font-heading">
                      {FOUNDER_CONFIG.phone.display}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-red-400 group-hover:translate-x-1 transition-transform">
                  <span className="hidden sm:inline">{FOUNDER_CONFIG.phone.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </a>

              {/* Action 2: WhatsApp Direct */}
              <a
                href={FOUNDER_CONFIG.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/10 hover:border-emerald-500/60 hover:bg-emerald-950/20 transition-all flex items-center justify-between group cursor-pointer block"
                aria-label={`${FOUNDER_CONFIG.whatsapp.label}: ${FOUNDER_CONFIG.whatsapp.display}`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950/50 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-zinc-400 block">
                      WhatsApp Direct
                    </span>
                    <span className="text-sm sm:text-base font-bold text-white font-heading">
                      {FOUNDER_CONFIG.whatsapp.display}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span className="hidden sm:inline">{FOUNDER_CONFIG.whatsapp.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </a>

              {/* Action 3: Business Email */}
              <a
                href={FOUNDER_CONFIG.email.link}
                className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/10 hover:border-amber-500/60 hover:bg-amber-950/20 transition-all flex items-center justify-between group cursor-pointer block"
                aria-label={`${FOUNDER_CONFIG.email.label}: ${FOUNDER_CONFIG.email.address}`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-950/50 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-zinc-400 block">
                      Official Business Email
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white font-mono break-all">
                      {FOUNDER_CONFIG.email.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span className="hidden sm:inline">{FOUNDER_CONFIG.email.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </a>

              {/* Action 4: Project Enquiry CTA */}
              {showEnquiryCta && (
                <div className="pt-2">
                  <a
                    href="/pricing"
                    className="clay-btn-primary group w-full py-4 px-6 rounded-2xl text-white font-bold text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(239,68,68,0.45)] hover:shadow-[0_0_35px_rgba(239,68,68,0.7)]"
                  >
                    <span>Start Project Enquiry &amp; Get a Custom Quote</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderContactSection;

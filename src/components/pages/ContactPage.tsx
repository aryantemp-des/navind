import React, { useState } from "react";
import {
  Phone,
  MessageSquare,
  Mail,
  User,
  Clock,
  CheckCircle2,
  HelpCircle
} from "lucide-react";
import SubpageLayout from "@/components/layout/SubpageLayout";
import SEOHead from "@/components/seo/SEOHead";
import { FOUNDER_CONFIG } from "@/config/founder";
import FounderAuthoritySection from "@/components/ui/founder-authority-section";

export const ContactPage: React.FC = () => {
  const [inquirerName, setInquirerName] = useState("");
  const [inquirerBusiness, setInquirerBusiness] = useState("");
  const [inquirerPhone, setInquirerPhone] = useState("");
  const [projectTopic, setProjectTopic] = useState("");
  const [dispatchedVia, setDispatchedVia] = useState<"whatsapp" | "email" | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!inquirerName.trim()) {
      errs.inquirerName = "Please enter your name.";
    }
    if (!inquirerPhone.trim() || inquirerPhone.trim().length < 7) {
      errs.inquirerPhone = "Please enter a valid phone or WhatsApp number.";
    }
    if (!projectTopic.trim()) {
      errs.projectTopic = "Please briefly describe your project or enquiry.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleWhatsAppEnquiry = () => {
    if (!validate()) return;
    const text = `*DIRECT ENQUIRY FOR FOUNDER ARYAN SINGH*
---------------------------------------
• Client Name: ${inquirerName.trim()}
• Business: ${inquirerBusiness.trim() || "Not specified"}
• Phone/WhatsApp: ${inquirerPhone.trim()}
• Project Topic: ${projectTopic.trim()}
---------------------------------------
Connecting directly via https://navyatech.co.in/contact`;

    const encoded = encodeURIComponent(text);
    window.open(`${FOUNDER_CONFIG.whatsapp.url}?text=${encoded}`, "_blank", "noopener,noreferrer");
    setDispatchedVia("whatsapp");
  };

  const handleEmailEnquiry = () => {
    if (!validate()) return;
    const subject = encodeURIComponent(`Direct Project Enquiry: ${inquirerBusiness.trim() || inquirerName.trim()}`);
    const body = encodeURIComponent(
      `Hello Aryan Singh,\n\nI would like to discuss a project with you directly:\n\n• Name: ${inquirerName.trim()}\n• Business: ${inquirerBusiness.trim() || "Not specified"}\n• Phone: ${inquirerPhone.trim()}\n• Requirements: ${projectTopic.trim()}\n\nLooking forward to your guidance.`
    );
    window.location.href = `mailto:${FOUNDER_CONFIG.email.address}?subject=${subject}&body=${body}`;
    setDispatchedVia("email");
  };

  return (
    <SubpageLayout breadcrumbs={[{ label: "Contact Founder Directly" }]}>
      {/* 1. SEO Head Meta Management */}
      <SEOHead
        title="Get in Touch with Founder Directly | Navya Tech Industry"
        description="Connect directly with Aryan Singh, Founder of Navya Tech Industry. Digital growth solutions, website development, and AI automation. Direct phone +91 74518 12065, WhatsApp +91 93554 12903."
        canonicalPath="/contact"
        keywords={[
          "contact Aryan Singh",
          "Aryan Singh founder",
          "Navya Tech Industry founder",
          "direct founder contact",
          "Aryan Singh phone",
          "Aryan Singh WhatsApp",
          "Aryan Singh email",
          "technology consultation founder",
          "organic growth strategist",
        ]}
        breadcrumbs={[{ label: "Contact Founder Directly" }]}
      />

      {/* 2. Comprehensive Founder Authority Section */}
      <FounderAuthoritySection />

      {/* 3. Direct Message Dispatch / Consultation Intake Box */}
      <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 border-t border-zinc-900/80 bg-black/40">
        <div className="max-w-4xl mx-auto">
          <div className="clay-card p-6 sm:p-10 border border-white/10 rounded-3xl bg-zinc-950/80 backdrop-blur-xl space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400 block mb-1">
                FAST-TRACK ENQUIRY TO FOUNDER
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
                Leave a Direct Brief for Aryan.
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-light mt-1">
                Fill out a quick brief below to automatically format your project summary and dispatch directly to the founder's verified channel.
              </p>
            </div>

            {dispatchedVia && (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 flex items-center gap-2.5 text-xs text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Brief prepared and dispatched via {dispatchedVia === "whatsapp" ? "WhatsApp" : "Email"}! Aryan Singh reviews inbound briefs within 4-12 business hours.
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-zinc-400">
                  Your Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={inquirerName}
                  onChange={(e) => {
                    setInquirerName(e.target.value);
                    if (errors.inquirerName) setErrors((prev) => ({ ...prev, inquirerName: "" }));
                  }}
                  placeholder="e.g. Alex Morgan"
                  aria-invalid={Boolean(errors.inquirerName)}
                  className={`w-full px-3.5 py-2.5 text-base sm:text-xs text-white bg-black/60 border rounded-xl focus:outline-none transition-colors ${
                    errors.inquirerName ? "border-red-500" : "border-white/10 focus:border-red-500/60"
                  }`}
                />
                {errors.inquirerName && (
                  <p className="text-[10px] text-red-400 font-mono" role="alert">{errors.inquirerName}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-zinc-400">Business / Company</label>
                <input
                  type="text"
                  value={inquirerBusiness}
                  onChange={(e) => setInquirerBusiness(e.target.value)}
                  placeholder="e.g. Sterling Capital"
                  className="w-full px-3.5 py-2.5 text-base sm:text-xs text-white bg-black/60 border border-white/10 rounded-xl focus:outline-none focus:border-red-500/60 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-zinc-400">
                  Phone / WhatsApp <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  value={inquirerPhone}
                  onChange={(e) => {
                    setInquirerPhone(e.target.value);
                    if (errors.inquirerPhone) setErrors((prev) => ({ ...prev, inquirerPhone: "" }));
                  }}
                  placeholder="+91 74518 12065"
                  aria-invalid={Boolean(errors.inquirerPhone)}
                  className={`w-full px-3.5 py-2.5 text-base sm:text-xs text-white bg-black/60 border rounded-xl focus:outline-none transition-colors ${
                    errors.inquirerPhone ? "border-red-500" : "border-white/10 focus:border-red-500/60"
                  }`}
                />
                {errors.inquirerPhone && (
                  <p className="text-[10px] text-red-400 font-mono" role="alert">{errors.inquirerPhone}</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-zinc-400">
                What would you like to discuss with the founder? <span className="text-red-400">*</span>
              </label>
              <textarea
                rows={3}
                value={projectTopic}
                onChange={(e) => {
                  setProjectTopic(e.target.value);
                  if (errors.projectTopic) setErrors((prev) => ({ ...prev, projectTopic: "" }));
                }}
                placeholder="Briefly describe your website needs, timeline, or consultation topics..."
                aria-invalid={Boolean(errors.projectTopic)}
                className={`w-full px-3.5 py-2.5 text-base sm:text-xs text-white bg-black/60 border rounded-xl focus:outline-none transition-colors ${
                  errors.projectTopic ? "border-red-500" : "border-white/10 focus:border-red-500/60"
                }`}
              />
              {errors.projectTopic && (
                <p className="text-[10px] text-red-400 font-mono" role="alert">{errors.projectTopic}</p>
              )}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleWhatsAppEnquiry}
                className="clay-btn-primary group w-full sm:flex-1 min-h-[44px] py-3 px-6 rounded-full text-white font-bold text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.45)] text-center"
              >
                <MessageSquare className="w-4 h-4 text-white shrink-0" />
                <span>Send Brief via WhatsApp to Founder</span>
              </button>

              <button
                onClick={handleEmailEnquiry}
                className="clay-btn-secondary group w-full sm:w-auto min-h-[44px] py-3 px-6 rounded-full text-zinc-200 hover:text-white font-medium text-xs tracking-wider cursor-pointer flex items-center justify-center gap-2 border border-white/10 hover:border-red-500/40 text-center"
              >
                <Mail className="w-4 h-4 text-red-400 shrink-0" />
                <span>Send via Email</span>
              </button>

              <a
                href={FOUNDER_CONFIG.phone.link}
                aria-label={`Get in touch: ${FOUNDER_CONFIG.phone.display}`}
                title={`Get in touch: ${FOUNDER_CONFIG.phone.display}`}
                className="w-full sm:w-auto min-h-[44px] py-3 px-5 rounded-full text-zinc-300 hover:text-white font-mono text-xs cursor-pointer border border-white/10 hover:border-white/25 transition-colors flex items-center justify-center gap-2 text-center"
              >
                <Phone className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>Get in touch</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Communication Standards & Direct Accessibility FAQ */}
      <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 border-t border-zinc-900/80 bg-zinc-950/60">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <div className="clay-badge inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono uppercase tracking-widest text-zinc-300 mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-red-400" />
              Direct Communication Policy
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
              How Founder Direct Communication Works
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <h4 className="text-sm font-bold text-white font-heading flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-400" />
                Response Time Guarantee
              </h4>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                Direct inquiries to phone (+91 74518 12065) and WhatsApp (+91 93554 12903) receive rapid attention during active business hours. Email inquiries are reviewed within 4 to 12 business hours.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <h4 className="text-sm font-bold text-white font-heading flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-400" />
                Zero Middlemen or Sales Scripts
              </h4>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                When you reach out through these verified channels, you connect directly with Aryan, Ensuring candid technical evaluation and executive decisions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
};

export default ContactPage;
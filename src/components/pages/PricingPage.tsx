import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Mail,
  Building2,
  Globe,
  Layers,
  Copy,
  RotateCcw,
  HelpCircle,
  Info,
  Clock,
  UserCheck
} from "lucide-react";
import SubpageLayout from "@/components/layout/SubpageLayout";
import SEOHead from "@/components/seo/SEOHead";
import { scrollToTarget } from "@/lib/scroll";
import FounderContactSection from "@/components/ui/founder-contact-section";

/**
 * CONFIGURABLE CONSTANTS:
 * Easy to update for future reporting periods and historical records
 */
export const AVERAGE_PRICING_CONFIG = {
  amount: "$2,500",
  label: "Previous Month's Average",
  heading: "What Businesses Invested Last Month",
  serviceContext: "Last month's average pricing for Internet Marketing services at Navya Tech Industry.",
  disclaimer:
    "Actual pricing varies depending on service requirements, project scope, competition, deliverables, and business objectives. Contact our team for a personalized quotation.",
  period: "October 2026",
};

export interface ServiceOption {
  id: string;
  name: string;
  category: "Website Solutions" | "Internet Marketing";
  tagline: string;
  recommendedFor: string;
}

export const APPROVED_SERVICES: ServiceOption[] = [
  // Website Solutions
  {
    id: "web-dev",
    name: "Website Development",
    category: "Website Solutions",
    tagline: "High-speed Next.js and full-stack web architecture.",
    recommendedFor: "Businesses requiring modern, custom code and sub-second performance.",
  },
  {
    id: "ecom-dev",
    name: "Ecommerce Website Development",
    category: "Website Solutions",
    tagline: "0% platform commission storefronts with payment gateway integrations.",
    recommendedFor: "Brands selling products online looking to eliminate high marketplace cuts.",
  },
  {
    id: "biz-dev",
    name: "Business Website Development",
    category: "Website Solutions",
    tagline: "High-intent lead acquisition engines and corporate credibility hubs.",
    recommendedFor: "Service providers, clinics, agencies, and enterprises needing qualified inquiries.",
  },
  {
    id: "web-redesign",
    name: "Website Redesign",
    category: "Website Solutions",
    tagline: "Modernize visuals and Core Web Vitals with 100% SEO ranking preservation.",
    recommendedFor: "Existing sites suffering from slow loading, dated UX, or mobile drop-offs.",
  },
  {
    id: "web-app-dev",
    name: "Web App Development",
    category: "Website Solutions",
    tagline: "Scalable interactive web applications, client portals, and custom APIs.",
    recommendedFor: "SaaS products, workflow dashboards, and complex digital platforms.",
  },

  // Internet Marketing
  {
    id: "marketing-bundle",
    name: "Internet Marketing Bundle",
    category: "Internet Marketing",
    tagline: "Unified SEO + GEO omni-growth engine for maximum search and AI visibility.",
    recommendedFor: "Businesses wanting comprehensive organic dominance on Google, ChatGPT, and Perplexity.",
  },
  {
    id: "seo",
    name: "SEO",
    category: "Internet Marketing",
    tagline: "Search Engine Optimization, technical schema, high-intent ranking, and local map packs.",
    recommendedFor: "Companies targeting first-page Google rankings and sustainable organic traffic.",
  },
  {
    id: "geo",
    name: "GEO",
    category: "Internet Marketing",
    tagline: "Generative Engine Optimization tailored for AI answers and conversational search.",
    recommendedFor: "Brands wanting their solutions recommended directly by generative AI engines.",
  },
  {
    id: "aeo",
    name: "AEO",
    category: "Internet Marketing",
    tagline: "Answer Engine Optimization tailored for direct answers and question-based search engines.",
    recommendedFor: "Brands seeking authoritative presence as direct answers in conversational search engines.",
  },
];

export const INDUSTRY_CHOICES = [
  "SaaS & Voice Automation",
  "Real Estate & Luxury",
  "Healthcare & Clinics",
  "E-commerce & Retail",
  "Professional Services",
  "Education & Academics",
  "Technology & AI Labs",
  "Small Businesses",
  "Restaurant & Hospitality",
  "Consulting & Advisory",
  "Other Industry",
];

export const BUDGET_CHOICES = [
  { id: "budget-pocket", label: "Pocket-Friendly / Startup", hint: "Optimized essentials for lean budgets" },
  { id: "budget-growth", label: "Growth / Scaling Business", hint: "Comprehensive feature set & integrations" },
  { id: "budget-enterprise", label: "Enterprise / Custom Scope", hint: "High-volume or complex architectures" },
  { id: "budget-discuss", label: "Discuss with Decision-Makers", hint: "Guidance on appropriate investment" },
];

export const TIMELINE_CHOICES = [
  "Immediate (1-2 weeks)",
  "Standard Sprint (3-4 weeks)",
  "Flexible / Phased Rollout",
];

export const PricingPage: React.FC = () => {
  // Stepper State (1, 2, 3, 4)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Selected Services
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([
    "web-dev",
    "seo",
  ]);

  // Step 2: Business & Project Form
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState(INDUSTRY_CHOICES[0]);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [projectRequirements, setProjectRequirements] = useState("");
  const [estimatedBudget, setEstimatedBudget] = useState(BUDGET_CHOICES[0].label);
  const [projectTimeline, setProjectTimeline] = useState(TIMELINE_CHOICES[0]);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  // Validation & Submission States
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isCopied, setIsCopied] = useState(false);
  const [submittedViaChannel, setSubmittedViaChannel] = useState<"whatsapp" | "email" | null>(null);

  // Toggle service selection
  const toggleService = (id: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  // Get selected service objects
  const selectedServices = APPROVED_SERVICES.filter((s) =>
    selectedServiceIds.includes(s.id)
  );

  // Validate Step 1
  const handleProceedToStep2 = () => {
    if (selectedServiceIds.length === 0) {
      setFormErrors({ services: "Please select at least one service to proceed." });
      return;
    }
    setFormErrors({});
    setCurrentStep(2);
    scrollToTarget("quotation-wizard", { offset: -80, duration: 0.6 });
  };

  // Validate Step 2
  const handleProceedToStep3 = () => {
    const errors: Record<string, string> = {};
    if (!businessName.trim()) errors.businessName = "Business name is required.";
    if (!contactName.trim()) errors.contactName = "Your contact name is required.";
    if (!contactEmail.trim() || !contactEmail.includes("@"))
      errors.contactEmail = "A valid email address is required.";
    if (!contactPhone.trim() || contactPhone.length < 7)
      errors.contactPhone = "A valid phone / WhatsApp number is required.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setCurrentStep(3);
    scrollToTarget("quotation-wizard", { offset: -80, duration: 0.6 });
  };

  const handleProceedToStep4 = () => {
    setCurrentStep(4);
    scrollToTarget("quotation-wizard", { offset: -80, duration: 0.6 });
  };

  // Build structured quote text
  const generateQuoteText = () => {
    const serviceNames = selectedServices.map((s) => `• ${s.name} (${s.category})`).join("\n");
    return `*NAVYA TECH INDUSTRY — CUSTOM QUOTATION REQUEST*
---------------------------------------
*Business Details:*
- Business Name: ${businessName || "Not specified"}
- Industry: ${industry}
- Website URL: ${websiteUrl || "Not provided"}

*Selected Services (${selectedServices.length}):*
${serviceNames}

*Project Objectives & Scope:*
${projectRequirements || "Custom requirements to be discussed with decision-makers."}

*Commercial Preferences:*
- Budget Preference: ${estimatedBudget}
- Desired Timeline: ${projectTimeline}

*Contact Person:*
- Name: ${contactName || "Not specified"}
- Email: ${contactEmail || "Not specified"}
- Phone/WhatsApp: ${contactPhone || "Not specified"}
---------------------------------------
Generated via https://navyatech.co.in/pricing`;
  };

  // Direct WhatsApp submission
  const handleSendWhatsApp = () => {
    const message = generateQuoteText();
    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/919355412903?text=${encoded}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setSubmittedViaChannel("whatsapp");
  };

  // Direct Email submission
  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Custom Quotation Request: ${businessName || "New Project"}`);
    const body = encodeURIComponent(generateQuoteText());
    const mailtoUrl = `mailto:hello@navyatech.co.in?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
    setSubmittedViaChannel("email");
  };

  // Copy quote to clipboard
  const handleCopyQuote = () => {
    navigator.clipboard.writeText(generateQuoteText());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <SubpageLayout breadcrumbs={[{ label: "Pricing & Quotes" }]}>
      {/* 1. SEO Head Meta Management */}
      <SEOHead
        title="Custom Website & Internet Marketing Quotes | Navya Tech"
        description="Get a pocket-friendly quote from Navya Tech Industry. Choose website development, SEO, GEO, and internet marketing services tailored to your business."
        canonicalPath="/pricing"
        keywords={[
          "custom website quote",
          "pocket friendly web development",
          "internet marketing quote",
          "SEO quote",
          "GEO optimization quote",
          "Navya Tech Industry pricing",
          "website quotation",
        ]}
        breadcrumbs={[{ label: "Pricing & Custom Quote" }]}
      />

      {/* 2. Main Hero Section */}
      <section className="relative w-full pt-10 pb-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-900/80 overflow-hidden">
        {/* Subtle radial glow accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="clay-badge inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-red-300 font-mono mb-6">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            Pocket-Friendly &amp; Tailored Quotations
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight font-heading leading-[1.1] mb-6">
            Get a Pocket-Friendly Quote for Your Business
          </h1>

          <p className="text-base sm:text-xl text-zinc-300 font-light leading-relaxed max-w-3xl mx-auto mb-10">
            Every business has different requirements. Choose the services you need, discuss your goals with our decision-makers, and get a customized quotation designed around your budget and business objectives.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollToTarget("quotation-wizard", { offset: -80, duration: 0.8 })}
              className="clay-btn-primary group w-full sm:w-auto py-4 px-8 rounded-full text-white font-bold text-sm uppercase tracking-wider cursor-pointer text-center flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(239,68,68,0.45)] hover:shadow-[0_0_35px_rgba(239,68,68,0.7)] hover:scale-[1.02] transition-all"
            >
              <span>Get My Custom Quote</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollToTarget("consult-decision-makers", { offset: -80, duration: 0.8 })}
              className="clay-btn-secondary group w-full sm:w-auto py-4 px-8 rounded-full text-zinc-200 hover:text-white font-medium text-sm tracking-wide cursor-pointer text-center flex items-center justify-center gap-2.5 border border-white/10 hover:border-red-500/40 transition-all"
            >
              <UserCheck className="w-4 h-4 text-red-400" />
              <span>Talk to Our Decision Makers</span>
            </button>
          </div>

          {/* Core Philosophy Value Pills */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-xs font-mono font-bold text-red-400 block mb-1">01. AFFORDABILITY</span>
              <p className="text-xs text-zinc-400 font-light">Pocket-friendly scope aligned to your budget.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-xs font-mono font-bold text-red-400 block mb-1">02. FLEXIBILITY</span>
              <p className="text-xs text-zinc-400 font-light">Zero forced bundles; pay only for what you need.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-xs font-mono font-bold text-red-400 block mb-1">03. TRANSPARENCY</span>
              <p className="text-xs text-zinc-400 font-light">Honest deliverables with no surprise bills.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-xs font-mono font-bold text-red-400 block mb-1">04. LEADERSHIP</span>
              <p className="text-xs text-zinc-400 font-light">Consult directly with experienced decision-makers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section 4: Last Month's Average Pricing Highlight (Distinct Visual Card) */}
      <section id="pricing-insights" className="relative w-full py-16 px-4 sm:px-6 lg:px-8 border-b border-zinc-900/80 bg-black/40">
        <div className="max-w-4xl mx-auto">
          <div className="clay-card-interactive p-8 sm:p-12 relative overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900/80 to-zinc-950 border border-amber-500/20 shadow-[0_0_35px_rgba(245,158,11,0.08)]">
            {/* Ambient gold glow accent */}
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="space-y-3 max-w-xl">
                <div className="clay-badge inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-amber-300 border-amber-500/30">
                  <Clock className="w-3 h-3 text-amber-400" />
                  {AVERAGE_PRICING_CONFIG.label}
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white font-heading tracking-tight">
                  {AVERAGE_PRICING_CONFIG.heading}
                </h2>

                <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                  {AVERAGE_PRICING_CONFIG.serviceContext}
                </p>
              </div>

              {/* Visual Highlight Number */}
              <div className="flex flex-col items-start md:items-end justify-center shrink-0 p-6 rounded-2xl bg-black/50 border border-amber-500/30 backdrop-blur-md">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400/90 mb-1">
                  Average Investment
                </span>
                <span className="text-5xl sm:text-6xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 tracking-tight">
                  {AVERAGE_PRICING_CONFIG.amount}
                </span>
                <span className="text-[11px] font-mono text-zinc-400 mt-1">
                  Reported: {AVERAGE_PRICING_CONFIG.period}
                </span>
              </div>
            </div>

            {/* Contextual Legal Disclaimer */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-start gap-3">
              <Info className="w-4 h-4 text-amber-400/80 shrink-0 mt-0.5" />
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                <strong className="text-zinc-300 font-medium">Important Context: </strong>
                {AVERAGE_PRICING_CONFIG.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section 3: Interactive Four-Step Quotation Process */}
      <section id="quotation-wizard" className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="clay-badge inline-flex items-center gap-2 px-3.5 py-1.5 text-red-300 text-xs font-semibold uppercase tracking-widest font-mono mb-4">
              <Layers className="w-3.5 h-3.5 text-red-400" />
              Tailored Quotation Experience
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading">
              Four Steps to Your Personalized Quote
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 font-light mt-3 max-w-xl mx-auto">
              Follow our simple, interactive process to articulate your requirements and receive an accurate, pocket-friendly quotation.
            </p>
          </div>

          {/* Stepper Navigation Indicator */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {[
              { step: 1, title: "1. Choose Services", sub: "Select needs" },
              { step: 2, title: "2. Your Business", sub: "Scope & budget" },
              { step: 3, title: "3. Consult Leaders", sub: "Strategic guidance" },
              { step: 4, title: "4. Custom Quote", sub: "Review & dispatch" },
            ].map((s) => {
              const isActive = currentStep === s.step;
              const isCompleted = currentStep > s.step;
              return (
                <button
                  key={s.step}
                  onClick={() => {
                    // Allow navigating back or forward if valid
                    if (s.step < currentStep || (s.step === 2 && selectedServiceIds.length > 0)) {
                      setCurrentStep(s.step);
                    }
                  }}
                  className={`p-4 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between ${
                    isActive
                      ? "clay-card bg-red-950/30 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.25)]"
                      : isCompleted
                      ? "bg-zinc-900/60 border-emerald-500/40 hover:border-emerald-500/70 cursor-pointer"
                      : "bg-zinc-950/40 border-white/5 opacity-60 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-widest ${
                        isActive
                          ? "text-red-400"
                          : isCompleted
                          ? "text-emerald-400"
                          : "text-zinc-500"
                      }`}
                    >
                      {isCompleted ? "Completed" : `Step 0${s.step}`}
                    </span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isActive ? "bg-red-500 animate-ping" : "bg-zinc-700"
                        }`}
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-heading">{s.title}</h3>
                    <p className="text-[11px] text-zinc-400 font-light">{s.sub}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Stepper Content Cards */}
          <div className="clay-card p-6 sm:p-10 border border-white/10 rounded-3xl bg-zinc-950/80 backdrop-blur-xl">
            {/* ============================================================== */}
            {/* STEP 1: CHOOSE YOUR SERVICES                                    */}
            {/* ============================================================== */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="border-b border-white/10 pb-6">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400">
                      STEP 1 — MULTI-SERVICE SELECTION
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      Selected: <strong className="text-white">{selectedServiceIds.length}</strong> services
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
                    Choose Your Service According to Your Needs
                  </h3>
                  <p className="text-sm text-zinc-300 font-light mt-1">
                    Select the approved Navya Tech services required for your business. You can select multiple items to assemble your customized solution.
                  </p>
                </div>

                {formErrors.services && (
                  <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                    <Info className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{formErrors.services}</span>
                  </div>
                )}

                {/* Group 1: Website Solutions */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-red-400" />
                    <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-200">
                      Website Solutions (6 Core Services)
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {APPROVED_SERVICES.filter((s) => s.category === "Website Solutions").map((service) => {
                      const isSelected = selectedServiceIds.includes(service.id);
                      return (
                        <div
                          key={service.id}
                          onClick={() => toggleService(service.id)}
                          className={`p-5 rounded-2xl cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
                            isSelected
                              ? "bg-red-950/30 border-red-500/80 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                              : "bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]"
                          }`}
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-3">
                              <span className="text-[11px] font-mono text-zinc-400 uppercase">
                                Website Solution
                              </span>
                              <div
                                className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors border ${
                                  isSelected
                                    ? "bg-red-500 border-red-400 text-white"
                                    : "border-white/20 bg-black/40 text-transparent"
                                }`}
                              >
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                            </div>
                            <h5 className="text-base font-bold text-white font-heading mb-2">
                              {service.name}
                            </h5>
                            <p className="text-xs text-zinc-300 font-light leading-relaxed mb-3">
                              {service.tagline}
                            </p>
                          </div>
                          <div className="pt-3 border-t border-white/5 text-[11px] text-zinc-400 font-light italic">
                            {service.recommendedFor}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Group 2: Internet Marketing */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-amber-400" />
                    <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-200">
                      Internet Marketing (4 Core Services: Bundle, SEO, GEO, AEO)
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {APPROVED_SERVICES.filter((s) => s.category === "Internet Marketing").map((service) => {
                      const isSelected = selectedServiceIds.includes(service.id);
                      return (
                        <div
                          key={service.id}
                          onClick={() => toggleService(service.id)}
                          className={`p-5 rounded-2xl cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
                            isSelected
                              ? "bg-amber-950/30 border-amber-500/80 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                              : "bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]"
                          }`}
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-3">
                              <span className="text-[11px] font-mono text-zinc-400 uppercase">
                                Marketing &amp; Search
                              </span>
                              <div
                                className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors border ${
                                  isSelected
                                    ? "bg-amber-500 border-amber-400 text-white"
                                    : "border-white/20 bg-black/40 text-transparent"
                                }`}
                              >
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                            </div>
                            <h5 className="text-base font-bold text-white font-heading mb-2">
                              {service.name}
                            </h5>
                            <p className="text-xs text-zinc-300 font-light leading-relaxed mb-3">
                              {service.tagline}
                            </p>
                          </div>
                          <div className="pt-3 border-t border-white/5 text-[11px] text-zinc-400 font-light italic">
                            {service.recommendedFor}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Step 1 Action */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-zinc-400 font-light text-center sm:text-left">
                    Selected: <strong className="text-white">{selectedServiceIds.length}</strong> of 9 approved services. You can adjust this anytime.
                  </div>
                  <button
                    onClick={handleProceedToStep2}
                    className="clay-btn-primary group w-full sm:w-auto min-h-[44px] py-3.5 px-7 rounded-full text-white font-bold text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Step 2: Business Details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ============================================================== */}
            {/* STEP 2: TELL US ABOUT YOUR BUSINESS                             */}
            {/* ============================================================== */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="border-b border-white/10 pb-6">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400 block mb-2">
                    STEP 2 — PROJECT SCOPE &amp; DETAILS
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
                    Tell Us About Your Business
                  </h3>
                  <p className="text-sm text-zinc-300 font-light mt-1">
                    Provide project parameters so our decision-makers can construct a precise, pocket-friendly quotation.
                  </p>
                </div>

                {/* Selected Services Pill Bar */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span>SELECTED SERVICES ({selectedServices.length}):</span>
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="text-red-400 hover:text-red-300 underline cursor-pointer"
                    >
                      Edit services
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedServices.map((s) => (
                      <span
                        key={s.id}
                        className="px-3 py-1 rounded-full text-xs font-mono bg-red-950/40 border border-red-500/40 text-red-200 flex items-center gap-1.5"
                      >
                        <span>{s.name}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Business Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                      Business Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Acme Tech Solutions"
                      className={`w-full px-4 py-3 text-base sm:text-sm text-white bg-black/60 border rounded-xl focus:outline-none transition-colors ${
                        formErrors.businessName ? "border-red-500" : "border-white/10 focus:border-red-500/60"
                      }`}
                    />
                    {formErrors.businessName && (
                      <p className="text-xs text-red-400">{formErrors.businessName}</p>
                    )}
                  </div>

                  {/* Industry Dropdown */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                      Industry Category
                    </label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full px-4 py-3 text-base sm:text-sm text-white bg-black/60 border border-white/10 rounded-xl focus:outline-none focus:border-red-500/60 transition-colors"
                    >
                      {INDUSTRY_CHOICES.map((ind) => (
                        <option key={ind} value={ind} className="bg-zinc-950 text-white">
                          {ind}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Website URL (Optional) */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                      Current Website URL <span className="text-zinc-500 font-light">(Optional)</span>
                    </label>
                    <input
                      type="url"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full px-4 py-3 text-base sm:text-sm text-white bg-black/60 border border-white/10 rounded-xl focus:outline-none focus:border-red-500/60 transition-colors"
                    />
                  </div>

                  {/* Estimated Timeline */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                      Desired Timeline
                    </label>
                    <select
                      value={projectTimeline}
                      onChange={(e) => setProjectTimeline(e.target.value)}
                      className="w-full px-4 py-3 text-base sm:text-sm text-white bg-black/60 border border-white/10 rounded-xl focus:outline-none focus:border-red-500/60 transition-colors"
                    >
                      {TIMELINE_CHOICES.map((t) => (
                        <option key={t} value={t} className="bg-zinc-950 text-white">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Estimated Budget Preference */}
                <div className="space-y-3 pt-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                    Estimated Budget Approach
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {BUDGET_CHOICES.map((b) => (
                      <div
                        key={b.id}
                        onClick={() => setEstimatedBudget(b.label)}
                        className={`p-3.5 rounded-xl cursor-pointer border transition-colors flex items-center justify-between ${
                          estimatedBudget === b.label
                            ? "bg-red-950/30 border-red-500/70 text-white"
                            : "bg-black/40 border-white/5 hover:border-white/15 text-zinc-300"
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold text-white">{b.label}</div>
                          <div className="text-[11px] text-zinc-400 font-light">{b.hint}</div>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            estimatedBudget === b.label
                              ? "border-red-400 bg-red-500"
                              : "border-white/20 bg-transparent"
                          }`}
                        >
                          {estimatedBudget === b.label && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Requirements Textarea */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                    Project Requirements &amp; Objectives
                  </label>
                  <textarea
                    rows={3}
                    value={projectRequirements}
                    onChange={(e) => setProjectRequirements(e.target.value)}
                    placeholder="Describe your target audience, main conversion goals, custom integrations (e.g. WhatsApp, CRM, Stripe, Maps), or any pain points with your current setup..."
                    className="w-full px-4 py-3 text-base sm:text-sm text-white bg-black/60 border border-white/10 rounded-xl focus:outline-none focus:border-red-500/60 transition-colors"
                  />
                </div>

                {/* Contact Details */}
                <div className="pt-4 border-t border-white/10 space-y-4">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                    Your Contact Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-zinc-400">Contact Name *</label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className={`w-full px-3.5 py-2.5 text-base sm:text-xs text-white bg-black/60 border rounded-xl focus:outline-none ${
                          formErrors.contactName ? "border-red-500" : "border-white/10 focus:border-red-500/60"
                        }`}
                      />
                      {formErrors.contactName && <p className="text-[10px] text-red-400">{formErrors.contactName}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-zinc-400">Email Address *</label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="john@example.com"
                        className={`w-full px-3.5 py-2.5 text-base sm:text-xs text-white bg-black/60 border rounded-xl focus:outline-none ${
                          formErrors.contactEmail ? "border-red-500" : "border-white/10 focus:border-red-500/60"
                        }`}
                      />
                      {formErrors.contactEmail && <p className="text-[10px] text-red-400">{formErrors.contactEmail}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-zinc-400">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="+91 93554 12903"
                        className={`w-full px-3.5 py-2.5 text-base sm:text-xs text-white bg-black/60 border rounded-xl focus:outline-none ${
                          formErrors.contactPhone ? "border-red-500" : "border-white/10 focus:border-red-500/60"
                        }`}
                      />
                      {formErrors.contactPhone && <p className="text-[10px] text-red-400">{formErrors.contactPhone}</p>}
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    ← Back to Step 1: Select Services
                  </button>
                  <button
                    onClick={handleProceedToStep3}
                    className="clay-btn-primary group w-full sm:w-auto py-3.5 px-7 rounded-full text-white font-bold text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Step 3: Consult Decision-Makers</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ============================================================== */}
            {/* STEP 3: CONSULT WITH DECISION-MAKERS                            */}
            {/* ============================================================== */}
            {currentStep === 3 && (
              <motion.div
                id="consult-decision-makers"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="border-b border-white/10 pb-6">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400 block mb-2">
                    STEP 3 — DIRECT EXECUTIVE ALIGNMENT
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
                    Consult with the Decision-Makers
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-300 font-light mt-2 leading-relaxed">
                    Not sure which services will deliver the best results for your business? Discuss your requirements directly with our decision-makers. Our team will help you identify suitable solutions, priorities, and investment requirements.
                  </p>
                </div>

                {/* 6 Consultation Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
                    <span className="text-[11px] font-mono text-red-400 font-bold uppercase">01. Consultation Request</span>
                    <h4 className="text-sm font-bold text-white font-heading">Direct Leadership Review</h4>
                    <p className="text-xs text-zinc-400 font-light">Evaluated directly by our technical partners, not junior sales representatives.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
                    <span className="text-[11px] font-mono text-red-400 font-bold uppercase">02. Requirement Discussion</span>
                    <h4 className="text-sm font-bold text-white font-heading">Technical Deep-Dive</h4>
                    <p className="text-xs text-zinc-400 font-light">Review target audience, architecture, conversion goals, and third-party APIs.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
                    <span className="text-[11px] font-mono text-red-400 font-bold uppercase">03. Service Recommendations</span>
                    <h4 className="text-sm font-bold text-white font-heading">High-ROI Filtering</h4>
                    <p className="text-xs text-zinc-400 font-light">Honest advice on what your business actually needs vs. unnecessary complexity.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
                    <span className="text-[11px] font-mono text-red-400 font-bold uppercase">04. Scope Clarification</span>
                    <h4 className="text-sm font-bold text-white font-heading">Milestone Definitions</h4>
                    <p className="text-xs text-zinc-400 font-light">Exact deliverables, timeline stages, and performance guarantees agreed upfront.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
                    <span className="text-[11px] font-mono text-red-400 font-bold uppercase">05. Budget Discussion</span>
                    <h4 className="text-sm font-bold text-white font-heading">Pocket-Friendly Terms</h4>
                    <p className="text-xs text-zinc-400 font-light">Flexible commercial terms and 50/50 milestone billing designed around your cashflow.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
                    <span className="text-[11px] font-mono text-red-400 font-bold uppercase">06. Project Planning</span>
                    <h4 className="text-sm font-bold text-white font-heading">Phased Execution</h4>
                    <p className="text-xs text-zinc-400 font-light">Customized project roadmap built specifically for your launch schedule.</p>
                  </div>
                </div>

                {/* Professional Scheduling Transparency Note */}
                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3">
                  <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-zinc-300 font-light leading-relaxed">
                    <strong className="text-white font-medium">Professional Consultation Standards: </strong>
                    To ensure senior technical partners give your project undivided attention, consultations are scheduled upon requirement review. We do not use automated meeting bots or promise generic immediate calls.
                  </div>
                </div>

                {/* Founder Direct Consultation Section */}
                <div className="pt-4 border-t border-white/10 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400 block mb-1">
                        EXECUTIVE ACCESSIBILITY
                      </span>
                      <h4 className="text-xl sm:text-2xl font-black text-white font-heading">
                        Want to discuss your project directly with our founder?
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-300 font-light mt-1">
                        Connect directly with Aryan Singh to evaluate project feasibility, explore tailored solutions, and align on pocket-friendly pricing terms.
                      </p>
                    </div>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-red-400 hover:text-red-300 underline underline-offset-4 self-start sm:self-auto shrink-0"
                    >
                      <span>Full Contact Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <FounderContactSection
                    id="pricing-founder-consultation"
                    variant="embedded"
                    showEnquiryCta={false}
                    className="p-0 border-0"
                  />
                </div>

                {/* Stepper Buttons */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    ← Back to Step 2: Business Scope
                  </button>
                  <button
                    onClick={handleProceedToStep4}
                    className="clay-btn-primary group w-full sm:w-auto py-3.5 px-7 rounded-full text-white font-bold text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Step 4: Review Your Quote</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ============================================================== */}
            {/* STEP 4: RECEIVE YOUR CUSTOMIZED QUOTE                           */}
            {/* ============================================================== */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="border-b border-white/10 pb-6">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400 block mb-2">
                    STEP 4 — YOUR PERSONALIZED SUMMARY
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
                    Your Business. Your Requirements. Your Quote.
                  </h3>
                  <p className="text-sm text-zinc-300 font-light mt-1">
                    Receive a personalized quotation based on your selected services, project scope, business objectives, and budget.
                  </p>
                </div>

                {/* Submission Success Alert if Dispatched */}
                {submittedViaChannel && (
                  <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white font-heading">
                        Quotation Request Dispatched via {submittedViaChannel === "whatsapp" ? "WhatsApp" : "Email"}!
                      </h4>
                      <p className="text-xs text-emerald-200/90 font-light mt-1">
                        Our decision-makers have received your project details. We will review your scope and provide a formal, pocket-friendly proposal within 12 to 24 business hours.
                      </p>
                    </div>
                  </div>
                )}

                {/* Live Custom Quotation Card */}
                <div className="clay-card-interactive p-6 sm:p-8 bg-black/60 border border-red-500/30 rounded-2xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                    <div>
                      <span className="text-xs font-mono text-zinc-400 uppercase">Project Reference:</span>
                      <h4 className="text-xl font-bold text-white font-heading">
                        {businessName || "Custom Business Project"}
                      </h4>
                      <span className="text-xs font-mono text-red-400">
                        {industry} • Timeline: {projectTimeline}
                      </span>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-xs font-mono text-zinc-400 uppercase block">Selected Services:</span>
                      <span className="text-lg font-black text-white font-heading">
                        {selectedServices.length} Approved Offerings
                      </span>
                      <span className="text-xs font-mono text-amber-400 block">
                        Budget: {estimatedBudget}
                      </span>
                    </div>
                  </div>

                  {/* Services Breakdown */}
                  <div className="space-y-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 block">
                      Included Scope &amp; Selected Services:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedServices.map((service) => (
                        <div
                          key={service.id}
                          className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3"
                        >
                          <Check className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                          <div>
                            <h5 className="text-xs font-bold text-white font-heading">{service.name}</h5>
                            <p className="text-[11px] text-zinc-400 font-light">{service.tagline}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Proposed Deliverables & Guarantees */}
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 block">
                      Proposed Project Scope &amp; Deliverables:
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-zinc-300 font-light">
                      <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5">
                        <strong className="text-white block font-medium mb-1">100% Code Ownership</strong>
                        Full GitHub repository rights with clean TypeScript and zero monthly builder tax.
                      </div>
                      <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5">
                        <strong className="text-white block font-medium mb-1">Sub-Second Speed</strong>
                        Guaranteed 95+ Lighthouse scores across mobile and desktop viewports.
                      </div>
                      <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5">
                        <strong className="text-white block font-medium mb-1">Decision-Maker Access</strong>
                        Direct technical consultation throughout development, review, and launch.
                      </div>
                    </div>
                  </div>

                  {/* Pricing Disclaimer Note (No fake binding auto-generated rates) */}
                  <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/10 text-xs text-zinc-300 font-light leading-relaxed">
                    <strong className="text-white font-medium">Customized Quotation Governance: </strong>
                    To ensure accurate and fair pricing, your customized quotation is tailored by our leadership team based on actual feature complexity, deliverables, and integration needs. No binding prices are generated without executive review.
                  </div>

                  {/* Contact Summary */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs font-mono text-zinc-400 gap-2">
                    <span>Contact: <strong className="text-white">{contactName || "Client"}</strong> ({contactPhone || "Phone not entered"})</span>
                    <span>Email: <strong className="text-white">{contactEmail || "Email not entered"}</strong></span>
                  </div>
                </div>

                {/* Dispatch & Transmission Triggers */}
                <div className="space-y-4">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 block">
                    Dispatch Your Customized Quote to Our Decision-Makers:
                  </span>

                  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                    {/* Primary WhatsApp Dispatch */}
                    <button
                      onClick={handleSendWhatsApp}
                      className="clay-btn-primary group w-full sm:flex-1 min-h-[48px] py-3.5 sm:py-4 px-6 rounded-full text-white font-bold text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(239,68,68,0.5)] text-center"
                    >
                      <MessageSquare className="w-4 h-4 text-white shrink-0" />
                      <span>Send to Decision-Makers on WhatsApp</span>
                    </button>

                    {/* Secondary Email Dispatch */}
                    <button
                      onClick={handleSendEmail}
                      className="clay-btn-secondary group w-full sm:w-auto min-h-[48px] py-3.5 sm:py-4 px-6 rounded-full text-zinc-200 hover:text-white font-medium text-xs tracking-wider cursor-pointer flex items-center justify-center gap-2 border border-white/10 hover:border-red-500/40 text-center"
                    >
                      <Mail className="w-4 h-4 text-red-400 shrink-0" />
                      <span>Send via Email</span>
                    </button>

                    {/* Copy Summary Button */}
                    <button
                      onClick={handleCopyQuote}
                      className="w-full sm:w-auto min-h-[48px] py-3.5 sm:py-4 px-5 rounded-full text-zinc-400 hover:text-white font-mono text-xs cursor-pointer border border-white/5 hover:border-white/20 transition-colors flex items-center justify-center gap-2 text-center"
                      title="Copy quote summary"
                    >
                      <Copy className="w-3.5 h-3.5 shrink-0" />
                      <span>{isCopied ? "Copied!" : "Copy Summary"}</span>
                    </button>
                  </div>
                </div>

                {/* Stepper Navigation */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    ← Back to Step 3: Consult Decision-Makers
                  </button>
                  <button
                    onClick={() => {
                      setCurrentStep(1);
                      scrollToTarget("quotation-wizard", { offset: -80, duration: 0.6 });
                    }}
                    className="text-xs font-mono text-red-400 hover:text-red-300 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Start New Quote</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* 5. FAQs Section */}
      <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 border-t border-zinc-900/80 bg-black/40">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <div className="clay-badge inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono uppercase tracking-widest text-zinc-300 mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-red-400" />
              Frequently Asked Questions
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
              How Custom Quotations Work at Navya
            </h3>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <h4 className="text-base font-bold text-white font-heading mb-2">
                Why does Navya avoid rigid Basic / Standard / Premium packages?
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                Predefined packages force businesses to either pay for features they do not need or miss out on capabilities critical to their operations. Our customized quotation model ensures you invest solely in high-ROI solutions designed around your actual operational reality.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <h4 className="text-base font-bold text-white font-heading mb-2">
                What does "pocket-friendly" mean in practice?
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                It means we prioritize cost-efficiency: 100% full code ownership so you never pay monthly website builder taxes, zero third-party takeout commissions, milestone-based payments (50% kickoff, 50% production), and phased implementations that scale with your revenue.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <h4 className="text-base font-bold text-white font-heading mb-2">
                How quickly will I receive my formal customized quotation?
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                Once you dispatch your quote summary via WhatsApp or email, a senior decision-maker will review your scope and provide a formal, itemized proposal within 12 to 24 business hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
};

export default PricingPage;


import React, { useState, useEffect } from "react";
import SubpageLayout from "@/components/layout/SubpageLayout";
import SEOHead from "@/components/seo/SEOHead";
import CopyButton from "@/components/ui/copy-button";
import { scrollToTarget } from "@/lib/scroll";
import {
  ShieldCheck,
  Lock,
  FileText,
  UserCheck,
  Server,
  Cookie,
  EyeOff,
  Globe,
  HelpCircle,
  Mail,
  MapPin,
  ExternalLink,
  Printer,
  Share2,
  Check,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Database,
  Building,
  AlertCircle
} from "lucide-react";

const SECTIONS = [
  { id: "section-1", number: "1", title: "Introduction" },
  {
    id: "section-2",
    number: "2",
    title: "Information We Collect",
    subsections: [
      { id: "section-2-1", number: "2.1", title: "Personal Information" },
      { id: "section-2-2", number: "2.2", title: "Business & Project Information" },
      { id: "section-2-3", number: "2.3", title: "Technical Information" },
      { id: "section-2-4", number: "2.4", title: "Cookies & Tracking" },
    ],
  },
  { id: "section-3", number: "3", title: "How We Use Your Information" },
  {
    id: "section-4",
    number: "4",
    title: "Information Sharing & Disclosure",
    subsections: [
      { id: "section-4-1", number: "4.1", title: "Service Providers" },
      { id: "section-4-2", number: "4.2", title: "Legal Requirements" },
      { id: "section-4-3", number: "4.3", title: "Business Transactions" },
    ],
  },
  { id: "section-5", number: "5", title: "Data Security" },
  { id: "section-6", number: "6", title: "Data Retention" },
  { id: "section-7", number: "7", title: "Third-Party Websites & Services" },
  { id: "section-8", number: "8", title: "Your Privacy Rights" },
  { id: "section-9", number: "9", title: "Children's Privacy" },
  { id: "section-10", number: "10", title: "International Data Transfers" },
  { id: "section-11", number: "11", title: "Changes to This Privacy Policy" },
  { id: "section-12", number: "12", title: "Contact Information" },
];

export const PrivacyPolicyPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("section-1");
  const [copiedLink, setCopiedLink] = useState(false);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const sec of SECTIONS) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    scrollToTarget(id, { offset: -100, duration: 1.1 });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <SubpageLayout
      breadcrumbs={[
        { label: "Legal", href: "/#legal" },
        { label: "Privacy Policy" },
      ]}
      showWaitlist={false}
    >
      <SEOHead
        title="Privacy Policy | Navya Tech Industry"
        description="Official Privacy Policy for Navya Tech Industry. Details on how we collect, protect, process, and safeguard personal information and project data."
        canonicalPath="/privacy-policy"
        keywords={[
          "Navya Tech Industry Privacy Policy",
          "Navya Tech Privacy",
          "Data Protection Policy",
          "DPDP Act Compliance",
          "Client Data Confidentiality",
          "Website Development Privacy",
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Privacy Policy | Navya Tech Industry",
          url: "https://www.navyatech.co.in/privacy-policy",
          datePublished: "2026-10-01",
          dateModified: "2026-10-01",
          description:
            "Official Privacy Policy of Navya Tech Industry explaining data collection, client confidentiality, technical security measures, and privacy rights.",
          publisher: {
            "@type": "Organization",
            name: "Navya Tech Industry",
            url: "https://www.navyatech.co.in",
            logo: "https://www.navyatech.co.in/logoimg.png",
          },
        }}
      />

      {/* Main Container */}
      <div className="w-full pt-6 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header Hero Banner */}
        <div className="clay-card p-6 sm:p-10 md:p-12 mb-10 border border-white/10 relative overflow-hidden">
          {/* Subtle Ambient Radial Highlight */}
          <div
            className="absolute -top-32 -right-32 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full clay-badge text-xs font-mono text-red-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>OFFICIAL LEGAL DOCUMENT • DPDP &amp; GLOBAL STANDARD</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-heading tracking-tight leading-tight">
                Privacy Policy
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
                Navya Tech Industry is committed to protecting the privacy, confidentiality, and integrity of visitors, clients, and partners interacting with our digital ecosystem.
              </p>

              {/* Metadata Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-zinc-400">
                <span className="clay-surface px-3 py-1 rounded-lg border border-white/5 text-zinc-300">
                  <strong className="text-white">Effective Date:</strong> 1 October 2026
                </span>
                <span className="clay-surface px-3 py-1 rounded-lg border border-white/5 text-zinc-300">
                  <strong className="text-white">Last Updated:</strong> 1 October 2026
                </span>
                <span className="clay-surface px-3 py-1 rounded-lg border border-white/5 text-zinc-300">
                  <strong className="text-white">Entity:</strong> Navya Tech Industry
                </span>
              </div>
            </div>

            {/* Quick Action Toolbar */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={handlePrint}
                className="clay-btn-secondary px-4 py-2 rounded-xl text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-2 cursor-pointer transition-all"
                title="Print Privacy Policy or save as PDF"
              >
                <Printer className="w-3.5 h-3.5 text-red-400" />
                <span>Print / PDF</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="clay-btn-secondary px-4 py-2 rounded-xl text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-2 cursor-pointer transition-all"
                title="Copy link to Privacy Policy"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-red-400" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 4 Trust Commitments Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="clay-card p-5 border border-white/10 hover:border-red-500/30 transition-all">
            <div className="clay-icon-well w-10 h-10 rounded-xl flex items-center justify-center mb-3">
              <EyeOff className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-sm font-bold text-white font-heading mb-1">Zero Sale of Data</h2>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              We never sell, trade, or monetize your personal information or contact details to third parties under any circumstances.
            </p>
          </div>

          <div className="clay-card p-5 border border-white/10 hover:border-red-500/30 transition-all">
            <div className="clay-icon-well w-10 h-10 rounded-xl flex items-center justify-center mb-3">
              <Lock className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-sm font-bold text-white font-heading mb-1">Project Confidentiality</h2>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Technical credentials, codebase assets, business logic, and operational specs are guarded with restricted access.
            </p>
          </div>

          <div className="clay-card p-5 border border-white/10 hover:border-red-500/30 transition-all">
            <div className="clay-icon-well w-10 h-10 rounded-xl flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-sm font-bold text-white font-heading mb-1">DPDP &amp; Legal Standard</h2>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Engineered to strictly align with India&apos;s Digital Personal Data Protection laws and recognized global privacy standards.
            </p>
          </div>

          <div className="clay-card p-5 border border-white/10 hover:border-red-500/30 transition-all">
            <div className="clay-icon-well w-10 h-10 rounded-xl flex items-center justify-center mb-3">
              <UserCheck className="w-5 h-5 text-cyan-400" />
            </div>
            <h2 className="text-sm font-bold text-white font-heading mb-1">Full User Rights</h2>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              You retain rights to request access, correction, updates, or complete deletion of personal records at any time.
            </p>
          </div>
        </div>

        {/* Content Layout: Sticky Table of Contents (Desktop) + Main Policy Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Table of Contents */}
          <aside className="lg:col-span-4 sticky top-28 hidden lg:block">
            <div className="clay-card p-6 border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-red-400" />
                  Table of Contents
                </span>
                <span className="text-[11px] font-mono text-zinc-500">12 Sections</span>
              </div>

              <nav className="space-y-1 text-xs max-h-[70vh] overflow-y-auto pr-1 scrollbar-thin">
                {SECTIONS.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <div key={sec.id} className="space-y-0.5">
                      <button
                        onClick={() => scrollToSection(sec.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between group cursor-pointer ${
                          isActive
                            ? "bg-red-500/15 text-red-300 font-semibold border-l-2 border-red-500"
                            : "text-zinc-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span className="truncate">
                          <span className="font-mono text-zinc-500 mr-2">{sec.number}.</span>
                          {sec.title}
                        </span>
                        <ChevronRight
                          className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                            isActive
                              ? "text-red-400 translate-x-0.5"
                              : "text-zinc-600 group-hover:text-zinc-300 group-hover:translate-x-0.5"
                          }`}
                        />
                      </button>

                      {/* Subsections if available */}
                      {sec.subsections && (
                        <div className="pl-4 space-y-0.5 border-l border-white/5 ml-2">
                          {sec.subsections.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => scrollToSection(sub.id)}
                              className="w-full text-left px-2 py-1 text-[11px] text-zinc-500 hover:text-zinc-200 transition-colors flex items-center gap-1.5 cursor-pointer truncate"
                            >
                              <span className="font-mono text-zinc-600">{sub.number}</span>
                              <span className="truncate">{sub.title}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Quick Contact Box in Sidebar */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <p className="text-[11px] font-mono text-zinc-400">Privacy Grievance Officer:</p>
                <a
                  href="mailto:nvsharyan@gmail.com?subject=Privacy%20Policy%20/%20Data%20Protection%20Request"
                  className="clay-surface block p-2.5 rounded-xl text-xs text-red-300 hover:text-white border border-red-500/20 truncate transition-colors"
                >
                  nvsharyan@gmail.com
                </a>
              </div>
            </div>
          </aside>

          {/* Right Column: Complete Verbatim Policy Content */}
          <main className="lg:col-span-8 space-y-8 text-zinc-300 leading-relaxed font-light text-sm sm:text-base">
            
            {/* Quick Preamble Alert */}
            <div className="clay-card p-6 border-l-4 border-red-500 bg-red-950/20">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs sm:text-sm text-zinc-300 font-light">
                  <p className="font-semibold text-white">Official Notice &amp; Legal Binding</p>
                  <p>
                    By accessing our website or engaging with our technology solutions, you acknowledge that you have read, understood, and agreed to the practices outlined in this Privacy Policy.
                  </p>
                </div>
              </div>
            </div>

            {/* 1. Introduction */}
            <section id="section-1" className="clay-card p-6 sm:p-8 border border-white/10 space-y-4 scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="clay-badge font-mono text-xs px-2.5 py-1 text-red-300 font-bold">1</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  1. Introduction
                </h2>
              </div>

              <div className="space-y-3.5 text-zinc-300 text-sm sm:text-base font-light">
                <p>
                  <strong>Navya Tech Industry</strong> (&ldquo;Navya Tech&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) respects your privacy and is committed to protecting the personal information of visitors, customers, business partners, and users of our website and services.
                </p>
                <p>
                  This Privacy Policy explains how we collect, use, store, process, disclose, and protect your information when you visit our website, contact us, purchase our services, or interact with our digital platforms.
                </p>
                <p className="p-3.5 rounded-xl clay-surface border border-white/10 text-zinc-200">
                  By accessing our website or using our services, you acknowledge that you have read and understood this Privacy Policy.
                </p>
              </div>
            </section>

            {/* 2. Information We Collect */}
            <section id="section-2" className="clay-card p-6 sm:p-8 border border-white/10 space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="clay-badge font-mono text-xs px-2.5 py-1 text-red-300 font-bold">2</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  2. Information We Collect
                </h2>
              </div>

              <p className="text-zinc-300 text-sm sm:text-base font-light">
                We may collect the following categories of information:
              </p>

              {/* 2.1 Personal Information */}
              <div id="section-2-1" className="clay-surface p-5 sm:p-6 rounded-2xl border border-white/5 space-y-3 scroll-mt-28">
                <h3 className="text-base sm:text-lg font-bold text-white font-heading flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-red-400" />
                  2.1 Personal Information
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-zinc-300 pt-1">
                  {[
                    "Full name",
                    "Email address",
                    "Phone number",
                    "Business or organization name",
                    "Billing and communication address",
                    "Other information voluntarily provided through contact forms or inquiries.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2.2 Business and Project Information */}
              <div id="section-2-2" className="clay-surface p-5 sm:p-6 rounded-2xl border border-white/5 space-y-3 scroll-mt-28">
                <h3 className="text-base sm:text-lg font-bold text-white font-heading flex items-center gap-2">
                  <Building className="w-4 h-4 text-emerald-400" />
                  2.2 Business and Project Information
                </h3>
                <p className="text-sm text-zinc-400">When you engage with our services, we may collect:</p>
                <ul className="space-y-2 text-sm text-zinc-300 pt-1">
                  {[
                    "Project requirements and specifications.",
                    "Business information and operational details.",
                    "Website content, assets, and branding materials.",
                    "Technical credentials and configuration information necessary for service delivery.",
                    "Documents and files shared for project execution.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2.3 Technical Information */}
              <div id="section-2-3" className="clay-surface p-5 sm:p-6 rounded-2xl border border-white/5 space-y-3 scroll-mt-28">
                <h3 className="text-base sm:text-lg font-bold text-white font-heading flex items-center gap-2">
                  <Server className="w-4 h-4 text-cyan-400" />
                  2.3 Technical Information
                </h3>
                <p className="text-sm text-zinc-400">When you visit our website, certain information may be collected automatically:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-zinc-300 pt-1">
                  {[
                    "IP address.",
                    "Browser type and version.",
                    "Operating system and device information.",
                    "Website usage and interaction data.",
                    "Referral URLs and browsing activity.",
                    "Approximate geographical location derived from technical information.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2.4 Cookies and Tracking Technologies */}
              <div id="section-2-4" className="clay-surface p-5 sm:p-6 rounded-2xl border border-white/5 space-y-3 scroll-mt-28">
                <h3 className="text-base sm:text-lg font-bold text-white font-heading flex items-center gap-2">
                  <Cookie className="w-4 h-4 text-amber-400" />
                  2.4 Cookies and Tracking Technologies
                </h3>
                <p className="text-sm text-zinc-300">
                  We may use cookies and similar technologies to improve website functionality, understand visitor behavior, remember preferences, and analyze website performance.
                </p>
                <p className="text-sm text-zinc-400 italic">
                  You can manage or disable cookies through your browser settings. Disabling certain cookies may affect website functionality.
                </p>
              </div>
            </section>

            {/* 3. How We Use Your Information */}
            <section id="section-3" className="clay-card p-6 sm:p-8 border border-white/10 space-y-4 scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="clay-badge font-mono text-xs px-2.5 py-1 text-red-300 font-bold">3</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  3. How We Use Your Information
                </h2>
              </div>

              <p className="text-zinc-300 text-sm sm:text-base font-light">
                We use collected information for legitimate business and operational purposes, including:
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-zinc-300 pt-2">
                {[
                  "Responding to inquiries and service requests.",
                  "Providing website development, design, application development, and other digital services.",
                  "Preparing quotations, proposals, invoices, and agreements.",
                  "Managing client accounts and project communications.",
                  "Providing technical support and maintenance.",
                  "Improving our website, products, and services.",
                  "Analyzing website performance and user experience.",
                  "Preventing fraud, unauthorized access, and security incidents.",
                  "Meeting applicable legal and regulatory requirements.",
                  "Sending relevant service updates and promotional communications where permitted.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 clay-surface p-3 rounded-xl border border-white/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 4. Information Sharing and Disclosure */}
            <section id="section-4" className="clay-card p-6 sm:p-8 border border-white/10 space-y-6 scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="clay-badge font-mono text-xs px-2.5 py-1 text-red-300 font-bold">4</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  4. Information Sharing and Disclosure
                </h2>
              </div>

              <div className="clay-surface p-4 rounded-xl border border-emerald-500/20 text-emerald-300 font-medium text-sm flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Navya Tech Industry does not sell or rent personal information to third parties.</span>
              </div>

              <p className="text-zinc-300 text-sm sm:text-base font-light">
                We may share information in limited circumstances:
              </p>

              {/* 4.1 Service Providers */}
              <div id="section-4-1" className="clay-surface p-5 sm:p-6 rounded-2xl border border-white/5 space-y-3 scroll-mt-28">
                <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                  4.1 Service Providers
                </h3>
                <p className="text-sm text-zinc-300">
                  We may share relevant information with trusted third-party providers supporting our operations, such as:
                </p>
                <ul className="space-y-2 text-sm text-zinc-300 pt-1">
                  {[
                    "Website hosting and cloud infrastructure providers.",
                    "Payment processing services.",
                    "Analytics and performance monitoring platforms.",
                    "Email and communication services.",
                    "Security and technical support providers.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 4.2 Legal Requirements */}
              <div id="section-4-2" className="clay-surface p-5 sm:p-6 rounded-2xl border border-white/5 space-y-3 scroll-mt-28">
                <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                  4.2 Legal Requirements
                </h3>
                <p className="text-sm text-zinc-300">
                  We may disclose information when required by applicable laws, regulations, court orders, or lawful government requests.
                </p>
              </div>

              {/* 4.3 Business Transactions */}
              <div id="section-4-3" className="clay-surface p-5 sm:p-6 rounded-2xl border border-white/5 space-y-3 scroll-mt-28">
                <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                  4.3 Business Transactions
                </h3>
                <p className="text-sm text-zinc-300">
                  Information may be transferred as part of a merger, acquisition, restructuring, or business asset transfer, subject to applicable legal requirements.
                </p>
              </div>
            </section>

            {/* 5. Data Security */}
            <section id="section-5" className="clay-card p-6 sm:p-8 border border-white/10 space-y-4 scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="clay-badge font-mono text-xs px-2.5 py-1 text-red-300 font-bold">5</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  5. Data Security
                </h2>
              </div>

              <p className="text-zinc-300 text-sm sm:text-base font-light">
                We implement reasonable technical and organizational security measures to protect personal information against unauthorized access, alteration, disclosure, loss, and misuse.
              </p>

              <p className="text-zinc-400 text-xs sm:text-sm">
                Depending on the nature of the information and services involved, these measures may include:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-zinc-300 pt-1">
                {[
                  "Secure communication protocols.",
                  "Access controls and authentication.",
                  "Encryption where appropriate.",
                  "Security monitoring.",
                  "Regular maintenance and system updates.",
                  "Restricted access to confidential project information.",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 clay-surface p-3 rounded-xl border border-white/5">
                    <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs sm:text-sm font-light mt-2">
                However, no method of internet transmission or electronic storage is completely secure. We cannot guarantee absolute security.
              </div>
            </section>

            {/* 6. Data Retention */}
            <section id="section-6" className="clay-card p-6 sm:p-8 border border-white/10 space-y-4 scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="clay-badge font-mono text-xs px-2.5 py-1 text-red-300 font-bold">6</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  6. Data Retention
                </h2>
              </div>

              <p className="text-zinc-300 text-sm sm:text-base font-light">
                We retain personal information only for as long as reasonably necessary to:
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-zinc-300 pt-1">
                {[
                  "Provide requested services.",
                  "Maintain business and contractual records.",
                  "Fulfil legal and regulatory obligations.",
                  "Resolve disputes.",
                  "Enforce agreements.",
                  "Maintain security and prevent fraud.",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 clay-surface p-3 rounded-xl border border-white/5">
                    <Database className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-zinc-300 text-sm pt-2">
                When information is no longer required, we will take reasonable steps to delete, anonymize, or securely dispose of it, subject to applicable retention requirements.
              </p>
            </section>

            {/* 7. Third-Party Websites and Services */}
            <section id="section-7" className="clay-card p-6 sm:p-8 border border-white/10 space-y-4 scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="clay-badge font-mono text-xs px-2.5 py-1 text-red-300 font-bold">7</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  7. Third-Party Websites and Services
                </h2>
              </div>

              <div className="space-y-3 text-zinc-300 text-sm sm:text-base font-light">
                <p>
                  Our website may contain links to external websites, platforms, or services.
                </p>
                <p>
                  These third-party platforms operate under their own privacy policies and terms. Navya Tech Industry does not control their privacy practices and is not responsible for their independent data collection or processing activities.
                </p>
                <p className="text-zinc-400 italic">
                  We encourage users to review the privacy policies of external services before sharing personal information.
                </p>
              </div>
            </section>

            {/* 8. Your Privacy Rights */}
            <section id="section-8" className="clay-card p-6 sm:p-8 border border-white/10 space-y-4 scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="clay-badge font-mono text-xs px-2.5 py-1 text-red-300 font-bold">8</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  8. Your Privacy Rights
                </h2>
              </div>

              <p className="text-zinc-300 text-sm sm:text-base font-light">
                Subject to applicable laws, you may have the right to:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-zinc-300 pt-1">
                {[
                  "Request access to your personal information.",
                  "Request correction or updating of inaccurate information.",
                  "Request deletion of personal information where legally permissible.",
                  "Withdraw consent where processing is based on consent.",
                  "Raise concerns regarding the processing of your personal information.",
                  "Submit a grievance relating to privacy or data protection.",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 clay-surface p-3.5 rounded-xl border border-white/5">
                    <UserCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-zinc-300 text-sm pt-2">
                <p>
                  To exercise these rights, contact us using the details provided below.
                </p>
                <p className="text-xs text-zinc-400">
                  We may need to verify your identity before processing certain requests.
                </p>
              </div>
            </section>

            {/* 9. Children's Privacy */}
            <section id="section-9" className="clay-card p-6 sm:p-8 border border-white/10 space-y-4 scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="clay-badge font-mono text-xs px-2.5 py-1 text-red-300 font-bold">9</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  9. Children&apos;s Privacy
                </h2>
              </div>

              <div className="space-y-3 text-zinc-300 text-sm sm:text-base font-light">
                <p>
                  Our website and services are not specifically directed toward children.
                </p>
                <p>
                  We do not knowingly collect personal information from children in circumstances where such collection is prohibited by applicable law. If we become aware that personal information has been collected unlawfully, we will take appropriate steps to address it.
                </p>
              </div>
            </section>

            {/* 10. International Data Transfers */}
            <section id="section-10" className="clay-card p-6 sm:p-8 border border-white/10 space-y-4 scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="clay-badge font-mono text-xs px-2.5 py-1 text-red-300 font-bold">10</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  10. International Data Transfers
                </h2>
              </div>

              <div className="space-y-3 text-zinc-300 text-sm sm:text-base font-light">
                <p>
                  Some third-party service providers may process or store information on servers located outside India.
                </p>
                <p>
                  Where personal information is transferred internationally, we take reasonable steps to ensure that such transfers comply with applicable Indian data protection laws and other relevant legal requirements.
                </p>
              </div>
            </section>

            {/* 11. Changes to This Privacy Policy */}
            <section id="section-11" className="clay-card p-6 sm:p-8 border border-white/10 space-y-4 scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="clay-badge font-mono text-xs px-2.5 py-1 text-red-300 font-bold">11</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  11. Changes to This Privacy Policy
                </h2>
              </div>

              <div className="space-y-3 text-zinc-300 text-sm sm:text-base font-light">
                <p>
                  We may periodically update this Privacy Policy to reflect changes in our business operations, technology, services, or applicable legal requirements.
                </p>
                <p>
                  Any changes will be published on this page with an updated revision date.
                </p>
                <p className="text-zinc-400 italic">
                  We encourage visitors to review this page periodically.
                </p>
              </div>
            </section>

            {/* 12. Contact Information */}
            <section id="section-12" className="clay-card p-6 sm:p-8 border border-red-500/30 space-y-6 scroll-mt-28 bg-gradient-to-b from-transparent to-red-950/10">
              <div className="flex items-center gap-3">
                <span className="clay-badge font-mono text-xs px-2.5 py-1 text-red-300 font-bold">12</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  12. Contact Information
                </h2>
              </div>

              <p className="text-zinc-300 text-sm sm:text-base font-light">
                For privacy-related questions, requests, complaints, or concerns, you can contact us through the following channels:
              </p>

              {/* Interactive Contact Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Company Name */}
                <div className="clay-surface p-4 rounded-2xl border border-white/10 space-y-1">
                  <div className="text-xs font-mono text-zinc-400">Company</div>
                  <div className="text-base font-bold text-white font-heading">
                    Navya Tech Industry
                  </div>
                </div>

                {/* Website */}
                <div className="clay-surface p-4 rounded-2xl border border-white/10 space-y-1">
                  <div className="text-xs font-mono text-zinc-400">Official Website</div>
                  <a
                    href="https://navyatech.co.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-red-400 hover:text-red-300 flex items-center gap-1.5 transition-colors"
                  >
                    <span>https://navyatech.co.in</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Email Address */}
                <div className="clay-surface p-4 rounded-2xl border border-white/10 space-y-2">
                  <div className="text-xs font-mono text-zinc-400 flex items-center justify-between">
                    <span>Direct Email</span>
                    <CopyButton text="nvsharyan@gmail.com" label="Copy" />
                  </div>
                  <a
                    href="mailto:nvsharyan@gmail.com?subject=Privacy%20Policy%20/%20Data%20Protection%20Request"
                    className="text-base font-bold text-white hover:text-red-300 flex items-center gap-2 transition-colors break-all"
                  >
                    <Mail className="w-4 h-4 text-red-400 shrink-0" />
                    <span>nvsharyan@gmail.com</span>
                  </a>
                </div>

                {/* Address */}
                <div className="clay-surface p-4 rounded-2xl border border-white/10 space-y-2">
                  <div className="text-xs font-mono text-zinc-400 flex items-center justify-between">
                    <span>Physical Address</span>
                    <CopyButton text="Colaba Mumbai, Maharashtra 400005" label="Copy" />
                  </div>
                  <div className="text-sm font-medium text-white flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>Colaba Mumbai, Maharashtra 400005</span>
                  </div>
                </div>

                {/* Subject Line Notice */}
                <div className="md:col-span-2 clay-surface p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-mono text-zinc-400 block">Recommended Subject Line</span>
                    <code className="text-xs sm:text-sm font-mono text-red-300 bg-red-950/40 px-2 py-0.5 rounded border border-red-500/20">
                      Privacy Policy / Data Protection Request
                    </code>
                  </div>
                  <a
                    href="mailto:nvsharyan@gmail.com?subject=Privacy%20Policy%20/%20Data%20Protection%20Request"
                    className="clay-btn-primary px-5 py-2.5 rounded-full text-xs font-bold text-white uppercase tracking-wider text-center shrink-0"
                  >
                    Send Email Inquiry
                  </a>
                </div>
              </div>

              <p className="text-xs text-zinc-400 italic">
                We will review and respond to privacy-related requests in accordance with applicable laws.
              </p>

              {/* Bottom Copyright & Terms Modal Cross-Link */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
                <span>&copy; 2026 Navya Tech Industry. All Rights Reserved.</span>
                <button
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent("navya-open-terms"));
                  }}
                  className="hover:text-white underline underline-offset-4 cursor-pointer text-red-400 flex items-center gap-1 font-medium"
                >
                  View Terms &amp; Conditions Agreement &rarr;
                </button>
              </div>
            </section>

          </main>
        </div>
      </div>
    </SubpageLayout>
  );
};

export default PrivacyPolicyPage;

import React, { useState, useEffect } from "react";
import SubpageLayout from "@/components/layout/SubpageLayout";
import SEOHead from "@/components/seo/SEOHead";
import CopyButton from "@/components/ui/copy-button";
import { scrollToTarget } from "@/lib/scroll";
import {
  ShieldCheck,
  FileText,
  Clock,
  CreditCard,
  Layers,
  Sparkles,
  AlertCircle,
  HelpCircle,
  Printer,
  Share2,
  Check,
  ChevronRight,
  ExternalLink,
  Code2,
  Server,
  Lock,
  DollarSign
} from "lucide-react";

interface SectionDef {
  id: string;
  number: string;
  title: string;
}

const SECTIONS: SectionDef[] = [
  { id: "section-1", number: "1", title: "Introduction & Acceptance" },
  { id: "section-2", number: "2", title: "Services & Scope" },
  { id: "section-3", number: "3", title: "Project Initiation & Advance Payment" },
  { id: "section-4", number: "4", title: "Pricing & Out-of-Scope Additions" },
  { id: "section-5", number: "5", title: "Payment Terms & Deliverable Handover" },
  { id: "section-6", number: "6", title: "Delivery Timelines & Rapid Execution" },
  { id: "section-7", number: "7", title: "Client Responsibilities & Assets" },
  { id: "section-8", number: "8", title: "Revisions & Approvals" },
  { id: "section-9", number: "9", title: "AI Agents & Third-Party Providers" },
  { id: "section-10", number: "10", title: "Security Architecture Posture" },
  { id: "section-11", number: "11", title: "Acceptable Use & Compliance" },
  { id: "section-12", number: "12", title: "Confidentiality & Data Protection" },
  { id: "section-13", number: "13", title: "Intellectual Property Rights" },
  { id: "section-14", number: "14", title: "Public Portfolio Showcase" },
  { id: "section-15", number: "15", title: "Refunds & Settlement" },
  { id: "section-16", number: "16", title: "Limitation of Liability" },
  { id: "section-17", number: "17", title: "Governing Law & Dispute Resolution" },
  { id: "section-18", number: "18", title: "Official Inquiries & Contact" },
];

export const TermsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("section-1");
  const [copiedLink, setCopiedLink] = useState(false);

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

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const scrollToSection = (id: string) => {
    scrollToTarget(id, { offset: -90, duration: 0.8 });
  };

  return (
    <SubpageLayout
      breadcrumbs={[
        { label: "Legal", href: "/#legal" },
        { label: "Terms & Conditions" },
      ]}
      showWaitlist={false}
    >
      <SEOHead
        title="Terms & Conditions | Navya Tech Industry"
        description="Official Terms & Conditions and service agreements for Navya Tech Industry technology, development, and AI solutions."
        canonicalPath="/terms"
        keywords={[
          "Navya Tech Industry Terms and Conditions",
          "Navya Tech Terms of Service",
          "Web Development Service Agreement",
          "AI Automation Contract Terms",
          "Milestone Payment Terms India",
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Terms & Conditions | Navya Tech Industry",
          url: "https://www.navyatech.co.in/terms",
          datePublished: "2026-08-01",
          dateModified: "2026-11-15",
          description:
            "Official Terms & Conditions of Navya Tech Industry governing web development, AI workflow automation, milestone payments, and intellectual property transfers.",
          publisher: {
            "@type": "Organization",
            name: "Navya Tech Industry",
            url: "https://www.navyatech.co.in",
            logo: "https://www.navyatech.co.in/logoimg.png",
          },
        }}
      />

      <div className="w-full pt-6 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-zinc-200">
        {/* Header Hero Banner */}
        <div className="clay-card p-6 sm:p-10 md:p-12 mb-10 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase bg-red-950/40 border border-red-500/30 text-red-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Legally Binding Service Agreement</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white font-heading tracking-tight">
                Terms &amp; Conditions
              </h1>
              <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                These Terms govern the use of our website, engagement with our engineering solutions, milestone payments, intellectual property rights, and AI automation deliverables.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pt-2">
                <span>Effective Date: <strong>August 1, 2026</strong></span>
                <span>•</span>
                <span>Last Updated: <strong>November 15, 2026</strong></span>
                <span>•</span>
                <span>Jurisdiction: <strong>India</strong></span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex md:flex-col gap-2 shrink-0">
              <button
                onClick={handlePrint}
                className="clay-badge px-4 py-2 text-xs font-mono text-zinc-300 hover:text-white flex items-center justify-center gap-2 cursor-pointer transition-colors"
                title="Print Terms"
              >
                <Printer className="w-3.5 h-3.5 text-zinc-400" />
                <span>Print Document</span>
              </button>
              <button
                onClick={handleCopyLink}
                className="clay-badge px-4 py-2 text-xs font-mono text-zinc-300 hover:text-white flex items-center justify-center gap-2 cursor-pointer transition-colors"
                title="Copy Link to Clipboard"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Share Terms</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Table of Contents Sticky Sidebar */}
          <div className="hidden lg:block lg:col-span-4 sticky top-24">
            <div className="clay-card p-5 border border-white/10 rounded-2xl space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400">
                  Document Navigation
                </span>
                <span className="text-[10px] font-mono text-zinc-500">18 Clauses</span>
              </div>
              <nav className="space-y-1">
                {SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2.5 cursor-pointer ${
                      activeSection === sec.id
                        ? "bg-red-500/20 text-white font-bold border border-red-500/40 shadow-sm"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                    }`}
                  >
                    <span className="text-zinc-500 text-[10px] w-4">{sec.number}.</span>
                    <span className="truncate flex-1">{sec.title}</span>
                    {activeSection === sec.id && (
                      <ChevronRight className="w-3 h-3 text-red-400 shrink-0" />
                    )}
                  </button>
                ))}
              </nav>

              <div className="pt-3 border-t border-white/10 text-center">
                <a
                  href="/privacy-policy"
                  className="text-xs font-mono text-zinc-400 hover:text-red-300 underline underline-offset-4 flex items-center justify-center gap-1"
                >
                  <span>View Privacy Policy</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Main Legal Clauses */}
          <div className="lg:col-span-8 space-y-8">
            {/* Clause 1 */}
            <section id="section-1" className="clay-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>Clause 01</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                1. Introduction &amp; Acceptance of Terms
              </h2>
              <div className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed space-y-3">
                <p>
                  Welcome to <strong>Navya Tech Industry</strong> (“Navya,” “we,” “us,” or “our”). Navya Tech Industry provides engineering, digital automation, artificial intelligence systems, and Internet marketing solutions to businesses worldwide.
                </p>
                <p>
                  These Terms &amp; Conditions (“Terms”) govern your access to our website (<a href="https://navyatech.co.in" className="text-red-400 underline">https://navyatech.co.in</a>), consultation sessions, project quotations, and any software, AI automation, or web application developed by us.
                </p>
                <p className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/30 text-red-200 font-normal">
                  By commissioning a project, approving a proposal, transferring advance milestone payment, or engaging our consulting services, you certify that you have read, understood, and agreed to be legally bound by these Terms.
                </p>
              </div>
            </section>

            {/* Clause 2 */}
            <section id="section-2" className="clay-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Clause 02</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                2. Services &amp; Scope of Work
              </h2>
              <div className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed space-y-3">
                <p>
                  Navya Tech Industry provides bespoke technological architectures. Our services encompass:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                    <span className="text-xs font-mono font-bold text-white uppercase block">Website Solutions</span>
                    <p className="text-[11px] text-zinc-400 leading-normal">
                      Full-stack engineering, responsive business websites, high-conversion ecommerce platforms, custom web applications, and UI/UX modernization.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                    <span className="text-xs font-mono font-bold text-white uppercase block">Internet Marketing &amp; GEO</span>
                    <p className="text-[11px] text-zinc-400 leading-normal">
                      Technical SEO, Generative Engine Optimization (GEO), schema architecture, LLM citation structuring, and conversion rate optimization.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                    <span className="text-xs font-mono font-bold text-white uppercase block">AI &amp; Voice Automation</span>
                    <p className="text-[11px] text-zinc-400 leading-normal">
                      Multi-agent conversational workflows, autonomous inbound qualification pipelines, and bidirectional CRM synchronization.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                    <span className="text-xs font-mono font-bold text-white uppercase block">Technology Architecture</span>
                    <p className="text-[11px] text-zinc-400 leading-normal">
                      Defensive infrastructure architecture, API integrations, cloud deployments, and high-performance server configurations.
                    </p>
                  </div>
                </div>
                <p className="pt-2 text-zinc-400 text-xs">
                  Exact deliverables, screens, technical dependencies, and milestones are governed by the specific project proposal or Statement of Work (SOW).
                </p>
              </div>
            </section>

            {/* Clause 3 */}
            <section id="section-3" className="clay-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
                <CreditCard className="w-4 h-4" />
                <span>Clause 03</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                3. Project Initiation &amp; Advance Payment
              </h2>
              <div className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed space-y-3">
                <p>
                  Engineering resources and production scheduling are allocated only upon verified receipt of project initiation funds:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-zinc-300">
                  <li>Standard project commencement requires a <strong>50% advance payment</strong>.</li>
                  <li>Advance payments confirm the client's commercial intent and secure engineering availability.</li>
                  <li>Technical discovery, repository setup, and prototyping do not commence until advance funds and necessary onboarding assets are received.</li>
                  <li>The remaining <strong>50% balance is payable prior to final deployment</strong>, production domain linking, or repository ownership transfer.</li>
                </ul>
              </div>
            </section>

            {/* Clause 4 */}
            <section id="section-4" className="clay-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
                <DollarSign className="w-4 h-4" />
                <span>Clause 04</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                4. Pricing &amp; Out-of-Scope Additions
              </h2>
              <div className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed space-y-3">
                <p>
                  All quotations reflect the exact functional specifications itemized in the proposal. Additional requirements—including extra pages, custom third-party integrations, proprietary font licenses, hosting fees, domain acquisitions, and third-party AI API token costs (e.g. OpenAI, Anthropic, ElevenLabs)—are billed separately.
                </p>
                <p>
                  Scope modifications requested during development will be documented via a formal Change Request detailing additional costs and timeline adjustments.
                </p>
              </div>
            </section>

            {/* Clause 5 */}
            <section id="section-5" className="clay-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
                <Code2 className="w-4 h-4" />
                <span>Clause 05</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                5. Payment Terms &amp; Deliverable Handover
              </h2>
              <div className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed space-y-3">
                <p>
                  Upon completion of development and staging review, the client is granted access to review the fully functioning build in our staging environment.
                </p>
                <p>
                  Final transfer of source code, admin privileges, domain DNS pointing, and live deployment will take place immediately upon clearance of the remaining 50% milestone balance.
                </p>
              </div>
            </section>

            {/* Clause 6 */}
            <section id="section-6" className="clay-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Clause 06</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                6. Delivery Timelines &amp; Rapid Execution
              </h2>
              <div className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed space-y-3">
                <p>
                  Navya Tech Industry prides itself on rapid technical execution, including <strong>24-hour delivery on qualifying rapid-turnaround solutions</strong>.
                </p>
                <p>
                  Delivery timelines commence only when all client prerequisites (branding assets, copy, credentials, third-party keys) have been completely furnished. Delays in asset provision or review feedback automatically extend delivery targets.
                </p>
              </div>
            </section>

            {/* Clause 7 */}
            <section id="section-7" className="clay-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>Clause 07</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                7. Client Responsibilities &amp; Content Rights
              </h2>
              <div className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed space-y-3">
                <p>
                  The client warrants that all text, imagery, graphics, trademarks, and media supplied to Navya Tech Industry are owned by the client or legally licensed. Navya Tech Industry assumes no liability for copyright infringement arising from client-provided materials.
                </p>
              </div>
            </section>

            {/* Clause 8 */}
            <section id="section-8" className="clay-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
                <Check className="w-4 h-4" />
                <span>Clause 08</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                8. Revisions &amp; Sign-Off Policy
              </h2>
              <div className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed space-y-3">
                <p>
                  Standard project packages include up to <strong>3 rounds of revisions</strong> within the defined functional scope. Revisions must be consolidated and communicated in writing within 7 business days of staging delivery.
                </p>
              </div>
            </section>

            {/* Clause 9 */}
            <section id="section-9" className="clay-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Clause 09</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                9. AI Agents &amp; Third-Party Providers
              </h2>
              <div className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed space-y-3">
                <p>
                  AI automation systems engineered by Navya may interface with foundation model providers (OpenAI, Anthropic, Google Cloud, Meta). Clients acknowledge that third-party foundation models are subject to external API rate limits, pricing revisions, and model hallucinations. Navya constructs defensive validations and human-in-the-loop controls but is not liable for upstream model outages.
                </p>
              </div>
            </section>

            {/* Clause 10 */}
            <section id="section-10" className="clay-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
                <Lock className="w-4 h-4" />
                <span>Clause 10</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                10. Security Architecture Posture
              </h2>
              <div className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed space-y-3">
                <p>
                  We build according to industry security best practices (HTTPS, parameter sanitization, rate-limiting, least-privilege role configuration). However, no digital architecture can guarantee absolute invulnerability against zero-day exploits, server host outages, or compromised client credentials.
                </p>
              </div>
            </section>

            {/* Clause 11 */}
            <section id="section-11" className="clay-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" />
                <span>Clause 11</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                11. Acceptable Use &amp; Compliance
              </h2>
              <div className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed space-y-3">
                <p>
                  Clients may not utilize software or workflows engineered by Navya Tech Industry for fraudulent schemes, spam dissemination, phishing, unlawful surveillance, or illegal activities under the Indian Information Technology Act or relevant international law.
                </p>
              </div>
            </section>

            {/* Clause 12 */}
            <section id="section-12" className="clay-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
                <Server className="w-4 h-4" />
                <span>Clause 12</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                12. Confidentiality &amp; Data Protection
              </h2>
              <div className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed space-y-3">
                <p>
                  Both parties covenant to maintain strict confidentiality regarding proprietary business logic, strategic roadmaps, confidential trade secrets, and user data, adhering to the Digital Personal Data Protection (DPDP) Act of India and international data governance standards.
                </p>
                <p>
                  For full details regarding data privacy, refer to our{" "}
                  <a href="/privacy-policy" className="text-red-400 underline font-medium">
                    Privacy Policy
                  </a>.
                </p>
              </div>
            </section>

            {/* Clause 13 */}
            <section id="section-13" className="clay-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
                <Code2 className="w-4 h-4" />
                <span>Clause 13</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                13. Intellectual Property Rights
              </h2>
              <div className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed space-y-3">
                <p>
                  Upon complete settlement of all agreed invoice fees, full ownership of custom code, graphics, and bespoke assets transfers to the client. Navya Tech Industry retains ownership of pre-existing boilerplates, core libraries, and generic automation frameworks integrated into the build.
                </p>
              </div>
            </section>

            {/* Clause 14 */}
            <section id="section-14" className="clay-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Clause 14</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                14. Public Portfolio Showcase
              </h2>
              <div className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed space-y-3">
                <p>
                  Unless explicit non-disclosure agreements (NDAs) are executed prior to project kickoff, Navya Tech Industry reserves the right to exhibit completed, non-confidential deliverables in our verified showcase portfolio. Proprietary keyword research and internal backend secrets are strictly guarded.
                </p>
              </div>
            </section>

            {/* Clause 15 */}
            <section id="section-15" className="clay-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
                <CreditCard className="w-4 h-4" />
                <span>Clause 15</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                15. Refunds &amp; Settlement Policy
              </h2>
              <div className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed space-y-3">
                <p>
                  Because web development and AI engineering involve non-recoverable developer time, infrastructure provisioning, and architectural design, advance milestone fees are non-refundable once technical work has commenced.
                </p>
              </div>
            </section>

            {/* Clause 16 */}
            <section id="section-16" className="clay-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" />
                <span>Clause 16</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                16. Limitation of Liability
              </h2>
              <div className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed space-y-3">
                <p>
                  To the maximum extent permitted by applicable law, Navya Tech Industry and its founder Aryan Singh shall not be liable for indirect, incidental, punitive, or consequential damages (including loss of business profits or data interruption) arising out of the performance or non-performance of third-party platforms or digital marketing ranking algorithms. Total aggregate liability is limited to the fees actually paid to Navya Tech Industry for the specific project under dispute.
                </p>
              </div>
            </section>

            {/* Clause 17 */}
            <section id="section-17" className="clay-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Clause 17</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                17. Governing Law &amp; Dispute Resolution
              </h2>
              <div className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed space-y-3">
                <p>
                  These Terms shall be interpreted and governed in accordance with the laws of the Republic of <strong>India</strong>. Any disputes arising hereunder shall be subject to amicable mutual negotiation and the jurisdiction of competent courts located in India.
                </p>
              </div>
            </section>

            {/* Clause 18 */}
            <section id="section-18" className="clay-card p-6 sm:p-8 rounded-2xl border border-red-500/30 space-y-4 bg-zinc-950/90">
              <div className="flex items-center gap-2.5 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>Clause 18</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                18. Official Inquiries &amp; Legal Notices
              </h2>
              <div className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed space-y-3">
                <p>
                  For formal contract notices, clarifications, or custom enterprise terms:
                </p>
                <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-2 font-mono text-xs">
                  <p className="font-bold text-white">Navya Tech Industry</p>
                  <p>Legal &amp; Engineering Administration</p>
                  <p className="flex items-center gap-2">
                    <span>Phone:</span>
                    <a href="tel:+917451812065" className="text-red-400 hover:underline">+91 74518 12065</a>
                    <CopyButton text="+91 74518 12065" label="Copy Phone" />
                  </p>
                  <p className="flex items-center gap-2">
                    <span>Email:</span>
                    <a href="mailto:navyatechindustry@gmail.com" className="text-red-400 hover:underline">navyatechindustry@gmail.com</a>
                    <CopyButton text="navyatechindustry@gmail.com" label="Copy Email" />
                  </p>
                  <p>
                    <span>Direct Founder Consultation:</span>{" "}
                    <a href="/contact" className="text-red-400 hover:underline font-bold">
                      https://navyatech.co.in/contact &rarr;
                    </a>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </SubpageLayout>
  );
};

export default TermsPage;

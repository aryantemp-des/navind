import React, { useEffect } from "react";
import { ShieldCheck, Check, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface TermsModalProps {
  isOpen: boolean;
  onAccept: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onAccept }) => {
  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop (Clicking outside does NOT dismiss - only 'I Accept' dismisses) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Floating Terms Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 25 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="clay-card relative z-10 w-full max-w-4xl max-h-[88vh] flex flex-col overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-white/10"
          >
            {/* Header */}
            <div className="clay-surface px-6 py-4 border-b border-white/10 flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="clay-icon-well w-10 h-10 flex items-center justify-center rounded-xl shrink-0">
                  <FileText className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white font-heading flex items-center gap-2">
                    Terms &amp; Conditions
                    <span className="clay-badge px-2 py-0.5 text-[10px] font-mono text-red-300">
                      August 2026
                    </span>
                  </h2>
                  <p className="text-xs text-zinc-400 font-light">
                    Navya Tech Industry • Technology, Automation &amp; AI Agreement
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                <ShieldCheck className="w-4 h-4" />
                <span>Official Policy</span>
              </div>
            </div>

            {/* Scrollable Terms & Conditions Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed scrollbar-thin">
              
              {/* Introduction Banner */}
              <div className="clay-surface p-5 rounded-2xl border border-red-500/20 space-y-2">
                <h3 className="text-base font-bold text-white font-heading">
                  # Terms &amp; Conditions
                </h3>
                <p className="text-xs text-zinc-400 font-mono">
                  <strong>Navya Tech Industry</strong> • <em>Last Updated: August 2026</em>
                </p>
              </div>

              {/* 1. Introduction */}
              <section className="space-y-3">
                <h3 className="text-base font-bold text-white font-heading text-red-400">
                  1. Introduction
                </h3>
                <p>
                  Welcome to <strong>Navya Tech Industry</strong> (“Navya,” “we,” “us,” or “our”).
                </p>
                <p>
                  Navya Tech Industry provides technology, digital, automation, artificial intelligence, and security-related services to businesses and organizations.
                </p>
                <p>
                  These Terms &amp; Conditions (“Terms”) govern the use of our website, engagement with our services, and any project, subscription, consultation, development, or technology solution provided by Navya Tech Industry.
                </p>
                <p>
                  By engaging Navya Tech Industry, approving a proposal, making a payment, or using our services, you acknowledge that you have read, understood, and agreed to these Terms.
                </p>
                <p className="text-red-300 font-medium">
                  If you do not agree with these Terms, you should not use our services.
                </p>
              </section>

              {/* 2. Our Services */}
              <section className="space-y-4">
                <h3 className="text-base font-bold text-white font-heading text-red-400">
                  2. Our Services
                </h3>
                <p>
                  Navya Tech Industry provides technology solutions designed to help businesses operate more efficiently, serve customers better, improve digital experiences, and grow.
                </p>
                <p>Our services may include, but are not limited to:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div className="clay-surface p-4 rounded-xl space-y-2">
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
                      Digital &amp; Web Development
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-zinc-400 text-xs">
                      <li>Business &amp; Corporate websites</li>
                      <li>Landing pages &amp; Portfolio websites</li>
                      <li>E-commerce websites &amp; Web applications</li>
                      <li>Interactive and premium websites</li>
                      <li>Custom digital experiences</li>
                      <li>Website maintenance and optimization</li>
                    </ul>
                  </div>

                  <div className="clay-surface p-4 rounded-xl space-y-2">
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
                      AI &amp; Automation
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-zinc-400 text-xs">
                      <li>AI agents &amp; AI-powered customer support</li>
                      <li>Business process &amp; workflow automation</li>
                      <li>AI integrations &amp; internal business assistants</li>
                      <li>Lead-generation &amp; customer-engagement systems</li>
                      <li>Custom AI-powered solutions</li>
                    </ul>
                  </div>

                  <div className="clay-surface p-4 rounded-xl space-y-2">
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
                      Security &amp; Technology Architecture
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-zinc-400 text-xs">
                      <li>Security architecture &amp; application security</li>
                      <li>Infrastructure architecture &amp; secure design</li>
                      <li>Security assessments &amp; consulting</li>
                      <li>Risk-reduction and security recommendations</li>
                    </ul>
                  </div>

                  <div className="clay-surface p-4 rounded-xl space-y-2">
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
                      Technology Consulting
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-zinc-400 text-xs">
                      <li>Digital transformation &amp; Technology strategy</li>
                      <li>System architecture &amp; software integrations</li>
                      <li>Performance optimization &amp; consulting</li>
                      <li>Custom technology solutions</li>
                    </ul>
                  </div>
                </div>

                <p className="text-xs text-zinc-400">
                  The exact services, features, deliverables, timelines, and pricing applicable to a project will be defined in the relevant proposal, quotation, statement of work, or written agreement.
                </p>
              </section>

              {/* 3. Project Scope */}
              <section className="space-y-3">
                <h3 className="text-base font-bold text-white font-heading text-red-400">
                  3. Project Scope
                </h3>
                <p>Each project is based on the agreed scope of work, specifying deliverables, features, technology requirements, screens, integrations, AI/security functionality, revisions, timeline, pricing, and support.</p>
                <p>Requests outside the agreed scope may be treated as additional work requiring additional fees and development time.</p>
              </section>

              {/* 4. Project Initiation & Advance Payment */}
              <section className="space-y-3">
                <h3 className="text-base font-bold text-white font-heading text-red-400">
                  4. Project Initiation &amp; Advance Payment
                </h3>
                <ul className="list-disc list-inside space-y-1.5 text-zinc-300">
                  <li>A project begins after <strong>50% advance payment</strong> has been received.</li>
                  <li>The advance payment confirms the client's intent to proceed.</li>
                  <li>Work may not begin until the required payment and project information have been received.</li>
                  <li>The remaining <strong>50% balance is payable before final delivery, deployment, transfer of ownership, or handover of production credentials</strong>, unless otherwise agreed in writing.</li>
                </ul>
              </section>

              {/* 5. Pricing & Additional Costs */}
              <section className="space-y-3">
                <h3 className="text-base font-bold text-white font-heading text-red-400">
                  5. Pricing &amp; Additional Costs
                </h3>
                <p>All pricing relates only to services explicitly described in the applicable quotation. Additional costs apply for out-of-scope pages, major design overhauls, extra revisions, third-party APIs/hosting/domains, premium software, cloud infrastructure, AI model/API consumption, and external tools.</p>
              </section>

              {/* 6. Payment Terms */}
              <section className="space-y-3">
                <h3 className="text-base font-bold text-white font-heading text-red-400">
                  6. Payment Terms
                </h3>
                <p>50% is payable before commencement; 50% before final delivery. Production deployments, source code transfers, credentials, or ownership transfers may be withheld until outstanding balances are settled.</p>
              </section>

              {/* 7. Delivery Timeline */}
              <section className="space-y-3">
                <h3 className="text-base font-bold text-white font-heading text-red-400">
                  7. Delivery Timeline &amp; Rapid Delivery
                </h3>
                <p>For eligible projects, our target is rapid execution, including <strong>24-hour delivery where the project qualifies</strong>. Delivery timelines depend on complexity, client responsiveness, integrations, and asset availability. Our priority is speed without sacrificing security or quality.</p>
              </section>

              {/* 8. Client Responsibilities */}
              <section className="space-y-3">
                <h3 className="text-base font-bold text-white font-heading text-red-400">
                  8. Client Responsibilities
                </h3>
                <p>The client agrees to provide accurate brand assets, content, credentials, API keys, and required information, and certifies legal rights to all materials provided.</p>
              </section>

              {/* 9. Revisions & Changes */}
              <section className="space-y-3">
                <h3 className="text-base font-bold text-white font-heading text-red-400">
                  9. Revisions &amp; Changes
                </h3>
                <p>Up to <strong>3 reasonable revisions</strong> within the original scope are included. Major conceptual alterations or post-approval changes may incur additional charges.</p>
              </section>

              {/* 10. Website & Software Development */}
              <section className="space-y-3">
                <h3 className="text-base font-bold text-white font-heading text-red-400">
                  10. Website &amp; Software Development
                </h3>
                <p>Navya Tech Industry develops reliable, responsive digital products and resolves defects attributable to our implementation.</p>
              </section>

              {/* 11 & 12. AI Agents & Third-Party Providers */}
              <section className="space-y-3">
                <h3 className="text-base font-bold text-white font-heading text-red-400">
                  11 &amp; 12. AI Agents, Outputs &amp; Third-Party Providers
                </h3>
                <p>AI solutions may rely on third-party models and infrastructure. AI outputs should be reviewed where accuracy is critical. Navya is not liable for upstream provider outages, model shifts, or API price modifications.</p>
              </section>

              {/* 13. Security Architecture */}
              <section className="space-y-3">
                <h3 className="text-base font-bold text-white font-heading text-red-400">
                  13. Security Architecture &amp; Cybersecurity Services
                </h3>
                <p>Security services improve system posture and reduce risk. However, no architecture can guarantee absolute immunity against zero-days, human error, or unauthorized external breaches.</p>
              </section>

              {/* 14. Acceptable Use */}
              <section className="space-y-3">
                <h3 className="text-base font-bold text-white font-heading text-red-400">
                  14. Acceptable Use
                </h3>
                <p>Clients must not use our services for unlawful, fraudulent, malicious, or abusive activities, malware distribution, phishing, or unauthorized system access.</p>
              </section>

              {/* 15. Client Data & Confidentiality */}
              <section className="space-y-3">
                <h3 className="text-base font-bold text-white font-heading text-red-400">
                  15 &amp; 26. Confidentiality &amp; Data Protection
                </h3>
                <p>Both parties agree to protect confidential technical and business data. Applicable Indian digital and data-protection requirements apply.</p>
              </section>

              {/* 17. Intellectual Property */}
              <section className="space-y-3">
                <h3 className="text-base font-bold text-white font-heading text-red-400">
                  17. Intellectual Property
                </h3>
                <p>Upon full payment, custom deliverables are transferred to the client, excluding third-party libraries, open-source tools, and pre-existing Navya frameworks.</p>
              </section>

              {/* 18 & 19. Performance & Publicity */}
              <section className="space-y-3">
                <h3 className="text-base font-bold text-white font-heading text-red-400">
                  18 &amp; 19. Portfolio &amp; Business Results
                </h3>
                <p>Completed non-confidential work may be presented in our portfolio. While our systems maximize efficiency and yield, commercial sales and rankings depend on external market factors.</p>
              </section>

              {/* 23 & 24. Refunds & Liability */}
              <section className="space-y-3">
                <h3 className="text-base font-bold text-white font-heading text-red-400">
                  23 &amp; 24. Refunds &amp; Limitation of Liability
                </h3>
                <p>Payments for commenced work are non-refundable. To the maximum extent permitted by law, liability for consequential or indirect losses is excluded.</p>
              </section>

              {/* 27. Governing Law */}
              <section className="space-y-3">
                <h3 className="text-base font-bold text-white font-heading text-red-400">
                  27. Governing Law
                </h3>
                <p>These Terms are governed by the applicable laws of <strong>India</strong>, under the jurisdiction of competent courts.</p>
              </section>

              {/* 31. Contact Information */}
              <section className="clay-surface p-5 rounded-2xl space-y-2 border border-white/10">
                <h3 className="text-base font-bold text-white font-heading">
                  31. Contact
                </h3>
                <p>For questions regarding these Terms, projects, services, or agreements:</p>
                <div className="pt-1 text-xs font-mono text-zinc-300 space-y-1">
                  <p><strong>Navya Tech Industry</strong></p>
                  <p>Phone: +91 9355412903</p>
                  <p>Email: hello@navyatech.co.in</p>
                </div>
                <div className="pt-3 border-t border-white/10 text-xs text-zinc-400">
                  <p className="font-bold text-white">Next-gen Automation, Value &amp; Yield Architecture</p>
                  <p className="italic">Less manual work. Smarter systems. Higher yield.</p>
                </div>
              </section>

            </div>

            {/* Sticky Accept Footer (Only way to close the popup) */}
            <div className="clay-surface px-6 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>By clicking accept, you agree to the Navya Tech Industry Terms &amp; Conditions.</span>
              </div>

              <button
                onClick={onAccept}
                className="clay-btn-primary w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-white text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(239,68,68,0.5)] hover:scale-105 transition-all shrink-0"
              >
                <Check className="w-4 h-4" />
                <span>I Accept the Terms &amp; Conditions</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TermsModal;

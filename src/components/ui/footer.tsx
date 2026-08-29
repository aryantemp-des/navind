import React from "react";
import CopyButton from "@/components/ui/copy-button";
import { Phone, MessageSquare, Mail } from "lucide-react";

export interface FooterProps {
  onOpenTerms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerms }) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      if (window.__lenis) {
        window.__lenis.scrollTo(element, { offset: -70, duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="w-full bg-transparent text-white pt-10 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto clay-card p-8 sm:p-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-white/10">
          
          {/* Brand & Positioning */}
          <div className="lg:col-span-2 space-y-6">
            <div className="clay-icon-well inline-flex items-center p-3 rounded-2xl">
              <img
                src="/logoimg.png"
                alt="Navya Tech Industry Logo"
                width={160}
                height={48}
                className="h-9 w-auto object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
                loading="lazy"
              />
            </div>

            <p className="text-sm text-zinc-300 font-light leading-relaxed max-w-sm">
              A technology company that builds digital experiences people use and intelligent systems businesses rely on. Next-gen automation, AI agents, and web engineering.
            </p>

            {/* Direct Contact & Copy Actions */}
            <div className="space-y-2 pt-2">
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="tel:+919355412903"
                  className="clay-badge inline-flex items-center gap-1.5 px-3 py-1 text-xs text-zinc-300 hover:text-white"
                >
                  <Phone className="w-3.5 h-3.5 text-red-400" />
                  <span>+91 93554 12903</span>
                </a>
                <CopyButton text="+919355412903" label="Copy Phone" />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="mailto:hello@navyatech.co.in"
                  className="clay-badge inline-flex items-center gap-1.5 px-3 py-1 text-xs text-zinc-300 hover:text-white"
                >
                  <Mail className="w-3.5 h-3.5 text-red-400" />
                  <span>hello@navyatech.co.in</span>
                </a>
                <CopyButton text="hello@navyatech.co.in" label="Copy Email" />
              </div>
            </div>
          </div>

          {/* Column 2: Capabilities */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-200 mb-5">
              Capabilities
            </h4>
            <ul className="space-y-3 text-sm font-light text-zinc-400">
              <li>
                <button onClick={() => scrollTo("services")} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  Digital Experiences
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("services")} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  AI Agents &amp; Automation
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("services")} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  Security Architecture
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("body-hero")} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  3D &amp; WebGL Systems
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("features-cards")} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  Performance &amp; SEO Growth
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-200 mb-5">
              Solutions
            </h4>
            <ul className="space-y-3 text-sm font-light text-zinc-400">
              <li>
                <button onClick={() => scrollTo("ai-section")} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  Autonomous Lead Intake
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("ai-section")} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  Workflow Orchestration
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("ai-section")} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  Automated Communications
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("pricing")} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  Enterprise Web Packages
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("pricing")} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  Custom AI Agent Bundles
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Commercial Packages */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-200 mb-5">
              Packages
            </h4>
            <ul className="space-y-3 text-sm font-light text-zinc-400">
              <li>
                <button onClick={() => scrollTo("pricing")} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  Website Package — $1,000
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("pricing")} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  AI Agents Package — $1,000
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("pricing")} className="hover:text-red-400 font-medium hover:translate-x-1 transition-all cursor-pointer">
                  Full Ecosystem — $1,500
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("pricing")} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  Maintenance — $50 / req
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("final-project")} className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                  Custom Enterprise Quote
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div className="flex flex-wrap items-center gap-3">
            <span>© 2026 Navya Tech Industry. All rights reserved.</span>
            <span className="text-zinc-600">•</span>
            <button
              onClick={onOpenTerms}
              className="text-red-400 hover:text-red-300 underline underline-offset-4 cursor-pointer font-medium"
            >
              Terms &amp; Conditions
            </button>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">Last updated: August 2026</span>
          </div>

          <div className="flex items-center">
            <span>Next-gen Automation, Value &amp; Yield Architecture</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

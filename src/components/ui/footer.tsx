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
                <a href="/services/website-development" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block">
                  Website Development
                </a>
              </li>
              <li>
                <a href="/services/website-design" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block">
                  Website Design Systems
                </a>
              </li>
              <li>
                <a href="/services/3d-website-development" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block">
                  3D &amp; WebGL Engineering
                </a>
              </li>
              <li>
                <a href="/services/custom-web-development" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block">
                  Custom Web Engineering
                </a>
              </li>
              <li>
                <a href="/services/website-performance-optimization" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block">
                  Performance &amp; SEO
                </a>
              </li>
              <li>
                <a href="/services/website-maintenance" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block">
                  Ongoing Maintenance ($50)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Industries */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-200 mb-5">
              Industries
            </h4>
            <ul className="space-y-3 text-sm font-light text-zinc-400">
              <li>
                <a href="/industries/startups" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block">
                  Startups &amp; Scaleups
                </a>
              </li>
              <li>
                <a href="/industries/saas" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block">
                  SaaS Platforms
                </a>
              </li>
              <li>
                <a href="/industries/small-business" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block">
                  Small &amp; Local Business
                </a>
              </li>
              <li>
                <a href="/industries/restaurants" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block">
                  Restaurants &amp; Menus
                </a>
              </li>
              <li>
                <a href="/industries/real-estate" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block">
                  Real Estate &amp; Virtual Tours
                </a>
              </li>
              <li>
                <a href="/industries/technology" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block">
                  Technology Companies
                </a>
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
                <a href="/pricing" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block">
                  Global Pricing ($1,000)
                </a>
              </li>
              <li>
                <a href="/pricing/india" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block">
                  India Pricing (₹79k)
                </a>
              </li>
              <li>
                <a href="/pricing/usa" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block">
                  USA Pricing ($1,000)
                </a>
              </li>
              <li>
                <a href="/pricing/3d-website" className="hover:text-red-400 font-medium hover:translate-x-1 transition-all cursor-pointer block">
                  3D Website Pricing
                </a>
              </li>
              <li>
                <a href="/pricing/business-website" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block">
                  Business Website Plans
                </a>
              </li>
              <li>
                <a href="/pricing/ecommerce" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block">
                  Ecommerce Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Ecosystem & Routes */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-200 mb-5">
              Explore &amp; Action
            </h4>
            <ul className="space-y-3 text-sm font-light text-zinc-400">
              <li>
                <a href="/resources" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block text-red-300 font-medium">
                  Resource Center
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block">
                  Blog &amp; Insights
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block">
                  Services Directory
                </a>
              </li>
              <li>
                <a href="/industries" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block">
                  Industries Directory
                </a>
              </li>
              <li>
                <a href="/request-a-quote" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block">
                  Request a Quote
                </a>
              </li>
              <li>
                <a href="/book-a-call" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block">
                  Book Strategy Call
                </a>
              </li>
              <li>
                <a href="/get-started" className="hover:text-red-400 font-medium hover:translate-x-1 transition-all cursor-pointer block">
                  Start a Project &rarr;
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div className="flex flex-wrap items-center gap-3">
            <span>© 2026 Navya Tech Industry. All rights reserved.</span>
            <span className="text-zinc-600">•</span>
            <span>Crafted with ❤️ in Navya Tech Industry</span>
            <span className="text-zinc-600">•</span>
            <button
              onClick={onOpenTerms}
              className="text-red-400 hover:text-red-300 underline underline-offset-4 cursor-pointer font-medium"
            >
              Terms &amp; Conditions
            </button>
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

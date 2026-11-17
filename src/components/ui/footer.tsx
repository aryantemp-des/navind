import React from "react";
import { useRoute } from "@/context/RouteContext";
import { scrollToTarget } from "@/lib/scroll";

export interface FooterProps {
  onOpenTerms?: () => void;
}

interface FlagItem {
  name: string;
  emoji: string;
  icon: React.ReactNode;
}

const INTERNATIONAL_FLAGS: FlagItem[] = [
  {
    name: "India",
    emoji: "🇮🇳",
    icon: (
      <svg className="w-6 h-4 rounded-[3px] border border-white/10 shadow-sm overflow-hidden shrink-0" viewBox="0 0 24 16" fill="none" aria-hidden="true">
        <rect width="24" height="5.33" fill="#FF9933" />
        <rect y="5.33" width="24" height="5.34" fill="#FFFFFF" />
        <rect y="10.67" width="24" height="5.33" fill="#138808" />
        <circle cx="12" cy="8" r="2.2" stroke="#000088" strokeWidth="0.6" fill="none" />
        <circle cx="12" cy="8" r="0.6" fill="#000088" />
        <path d="M12 5.9v4.2M9.9 8h4.2M10.5 6.5l3 3M10.5 9.5l3-3" stroke="#000088" strokeWidth="0.35" />
      </svg>
    ),
  },
  {
    name: "Germany",
    emoji: "🇩🇪",
    icon: (
      <svg className="w-6 h-4 rounded-[3px] border border-white/10 shadow-sm overflow-hidden shrink-0" viewBox="0 0 24 16" fill="none" aria-hidden="true">
        <rect width="24" height="5.33" fill="#000000" />
        <rect y="5.33" width="24" height="5.34" fill="#DD0000" />
        <rect y="10.67" width="24" height="5.33" fill="#FFCE00" />
      </svg>
    ),
  },
  {
    name: "Italy",
    emoji: "🇮🇹",
    icon: (
      <svg className="w-6 h-4 rounded-[3px] border border-white/10 shadow-sm overflow-hidden shrink-0" viewBox="0 0 24 16" fill="none" aria-hidden="true">
        <rect width="8" height="16" fill="#009246" />
        <rect x="8" width="8" height="16" fill="#FFFFFF" />
        <rect x="16" width="8" height="16" fill="#CE2B37" />
      </svg>
    ),
  },
  {
    name: "Luxembourg",
    emoji: "🇱🇺",
    icon: (
      <svg className="w-6 h-4 rounded-[3px] border border-white/10 shadow-sm overflow-hidden shrink-0" viewBox="0 0 24 16" fill="none" aria-hidden="true">
        <rect width="24" height="5.33" fill="#ED2939" />
        <rect y="5.33" width="24" height="5.34" fill="#FFFFFF" />
        <rect y="10.67" width="24" height="5.33" fill="#00A1DE" />
      </svg>
    ),
  },
  {
    name: "France",
    emoji: "🇫🇷",
    icon: (
      <svg className="w-6 h-4 rounded-[3px] border border-white/10 shadow-sm overflow-hidden shrink-0" viewBox="0 0 24 16" fill="none" aria-hidden="true">
        <rect width="8" height="16" fill="#0055A5" />
        <rect x="8" width="8" height="16" fill="#FFFFFF" />
        <rect x="16" width="8" height="16" fill="#EF4135" />
      </svg>
    ),
  },
  {
    name: "United States",
    emoji: "🇺🇸",
    icon: (
      <svg className="w-6 h-4 rounded-[3px] border border-white/10 shadow-sm overflow-hidden shrink-0" viewBox="0 0 24 16" fill="none" aria-hidden="true">
        <rect width="24" height="16" fill="#FFFFFF" />
        <rect y="0" width="24" height="1.23" fill="#B22234" />
        <rect y="2.46" width="24" height="1.23" fill="#B22234" />
        <rect y="4.92" width="24" height="1.23" fill="#B22234" />
        <rect y="7.38" width="24" height="1.23" fill="#B22234" />
        <rect y="9.85" width="24" height="1.23" fill="#B22234" />
        <rect y="12.31" width="24" height="1.23" fill="#B22234" />
        <rect y="14.77" width="24" height="1.23" fill="#B22234" />
        <rect width="10" height="8.62" fill="#3C3B6E" />
        <circle cx="2" cy="2" r="0.65" fill="#FFFFFF" />
        <circle cx="5" cy="2" r="0.65" fill="#FFFFFF" />
        <circle cx="8" cy="2" r="0.65" fill="#FFFFFF" />
        <circle cx="3.5" cy="4.3" r="0.65" fill="#FFFFFF" />
        <circle cx="6.5" cy="4.3" r="0.65" fill="#FFFFFF" />
        <circle cx="2" cy="6.6" r="0.65" fill="#FFFFFF" />
        <circle cx="5" cy="6.6" r="0.65" fill="#FFFFFF" />
        <circle cx="8" cy="6.6" r="0.65" fill="#FFFFFF" />
      </svg>
    ),
  },
];

export const Footer: React.FC<FooterProps> = () => {
  const { navigate } = useRoute();
  const scrollTo = (id: string) => {
    scrollToTarget(id, { offset: -85, duration: 1.1 });
  };

  return (
    <footer className="w-full bg-transparent text-white pt-10 pb-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto clay-card p-5 sm:p-8 lg:p-12">
        
        {/* Top Grid: Brand (2 cols) + 4 Balanced Navigation Columns (1 col each) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 sm:gap-6 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand & Positioning */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-6">
            <a
              href="/"
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  scrollTo("landing-hero");
                }
              }}
              className="clay-icon-well inline-flex items-center p-3 rounded-2xl group focus:outline-none"
              aria-label="Navya Tech Industry Home"
            >
              <img
                src="/logoimg.png"
                alt="Navya Tech Industry Logo"
                width={160}
                height={48}
                className="h-9 w-auto object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform"
                loading="lazy"
              />
            </a>

            <p className="text-sm text-zinc-300 font-light leading-relaxed max-w-sm">
              A technology company that builds digital experiences people use and intelligent systems businesses rely on. Next-gen automation, AI agents, and web engineering.
            </p>

            {/* International Country Flags */}
            <div
              className="flex items-center gap-2 pt-0.5 flex-wrap"
              role="list"
              aria-label="International client & market presence"
            >
              {INTERNATIONAL_FLAGS.map((flag) => (
                <div
                  key={flag.name}
                  role="listitem"
                  className="group relative flex items-center justify-center p-1 rounded-md bg-white/[0.04] border border-white/10 hover:border-white/30 hover:bg-white/[0.08] hover:scale-105 transition-all duration-200 cursor-default"
                  title={`${flag.emoji} ${flag.name}`}
                  aria-label={flag.name}
                >
                  {flag.icon}
                  <span className="sr-only">{flag.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 1 of 4: Approved Services */}
          <div className="sm:col-span-1 lg:col-span-1">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-200 mb-5">
              Services
            </h4>
            <ul className="space-y-3 text-xs font-light text-zinc-400">
              <li>
                <a href="/services/website-development" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block leading-snug">
                  Website Development
                </a>
              </li>
              <li>
                <a href="/services/ecommerce-website-development" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block leading-snug">
                  Ecommerce Website Dev
                </a>
              </li>
              <li>
                <a href="/services/business-website-development" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block leading-snug">
                  Business Website Dev
                </a>
              </li>
              <li>
                <a href="/services/website-redesign" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block leading-snug">
                  Website Redesign
                </a>
              </li>
              <li>
                <a href="/services/web-app-development" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block leading-snug">
                  Web App Development
                </a>
              </li>
              <li>
                <a href="/services/seo" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block leading-snug">
                  SEO Services
                </a>
              </li>
              <li>
                <a href="/services/geo" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block leading-snug">
                  GEO Services
                </a>
              </li>
              <li>
                <a href="/services/aeo" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block leading-snug">
                  AEO Services
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 of 4: Industries */}
          <div className="sm:col-span-1 lg:col-span-1">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-200 mb-5">
              Industries
            </h4>
            <ul className="space-y-3 text-xs font-light text-zinc-400">
              <li>
                <a href="/industries/saas" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block leading-snug">
                  SaaS &amp; Voice Automation
                </a>
              </li>
              <li>
                <a href="/industries/real-estate" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block leading-snug">
                  Real Estate &amp; Luxury
                </a>
              </li>
              <li>
                <a href="/industries/healthcare" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block leading-snug">
                  Healthcare &amp; Clinics
                </a>
              </li>
              <li>
                <a href="/industries/ecommerce" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block leading-snug">
                  E-commerce &amp; Retail
                </a>
              </li>
              <li>
                <a href="/industries/professional-services" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block leading-snug">
                  Professional Services
                </a>
              </li>
              <li>
                <a href="/industries/education" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block leading-snug">
                  Education &amp; Academics
                </a>
              </li>
              <li>
                <a href="/industries/technology" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block leading-snug">
                  Technology &amp; AI Labs
                </a>
              </li>
              <li>
                <a href="/industries/small-business" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block leading-snug">
                  Small Businesses
                </a>
              </li>
              <li>
                <a href="/industries/restaurants" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block leading-snug">
                  Restaurant &amp; Hospitality
                </a>
              </li>
              <li>
                <a href="/industries/consulting" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block leading-snug">
                  Consulting &amp; Advisory
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 of 4: Quotations & Pricing */}
          <div className="sm:col-span-1 lg:col-span-1">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-200 mb-5">
              Quotations &amp; Pricing
            </h4>
            <ul className="space-y-3 text-xs font-light text-zinc-400">
              <li>
                <a href="/pricing" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block leading-snug font-medium text-red-300">
                  Get a Custom Quote
                </a>
              </li>
              <li>
                <a href="/pricing#consult-decision-makers" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block leading-snug">
                  Talk to Our Decision Makers
                </a>
              </li>
              <li>
                <a href="/pricing#quotation-wizard" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block leading-snug">
                  Four-Step Quotation Flow
                </a>
              </li>
              <li>
                <a href="/pricing#pricing-insights" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block leading-snug">
                  Previous Month's Average ($2,500)
                </a>
              </li>
              <li>
                <a href="/pricing" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block leading-snug">
                  Pocket-Friendly Quotations
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 of 4: Explore & Action */}
          <div className="sm:col-span-1 lg:col-span-1">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-200 mb-5">
              Explore &amp; Action
            </h4>
            <ul className="space-y-3 text-xs font-light text-zinc-400">
              <li>
                <a href="/resources" className="hover:text-white text-red-300 font-bold hover:translate-x-1 transition-all cursor-pointer block leading-snug">
                  Resource Center &rarr;
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block leading-snug">
                  Blog &amp; Insights
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block leading-snug">
                  Services Directory
                </a>
              </li>
              <li>
                <a href="/industries" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block leading-snug">
                  Industries Directory
                </a>
              </li>
              <li>
                <a href="/request-a-quote" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block leading-snug">
                  Request a Quote
                </a>
              </li>
              <li>
                <a href="/book-a-call" className="hover:text-white hover:translate-x-1 transition-all cursor-pointer block leading-snug">
                  Book Strategy Call
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white font-bold hover:translate-x-1 transition-all cursor-pointer block leading-snug text-red-300">
                  Contact Founder Directly &rarr;
                </a>
              </li>
              <li>
                <a href="/get-started" className="hover:text-white font-black hover:translate-x-1 transition-all cursor-pointer block leading-snug text-red-400 tracking-wide uppercase text-[11px] pt-0.5">
                  Start a Project &rarr;
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Regional Internet Marketing Hubs & SEO Corridors */}
        <div className="py-8 border-b border-white/10 text-xs font-light text-zinc-400">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
            <span className="font-mono text-xs font-bold text-zinc-200 uppercase tracking-wider">
              Internet Marketing Hubs:
            </span>
            <span className="text-zinc-300 text-[11px]">
              Pan-India digital growth, technical SEO, and conversion web architectures.
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href="/internet-marketing-company-india" className="hover:text-red-400 transition-colors">
              Internet Marketing India
            </a>
            <span className="text-zinc-700">•</span>
            <a href="/internet-marketing-company-maharashtra" className="hover:text-red-400 transition-colors">
              Maharashtra
            </a>
            <span className="text-zinc-700">•</span>
            <a href="/internet-marketing-company-mumbai" className="hover:text-red-400 transition-colors">
              Mumbai
            </a>
            <span className="text-zinc-700">•</span>
            <a href="/internet-marketing-company-pune" className="hover:text-red-400 transition-colors">
              Pune
            </a>
            <span className="text-zinc-700">•</span>
            <a href="/internet-marketing-company-uttar-pradesh" className="hover:text-red-400 transition-colors">
              Uttar Pradesh
            </a>
            <span className="text-zinc-700">•</span>
            <a href="/internet-marketing-company-bareilly" className="hover:text-red-400 transition-colors">
              Bareilly
            </a>
            <span className="text-zinc-700">•</span>
            <a href="/internet-marketing-company-delhi" className="hover:text-red-400 transition-colors">
              Delhi NCR
            </a>
            <span className="text-zinc-700">•</span>
            <a href="/internet-marketing-company-himachal-pradesh" className="hover:text-red-400 transition-colors">
              Himachal Pradesh
            </a>
          </div>
        </div>

        {/* Bottom Bar: Single Authoritative Legal & Copyright Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 leading-relaxed">
            <span>© {new Date().getFullYear()} Navya Tech Industry. All rights reserved.</span>
            <span className="text-zinc-600">•</span>
            <span>Crafted with ❤️ in Navya Tech Industry</span>
            <span className="text-zinc-600">•</span>
            <a
              href="/terms"
              onClick={(e) => {
                e.preventDefault();
                navigate("/terms");
              }}
              className="text-zinc-400 hover:text-white underline underline-offset-4 cursor-pointer transition-colors"
            >
              Terms &amp; Conditions
            </a>
            <span className="text-zinc-600">•</span>
            <a
              href="/privacy-policy"
              onClick={(e) => {
                e.preventDefault();
                navigate("/privacy-policy");
              }}
              className="text-zinc-400 hover:text-white underline underline-offset-4 cursor-pointer transition-colors"
            >
              Privacy Policy
            </a>
          </div>

          <div className="flex items-center text-zinc-500 text-[11px] shrink-0">
            <span>Next-gen Automation, Value &amp; Yield Architecture</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

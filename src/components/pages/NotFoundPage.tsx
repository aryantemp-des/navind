import React from "react";
import { ArrowRight, Home, Phone, MessageSquare, Compass, Search, HelpCircle } from "lucide-react";
import SubpageLayout from "@/components/layout/SubpageLayout";
import SEOHead from "@/components/seo/SEOHead";
import { FOUNDER_CONFIG } from "@/config/founder";

export const NotFoundPage: React.FC = () => {
  const approvedServices = [
    { name: "Website Development", href: "/services/website-development", desc: "Next.js & full-stack platforms" },
    { name: "Ecommerce Website Development", href: "/services/ecommerce-website-development", desc: "0% commission storefronts" },
    { name: "Business Website Development", href: "/services/business-website-development", desc: "Lead generation engines" },
    { name: "Website Redesign", href: "/services/website-redesign", desc: "Modernize with 100% SEO safety" },
    { name: "Web App Development", href: "/services/web-app-development", desc: "Scalable interactive web applications" },
    { name: "Internet Marketing Bundle", href: "/services/internet-marketing-bundle", desc: "Unified SEO + GEO omni-growth" },
    { name: "SEO (Search Engine Optimization)", href: "/services/seo", desc: "Organic search ranking & technical schema" },
    { name: "GEO (Generative Engine Optimization)", href: "/services/geo", desc: "Optimization for AI answers & citations" },
    { name: "AEO (Answer Engine Optimization)", href: "/services/aeo", desc: "Optimization for direct AI answers & voice search" },
  ];

  const quickLinks = [
    { label: "Homepage", href: "/", icon: Home },
    { label: "Get a Custom Quote", href: "/pricing", icon: ArrowRight },
    { label: "Contact Founder Directly", href: "/contact", icon: Phone },
    { label: "Resource Center", href: "/resources", icon: Compass },
    { label: "Blog & Insights", href: "/blog", icon: Search },
    { label: "SaaS & Voice Automation", href: "/industries/saas", icon: Compass },
  ];

  return (
    <SubpageLayout breadcrumbs={[{ label: "404 Not Found" }]}>
      <SEOHead
        title="Page Not Found (404) | Navya Tech Industry"
        description="The page you requested could not be found on Navya Tech Industry. Browse our approved website solutions, SEO services, or contact our team directly."
        canonicalPath="/404"
        robots="noindex, nofollow"
      />

      <section className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Badge & Big 404 Display */}
          <div className="space-y-4">
            <div className="clay-badge inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-red-300 font-mono">
              <HelpCircle className="w-3.5 h-3.5 text-red-400" />
              Error 404 • Destination Not Found
            </div>

            <h1 className="text-6xl sm:text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-600 font-heading tracking-tight drop-shadow-2xl">
              404
            </h1>

            <h2 className="text-2xl sm:text-4xl font-bold text-white font-heading">
              Oops! We Couldn't Find That Page
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 font-light max-w-xl mx-auto leading-relaxed">
              The link you followed may be broken, outdated, or the page may have been relocated during our services catalog update. Let's get you back on track.
            </p>
          </div>

          {/* Core Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="/"
              className="clay-btn-primary px-8 py-3.5 rounded-full font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(239,68,68,0.45)] hover:scale-105 transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Return to Homepage</span>
            </a>

            <a
              href="/pricing"
              className="clay-btn-secondary px-7 py-3.5 rounded-full font-medium text-white text-xs uppercase tracking-wider flex items-center gap-2 border border-white/10 hover:border-red-500/50 hover:scale-105 transition-all"
            >
              <span>Get a Custom Quote</span>
              <ArrowRight className="w-4 h-4 text-red-400" />
            </a>

            <a
              href="/contact"
              className="clay-btn-secondary px-7 py-3.5 rounded-full font-medium text-white text-xs uppercase tracking-wider flex items-center gap-2 border border-white/10 hover:border-amber-500/50 hover:scale-105 transition-all"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Contact Founder</span>
            </a>
          </div>

          {/* Quick Shortcuts */}
          <div className="pt-8">
            <div className="p-6 rounded-3xl bg-zinc-950/80 border border-white/10 text-left space-y-6">
              <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400 block mb-1">
                    VERIFIED DIRECTORY
                  </span>
                  <h3 className="text-lg font-bold text-white font-heading">
                    Explore Approved Offerings &amp; Destinations
                  </h3>
                </div>
                <span className="text-xs font-mono text-zinc-400">
                  9 Approved Services • 10 Industry Hubs
                </span>
              </div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {approvedServices.map((service) => (
                  <a
                    key={service.href}
                    href={service.href}
                    className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-red-500/40 hover:bg-white/[0.04] transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-red-300 transition-colors flex items-center justify-between">
                        <span>{service.name}</span>
                        <ArrowRight className="w-3 h-3 text-red-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-[11px] text-zinc-400 font-light mt-1">
                        {service.desc}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Quick Route Pills */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-zinc-400 mr-2">Quick Links:</span>
                {quickLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="px-3 py-1.5 rounded-full text-xs font-mono bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/5 hover:border-white/20 transition-all flex items-center gap-1.5"
                  >
                    <item.icon className="w-3 h-3 text-red-400" />
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Direct Founder Assistance Bar */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-red-950/30 via-zinc-950 to-zinc-900 border border-red-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div>
              <span className="text-xs font-mono text-red-400 font-bold uppercase block">
                Need immediate help finding something?
              </span>
              <p className="text-xs text-zinc-300 font-light mt-0.5">
                Connect directly with founder Aryan Singh via call or WhatsApp.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={FOUNDER_CONFIG.phone.link}
                className="px-4 py-2 rounded-full text-xs font-mono text-white bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-red-400" />
                <span>{FOUNDER_CONFIG.phone.display}</span>
              </a>
              <a
                href={FOUNDER_CONFIG.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full text-xs font-mono text-emerald-300 bg-emerald-950/40 border border-emerald-500/40 hover:bg-emerald-950/70 transition-colors flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </SubpageLayout>
  );
};

export default NotFoundPage;

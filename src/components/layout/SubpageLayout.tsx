import React from "react";
import GlobalHeader from "@/components/ui/global-header";
import Footer from "@/components/ui/footer";
import FloatingChatbot from "@/components/ui/floating-chatbot";
import ScrollProgress from "@/components/ui/scroll-progress";
import ScrollToTop from "@/components/ui/scroll-to-top";
import CookieBanner from "@/components/ui/cookie-banner";
import GlobalSearch from "@/components/ui/global-search";
import SmoothScrollProvider from "@/components/ui/smooth-scroll";
import TermsModal from "@/components/ui/terms-modal";
import GlobalPlexusBg from "@/components/ui/global-plexus-bg";
import StickyMobileCTA from "@/components/ui/sticky-mobile-cta";
import SubpageBreadcrumbs, { BreadcrumbItem } from "@/components/ui/subpage-breadcrumbs";
import WaitlistHero from "@/components/ui/waitlist-hero";

export interface SubpageLayoutProps {
  children: React.ReactNode;
  breadcrumbs: BreadcrumbItem[];
  showWaitlist?: boolean;
}

export const SubpageLayout: React.FC<SubpageLayoutProps> = ({
  children,
  breadcrumbs,
  showWaitlist = true,
}) => {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [termsOpen, setTermsOpen] = React.useState(false);

  // Global Ctrl+K / Cmd+K listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleAcceptTerms = () => {
    localStorage.setItem("navya-terms-accepted", "true");
    setTermsOpen(false);
  };

  return (
    <div
      className="relative min-h-screen text-foreground selection:bg-red-600/30 selection:text-red-200 overflow-x-hidden"
      style={{ background: "transparent" }}
    >
      {/* 1. Global Plexus Background */}
      <GlobalPlexusBg />

      {/* 2. Lenis Smooth Scroll Provider */}
      <SmoothScrollProvider />

      {/* 3. Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* 4. Global Header Navigation */}
      <GlobalHeader onOpenSearch={() => setSearchOpen(true)} />

      {/* 5. Subpage Breadcrumb Navigation */}
      <SubpageBreadcrumbs items={breadcrumbs} />

      {/* 6. Main Content Area */}
      <main className="relative w-full">{children}</main>

      {/* 7. Conversion Waitlist / Inquiry Section */}
      {showWaitlist && (
        <div id="final-project">
          <WaitlistHero />
        </div>
      )}

      {/* 8. Global Footer */}
      <Footer onOpenTerms={() => setTermsOpen(true)} />

      {/* 9. Global Search Modal (⌘K) */}
      <GlobalSearch
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onOpenTerms={() => setTermsOpen(true)}
      />

      {/* 10. Scroll To Top Button */}
      <ScrollToTop />

      {/* 11. Minimal Cookie Banner */}
      <CookieBanner />

      {/* 12. Floating AI Chatbot (Navya Assistant) */}
      <FloatingChatbot />

      {/* 13. Sticky Mobile CTA for Mobile Screens */}
      <StickyMobileCTA />

      {/* 14. Terms & Conditions Modal */}
      <TermsModal isOpen={termsOpen} onAccept={handleAcceptTerms} />
    </div>
  );
};

export default SubpageLayout;

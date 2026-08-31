import React, { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight, Sparkles, Layers, ShieldCheck, DollarSign, Bot, Globe, Phone, FileText, Briefcase, Building2, ShoppingBag, Code, Wrench, Zap, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { allSubpages } from "@/config/subpages";

interface SearchItem {
  id: string;
  title: string;
  category: "Capability" | "Package" | "Architecture" | "Solution" | "Contact" | "Service" | "Industry" | "Commercial";
  description: string;
  targetId?: string;
  path?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const BASE_SEARCH_ITEMS: SearchItem[] = [
  {
    id: "services-web",
    title: "Digital Experiences & Web Engineering",
    category: "Capability",
    description: "High-performance websites and platforms engineered with Next.js, WebGL 3D, and Core Web Vitals.",
    targetId: "services",
    icon: Globe,
  },
  {
    id: "services-ai",
    title: "AI Agents & Autonomous Automation",
    category: "Capability",
    description: "Autonomous agents that handle customer intake, qualification, and ERP/CRM synchronization.",
    targetId: "services",
    icon: Bot,
  },
  {
    id: "services-sec",
    title: "Security Architecture & Zero-Trust",
    category: "Capability",
    description: "Secure-by-design infrastructure built with zero-trust principles and audit readiness.",
    targetId: "services",
    icon: ShieldCheck,
  },
  {
    id: "pricing-web",
    title: "Website Package ($1,000 / ₹10k)",
    category: "Package",
    description: "Complete modern digital presence with Next.js, 3D WebGL, and lifetime source ownership.",
    path: "/pricing",
    icon: DollarSign,
  },
  {
    id: "pricing-bundle",
    title: "Full Ecosystem Bundle ($1,500 / ₹1,19k)",
    category: "Package",
    description: "Complete package: Website + AI Agents pipeline together with priority engineering.",
    path: "/pricing",
    icon: Zap,
  },
];

// Generate searchable index from all 44 subpages
const SUBPAGE_SEARCH_ITEMS: SearchItem[] = Object.entries(allSubpages).map(([path, config]) => {
  let cat: SearchItem["category"] = "Commercial";
  let icon = Globe;

  if (path.startsWith("/services")) {
    cat = "Service";
    icon = Wrench;
  } else if (path.startsWith("/industries")) {
    cat = "Industry";
    icon = Building2;
  } else if (path.startsWith("/pricing")) {
    cat = "Package";
    icon = DollarSign;
  } else if (["/contact", "/get-started", "/request-a-quote", "/book-a-call"].includes(path)) {
    cat = "Contact";
    icon = Phone;
  }

  return {
    id: `subpage-${path}`,
    title: config.h1,
    category: cat,
    description: config.heroDescription,
    path: path,
    icon: icon,
  };
});

const SEARCH_DATABASE: SearchItem[] = [
  ...BASE_SEARCH_ITEMS,
  {
    id: "ai-workflow",
    title: "The Navya Intelligent Workflow Architecture",
    category: "Architecture",
    description: "6-step autonomous pipeline: Ingestion → AI Agents → Workflows → Automation → Communication → Outcome.",
    targetId: "ai-section",
    icon: Bot,
  },
  {
    id: "contact-direct",
    title: "Direct Engineering Call (+91 93554 12903)",
    category: "Contact",
    description: "Call Navya Tech Industry directly for consultation and project kickoff.",
    targetId: "tel",
    path: "tel:+919355412903",
    icon: Phone,
  },
  {
    id: "terms-conditions",
    title: "Terms & Conditions (Official Agreement)",
    category: "Solution",
    description: "Review Navya Tech Industry's legal, project scope, AI usage, and delivery terms.",
    targetId: "terms",
    icon: FileText,
  },
  ...SUBPAGE_SEARCH_ITEMS,
];

export const GlobalSearch: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onOpenTerms?: () => void;
}> = ({
  isOpen,
  onClose,
  onOpenTerms,
}) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Keyboard shortcut listener (Escape to close, Ctrl/Cmd+K to toggle)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredItems = SEARCH_DATABASE.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const handleSelect = (item: SearchItem) => {
    onClose();
    if (item.targetId === "terms") {
      onOpenTerms?.();
      return;
    }
    if (item.path) {
      if (item.path.startsWith("tel:") || item.path.startsWith("http")) {
        window.location.href = item.path;
      } else {
        window.location.href = item.path;
      }
      return;
    }
    if (item.targetId) {
      const el = document.getElementById(item.targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Search Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="clay-card relative z-10 w-full max-w-2xl overflow-hidden shadow-2xl border border-white/10"
          >
            {/* Search Input Bar */}
            <div className="clay-surface p-4 border-b border-white/10 flex items-center gap-3">
              <Search className="w-5 h-5 text-red-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Navya capabilities, pricing, AI workflows, or contact..."
                aria-label="Search Navya Tech Industry capabilities, pricing, and services"
                className="w-full bg-transparent text-white placeholder-zinc-500 text-sm sm:text-base outline-none font-sans"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search input"
                  className="p-1 text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono text-zinc-400 bg-white/5 border border-white/10">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="max-h-[60vh] overflow-y-auto p-3 space-y-1.5 scrollbar-thin">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className="w-full text-left p-3.5 rounded-2xl hover:bg-white/5 transition-all flex items-start justify-between gap-3 group cursor-pointer"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="clay-icon-well w-10 h-10 flex items-center justify-center rounded-xl shrink-0 group-hover:scale-105 transition-transform">
                          <Icon className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white font-heading group-hover:text-red-200 transition-colors">
                              {item.title}
                            </h4>
                            <span className="clay-badge px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-red-300">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400 font-light mt-1 line-clamp-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all shrink-0 mt-2" />
                    </button>
                  );
                })
              ) : (
                <div className="py-12 text-center text-zinc-500">
                  <p className="text-sm">No matching results for "{query}"</p>
                  <p className="text-xs text-zinc-600 mt-1">Try searching for "AI", "Pricing", "Web", or "Contact".</p>
                </div>
              )}
            </div>

            {/* Footer Tip */}
            <div className="clay-surface px-4 py-2.5 border-t border-white/10 text-right text-[11px] font-mono text-zinc-500">
              Navya Global Navigation Engine
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GlobalSearch;

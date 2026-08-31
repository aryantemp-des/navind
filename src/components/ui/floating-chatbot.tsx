import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Sparkles, Bot, ArrowRight, Minimize2, CheckCircle2, Globe, Layers, ArrowUpRight, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRoute } from "@/context/RouteContext";
import { queryAssistantNavigation, AssistantPageItem } from "@/config/assistant-registry";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  primaryPage?: AssistantPageItem;
  relatedPages?: AssistantPageItem[];
  options?: { label: string; action: string; route?: string }[];
}

const GREETINGS = [
  "👋 Hi there! Welcome to Navya Tech.",
  "How may I help you today?",
  "Looking for AI Automation or Web Systems?",
  "Need a quick quote on our packages?",
];

export const FloatingChatbot: React.FC = () => {
  const { navigate } = useRoute();
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [showSecondMessage, setShowSecondMessage] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-1",
      sender: "bot",
      text: "👋 Welcome to Navya Tech Industry!",
      timestamp: "Just now",
    },
    {
      id: "m-2",
      sender: "bot",
      text: "I am your AI assistant and intelligent website navigator. How may I help you today? Ask about our web engineering, 3D systems, industry solutions, commercial packages, or request a custom quote.",
      timestamp: "Just now",
      options: [
        { label: "⚡ Build Website", action: "route_/build-website", route: "/build-website" },
        { label: "🔮 3D Interactive Web", action: "route_/3d-website", route: "/3d-website" },
        { label: "💼 Commercial Pricing ($1,000+)", action: "route_/pricing", route: "/pricing" },
        { label: "🚀 Start a Project", action: "route_/get-started", route: "/get-started" },
        { label: "📞 Direct Call (+91 93554 12903)", action: "direct_call" },
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsPopupVisible(false);
      setShowSecondMessage(false);
      return;
    }

    let isMounted = true;
    let timerId: ReturnType<typeof setTimeout> | null = null;

    const startMessageSequence = () => {
      if (!isMounted) return;
      setIsPopupVisible(true);
      setShowSecondMessage(false);
      timerId = setTimeout(() => {
        if (!isMounted) return;
        setShowSecondMessage(true);
        timerId = setTimeout(() => {
          if (!isMounted) return;
          setIsPopupVisible(false);
          setShowSecondMessage(false);
          timerId = setTimeout(() => {
            if (!isMounted) return;
            startMessageSequence();
          }, 5000);
        }, 3500);
      }, 1800);
    };

    timerId = setTimeout(() => {
      startMessageSequence();
    }, 1200);

    return () => {
      isMounted = false;
      if (timerId) clearTimeout(timerId);
    };
  }, [isOpen]);

  const handleAction = (action: string, route?: string) => {
    if (action === "direct_call") {
      window.location.href = "tel:+919355412903";
      return;
    }
    if (action === "direct_whatsapp") {
      window.open(`https://wa.me/919355412903?text=${encodeURIComponent("Hi we would like to know more about services")}`, "_blank");
      return;
    }

    if (action.startsWith("route_") || route) {
      const targetRoute = route || action.replace("route_", "");
      navigate(targetRoute);
      return;
    }

    if (action.startsWith("scroll_")) {
      const targetId = action.replace("scroll_", "");
      const map: Record<string, { id: string; path: string }> = {
        pricing: { id: "pricing", path: "/pricing" },
        contact: { id: "final-project", path: "/get-started" },
        ai: { id: "ai-section", path: "/services/web-app-development" },
        services: { id: "services", path: "/services" },
        features: { id: "features-cards", path: "/services/website-performance-optimization" },
      };
      const target = map[targetId];
      if (window.location.pathname === "/" && target) {
        const el = document.getElementById(target.id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
      if (target) {
        navigate(target.path);
        return;
      }
    }
    handleUserSubmit(action);
  };

  const handleUserSubmit = (overrideText?: string) => {
    const query = overrideText || inputValue.trim();
    if (!query) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!overrideText) setInputValue("");
    setIsTyping(true);

    const discovery = queryAssistantNavigation(query);

    setTimeout(() => {
      setIsTyping(false);
      const botResponse: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: discovery.botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        primaryPage: discovery.primaryPage || undefined,
        relatedPages: discovery.relatedPages.length > 0 ? discovery.relatedPages : undefined,
        options: discovery.suggestedOptions,
      };

      setMessages((prev) => [...prev, botResponse]);

      if (discovery.directNavigateRoute) {
        setTimeout(() => {
          navigate(discovery.directNavigateRoute!);
        }, 600);
      }
    }, 600);
  };

  return (
    <div className="fixed bottom-16 right-4 sm:bottom-6 sm:right-6 z-50 font-sans flex flex-col items-end">
      <AnimatePresence>
        {isPopupVisible && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", damping: 20, stiffness: 260 }}
            onClick={() => setIsOpen(true)}
            className="mb-3 max-w-[290px] clay-card p-3.5 shadow-2xl cursor-pointer group hover:scale-[1.03] transition-transform duration-300 relative border border-red-500/40 bg-black/90 backdrop-blur-xl"
            role="button"
            aria-label="Open Navya AI Assistant chat preview"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsPopupVisible(false);
                setShowSecondMessage(false);
              }}
              className="absolute -top-2 -right-2 w-5 h-5 bg-zinc-900 border border-white/20 rounded-full text-zinc-400 hover:text-white flex items-center justify-center text-[10px] cursor-pointer"
              aria-label="Dismiss greeting"
            >
              ×
            </button>
            <div className="flex items-start gap-2.5">
              <div className="clay-icon-well w-8 h-8 rounded-xl flex items-center justify-center shrink-0 p-1 bg-black/50 border border-red-400/30">
                <img src="/logoimg.png" alt="Navya Bot" className="w-full h-full object-contain filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" />
              </div>
              <div className="space-y-1.5 flex-1 overflow-hidden">
                <p className="text-xs font-semibold text-white leading-snug">{GREETINGS[0]}</p>
                <AnimatePresence>
                  {showSecondMessage && (
                    <motion.p
                      initial={{ opacity: 0, y: 6, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: 4, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="text-xs text-red-200/95 font-light leading-snug pt-1 border-t border-white/10"
                    >
                      {GREETINGS[1]}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-red-400 group-hover:text-red-300 font-medium">
              <span>Ask a question or explore</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-[94vw] sm:w-[410px] h-[580px] max-h-[84vh] rounded-3xl flex flex-col overflow-hidden mb-3 border border-red-500/40 shadow-[0_15px_45px_rgba(220,38,38,0.45),0_0_30px_rgba(239,68,68,0.25)] bg-gradient-to-b from-[#881337] via-[#991b1b] to-[#450a0a] backdrop-blur-xl"
          >
            <div className="px-5 py-4 bg-black/40 border-b border-red-400/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="clay-icon-well w-10 h-10 p-1.5 flex items-center justify-center overflow-hidden bg-black/60 border border-red-400/30">
                    <img src="/logoimg.png" alt="Navya Bot" className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-zinc-950" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5 font-heading">
                    Navya AI Assistant
                    <Sparkles className="w-3 h-3 text-amber-300" />
                  </h3>
                  <p className="text-[11px] text-red-200 font-light flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    Intelligent Page Navigator
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setIsOpen(false)} className="p-1.5 text-red-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1.5 text-red-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs scrollbar-thin scrollbar-thumb-red-900/60 bg-black/25">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                  <div className={`max-w-[90%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-line ${msg.sender === "user" ? "bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-br-none font-medium shadow-md" : "bg-black/75 border border-red-400/25 text-zinc-100 rounded-bl-none font-light shadow-sm"}`}>
                    {msg.text}
                  </div>
                  {msg.primaryPage && (
                    <div className="mt-2.5 w-full max-w-[94%] clay-card p-3.5 rounded-2xl border border-red-500/40 bg-black/85 shadow-lg">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="clay-badge px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase text-red-300">{msg.primaryPage.categoryLabel}</span>
                        <span className="text-[10px] font-mono text-zinc-400">{msg.primaryPage.route}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white font-heading mb-1 flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        <span>{msg.primaryPage.title}</span>
                      </h4>
                      <p className="text-[11px] text-zinc-300 font-light leading-relaxed mb-3">{msg.primaryPage.description}</p>
                      <button onClick={() => handleAction(`route_${msg.primaryPage!.route}`, msg.primaryPage!.route)} className="clay-btn-primary w-full py-2 px-3 rounded-full text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(239,68,68,0.4)]">
                        <span>View {msg.primaryPage.title}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                  {msg.relatedPages && msg.relatedPages.length > 0 && (
                    <div className="mt-2 w-full max-w-[94%] space-y-1.5">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-red-300 px-1 font-semibold">Related Destinations:</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {msg.relatedPages.map((rel) => (
                          <button key={rel.route} onClick={() => handleAction(`route_${rel.route}`, rel.route)} className="p-2 rounded-xl bg-black/50 hover:bg-black/80 border border-white/10 text-left transition-colors cursor-pointer group">
                            <div className="text-[11px] font-bold text-white group-hover:text-red-300 transition-colors truncate">{rel.title}</div>
                            <div className="text-[9px] text-zinc-400 truncate">{rel.categoryLabel}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <span className="text-[10px] text-red-300/80 mt-1 px-1 font-mono">{msg.timestamp}</span>
                  {msg.options && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[94%]">
                      {msg.options.map((opt, i) => (
                        <button key={i} onClick={() => handleAction(opt.action, opt.route)} className="bg-black/50 hover:bg-black/80 border border-red-300/40 px-3 py-1.5 text-white text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1 hover:scale-105 rounded-full shadow-sm">
                          <span>{opt.label}</span>
                          <ArrowRight className="w-2.5 h-2.5 text-amber-300" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="bg-black/60 border border-red-400/20 flex items-center gap-1.5 p-3 rounded-2xl w-20">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleUserSubmit(); }} className="p-3 bg-black/50 border-t border-red-400/20 flex items-center gap-2">
              <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Ask about Web, 3D, Pricing, Industries..." className="flex-1 px-4 py-2.5 text-xs text-white placeholder-red-200/60 bg-black/50 border border-red-400/30 rounded-full focus:outline-none focus:border-red-400" />
              <button type="submit" disabled={!inputValue.trim()} className="clay-btn-primary w-9 h-9 rounded-full disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer flex-shrink-0 shadow-[0_0_12px_rgba(239,68,68,0.5)]">
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (FAB) Trigger with Emitting Radar Waves */}
      <div className="relative flex items-center justify-center">
        <style>{`
          @keyframes chatbotWave {
            0% {
              transform: scale(0.95);
              opacity: 0.9;
              box-shadow: 0 0 20px rgba(239, 68, 68, 0.7);
            }
            60% {
              opacity: 0.35;
            }
            100% {
              transform: scale(2.3);
              opacity: 0;
              box-shadow: 0 0 35px rgba(239, 68, 68, 0);
            }
          }
        `}</style>

        {/* Emitting Continuous Waves (Active when closed) */}
        {!isOpen && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            {/* Wave 1 */}
            <span
              className="absolute w-full h-full rounded-full border-2 border-red-500/80 bg-red-500/20"
              style={{
                animation: "chatbotWave 2.6s cubic-bezier(0.15, 0.85, 0.35, 1.2) infinite",
              }}
            />
            {/* Wave 2 */}
            <span
              className="absolute w-full h-full rounded-full border border-red-500/60 bg-red-500/15"
              style={{
                animation: "chatbotWave 2.6s cubic-bezier(0.15, 0.85, 0.35, 1.2) infinite 0.85s",
              }}
            />
            {/* Wave 3 */}
            <span
              className="absolute w-full h-full rounded-full border border-amber-500/50 bg-red-600/10"
              style={{
                animation: "chatbotWave 2.6s cubic-bezier(0.15, 0.85, 0.35, 1.2) infinite 1.7s",
              }}
            />
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen((prev) => !prev)}
          className="clay-btn-secondary w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-red-500/70 text-white flex items-center justify-center p-2.5 cursor-pointer transition-all duration-300 relative group overflow-hidden z-10"
          aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-red-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {isOpen ? (
            <X className="w-6 h-6 text-white relative z-10" />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src="/logoimg.png"
                alt="Navya Bot"
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]"
              />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-zinc-900 rounded-full" />
            </div>
          )}
        </motion.button>
      </div>

    </div>
  );
};

export default FloatingChatbot;

import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Sparkles, Bot, ArrowRight, Minimize2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  options?: { label: string; action: string }[];
}

const GREETINGS = [
  "👋 Hi there! Welcome to Navya Tech.",
  "How may I help you today?",
  "Looking for AI Automation or Web Systems?",
  "Need a quick quote on our packages?",
];

const KNOWLEDGE_BASE: { keywords: string[]; response: string; options?: { label: string; action: string }[] }[] = [
  {
    keywords: ["package", "pricing", "cost", "price", "quote", "rate", "dollar", "money", "how much"],
    response: "We offer 3 transparent, fixed-price commercial packages:\n\n• Website Package ($1,000) — Modern Next.js + 3D WebGL + SEO\n• AI Agents Package ($1,000) — Autonomous multi-agent pipelines\n• Full Ecosystem Bundle ($1,500) — Website + AI automation together\n\nWould you like me to take you to the packages section?",
    options: [
      { label: "View Packages ($1,000+)", action: "scroll_pricing" },
      { label: "Book Custom Quote", action: "scroll_contact" },
    ],
  },
  {
    keywords: ["ai", "agent", "automation", "workflow", "bot", "intelligence"],
    response: "Our autonomous AI agent networks handle repetitive workflows, lead intake qualification, data pipeline sync, and customer communications with human-in-the-loop oversight and zero drift.",
    options: [
      { label: "Explore AI Section", action: "scroll_ai" },
      { label: "View All Capabilities", action: "scroll_services" },
    ],
  },
  {
    keywords: ["website", "web", "design", "development", "3d", "webgl", "frontend", "nextjs"],
    response: "We build high-performance digital platforms using Next.js, React, Tailwind CSS, TypeScript, and custom 3D WebGL shaders that load lightning-fast and drive conversions.",
    options: [
      { label: "See Web Features", action: "scroll_features" },
      { label: "Start a Web Project", action: "scroll_contact" },
    ],
  },
  {
    keywords: ["service", "capabilities", "what do you do", "offer", "help"],
    response: "Navya Tech Industry specializes in three core pillars:\n1. Digital Experiences & Web Engineering\n2. AI Agents & Workflow Automation\n3. Zero-Trust Security Architecture",
    options: [
      { label: "View Core Capabilities", action: "scroll_services" },
      { label: "See Commercial Packages", action: "scroll_pricing" },
    ],
  },
  {
    keywords: ["contact", "call", "whatsapp", "email", "talk", "reach", "hire", "start"],
    response: "You can start your project right now by submitting your email in our project consultation form below!",
    options: [
      { label: "Go to Project Intake Form", action: "scroll_contact" },
      { label: "Explore Packages First", action: "scroll_pricing" },
    ],
  },
  {
    keywords: ["contact", "call", "whatsapp", "talk to human", "phone", "support", "sales"],
    response: "You can connect directly with our engineering and leadership team right now:\n\n📞 Direct Call: +91 93554 12903\n💬 WhatsApp: Instant Chat Available\n📧 Email: hello@navyatech.co.in\n\nHow would you like to proceed?",
    options: [
      { label: "📞 Call +91 93554 12903", action: "direct_call" },
      { label: "💬 WhatsApp Us", action: "direct_whatsapp" },
      { label: "🚀 Start Project Form", action: "scroll_contact" },
    ],
  },
  {
    keywords: ["hello", "hi", "hey", "greetings", "good morning", "good evening"],
    response: "Hello! 👋 Welcome to Navya Tech Industry. How can I assist you with your business technology needs today?",
    options: [
      { label: "📞 Contact Us", action: "contact" },
      { label: "💼 Commercial Packages", action: "pricing" },
      { label: "🤖 Explore AI Agents", action: "ai" },
      { label: "🚀 Start a Project", action: "contact" },
    ],
  },
];

export const FloatingChatbot: React.FC = () => {
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
      text: "I am your AI assistant. How may I help you today? Ask about our web engineering, AI agents, commercial packages, or contact us directly.",
      timestamp: "Just now",
      options: [
        { label: "📞 Contact Navya", action: "contact" },
        { label: "💼 Commercial Packages", action: "pricing" },
        { label: "🤖 AI Agents & Workflows", action: "ai" },
        { label: "⚡ Web Experiences", action: "web" },
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  // Two-message sequential auto-popup loop with 5s closed wait
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

      // Step 1: Message 1 appears
      setIsPopupVisible(true);
      setShowSecondMessage(false);

      // Step 2: Short natural delay (1.8s) -> Message 2 appears
      timerId = setTimeout(() => {
        if (!isMounted) return;
        setShowSecondMessage(true);

        // Step 3: Both messages remain visible together (3.5s) -> popup closes
        timerId = setTimeout(() => {
          if (!isMounted) return;
          setIsPopupVisible(false);
          setShowSecondMessage(false);

          // Step 4: Closed for 5 seconds -> restart loop
          timerId = setTimeout(() => {
            if (!isMounted) return;
            startMessageSequence();
          }, 5000);
        }, 3500);
      }, 1800);
    };

    // Initial natural delay before the first sequence triggers
    timerId = setTimeout(() => {
      startMessageSequence();
    }, 1200);

    return () => {
      isMounted = false;
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [isOpen]);

  const handleAction = (action: string) => {
    if (action === "direct_call") {
      window.location.href = "tel:+919355412903";
      return;
    }
    if (action === "direct_whatsapp") {
      window.open(
        `https://wa.me/919355412903?text=${encodeURIComponent("Hi we would like to know more about services")}`,
        "_blank"
      );
      return;
    }

    if (action.startsWith("scroll_")) {
      const targetId = action.replace("scroll_", "");
      const map: Record<string, string> = {
        pricing: "pricing",
        contact: "final-project",
        ai: "ai-section",
        services: "services",
        features: "features-cards",
      };
      const elementId = map[targetId] || targetId;
      const el = document.getElementById(elementId);
      if (el) {
        setIsOpen(false);
        el.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    if (action === "pricing") {
      handleUserSubmit("Tell me about your commercial packages");
    } else if (action === "ai") {
      handleUserSubmit("How do your AI agents and automations work?");
    } else if (action === "web") {
      handleUserSubmit("Tell me about your web engineering and design");
    } else if (action === "contact") {
      handleUserSubmit("How can I contact or speak with someone at Navya?");
    }
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

    // Find match in knowledge base
    const lower = query.toLowerCase();
    const match = KNOWLEDGE_BASE.find((item) =>
      item.keywords.some((k) => lower.includes(k))
    );

    setTimeout(() => {
      setIsTyping(false);
      const botResponseText = match
        ? match.response
        : "Thank you for asking! We specialize in digital experiences, autonomous AI agents, and enterprise infrastructure. Would you like to check out our commercial packages or start a project consultation?";

      const botResponse: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        options: match?.options || [
          { label: "View Packages ($1,000+)", action: "scroll_pricing" },
          { label: "Start a Project", action: "scroll_contact" },
        ],
      };

      setMessages((prev) => [...prev, botResponse]);
    }, 850);
  };

  return (
    <div className="fixed bottom-16 right-4 sm:bottom-6 sm:right-6 z-50 font-sans flex flex-col items-end">
      
      {/* Dynamic 2-Message Sequential Greeting Bubble (when closed) */}
      <AnimatePresence>
        {!isOpen && isPopupVisible && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.94 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 max-w-[290px] sm:max-w-xs relative clay-card p-4 cursor-pointer group shadow-2xl border border-red-500/30"
            onClick={() => setIsOpen(true)}
          >
            <div className="flex items-start gap-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mt-1.5 flex-shrink-0" />
              <div className="flex-1 space-y-1.5 overflow-hidden">
                <p className="text-xs font-semibold text-white tracking-wide font-heading">
                  Navya Assistant
                </p>
                
                {/* Message 1 */}
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs text-zinc-200 font-light leading-snug"
                >
                  {GREETINGS[0]}
                </motion.p>

                {/* Message 2 */}
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
              <span>Chat now</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Modal - Claymorphic Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-[92vw] sm:w-[380px] h-[540px] max-h-[82vh] rounded-3xl flex flex-col overflow-hidden mb-3 border border-red-500/40 shadow-[0_15px_45px_rgba(220,38,38,0.45),0_0_30px_rgba(239,68,68,0.25)] bg-gradient-to-b from-[#881337] via-[#991b1b] to-[#450a0a] backdrop-blur-xl"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-black/40 border-b border-red-400/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="clay-icon-well w-10 h-10 p-1.5 flex items-center justify-center overflow-hidden bg-black/60 border border-red-400/30">
                    <img
                      src="/logoimg.png"
                      alt="Navya Bot"
                      className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                    />
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
                    Online • Ready to help
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-red-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Minimize chat"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-red-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs scrollbar-thin scrollbar-thumb-red-900/60 bg-black/20">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-line ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-br-none font-medium shadow-md"
                        : "bg-black/65 border border-red-400/25 text-zinc-100 rounded-bl-none font-light shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>

                  <span className="text-[10px] text-red-300/80 mt-1 px-1 font-mono">{msg.timestamp}</span>

                  {/* Action Chips */}
                  {msg.options && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[90%]">
                      {msg.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleAction(opt.action)}
                          className="bg-black/50 hover:bg-black/80 border border-red-300/40 px-3 py-1.5 text-white text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1 hover:scale-105 rounded-full shadow-sm"
                        >
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

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUserSubmit();
              }}
              className="p-3 bg-black/50 border-t border-red-400/20 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about AI, Web, Pricing..."
                aria-label="Type your message to Navya AI Assistant"
                className="flex-1 px-4 py-2.5 text-xs text-white placeholder-red-200/60 bg-black/50 border border-red-400/30 rounded-full focus:outline-none focus:border-red-400"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="clay-btn-primary w-9 h-9 rounded-full disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer flex-shrink-0 shadow-[0_0_12px_rgba(239,68,68,0.5)]"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (FAB) Trigger with Emitting Radar Waves */}
      <div className="relative flex items-center justify-center">
        {/* Style tag for wave pulse animation */}
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

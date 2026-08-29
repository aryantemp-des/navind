import * as React from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Bot, Workflow, Cpu, MessageSquare, TrendingUp, Sparkles, ArrowRight } from "lucide-react";

export interface HeroCarouselItem {
  id?: string | number;
  title: string;
  image: string;
  credit?: string;
  meta?: string[];
  accent?: string;
}

export interface HeroCarouselProps {
  items: HeroCarouselItem[];
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  brand?: React.ReactNode;
  onBack?: () => void;
  onMenu?: () => void;
  autoplay?: boolean;
  autoplayDelay?: number;
  className?: string;
}

const CARD_H = 0.44;
const CARD_AR = 0.78;
const GAP = 0.045;
const STRIP_TOP = 0.42;
const TITLE = 0.055;
const LABEL = 0.0105;
const PAD = 0.024;
const RAIL = 0.22;

const WHEEL_THRESHOLD = 60;
const WHEEL_COOLDOWN = 420;

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

export function HeroCarousel({
  items,
  index: controlled,
  defaultIndex = 2,
  onIndexChange,
  brand = "AI AGENTS",
  onBack,
  onMenu,
  autoplay = false,
  autoplayDelay = 4000,
  className,
}: HeroCarouselProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const [box, setBox] = React.useState({ w: 0, h: 0 });
  const [uncontrolled, setUncontrolled] = React.useState(defaultIndex);
  const [dragging, setDragging] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const reduced = useReducedMotion();

  const last = items.length - 1;
  const index = clamp(controlled ?? uncontrolled, 0, Math.max(0, last));

  const go = React.useCallback(
    (next: number) => {
      const clamped = clamp(next, 0, Math.max(0, last));
      if (controlled === undefined) setUncontrolled(clamped);
      if (clamped !== index) onIndexChange?.(clamped);
    },
    [controlled, index, last, onIndexChange]
  );

  React.useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const read = () => setBox({ w: stage.clientWidth, h: stage.clientHeight });
    read();

    const ro = new ResizeObserver(read);
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  const fullH = clamp(box.h * CARD_H, 180, 420);
  const inactiveH = fullH * 0.82;
  const cardW = fullH * CARD_AR;
  const gap = Math.max(8, Math.round(cardW * GAP));
  const step = cardW + gap;
  const pad = Math.max(16, Math.round(box.w * PAD));
  const label = Math.max(10, Math.round(box.h * LABEL));

  const xFor = React.useCallback(
    (i: number) => box.w / 2 - (i * step + cardW / 2),
    [box.w, step, cardW]
  );

  const x = useMotionValue(0);
  const target = xFor(index);

  const swing = reduced ? { duration: 0 } : { duration: 0.7, ease: "easeOut" as const };
  const spring = reduced ? { duration: 0 } : { type: "spring" as const, stiffness: 260, damping: 34, mass: 0.9 };

  React.useEffect(() => {
    if (dragging) return;
    const run = animate(x, target, spring);
    return () => run.stop();
  }, [target, dragging, reduced, x]);

  React.useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let acc = 0;
    let until = 0;

    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const stuck = (delta > 0 && index === last) || (delta < 0 && index === 0);

      if (stuck) {
        acc = 0;
        return;
      }

      e.preventDefault();
      const now = e.timeStamp;
      if (now < until) return;

      acc += delta;
      if (Math.abs(acc) < WHEEL_THRESHOLD) return;

      go(index + Math.sign(acc));
      acc = 0;
      until = now + WHEEL_COOLDOWN;
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [go, index, last]);

  React.useEffect(() => {
    if (!autoplay || paused || dragging || items.length < 2) return;
    const id = window.setTimeout(() => go(index === last ? 0 : index + 1), autoplayDelay);
    return () => window.clearTimeout(id);
  }, [autoplay, autoplayDelay, dragging, go, index, items.length, last]);

  const active = items[index];
  if (!active) return null;

  const lines = active.title.split("\n");
  const accent = active.accent ?? "#ef4444";

  return (
    <div
      ref={stageRef}
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      aria-label="AI Agents & Workflows Showcase"
      onKeyDown={(e) => {
        const keys: Record<string, number> = {
          ArrowLeft: index - 1,
          ArrowRight: index + 1,
          Home: 0,
          End: last,
        };
        if (!(e.key in keys)) return;
        e.preventDefault();
        go(keys[e.key]);
      }}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={cn(
        "relative h-[620px] sm:h-[680px] md:h-[780px] lg:h-[820px] w-full overflow-hidden bg-black text-white select-none rounded-3xl border border-zinc-800/80 shadow-2xl",
        "outline-none focus-visible:ring-1 focus-visible:ring-white/40 focus-visible:ring-inset",
        className
      )}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={swing}
        >
          <motion.img
            src={active.image}
            alt={`${active.title.replace(/\n/g, " ")} - AI Showcase Background`}
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover opacity-60"
            initial={{ scale: reduced ? 1.2 : 1.35 }}
            animate={{ scale: 1.2 }}
            transition={reduced ? { duration: 0 } : { duration: 6, ease: "linear" }}
          />

          <div
            className="absolute inset-0"
            style={{ backgroundColor: accent, mixBlendMode: "color" }}
          />

          <div
            className="absolute inset-0 opacity-60"
            style={{ backgroundColor: accent, mixBlendMode: "multiply" }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.2] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "180px 180px" }}
      />

      {/* Top Header Row with AI AGENTS */}
      <div
        className="absolute inset-x-0 flex items-center justify-between px-6 z-20"
        style={{ top: Math.max(16, box.h * 0.035) }}
      >
        <div className="text-xs font-mono uppercase tracking-widest text-zinc-400">
          Autonomous Systems
        </div>

        <div className="font-bold tracking-[0.2em] text-white font-heading text-sm md:text-base bg-white/10 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-md">
          {brand}
        </div>

        <div className="text-xs font-mono uppercase tracking-widest text-red-400">
          NTI Multi-Agent Mesh
        </div>
      </div>

      {/* Title & Metadata */}
      <div
        className="absolute inset-x-0 top-0 flex flex-col justify-end z-20 pointer-events-none"
        style={{
          height: `${STRIP_TOP * 100}%`,
          paddingLeft: pad,
          paddingRight: pad,
          paddingBottom: Math.round(box.h * 0.025),
        }}
      >
        <div className="flex w-full flex-wrap items-end gap-x-[4vw] gap-y-2">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.h3
              key={index}
              className="font-bold leading-[0.9] tracking-tight font-heading"
              style={{ fontSize: Math.max(26, Math.round(box.h * TITLE)) }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.18 } }}
            >
              {lines.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className="block text-white"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={
                      reduced
                        ? { duration: 0 }
                        : {
                            duration: 0.62,
                            delay: i * 0.07,
                            ease: [0.22, 1, 0.36, 1],
                          }
                    }
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h3>
          </AnimatePresence>

          {active.credit ? (
            <motion.p
              key={`credit-${index}`}
              className="font-mono uppercase tracking-[0.14em] text-red-300 opacity-90 font-medium"
              style={{ fontSize: label }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {active.credit}
            </motion.p>
          ) : null}

          {active.meta?.length ? (
            <div
              className="ml-auto flex items-end gap-3"
            >
              {active.meta.map((fact, i) => (
                <motion.span
                  key={`${index}-${fact}`}
                  className="font-mono whitespace-nowrap uppercase tracking-[0.14em] text-zinc-200 bg-black/50 px-3 py-1 rounded-md border border-white/15 text-xs font-semibold"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 0.9, y: 0 }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { duration: 0.45, delay: 0.12 + i * 0.06 }
                  }
                >
                  {fact}
                </motion.span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {/* Horizontal Strip with Substantially Enlarged Cards */}
      <div
        className="absolute inset-x-0 z-20"
        style={{ top: `${STRIP_TOP * 100}%`, height: fullH }}
      >
        <motion.div
          className="flex items-start"
          style={{ gap, x, cursor: dragging ? "grabbing" : "grab" }}
          drag="x"
          dragMomentum={false}
          dragElastic={0.08}
          dragConstraints={{ left: xFor(last), right: xFor(0) }}
          onDragStart={() => setDragging(true)}
          onDragEnd={(_, info) => {
            setDragging(false);
            const thrown = x.get() + info.velocity.x * 0.12;
            go(Math.round((box.w / 2 - thrown - cardW / 2) / step));
          }}
        >
          {items.map((item, i) => {
            const isSelected = i === index;
            return (
              <motion.button
                key={item.id ?? i}
                type="button"
                aria-label={item.title.replace(/\n/g, " ")}
                aria-current={isSelected}
                onClick={() => go(i)}
                className={cn(
                  "relative shrink-0 overflow-hidden rounded-2xl bg-zinc-900 transition-all duration-300 group cursor-pointer",
                  isSelected
                    ? "border-2 border-red-500/80 shadow-[0_12px_35px_rgba(239,68,68,0.35),0_0_20px_rgba(239,68,68,0.2)] ring-1 ring-red-400/40"
                    : "border border-white/15 hover:border-white/40 shadow-xl opacity-85 hover:opacity-100 hover:scale-[1.02]"
                )}
                style={{ width: cardW }}
                animate={{ height: isSelected ? fullH : inactiveH }}
                transition={spring}
              >
                <img
                  src={item.image}
                  alt={`${item.title.replace(/\n/g, " ")} - Autonomous AI Agent Architecture`}
                  draggable={false}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Subtle dark tint on non-active cards */}
                <motion.span
                  aria-hidden
                  className="absolute inset-0 bg-black"
                  animate={{ opacity: isSelected ? 0 : 0.25 }}
                  transition={spring}
                />

                {/* Card Title & Agent Credit Overlay Badge for Clear Presence & Readability */}
                <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 bg-gradient-to-t from-black/95 via-black/65 to-transparent flex flex-col justify-end text-left pointer-events-none">
                  <span className="text-[10px] sm:text-[11px] font-mono text-red-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                    {item.credit || `AGENT 0${i + 1}`}
                  </span>
                  <span className="text-xs sm:text-sm md:text-base font-bold text-white leading-snug line-clamp-2 font-heading drop-shadow-md">
                    {item.title.replace(/\n/g, " ")}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* Bottom Progress Rail */}
      <div
        className="absolute z-20"
        style={{
          left: pad,
          bottom: Math.max(14, box.h * 0.03),
          width: Math.min(260, box.w * RAIL),
        }}
      >
        <div
          className="flex justify-between font-mono tabular-nums text-zinc-400 text-xs"
        >
          <span className="text-white font-bold">{String(index + 1).padStart(2, "0")}</span>
          <span>{String(items.length).padStart(2, "0")}</span>
        </div>

        <div className="relative mt-2 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 bg-gradient-to-r from-red-600 to-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"
            style={{ width: `${100 / items.length}%` }}
            animate={{ left: `${(index / items.length) * 100}%` }}
            transition={spring}
          />
        </div>
      </div>
    </div>
  );
}

const AI_LOOKS: HeroCarouselItem[] = [
  {
    title: "Lead Qualification\nAgent",
    image: "/dot2-lead-qualification.png",
    credit: "AUTONOMOUS INTAKE ENGINE",
    meta: ["INSTANT RESPONSE", "CRM SYNC", "24/7 ACTIVE"],
    accent: "#ef4444",
  },
  {
    title: "Workflow\nOrchestrator",
    image: "/dot2-workflow-orchestrator.png",
    credit: "CROSS-SYSTEM ROUTING",
    meta: ["API MESH", "DATA PIPELINES", "ZERO MANUAL ENTRY"],
    accent: "#f59e0b",
  },
  {
    title: "Automated\nCommunications",
    image: "/dot2-automated-communication.png",
    credit: "OMNICHANNEL MESSAGING",
    meta: ["EMAIL & WHATSAPP", "HUMAN ESCALATION", "SMART SUMMARY"],
    accent: "#b91c1c",
  },
  {
    title: "Business Intelligence\nSynthesizer",
    image: "/dot2-business-intelligence.png",
    credit: "REAL-TIME TELEMETRY",
    meta: ["DAILY SUMMARIES", "ANOMALY DETECTION", "EXECUTIVE FEEDS"],
    accent: "#7c2d12",
  },
  {
    title: "Human-In-The-Loop\nSafeguard",
    image: "/dot2-human-in-the-loop.png",
    credit: "GOVERNANCE & APPROVAL",
    meta: ["AUDIT TRAILS", "1-CLICK APPROVAL", "ZERO DRIFT"],
    accent: "#dc2626",
  },
];

export const AISection: React.FC = () => {
  return (
    <section id="ai-section" className="relative w-full bg-black/50 py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="clay-badge inline-flex items-center gap-2 px-4 py-2 text-red-300 text-xs font-semibold uppercase tracking-widest mb-6 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            Practical Intelligent Systems
          </div>

          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] font-heading mb-6">
            AI &amp; Automation
          </h2>

          <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed">
            We engineer autonomous multi-agent networks and intelligent workflows that turn manual administrative bottlenecks into automated, high-yield business outcomes.
          </p>
        </div>

        {/* Carousel Showcase */}
        <div className="mb-14">
          <HeroCarousel items={AI_LOOKS} brand="AI AGENTS" />
        </div>

        {/* Architecture Workflow Flowchart (Claymorphic Flow) */}
        <div className="clay-card p-8 sm:p-12">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading mb-2">
              The Navya Intelligent Workflow Architecture
            </h3>
            <p className="text-zinc-400 text-sm font-light">
              How business requirements flow through autonomous intelligence into measurable yield
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-center">
            {[
              { title: "Business Ingestion", desc: "Form, API, Email, Webhook", icon: Cpu, step: "01" },
              { title: "AI Agents", desc: "Structured Qualification", icon: Bot, step: "02" },
              { title: "Workflows", desc: "Multi-step Pipeline", icon: Workflow, step: "03" },
              { title: "Automation", desc: "CRM & DB Updates", icon: Sparkles, step: "04" },
              { title: "Communication", desc: "Automated Follow-ups", icon: MessageSquare, step: "05" },
              { title: "Business Outcome", desc: "Revenue & Growth", icon: TrendingUp, step: "06" },
            ].map((node) => {
              const Icon = node.icon;
              return (
                <div key={node.step} className="clay-node p-5 rounded-2xl relative flex flex-col items-center text-center">
                  <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider mb-2">
                    Step {node.step}
                  </span>
                  <div className="clay-icon-well w-11 h-11 flex items-center justify-center text-red-400 mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{node.title}</h4>
                  <p className="text-xs text-zinc-400 font-light">{node.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Cinematic bottom gradient fade after The Navya Intelligent Workflow Architecture */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default AISection;

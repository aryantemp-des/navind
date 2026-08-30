import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { useAnimationFrame, motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMousePositionRef } from "@/hooks/use-mouse-position-ref";

interface FloatingContextType {
  registerElement: (id: string, element: HTMLDivElement, depth: number) => void;
  unregisterElement: (id: string) => void;
}

const FloatingContext = createContext<FloatingContextType | null>(null);

interface FloatingProps {
  children: ReactNode;
  className?: string;
  sensitivity?: number;
  easingFactor?: number;
}

export const Floating = ({
  children,
  className,
  sensitivity = 1,
  easingFactor = 0.05,
  ...props
}: FloatingProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef<boolean>(false);
  const elementsMap = useRef(
    new Map<
      string,
      {
        element: HTMLDivElement;
        depth: number;
        currentPosition: { x: number; y: number };
      }
    >()
  );
  const mousePositionRef = useMousePositionRef(containerRef);

  const registerElement = useCallback(
    (id: string, element: HTMLDivElement, depth: number) => {
      elementsMap.current.set(id, {
        element,
        depth,
        currentPosition: { x: 0, y: 0 },
      });
    },
    []
  );

  const unregisterElement = useCallback((id: string) => {
    elementsMap.current.delete(id);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame(() => {
    if (!containerRef.current || !isVisibleRef.current) return;

    elementsMap.current.forEach((data) => {
      const strength = (data.depth * sensitivity) / 20;

      const newTargetX = mousePositionRef.current.x * strength;
      const newTargetY = mousePositionRef.current.y * strength;

      const dx = newTargetX - data.currentPosition.x;
      const dy = newTargetY - data.currentPosition.y;

      // If delta is negligible, skip style mutation to prevent continuous GPU work
      if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05) {
        return;
      }

      data.currentPosition.x += dx * easingFactor;
      data.currentPosition.y += dy * easingFactor;

      data.element.style.transform = `translate3d(${data.currentPosition.x.toFixed(2)}px, ${data.currentPosition.y.toFixed(2)}px, 0)`;
    });
  });

  return (
    <FloatingContext.Provider value={{ registerElement, unregisterElement }}>
      <div
        ref={containerRef}
        className={cn("absolute top-0 left-0 w-full h-full pointer-events-none", className)}
        {...props}
      >
        {children}
      </div>
    </FloatingContext.Provider>
  );
};

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  depth?: number;
}

export const FloatingElement = ({
  children,
  className,
  depth = 1,
}: FloatingElementProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(Math.random().toString(36).substring(7));
  const context = useContext(FloatingContext);

  useEffect(() => {
    if (!elementRef.current || !context) return;
    const nonNullDepth = depth ?? 0.01;
    context.registerElement(idRef.current, elementRef.current, nonNullDepth);
    return () => context.unregisterElement(idRef.current);
  }, [depth, context]);

  return (
    <div
      ref={elementRef}
      className={cn("absolute will-change-transform pointer-events-auto", className)}
    >
      {children}
    </div>
  );
};

const floatingImages = [
  { url: "/dot2/interactive-3d-framework.png", title: "Enterprise Dashboard" },
  { url: "/dot2/intelligent-neural-agent.png", title: "Neural Agents" },
  { url: "/dot2/high-yield-cloud-infrastructure.png", title: "Cloud Infrastructure" },
  { url: "/dot2/human-in-the-loop-review.png", title: "Security Matrix" },
  { url: "/dot2/multi-agent-decision-support.png", title: "Realtime Telemetry" },
  { url: "/dot2/automated-communication-hub.png", title: "Digital Product" },
  { url: "/dot2/autonomous-work-orchestration.png", title: "Data Pipelines" },
  { url: "/dot2/interactive-3d-framework.png", title: "Interactive 3D" },
];

export const ParallaxFloatingShowcase: React.FC = () => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate("img", { opacity: [0, 1] }, { duration: 0.5, delay: stagger(0.08) });
  }, [animate]);

  const scrollToContact = () => {
    const el = document.getElementById('final-project');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="floating-preview"
      className="relative flex w-full min-h-[440px] md:min-h-[520px] justify-center items-center bg-transparent overflow-hidden pt-14 pb-20 md:pt-18 md:pb-28 px-4"
      ref={scope}
    >
      {/* Central Statement */}
      <motion.div
        className="z-30 text-center space-y-6 items-center flex flex-col max-w-4xl px-4 pointer-events-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="clay-badge inline-flex items-center gap-2 px-4 py-2 text-red-300 text-xs font-semibold uppercase tracking-widest font-mono">
          Commitment to Excellence
        </div>

        <p className="text-3xl sm:text-5xl md:text-6xl text-white font-heading font-bold leading-tight tracking-tight">
          Your goals become our responsibility, from the first idea to the final result.
        </p>

        <button
          onClick={scrollToContact}
          className="clay-btn-primary text-xs font-mono uppercase tracking-wider text-white rounded-full py-4 px-9 font-bold cursor-pointer"
        >
          Partner With Navya →
        </button>
      </motion.div>

      {/* Floating Interactive Canvas Elements */}
      <Floating sensitivity={-1.2} className="overflow-hidden">
        <FloatingElement depth={0.6} className="top-[8%] left-[8%] hidden md:block">
          <motion.img
            initial={{ opacity: 0 }}
            src={floatingImages[0].url}
            alt={floatingImages[0].title}
            className="w-20 h-20 md:w-28 md:h-28 rounded-2xl border border-white/10 shadow-2xl object-cover hover:scale-110 duration-300 cursor-pointer transition-transform"
            loading="lazy"
          />
        </FloatingElement>

        <FloatingElement depth={1.2} className="top-[12%] left-[30%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={floatingImages[1].url}
            alt={floatingImages[1].title}
            className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border border-white/10 shadow-2xl object-cover hover:scale-110 duration-300 cursor-pointer transition-transform"
            loading="lazy"
          />
        </FloatingElement>

        <FloatingElement depth={2.2} className="top-[4%] left-[65%] hidden sm:block">
          <motion.img
            initial={{ opacity: 0 }}
            src={floatingImages[2].url}
            alt={floatingImages[2].title}
            className="w-32 h-44 md:w-44 md:h-56 rounded-2xl border border-white/10 shadow-2xl object-cover hover:scale-110 duration-300 cursor-pointer transition-transform"
            loading="lazy"
          />
        </FloatingElement>

        <FloatingElement depth={1} className="top-[5%] left-[86%] hidden md:block">
          <motion.img
            initial={{ opacity: 0 }}
            src={floatingImages[3].url}
            alt={floatingImages[3].title}
            className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border border-white/10 shadow-2xl object-cover hover:scale-110 duration-300 cursor-pointer transition-transform"
            loading="lazy"
          />
        </FloatingElement>

        <FloatingElement depth={1.4} className="top-[45%] left-[4%] hidden sm:block">
          <motion.img
            initial={{ opacity: 0 }}
            src={floatingImages[4].url}
            alt={floatingImages[4].title}
            className="w-28 h-28 md:w-36 md:h-36 rounded-2xl border border-white/10 shadow-2xl object-cover hover:scale-110 duration-300 cursor-pointer transition-transform"
            loading="lazy"
          />
        </FloatingElement>

        <FloatingElement depth={2} className="top-[68%] left-[78%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={floatingImages[7].url}
            alt={floatingImages[7].title}
            className="w-32 h-32 md:w-40 md:h-52 rounded-2xl border border-white/10 shadow-2xl object-cover hover:scale-110 duration-300 cursor-pointer transition-transform"
            loading="lazy"
          />
        </FloatingElement>

        <FloatingElement depth={3.5} className="top-[70%] left-[12%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={floatingImages[5].url}
            alt={floatingImages[5].title}
            className="w-40 md:w-56 h-36 md:h-48 rounded-2xl border border-white/10 shadow-2xl object-cover hover:scale-110 duration-300 cursor-pointer transition-transform"
            loading="lazy"
          />
        </FloatingElement>

        <FloatingElement depth={1.2} className="top-[82%] left-[48%] hidden md:block">
          <motion.img
            initial={{ opacity: 0 }}
            src={floatingImages[6].url}
            alt={floatingImages[6].title}
            className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border border-white/10 shadow-2xl object-cover hover:scale-110 duration-300 cursor-pointer transition-transform"
            loading="lazy"
          />
        </FloatingElement>
      </Floating>
    </section>
  );
};

export default ParallaxFloatingShowcase;

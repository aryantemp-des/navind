import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { Sparkles } from "lucide-react";

export interface ProductItem {
  title: string;
  link: string;
  thumbnail: string;
}

export const HeroParallax: React.FC<{ products?: ProductItem[] }> = ({
  products = defaultProducts,
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const translateXDist = isMobile ? 380 : 800;

  // Direct transform for mobile to avoid spring lag, spring physics for desktop
  const rawTranslateX = useTransform(scrollYProgress, [0, 1], [0, translateXDist]);
  const rawTranslateXReverse = useTransform(scrollYProgress, [0, 1], [0, -translateXDist]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.2], [0.4, 1]);

  const desktopSpring = { stiffness: 300, damping: 35, mass: 0.2 };

  const springTranslateX = useSpring(rawTranslateX, desktopSpring);
  const springTranslateXReverse = useSpring(rawTranslateXReverse, desktopSpring);
  const springOpacity = useSpring(rawOpacity, desktopSpring);
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [14, 0]),
    desktopSpring
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [15, 0]),
    desktopSpring
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [-500, 200]),
    desktopSpring
  );

  const translateX = isMobile ? rawTranslateX : springTranslateX;
  const translateXReverse = isMobile ? rawTranslateXReverse : springTranslateXReverse;
  const opacity = isMobile ? rawOpacity : springOpacity;

  return (
    <section
      id="pintro-showcase"
      ref={ref}
      className={`h-[180vh] sm:h-[220vh] md:h-[300vh] py-12 sm:py-16 md:py-36 overflow-hidden antialiased relative flex flex-col self-auto ${
        isMobile ? "" : "[perspective:1000px] [transform-style:preserve-3d]"
      } bg-black/50 text-white`}
    >
      {/* Scroll-driven Magnifying & Edge Fading Reversible Header */}
      <Header scrollYProgress={scrollYProgress} isMobile={isMobile} />

      <motion.div
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateZ: isMobile ? 0 : rotateZ,
          translateY: isMobile ? 0 : translateY,
          opacity,
        }}
        className="w-full relative z-10 will-change-transform"
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-4 sm:space-x-8 md:space-x-20 mb-4 sm:mb-8 md:mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>

        <motion.div className="flex flex-row mb-4 sm:mb-8 md:mb-20 space-x-4 sm:space-x-8 md:space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>

        <motion.div className="flex flex-row-reverse space-x-reverse space-x-4 sm:space-x-8 md:space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export const Header: React.FC<{ scrollYProgress: MotionValue<number>; isMobile?: boolean }> = ({
  scrollYProgress,
  isMobile = false,
}) => {
  const scale = useTransform(scrollYProgress, [0, 0.16, 0.34], [1, isMobile ? 1.05 : 1.18, isMobile ? 1.12 : 1.42]);
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.25, 0.36], [1, 1, 0.6, 0]);
  const y = useTransform(scrollYProgress, [0, 0.36], [0, isMobile ? -40 : -90]);

  return (
    <div className="max-w-7xl relative mx-auto py-12 md:py-28 px-4 sm:px-6 w-full left-0 top-0 z-20 pointer-events-none">
      <motion.div
        style={{
          scale,
          opacity,
          y,
          transformOrigin: "top left",
        }}
        className="will-change-transform pointer-events-auto"
      >
        <div className="clay-badge inline-flex items-center gap-2 px-4 py-2 text-red-300 text-xs font-semibold uppercase tracking-widest mb-6 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-red-400" />
          Capability Ecosystem
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05] font-heading drop-shadow-2xl">
          The Ultimate <br />
          <span className="bg-gradient-to-r from-red-200 via-red-400 to-amber-200 bg-clip-text text-transparent">
            development studio
          </span>
        </h2>

        <p className="max-w-3xl text-base sm:text-xl md:text-2xl mt-6 text-zinc-200 font-light leading-relaxed drop-shadow-md">
          We engineer intelligent systems that simplify complexity, strengthen
          businesses, and create lasting value. Modern technology, purposeful
          design, and automation come together to build what’s next.
        </p>
      </motion.div>
    </div>
  );
};

export const ProductCard: React.FC<{
  product: ProductItem;
  translate: MotionValue<number>;
}> = ({ product, translate }) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -10,
      }}
      key={product.title}
      className="clay-card-interactive group/product h-64 sm:h-80 md:h-96 w-[18rem] sm:w-[24rem] md:w-[30rem] relative flex-shrink-0 rounded-3xl overflow-hidden p-2.5"
    >
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full w-full relative rounded-2xl overflow-hidden"
      >
        <img
          src={product.thumbnail}
          className="object-cover object-left-top absolute h-full w-full inset-0 transition-transform duration-500 group-hover/product:scale-105"
          alt={product.title}
          loading="lazy"
          decoding="async"
          style={{ willChange: "transform" }}
        />

        <div className="absolute inset-0 h-full w-full opacity-40 group-hover/product:opacity-85 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-300 pointer-events-none" />

        <div className="absolute bottom-3 left-3 right-3 z-10 clay-surface p-3 sm:p-4 rounded-xl border border-white/10 shadow-lg">
          <h3 className="text-sm sm:text-base font-bold text-white tracking-wide font-heading">
            {product.title}
          </h3>
          <span className="text-xs text-red-300 opacity-0 group-hover/product:opacity-100 transition-opacity duration-300 font-mono">
            Explore System →
          </span>
        </div>
      </a>
    </motion.div>
  );
};

export const defaultProducts: ProductItem[] = [
  {
    title: "Autonomous Workflow Orchestration",
    link: "#",
    thumbnail: "/dot2/autonomous-work-orchestration.png",
  },
  {
    title: "High-Yield Cloud Infrastructure",
    link: "#",
    thumbnail: "/dot2/high-yield-cloud-infrastructure.png",
  },
  {
    title: "Intelligent Neural Agents",
    link: "#",
    thumbnail: "/dot2/intelligent-neural-agent.png",
  },
  {
    title: "Real-time Business Telemetry",
    link: "#",
    thumbnail: "/dot2/human-in-the-loop-review.png",
  },
  {
    title: "Secure Distributed Architecture",
    link: "#",
    thumbnail: "/dot2/high-yield-cloud-infrastructure.png",
  },
  {
    title: "Customer Intelligence Engine",
    link: "#",
    thumbnail: "/dot2/multi-agent-decision-support.png",
  },
  {
    title: "Interactive 3D Web Framework",
    link: "#",
    thumbnail: "/dot2/interactive-3d-framework.png",
  },
  {
    title: "Multi-Agent Decision Support",
    link: "#",
    thumbnail: "/dot2/multi-agent-decision-support.png",
  },
  {
    title: "Automated Communication Hub",
    link: "#",
    thumbnail: "/dot2/automated-communication-hub.png",
  },
  {
    title: "Next-gen Digital Product Engine",
    link: "#",
    thumbnail: "/dot2/interactive-3d-framework.png",
  },
  {
    title: "Enterprise Data Pipeline",
    link: "#",
    thumbnail: "/dot2/autonomous-work-orchestration.png",
  },
  {
    title: "Scalable API Mesh & Microservices",
    link: "#",
    thumbnail: "/dot2/high-yield-cloud-infrastructure.png",
  },
  {
    title: "Predictive Analytics Architecture",
    link: "#",
    thumbnail: "/dot2/intelligent-neural-agent.png",
  },
  {
    title: "Conversion Optimization Engine",
    link: "#",
    thumbnail: "/dot2/automated-communication-hub.png",
  },
  {
    title: "Autonomous Lead Automation",
    link: "#",
    thumbnail: "/dot2/human-in-the-loop-review.png",
  },
];

export default HeroParallax;

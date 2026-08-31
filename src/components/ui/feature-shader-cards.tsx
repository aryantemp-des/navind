import React, { useState, useEffect, useRef } from "react";
import { Warp } from "@paper-design/shaders-react";
import { Sparkles, Zap, Puzzle, Sliders, Smartphone, Code2 } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    title: "Elegant Design",
    description:
      "Beautiful shader effects and purposeful aesthetics that elevate your brand without overwhelming it. Crafted for enterprise digital presence.",
    href: "/website-design",
    icon: <Sparkles className="w-8 h-8 text-red-300" />,
  },
  {
    title: "High Performance",
    description:
      "Optimized WebGL pipelines and minimal DOM footprint that run smoothly across desktop, tablet, and mobile devices while maintaining 60fps.",
    href: "/services/website-performance-optimization",
    icon: <Zap className="w-8 h-8 text-amber-300" />,
  },
  {
    title: "Easy Integration",
    description:
      "Composable, modular architecture and unified design tokens that connect seamlessly with your existing infrastructure and business systems.",
    href: "/services/custom-web-development",
    icon: <Puzzle className="w-8 h-8 text-red-400" />,
  },
  {
    title: "Customizable",
    description:
      "Custom systems engineered around exact client requirements, workflows, brand guidelines, and operational parameters rather than generic templates.",
    href: "/custom-website",
    icon: <Sliders className="w-8 h-8 text-amber-400" />,
  },
  {
    title: "Responsive & Scalable",
    description:
      "Fluid typography, adaptive layouts, and resilient components built to scale from high-res desktop monitors down to mobile viewports.",
    href: "/services/business-website-development",
    icon: <Smartphone className="w-8 h-8 text-rose-300" />,
  },
  {
    title: "Modern Tech Ecosystem",
    description:
      "Engineered with Next.js, React, TypeScript, Three.js, and autonomous AI agents for long-term maintainability and competitive advantage.",
    href: "/3d-website",
    icon: <Code2 className="w-8 h-8 text-red-200" />,
  },
];

const SHADER_CONFIGS = [
  {
    proportion: 0.3,
    softness: 0.8,
    distortion: 0.15,
    swirl: 0.6,
    swirlIterations: 8,
    shape: "checks" as const,
    shapeScale: 0.08,
    colors: ["hsl(4, 90%, 25%)", "hsl(20, 95%, 45%)", "hsl(0, 80%, 15%)", "hsl(350, 90%, 55%)"],
  },
  {
    proportion: 0.4,
    softness: 1.2,
    distortion: 0.2,
    swirl: 0.9,
    swirlIterations: 12,
    shape: "stripes" as const,
    shapeScale: 0.12,
    colors: ["hsl(30, 90%, 25%)", "hsl(45, 95%, 55%)", "hsl(15, 85%, 35%)", "hsl(35, 90%, 65%)"],
  },
  {
    proportion: 0.35,
    softness: 0.9,
    distortion: 0.18,
    swirl: 0.7,
    swirlIterations: 10,
    shape: "checks" as const,
    shapeScale: 0.1,
    colors: ["hsl(355, 90%, 20%)", "hsl(10, 95%, 50%)", "hsl(0, 0%, 10%)", "hsl(5, 90%, 60%)"],
  },
  {
    proportion: 0.45,
    softness: 1.1,
    distortion: 0.22,
    swirl: 0.8,
    swirlIterations: 15,
    shape: "edge" as const,
    shapeScale: 0.09,
    colors: ["hsl(25, 90%, 25%)", "hsl(40, 95%, 55%)", "hsl(10, 85%, 35%)", "hsl(30, 90%, 65%)"],
  },
  {
    proportion: 0.38,
    softness: 0.95,
    distortion: 0.16,
    swirl: 0.85,
    swirlIterations: 11,
    shape: "checks" as const,
    shapeScale: 0.11,
    colors: ["hsl(340, 90%, 20%)", "hsl(355, 95%, 50%)", "hsl(0, 80%, 15%)", "hsl(15, 90%, 55%)"],
  },
  {
    proportion: 0.42,
    softness: 1.0,
    distortion: 0.19,
    swirl: 0.75,
    swirlIterations: 9,
    shape: "stripes" as const,
    shapeScale: 0.13,
    colors: ["hsl(15, 90%, 25%)", "hsl(35, 95%, 55%)", "hsl(0, 85%, 30%)", "hsl(25, 90%, 65%)"],
  },
];

const ShaderCard: React.FC<{
  feature: Feature;
  index: number;
  shaderConfig: typeof SHADER_CONFIGS[0];
}> = ({ feature, index, shaderConfig }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop, { passive: true });
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!cardRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "150px 0px", threshold: 0.01 }
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={feature.href}
      className="clay-card-interactive relative h-80 rounded-3xl overflow-hidden p-2 group cursor-pointer block"
      style={{ willChange: "transform" }}
    >
      <div ref={cardRef} className="w-full h-full relative">
        {/* Background: WebGL Warp Shader on Desktop, GPU CSS Gradient Mesh on Mobile */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none transition-opacity duration-300"
          style={{
            visibility: isVisible ? "visible" : "hidden",
            opacity: isVisible ? 0.85 : 0,
          }}
        >
          {isDesktop ? (
            <Warp
              style={{ height: "100%", width: "100%" }}
              proportion={shaderConfig.proportion}
              softness={shaderConfig.softness}
              distortion={shaderConfig.distortion}
              swirl={shaderConfig.swirl}
              swirlIterations={shaderConfig.swirlIterations}
              shape={shaderConfig.shape}
              shapeScale={shaderConfig.shapeScale}
              scale={1}
              rotation={0}
              speed={isVisible ? 0.35 : 0}
              colors={shaderConfig.colors}
            />
          ) : (
            <div
              className="w-full h-full"
              style={{
                background: `radial-gradient(circle at ${30 + (index % 3) * 20}% ${40 + (index % 2) * 20}%, ${shaderConfig.colors[1]} 0%, ${shaderConfig.colors[0]} 50%, rgba(10, 5, 5, 0.95) 100%)`,
                opacity: 0.65,
              }}
            />
          )}
        </div>

        {/* Dark Masked Card Content */}
        <div className="relative z-10 p-6 sm:p-7 rounded-2xl h-full flex flex-col justify-between bg-black/80 backdrop-blur-[6px] border border-white/10">
          <div>
            <div className="clay-icon-well w-12 h-12 flex items-center justify-center mb-4">
              {feature.icon}
            </div>

            <h3 className="text-xl font-bold mb-2 text-white font-heading">
              {feature.title}
            </h3>

            <p className="leading-relaxed text-zinc-300 text-sm font-light">
              {feature.description}
            </p>
          </div>

          <div className="flex items-center text-xs font-mono font-semibold uppercase tracking-wider text-red-300 group-hover:text-white transition-colors">
            <span className="mr-2">Explore Capability</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export const FeaturesCards: React.FC = () => {
  return (
    <section id="features-cards" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <div className="clay-badge inline-flex items-center gap-2 px-4 py-2 text-red-300 text-xs font-semibold uppercase tracking-widest mb-4 font-mono">
            Engineering Precision
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 font-heading">
            Technology Standards
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
            Everything engineered to deliver enterprise reliability, visual excellence, and measurable business yield.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ShaderCard
              key={index}
              feature={feature}
              index={index}
              shaderConfig={SHADER_CONFIGS[index % SHADER_CONFIGS.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesCards;

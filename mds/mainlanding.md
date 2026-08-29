# mainlanding.md

## Purpose

This file is the implementation prompt for integrating the provided React `ParticleHero` component into the Navya Tech Industry website.

Antigravity or any other AI development agent must read and follow this file when implementing this component.

The component must be integrated into the existing Navya Tech Industry codebase while preserving the supplied component's structure, animation, interaction, and visual behavior.

---

## Project Requirements

You are given a task to integrate an existing React component in the codebase.

The codebase should support:
- shadcn project structure
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles.
If default path for components is not /components/ui, provide instructions on why it's important to create this folder.

Copy-paste this component to /components/ui folder:

animated-hero.tsx

```tsx
import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface ParticleHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButton?: {
    text: string;
    onClick: () => void;
  };
  secondaryButton?: {
    text: string;
    onClick: () => void;
  };
  interactiveHint?: string;
  className?: string;
  particleCount?: number;
  children?: ReactNode;
}

export const ParticleHero: React.FC<ParticleHeroProps> = ({
  title = "FLUX",
  subtitle = "Digital Inferno",
  description = "Experience the mesmerizing dance of light and motion.",
  primaryButton,
  secondaryButton,
  interactiveHint = "Move to Create",
  className = "",
  particleCount = 15,
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const animationFrameRef = useRef<number>();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [staticCursor, setStaticCursor] = useState({ x: 0, y: 0 });
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [isStaticAnimation, setIsStaticAnimation] = useState(false);
  const startTimeRef = useRef(Date.now());
  const lastMouseMoveRef = useRef(Date.now());

  const rows = particleCount;
  const totalParticles = rows * rows;

  // Initialize particles
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = '';
    particlesRef.current = [];

    for (let i = 0; i < totalParticles; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle absolute rounded-full will-change-transform';

      // Calculate grid position
      const row = Math.floor(i / rows);
      const col = i % rows;
      const centerRow = Math.floor(rows / 2);
      const centerCol = Math.floor(rows / 2);

      // Distance from center for stagger effects
      const distanceFromCenter = Math.sqrt(
        Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2)
      );

      // Staggered scale (larger in center)
      const scale = Math.max(0.1, 1.2 - distanceFromCenter * 0.12);

      // Staggered opacity (more opaque in center)
      const opacity = Math.max(0.05, 1 - distanceFromCenter * 0.1);

      // Color intensity based on distance
      const lightness = Math.max(15, 75 - distanceFromCenter * 6);

      // Glow intensity
      const glowSize = Math.max(0.5, 6 - distanceFromCenter * 0.5);

      particle.style.cssText = `
        width: 0.4rem;
        height: 0.4rem;
        left: ${col * 1.8}rem;
        top: ${row * 1.8}rem;
        transform: scale(${scale});
        opacity: ${opacity};
        background: hsl(4, 85%, ${lightness}%);
        box-shadow: 0 0 ${glowSize * 0.2}rem 0 hsl(4, 85%, 60%);
        mix-blend-mode: screen;
        z-index: ${Math.round(totalParticles - distanceFromCenter * 5)};
        transition: transform 0.05s linear;
      `;

      container.appendChild(particle);
      particlesRef.current.push(particle);
    }
  }, [rows, totalParticles]);

  // Continuous animation
  useEffect(() => {
    const animate = () => {
      const currentTime = (Date.now() - startTimeRef.current) * 0.001;

      if (isAutoMode) {
        const x = Math.sin(currentTime * 0.3) * 200 + Math.sin(currentTime * 0.17) * 100;
        const y = Math.cos(currentTime * 0.2) * 150 + Math.cos(currentTime * 0.23) * 80;
        setCursor({ x, y });
      } else if (isStaticAnimation) {
        const timeSinceLastMove = Date.now() - lastMouseMoveRef.current;

        if (timeSinceLastMove > 200) {
          const animationStrength = Math.min((timeSinceLastMove - 200) / 1000, 1);
          const subtleX = Math.sin(currentTime * 1.5) * 20 * animationStrength;
          const subtleY = Math.cos(currentTime * 1.2) * 16 * animationStrength;

          setCursor({
            x: staticCursor.x + subtleX,
            y: staticCursor.y + subtleY
          });
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAutoMode, isStaticAnimation, staticCursor]);

  // Update particle positions
  useEffect(() => {
    particlesRef.current.forEach((particle, i) => {
      const row = Math.floor(i / rows);
      const col = i % rows;
      const centerRow = Math.floor(rows / 2);
      const centerCol = Math.floor(rows / 2);

      const distanceFromCenter = Math.sqrt(
        Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2)
      );

      const delay = distanceFromCenter * 8;
      const originalScale = Math.max(0.1, 1.2 - distanceFromCenter * 0.12);
      const dampening = Math.max(0.3, 1 - distanceFromCenter * 0.08);

      setTimeout(() => {
        const moveX = cursor.x * dampening;
        const moveY = cursor.y * dampening;

        particle.style.transform = `translate(${moveX}px, ${moveY}px) scale(${originalScale})`;
        particle.style.transition = `transform ${120 + distanceFromCenter * 20}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
      }, delay);
    });
  }, [cursor, rows]);

  // Mouse/touch movement handler
  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    const event = 'touches' in e ? e.touches[0] : e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const newCursor = {
      x: (event.clientX - centerX) * 0.8,
      y: (event.clientY - centerY) * 0.8
    };

    setCursor(newCursor);
    setStaticCursor(newCursor);
    setIsAutoMode(false);
    setIsStaticAnimation(false);
    lastMouseMoveRef.current = Date.now();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsStaticAnimation(true);
    }, 500);

    setTimeout(() => {
      if (Date.now() - lastMouseMoveRef.current >= 4000) {
        setIsAutoMode(true);
        setIsStaticAnimation(false);
        startTimeRef.current = Date.now();
      }
    }, 4000);
  };

  return (
    <section
      className={`relative w-full min-h-screen bg-black overflow-hidden ${className}`}
      onMouseMove={handlePointerMove}
      onTouchMove={handlePointerMove}
    >
      {/* Particle Animation Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={containerRef}
          className="relative"
          style={{
            width: `${rows * 1.8}rem`,
            height: `${rows * 1.8}rem`
          }}
        />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        {children ? (
          children
        ) : (
          <div className="text-center max-w-6xl mx-auto">
            {/* Main Title */}
            <div className="mb-16">
              <h1 className="text-8xl md:text-[10rem] lg:text-[14rem] xl:text-[16rem] font-black tracking-tighter leading-[0.8] mb-8">
                <span className="bg-gradient-to-b from-red-300 via-red-500 to-red-800 bg-clip-text text-transparent drop-shadow-2xl">
                  {title}
                </span>
              </h1>

              {/* Subtitle */}
              <div className="space-y-4">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-thin text-red-200/90 tracking-[0.2em] uppercase">
                  {subtitle}
                </h2>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto"></div>
              </div>
            </div>

            {/* Description */}
            {description && (
              <div className="mb-20">
                <p className="text-lg md:text-xl lg:text-2xl text-red-100/60 font-light max-w-3xl mx-auto leading-relaxed">
                  {description}
                </p>
              </div>
            )}

            {/* Call to Action */}
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                {primaryButton && (
                  <button
                    onClick={primaryButton.onClick}
                    className="group relative px-12 py-6 bg-transparent border border-red-500/30 hover:border-red-400 text-red-200 hover:text-white font-medium text-lg tracking-wider uppercase transition-all duration-500 overflow-hidden"
                  >
                    <span className="relative z-10">{primaryButton.text}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-500/20 to-red-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </button>
                )}

                {secondaryButton && (
                  <button
                    onClick={secondaryButton.onClick}
                    className="px-8 py-4 border-2 border-white/20 hover:border-red-400 text-white hover:text-red-400 font-semibold rounded-full transition-all duration-300 backdrop-blur-sm"
                  >
                    {secondaryButton.text}
                  </button>
                )}
              </div>

              {/* Interactive hint */}
              {interactiveHint && (
                <div className="flex items-center justify-center gap-6 text-red-400/40 text-sm uppercase tracking-[0.3em]">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent to-red-500/30"></div>
                  <span className="animate-pulse">{interactiveHint}</span>
                  <div className="w-12 h-px bg-gradient-to-l from-transparent to-red-500/30"></div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Ambient Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-80 h-80 bg-red-600/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120vh] h-[120vh] bg-gradient-radial from-red-900/3 to-transparent rounded-full"></div>
      </div>
    </section>
  );
};

demo.tsx

import { ParticleHero } from '@/components/ui/animated-hero'

// Demo Component
const ParticleHeroDemo = () => {
  return (
    <div className="min-h-screen w-full">
      <ParticleHero
        title="Navya"
        subtitle="Tech Industry "
        description="Growth shouldn’t be this stressful. We’ll take the headache. You handle the business. We’ll handle the chaos behind the growth."
        particleCount={10}
        interactiveHint="Hover to Interact"
        primaryButton={{
          text: "Let's Fix!",
          onClick: () => console.log("Started!")
        }}
      />
    </div>
  );
};

export default ParticleHeroDemo;
```

---

## Navya Tech Industry Integration Requirements

This component is for the Navya Tech Industry website.

Use the component as part of the company's professional corporate website.

The component must not be treated as an isolated demo.

The final rendered content must use exactly:

Title:
Navya

Subtitle:
Tech Industry 

Description:
Growth shouldn’t be this stressful. We’ll take the headache. You handle the business. We’ll handle the chaos behind the growth.

Primary button:
Let's Fix!

Interactive hint:
Hover to Interact

---

## Critical Content Rules

Do not rewrite, paraphrase, shorten, expand, or improve the provided Navya Tech Industry copy.

The exact visible copy must remain:

"Navya"

"Tech Industry "

"Growth shouldn’t be this stressful. We’ll take the headache. You handle the business. We’ll handle the chaos behind the growth."

"Let's Fix!"

"Hover to Interact"

Do not add additional marketing copy to this component.

Do not replace the supplied messaging with generic AI-generated corporate copy.

---

## Integration Rules

1. Preserve the existing particle animation.
2. Preserve the existing pointer interaction.
3. Preserve the existing automatic particle movement.
4. Preserve the existing static animation behavior.
5. Preserve the existing responsive layout.
6. Preserve the existing ambient effects.
7. Preserve the existing CTA behavior.
8. Preserve the existing component API.
9. Preserve the existing TypeScript structure.
10. Preserve the existing Tailwind implementation.
11. Do not convert the component into a static hero.
12. Do not replace the particle system with an unrelated animation.
13. Do not remove functionality merely to simplify implementation.
14. Do not introduce unrelated libraries unless the existing project requires them.
15. Integrate the component into the existing Navya Tech Industry website rather than creating a separate demo-only page.

---

## Workspace Context

The component must follow the website structure defined in:

`structure.md`

It must also use the company information defined in:

`base_information.md`

Those files are authoritative for Navya Tech Industry's website structure and company context.

Do not contradict those files.

Do not invent company facts that are not defined in the workspace resources.

---

## Implementation Verification

After implementation:

1. Run the project.
2. Open the relevant page in the browser.
3. Verify that the hero renders correctly.
4. Verify that the particle animation works.
5. Verify mouse interaction.
6. Verify touch interaction.
7. Verify the CTA renders correctly.
8. Verify the text does not overflow on desktop.
9. Verify the text does not overflow on tablet.
10. Verify the text does not overflow on mobile.
11. Verify there are no console errors.
12. Verify there are no TypeScript errors.
13. Verify the component does not break surrounding website sections.
14. Verify the final result matches the professional Navya Tech Industry website direction.

Do not stop after creating the component file.

The component must be properly integrated and visually verified in the running website.

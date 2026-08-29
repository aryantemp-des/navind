# Antigravity Integration Prompt: NAVYA / TECH / INDUSTRY Parallax Hero

## Task

Integrate the React parallax component below into the existing codebase.

This is the **first time this prompt is being sent to Antigravity**. Do not assume that any setup, files, dependencies, directories, routes, styles, or previous implementation steps already exist.

Treat this entire Markdown file as the implementation specification and complete the integration from start to finish.

## Required Stack

The codebase must support:

- shadcn project structure
- Tailwind CSS
- TypeScript

If these are not already supported, inspect the project first and set up the missing requirements using the appropriate shadcn CLI workflow. Install/configure Tailwind CSS and TypeScript as needed without unnecessarily replacing an existing working application.

## Component Location

Determine the existing default paths for components and styles.

The main component must be created at:

`/components/ui/parallax-scrolling.tsx`

If the project uses a different component directory, create/use `/components/ui` so the component follows the requested shadcn structure. Update imports consistently.

## Fresh Integration Requirements

- Create all missing directories and files required by this implementation.
- Install all required npm dependencies.
- Preserve TypeScript compatibility.
- Preserve the supplied GSAP, ScrollTrigger, and Lenis behavior.
- Make the implementation responsive on mobile, tablet, and desktop.
- Do not remove unrelated existing application functionality.
- Ensure there are no broken imports, TypeScript errors, or runtime errors.
- Render the component from an appropriate page/demo route.
- Validate the final implementation with the project's available build/type-check/lint commands.

# Required Content Change

The original single heading:

`Parallax`

must be replaced with **three separate vertically stacked headings**:

1. `NAVYA`
2. `TECH`
3. `INDUSTRY`

The final visual hierarchy should read:

```text
NAVYA
TECH
INDUSTRY
```

Do not put all three words into one heading. Use three separate heading elements and integrate them into the existing parallax title layer.

Preserve the supplied visual character and layered depth. Do not add unrelated marketing copy or decorative UI.

# Component

Create:

`/components/ui/parallax-scrolling.tsx`

Use this implementation:

```tsx
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

export function ParallaxComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector(
      "[data-parallax-layers]"
    );

    if (triggerElement) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 0,
        },
      });

      const layers = [
        { layer: "1", yPercent: 70 },
        { layer: "2", yPercent: 55 },
        { layer: "3", yPercent: 40 },
        { layer: "4", yPercent: 10 },
      ];

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(
            `[data-parallax-layer="${layerObj.layer}"]`
          ),
          {
            yPercent: layerObj.yPercent,
            ease: "none",
          },
          idx === 0 ? undefined : "<"
        );
      });
    }

    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf(triggerElement);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="parallax" ref={parallaxRef}>
      <section className="parallax__header">
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow"></div>

          <div data-parallax-layers className="parallax__layers">
            <img
              src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795be09b462b2e8ebf71_osmo-parallax-layer-3.webp"
              loading="eager"
              width="800"
              data-parallax-layer="1"
              alt=""
              className="parallax__layer-img"
            />

            <img
              src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795b4d5ac529e7d3a562_osmo-parallax-layer-2.webp"
              loading="eager"
              width="800"
              data-parallax-layer="2"
              alt=""
              className="parallax__layer-img"
            />

            <div
              data-parallax-layer="3"
              className="parallax__layer-title"
            >
              <div className="parallax__title-stack">
                <h2 className="parallax__title">NAVYA</h2>
                <h2 className="parallax__title">TECH</h2>
                <h2 className="parallax__title">INDUSTRY</h2>
              </div>
            </div>

            <img
              src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795bb5aceca85011ad83_osmo-parallax-layer-1.webp"
              loading="eager"
              width="800"
              data-parallax-layer="4"
              alt=""
              className="parallax__layer-img"
            />
          </div>

          <div className="parallax__fade"></div>
        </div>
      </section>

      <section className="parallax__content">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          viewBox="0 0 160 160"
          fill="none"
          className="osmo-icon-svg"
          aria-hidden="true"
        >
          <path
            d="M94.8284 53.8578C92.3086 56.3776 88 54.593 88 51.0294V0H72V59.9999C72 66.6273 66.6274 71.9999 60 71.9999H0V87.9999H51.0294C54.5931 87.9999 56.3777 92.3085 53.8579 94.8283L18.3431 130.343L29.6569 141.657L65.1717 106.142C67.684 103.63 71.9745 105.396 72 108.939V160L88.0001 160L88 99.9999C88 93.3725 93.3726 87.9999 100 87.9999H160V71.9999H108.939C105.407 71.9745 103.64 67.7091 106.12 65.1938L106.142 65.1716L141.657 29.6568L130.343 18.3432L94.8284 53.8578Z"
            fill="currentColor"
          />
        </svg>
      </section>
    </div>
  );
}
```

## Required Styling

The supplied component depends on CSS classes that are not included in the component source.

Inspect the existing styling architecture and provide the required styling for:

- `.parallax`
- `.parallax__header`
- `.parallax__visuals`
- `.parallax__black-line-overflow`
- `.parallax__layers`
- `.parallax__layer-img`
- `.parallax__layer-title`
- `.parallax__title-stack`
- `.parallax__title`
- `.parallax__fade`
- `.parallax__content`
- `.osmo-icon-svg`
- `.osmo-credits`
- `.osmo-credits__p`
- `.osmo-credits__p-a`

Integrate the styles into the existing global stylesheet when appropriate instead of creating unnecessary duplicate styling systems.

The three headings must be:

- separate elements
- vertically stacked
- prominent
- centered/readable
- responsive
- visually integrated into the parallax depth
- free from horizontal overflow

## Demo / Route

Create or update an appropriate demo/page using:

```tsx
"use client";

import { ParallaxComponent } from "@/components/ui/parallax-scrolling";

export default function ParallaxDemo() {
  return (
    <>
      <ParallaxComponent />

      <div className="osmo-credits">
        <p className="osmo-credits__p">
          Resource by{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.osmo.supply/"
            className="osmo-credits__p-a"
          >
            Osmo
          </a>
        </p>
      </div>
    </>
  );
}
```

Adapt the route to the existing framework if necessary, while preserving the component import and rendering.

## Dependencies

Install:

```bash
npm install gsap @studio-freight/lenis
```

Use the project's existing package manager if it is not npm.

Do not install duplicate versions unnecessarily.

## Implementation Guidelines

1. Analyze the existing project before modifying it.
2. Identify the framework, routing system, shadcn setup, Tailwind setup, TypeScript configuration, global styles, and component directories.
3. Identify all required dependencies and install them.
4. Preserve the component's GSAP/ScrollTrigger/Lenis behavior.
5. Ensure animation cleanup is safe.
6. Avoid duplicate Lenis instances or leaking animation/listener resources.
7. Keep the supplied remote WebP parallax assets unless deployment requirements genuinely require local assets.
8. Do not replace working supplied imagery with random Unsplash images.
9. If additional icons are required, use `lucide-react`.
10. Do not add unnecessary UI components.

## Responsive Behavior

The final implementation must work on:

- mobile
- tablet
- laptop
- desktop
- large desktop

On smaller screens:

- keep NAVYA, TECH, and INDUSTRY readable
- reduce typography size where necessary
- prevent horizontal scrolling
- preserve the parallax effect
- keep images correctly positioned
- keep the three-heading stack inside the intended visual composition

Prefer responsive CSS/Tailwind media queries instead of JavaScript viewport detection.

## Performance

Because this is scroll-driven animation:

- use GSAP efficiently
- avoid unnecessary React re-renders
- clean up ScrollTrigger instances
- destroy Lenis on unmount
- avoid leaked ticker/listener resources
- respect reduced-motion preferences where practical
- provide a sensible reduced-motion fallback when `prefers-reduced-motion: reduce` is enabled

## Final Visual Direction

The hero should feel like a polished technology/industry landing page rather than a generic component demo.

The central identity is:

**NAVYA**
**TECH**
**INDUSTRY**

These should feel like one coherent brand system while remaining three distinct headings.

Do not add:

- generic AI marketing copy
- random gradients
- unrequested cards
- unrequested navigation
- stock illustrations
- unrelated sections
- random decorative UI

Keep the supplied parallax concept as the foundation.

## Validation Checklist

Before finishing, verify:

- [ ] shadcn structure is supported
- [ ] Tailwind CSS works
- [ ] TypeScript works
- [ ] `/components/ui/parallax-scrolling.tsx` exists
- [ ] component imports correctly
- [ ] GSAP is installed
- [ ] `@studio-freight/lenis` is installed
- [ ] ScrollTrigger works
- [ ] Lenis smooth scrolling works
- [ ] supplied parallax layers render
- [ ] NAVYA is visible
- [ ] TECH is visible below NAVYA
- [ ] INDUSTRY is visible below TECH
- [ ] the three headings are separate elements
- [ ] the headings participate in the parallax composition
- [ ] responsive behavior works
- [ ] no unwanted horizontal scrolling occurs
- [ ] animation cleanup works
- [ ] no TypeScript errors remain
- [ ] no broken imports remain
- [ ] no runtime errors remain
- [ ] final application builds successfully
- [ ] component is rendered from an appropriate page/demo route

## Final Instruction

Do not merely explain how to implement this.

**Implement it in the codebase.**

The finished result must be a working, polished parallax hero featuring:

**NAVYA → TECH → INDUSTRY**

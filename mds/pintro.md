# Hero Parallax Integration Prompt

## Important Context

This prompt has **not been provided to Antigravity before**.

Treat this document as the complete source of truth for this implementation. Do not assume that any previous version of this component, page, styling, content, asset setup, or integration has already been provided.

Inspect the existing codebase first and then implement the component cleanly within the existing application architecture.

---

# 1. Project Requirements

You are given a task to integrate an existing React component into the codebase.

The codebase should support:

- shadcn project structure
- Tailwind CSS
- TypeScript
- React
- Next.js-compatible client components where required

If the existing project does not support these requirements:

1. Determine the current framework and project setup.
2. Configure the project appropriately.
3. Use the shadcn CLI if shadcn is not already configured.
4. Install/configure Tailwind CSS if it is missing.
5. Ensure TypeScript is configured correctly.
6. Do not unnecessarily replace an existing working configuration.

Use the project's existing package manager. Do not mix npm, pnpm, yarn, or bun unnecessarily.

---

# 2. Component Directory

Determine the default path used by the existing project for UI components and styles.

The primary component must be created at:

`/components/ui/hero-parallax.tsx`

If the project does not currently have `/components/ui`, create it.

Keep the component in `/components/ui` so it follows the shadcn component structure and remains reusable independently from the page that consumes it.

Do not place the main component directly inside a page or route unless the existing architecture absolutely requires it.

---

# 3. Component to Integrate

Create:

`/components/ui/hero-parallax.tsx`

Use the following component as the implementation baseline:

```tsx
"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />

      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>

        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>

        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
        The Ultimate <br /> development studio
      </h1>

      <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
        We engineer intelligent systems that simplify complexity, strengthen
        businesses, and create lasting value. Modern technology, purposeful
        design, and automation come together to build what’s next.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl"
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </Link>

      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>

      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};
```

The component uses:

- React
- Framer Motion
- Next.js `Image`
- Next.js `Link`
- `useScroll`
- `useTransform`
- `useSpring`
- `MotionValue`

Do not add unrelated dependencies.

---

# 4. Required Dependency

Install:

```bash
framer-motion
```

If it is already installed, do not reinstall it.

The component must use the project's existing dependency conventions.

---

# 5. Demo / Integration

Create or adapt the appropriate page/component to render the HeroParallax component.

Use this as the baseline integration:

```tsx
"use client";

import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";

export function HeroParallaxDemo() {
  return (
    <div className="min-h-screen w-full">
      <div className="absolute top-0 left-0 w-full">
        <HeroParallax products={products} />
      </div>
    </div>
  );
}

export const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/rogue.png",
  },
  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editorially.png",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },
  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
  },
  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/invoker.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
];
```

---

# 6. Important Content Rule

The only copy change requested in the original component is the paragraph under the main heading.

Replace the original text:

`We build beautiful products with the latest technologies and frameworks. We are a team of passionate developers and designers that love to build amazing products.`

with exactly:

`We engineer intelligent systems that simplify complexity, strengthen businesses, and create lasting value. Modern technology, purposeful design, and automation come together to build what’s next.`

Do not alter this requested replacement.

Do not retain the old paragraph anywhere in the final implementation.

---

# 7. Existing Heading

The component currently contains:

`The Ultimate development studio`

Do not change this heading unless the existing application's design system or route architecture requires a modification for proper integration.

The explicitly requested content change is the paragraph only.

---

# 8. Product Content Strategy

The supplied product list is a demonstration dataset.

Before blindly using external demo products as permanent production content:

1. Inspect the existing application for real project, portfolio, case-study, or product data.
2. If relevant existing data exists, adapt the component to use it while preserving the required `title`, `link`, and `thumbnail` shape.
3. If no appropriate data exists, use the supplied list as temporary demonstration content.
4. Do not invent fake clients, fake case studies, fake metrics, or fake business claims.

The component requires up to 15 items because it distributes products across three rows.

If fewer than 15 real items exist, the implementation must still work correctly.

Do not create meaningless filler cards solely to reach 15.

---

# 9. Image Assets

The component uses remote images through Next.js `Image`.

If the supplied external thumbnails are retained, configure `next.config` appropriately for the required remote image host if the framework requires it.

Do not blindly add broad wildcard image domains.

Use the narrowest safe configuration supported by the project's Next.js version.

If the application already contains appropriate local assets, prefer those over unnecessary external images.

If image assets genuinely need to be replaced, use reliable Unsplash stock images where appropriate.

Do not download an entire website or template.

---

# 10. Link Behavior

The product cards use links.

Inspect the project architecture and determine whether these links should remain external links or point to internal case-study/project routes.

Do not fabricate internal routes that do not exist.

For external destinations, preserve the supplied URLs unless the project provides an intentional replacement.

Use accessible link behavior and avoid broken navigation.

---

# 11. Design Direction

The HeroParallax component should feel like part of a real technology/business website.

Preserve the core visual characteristics:

- Three horizontal product/image rows
- Scroll-driven horizontal movement
- Perspective effect
- Spring-based motion
- Hover lift interaction
- Dark premium visual language
- Large editorial headline
- Supporting business statement

However, do not make the page feel like an untouched component-library demo.

The purpose of the section is to communicate:

- intelligent systems
- technology
- automation
- business value
- purposeful design
- modern digital experiences

The visual treatment should support that message.

Avoid:

- excessive glassmorphism
- meaningless glowing gradients
- generic AI slop
- oversized decorative text everywhere
- unnecessary badges
- fake statistics
- fake awards
- fake testimonials
- random stock photography
- visual clutter
- excessive animations that compete with the content

The page should feel polished, intentional, modern, and credible.

---

# 12. Responsive Behavior

The component must work across:

- mobile phones
- tablets
- laptops
- desktop displays
- large/high-resolution screens

Inspect the current component carefully because its desktop dimensions are intentionally large.

Adapt where necessary so mobile users do not encounter:

- broken horizontal scrolling
- accidental page-level horizontal overflow
- unreadable text
- inaccessible cards
- clipped content
- broken perspective behavior

Preserve the visual concept rather than simply deleting the parallax effect on mobile.

Use responsive Tailwind utilities where appropriate.

---

# 13. Animation Behavior

Preserve the supplied Framer Motion behavior:

- horizontal movement based on scroll progress
- reverse movement on the second row
- spring smoothing
- initial perspective rotation
- opacity transition
- vertical movement
- hover lift on product cards

Do not introduce another animation library.

Do not create redundant animation loops.

Ensure animations are cleaned up through Framer Motion's normal React lifecycle.

Where practical, respect `prefers-reduced-motion` so users who request reduced motion are not subjected to unnecessary movement.

---

# 14. Performance

The component can be animation-heavy, so implementation quality matters.

Ensure:

- no unnecessary React state is introduced
- no unnecessary scroll event listeners are added
- Framer Motion handles scroll-linked animation
- images use appropriate dimensions
- images do not cause avoidable layout shifts
- external image loading is configured correctly
- unused dependencies are not added
- the page does not render duplicate HeroParallax instances accidentally

Do not optimize away the core effect simply because it moves.

---

# 15. Accessibility

Ensure the final implementation is reasonably accessible.

- Every image must have meaningful `alt` text.
- Links must be identifiable and usable.
- Heading hierarchy must remain semantic.
- Text contrast must be sufficient.
- Hover should not be the only way to discover important information.
- Motion should not prevent users from accessing content.
- Reduced-motion preferences should be respected where practical.

The product title should remain available as meaningful text, not merely appear as a decorative hover effect.

---

# 16. TypeScript Requirements

Use proper TypeScript types.

The `products` prop must retain the structure:

```ts
{
  title: string;
  link: string;
  thumbnail: string;
}[]
```

Avoid unnecessary `any`.

Use appropriate React and Framer Motion types.

Do not suppress TypeScript errors with broad `@ts-ignore` or `@ts-nocheck`.

---

# 17. Implementation Guidelines

Before modifying files:

1. Analyze the component structure.
2. Identify all required dependencies.
3. Review component props and state.
4. Identify required hooks.
5. Identify whether context providers are required.
6. Inspect the existing routing structure.
7. Inspect existing page/layout components.
8. Inspect the existing design system.
9. Inspect whether `lucide-react` is already installed before adding it.
10. Identify existing image handling/configuration.

Resolve the following through codebase inspection rather than asking the user unnecessarily:

- What data/props should be passed?
- Are there state-management requirements?
- Are assets already available?
- What responsive behavior does the existing site use?
- Where is the best place to use this component?

---

# 18. Integration Steps

Follow this order.

### Step 0: Inspect the repository

Determine:

- framework
- package manager
- app/router structure
- component structure
- Tailwind setup
- TypeScript setup
- shadcn setup
- image configuration
- existing page/landing-page architecture

### Step 1: Configure prerequisites

Install only missing requirements.

Required external dependency:

```bash
framer-motion
```

### Step 2: Create the component

Create:

`/components/ui/hero-parallax.tsx`

Implement the supplied HeroParallax, Header, and ProductCard components.

### Step 3: Apply the required copy

Use exactly:

`We engineer intelligent systems that simplify complexity, strengthen businesses, and create lasting value. Modern technology, purposeful design, and automation come together to build what’s next.`

### Step 4: Integrate the hero

Render the HeroParallax in the most appropriate existing page or route.

Do not leave the component unused.

### Step 5: Connect real data where appropriate

If the project already has portfolio/case-study/product data, use it.

Otherwise use the supplied demonstration dataset.

### Step 6: Validate

Run the appropriate development, typecheck, lint, build, and test commands available in the project.

Fix issues introduced by the implementation.

---

# 19. Do Not Rewrite the Entire Application

This is an integration task.

Do not:

- replace the existing framework
- replace the existing routing system
- replace the entire Tailwind configuration
- replace the entire design system
- rewrite unrelated pages
- delete existing application functionality
- install an unrelated website template
- copy a complete external website
- download an entire external project

Modify only what is necessary to implement the requested component correctly.

---

# 20. Use Lucide Icons Where Needed

If the final surrounding page requires icons:

- use `lucide-react`
- use existing project icon conventions where available
- do not manually draw SVG icons unnecessarily

The supplied HeroParallax component itself does not require additional icons.

Do not add icons just to make the page look more "designed."

---

# 21. No AI-Slop Design

The result must not look like a generic AI-generated landing page.

Specifically avoid the common pattern of:

- giant gradient blobs
- meaningless glowing cards
- excessive rounded containers
- random purple/blue gradients
- generic "Build the future with AI" copy
- fake dashboard screenshots
- unnecessary floating pills
- fake metrics
- repetitive cards
- excessive shadows
- decorative UI that has no purpose

The parallax imagery already provides the visual movement. Let the composition, typography, spacing, imagery, and motion carry the design.

---

# 22. Validation Checklist

Before considering the task complete, verify all of the following:

- [ ] Project supports TypeScript.
- [ ] Project supports Tailwind CSS.
- [ ] Project follows shadcn-compatible structure.
- [ ] `/components/ui/hero-parallax.tsx` exists.
- [ ] `framer-motion` is installed.
- [ ] HeroParallax is actually used by a page/route.
- [ ] The three-row parallax effect works.
- [ ] Scroll-linked movement works.
- [ ] Spring animation works.
- [ ] Hover lift works.
- [ ] Images load correctly.
- [ ] Remote image configuration is valid if required.
- [ ] Links do not point to broken routes.
- [ ] Mobile layout does not introduce accidental horizontal page overflow.
- [ ] Desktop layout remains visually strong.
- [ ] TypeScript has no new errors.
- [ ] Lint/build checks pass where available.
- [ ] No unused imports remain.
- [ ] No original paragraph remains.
- [ ] The replacement paragraph appears exactly as specified.
- [ ] No fake business claims have been introduced.
- [ ] Existing application functionality remains intact.

---

# 23. Final Required Copy

The final Header paragraph must be exactly:

> We engineer intelligent systems that simplify complexity, strengthen businesses, and create lasting value. Modern technology, purposeful design, and automation come together to build what’s next.

Do not modify, shorten, paraphrase, or "improve" this sentence.

---

# 24. Final Expected Result

The completed implementation should deliver a polished, production-ready HeroParallax section that combines:

- modern technology positioning
- intelligent systems messaging
- purposeful design
- automation
- business value
- premium visual presentation
- smooth scroll-driven parallax
- responsive behavior
- maintainable TypeScript
- shadcn-compatible component structure

The final result should feel like a real technology company's landing page, not a component demo pasted into a blank page.

Implement the complete integration now based on this document and the existing codebase.

# Payment Quotation Hero Integration Prompt

You are given a task to integrate an existing React component into the codebase and use it as the hero section for a payment quotation-focused landing page.

## Important Context

This prompt has **not been provided to Antigravity before**. Treat this document as the complete source of truth for the implementation.

Do not assume that any previous version of this component, page, prompt, styling, or integration exists in the project. Inspect the existing codebase first, then implement everything required from this document.

The final result should feel like a deliberate, production-quality business website, not a pasted component demo.

---

## 1. Required Project Support

The codebase should support:

- shadcn project structure
- Tailwind CSS
- TypeScript
- React / Next.js-compatible client components where required

If the existing project does not support these requirements:

1. Determine the current framework and project structure.
2. Provide and execute the appropriate setup steps where possible.
3. Use the shadcn CLI when shadcn is not already configured.
4. Install/configure Tailwind CSS if it is missing.
5. Ensure TypeScript is properly configured.
6. Do not unnecessarily replace or rebuild an already-working project configuration.

### Component directory

Determine the project's default component path.

The primary component must live at:

`/components/ui/aurora-background-2.tsx`

If the project uses a different component directory, explain internally why `/components/ui` is important for consistency with the shadcn structure and create/use that directory rather than scattering the component elsewhere.

Preserve the project's existing conventions wherever they do not conflict with this requirement.

---

# 2. Component to Integrate

Create:

`/components/ui/aurora-background-2.tsx`

Use the following component as the implementation baseline:

```tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

// Extend JSX to recognize <lottie-player>
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lottie-player": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src: string;
          background: string;
          speed: string;
          loop?: boolean;
          autoplay?: boolean;
        },
        HTMLElement
      >;
    }
  }
}

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * AuroraBackground
 *
 * Creates a mesmerizing aurora-like animated background
 * using blurred, colored radial gradients and Framer Motion.
 */
const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <main>
      <div
        className={`relative flex flex-col h-screen items-center justify-center bg-zinc-900 text-slate-900 transition-bg dark:bg-zinc-900 dark:text-slate-200 ${className}`}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* Base blurred gradient */}
          <div className="absolute h-full w-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-sky-400 via-rose-400 to-lime-400 opacity-20 [filter:blur(120px)]"></div>

          {/* Animated blobs */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
            className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
            className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"
          />
        </div>

        {children}
      </div>
    </main>
  );
};

export default AuroraBackground;
```

Do not blindly duplicate imports, configuration, or dependencies if the project already has equivalent implementations.

---

# 3. Dependencies

Install the required dependency:

```bash
npm install framer-motion
```

If the project uses another package manager, use its existing package-manager convention instead of mixing package managers.

The Lottie player is loaded dynamically from the existing external script URL in the demo. Do not introduce an unnecessary package if the dynamic script approach works correctly.

---

# 4. Demo / Hero Implementation

Create the appropriate page/component integration using the following implementation as the baseline.

The demo is not merely a test. Adapt it into the actual payment quotation hero experience.

```tsx
"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AuroraBackground from "@/components/ui/aurora-background-2";

const DemoOne = () => {
  useEffect(() => {
    // Dynamically load the lottie-player script
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <AuroraBackground>
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.9, ease: "easeInOut" }}
        >
          <lottie-player
            src="https://lottie.host/8cf4ba71-e5fb-44f3-8134-178c4d389417/0CCsdcgNIP.json"
            background="transparent"
            speed="1"
            style={{ width: "250px", height: "250px" }}
            loop
            autoplay
          ></lottie-player>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9, ease: "easeInOut" }}
          className="text-4xl font-bold text-white md:text-6xl"
        >
          Aurora Background
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.9, ease: "easeInOut" }}
          className="mt-4 text-lg text-gray-300 md:text-xl max-w-lg"
        >
          A beautiful and unique aurora-like background effect using Framer Motion.
        </motion.p>
      </div>
    </AuroraBackground>
  );
};

export default DemoOne;
```

---

# 5. Required Copy Changes

The following copy changes are mandatory.

Do not leave the original demo copy anywhere in the final implementation.

### Hero heading

Replace:

`Aurora Background`

with:

`Worried about payment?`

### Hero supporting text

Replace:

`A beautiful and unique aurora-like background effect using Framer Motion.`

with:

`We have designed most affordable payment quotation keeping best reaources and services to serve`

Preserve the wording exactly as provided above. Do not silently rewrite it, correct its spelling, or change its meaning.

---

# 6. Final Hero Copy

The visible hero should therefore communicate:

**Worried about payment?**

We have designed most affordable payment quotation keeping best reaources and services to serve

The component's aurora visual should support this business message rather than looking like a generic animation demo.

---

# 7. Design Direction

The original component is an animated visual background. Keep that visual concept, but integrate it into a professional payment/business context.

The implementation should:

- Keep the animated aurora-style background.
- Keep the dark premium visual foundation.
- Keep the Framer Motion entrance animations.
- Keep the centered hero composition.
- Make the typography feel intentional and professional.
- Maintain strong contrast between the white headline, supporting copy, and animated background.
- Avoid excessive gradients, unnecessary glassmorphism, giant decorative elements, or generic "AI startup" styling.
- Avoid visual clutter.
- Avoid making the page look like a component-library demo.
- Make the section feel like part of a real business website.

Do not replace the AuroraBackground component with an unrelated design.

---

# 8. Responsive Behavior

The implementation must work properly across:

- mobile phones
- tablets
- laptops
- large desktop displays

The hero should not overflow horizontally.

The heading should scale responsively using Tailwind responsive utilities.

The supporting copy should remain readable on smaller screens.

The Lottie animation must scale down appropriately on mobile rather than forcing a fixed 250px layout that creates unnecessary overflow.

Maintain the centered visual hierarchy on mobile.

---

# 9. Lottie Asset

The existing Lottie animation source is:

`https://lottie.host/8cf4ba71-e5fb-44f3-8134-178c4d389417/0CCsdcgNIP.json`

Continue using it unless it fails to load.

Load the Lottie player script dynamically on the client.

Ensure the component does not attempt to use browser-only APIs during server rendering.

If the project framework requires client boundaries, keep `"use client"` where necessary.

---

# 10. Implementation Guidelines

Before changing files:

1. Analyze the existing project structure.
2. Identify the framework.
3. Identify the package manager.
4. Identify the existing shadcn configuration.
5. Identify the Tailwind configuration.
6. Identify the TypeScript configuration.
7. Determine the correct page/route where the hero should be integrated.
8. Check whether `@/components/ui` already exists.
9. Check whether `framer-motion` is already installed.
10. Avoid creating duplicate components or configurations.

### Questions to resolve through codebase inspection

Determine:

- What data/props will be passed to the component?
- Are there specific state-management requirements?
- Are there required assets or external resources?
- What responsive behavior is expected?
- Where is the best place to use this component in the existing application?

Do not ask the user questions that can be answered by inspecting the codebase.

---

# 11. Integration Steps

Perform these steps in order:

### Step 1: Inspect

Inspect the existing application architecture and determine the correct integration point.

### Step 2: Configure dependencies

Install:

```bash
framer-motion
```

Only install missing dependencies.

### Step 3: Create the component

Create:

`/components/ui/aurora-background-2.tsx`

Use the supplied AuroraBackground implementation.

### Step 4: Create the hero integration

Create or update the appropriate page/section so the AuroraBackground component is actually rendered.

Do not leave the component unused.

### Step 5: Apply the new copy

Use:

**Worried about payment?**

and:

`We have designed most affordable payment quotation keeping best reaources and services to serve`

Remove the original demo text completely.

### Step 6: Preserve application architecture

Do not unnecessarily rewrite unrelated parts of the project.

Do not replace existing routing, layouts, providers, or styling systems unless required for the integration.

---

# 12. Accessibility

Ensure the implementation is reasonably accessible.

- Use semantic heading structure.
- Do not make the Lottie animation the only meaningful communication.
- Ensure text has sufficient contrast.
- Do not rely exclusively on animation to communicate information.
- Respect `prefers-reduced-motion` where practical.
- Decorative animation should not interfere with reading or interaction.

If the Lottie player is purely decorative, treat it accordingly rather than pretending it is meaningful content. Humanity has suffered enough from decorative animations being given job descriptions.

---

# 13. Performance

The hero animation should not unnecessarily damage page performance.

- Do not create redundant animation loops.
- Do not add unnecessary JavaScript listeners.
- Clean up dynamically inserted scripts where appropriate.
- Keep the component client-side only where required.
- Avoid unnecessary re-renders.
- Ensure Framer Motion animations are scoped to the visible hero content.
- Avoid loading additional libraries just to reproduce functionality already provided by Framer Motion.

---

# 14. Assets

The provided Lottie animation is the required visual asset.

Do not download random images or replace the Lottie animation with unrelated stock imagery.

If an image asset is genuinely required elsewhere in the implementation, use a reliable Unsplash stock image only when appropriate.

Do not introduce assets merely to fill empty space.

---

# 15. Icons and Logos

If additional icons are needed:

- Use `lucide-react`.
- Do not manually create SVG icons unless the existing design specifically requires it.
- Do not add a logo simply for decoration.

---

# 16. Code Quality

Keep the implementation clean and maintainable.

- Use TypeScript correctly.
- Avoid `any` unless genuinely unavoidable.
- Preserve React component conventions already used by the project.
- Use existing utility functions/configuration when available.
- Keep external URLs centralized where practical.
- Avoid duplicated components.
- Avoid dead code.
- Remove unused imports.
- Ensure the final implementation passes the project's lint/type checks where available.

---

# 17. Important Restrictions

Do NOT:

- Copy an unrelated website.
- Download a complete website template.
- Replace the application with an external template.
- Introduce unnecessary dependencies.
- Replace the supplied Aurora background with another animation.
- Keep the old "Aurora Background" heading.
- Keep the old demo description.
- Add generic filler sections just to make the page longer.
- Add fake testimonials, fake statistics, fake client logos, or fake business claims.
- Invent payment pricing or service guarantees that were not provided.
- Turn this into a generic AI landing page.

The goal is a focused, credible payment quotation hero.

---

# 18. Validation

After implementation, verify:

1. The application starts successfully.
2. The hero renders without runtime errors.
3. `framer-motion` resolves correctly.
4. The Lottie player loads correctly in the browser.
5. The heading displays exactly as:

   `Worried about payment?`

6. The supporting text displays exactly as:

   `We have designed most affordable payment quotation keeping best reaources and services to serve`

7. No original demo copy remains.
8. The hero is responsive.
9. No horizontal overflow is introduced.
10. Animations do not throw console errors.
11. TypeScript has no new type errors.
12. Existing project functionality remains intact.
13. The component is actually used by the relevant page/route.

If the project has an existing lint, typecheck, build, or test command, run the relevant checks after implementation and fix issues caused by this integration.

---

# 19. Expected Final Result

The final page should present a premium dark payment-focused hero with:

- animated aurora background
- centered Lottie visual
- strong headline:
  **Worried about payment?**
- supporting business message:
  `We have designed most affordable payment quotation keeping best reaources and services to serve`
- subtle, polished entrance animation
- responsive layout
- clean TypeScript/React implementation
- proper shadcn-compatible component placement

This should look like an intentional production landing-page section, not a raw demo copied from a component gallery.

Implement the complete integration now based on this document and the existing codebase.

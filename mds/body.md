# BODY HERO SECTION — 3D SPLINE IMPLEMENTATION

You are given a task to integrate an existing React component into the current codebase.

## IMPORTANT CONTEXT

This is a **fresh implementation request**.

The developer has **not previously sent this prompt, component, or implementation instructions to you**.

Treat this entire document as the complete source of truth.

Do not assume that any part of this component has already been installed, created, configured, or integrated.

Inspect the existing codebase first, then implement this component cleanly within the current project architecture.

Do not copy an existing website or download an external website/template.

The supplied Spline scene is intentionally used as the 3D visual background. Do not replace it with a different 3D scene unless the provided scene is technically unusable.

---

# 1. PROJECT REQUIREMENTS

The codebase should support:

- React
- TypeScript
- shadcn project structure
- Tailwind CSS

If the project does not currently support these requirements:

1. Determine what framework/build system is already being used.
2. Do not unnecessarily rebuild the entire project.
3. Configure the missing requirements using the appropriate project-native approach.
4. If shadcn is missing, provide the appropriate shadcn CLI setup instructions or perform the setup when appropriate.
5. If Tailwind CSS is missing, configure it correctly for the existing project.
6. If TypeScript is missing, configure TypeScript without breaking the existing application.

---

# 2. COMPONENT LOCATION

The requested component should live under:

```text
/components/ui/3d-hero-section-boxes.tsx
```

Determine the project's actual component and style paths before creating files.

If the project already follows the standard shadcn structure:

```text
/components/ui
```

use it.

If the project does not have `/components/ui`, create it and explain internally why it is being used:

- shadcn components conventionally live there
- it creates a predictable reusable component layer
- it separates reusable UI from page-specific composition
- it makes the component easier to reuse across routes

Do not create unnecessary duplicate component directories.

---

# 3. REQUIRED DEPENDENCY

Install the following dependency:

```bash
npm install @splinetool/react-spline
```

If the project uses another package manager, use its equivalent command.

Do not install unrelated libraries merely to recreate functionality already present in the supplied component.

---

# 4. COMPONENT PURPOSE

This component is the main 3D hero/body introduction for the website.

It combines:

- Spline 3D background
- dark cinematic overlay
- fixed transparent navigation
- large editorial hero typography
- supporting technology/business copy
- CTA buttons
- scroll-based hero fading
- scroll-based screenshot movement
- responsive layout

The overall visual direction should feel:

- premium
- modern
- technical
- cinematic
- minimal
- professional
- business-oriented
- technology-driven

It should **not** feel like:

- a generic SaaS template
- an AI-generated landing-page template
- an overdecorated startup website
- a random portfolio template
- a generic Web3 landing page

The supplied 3D Spline scene is the visual centerpiece.

---

# 5. EXACT CONTENT CHANGES

The original component contains placeholder agency-style messaging.

Replace the following content exactly.

## OLD HERO HEADLINE

Do not use:

```text
We're Building
Cool Experiences
```

Replace it with:

```text
We’re building technology that moves business forward.
```

Use the curly apostrophe exactly as shown:

```text
We’re
```

Do not change the sentence to another variation.

---

## OLD HERO SUPPORTING COPY

Do not use:

```text
Crafting Awesome Stories and Killer Designs to Make Brand Stand Out
```

Replace it with:

```text
Engineering digital experiences that make businesses memorable.
```

Keep the final period.

---

# 6. FINAL HERO CONTENT

The main hero should therefore communicate:

### Headline

```text
We’re building technology that moves business forward.
```

### Supporting text

```text
Engineering digital experiences that make businesses memorable.
```

### Existing capability label

The existing capability line:

```text
AI \ WEB3 \ UI \ 3D \ MOTION
```

may remain if it fits the visual design.

However, assess whether it is appropriate for the current brand.

Do not automatically add new technologies just to make the page look more technical.

If retained, preserve the existing visual treatment.

---

# 7. CTA BEHAVIOR

The component currently contains:

```text
Contact Us
```

and:

```text
Get Started
```

Keep both unless the existing application already has a routing/contact structure that requires connecting them to real destinations.

Do not invent URLs.

If the project already has relevant routes:

- connect `Contact Us` to the appropriate contact route
- connect `Get Started` to the appropriate starting/conversion route

If no routes exist, keep the buttons visually functional without inventing external destinations.

The buttons must remain accessible and keyboard navigable.

---

# 8. NAVIGATION

The supplied navigation currently contains:

```text
Home
Cases
Library
Resources
```

and:

```text
Let's Talk!
```

Preserve the navigation structure unless the existing project already provides a site-wide navigation component.

If an existing global navbar exists, do not create a duplicate competing navbar.

The navigation should remain:

- fixed to the top
- above the Spline scene
- readable against the 3D background
- responsive
- visually restrained

The existing translucent dark background and backdrop blur may be preserved.

---

# 9. SPLINE BACKGROUND

Use the supplied Spline scene:

```text
https://prod.spline.design/dJqTIQ-tE3ULUPMi/scene.splinecode
```

Use:

```tsx
import Spline from '@splinetool/react-spline';
```

The Spline scene should occupy the full hero viewport.

The intended structure is:

```text
Hero
├── Fixed Navbar
├── Full-screen Spline background
├── Dark cinematic overlay
└── Hero content
```

The Spline canvas/background should:

- fill the viewport
- remain responsive
- preserve its aspect ratio as much as possible
- not cause horizontal overflow
- remain behind the hero content
- remain interactive where appropriate

Do not replace the Spline scene with a static image.

---

# 10. SPLINE OVERLAY

Preserve the purpose of the existing overlay.

The overlay currently uses:

```css
linear-gradient(
  to right,
  rgba(0, 0, 0, 0.8),
  transparent 30%,
  transparent 70%,
  rgba(0, 0, 0, 0.8)
),
linear-gradient(
  to bottom,
  transparent 50%,
  rgba(0, 0, 0, 0.9)
)
```

This creates contrast around the edges and bottom of the scene.

Keep this general treatment unless the existing visual composition requires a small adjustment for readability.

Do not make the overlay so strong that the Spline scene becomes invisible.

---

# 11. HERO LAYOUT

The hero content should remain centered vertically within the viewport.

The desktop composition should have:

```text
LEFT SIDE
Large headline

Supporting capability label

RIGHT SIDE
Supporting paragraph

Contact Us
Get Started
```

The supplied responsive structure can be retained:

```text
Desktop:
two-column layout

Mobile:
single-column layout
```

On mobile:

- headline should scale down naturally
- content should remain readable
- buttons should stack when necessary
- no horizontal scrolling should occur
- the Spline background should remain visible
- navigation should not collide with the hero content

---

# 12. HERO TYPOGRAPHY

The headline is the dominant visual element.

Use a strong, modern sans-serif type treatment.

The headline should:

- be large
- have strong weight
- have tight/intentional line height
- remain readable against the 3D scene
- not be unnecessarily decorated

Do not add:

- glowing text
- excessive gradients
- text shadows everywhere
- animated word-by-word effects
- unnecessary outlined typography

The supplied component already has a strong visual foundation. Do not turn it into a typography experiment.

---

# 13. SCROLL BEHAVIOR

Preserve the existing scroll behavior.

The component currently:

1. listens to window scroll
2. moves the screenshot upward using a parallax transform
3. fades the hero content as the user scrolls
4. reveals the content below

This behavior should remain.

The existing logic:

```text
screenshot movement:
translateY(-scrollPosition * 0.5)

hero opacity:
1 - min(scrollPosition / 400, 1)
```

may be retained.

However, implement it cleanly and safely.

Use `requestAnimationFrame` or another performant approach.

Avoid unnecessary scroll-triggered React state updates.

---

# 14. SCREENSHOT SECTION

The supplied component contains a screenshot section below the hero.

The existing image source is:

```text
https://cdn.sanity.io/images/s6lu43cv/production-v4/13b6177b537aee0fc311a867ea938f16416e8670-3840x2160.jpg?w=3840&h=2160&q=10&auto=format&fm=jpg
```

Preserve the screenshot section if it is intended as part of the supplied design.

The screenshot should:

- be centered
- have responsive width
- have rounded corners
- have a subtle border
- have a shadow
- sit above the black background
- move upward slightly on scroll

Do not replace the screenshot with a random image.

Do not download and locally mirror the image unless the existing project specifically requires local assets.

---

# 15. CONTENT BELOW HERO

The original component contains:

```text
Other Content Below
```

and:

```text
This is where additional sections of your landing page would go.
```

These are placeholder strings.

Do not treat them as final brand content.

If this component is being integrated into an existing landing page that already has subsequent sections, remove the placeholder section and allow the real page content to follow naturally.

If the component is being demonstrated independently and no downstream content exists, a minimal placeholder may remain temporarily, but it should be clearly isolated as demo-only content.

Do not present placeholder copy as finished website content.

---

# 16. ORIGINAL COMPONENT

Use the following component as the implementation base.

Preserve its intended functionality while adapting it to the requirements above.

```tsx id="m8p7x1"
"use client";

import React, { useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';

function HeroSplineBackground() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        pointerEvents: 'auto',
        overflow: 'hidden',
      }}
    >
      <Spline
        style={{
          width: '100%',
          height: '100vh',
          pointerEvents: 'auto',
        }}
        scene="https://prod.spline.design/dJqTIQ-tE3ULUPMi/scene.splinecode"
      />

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: `
            linear-gradient(
              to right,
              rgba(0, 0, 0, 0.8),
              transparent 30%,
              transparent 70%,
              rgba(0, 0, 0, 0.8)
            ),
            linear-gradient(
              to bottom,
              transparent 50%,
              rgba(0, 0, 0, 0.9)
            )
          `,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

function ScreenshotSection({
  screenshotRef
}: {
  screenshotRef: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <section className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 mt-11 md:mt-12">
      <div
        ref={screenshotRef}
        className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-700/50 w-full md:w-[80%] lg:w-[70%] mx-auto"
      >
        <div>
          <img
            src="https://cdn.sanity.io/images/s6lu43cv/production-v4/13b6177b537aee0fc311a867ea938f16416e8670-3840x2160.jpg?w=3840&h=2160&q=10&auto=format&fm=jpg"
            alt="App Screenshot"
            className="w-full h-auto block rounded-lg mx-auto"
          />
        </div>
      </div>
    </section>
  );
}

function HeroContent() {
  return (
    <div className="text-white px-4 max-w-screen-xl mx-auto w-full flex flex-col lg:flex-row justify-between items-start lg:items-center py-16">

      <div className="w-full lg:w-1/2 pr-0 lg:pr-8 mb-8 lg:mb-0">

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight tracking-wide">
          We’re building technology that moves business forward.
        </h1>

        <div className="text-sm text-gray-300 opacity-90 mt-4">
          AI \ WEB3 \ UI \ 3D \ MOTION
        </div>

      </div>

      <div className="w-full lg:w-1/2 pl-0 lg:pl-8 flex flex-col items-start">

        <p className="text-base sm:text-lg opacity-80 mb-6 max-w-md">
          Engineering digital experiences that make businesses memorable.
        </p>

        <div className="flex pointer-events-auto flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-3">

          <button className="border border-white text-white font-semibold py-2.5 sm:py-3.5 px-6 sm:px-8 rounded-2xl transition duration-300 w-full sm:w-auto hover:bg-white hover:text-black">
            Contact Us
          </button>

          <button className="pointer-events-auto bg-white text-black font-semibold py-2.5 sm:py-3.5 px-6 sm:px-8 rounded-2xl transition duration-300 hover:scale-105 flex items-center justify-center w-full sm:w-auto">

            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-cyan-400"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.44772 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.44772 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.44772 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z"
                fill="currentColor"
              />
            </svg>

            Get Started

          </button>

        </div>
      </div>

    </div>
  );
}

function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-20"
      style={{
        backgroundColor: 'rgba(13, 13, 24, 0.3)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderRadius: '0 0 0.75rem 0.75rem'
      }}
    >
      <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8 flex items-center justify-between">

        <div className="flex items-center space-x-6 lg:space-x-8">

          <div
            className="text-white"
            style={{
              width: '32px',
              height: '32px'
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM12.4306 9.70695C12.742 9.33317 13.2633 9.30058 13.6052 9.62118L19.1798 14.8165C19.4894 15.1054 19.4894 15.5841 19.1798 15.873L13.6052 21.0683C13.2633 21.3889 12.742 21.3563 12.4306 19.9991V9.70695Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <div className="hidden md:flex items-center space-x-6">

            <a
              href="#"
              className="text-gray-300 hover:text-white text-sm transition duration-150"
            >
              Home
            </a>

            <a
              href="#"
              className="text-gray-300 hover:text-white text-sm transition duration-150"
            >
              Cases
            </a>

            <a
              href="#"
              className="text-gray-300 hover:text-white text-sm transition duration-150"
            >
              Library
            </a>

            <a
              href="#"
              className="text-gray-300 hover:text-white text-sm transition duration-150"
            >
              Resources
            </a>

          </div>
        </div>

        <div className="flex items-center">

          <a
            href="#"
            className="border border-white text-white px-5 py-2 rounded-full text-sm hover:bg-white hover:text-black transition duration-300"
          >
            Let's Talk!
          </a>

        </div>

      </div>
    </nav>
  );
}

const HeroSection = () => {

  const screenshotRef =
    useRef<HTMLDivElement>(null);

  const heroContentRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    const handleScroll = () => {

      if (
        screenshotRef.current &&
        heroContentRef.current
      ) {

        requestAnimationFrame(() => {

          const scrollPosition =
            window.pageYOffset;

          if (screenshotRef.current) {

            screenshotRef.current.style.transform =
              `translateY(-${scrollPosition * 0.5}px)`;

          }

          const maxScroll = 400;

          const opacity =
            1 -
            Math.min(
              scrollPosition / maxScroll,
              1
            );

          if (heroContentRef.current) {

            heroContentRef.current.style.opacity =
              opacity.toString();

          }

        });

      }

    };

    window.addEventListener(
      'scroll',
      handleScroll
    );

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      );

  }, []);

  return (

    <div className="relative">

      <Navbar />

      <div className="relative min-h-screen">

        <div className="absolute inset-0 z-0 pointer-events-auto">

          <HeroSplineBackground />

        </div>

        <div
          ref={heroContentRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        >

          <HeroContent />

        </div>

      </div>

      <div
        className="bg-black relative z-10"
        style={{
          marginTop: '-10vh'
        }}
      >

        <ScreenshotSection
          screenshotRef={screenshotRef}
        />

        <div className="container mx-auto px-4 py-16 text-white">

          <h2 className="text-4xl font-bold text-center mb-8">
            Other Content Below
          </h2>

          <p className="text-center max-w-xl mx-auto opacity-80">
            This is where additional sections of your landing page would go.
          </p>

        </div>

      </div>

    </div>
  );
};

export { HeroSection };
```

---

# 17. DEMO / PAGE INTEGRATION

Create or update the relevant demo/page integration.

Preferred import:

```tsx
import React from 'react';
import { HeroSection } from "@/components/ui/3d-hero-section-boxes";

export function HomePage() {
  return (
    <div>
      <HeroSection />
    </div>
  );
}
```

The supplied original example imports from:

```text
@/components/blocks/3d-hero-section-boxes
```

but the requested component location is:

```text
/components/ui/3d-hero-section-boxes.tsx
```

Therefore, do **not** create two copies of the component just to satisfy the original import.

Use the actual project's established alias and component structure.

If the codebase intentionally uses `/components/blocks` for page-level compositions, you may place the composition there instead, but avoid duplication and preserve the shadcn `/components/ui` convention for reusable UI.

---

# 18. IMPORTANT CODE QUALITY REQUIREMENTS

The supplied component is a reference implementation, not permission to blindly reproduce bugs.

While preserving its intended design, fix obvious issues that would prevent a clean production implementation.

Pay particular attention to:

### React refs

Do not create invalid ref usage.

Ensure refs are attached to the elements that actually need to be manipulated.

### Scroll handling

Avoid creating excessive animation frames when scrolling rapidly.

Cancel or consolidate animation frames where appropriate.

### Spline loading

Handle the Spline scene gracefully while it is loading.

Do not allow an uninitialized Spline scene to create layout collapse.

### Responsive behavior

Ensure:

```text
100vw
100vh
```

does not create unexpected mobile browser overflow.

### Accessibility

Provide meaningful `alt` text for images.

Buttons and links must remain keyboard accessible.

Do not use meaningless interactive elements when a semantic element is more appropriate.

### Performance

The Spline scene is already expensive.

Do not add another unnecessary animation/rendering engine on top of it.

Do not add unnecessary particle systems, canvas effects, or video backgrounds.

---

# 19. DESIGN DIRECTION

The visual identity should communicate:

```text
TECHNOLOGY
+
ENGINEERING
+
BUSINESS
+
DIGITAL EXPERIENCE
```

The hero copy is intentionally business-oriented.

The headline:

```text
We’re building technology that moves business forward.
```

should feel like the central statement of the company.

The supporting copy:

```text
Engineering digital experiences that make businesses memorable.
```

should reinforce the idea that the company does not merely create visual interfaces.

It engineers experiences.

Avoid making the page look like a design agency portfolio.

Avoid excessive visual noise.

Avoid generic AI visual language.

Avoid:

- floating glass cards
- excessive neon
- random gradients
- unnecessary blobs
- huge glowing buttons
- excessive rounded cards
- fake dashboard graphics
- meaningless animated statistics
- stock photos
- random 3D objects layered on top of the Spline scene

The supplied Spline scene should remain the main visual feature.

---

# 20. MOBILE DESIGN

The component must work on:

- desktop
- laptop
- tablet
- mobile

On mobile:

### Navigation

Hide the desktop navigation links if necessary.

Keep the primary navigation action accessible.

### Hero

Use a responsive headline size.

The headline must not overflow horizontally.

### Buttons

Stack buttons vertically when necessary.

### Spline

Keep the scene full-screen and visually balanced.

### Content

Maintain sufficient spacing between:

- headline
- capability label
- supporting paragraph
- CTA buttons

Do not allow the fixed navbar to overlap the main heading.

---

# 21. FINAL CONTENT SOURCE OF TRUTH

The final visible hero copy must be:

## Headline

```text
We’re building technology that moves business forward.
```

## Supporting paragraph

```text
Engineering digital experiences that make businesses memorable.
```

Do not use the previous placeholder copy.

The following must not appear in the final implementation:

```text
We're Building
Cool Experiences
```

or:

```text
Crafting Awesome Stories and Killer Designs to Make Brand Stand Out
```

---

# 22. VERIFICATION CHECKLIST

Before considering the implementation complete, verify all of the following:

- [ ] The project uses React correctly.
- [ ] TypeScript compiles.
- [ ] Tailwind CSS works.
- [ ] shadcn structure is respected.
- [ ] `/components/ui` exists or the project's established equivalent is correctly identified.
- [ ] `@splinetool/react-spline` is installed.
- [ ] The component is available at the correct path.
- [ ] The Spline scene loads.
- [ ] The Spline scene fills the hero viewport.
- [ ] The dark overlay renders above the Spline scene.
- [ ] The navbar renders above the Spline scene.
- [ ] The navbar remains readable.
- [ ] The hero content renders above the Spline scene.
- [ ] The headline is exactly:
  `We’re building technology that moves business forward.`
- [ ] The supporting copy is exactly:
  `Engineering digital experiences that make businesses memorable.`
- [ ] The old headline is completely removed.
- [ ] The old supporting copy is completely removed.
- [ ] `Contact Us` remains functional/accessible.
- [ ] `Get Started` remains functional/accessible.
- [ ] `Let's Talk!` remains functional/accessible.
- [ ] The screenshot section works.
- [ ] The screenshot moves with scroll.
- [ ] Hero opacity changes smoothly on scroll.
- [ ] No horizontal scrolling occurs.
- [ ] Mobile layout works.
- [ ] Desktop layout works.
- [ ] No unnecessary external assets are introduced.
- [ ] No external website/template is copied.
- [ ] No console-breaking errors occur.
- [ ] No TypeScript errors are introduced.
- [ ] No duplicate hero component is created unnecessarily.
- [ ] No duplicate navbar is introduced if the application already has a global navbar.
- [ ] Placeholder content below the hero is not treated as final production copy.

---

# 23. IMPLEMENTATION PRINCIPLE

Do not blindly paste the supplied component and stop.

First inspect the existing project.

Then:

1. Identify the framework.
2. Identify the app entry point.
3. Identify the routing structure.
4. Identify the Tailwind configuration.
5. Identify the TypeScript configuration.
6. Identify the shadcn component structure.
7. Identify whether a global navbar already exists.
8. Identify whether a homepage already exists.
9. Install the required Spline dependency.
10. Create the component in the correct location.
11. Integrate it into the appropriate page.
12. Replace the placeholder copy with the exact NAVYA messaging.
13. Preserve the supplied 3D experience.
14. Test desktop and mobile layouts.
15. Fix obvious runtime, TypeScript, accessibility, and responsive issues.
16. Verify the final rendered page.

Do not rebuild unrelated parts of the application.

Do not introduce unrelated dependencies.

Do not change the project's architecture merely for the sake of this component.

The goal is a clean, production-ready integration of the supplied 3D hero section with the new NAVYA messaging.
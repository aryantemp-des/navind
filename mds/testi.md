# Antigravity Integration Prompt: Testimonial Community Section

## Objective

Integrate the provided React testimonial/community section into the existing codebase as a polished, production-ready section.

This prompt is the complete implementation specification. Do not assume that any earlier prompt, component, setup step, or conversation exists. Inspect the current repository first, then perform the integration from this document.

---

## 1. Required Project Stack

The project must support:

- React
- TypeScript
- Tailwind CSS
- shadcn/ui project structure

If the repository already supports these, preserve the existing setup and conventions.

If any requirement is missing:

1. Inspect the existing package manager and project structure.
2. Do not unnecessarily recreate or replace the application.
3. If shadcn is missing, initialize it using the appropriate shadcn CLI flow for the existing framework.
4. If Tailwind CSS is missing, install/configure it according to the project's framework and current Tailwind version.
5. If TypeScript is missing, migrate/setup TypeScript carefully without destroying existing application behavior.
6. Preserve existing aliases, routing, styling conventions, and build configuration whenever possible.

### Component directory

Determine the project's default component directory.

The target component must ultimately exist at:

`/components/ui/community-testimonial.tsx`

If the repository uses another component directory, determine whether the project already has an established shadcn-compatible alias. If `/components/ui` does not exist, create it.

The `/components/ui` directory is important because it follows the conventional shadcn component organization and keeps reusable UI primitives/components separate from route/page-specific code.

Do not create duplicate component directories merely to satisfy this instruction if the repository already has a compatible structure. Prefer the project's established `@/components/ui/...` alias.

---

## 2. Install and Verify Dependencies

Analyze the component and install only dependencies that are actually required.

This component does not require Framer Motion, GSAP, Lenis, Spline, or other animation libraries.

Make sure the project has the required Tailwind CSS setup and that the CSS animation classes used below are available.

If `tw-animate-css` is already part of the project, preserve the existing configuration. If it is required by the current Tailwind/shadcn setup and is missing, install/configure it appropriately.

Do not introduce unnecessary libraries.

---

## 3. Create the Component

Create:

`/components/ui/community-testimonial.tsx`

Use the following component as the functional baseline:

```tsx
import React from "react";

/**
 * TestimonialCard
 * Props: quote, authorName, authorTitle, avatarUrl
 */
export const TestimonialCard = ({ quote, authorName, authorTitle, avatarUrl }) => {
  return (
    <div className="testimonial-card flex flex-col items-start gap-4 p-6 bg-white rounded-lg shadow-lg w-96 flex-shrink-0">
      <p className="text-gray-700 text-lg">"{quote}"</p>
      <div className="flex items-center gap-4 mt-4">
        <img
          src={avatarUrl}
          alt={authorName}
          className="w-12 h-12 rounded-full bg-gray-200 object-cover"
        />
        <div>
          <h4 className="text-lg font-bold">{authorName}</h4>
          <p className="text-gray-600">{authorTitle}</p>
        </div>
      </div>
    </div>
  );
};

/**
 * HorizontalScroller
 * Props: children, speed (e.g., "40s"), direction ("left" | "right")
 */
export const HorizontalScroller = ({ children, speed = "40s", direction = "left" }) => {
  const animationClass =
    direction === "right" ? "animate-scroll-horizontal-reverse" : "animate-scroll-horizontal";

  return (
    <div className="w-full overflow-hidden group relative mask-fade">
      <div className={`flex ${animationClass}`} style={{ ["--scroll-duration"]: speed }}>
        <div className="flex items-stretch justify-center gap-8 px-4">{children}</div>
        <div className="flex items-stretch justify-center gap-8 px-4" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * TestimonialsSection
 * Props: data { title, subtitle, rows[] }
 */
export default function TestimonialsSection({ data }) {
  return (
    <section className="testimonials-section relative flex flex-col items-center gap-12 p-10 w-full max-w-7xl">
      <div className="flex flex-col items-center gap-6 text-center z-10 max-w-2xl">
        <h2
          className="text-5xl font-extrabold text-black leading-tight"
          style={{ opacity: 0, animation: "fadeInUp 0.7s ease-out 0.2s forwards" }}
        >
          {data.title}
        </h2>
        <p
          className="text-lg text-gray-700"
          style={{ opacity: 0, animation: "fadeInUp 0.7s ease-out 0.4s forwards" }}
        >
          {data.subtitle}
        </p>
      </div>

      <div className="flex flex-col gap-8 z-10 w-full max-w-6xl">
        {data.rows.map((row) => (
          <HorizontalScroller key={row.id} speed={row.speed} direction={row.direction}>
            {row.testimonials.map((t) => (
              <TestimonialCard
                key={t.id}
                quote={t.quote}
                authorName={t.authorName}
                authorTitle={t.authorTitle}
                avatarUrl={t.avatarUrl}
              />
            ))}
          </HorizontalScroller>
        ))}
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 85% 67% at 50% 100%, rgba(189,204,255,0.45) 0%, transparent 60%)",
          zIndex: 0,
        }}
      />
    </section>
  );
}
```

### TypeScript requirement

The supplied baseline uses implicit JavaScript-style props. Because this project is required to use TypeScript, convert the component props to proper TypeScript interfaces/types while preserving the component's behavior.

Define clear types for:

- Testimonial
- TestimonialRow
- TestimonialsData
- TestimonialCard props
- HorizontalScroller props
- TestimonialsSection props

Do not use `any` unless there is a genuine unavoidable reason.

For the CSS custom property used by `--scroll-duration`, type it safely rather than suppressing TypeScript errors globally.

---

## 4. Demo / Integration Example

Use this demo structure as the integration reference:

```tsx
import TestimonialsSection from "@/components/ui/community-testimonial";

export default function DemoOne() {
  const testimonialsData = {
    title: "Don't just take our word for it",
    subtitle:
      "See what our users are saying about how our app has transformed their daily routines and helped them build lasting habits.",
    rows: [
      {
        id: "row1",
        speed: "50s",
        direction: "left",
        testimonials: [
          {
            id: "t1",
            quote:
              "This app completely changed how I approach my goals. The visual feedback is incredibly motivating!",
            authorName: "Sarah K.",
            authorTitle: "Productivity Blogger",
            avatarUrl: "https://placehold.co/100x100/E2E8F0/A0AEC0?text=SK",
          },
          {
            id: "t2",
            quote:
              "I've tried countless habit trackers, and this is the first one that actually stuck. It's simple, beautiful, and effective.",
            authorName: "Michael B.",
            authorTitle: "Software Engineer",
            avatarUrl: "https://placehold.co/100x100/E2E8F0/A0AEC0?text=MB",
          },
          {
            id: "t3",
            quote:
              "The team accountability features are a game-changer. Our entire group is more motivated and connected.",
            authorName: "Emily W.",
            authorTitle: "Startup Founder",
            avatarUrl: "https://placehold.co/100x100/E2E8F0/A0AEC0?text=EW",
          },
        ],
      },
      {
        id: "row2",
        speed: "40s",
        direction: "right",
        testimonials: [
          {
            id: "t4",
            quote:
              "The design is just stunning. It feels less like a chore and more like a game. I'm hooked!",
            authorName: "David L.",
            authorTitle: "UX Designer",
            avatarUrl: "https://placehold.co/100x100/E2E8F0/A0AEC0?text=DL",
          },
          {
            id: "t5",
            quote:
              "Simple, no clutter, does exactly what it promises. The reminders are gentle but effective.",
            authorName: "Jessica P.",
            authorTitle: "Student",
            avatarUrl: "https://placehold.co/100x100/E2E8F0/A0AEC0?text=JP",
          },
          {
            id: "t6",
            quote:
              "Seeing my progress in the analytics section is the best part of my week. It shows my work is paying off.",
            authorName: "Alex C.",
            authorTitle: "Data Analyst",
            avatarUrl: "https://placehold.co/100x100/E2E8F0/A0AEC0?text=AC",
          },
        ],
      },
      {
        id: "row3",
        speed: "60s",
        direction: "left",
        testimonials: [
          {
            id: "t7",
            quote:
              "I love that my data is private. In a world where everything is tracked, this feels safe and personal.",
            authorName: "Kenji T.",
            authorTitle: "Privacy Advocate",
            avatarUrl: "https://placehold.co/100x100/E2E8F0/A0AEC0?text=KT",
          },
          {
            id: "t8",
            quote:
              "Finally, a habit app that isn't bloated with features I don't need. It's focused and powerful.",
            authorName: "Maria G.",
            authorTitle: "Writer",
            avatarUrl: "https://placehold.co/100x100/E2E8F0/A0AEC0?text=MG",
          },
          {
            id: "t9",
            quote:
              "The community support is surprisingly wholesome. It's a great place for accountability.",
            authorName: "Chris R.",
            authorTitle: "Fitness Coach",
            avatarUrl: "https://placehold.co/100x100/E2E8F0/A0AEC0?text=CR",
          },
        ],
      },
    ],
  };

  return (
    <div
      className="app-root bg-radial min-h-screen flex items-center justify-center py-20 px-4"
      aria-label="Testimonials showcase"
    >
      <TestimonialsSection data={testimonialsData} />
    </div>
  );
}
```

This demo data is only a functional example. Adapt the content to the existing product/brand when integrating into the actual application. Do not invent a different visual system unless the current application requires it.

---

## 5. Tailwind CSS / Global CSS

Extend the project's existing stylesheet.

Do not blindly replace the current global CSS.

For Tailwind CSS 4, merge the following into the existing CSS architecture as appropriate:

```css
@import "tailwindcss";
@import "tw-animate-css";

:root {
  --muted: #6b7280;
  --bg-start: #bdccff;
  --bg-end: #ffffff;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scroll-horizontal {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes scroll-horizontal-reverse {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}
```

For Tailwind CSS 3, place the equivalent animation definitions in the project's existing `tailwind.config.js`/`tailwind.config.ts` or appropriate global stylesheet.

The animation duration must be driven by the component's `--scroll-duration` custom property.

Ensure the relevant utility/class definitions exist for:

- `animate-scroll-horizontal`
- `animate-scroll-horizontal-reverse`
- `mask-fade`
- any other custom classes required by the component

Do not leave classes that silently do nothing.

A suitable implementation may define the animation utilities in the project's Tailwind configuration or global CSS depending on the Tailwind version.

---

## 6. Design and UX Requirements

The section should feel like a polished modern technology/business website, not a raw component demo.

Preserve the core visual behavior:

- Large centered heading
- Supporting subtitle
- Multiple horizontally scrolling testimonial rows
- Alternating scrolling directions
- Soft background radial glow
- White testimonial cards
- Rounded corners
- Subtle shadows
- Clear author information
- Continuous horizontal movement
- Smooth visual hierarchy
- Strong whitespace

The section must work naturally inside the existing website rather than looking pasted on from a completely unrelated template.

Avoid:

- Excessive gradients
- Random decorative elements
- Generic "AI slop" styling
- Excessive glassmorphism
- Unnecessary glowing borders
- Huge meaningless typography
- Unrelated stock imagery
- Over-animation
- Fake metrics or fabricated customer claims

Keep the implementation clean, restrained, and professional.

---

## 7. Responsive Behavior

The component must be responsive.

Desktop:

- Preserve the multi-row horizontal marquee effect.
- Keep cards wide enough to feel substantial.
- Maintain readable typography and spacing.

Tablet:

- Reduce card width and section padding where necessary.
- Preserve horizontal scrolling without causing page-level horizontal overflow.

Mobile:

- Prevent horizontal overflow on the page itself.
- Keep testimonial cards readable.
- Reduce typography and spacing appropriately.
- Preserve the marquee interaction.
- Ensure author information remains legible.
- Do not force desktop dimensions onto small screens.

Use responsive Tailwind utilities rather than hard-coded viewport-specific hacks.

---

## 8. Accessibility

Improve the baseline implementation where appropriate.

Requirements:

- Every testimonial avatar must have meaningful alt text.
- Decorative elements should use `aria-hidden="true"`.
- The duplicated marquee row should remain hidden from assistive technologies.
- Ensure sufficient text contrast.
- Do not rely on animation alone to communicate information.
- Respect `prefers-reduced-motion`.

For users who prefer reduced motion, significantly reduce or disable the continuous marquee animation while keeping all testimonials accessible and readable.

---

## 9. Image / Avatar Handling

The baseline uses placeholder avatar URLs.

When integrating into the actual website:

- Prefer existing project assets if available.
- If external stock images are needed, use reliable Unsplash images or existing approved assets.
- Do not download random assets from unknown sources.
- If using Next.js `Image`, configure remote image domains only when necessary.
- If the existing application does not use Next.js, retain a standard `<img>` implementation or use the framework's established image component.

Do not introduce external images merely for decoration. The testimonials themselves are the content.

---

## 10. Component Placement

Find the most appropriate existing route/page for this section.

If the project already has a testimonials, social proof, community, customer stories, or landing page section, integrate this component there.

Do not create unnecessary duplicate routes.

If there is no appropriate existing location, create a clean demo/integration route following the project's existing routing conventions.

Do not replace the entire application homepage unless the repository clearly indicates that this component is intended to be the homepage content.

---

## 11. Integration Rules

Before changing code:

1. Inspect the repository.
2. Identify the framework.
3. Identify the package manager.
4. Identify Tailwind version.
5. Identify TypeScript configuration.
6. Identify shadcn configuration.
7. Identify the existing component alias.
8. Identify the global stylesheet.
9. Identify the current page/layout where this section belongs.
10. Check for existing animation utilities that can be reused.

Then implement the smallest coherent set of changes required.

Do not:

- overwrite unrelated components
- delete existing functionality
- replace the project's styling system
- introduce duplicate dependencies
- create unnecessary configuration files
- rewrite routing without reason
- remove existing shadcn components

---

## 12. Validation

After implementation:

1. Run the project's type checker.
2. Run linting if configured.
3. Run the production build.
4. Fix all TypeScript errors.
5. Fix all lint/build errors caused by the integration.
6. Verify the testimonial rows animate continuously.
7. Verify alternating directions.
8. Verify there is no page-level horizontal scrollbar.
9. Verify mobile and desktop layouts.
10. Verify reduced-motion behavior.
11. Verify avatar loading/fallback behavior.
12. Verify the component can be imported through the expected `@/components/ui/community-testimonial` alias.

If the repository has Playwright or another browser-testing setup, use it to verify the rendered section in a real browser.

---

## 13. Final Acceptance Criteria

The implementation is complete only when:

- `/components/ui/community-testimonial.tsx` exists.
- The component is properly typed with TypeScript.
- Tailwind CSS is functioning.
- shadcn-compatible structure is preserved.
- Required CSS animations are implemented.
- The three testimonial rows scroll continuously.
- Row directions alternate correctly.
- The section is responsive.
- The page does not develop unwanted horizontal overflow.
- Accessibility requirements are satisfied.
- Reduced-motion behavior is handled.
- Existing application functionality remains intact.
- Type checking passes.
- Linting passes if configured.
- Production build passes.
- The component is actually integrated into an appropriate page/route rather than merely created and left unused.

## Important

Treat this document as a fresh standalone implementation task.

Do not assume that another agent has already completed any part of it.

Inspect first. Then implement.

Do not stop after creating the component file. The job is to integrate, style, validate, and leave the project in a working state.

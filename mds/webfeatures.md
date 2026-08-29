# Web Features Component Integration

## Objective

Integrate the provided **Feature Shader Cards** React component into the existing codebase.

The component should be integrated cleanly into the existing project without unnecessarily changing the current architecture, styling system, routing, or unrelated components.

The implementation must support:

- React
- TypeScript
- Tailwind CSS
- shadcn/ui project structure
- Client-side React components
- `@paper-design/shaders-react`

---

## 1. Inspect the Existing Project First

Before making changes:

1. Inspect the existing project structure.
2. Determine whether the project already uses:
   - TypeScript
   - Tailwind CSS
   - shadcn/ui
   - The `@/` import alias
3. Identify the existing component directory.
4. Identify the existing global stylesheet.
5. Check the existing `components/ui` directory.

### Required default component path

The component must ultimately exist at:

```text
/components/ui/feature-shader-cards.tsx
```

If the project already uses a different component structure, do not blindly restructure the entire project.

Instead, create:

```text
/components/ui
```

and use it for this component.

### Why `/components/ui` matters

This follows the conventional shadcn/ui structure and keeps reusable UI primitives/components separate from page-specific components.

Do not create unnecessary duplicate component directories.

---

# 2. Project Requirements

If TypeScript is not configured, convert/configure the project to support TypeScript appropriately.

If Tailwind CSS is not installed/configured, install and configure it using the project's existing framework conventions.

If shadcn/ui is not configured, initialize it using the shadcn CLI rather than manually recreating its configuration.

Use the appropriate command for the project's package manager.

For a new or non-shadcn project, the setup should follow the current shadcn CLI workflow.

Do not downgrade existing dependencies simply to match an older shadcn configuration.

---

# 3. Install Required Dependency

Install:

```bash
npm install @paper-design/shaders-react
```

If the project uses another package manager, use its equivalent command.

Do not install duplicate or unnecessary shader libraries.

---

# 4. Create the Component

Create:

```text
/components/ui/feature-shader-cards.tsx
```

Copy the following component into that file:

```tsx
"use client"

import type React from "react"

import { Warp } from "@paper-design/shaders-react"

interface Feature {
  title: string
  description: string
  icon: React.ReactNode
}

const features: Feature[] = [
  {
    title: "Elegant Design",
    description:
      "Beautiful shader effects that enhance your content without overwhelming it. Perfect for modern web experiences.",
    icon: (
      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: "High Performance",
    description: "Optimized WebGL shaders that run smoothly on all devices while maintaining stunning visual quality.",
    icon: (
      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 2v11h3v9l7-12h-4l4-8z" />
      </svg>
    ),
  },
  {
    title: "Easy Integration",
    description: "Simple React components that can be dropped into any project with minimal configuration required.",
    icon: (
      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-2.4-5-1.3-7.4L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
      </svg>
    ),
  },
  {
    title: "Customizable",
    description: "Extensive customization options to match your brand colors, animations, and visual style perfectly.",
    icon: (
      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: "Responsive",
    description: "Fully responsive design that looks great on desktop, tablet, and mobile devices of all sizes.",
    icon: (
      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9-2-2-2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zM7 4V3h10v1H7zM7 18V6h10v12H7z" />
      </svg>
    ),
  },
  {
    title: "Modern Tech",
    description: "Built with the latest web technologies including WebGL, React, and TypeScript for reliability.",
    icon: (
      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
  },
]

export default function FeaturesCards() {
  const getShaderConfig = (index: number) => {
    const configs = [
      {
        proportion: 0.3,
        softness: 0.8,
        distortion: 0.15,
        swirl: 0.6,
        swirlIterations: 8,
        shape: "checks" as const,
        shapeScale: 0.08,
        colors: ["hsl(280, 100%, 30%)", "hsl(320, 100%, 60%)", "hsl(340, 90%, 40%)", "hsl(300, 100%, 70%)"],
      },
      {
        proportion: 0.4,
        softness: 1.2,
        distortion: 0.2,
        swirl: 0.9,
        swirlIterations: 12,
        shape: "dots" as const,
        shapeScale: 0.12,
        colors: ["hsl(200, 100%, 25%)", "hsl(180, 100%, 65%)", "hsl(160, 90%, 35%)", "hsl(190, 100%, 75%)"],
      },
      {
        proportion: 0.35,
        softness: 0.9,
        distortion: 0.18,
        swirl: 0.7,
        swirlIterations: 10,
        shape: "checks" as const,
        shapeScale: 0.1,
        colors: ["hsl(120, 100%, 25%)", "hsl(140, 100%, 60%)", "hsl(100, 90%, 30%)", "hsl(130, 100%, 70%)"],
      },
      {
        proportion: 0.45,
        softness: 1.1,
        distortion: 0.22,
        swirl: 0.8,
        swirlIterations: 15,
        shape: "dots" as const,
        shapeScale: 0.09,
        colors: ["hsl(30, 100%, 35%)", "hsl(50, 100%, 65%)", "hsl(40, 90%, 40%)", "hsl(45, 100%, 75%)"],
      },
      {
        proportion: 0.38,
        softness: 0.95,
        distortion: 0.16,
        swirl: 0.85,
        swirlIterations: 11,
        shape: "checks" as const,
        shapeScale: 0.11,
        colors: ["hsl(250, 100%, 30%)", "hsl(270, 100%, 65%)", "hsl(260, 90%, 35%)", "hsl(265, 100%, 70%)"],
      },
      {
        proportion: 0.42,
        softness: 1.0,
        distortion: 0.19,
        swirl: 0.75,
        swirlIterations: 9,
        shape: "dots" as const,
        shapeScale: 0.13,
        colors: ["hsl(330, 100%, 30%)", "hsl(350, 100%, 60%)", "hsl(340, 90%, 35%)", "hsl(345, 100%, 75%)"],
      },
    ]

    return configs[index % configs.length]
  }

  return (
    <section className="min-h-screen py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-background dark:to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">
            Powerful Features
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Everything you need to create stunning visual experiences with elegant shader backgrounds
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const shaderConfig = getShaderConfig(index)

            return (
              <div key={index} className="relative h-80">
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
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
                    speed={0.8}
                    colors={shaderConfig.colors}
                  />
                </div>

                <div className="relative z-10 p-8 rounded-3xl h-full flex flex-col bg-black/80 border border-white/20 dark:border-white/10">
                  <div className="mb-6 filter drop-shadow-lg">
                    {feature.icon}
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {feature.title}
                  </h3>

                  <p className="leading-relaxed flex-grow text-gray-100 font-medium">
                    {feature.description}
                  </p>

                  <div className="mt-6 flex items-center text-sm font-bold text-gray-200">
                    <span className="mr-2">Learn more</span>

                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

---

# 5. Demo / Usage Component

Create a demo component only if the existing project architecture requires one.

Example:

```tsx
import FeaturesCards from "@/components/ui/feature-shader-cards"

export default function DemoOne() {
  return <FeaturesCards />
}
```

If the project already has an appropriate page or section where this component belongs, integrate it there instead of creating unnecessary demo files.

---

# 6. Integration Rules

### Do

- Preserve the existing project's architecture.
- Use TypeScript.
- Use Tailwind utility classes.
- Use the existing shadcn conventions.
- Keep the component reusable.
- Keep the component client-side because it uses WebGL/shader rendering.
- Verify that the `@/components/ui/...` import resolves correctly.
- Ensure the shader dependency is included in `package.json`.
- Ensure the project builds successfully after integration.

### Do not

- Do not replace the existing framework.
- Do not rewrite unrelated components.
- Do not introduce another CSS framework.
- Do not create duplicate versions of the component.
- Do not copy an entire external repository.
- Do not download a template or starter project.
- Do not modify unrelated global styles unless required for compatibility.
- Do not remove existing shadcn components.
- Do not introduce unnecessary dependencies.
- Do not change the component's shader behavior unless required to make it work.

---

# 7. Visual Integration

The component should render as a polished feature-card section.

Maintain:

- Rounded card geometry
- Animated WebGL shader backgrounds
- Dark translucent card overlays
- White typography
- Responsive 1/2/3-column layout
- Smooth shader rendering
- Strong visual contrast
- Mobile responsiveness

The component should not cause horizontal overflow on mobile.

The WebGL canvas/shader must remain clipped inside the rounded card container.

---

# 8. Verification

After implementation:

1. Run the project's type checker.
2. Run the project's linter if configured.
3. Run the production build.
4. Start the development server.
5. Verify the component renders without runtime errors.
6. Verify all six cards render.
7. Verify shader animation works.
8. Verify responsive behavior at:
   - Mobile
   - Tablet
   - Desktop
9. Verify dark/light mode compatibility if the project supports both.
10. Verify there are no console errors related to WebGL, React hydration, TypeScript, or missing dependencies.

If an error occurs, fix the root cause rather than suppressing the error.

---

# 9. Final Expected Structure

The relevant project structure should look approximately like:

```text
/
├── components/
│   └── ui/
│       └── feature-shader-cards.tsx
├── app/ or pages/
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.*        # if applicable to project version
└── ...
```

Do not force this exact structure if the existing framework uses a different convention, but the reusable component itself must be available from:

```text
@/components/ui/feature-shader-cards
```

---

# 10. Completion Criteria

The task is complete only when:

- `@paper-design/shaders-react` is installed.
- `feature-shader-cards.tsx` exists under `/components/ui`.
- TypeScript compilation succeeds.
- Tailwind classes compile correctly.
- The component renders successfully.
- WebGL shader animations work.
- No unrelated project functionality is broken.
- The implementation is production-build compatible.

Do not stop after creating the file. Actually integrate and verify the component in the running application.
# Antigravity Integration Prompt: AI AGENTS Hero Carousel

You are given a task to integrate and adapt an existing React hero carousel component into the codebase.

## Important Context

This is a **new implementation request**. I have NOT previously sent this prompt or component to Antigravity.

Treat this entire file as the complete source of truth for this task. Do not assume that any part of this component has already been installed, copied, configured, or integrated.

The requested content change is simple but exact:

- Change the demo brand text from **`MONTRA`** to **`AI AGENTS`**.
- Do not make unrelated content changes.
- Preserve the existing component behavior, animation system, interaction model, proportions, and visual direction unless a technical adjustment is required to make the component work correctly in the existing codebase.

---

## Project Requirements

The codebase should support:

- shadcn project structure
- Tailwind CSS
- TypeScript

If the existing project does not support these requirements:

1. Determine the current framework and project structure.
2. Provide and execute the appropriate setup steps.
3. Use the shadcn CLI where appropriate.
4. Ensure Tailwind CSS is correctly configured.
5. Ensure TypeScript is correctly configured.
6. Do not unnecessarily rebuild or replace an existing working project setup.

### Component Path

Determine the project's default component path.

The component must ultimately be available at:

`/components/ui/hero-carousel.tsx`

If the project uses a different component directory, explain internally why `/components/ui` is important for this shadcn-style component structure and create/use the expected directory without breaking the existing architecture.

Use the project's existing `@/` alias if it is already configured.

---

# Component to Integrate

Create:

`/components/ui/hero-carousel.tsx`

Use the following component as the implementation source:

```tsx
"use client"

import * as React from "react"
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion"

import { cn } from "@/lib/utils"

export interface HeroCarouselItem {
  /** Stable key; falls back to the index. @default undefined */
  id?: string | number
  /** Headline for the active slide. Newlines become separate reveal lines. */
  title: string
  /** Image URL, used both in the card and as the graded background. */
  image: string
  /** Byline printed beside the headline, e.g. "BY AURELIA STUDIO." @default undefined */
  credit?: string
  /** Right-aligned facts, e.g. ["SAT NOV 15", "5-10 PM", "MIAMI"]. @default undefined */
  meta?: string[]
  /**
   * CSS colour the background is graded to. The photo keeps its luminance and
   * takes this hue, which is what makes the backdrop swing on every change.
   * @default "#8a8a8a"
   */
  accent?: string
}

export interface HeroCarouselProps {
  /** Slides, in strip order. */
  items: HeroCarouselItem[]
  /** Focused slide when controlled. Leave unset for internal state. @default undefined */
  index?: number
  /** Focused slide on mount when uncontrolled. @default 0 */
  defaultIndex?: number
  /** Fires on every focus change, from any input. @default undefined */
  onIndexChange?: (index: number) => void
  /** Wordmark in the middle of the top bar. @default undefined */
  brand?: React.ReactNode
  /** Renders the "Back" control when provided. @default undefined */
  onBack?: () => void
  /** Renders the "Menu" control when provided. @default undefined */
  onMenu?: () => void
  /** Advance on a timer. Pauses on hover, drag and focus. @default false */
  autoplay?: boolean
  /** Milliseconds between autoplay steps. @default 4000 */
  autoplayDelay?: number
  /** Extra classes for the stage. @default undefined */
  className?: string
}

/* Ratios lifted from the reference layout, all relative to the stage box. */
const CARD_H = 0.264
const CARD_AR = 0.75
const GAP = 0.038
const STRIP_TOP = 0.5
const TITLE = 0.067
const LABEL = 0.0103
const PAD = 0.017
const RAIL = 0.2

const WHEEL_THRESHOLD = 60
const WHEEL_COOLDOWN = 420

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n))

export function HeroCarousel({
  items,
  index: controlled,
  defaultIndex = 0,
  onIndexChange,
  brand,
  onBack,
  onMenu,
  autoplay = false,
  autoplayDelay = 4000,
  className,
}: HeroCarouselProps) {
  const stageRef = React.useRef<HTMLDivElement>(null)
  const [box, setBox] = React.useState({ w: 0, h: 0 })
  const [uncontrolled, setUncontrolled] = React.useState(defaultIndex)
  const [dragging, setDragging] = React.useState(false)
  const [paused, setPaused] = React.useState(false)
  const reduced = useReducedMotion()

  const last = items.length - 1
  const index = clamp(controlled ?? uncontrolled, 0, Math.max(0, last))

  const go = React.useCallback(
    (next: number) => {
      const clamped = clamp(next, 0, Math.max(0, last))
      if (controlled === undefined) setUncontrolled(clamped)
      if (clamped !== index) onIndexChange?.(clamped)
    },
    [controlled, index, last, onIndexChange]
  )

  React.useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const read = () =>
      setBox({ w: stage.clientWidth, h: stage.clientHeight })

    read()

    const ro = new ResizeObserver(read)
    ro.observe(stage)

    return () => ro.disconnect()
  }, [])

  const fullH = clamp(box.h * CARD_H, 96, 360)
  const halfH = fullH / 2
  const cardW = fullH * CARD_AR
  const gap = Math.max(4, Math.round(cardW * GAP))
  const step = cardW + gap
  const pad = Math.max(16, Math.round(box.w * PAD))
  const label = Math.max(9, Math.round(box.h * LABEL))

  const xFor = React.useCallback(
    (i: number) => box.w / 2 - (i * step + cardW / 2),
    [box.w, step, cardW]
  )

  const x = useMotionValue(0)
  const target = xFor(index)

  const swing = reduced
    ? { duration: 0 }
    : { duration: 0.7, ease: "easeOut" as const }

  const spring = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 260, damping: 34, mass: 0.9 }

  React.useEffect(() => {
    if (dragging) return
    const run = animate(x, target, spring)
    return () => run.stop()
  }, [target, dragging, reduced, x])

  React.useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    let acc = 0
    let until = 0

    const onWheel = (e: WheelEvent) => {
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY

      const stuck =
        (delta > 0 && index === last) || (delta < 0 && index === 0)

      if (stuck) {
        acc = 0
        return
      }

      e.preventDefault()

      const now = e.timeStamp
      if (now < until) return

      acc += delta

      if (Math.abs(acc) < WHEEL_THRESHOLD) return

      go(index + Math.sign(acc))
      acc = 0
      until = now + WHEEL_COOLDOWN
    }

    stage.addEventListener("wheel", onWheel, { passive: false })

    return () => stage.removeEventListener("wheel", onWheel)
  }, [go, index])

  React.useEffect(() => {
    if (!autoplay || paused || dragging || items.length < 2) return

    const id = window.setTimeout(
      () => go(index === last ? 0 : index + 1),
      autoplayDelay
    )

    return () => window.clearTimeout(id)
  }, [autoplay, autoplayDelay, dragging, go, index, items.length, last])

  const active = items[index]
  if (!active) return null

  const lines = active.title.split("\n")
  const accent = active.accent ?? "#8a8a8a"

  return (
    <div
      ref={stageRef}
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      aria-label="Featured looks"
      onKeyDown={(e) => {
        const keys: Record<string, number> = {
          ArrowLeft: index - 1,
          ArrowRight: index + 1,
          Home: 0,
          End: last,
        }

        if (!(e.key in keys)) return

        e.preventDefault()
        go(keys[e.key]!)
      }}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={cn(
        "relative h-full min-h-[24rem] w-full overflow-hidden bg-black text-white select-none",
        "outline-none focus-visible:ring-1 focus-visible:ring-white/40 focus-visible:ring-inset",
        className
      )}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={swing}
        >
          <motion.img
            src={active.image}
            alt=""
            aria-hidden
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ scale: reduced ? 1.28 : 1.42 }}
            animate={{ scale: 1.28 }}
            transition={
              reduced ? { duration: 0 } : { duration: 6, ease: "linear" }
            }
          />

          <div
            className="absolute inset-0"
            style={{ backgroundColor: accent, mixBlendMode: "color" }}
          />

          <div
            className="absolute inset-0 opacity-55"
            style={{ backgroundColor: accent, mixBlendMode: "multiply" }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/45" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "180px 180px" }}
      />

      <div
        className="absolute inset-x-0 flex items-center justify-center"
        style={{
          top: Math.max(16, box.h * 0.029),
          gap: `${Math.max(20, box.w * 0.06)}px`,
        }}
      >
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="opacity-90 transition-opacity hover:opacity-100"
            style={{ fontSize: label * 1.15 }}
          >
            <span aria-hidden>↖</span> Back
          </button>
        ) : null}

        {brand ? (
          <div
            className="font-semibold tracking-[0.06em]"
            style={{ fontSize: label * 1.35 }}
          >
            {brand}
          </div>
        ) : null}

        {onMenu ? (
          <button
            type="button"
            onClick={onMenu}
            className="opacity-90 transition-opacity hover:opacity-100"
            style={{ fontSize: label * 1.15 }}
          >
            Menu <span aria-hidden>☰</span>
          </button>
        ) : null}
      </div>

      <div
        className="absolute inset-x-0 top-0 flex flex-col justify-end"
        style={{
          height: `${STRIP_TOP * 100}%`,
          paddingLeft: pad,
          paddingRight: pad,
          paddingBottom: Math.round(box.h * 0.028),
        }}
      >
        <div className="flex w-full flex-wrap items-end gap-x-[6vw] gap-y-2">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.h2
              key={index}
              className="font-semibold leading-[0.88] tracking-[-0.03em]"
              style={{ fontSize: Math.max(24, Math.round(box.h * TITLE)) }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.18 } }}
            >
              {lines.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={
                      reduced
                        ? { duration: 0 }
                        : {
                            duration: 0.62,
                            delay: i * 0.07,
                            ease: [0.22, 1, 0.36, 1],
                          }
                    }
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h2>
          </AnimatePresence>

          {active.credit ? (
            <motion.p
              key={`credit-${index}`}
              className="font-mono uppercase tracking-[0.14em] opacity-80"
              style={{ fontSize: label }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {active.credit}
            </motion.p>
          ) : null}

          {active.meta?.length ? (
            <div
              className="ml-auto flex items-end"
              style={{ gap: `${Math.max(16, box.w * 0.055)}px` }}
            >
              {active.meta.map((fact, i) => (
                <motion.span
                  key={`${index}-${fact}`}
                  className="font-mono whitespace-nowrap uppercase tracking-[0.14em] opacity-80"
                  style={{ fontSize: label }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 0.8, y: 0 }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { duration: 0.45, delay: 0.12 + i * 0.06 }
                  }
                >
                  {fact}
                </motion.span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div
        className="absolute inset-x-0"
        style={{ top: `${STRIP_TOP * 100}%`, height: fullH }}
      >
        <motion.div
          className="flex items-start"
          style={{ gap, x, cursor: dragging ? "grabbing" : "grab" }}
          drag="x"
          dragMomentum={false}
          dragElastic={0.08}
          dragConstraints={{ left: xFor(last), right: xFor(0) }}
          onDragStart={() => setDragging(true)}
          onDragEnd={(_, info) => {
            setDragging(false)
            const thrown = x.get() + info.velocity.x * 0.12
            go(
              Math.round(
                (box.w / 2 - thrown - cardW / 2) / step
              )
            )
          }}
        >
          {items.map((item, i) => (
            <motion.button
              key={item.id ?? i}
              type="button"
              aria-label={item.title.replace(/\n/g, " ")}
              aria-current={i === index}
              onClick={() => go(i)}
              className="relative shrink-0 overflow-hidden rounded-none bg-white/5"
              style={{ width: cardW }}
              animate={{ height: i === index ? fullH : halfH }}
              transition={spring}
            >
              <img
                src={item.image}
                alt=""
                draggable={false}
                className="h-full w-full object-cover"
                style={{ objectPosition: "50% 26%" }}
              />

              <motion.span
                aria-hidden
                className="absolute inset-0 bg-black"
                animate={{ opacity: i === index ? 0 : 0.12 }}
                transition={spring}
              />
            </motion.button>
          ))}
        </motion.div>
      </div>

      <div
        className="absolute"
        style={{
          left: pad,
          bottom: Math.max(14, box.h * 0.022),
          width: box.w * RAIL,
        }}
      >
        <div
          className="flex justify-between font-mono tabular-nums opacity-80"
          style={{ fontSize: label }}
        >
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{String(items.length).padStart(2, "0")}</span>
        </div>

        <div className="relative mt-2 h-px w-full bg-white/25">
          <motion.div
            className="absolute inset-y-0 bg-white"
            style={{ width: `${100 / items.length}%` }}
            animate={{ left: `${(index / items.length) * 100}%` }}
            transition={spring}
          />
        </div>
      </div>
    </div>
  )
}
```

---

# Demo / Usage

Create or update the appropriate demo/page file so Antigravity can verify the component.

Use:

```tsx
"use client"

import {
  HeroCarousel,
  type HeroCarouselItem,
} from "@/components/ui/hero-carousel"

const ART = (name: string) =>
  `https://pub-45c4a3d9611041d08fe82d52599b72b0.r2.dev/primary-showcase-assets/${name}.jpg`

const LOOKS: HeroCarouselItem[] = [
  {
    title: "Prismatic\nRift",
    image: ART("prismatic-rift-anime"),
    credit: "BY AURELIA STUDIO.",
    meta: ["SAT NOV 15", "5-10 PM", "MIAMI"],
    accent: "#7b61ff",
  },
  {
    title: "Ember\nClouds",
    image: ART("black-hole-ember-clouds"),
    credit: "BY MAISON DELACROIX.",
    meta: ["SUN NOV 16", "2-6 PM", "PARIS"],
    accent: "#ff4114",
  },
  {
    title: "Neon\nPortal",
    image: ART("neon-cave-portal-silhouette"),
    credit: "BY STUDIO VANTA.",
    meta: ["THU NOV 20", "8-11 PM", "BERLIN"],
    accent: "#00c8ff",
  },
  {
    title: "Red\nRibbon",
    image: ART("red-ribbon-typography"),
    credit: "BY CASA SOLARA.",
    meta: ["FRI NOV 21", "6-9 PM", "LISBON"],
    accent: "#e5231b",
  },
  {
    title: "Celestial\nLight",
    image: ART("celestial-light-figure"),
    credit: "BY AURELIA STUDIO.",
    meta: ["SAT NOV 22", "5-10 PM", "MIAMI"],
    accent: "#2f7bff",
  },
  {
    title: "Neon\nUplight",
    image: ART("neon-portrait-uplight"),
    credit: "BY ATELIER SUD.",
    meta: ["SUN NOV 23", "4-8 PM", "MARRAKECH"],
    accent: "#ff2f9c",
  },
  {
    title: "Indigo\nMarble",
    image: ART("indigo-liquid-marble"),
    credit: "BY OCHRE COLLECTIVE.",
    meta: ["WED NOV 26", "7-11 PM", "LAGOS"],
    accent: "#4356c8",
  },
  {
    title: "Launch\nWindow",
    image: ART("rocket-launch-gradient"),
    credit: "BY STUDIO NORTE.",
    meta: ["FRI NOV 28", "9 PM-2 AM", "SÃO PAULO"],
    accent: "#14307a",
  },
  {
    title: "Cosmic\nWave",
    image: ART("astronaut-cosmic-wave"),
    credit: "BY NOIR ET CIE.",
    meta: ["SAT NOV 29", "10 PM-4 AM", "TOKYO"],
    accent: "#ff3b6b",
  },
]

export default function DemoOne() {
  return (
    <HeroCarousel
      items={LOOKS}
      defaultIndex={4}
      brand="AI AGENTS"
      onBack={() => {}}
      onMenu={() => {}}
    />
  )
}
```

## Critical Content Change

The original demo contains:

```tsx
brand="MONTRA"
```

Replace it with exactly:

```tsx
brand="AI AGENTS"
```

Do **not** leave `MONTRA` anywhere in the resulting implementation.

The displayed top-center wordmark must read:

**AI AGENTS**

Keep the typography, positioning, spacing, animation, and visual treatment of the original brand element unless a responsive adjustment is required.

---

# Dependencies

Install the required dependency:

```bash
npm install framer-motion
```

If the package already exists, do not reinstall it unnecessarily.

The component also depends on:

```tsx
import { cn } from "@/lib/utils"
```

If `cn` does not exist, ensure the project has the standard shadcn utility implementation in:

`/lib/utils.ts`

Do not introduce a second competing utility system.

---

# Integration Requirements

## 1. Preserve the Component's Core Design

The hero carousel should retain its existing visual concept:

- full-bleed editorial hero
- large cinematic background image
- background color grading based on the active card accent
- horizontally arranged image cards
- focused card expanding vertically
- neighbouring cards remaining partially clipped
- smooth Framer Motion transitions
- subtle film-grain overlay
- centered top navigation cluster
- headline above the image strip
- progress rail at the bottom
- drag interaction
- wheel/trackpad navigation
- keyboard navigation
- optional autoplay
- reduced-motion support

Do not simplify the interaction into a static image slider.

## 2. Responsive Behavior

The component must work across:

- desktop
- laptop
- tablet
- mobile

The existing ResizeObserver-based proportional geometry should remain the primary sizing mechanism.

Do not replace the proportional layout with a collection of arbitrary desktop-only pixel values.

Ensure:

- cards remain visible on narrow screens
- text does not overflow
- the centered brand remains readable
- metadata wraps or adapts gracefully
- drag interaction remains usable
- keyboard interaction remains accessible
- the carousel does not trap page scrolling at its boundaries

## 3. Accessibility

Preserve and verify:

- `role="group"`
- `aria-roledescription="carousel"`
- `aria-label`
- keyboard navigation
- visible focus styling
- semantic buttons for interactive cards
- reduced-motion handling

Images used purely as visual backgrounds should remain appropriately hidden from assistive technology where the existing implementation intends them to be decorative.

## 4. Performance

Do not introduce unnecessary dependencies.

Avoid:

- excessive re-renders
- duplicated animation loops
- unnecessary image processing
- layout thrashing
- memory leaks

Keep ResizeObserver cleanup, animation cleanup, and event listener cleanup intact.

## 5. Existing Project Compatibility

Before modifying files:

1. Inspect the existing project structure.
2. Determine whether it is Next.js, Vite, or another React setup.
3. Identify the existing `src` structure.
4. Identify the Tailwind configuration.
5. Identify the TypeScript configuration.
6. Identify the shadcn configuration.
7. Identify the `@/` alias.
8. Identify whether `components/ui` already exists.
9. Identify whether `lib/utils.ts` already exists.

Then integrate into the existing architecture instead of blindly creating duplicate configuration files.

---

# Visual Direction

The result should feel like a polished technology/creative-industry hero rather than a generic template.

The component should feel:

- cinematic
- premium
- editorial
- modern
- restrained
- intentional
- highly interactive

Avoid obvious AI-generated website aesthetics.

Do not add:

- unnecessary gradients
- excessive glassmorphism
- random glowing blobs
- excessive rounded cards
- decorative icons that do not serve a purpose
- generic "AI" visual clichés
- unnecessary copy
- fake testimonials
- arbitrary badges

The requested modification is primarily a **brand replacement**, not a redesign.

---

# Validation Checklist

After implementation, verify all of the following:

### Build
- TypeScript passes.
- The application builds successfully.
- No missing imports.
- No unresolved aliases.
- No missing dependencies.

### Component
- `HeroCarousel` renders.
- The active card is centered.
- Adjacent cards remain partially visible.
- Active card height animation works.
- Background image changes with the active card.
- Accent color changes with the active card.
- Grain overlay renders.
- Headline animation works.
- Progress rail updates.
- Dragging works.
- Wheel/trackpad navigation works.
- Keyboard navigation works.
- Reduced-motion behavior works.
- Autoplay remains functional if enabled.

### Branding
Verify that:

```text
MONTRA
```

does not appear anywhere in the implementation.

Verify that the visible top-center brand reads exactly:

```text
AI AGENTS
```

### Responsive
Test at minimum:

- 375px wide mobile
- 768px tablet
- 1024px laptop
- 1440px desktop

Fix genuine layout issues discovered during testing without changing the intended design.

---

# Final Implementation Rule

Do not treat this as a partial patch.

This file represents the complete implementation request and has not previously been sent to Antigravity.

Inspect the project first, integrate the component properly, install missing dependencies, create missing shadcn utilities if genuinely required, and verify the final implementation.

The only requested content replacement from the original demo is:

```text
MONTRA
```

→

```text
AI AGENTS
```

Everything else should remain faithful to the supplied component and demo.

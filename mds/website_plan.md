# website_plan.md

# NAVYA TECH INDUSTRY — MASTER WEBSITE IMPLEMENTATION PLAN

## PURPOSE

This is the master implementation and integration plan for the complete Navya Tech Industry website.

Antigravity must read this file together with every supplied `.md` resource before beginning implementation.

The goal is NOT to create a collection of disconnected pages or unrelated components.

The goal is to build ONE fully fledged, professional, MNC-level Navya Tech Industry website in which all supplied resources work together as one continuous experience.

---

## SOURCE FILES

Core website resources:

- `mainlanding.md`
- `mainintro.md`
- `base_information.md`
- `structure.md`

Additional resources:

- `body.md`
- `pintro.md`
- `pintro2.md`
- `services.md`
- `paymentquat.md`
- `ai.md`
- `finalintro.md`
- `testi.md`
- `finalproject.md`
- `finalproject_v2.md`
- `footer1.md`

If additional supplied `.md` resources are present and clearly intended for the website, inspect them before implementation.

---

# 1. READ BEFORE CODING

DO NOT immediately start coding.

First:

1. Inspect the existing codebase.
2. Inspect the project structure.
3. Read every supplied website `.md` file.
4. Identify reusable components.
5. Identify duplicate functionality.
6. Identify conflicting styles or design systems.
7. Map every resource to its intended location.
8. Establish the global architecture.
9. Only then begin implementation.

Do not make architectural assumptions before reviewing the supplied resources.

---

# 2. CORE WEBSITE PRINCIPLE

The website must feel like:

**ONE COMPANY. ONE BRAND. ONE DESIGN SYSTEM. ONE CONTINUOUS EXPERIENCE.**

It must NOT feel like:

- unrelated templates
- disconnected demos
- multiple websites stitched together
- a collection of AI-generated component examples
- an agency portfolio template
- a SaaS dashboard
- random visual styles from different prompts

Every supplied component must belong to the same Navya Tech Industry visual language.

---

# 3. COMPLETE WEBSITE EXPERIENCE

The intended sequence is:

```text
MAIN LANDING PAGE
        ↓
GET STARTED
        ↓
MAIN INTRO PAGE
        ↓
BODY
body.md
        ↓
PINTRO
pintro.md
        ↓
PINTRO 2
pintro2.md
        ↓
SERVICES
services.md
        ↓
PACKAGES / PRICING
paymentquat.md
        ↓
AI & AUTOMATION
ai.md
        ↓
FINAL INTRO
finalintro.md
        ↓
TESTIMONIALS
testi.md
        ↓
FINAL PROJECT
finalproject.md
        ↓
FINAL PROJECT V2
finalproject_v2.md
        ↓
FOOTER
footer1.md
```

This is the intended narrative and scroll order.

The user should be able to continuously scroll through the website and experience these sections in this order.

---

# 4. CONTINUOUS EXPERIENCE

Do not automatically turn every `.md` resource into a separate route.

The default goal is a continuous website experience.

Where a supplied resource is a section/component, integrate it into the appropriate scroll experience.

Where a resource explicitly requires a separate page or route, preserve that requirement.

Do not create unnecessary page transitions, loading screens, or route changes.

---

# 5. MAIN LANDING PAGE

Source: `mainlanding.md`

This is the visual and brand entry point.

Implement it according to its supplied instructions.

Do not replace its core visual concept with a generic corporate hero.

Respect its supplied animation, interaction, typography, visual hierarchy, and CTA behavior.

---

# 6. GET STARTED

The primary Get Started action from the landing experience must begin the main website experience:

```text
LANDING
   ↓
MAIN INTRO
```

The transition should be deliberate and polished.

Avoid unnecessary full-page reloads.

---

# 7. MAIN INTRO

Source: `mainintro.md`

This is the next major experience after the landing page.

It must visually and conceptually connect with the landing page.

The Landing Page and Main Intro establish the visual DNA for the entire website.

---

# 8. BODY

Source: `body.md`

Place after Main Intro.

Use it to transition from brand introduction into company information.

Remain faithful to the supplied content.

Do not invent company facts.

---

# 9. PINTRO

Source: `pintro.md`

Place after Body.

This should transition the narrative from:

```text
WHO NAVYA IS
```

toward:

```text
WHAT NAVYA BUILDS
```

Preserve its supplied visual behavior.

---

# 10. PINTRO 2

Source: `pintro2.md`

Place immediately after `pintro.md`.

It should feel like a continuation rather than an unrelated section.

Maintain visual continuity between Body → Pintro → Pintro2.

---

# 11. SERVICES

Source: `services.md`

Place after the introductory narrative.

This is where Navya's capabilities and services are communicated.

The presentation must feel professional and enterprise-oriented.

Navya Tech Industry must feel like a technology company / technology ecosystem, not a generic creative agency.

Use supplied service content as the source of truth.

---

# 12. PACKAGES / PRICING

Source: `paymentquat.md`

Place after Services.

Use the supplied pricing information as authoritative.

The supplied package structure is:

- Website Package: `$1,000`
- AI Agents & Automation Package: `$1,000`
- Both Packages Together: `$1,500`

The combined package provides a `$500` saving compared with purchasing both separately.

The supplied source describes these as one-time lifetime-access purchases.

Maintenance, modification, customization, or additional work after the initial purchase is billed separately at `$50 per request or service`.

Do not silently change these commercial details.

Use the supplied `paymentquat.md` for the final package contents and wording.

---

# 13. AI & AUTOMATION

Source: `ai.md`

Place after Packages.

This should communicate Navya's AI and automation capabilities.

Where appropriate, communicate the relationship between:

```text
BUSINESS
   ↓
AI AGENTS
   ↓
WORKFLOWS
   ↓
AUTOMATION
   ↓
COMMUNICATION
   ↓
BUSINESS OUTCOME
```

Do not reduce AI to a decorative effect.

Use the supplied resource as the source of truth.

---

# 14. FINAL INTRO

Source: `finalintro.md`

Place after AI.

This should transition naturally toward proof and conversion.

Do not make it feel like another unrelated homepage.

---

# 15. TESTIMONIALS

Source: `testi.md`

Place after Final Intro.

Maintain the same typography, spacing, colors, motion language, and visual hierarchy.

Do not create fake testimonials or fabricated proof.

---

# 16. FINAL PROJECT

Source: `finalproject.md`

Place after Testimonials.

This begins the final conversion experience.

The user should understand what Navya is, what it builds, what it offers, and what it can automate before reaching this section.

---

# 17. FINAL PROJECT V2

Source: `finalproject_v2.md`

Place immediately after `finalproject.md`.

Continue the conversion narrative.

Do not make the two final-project sections visually contradictory.

---

# 18. FOOTER

Source: `footer1.md`

This is the final website section.

Integrate it according to the supplied resource while maintaining the global Navya design system.

Do not introduce another independent navigation system.

---

# 19. ONE GLOBAL HEADER / NAVIGATION

There must be ONLY ONE global navigation/header system across the entire website.

Do NOT create separate headers for:

- landing
- intro
- services
- AI
- pricing
- testimonials
- footer

Implement one shared global header.

It may transform visually based on scroll position where appropriate, but it remains the same global navigation system.

Follow the approved website structure in `structure.md`.

Do not expose every sub-service as a top-level navigation item.

The navigation must feel appropriate for a serious technology company / MNC.

---

# 20. GLOBAL DESIGN SYSTEM

The Main Landing Page and Main Intro Page establish the visual foundation.

The entire website must match their:

- color palette
- typography
- visual contrast
- spacing philosophy
- borders
- gradients
- shadows
- glow treatment
- animation language
- interaction language
- visual density
- background treatment

Do not allow individual `.md` components to introduce unrelated visual systems.

If a supplied component uses a different visual treatment, adapt it so it belongs to the Navya system while preserving its intended function and core experience.

---

# 21. COLOR CONSISTENCY

This is a strict requirement.

The colors established by the Main Landing Page and Main Intro Page become the global website color language.

All subsequent sections must visually belong to the same palette.

Avoid arbitrary color changes between sections.

The website must feel like one continuous brand.

---

# 22. TYPOGRAPHY

Use one unified typography system across the website.

Define global typography for:

- display headings
- section headings
- body copy
- captions
- labels
- navigation
- buttons
- metadata

Do not let every component establish an unrelated typography system.

---

# 23. ANIMATION

Use the animation language established by the Main Landing Page and Main Intro Page as the foundation.

Later sections may retain their own supplied interactions.

However:

- do not animate everything
- do not add random scroll effects
- do not add unnecessary parallax
- do not harm readability
- respect reduced-motion preferences

Animation should support hierarchy and storytelling.

---

# 24. RESPONSIVE DESIGN

The entire website must work properly on:

- desktop
- laptop
- tablet
- mobile

Check every section for:

- text overflow
- layout collapse
- excessive animation
- broken positioning
- inaccessible buttons
- navigation problems
- unreadable typography
- excessive viewport height
- horizontal scrolling

Mobile is not an afterthought.

---

# 25. PROFESSIONAL / MNC POSITIONING

The website must feel like a serious technology company.

Avoid an agency-style appearance.

Avoid:

- excessive marketing clichés
- fake statistics
- fake client logos
- fake awards
- fabricated case studies
- fake testimonials
- meaningless buzzwords
- excessive glassmorphism
- excessive gradients
- overdone neon AI visuals
- template-like card grids

Use supplied content as the source of truth.

---

# 26. NO AI SLOP

Do not:

- add generic copy just to fill space
- create repetitive cards
- repeat the same CTA everywhere
- use arbitrary gradients
- use meaningless decorative blobs
- create fake data
- create fake statistics
- use random stock-style visuals
- create excessive rounded cards
- add unnecessary badges
- repeat "AI-powered" everywhere
- add corporate buzzword soup

Every visual element must have a reason to exist.

---

# 27. COMPONENT REUSE

Before creating a new component:

1. Check whether an existing component can be reused.
2. Check whether a supplied `.md` resource already provides the required component.
3. Extract repeated patterns into shared components.
4. Keep the implementation maintainable.

Use shared systems where appropriate, such as:

- GlobalHeader
- Navigation
- Section wrapper
- Typography primitives
- CTA
- Buttons
- Animated reveal
- Container
- Footer
- Project form
- Package cards

Do not duplicate identical components throughout the application.

---

# 28. CTA FLOW

The main CTA journey should be:

```text
LANDING
  ↓
GET STARTED
  ↓
MAIN INTRO
  ↓
FULL WEBSITE EXPERIENCE
  ↓
FINAL PROJECT
  ↓
PROJECT / CONTACT ACTION
```

Do not create dead-end buttons.

Every interactive CTA must have a meaningful destination or action.

---

# 29. ACCESSIBILITY

Implement:

- semantic HTML
- keyboard navigation
- visible focus states
- accessible buttons
- accessible navigation
- appropriate contrast
- reduced-motion support
- meaningful labels
- correct heading hierarchy

Animations must never prevent access to content.

---

# 30. PERFORMANCE

Optimize:

- animation loops
- event handlers
- unnecessary React re-renders
- image loading
- component loading
- DOM complexity
- large assets
- mobile performance

Do not sacrifice performance for decorative effects.

---

# 31. SEO

Implement appropriate:

- page title
- meta description
- Open Graph metadata
- semantic headings
- accessible links
- image alt text
- structured content

Use company information from `base_information.md`.

Do not invent claims.

---

# 32. IMPLEMENTATION ORDER

## Phase 1 — Understand

Read all supplied resources.

## Phase 2 — Audit

Inspect:

- framework
- routing
- styling
- component architecture
- dependencies
- design tokens

## Phase 3 — Foundation

Create/normalize:

- global design tokens
- typography
- colors
- spacing
- containers
- buttons
- global navigation
- responsive behavior

## Phase 4 — Landing

Implement `mainlanding.md`.

## Phase 5 — Intro

Implement `mainintro.md`.

## Phase 6 — Narrative

Implement:

- `body.md`
- `pintro.md`
- `pintro2.md`

## Phase 7 — Capabilities

Implement `services.md`.

## Phase 8 — Commercial

Implement `paymentquat.md`.

## Phase 9 — AI

Implement `ai.md`.

## Phase 10 — Conversion Narrative

Implement:

- `finalintro.md`
- `testi.md`
- `finalproject.md`
- `finalproject_v2.md`

## Phase 11 — Footer

Implement `footer1.md`.

## Phase 12 — Integration

Verify that every section works together.

## Phase 13 — Visual QA

Review the complete website from top to bottom.

## Phase 14 — Responsive QA

Review desktop, tablet, and mobile.

## Phase 15 — Performance QA

Check animations, rendering, network usage, and responsiveness.

## Phase 16 — Final Polish

Fix inconsistencies without changing intended content.

---

# 33. VERIFICATION CHECKLIST

## Content

- [ ] Every supplied `.md` file has been reviewed.
- [ ] Every required resource has been integrated.
- [ ] Supplied copy has not been unnecessarily rewritten.
- [ ] Company information comes from the supplied company resource.
- [ ] Package information matches `paymentquat.md`.

## Structure

- [ ] Main Landing works.
- [ ] Get Started works.
- [ ] Main Intro follows Landing.
- [ ] Body follows Main Intro.
- [ ] Pintro follows Body.
- [ ] Pintro2 follows Pintro.
- [ ] Services follows Pintro2.
- [ ] Payment follows Services.
- [ ] AI follows Payment.
- [ ] Final Intro follows AI.
- [ ] Testimonials follow Final Intro.
- [ ] Final Project follows Testimonials.
- [ ] Final Project V2 follows Final Project.
- [ ] Footer is last.

## Navigation

- [ ] Exactly one global header/navigation exists.
- [ ] No duplicate headers were created.
- [ ] Navigation works on desktop.
- [ ] Navigation works on mobile.
- [ ] CTA works.

## Design

- [ ] Entire website matches Main Landing colors.
- [ ] Entire website matches Main Intro colors.
- [ ] Typography is consistent.
- [ ] Spacing is consistent.
- [ ] Animations feel related.
- [ ] No random design systems were introduced.
- [ ] Website feels like one company.

## Quality

- [ ] No console errors.
- [ ] No TypeScript errors.
- [ ] No broken imports.
- [ ] No missing assets.
- [ ] No broken routes.
- [ ] No horizontal overflow.
- [ ] Mobile layout works.
- [ ] Tablet layout works.
- [ ] Desktop layout works.
- [ ] Reduced motion is respected.
- [ ] Performance is acceptable.

---

# 34. FINAL DIRECTIVE TO ANTIGRAVITY

Build the complete Navya Tech Industry website as a single, cohesive, professional, fully fledged digital experience using ALL supplied resources.

Do not treat the supplied `.md` files as unrelated prompts.

Treat them as pieces of one larger system.

The final experience should communicate:

```text
NAVYA TECH INDUSTRY
        ↓
COMPANY
        ↓
CAPABILITIES
        ↓
SERVICES
        ↓
PACKAGES
        ↓
AI & AUTOMATION
        ↓
PROOF
        ↓
PROJECT
        ↓
CONTACT
```

Maintain one global navigation.

Maintain one global design language.

Match the colors of the Main Landing Page and Main Intro Page throughout the entire website.

Preserve important supplied interactions and components.

Do not introduce AI slop.

Do not invent company information.

Do not fabricate proof.

Do not create unnecessary pages.

Do not create duplicate headers.

Do not stop after implementing individual components.

The final deliverable is the COMPLETE Navya Tech Industry website, not a collection of component demos.

Build it, integrate it, run it, inspect it in the browser, test the complete scroll experience, fix issues, and only then consider the implementation complete.

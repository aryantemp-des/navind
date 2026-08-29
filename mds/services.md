# Antigravity Implementation Prompt: Services Section

## Objective

Integrate and customize the existing React section/component in the current codebase so that the section represents **Services** for the website.

This prompt is intended to be given to Antigravity as a complete implementation instruction. Do not assume that any previous prompt, component, or instruction has been provided. First inspect the existing repository, identify the relevant section/component, understand its structure, and then implement the changes below without unnecessarily changing unrelated parts of the application.

The goal is to preserve the existing component's visual structure, animation behavior, responsiveness, spacing, typography, and overall design language while replacing its placeholder/blog-oriented content with the specified services content.

---

# 1. Project Requirements

The codebase should support:

- React
- TypeScript
- Tailwind CSS
- shadcn/ui project structure

If the project already satisfies these requirements, **do not recreate or migrate the project**.

If any requirement is missing:

### TypeScript
If TypeScript is not configured, convert/setup the project using TypeScript in the least disruptive way possible.

### Tailwind CSS
If Tailwind CSS is missing, install/configure it according to the project's framework and current Tailwind version.

### shadcn/ui
If shadcn/ui is missing, initialize it using the appropriate shadcn CLI workflow for the detected framework.

Inspect the project before making changes. Do not blindly overwrite configuration files.

---

# 2. Determine the Component Structure

Before editing anything:

1. Inspect the repository structure.
2. Determine the framework being used, such as Next.js, Vite, or another React setup.
3. Locate the existing section that currently contains:
   - "Blog posts"
   - "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo."
   - "explore all posts"
   - "[Build websites in minutes with shadcn/ui]"
   - "[Easily copy code to build your website]"
   - "[The future of web design]"
4. Determine the component/file responsible for rendering this section.
5. Preserve the existing architecture instead of creating a duplicate section.
6. Determine the default component directory and style/global CSS location.
7. If the project uses `/components/ui`, keep using it.
8. If it does not have `/components/ui`, create it only if appropriate for the existing shadcn structure and explain/use it consistently.

Do not move unrelated components merely to satisfy a folder convention.

---

# 3. Main Content Changes

Apply the following exact content replacements.

## Section heading

Replace:

```text
Blog posts
```

with:

```text
Services
```

---

## Section description

Replace:

```text
Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.
```

with:

```text
Building intelligent digital systems, AI agents, and secure technology that turn complex business challenges into measurable growth.
```

Keep the sentence exactly as written above.

---

# 4. Remove "Explore All Posts"

Remove the UI element/text:

```text
explore all posts
```

This means:

- Remove the visible button/link.
- Remove any associated navigation behavior if it exists only for this button.
- Remove unused imports created solely by removing this element.
- Do not leave an empty button container or broken spacing.
- Preserve the surrounding layout and visual balance.

Do not replace it with another CTA unless the existing design absolutely requires a structural replacement. The instruction is to remove it.

---

# 5. Replace Service Card Content

The existing section appears to contain three cards/items. Convert them into the following three services.

Maintain the existing card structure, animation, image behavior, hover behavior, spacing, and responsive layout unless a small adjustment is required to make the new content fit properly.

---

## Service 1

### Title

Replace:

```text
Build websites in minutes with shadcn/ui
```

with:

```text
Digital Experiences
```

If the existing title is rendered as a link, preserve the component structure, but remove any placeholder/demo destination that is no longer relevant if it is safe to do so.

### Description

Replace:

```text
Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit
```

with:

```text
High-performance websites and digital platforms designed to turn attention into engagement and business growth.
```

---

## Service 2

### Title

Replace:

```text
Easily copy code to build your website
```

with:

```text
AI Agents & Automation
```

### Description

Replace:

```text
Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.
```

with:

```text
Intelligent AI agents that handle repetitive work, respond to customers, automate workflows, and help teams move faster.
```

---

## Service 3

### Title

Replace:

```text
The future of web design
```

with:

```text
Security Architecture
```

### Description

Replace:

```text
Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.
```

with:

```text
Secure-by-design systems, infrastructure, and architecture built to protect your data, applications, and business operations.
```

---

# 6. Required Final Content

The completed section should communicate the following hierarchy:

```text
Services

Building intelligent digital systems, AI agents, and secure technology that turn complex business challenges into measurable growth.

Digital Experiences
High-performance websites and digital platforms designed to turn attention into engagement and business growth.

AI Agents & Automation
Intelligent AI agents that handle repetitive work, respond to customers, automate workflows, and help teams move faster.

Security Architecture
Secure-by-design systems, infrastructure, and architecture built to protect your data, applications, and business operations.
```

There must be no remaining blog-oriented placeholder copy.

---

# 7. Preserve the Existing Design

Do not turn this into a generic three-column SaaS section.

Preserve the existing design language of the component, including where applicable:

- Existing animations
- Scroll effects
- Hover interactions
- Card transitions
- Typography hierarchy
- Border treatments
- Shadows
- Background effects
- Gradients
- Images
- Responsive behavior
- Section spacing
- Container widths
- Existing visual rhythm

Only make design adjustments when necessary to accommodate the new service content.

The result should feel like the original component evolved into a professional technology-services section, not like a completely unrelated component was dropped into the page.

---

# 8. Responsive Behavior

Verify the section on:

- Mobile
- Tablet
- Desktop
- Large desktop screens

Ensure:

- "AI Agents & Automation" does not cause broken card widths.
- "Security Architecture" fits naturally.
- Service descriptions remain readable.
- Cards do not overflow horizontally.
- Text does not collide with buttons, icons, or images.
- Existing animations remain usable on smaller screens.
- The removed "explore all posts" element does not leave awkward empty space.

If the existing component has responsive breakpoints, use those instead of inventing an unnecessary breakpoint system.

---

# 9. Assets

Inspect the existing cards and determine whether they use:

- Images
- Icons
- SVGs
- Background illustrations
- Remote assets

Do not download random assets merely to fill space.

If images are already part of the component, preserve them unless they are clearly blog-specific and visually incompatible with the new services.

If replacement imagery is genuinely required, use appropriate high-quality technology/business imagery. Prefer existing project assets. If external stock imagery is necessary and Unsplash is permitted by the project, use known valid Unsplash images.

Do not introduce fake image URLs.

If the component requires icons, use `lucide-react` where appropriate rather than manually drawing new SVG icons.

---

# 10. Links

Inspect the current links associated with the three cards.

Do not leave misleading demo links such as links to unrelated blog posts, shadcn demos, or placeholder websites if the cards are intended to represent the company's services.

If there are existing service routes in the project, use those.

If no service routes exist, keep links structurally valid without inventing nonexistent application routes that would produce 404s.

Do not break existing navigation.

---

# 11. Accessibility

Maintain or improve accessibility.

Verify:

- Semantic heading hierarchy
- Meaningful link labels
- Image `alt` attributes
- Keyboard accessibility
- Sufficient text contrast
- No inaccessible hover-only content
- No unnecessary ARIA attributes
- Animations do not prevent users from understanding the content

If the existing component uses decorative imagery, use appropriate empty `alt` attributes where suitable.

---

# 12. Code Quality

Keep the implementation clean and maintainable.

Do not:

- Duplicate the same component unnecessarily.
- Create an entirely new architecture for a simple text replacement.
- Add dependencies that are not required.
- Rewrite unrelated parts of the website.
- Remove existing functionality that is unrelated to this section.
- Hard-code duplicate content in multiple locations when the component already uses a data structure.
- Leave dead imports.
- Leave console errors or TypeScript errors.

If the component already receives its content through a data array/object, update that data rather than duplicating the markup.

---

# 13. Dependencies

First inspect the existing package configuration.

Only install dependencies if the current implementation requires them and they are missing.

Do not install packages merely because they are common in shadcn projects.

If the existing component already depends on packages such as:

- `lucide-react`
- animation libraries
- UI utilities

preserve those dependencies if they are actually used.

After changes, verify that the package manager and lockfile remain consistent.

---

# 14. Tailwind / CSS

Use the project's existing Tailwind setup.

If the project uses Tailwind 4:

- Follow the existing CSS-first configuration.
- Do not introduce Tailwind 3 configuration unnecessarily.

If the project uses Tailwind 3:

- Follow the existing `tailwind.config.*` and global CSS structure.

Do not overwrite the existing global stylesheet.

Only add CSS if the existing component actually requires it.

---

# 15. Implementation Process

Follow this order:

### Step 1
Inspect the entire relevant project structure.

### Step 2
Identify the exact component responsible for the current blog-post section.

### Step 3
Read the component and understand how its data, cards, links, images, and animations work.

### Step 4
Replace the heading and description.

### Step 5
Remove "explore all posts".

### Step 6
Replace the three card titles and descriptions with the service content specified in this prompt.

### Step 7
Clean up any unused imports, links, variables, or data.

### Step 8
Preserve the existing styling and animations.

### Step 9
Run the project's available lint/typecheck/build commands.

### Step 10
Fix any errors introduced by the implementation.

### Step 11
Visually verify the section at mobile, tablet, desktop, and large desktop widths.

---

# 16. Acceptance Criteria

The implementation is complete only when all of the following are true:

- [ ] The section heading says `Services`.
- [ ] The original lorem ipsum description is completely removed.
- [ ] The new section description is exactly:
  `Building intelligent digital systems, AI agents, and secure technology that turn complex business challenges into measurable growth.`
- [ ] `explore all posts` is completely removed from the UI.
- [ ] The first service is `Digital Experiences`.
- [ ] The first service description is exactly:
  `High-performance websites and digital platforms designed to turn attention into engagement and business growth.`
- [ ] The second service is `AI Agents & Automation`.
- [ ] The second service description is exactly:
  `Intelligent AI agents that handle repetitive work, respond to customers, automate workflows, and help teams move faster.`
- [ ] The third service is `Security Architecture`.
- [ ] The third service description is exactly:
  `Secure-by-design systems, infrastructure, and architecture built to protect your data, applications, and business operations.`
- [ ] No old blog/demo copy remains in this section.
- [ ] Existing animations and interactions still work.
- [ ] The section remains responsive.
- [ ] No broken links are introduced.
- [ ] No unnecessary dependencies are added.
- [ ] No TypeScript errors are introduced.
- [ ] No lint/build errors are introduced.
- [ ] Existing unrelated sections remain untouched.

---

# 17. Important Instruction

Do not treat this as a request to merely change visible strings.

This is a complete implementation task.

Inspect the existing application, understand the current component architecture, then implement the requested service transformation cleanly within that architecture.

The final result should look intentional and production-ready, as if the section was originally designed for a technology company offering:

1. Digital Experiences
2. AI Agents & Automation
3. Security Architecture

Avoid generic AI-generated visual clutter, unnecessary gradients, excessive rounded cards, random animations, or decorative elements that are not already part of the design system.

**Preserve the existing visual identity. Improve only where required for clarity, responsiveness, accessibility, and professional presentation.**

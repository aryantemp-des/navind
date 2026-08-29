# Antigravity Implementation Prompt: Footer Update

## Objective

You are working on an existing web application. Implement the requested footer content changes exactly as specified below.

This is a **content and UI integration task**, not a request to rebuild the entire application. Preserve the existing footer's layout, styling, responsiveness, spacing, typography, animations, component structure, and functionality unless a change below explicitly requires otherwise.

Do not replace the existing design with a new generic footer. Do not introduce unnecessary dependencies or unrelated refactors.

---

## Required Text Changes

Locate the existing footer component and make these exact replacements:

### 1. iOS CTA

Replace:

```text
Download ios
```

with:

```text
Call Now!
```

The CTA should retain the existing button/link styling and responsive behavior.

If the original CTA is a link intended to open an app-store destination, update its behavior appropriately for the new purpose rather than leaving a misleading iOS/App Store URL attached to a button labeled "Call Now!".

Where a phone number already exists in the project, use the existing number and make the CTA use an appropriate `tel:` link.

If no phone number exists in the project, do not invent one. Preserve the visual CTA and use the safest existing routing/interaction pattern available in the project.

---

### 2. Android CTA

Replace:

```text
Download android
```

with:

```text
Whatsapp now!
```

The CTA should retain the existing button/link styling and responsive behavior.

If the original CTA points to Google Play or another Android download destination, remove that misleading destination.

Where an existing WhatsApp number or WhatsApp contact URL already exists in the project, use it for this CTA.

If no WhatsApp contact information exists, do not invent a number. Preserve the visual CTA without fabricating contact information.

---

### 3. Copyright

Replace:

```text
© 2026 Volvox. All rights reserved.
```

with:

```text
© 2026 Navya Tech Industry. All rights reserved.
```

Keep the existing copyright styling, positioning, typography, and responsive behavior.

---

### 4. Remove Volvox Credit

Completely remove this footer credit:

```text
Crafted with ❤ by Volvox
```

Remove the entire visual element, not merely the word "Volvox".

There should be no remaining visible "Volvox" branding in the footer as a result of this credit.

Do not replace it with another "crafted by" attribution.

---

# Project Compatibility Requirements

Before modifying the component:

1. Inspect the existing project structure.
2. Identify the framework and entry/layout structure.
3. Identify where the footer component is located.
4. Determine whether the project uses:
   - React
   - Next.js
   - TypeScript
   - Tailwind CSS
   - shadcn/ui
5. Follow the project's existing conventions rather than creating a parallel architecture.

If the project already uses TypeScript, keep the implementation in TypeScript.

If the project uses Tailwind CSS, use the existing Tailwind classes and design tokens.

If the project uses shadcn/ui, preserve its component conventions.

Do not install packages unless they are genuinely required for the requested changes.

---

# Implementation Instructions

## Step 1: Inspect Before Editing

Find the existing footer implementation.

Search for the following strings:

```text
Download ios
Download android
© 2026 Volvox
Crafted with
Volvox
```

Also inspect nearby code to understand:

- Footer component structure
- CTA link destinations
- Existing contact information
- Existing WhatsApp configuration
- Existing routing
- Existing responsive behavior
- Any shared constants/configuration containing contact URLs

Do not assume the strings are all located in the same file.

---

## Step 2: Make Only the Requested Content Changes

Apply the following final footer content:

```text
Call Now!
Whatsapp now!
© 2026 Navya Tech Industry. All rights reserved.
```

Remove:

```text
Crafted with ❤ by Volvox
```

Do not modify unrelated footer copy.

Do not rename unrelated navigation items.

Do not redesign the footer.

Do not change the footer's overall visual hierarchy unless necessary to accommodate the removed credit.

---

# CTA Behavior

## Call Now!

The "Call Now!" CTA should semantically behave as a phone contact action.

Preferred implementation when a project phone number exists:

```tsx
<a href="tel:+XXXXXXXXXX">
  Call Now!
</a>
```

Use the actual existing project number instead of the placeholder.

Do **not** fabricate a phone number.

If the project already has a contact configuration object, environment variable, constant, or utility containing the phone number, reuse it.

---

## Whatsapp now!

The "Whatsapp now!" CTA should semantically behave as a WhatsApp contact action.

Preferred implementation when an existing WhatsApp number exists:

```tsx
<a href="https://wa.me/XXXXXXXXXX">
  Whatsapp now!
</a>
```

Use the actual existing project contact information.

Do **not** fabricate a WhatsApp number.

If the project already contains a WhatsApp URL, reuse it.

If the project has a centralized contact configuration, update/use that configuration instead of duplicating values.

---

# Accessibility

Ensure the updated CTAs remain accessible.

Requirements:

- Use semantic links/buttons.
- Preserve visible focus states.
- Preserve keyboard navigation.
- Do not remove meaningful `aria-label` attributes if they already exist.
- If an `aria-label` currently says "Download iOS" or "Download Android", update it to match the new action.
- "Call Now!" should communicate that it initiates a phone call.
- "Whatsapp now!" should communicate that it opens WhatsApp.

Do not add unnecessary ARIA attributes when the visible text already provides sufficient accessible naming.

---

# Responsive Behavior

The footer must remain responsive exactly as the existing design intends.

Verify at minimum:

- Desktop
- Tablet
- Mobile

The CTA changes must not cause:

- text overflow
- broken wrapping
- overlapping buttons
- layout shifts
- clipped text
- broken footer spacing

If the removal of the Volvox credit creates excessive empty space, make the smallest CSS adjustment necessary to maintain the existing visual balance.

Do not redesign the footer just to fill the space.

---

# Branding Cleanup

After implementation, verify that the footer no longer contains:

```text
Volvox
```

in any visible footer content originating from the old branding.

The footer copyright must clearly display:

```text
© 2026 Navya Tech Industry. All rights reserved.
```

The old:

```text
© 2026 Volvox. All rights reserved.
```

must not remain.

The old:

```text
Crafted with ❤ by Volvox
```

must not remain.

Do not accidentally alter unrelated third-party notices or dependency attribution elsewhere in the application.

---

# Do Not Do These Things

Do **not**:

- Rebuild the website.
- Replace the footer with a template from another website.
- Download external footer templates.
- Copy a footer from another project.
- Add fake phone numbers.
- Add fake WhatsApp numbers.
- Add unnecessary npm packages.
- Replace existing icons unnecessarily.
- Remove existing footer navigation.
- Remove existing social links.
- Change unrelated branding outside the requested footer changes.
- Change the application's color system.
- Change global typography.
- Rewrite unrelated components.
- Introduce placeholder contact information.
- Leave App Store/Google Play links attached to buttons that now claim to call or open WhatsApp.

The goal is a precise production-quality modification, not an opportunity for the codebase to develop another personality disorder.

---

# Validation Checklist

After making the changes, verify all of the following.

### Content

- [ ] `Download ios` has been replaced with `Call Now!`
- [ ] `Download android` has been replaced with `Whatsapp now!`
- [ ] `© 2026 Volvox. All rights reserved.` has been replaced with `© 2026 Navya Tech Industry. All rights reserved.`
- [ ] `Crafted with ❤ by Volvox` has been completely removed
- [ ] No unintended "Volvox" footer branding remains

### Functionality

- [ ] "Call Now!" does not point to an iOS/App Store download URL
- [ ] "Whatsapp now!" does not point to an Android/Google Play download URL
- [ ] Existing project contact information is reused when available
- [ ] No contact information was fabricated

### UI

- [ ] Existing footer layout is preserved
- [ ] Existing styling is preserved
- [ ] Existing responsive behavior is preserved
- [ ] Buttons/links remain visually consistent
- [ ] No overflow or layout breakage occurs

### Accessibility

- [ ] CTA labels accurately describe their actions
- [ ] Keyboard navigation still works
- [ ] Focus states remain visible
- [ ] Semantic link/button behavior is preserved

### Code Quality

- [ ] TypeScript remains valid
- [ ] No unnecessary dependencies were added
- [ ] No unrelated files were modified
- [ ] No dead code from the removed Volvox credit remains
- [ ] Existing project conventions are followed

---

# Final Expected Footer Copy

The relevant footer content should ultimately read:

```text
Call Now!
Whatsapp now!

© 2026 Navya Tech Industry. All rights reserved.
```

There must be **no**:

```text
Download ios
Download android
© 2026 Volvox. All rights reserved.
Crafted with ❤ by Volvox
```

---

# Final Instruction to Antigravity

Implement this directly in the existing codebase.

First inspect the project and locate the real footer implementation. Then make the smallest clean changes necessary to satisfy this specification.

Do not ask for confirmation before making the implementation.

After editing:

1. Run the project's available typecheck/lint/build validation.
2. Fix any errors caused by the implementation.
3. Verify the footer visually if browser tooling is available.
4. Confirm that the final footer contains the new Navya Tech Industry branding and CTAs.
5. Leave unrelated application code untouched.

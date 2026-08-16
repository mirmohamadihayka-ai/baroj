# 02 — Design System

## Purpose

Define the visual and interaction system of Baroj so that humans and AI agents produce consistent, accessible, maintainable interfaces.

This document is the design-system source of truth. Concrete implementation must reuse existing tokens and components before introducing new patterns.

## Principles

1. Clarity over decoration.
2. Consistency over novelty.
3. Trust before conversion.
4. Accessibility by default.
5. Mobile-first and responsive by default.
6. Reuse before creation.
7. Motion must communicate state or hierarchy, never distract.
8. Design tokens must be centralized and reusable.

## Visual Direction

Baroj should feel:

- Calm
- Trustworthy
- Spacious
- Modern
- Premium but approachable
- Information-focused

Avoid:

- Visual clutter
- Excessive gradients or effects
- Decorative elements that compete with content
- Unnecessary animations
- Inconsistent component styling

## Design Tokens

All production UI must use centralized design tokens for:

- Color
- Typography
- Spacing
- Radius
- Shadows
- Borders
- Z-index
- Motion
- Breakpoints

Do not hardcode repeated visual values inside components when a project token exists.

The implementation source for tokens must be treated as authoritative over examples in this document.

## Color

Color must communicate hierarchy, state, and brand—not decoration.

Required semantic categories:

- Background
- Surface
- Text primary
- Text secondary
- Border
- Brand/primary
- Success
- Warning
- Error
- Information
- Disabled
- Focus

Rules:

- Maintain sufficient contrast.
- Never communicate important meaning through color alone.
- Status colors must be semantically consistent across the product.
- Avoid saturated colors for ordinary content unless required by the brand or status system.

## Typography

Typography must establish a predictable hierarchy.

Rules:

- Use the project's approved font stack and typography tokens.
- Prefer readable line lengths and adequate line height.
- Do not introduce arbitrary font sizes when an existing token fits.
- Headings must communicate hierarchy, not decoration.
- Body text must remain readable on small screens.

## Spacing

Use a consistent spacing scale based on the project's token system.

The current baseline is an **8px spacing rhythm**, but components must consume semantic spacing tokens rather than manually repeating pixel values.

## Layout

- Design mobile-first.
- Use responsive layouts rather than device-specific hacks.
- Preserve predictable content hierarchy across breakpoints.
- Avoid horizontal scrolling unless the interaction explicitly requires it.
- Use consistent container and grid patterns.
- Keep dense information visually scannable.

## Components

Components must be:

- Reusable
- Composable
- Accessible
- Predictable
- Typed
- Testable
- Consistent with existing patterns

Before creating a component:

1. Search for an existing component that can be reused.
2. Check the established component API.
3. Extend an existing pattern when appropriate.
4. Create a new component only when reuse would reduce clarity or create incorrect semantics.

## Component States

Interactive components should explicitly account for applicable states:

- Default
- Hover
- Focus-visible
- Active/pressed
- Disabled
- Loading
- Success
- Error
- Empty
- Selected

Do not design only the happy path.

## Interaction

- Interactive elements must have clear affordances.
- Primary actions must remain visually identifiable.
- Feedback must be immediate and understandable.
- Destructive actions require appropriate confirmation or recovery behavior.
- Preserve user input whenever possible after validation errors.

## Motion

Motion must be purposeful and accessible.

Rules:

- Prefer short, subtle transitions.
- Use motion to explain state, hierarchy, or spatial relationships.
- Avoid animation that delays essential tasks.
- Respect `prefers-reduced-motion`.
- Do not add motion merely to make a screen feel more dynamic.

The previous 300ms guideline is a default, not a hard requirement. Choose duration according to interaction complexity and platform behavior.

## Accessibility

Target **WCAG 2.2 AA** for production interfaces.

Required considerations:

- Keyboard navigation
- Visible focus indicators
- Semantic HTML
- Accessible names and descriptions
- Appropriate heading hierarchy
- Sufficient contrast
- Screen-reader compatibility
- Touch target usability
- Form error association
- Reduced-motion support
- Accessible loading and status announcements where needed

Accessibility is part of the definition of done, not a post-release enhancement.

## Content and UX Relationship

Design must follow:

- `01-brand.md` for tone and trust
- `03-user-psychology.md` for cognitive and emotional principles
- `04-ux-rules.md` for interaction behavior

Do not solve a UX problem only through visual styling when the underlying flow is unclear.

## AI Instructions

Before generating or modifying UI, the AI agent must:

1. Read `01-brand.md`, `02-design-system.md`, and `04-ux-rules.md`.
2. Inspect existing components and tokens.
3. Reuse existing patterns before creating new ones.
4. Preserve responsive behavior.
5. Implement all relevant component states.
6. Consider accessibility during implementation, not after it.
7. Avoid introducing one-off visual values when a token exists.
8. Validate the result against the design system before completion.

If an existing component or token conflicts with the requested design, prefer the established system unless the task explicitly changes the system itself.

## Definition of Done

A UI change is not complete until applicable checks confirm:

- Visual consistency
- Responsive behavior
- Component reuse
- Accessibility
- Loading/error/empty states
- Keyboard and focus behavior
- Motion behavior
- No unnecessary new dependencies or patterns

## Cross References

- `00-product.md`
- `01-brand.md`
- `03-user-psychology.md`
- `04-ux-rules.md`
- `06-frontend.md`

## Version

**Version:** Production V1  
**Status:** Active  
**Owner:** Baroj Core Team  
**Last Updated:** 2026-08-16
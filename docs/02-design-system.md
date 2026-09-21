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

## Approved Visual Foundation

The following visual foundation is approved as the current Baroj design direction and is the baseline for future Design System tokenization.

### Brand Colors

| Role | Name | Value |
|---|---|---|
| Primary | Forest Green | `#0F3D2E` |
| Secondary | Emerald Green | `#2E7D5C` |
| Accent | Gold | `#D4AF37` |
| Background | Warm Cream | `#F7F6F2` |
| Text Primary / Dark | Deep Charcoal | `#1E1E1E` |

### Typography Direction

- Primary typeface: **IRANYekanX**.
- Typography must remain readable, calm, and structured.
- The approved visual hierarchy uses clear weight and size differences rather than decorative treatment.

### Experience Character

Baroj should communicate:

- Calm
- Trust
- Clarity
- Stability
- Modernity
- Premium quality without excessive luxury styling

### Visual Language

The current Baroj visual language favors:

- Spacious layouts.
- Warm light surfaces.
- Forest/emerald green for primary interaction and trust-oriented hierarchy.
- Gold for value, premium emphasis, and selective highlights.
- Architectural and nature-oriented imagery.
- Soft shapes and restrained depth.
- Clear, limited primary calls to action.
- Search as a central interaction in property discovery experiences.

### Current Direction Lock

Until an explicit Design System decision changes it, new UI work must not revert to the previously documented blue-primary direction or introduce a different primary typeface without an explicit design-system change.

This section records the approved current direction. Detailed token scales, layout measurements, component contracts, motion values, and other implementation-level specifications are defined separately as they are finalized.

## Typography Token System

## Component Inventory & State System

## Motion & Interaction System

### Motion Principles

Baroj motion should reinforce:

- Calmness.
- Clarity.
- Spatial continuity.
- Interaction feedback.

Motion must never become decorative noise or delay a user's task.

### Motion Rules

- Prefer short, purposeful transitions.
- Preserve immediate feedback for user actions.
- Avoid unnecessary animation on static content.
- Avoid excessive simultaneous motion.
- Do not use motion to hide loading or system latency.
- Respect `prefers-reduced-motion`.
- When reduced motion is enabled, remove or minimize non-essential movement while preserving state and meaning.

### Interaction Feedback

Applicable interactive components should communicate:

- Hover.
- Focus-visible.
- Pressed.
- Selected.
- Disabled.
- Loading.
- Success.
- Error.

Feedback should use the existing Design System tokens and component states rather than one-off visual treatments.

### Transition Guidance

The existing Design System guidance identifies 300ms as a previous/default motion guideline, but it is not a hard requirement.

Until a formal motion token scale is approved:

- Do not introduce a global duration scale.
- Do not introduce arbitrary animation timing values across components.
- Prefer the smallest duration that preserves perceptible feedback.
- Keep motion implementation local to the component or interaction that needs it.

### Loading & Async Motion

- Loading indicators must communicate active work without excessive movement.
- Prefer stable layout during loading to reduce cumulative layout shift.
- Skeleton/loading motion must be subtle.
- Async completion should transition clearly into the resulting state.
- Errors must not depend on animation to become noticeable.

### Open Decisions

- Formal motion duration tokens.
- Easing tokens.
- Standard transition presets.
- Skeleton/loading animation specification.
- Page-transition policy.

## Responsive, RTL & Accessibility System

### Responsive Rules

Baroj uses the approved responsive grid:

- Mobile: 4 columns
- Tablet: 8 columns
- Desktop: 12 columns

Responsive implementation must preserve:

- Content hierarchy.
- Readability.
- Primary interaction visibility.
- Touch-friendly controls.
- Stable spacing relationships.
- No horizontal scrolling.

Exact breakpoint values, container widths, page padding, and grid gutters remain open decisions until explicitly defined.

### RTL Rules

Baroj is a Persian-first product and must support RTL interfaces.

- RTL is the default direction for Persian product UI.
- Layout direction must use the document/application direction rather than manual visual mirroring.
- Text alignment follows language direction unless a component has a documented semantic exception.
- Icons with directional meaning must adapt to RTL where their meaning requires it.
- Icons without directional meaning must not be mirrored unnecessarily.
- Numeric values, dates, codes, URLs, and technical identifiers may require controlled LTR rendering inside RTL layouts.
- Bidirectional content must remain readable and unambiguous.
- Do not implement RTL through arbitrary per-component overrides when a shared direction rule can solve it.

### Accessibility Rules

Baroj targets WCAG 2.2 AA.

Required baseline:

- Full keyboard operability for interactive controls.
- Clearly visible focus-visible states.
- Semantic HTML where applicable.
- Accessible names for controls and meaningful icons.
- Form fields must expose labels, descriptions, and errors programmatically.
- Error and success states must not rely on color alone.
- Sufficient text and control contrast.
- Touch targets must remain usable on small screens.
- Loading and dynamic updates must be announced appropriately when users need the information.
- Reduced-motion preferences must be respected.
- Focus management must be intentional for dialogs, validation errors, and major state transitions.

### Responsive + Accessibility Interaction

Responsive behavior must not reduce accessibility.

- Do not hide essential actions only because the viewport is smaller.
- Mobile layouts must retain equivalent semantic functionality.
- Focus order must follow the logical reading and interaction order.
- Responsive reordering must not create a confusing keyboard or screen-reader sequence.
- Any mobile-only interaction must remain accessible to keyboard and assistive-technology users where applicable.

### Open Decisions

- Exact responsive breakpoints.
- Container max-width.
- Horizontal page padding per breakpoint.
- Grid gutter per breakpoint.
- Full RTL component matrix for directional icons and bidirectional content.
- Detailed accessibility testing tooling and automated test runner.


### Component Layers

Baroj components follow three layers:

1. **Foundation** — reusable UI primitives.
2. **Pattern** — reusable compositions of primitives.
3. **Domain** — components that represent Baroj business concepts or workflows.

### Foundation Inventory

The initial foundation inventory includes:

- Button
- Input
- Select
- Badge
- Icon
- Card

Additional primitives require a demonstrated reuse need and an explicit component-system decision.

### Navigation & Layout Patterns

The initial pattern inventory includes:

- Header
- Mobile Navigation
- Breadcrumb
- Search Bar
- Search Filters
- Active Filters

### Property Patterns

The initial property-oriented inventory includes:

- Property Card
- Property Gallery
- Property Metadata
- Property Filters

### AI Patterns

The initial AI-oriented inventory includes:

- AI Assistant
- AI Insight
- Recommendation Card

These are patterns only; AI provider logic must not be implemented inside UI components.

### Required Component States

Interactive components must account for applicable states:

- Default
- Hover
- Focus-visible
- Pressed
- Disabled
- Loading
- Selected
- Error
- Success

Not every component needs every state. A state is required when the component's behavior or semantics make it applicable.

### State Rules

- Focus-visible must remain clearly distinguishable.
- Disabled controls must not appear interactive.
- Loading states must communicate progress without unnecessary layout shift.
- Error and success states must use semantic color tokens and accessible text/labels.
- Selected states must be distinguishable without relying on color alone.
- Components must support keyboard interaction where interaction is applicable.
- Reduced-motion preferences must be respected.

### Component Contract Rules

Each reusable component should define:

- Purpose.
- Public props/API.
- Supported variants.
- Supported sizes.
- Supported states.
- Accessibility behavior.
- Responsive behavior when relevant.
- Visual token usage.

Components must consume Design System tokens instead of arbitrary values.

### Ownership Rules

- Foundation components belong to the shared UI layer.
- Pattern components belong to the relevant shared pattern area when reused.
- Domain components belong to their owning feature/module.
- A domain component must not be promoted to shared UI merely because it is visually reusable.
- Components must not contain business rules that belong to Application or Domain layers.

## Radius, Border & Shadow System

### Radius Tokens

The current approved component radius values are:

| Token | Value | Usage |
|---|---:|---|
| `radius-button` | 16px | Buttons and primary interactive controls |
| `radius-input` | 16px | Inputs and form controls |
| `radius-card` | 24px | Cards and major content surfaces |
| `radius-full` | 999px | Pills, badges, and fully rounded controls |

Do not introduce arbitrary radius values when an approved token applies.

### Border Rules

- Borders should be subtle and support hierarchy rather than dominate the interface.
- Use approved color tokens for borders.
- Do not invent standalone border colors.
- Focus, error, selected, and disabled borders must use their semantic state rather than ad-hoc colors.
- Border width and detailed component-specific border contracts remain open where the current sources do not define them.

### Shadow / Elevation

Baroj uses restrained depth and avoids heavy or decorative shadows.

The exact shadow scale is not currently defined by the approved sources. Therefore:

- Do not invent `shadow-sm`, `shadow-md`, or `shadow-lg` values yet.
- Prefer no shadow when elevation is not necessary.
- Any new shadow value requires an explicit Design System decision.

### Open Decisions

- Exact border widths.
- Exact shadow/elevation tokens.
- Component-specific elevation usage.

## Spacing & Layout Token System

### Spacing Scale

Baroj uses an 8px spacing rhythm.

| Token | Value | Typical Usage |
|---|---:|---|
| `space-1` | 8px | Tight control/icon spacing |
| `space-2` | 16px | Default internal spacing |
| `space-3` | 24px | Component groups |
| `space-4` | 32px | Section internals |
| `space-5` | 48px | Major section spacing |
| `space-6` | 64px | Large section separation |
| `space-7` | 96px | Hero/major page separation |

Do not introduce arbitrary spacing values when an approved token is appropriate.

### Responsive Grid

- Mobile: 4-column grid.
- Tablet: 8-column grid.
- Desktop: 12-column grid.

Grid behavior must remain responsive and content-driven. Components must not depend on fixed desktop-only positioning.

### Layout Principles

- Use generous whitespace to preserve Baroj's calm visual character.
- Prefer consistent container alignment across page sections.
- Keep primary content readable and visually focused.
- Avoid unnecessary nested containers and excessive visual density.
- Mobile layouts must remain usable without horizontal scrolling.

### Open Layout Decisions

The following values are not yet approved and must not be invented by implementation agents:

- Exact container max-width.
- Exact horizontal page padding per breakpoint.
- Exact grid gutter per breakpoint.
- Exact breakpoint pixel values.


### Typeface

- Primary typeface: **IRANYekanX**.
- No secondary UI typeface is approved at this stage.

### Type Scale

| Token | Size | Weight | Usage |
|---|---:|---|---|
| `type-display` | 40px | Bold (700) | Primary Hero headings |
| `type-h1` | 32px | Bold (700) | Page titles |
| `type-h2` | 24px | SemiBold (600) | Section headings |
| `type-h3` | 20px | SemiBold (600) | Card and subsection headings |
| `type-body-lg` | 18px | Regular (400) | Prominent supporting text |
| `type-body` | 16px | Regular (400) | Primary body text |
| `type-body-sm` | 14px | Regular (400) | Secondary/supporting text |
| `type-caption` | 12px | Regular (400) | Captions and compact metadata |
| `type-button` | 16px | SemiBold (600) | Button labels |

### Approved Weights

- Regular: 400
- Medium: 500
- SemiBold: 600
- Bold: 700

### Usage Rules

- Prefer hierarchy through size and weight rather than decorative typography.
- Do not introduce additional font families without an explicit Design System decision.
- Do not create arbitrary font sizes when an approved token is applicable.
- Typography must remain readable and calm across Baroj experiences.

## Color Token System

### Brand Tokens

- `color-brand-primary`: `#0F3D2E`
- `color-brand-secondary`: `#2E7D5C`
- `color-brand-accent`: `#D4AF37`
- `color-background`: `#F7F6F2`
- `color-text-primary`: `#1E1E1E`

### Neutral Tokens

- `neutral-0`: `#FFFFFF`
- `neutral-50`: `#F7F6F2`
- `neutral-100`: `#EDECE7`
- `neutral-200`: `#DADAD6`
- `neutral-400`: `#B8B8B8`
- `neutral-600`: `#6B6B6B`

### Status Tokens

- `status-success`: `#22C55E`
- `status-info`: `#3B82F6`
- `status-warning`: `#F59E0B`
- `status-error`: `#EF4444`
- `status-new`: `#8B5CF6`

### Gradient Tokens

- `gradient-brand-green`: `#0F3D2E → #2E7D5C`
- `gradient-gold`: `#D4AF37 → #F5D97A`

### Usage Rules

- Primary actions and trust-oriented emphasis use `color-brand-primary`.
- Secondary emphasis may use `color-brand-secondary`.
- Gold is reserved for value, premium emphasis, and selective highlights.
- Warm cream is the default visual background.
- Status colors are semantic and must not be repurposed as brand colors.
- Gradients are selective accents, not default backgrounds.
- New colors require an explicit Design System decision; do not invent ad-hoc colors.

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
# 08 — Components

## Purpose

Define how Baroj UI components are designed, organized, reused, composed, and changed so that humans and AI agents produce a coherent interface instead of isolated one-off screens.

## Principles

1. Reuse before creation.
2. Composition before duplication.
3. Semantics before appearance.
4. Accessibility is part of the component contract.
5. Component APIs should be small and predictable.
6. Domain logic belongs outside generic UI primitives.
7. Every reusable component must handle relevant states intentionally.

## Component Layers

### 1. Primitives

Low-level building blocks with no Baroj business logic.

Examples:

- Button
- Input
- Dialog
- Select
- Tabs
- Tooltip
- Card

### 2. Patterns

Reusable combinations of primitives for recurring interaction patterns.

Examples:

- Search controls
- Filter panels
- Form sections
- Empty states
- Data tables
- Confirmation flows

### 3. Domain Components

Components that understand Baroj business concepts.

Examples:

- PropertyCard
- PropertyGallery
- PropertyStatus
- AgentProfile
- SearchResultList

Domain components may use primitives and patterns but must not leak domain assumptions into generic UI components.

## Component Contract

A production component should define, as applicable:

- Inputs/props
- Output/events
- Loading behavior
- Error behavior
- Empty behavior
- Disabled behavior
- Accessibility behavior
- Responsive behavior
- Visual states

Keep APIs minimal. Do not expose implementation details when a semantic API is possible.

## Naming

- Use domain-specific names for domain components.
- Use PascalCase for React component identifiers.
- Prefer explicit names over generic names such as `Box2`, `Thing`, or `Widget`.
- Name variants by intent, not by arbitrary appearance.

## Variants and Styling

- Use design tokens from `02-design-system.md`.
- Prefer established component variants over one-off classes.
- Do not duplicate a component solely to change a small visual detail.
- Keep variant names semantic and predictable.
- Avoid exposing styling controls that allow consumers to bypass the design system without a strong reason.

## Accessibility

Every interactive component must provide appropriate:

- Semantic HTML
- Accessible name
- Keyboard behavior
- Focus-visible state
- Disabled/invalid semantics where applicable
- Screen-reader feedback where needed
- Reduced-motion behavior where applicable

Do not use a non-semantic element as an interactive control when a native element can provide the correct behavior.

## State Model

Components should explicitly consider:

```text
idle
loading
success
error
empty
selected
disabled
focused
```

Only implement states that are meaningful for the component, but do not omit a relevant failure or loading state.

## Composition Rules

- Prefer composition over deeply configurable mega-components.
- Avoid boolean-prop explosions.
- Keep domain-specific behavior in domain components.
- Keep data fetching out of primitives.
- Prefer controlled/uncontrolled patterns consistent with the existing component library.

## Testing

Test reusable components for:

- User-visible behavior
- Keyboard interaction
- Accessibility-critical behavior
- Important state transitions
- Variant behavior
- Regression-prone edge cases

Avoid tests that only assert internal implementation details.

## AI Instructions

Before creating a component:

1. Search `components/`, `features/`, and existing UI patterns.
2. Determine whether an existing component can be reused or extended.
3. Read `02-design-system.md` and this document.
4. Identify whether the component is a primitive, pattern, or domain component.
5. Define its semantic contract before implementation.
6. Implement relevant states and accessibility behavior.
7. Add or update tests when the component is reusable or behaviorally significant.

AI agents must never create a duplicate component when an existing component can satisfy the requirement without harming clarity or semantics.

## Definition of Done

A reusable component is complete when:

- Its ownership layer is clear.
- Its API is minimal and typed.
- Existing tokens and patterns are reused.
- Relevant states are handled.
- Accessibility is considered.
- Responsive behavior is intentional.
- Tests cover important behavior.

## Cross References

- `02-design-system.md`
- `04-ux-rules.md`
- `05-folder-structure.md`
- `06-coding-rules.md`
- `07-tech-stack.md`
- `09-ai-rules.md`

## Version

**Version:** Production V1  
**Status:** Active  
**Owner:** Baroj Core Team  
**Last Updated:** 2026-08-16

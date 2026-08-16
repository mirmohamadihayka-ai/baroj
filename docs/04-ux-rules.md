# 04 — UX Rules

## Purpose

Define the non-negotiable UX rules for Baroj. These rules guide product decisions, interface design, implementation, review, and AI-generated work.

UX must make the product easier to understand, safer to use, and more predictable—not merely more visually attractive or conversion-focused.

## Principles

1. Clarity over complexity.
2. Trust before conversion.
3. User control over persuasion.
4. Consistency across flows.
5. Accessibility by default.
6. Feedback for meaningful actions.
7. Progressive disclosure over information overload.
8. Safe recovery over irreversible surprises.

## Navigation

- Navigation must be predictable.
- Keep primary destinations stable.
- Make the current location understandable.
- Keep important actions discoverable.
- Never hide critical information behind deceptive interaction patterns.
- Preserve context when moving between related views.
- Avoid unnecessary navigation depth.

## Information Hierarchy

- Put the most decision-relevant information first.
- Use headings, grouping, spacing, and semantic structure to establish hierarchy.
- Do not bury material pricing, status, restrictions, or consequences.
- Progressive disclosure may hide secondary detail, but never hide information that materially affects a decision.

## Primary Actions

- Prefer one clearly identifiable primary action per context.
- Secondary actions must not visually compete with the primary action.
- Destructive actions must be visually and semantically distinct.
- Action labels must describe the result, not vague commands such as "Continue" when a specific label is possible.

## Forms

- Ask only for information necessary for the current task.
- Use appropriate input types and semantic labels.
- Group related fields.
- Validate as early as useful without interrupting typing.
- Preserve entered data after recoverable errors.
- Explain what is wrong and how to fix it.
- Do not disable submission without explaining why when explanation is useful.
- Clearly distinguish required and optional information.

## Feedback

Meaningful user actions must produce understandable feedback.

Use appropriate states for:

- Loading
- Success
- Error
- Empty
- Disabled
- Pending
- Partial completion

Feedback should answer:

1. What happened?
2. What is the current state?
3. What can the user do next?

## Loading

- Show loading feedback for operations that are not effectively instantaneous.
- Prefer contextual loading states over unnecessary global blockers.
- Preserve already available content when possible.
- Never create artificial delays for perceived value.
- Avoid layout shifts caused by unpredictable loading behavior.

## Errors

Errors must be actionable and calm.

- Explain the problem in user language.
- Do not expose internal implementation details unless useful.
- Preserve user work whenever possible.
- Provide a recovery action.
- Distinguish user-input errors from system failures.
- Do not blame the user.

## Empty States

An empty state should explain the situation and provide a useful next step when one exists.

Examples of useful next steps:

- Create an item
- Adjust filters
- Search again
- Learn why results are empty
- Return to a useful starting point

## Search and Discovery

For property discovery and search:

- Keep query intent understandable.
- Make active filters visible.
- Make filter changes reversible.
- Preserve search context where practical.
- Do not hide important ranking or filtering behavior.
- Clearly distinguish unavailable, unavailable-to-book, and unknown status where applicable.

## AI Experiences

AI interfaces must:

- Make it clear when content is AI-generated or AI-assisted when that distinction matters.
- Distinguish facts from recommendations or generated interpretation.
- Communicate meaningful uncertainty.
- Avoid fabricated certainty.
- Preserve user control over consequential actions.
- Allow users to correct or refine important inputs.
- Never execute high-impact actions solely from ambiguous natural language when confirmation is required.

## Accessibility

Target **WCAG 2.2 AA** for production experiences.

Required considerations:

- Keyboard navigation
- Visible focus states
- Semantic HTML
- Accessible names and descriptions
- Logical heading structure
- Sufficient contrast
- Screen-reader compatibility
- Appropriate touch targets
- Reduced-motion support
- Accessible validation and status feedback

Accessibility defects are product defects.

## Responsive UX

- Design mobile-first.
- Support relevant viewport sizes without device-specific hacks.
- Preserve task priority across breakpoints.
- Avoid horizontal scrolling for ordinary content.
- Ensure critical actions remain reachable and understandable on small screens.

## Performance UX

- Treat performance as part of the user experience.
- Avoid unnecessary blocking operations.
- Use progressive loading where appropriate.
- Prevent avoidable layout shifts.
- Give clear feedback when operations take time.

## Trust and Safety

Never use:

- Dark patterns
- Fake urgency
- Hidden fees
- Misleading defaults
- Forced continuity
- Obscured cancellation
- Fake verification
- Manipulative confirmation wording
- Misleading AI confidence

## UX Review Checklist

Before completing a UX change, verify:

- [ ] User goal is clear.
- [ ] Primary action is clear.
- [ ] Important information is visible.
- [ ] Loading, success, error, and empty states are handled where applicable.
- [ ] User input is preserved where appropriate.
- [ ] Recovery paths exist for recoverable failures.
- [ ] Keyboard and focus behavior are usable.
- [ ] Mobile behavior is intentional.
- [ ] Accessibility requirements are considered.
- [ ] No dark pattern or misleading behavior was introduced.
- [ ] Existing Baroj patterns were reused where applicable.

## AI Instructions

Before implementing or modifying UX, the AI agent must:

1. Read `00-product.md`.
2. Read `01-brand.md`, `02-design-system.md`, and this document.
3. Inspect existing flows and components before inventing new patterns.
4. Identify the user's goal and the primary action.
5. Identify loading, empty, error, and recovery states.
6. Check accessibility and responsive behavior.
7. Check for trust, privacy, and dark-pattern risks.
8. Validate the final implementation against this checklist.

If the requested behavior conflicts with these rules, the AI must not silently introduce the conflict. Resolve it through the documented product and UX constraints or ask for clarification when the conflict is material.

## Cross References

- `00-product.md`
- `01-brand.md`
- `02-design-system.md`
- `03-user-psychology.md`
- `05-architecture.md`
- `06-frontend.md`

## Version

**Version:** Production V1  
**Status:** Active  
**Owner:** Baroj Core Team  
**Last Updated:** 2026-08-16
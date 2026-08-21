# UI Task Prompt

## Task
- Task ID: `UI-XXX`
- Objective: [user-facing outcome]
- Screen/Flow: [target surface]
- Relevant Brain: `01-brand.md`, `02-design-system.md`, `03-user-psychology.md`, `04-ux-rules.md`, `08-components.md`
- Scope: [components/routes/states]

## Requirements
- Reuse existing components and design tokens.
- Follow Baroj interaction, responsive, and accessibility rules.
- Define loading, empty, error, disabled, success, and permission states when applicable.
- Preserve server/client boundaries.

## Execution
1. Inspect existing UI patterns.
2. Identify reusable components and tokens.
3. Implement the smallest consistent solution.
4. Validate responsive and accessibility behavior.
5. Run relevant tests/checks.
6. Review the final diff.

## Acceptance Criteria
- [ ] Matches the documented design system.
- [ ] Responsive behavior is correct.
- [ ] Keyboard/accessibility behavior is preserved.
- [ ] No arbitrary tokens or duplicate components are introduced.
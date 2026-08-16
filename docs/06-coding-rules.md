# 06 — Coding Rules

## Purpose

Define the non-negotiable engineering rules for Baroj code. These rules are the implementation contract for developers and AI coding agents.

## Principles

1. Correctness before speed.
2. Read existing code before writing new code.
3. Prefer simple, explicit solutions.
4. Preserve established architecture and patterns.
5. Make invalid states difficult to represent.
6. Keep changes small and reviewable.
7. Never trade security, accessibility, or data integrity for convenience.

## TypeScript

- Use TypeScript for application code.
- Keep strict type checking enabled.
- Avoid `any`; use `unknown` and narrow it when the type is genuinely unknown.
- Prefer explicit domain types at system boundaries.
- Validate untrusted input at runtime.
- Do not duplicate types when a canonical type already exists.

## React / Application Code

- Prefer server-first patterns where the framework supports them.
- Add client-side code only when interactivity, browser APIs, or client state require it.
- Keep components focused on presentation and orchestration.
- Keep business logic in domain/service modules rather than UI components.
- Keep side effects explicit.
- Do not use global state when local or server state is sufficient.

## Error Handling

- Handle expected failures explicitly.
- Never silently swallow errors.
- Return user-safe messages at UI boundaries.
- Preserve useful diagnostic context for logging.
- Do not expose secrets, stack traces, tokens, or internal implementation details to users.
- Define recovery behavior for recoverable failures.

## Data and Security

- Treat all external input as untrusted.
- Validate request bodies, query parameters, route parameters, uploads, and AI outputs when used as application data.
- Enforce authorization on the server; never rely on UI visibility.
- Never hardcode credentials, API keys, or secrets.
- Use environment variables for secrets and deployment configuration.
- Apply least privilege to database and service access.

## Async and State

- Handle loading, success, empty, and error states where applicable.
- Avoid race conditions and stale updates.
- Cancel or ignore obsolete async work when appropriate.
- Keep server state, client state, and URL state conceptually separate.

## Performance

- Avoid premature optimization.
- Avoid unnecessary client JavaScript.
- Prevent avoidable re-renders and duplicate requests.
- Use pagination, filtering, and incremental loading for large datasets.
- Do not introduce a performance optimization without understanding its trade-offs.

## Accessibility

Production UI must target WCAG 2.2 AA and follow `02-design-system.md` and `04-ux-rules.md`.

## Dependencies

Before adding a dependency:

1. Check whether the existing stack already solves the problem.
2. Check maintenance and security posture.
3. Check bundle/runtime impact.
4. Prefer a small, focused dependency over overlapping libraries.
5. Document the reason when the dependency introduces significant architectural weight.

## Code Quality

- Prefer small functions with clear contracts.
- Avoid premature abstractions.
- Avoid duplicate business rules.
- Keep naming domain-specific and unambiguous.
- Comments should explain why, not restate what the code does.
- Remove dead code instead of leaving disabled alternatives.

## Testing

Test behavior and contracts, not implementation details.

Use the repository's configured test tools and cover, where applicable:

- Critical business rules
- Validation
- Authorization
- Error paths
- Important UI states
- AI safety/format constraints
- Regression-prone logic

## Git and Changes

- Keep commits focused.
- Do not mix unrelated refactors with feature work.
- Do not rewrite history unless explicitly requested.
- Review the final diff before declaring completion.

## AI Instructions

Before coding:

1. Read `AGENTS.md` if present.
2. Read `CURSOR_CONTEXT.md` if present.
3. Read the relevant Brain documents.
4. Inspect existing implementation and tests.
5. State or internally establish the smallest safe implementation plan.

During coding:

- Reuse existing patterns.
- Do not invent APIs, data models, or product behavior.
- Do not modify unrelated files.
- Stop and ask when unresolved ambiguity could cause architectural, security, data, or product harm.

After coding:

1. Run relevant type checks.
2. Run linting.
3. Run relevant tests.
4. Review the diff.
5. Verify the change against the relevant Brain rules.

## Definition of Done

A change is complete only when it is implemented, validated, reviewable, and consistent with the Baroj Brain.

## Cross References

- `00-product.md`
- `02-design-system.md`
- `04-ux-rules.md`
- `05-folder-structure.md`
- `07-tech-stack.md`
- `08-components.md`
- `09-ai-rules.md`

## Version

**Version:** Production V1  
**Status:** Active  
**Owner:** Baroj Core Team  
**Last Updated:** 2026-08-16

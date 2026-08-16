# 09 — AI Rules

## Purpose

Define the mandatory behavior of AI coding agents working on Baroj. These rules make AI work predictable, traceable, safe, and consistent with the Baroj Brain.

## Principles

1. Brain before assumptions.
2. Inspect before editing.
3. Reuse before inventing.
4. Small changes before broad refactors.
5. Validate before declaring completion.
6. Never guess on high-impact decisions.
7. Preserve user control, security, and data integrity.

## Source-of-Truth Order

When instructions conflict, use this order unless an explicit project decision says otherwise:

1. Explicit approved task requirements
2. `AGENTS.md`
3. `CURSOR_CONTEXT.md`
4. Relevant Brain documents
5. Existing architecture and repository configuration
6. Existing code patterns
7. AI assumptions

AI assumptions must never silently override documented project decisions.

## Mandatory Workflow

Every non-trivial coding task follows:

```text
UNDERSTAND
→ INSPECT
→ PLAN
→ IMPLEMENT
→ VALIDATE
→ REVIEW
→ REPORT
```

### Understand

Identify:

- User outcome
- Technical objective
- Scope
- Constraints
- Acceptance criteria

### Inspect

Before editing:

- Read relevant Brain documents.
- Inspect existing implementation.
- Search for reusable components, utilities, services, schemas, and tests.
- Check configuration and dependency versions.

### Plan

For non-trivial work, establish the smallest safe implementation plan.

Do not produce a speculative architecture when the repository already has an established pattern.

### Implement

- Modify only required files.
- Follow existing patterns.
- Keep changes focused.
- Avoid unrelated refactors.
- Preserve backward-compatible behavior unless the task explicitly changes it.

### Validate

Run applicable:

- Type checking
- Linting
- Unit/component tests
- End-to-end tests
- Build checks
- Accessibility checks

Fix failures caused by the change before completion.

### Review

Inspect the final diff for:

- Unrelated changes
- Security issues
- Accessibility regressions
- Dead code
- Duplicate logic
- Missing states
- Missing validation
- Brain violations

### Report

Final output should state:

- What changed
- Files changed
- Validation performed
- Known limitations or unresolved issues

## Ambiguity Protocol

Do not ask questions for ambiguity that can be resolved safely from the repository or Brain.

Stop and request clarification when ambiguity can materially affect:

- Architecture
- Security
- Authorization
- Database/data integrity
- User trust
- Financial behavior
- Destructive or irreversible actions
- Public API contracts

Never invent a high-impact requirement.

## Code Generation Rules

AI-generated code must:

- Match the repository's language and framework.
- Reuse existing abstractions.
- Use strict typing.
- Validate untrusted input.
- Follow accessibility requirements.
- Handle relevant loading, empty, and error states.
- Avoid unnecessary dependencies.
- Avoid secrets and sensitive data in source code or logs.

## UI Rules

Before changing UI, read:

- `01-brand.md`
- `02-design-system.md`
- `03-user-psychology.md`
- `04-ux-rules.md`
- `08-components.md`

Reuse existing components and tokens before creating new ones.

## Architecture Rules

Before architectural changes:

- Read `05-architecture.md`.
- Read `05-folder-structure.md`.
- Read `07-tech-stack.md`.
- Identify downstream effects.
- Avoid introducing competing patterns.

Architectural changes require explicit documentation when they alter a project-wide decision.

## Security Rules

AI agents must never:

- Expose secrets.
- Disable security controls to make tests pass.
- Bypass authorization.
- Treat client-side checks as sufficient authorization.
- Log credentials, tokens, or unnecessary sensitive personal data.
- Invent security guarantees.

## Change Boundaries

If a task requests one feature, do not opportunistically:

- Rewrite unrelated modules.
- Upgrade unrelated dependencies.
- Rename broad parts of the project.
- Change design tokens globally.
- Change database architecture without requirement.

## Completion Gate

Never claim a task is complete unless:

- The requested behavior exists.
- Relevant checks have been run or their absence is explicitly reported.
- The final diff is understood.
- No known high-impact issue is being hidden.

## AI Instructions

This document is mandatory for AI coding agents.

The agent must treat the Baroj Brain as persistent project memory and must keep implementation aligned with it.

When the Brain and existing code disagree:

1. Determine whether the code represents an intentional newer decision.
2. Do not silently rewrite either source.
3. Prefer the explicit approved decision.
4. Report material inconsistencies so the Brain can be updated deliberately.

## Cross References

- `00-product.md`
- `02-design-system.md`
- `04-ux-rules.md`
- `05-architecture.md`
- `05-folder-structure.md`
- `06-coding-rules.md`
- `07-tech-stack.md`
- `08-components.md`

## Version

**Version:** Production V1  
**Status:** Active  
**Owner:** Baroj Core Team  
**Last Updated:** 2026-08-16

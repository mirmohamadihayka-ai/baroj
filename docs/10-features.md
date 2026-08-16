# 10 — Features

## Purpose

Define how Baroj product features are specified, scoped, implemented, validated, and maintained.

This document is the feature-level contract for humans and AI coding agents.

## Principles

1. Every feature must solve a defined user or business problem.
2. Scope before implementation.
3. Reuse existing capabilities before adding new systems.
4. Features must define success and failure behavior.
5. Keep feature boundaries explicit.
6. Prefer incremental delivery over large speculative builds.
7. Never invent product behavior when the Brain or repository already defines it.

## Feature Contract

Every non-trivial feature should define:

- Feature ID
- Problem
- User outcome
- Scope
- Non-goals
- Dependencies
- Acceptance criteria
- States and edge cases
- Security/privacy considerations
- Analytics requirements when applicable
- Validation requirements

Recommended format:

```text
Feature ID: FEAT-XXX
Name: <feature name>
Problem: <problem>
Outcome: <user outcome>
Scope: <included behavior>
Non-goals: <excluded behavior>
Acceptance Criteria:
- [ ] ...
Dependencies:
- ...
```

## Feature Lifecycle

```text
IDEA
→ DISCOVERY
→ SPECIFICATION
→ DESIGN
→ IMPLEMENTATION
→ VALIDATION
→ RELEASE
→ OBSERVATION
→ ITERATION
```

A feature is not complete merely because code exists. It must satisfy acceptance criteria and pass relevant validation.

## Scope Rules

- Keep the first implementation as small as possible while delivering the intended outcome.
- Do not mix unrelated refactors into feature work.
- Separate future ideas from current acceptance criteria.
- Prefer feature flags for risky or staged releases when the project supports them.

## UX Requirements

Features with user-facing behavior must follow:

- `01-brand.md`
- `02-design-system.md`
- `03-user-psychology.md`
- `04-ux-rules.md`
- `08-components.md`

Consider loading, empty, error, success, disabled, permission, and responsive states where relevant.

## Technical Requirements

Features must follow:

- `05-folder-structure.md`
- `06-coding-rules.md`
- `07-tech-stack.md`
- `09-ai-rules.md`

Do not create a new architectural pattern for a single feature without justification.

## AI Instructions

Before implementing a feature, the AI agent must:

1. Identify the feature ID and desired outcome.
2. Read the relevant Brain documents.
3. Inspect existing related code.
4. Search for reusable components, services, schemas, and data models.
5. Define the smallest safe implementation plan.
6. Implement only the approved scope.
7. Validate acceptance criteria and affected system behavior.
8. Report changed files, validation, and unresolved issues.

If requirements are ambiguous but safely resolvable from project context, resolve them without asking. If ambiguity can materially affect architecture, security, data integrity, financial behavior, or user trust, stop and request clarification.

## Definition of Done

A feature is complete when:

- Acceptance criteria pass.
- Relevant tests/checks pass.
- Security and authorization are enforced where required.
- UX states are handled.
- No unrelated changes are included.
- Documentation is updated when the feature changes a project-wide decision.

## Cross References

- `00-product.md`
- `04-ux-rules.md`
- `05-architecture.md`
- `06-coding-rules.md`
- `08-components.md`
- `09-ai-rules.md`
- `11-roadmap.md`

## Version

**Version:** Production V1  
**Status:** Active  
**Owner:** Baroj Core Team  
**Last Updated:** 2026-08-16

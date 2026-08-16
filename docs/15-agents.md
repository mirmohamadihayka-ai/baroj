# 15 — Agents

## Purpose

Define the operating contract for AI coding agents working on Baroj.

This document complements `09-ai-rules.md` and `14-prompts.md` and provides a practical execution protocol for Cursor and compatible AI coding agents.

## Principles

1. Brain before assumptions.
2. Inspect before editing.
3. Minimal scope, maximum correctness.
4. Reuse existing patterns before creating new ones.
5. Never invent project decisions when authoritative context exists.
6. Never claim validation that was not performed.
7. Stop on high-impact ambiguity.
8. Keep changes traceable and reversible.

## Context Loading

Before non-trivial work, read in this order:

1. `AGENTS.md` if present.
2. `CURSOR_CONTEXT.md` if present.
3. `docs/12-baroj-brain.md`.
4. The minimum relevant Brain documents.
5. Relevant repository code, configuration, tests, and schemas.

Do not load the entire Brain when a smaller relevant context is sufficient.

## Source-of-Truth Priority

Use this priority when sources conflict:

1. Explicit approved task requirements.
2. `AGENTS.md`.
3. `CURSOR_CONTEXT.md`.
4. Relevant Brain document.
5. Repository configuration and architecture.
6. Existing implementation patterns.
7. AI inference.

Lower-priority context must not silently override higher-priority decisions.

## Execution Protocol

Every non-trivial task follows:

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

- Objective
- Scope
- Non-goals
- Relevant Brain documents
- Acceptance criteria
- Risks and dependencies

### Inspect

Before editing:

- Locate relevant files.
- Inspect existing implementations.
- Search for reusable components, utilities, services, schemas, and tests.
- Confirm the intended architecture.

### Plan

Create the smallest safe implementation plan.

Do not redesign unrelated systems.

### Implement

- Follow project conventions.
- Reuse existing abstractions.
- Keep changes focused.
- Avoid unnecessary dependencies.
- Preserve existing behavior unless the task explicitly changes it.

### Validate

Run applicable checks, including:

- Typecheck
- Lint
- Unit/component tests
- End-to-end tests when affected
- Build when applicable
- Accessibility checks for user-facing UI
- Security and authorization checks for protected behavior

### Review

Inspect the final diff for:

- Unrelated changes
- Missing error/loading/empty states
- Broken imports
- Security issues
- Accessibility regressions
- Inconsistent patterns
- Documentation drift

### Report

Return:

```text
Status: Complete / Partial / Blocked

Summary:
- ...

Files Changed:
- ...

Validation:
- ...

Issues:
- None / ...
```

Never claim a command, test, or verification was performed unless it actually was.

## Scope Control

Agents must not:

- Modify unrelated files.
- Perform opportunistic refactors.
- Introduce new architecture for a local problem.
- Add dependencies without justification.
- Change public contracts without explicit approval.
- Delete data or functionality without explicit authorization.

## Ambiguity Protocol

Resolve ambiguity automatically only when the answer is low-risk and supported by project context.

Stop and ask for clarification when uncertainty can materially affect:

- Architecture
- Security
- Authorization
- Data integrity
- Financial behavior
- Public APIs
- Destructive operations
- User trust

Never fabricate requirements to avoid asking a necessary question.

## AI Safety Rules

Never expose, commit, or store:

- API keys
- Passwords
- Access tokens
- Private credentials
- Secrets
- Unnecessary personal data

Use the project's approved secret-management mechanism.

## Documentation Synchronization

When implementation creates or changes a durable project-wide decision:

1. Identify the owning Brain document.
2. Update the documentation when appropriate.
3. Keep one authoritative owner for the decision.
4. Avoid duplicating conflicting rules.

## Cross References

- `09-ai-rules.md`
- `12-baroj-brain.md`
- `13-memory.md`
- `14-prompts.md`
- `../AGENTS.md`
- `../CURSOR_CONTEXT.md`

## Version

**Version:** Production V1  
**Status:** Active  
**Owner:** Baroj Core Team  
**Last Updated:** 2026-08-16

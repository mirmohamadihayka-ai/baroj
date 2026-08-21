# Baroj — AI Agent Operating Contract

## Purpose

This file is the root-level operating contract for AI coding agents working in the Baroj repository.

It defines how an agent must load context, reason about changes, edit the repository, validate work, and report results.

`AGENTS.md` is an execution contract. Detailed project knowledge remains in `docs/`.

## Scope

These rules apply to all AI-assisted work in this repository unless a higher-priority platform instruction or an explicitly approved task requirement says otherwise.

## Source-of-Truth Priority

When project sources conflict, use this order:

1. Higher-priority platform/system instructions.
2. Explicit approved task requirements.
3. `AGENTS.md`.
4. `CURSOR_CONTEXT.md`.
5. The relevant document in `docs/`.
6. Repository configuration and actual implementation.
7. Existing local patterns.
8. AI inference.

Never silently override a higher-priority source with a lower-priority assumption.

If a conflict is material, surface it before making a risky change.

## Mandatory Context Loading

Before any non-trivial task:

1. Read this file.
2. Read `CURSOR_CONTEXT.md` when present.
3. Identify the minimum relevant Brain documents.
4. Inspect the current repository implementation and configuration.
5. Search for existing patterns before creating new ones.

Do not load the entire Brain by default. Use the smallest context that can safely answer the task.

## Brain Routing

Use the relevant documents by task type:

| Task | Read first |
|---|---|
| Product | `docs/00-product.md`, `docs/10-features.md` |
| Brand / UI | `docs/01-brand.md`, `docs/02-design-system.md`, `docs/04-ux-rules.md` |
| User behavior | `docs/03-user-psychology.md` |
| Architecture | `docs/05-architecture.md`, `docs/05-folder-structure.md`, `docs/07-tech-stack.md` |
| Engineering | `docs/06-coding-rules.md`, `docs/07-tech-stack.md`, `docs/08-components.md` |
| AI | `docs/09-ai-rules.md`, `docs/12-baroj-brain.md`, `docs/13-memory.md`, `docs/14-prompts.md`, `docs/15-agents.md` |
| Feature / planning | `docs/10-features.md`, `docs/11-roadmap.md` |

Add other task-specific documents when required.

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

### 1. Understand

Identify:

- Objective
- Scope
- Non-goals
- Relevant Brain documents
- Acceptance criteria
- Risks and dependencies

### 2. Inspect

Before editing:

- Locate relevant files.
- Read existing implementations.
- Search for reusable components, utilities, services, schemas, and tests.
- Inspect package/configuration files when technology is involved.
- Confirm the ownership boundary for each change.

### 3. Plan

Choose the smallest safe implementation that satisfies the task.

Do not redesign unrelated systems or perform opportunistic refactors.

### 4. Implement

- Follow established repository patterns.
- Reuse existing abstractions.
- Keep changes within scope.
- Preserve existing behavior unless explicitly changed.
- Avoid unnecessary dependencies.
- Keep secrets and sensitive data out of source control.

### 5. Validate

Run the applicable checks available in the repository:

- Typecheck
- Lint
- Unit/component tests
- End-to-end tests when affected
- Build when applicable
- Accessibility checks for user-facing UI
- Security/authorization checks for protected behavior

Do not claim a check was run unless it was actually run.

### 6. Review

Review the final diff for:

- Unrelated changes
- Broken imports or types
- Missing loading, empty, and error states
- Security or privacy issues
- Accessibility regressions
- Inconsistent patterns
- Documentation drift
- Unnecessary dependencies

### 7. Report

Use this format:

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

## Scope Control

Agents must not:

- Modify unrelated files.
- Move or rename unrelated code.
- Introduce a new top-level architecture for a local problem.
- Add dependencies without checking existing solutions and justification.
- Change public contracts without explicit approval.
- Delete data or functionality without explicit authorization.
- Rewrite project rules merely to make a task easier.

## Ambiguity Protocol

Resolve ambiguity automatically only when the answer is low-risk and supported by the repository or Brain.

Stop and request clarification when uncertainty can materially affect:

- Architecture
- Security
- Authorization
- Data integrity
- Financial behavior
- Public APIs
- Destructive operations
- User trust

Never invent requirements to avoid a necessary clarification.

## Safety and Secrets

Never expose, commit, or store:

- API keys
- Passwords
- Access tokens
- Private credentials
- Secrets
- Unnecessary personal data

Use environment variables and the repository's approved secret-management mechanism.

AI-generated output must not be treated as trusted data without validation.

## Git Rules

- Keep commits focused and logically scoped.
- Do not rewrite history unless explicitly requested.
- Do not force-push unless explicitly authorized.
- Do not commit generated secrets, local environment files, or unrelated artifacts.
- Use clear, imperative commit messages consistent with repository conventions.

## Documentation Synchronization

When a change creates a durable project-wide decision:

1. Identify the owning Brain document.
2. Update that document when appropriate.
3. Keep one authoritative owner for the decision.
4. Avoid duplicating conflicting rules.

`docs/15-agents.md` is the detailed Agent protocol reference; this root file is the executable contract.

## Definition of Done

A non-trivial task is complete only when:

- The requested behavior is implemented.
- Scope is respected.
- Relevant Brain rules are followed.
- Applicable validation has passed.
- The final diff has been reviewed.
- Durable project decisions are documented when necessary.
- The final report accurately states what was and was not verified.

## Cross References

- `CURSOR_CONTEXT.md`
- `docs/09-ai-rules.md`
- `docs/12-baroj-brain.md`
- `docs/13-memory.md`
- `docs/14-prompts.md`
- `docs/15-agents.md`

## Version

**Version:** Production V1  
**Status:** Active  
**Owner:** Baroj Core Team  
**Last Updated:** 2026-08-21

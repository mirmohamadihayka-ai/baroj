# 16 — Development Protocol

## Purpose

Define the mandatory execution lifecycle for AI coding agents working on Baroj.

This protocol converts a task into a controlled sequence: understand → inspect → plan → implement → test → verify → review → report.

## Principles

- Context before code.
- Evidence before assumptions.
- Smallest safe change.
- Existing patterns before new abstractions.
- Validation before completion.
- No unrelated changes.
- Never claim work that was not performed.

## Protocol

### 1. UNDERSTAND

Identify:

- Task ID and objective.
- Scope and non-goals.
- Acceptance criteria.
- Relevant Brain documents.
- Applicable Cursor rules.
- Dependencies and risk.

If the task is ambiguous, resolve it from authoritative project context when safe. Stop for clarification when ambiguity can affect architecture, security, data integrity, public contracts, or destructive behavior.

### 2. INSPECT

Before editing:

- Read the applicable context and rules.
- Inspect the relevant repository files.
- Search for existing components, utilities, services, schemas, tests, and patterns.
- Check current behavior and contracts.
- Identify the smallest valid change surface.

Do not edit based only on the task description.

### 3. PLAN

Create a concise implementation plan before modifying code.

The plan must identify:

- Files to change.
- Existing abstractions to reuse.
- New abstractions only when required.
- Validation required.
- Risks and compatibility constraints.

Do not expand scope during implementation without justification.

### 4. IMPLEMENT

- Follow Brain, `AGENTS.md`, `CURSOR_CONTEXT.md`, and applicable `.cursor/rules/`.
- Reuse existing patterns.
- Keep changes minimal and reversible.
- Preserve unrelated behavior.
- Keep contracts explicit and typed where applicable.
- Do not add dependencies without a clear requirement.
- Do not modify unrelated files.

### 5. TEST

Run the narrowest relevant checks first, then broader checks when required.

Typical order:

1. Targeted test.
2. Typecheck.
3. Lint/static analysis.
4. Component or integration tests.
5. End-to-end tests when affected.
6. Build when applicable.

For UI changes also validate responsive, keyboard, accessibility, loading, empty, error, disabled, success, and permission states as applicable.

For backend/data changes also validate input boundaries, authorization, contracts, migrations, and data integrity.

### 6. VERIFY

Verify the implementation against:

- Acceptance criteria.
- Relevant Brain documents.
- Applicable architecture and coding rules.
- Security requirements.
- Existing behavior and contracts.
- Actual test/check results.

Never infer a passing result from code inspection alone when execution is required.

### 7. REVIEW

Inspect the final diff before completion.

Check for:

- Unrelated files or changes.
- Accidental API or schema changes.
- Security or privacy issues.
- Accessibility regressions.
- Error and edge-case gaps.
- Duplicated abstractions.
- Unused code or dependencies.
- Documentation drift.
- Secrets or sensitive data.

If defects are found, fix them and repeat validation.

### 8. REPORT

Return a concise factual report:

```text
Status: COMPLETE | PARTIAL | BLOCKED

Task:
- [Task ID and objective]

Changed:
- [files and purpose]

Validation:
- [commands/checks actually run]

Result:
- [pass/fail and relevant findings]

Remaining:
- None / [explicit limitations]
```

Never report a command, test, review, or verification as completed unless it actually happened.

## Failure Handling

If validation fails:

```text
FAIL
→ IDENTIFY ROOT CAUSE
→ FIX
→ RE-RUN VALIDATION
→ REVIEW DIFF
```

Do not hide failures or weaken checks solely to obtain a passing result.

If blocked by missing information or infrastructure, report the exact blocker and stop the affected work.

## Scope Rules

Agents must not:

- Perform opportunistic refactors.
- Rewrite unrelated code.
- Introduce speculative architecture.
- Change public behavior outside the task.
- Make destructive production changes without explicit authorization.
- Ignore higher-priority project rules.

## Source-of-Truth Order

When instructions conflict, use:

1. Explicit approved task requirements.
2. `AGENTS.md`.
3. `CURSOR_CONTEXT.md`.
4. Relevant Brain documents.
5. Repository configuration and existing architecture.
6. Existing implementation patterns.
7. AI inference.

AI inference must never silently override authoritative project context.

## Cross References

- `../AGENTS.md`
- `../CURSOR_CONTEXT.md`
- `09-ai-rules.md`
- `12-baroj-brain.md`
- `15-agents.md`
- `../.cursor/rules/`
- `../prompts/`

## Version

**Version:** Production V1  
**Status:** Active  
**Owner:** Baroj Core Team  
**Last Updated:** 2026-08-21

# 14 — Prompts

## Purpose

Define the standard task-prompt protocol for Baroj AI coding agents, with Cursor as the primary workflow target.

The goal is predictable execution, minimal ambiguity, controlled scope, and verifiable results.

## Principles

1. Context before code.
2. Inspect before editing.
3. Task scope must be explicit.
4. Brain rules must be applied selectively and consistently.
5. AI must verify its own work.
6. Never guess on high-impact ambiguity.
7. Prompts should be reusable and concise.

## Standard Task Prompt

Use this structure for non-trivial development tasks:

```text
BAROJ TASK

Task ID:
<stable ID>

Objective:
<exact outcome>

Context:
<why this task exists>

Relevant Brain:
- <document>
- <document>

Scope:
- <included>

Non-goals:
- <excluded>

Constraints:
- Follow existing architecture.
- Reuse existing patterns.
- Do not modify unrelated files.
- Do not add dependencies without justification.

Acceptance Criteria:
- [ ] <criterion>
- [ ] <criterion>

Validation:
- Typecheck
- Lint
- Relevant tests
- Build when applicable
- Review final diff

Execution:
1. Inspect
2. Plan
3. Implement
4. Validate
5. Review
6. Report
```

## Context Selection

Do not attach the entire Brain to every task.

Select the smallest relevant context set.

### UI Task

Typically:

- `01-brand.md`
- `02-design-system.md`
- `03-user-psychology.md`
- `04-ux-rules.md`
- `08-components.md`

### Engineering Task

Typically:

- `05-folder-structure.md`
- `06-coding-rules.md`
- `07-tech-stack.md`
- `08-components.md`

### AI Task

Typically:

- `09-ai-rules.md`
- `12-baroj-brain.md`
- `13-memory.md`
- `14-prompts.md`

### Product / Feature Task

Typically:

- `00-product.md`
- `10-features.md`
- `11-roadmap.md`

Always add task-specific documents when required.

## Prompt Rules

A good Baroj prompt should make these explicit:

- Desired outcome
- Scope
- Constraints
- Relevant context
- Acceptance criteria
- Validation

Avoid vague instructions such as:

```text
Make this better.
Fix everything.
Build it professionally.
Use your best judgment.
```

## Ambiguity Protocol

AI should resolve ambiguity from the repository and Brain when the answer is low-risk and evident.

AI must stop and ask for clarification when uncertainty could materially affect:

- Architecture
- Security
- Authorization
- Data integrity
- Financial behavior
- Public APIs
- Destructive actions
- User trust

Never manufacture requirements to avoid asking a necessary question.

## Execution Protocol

Every non-trivial prompt follows:

```text
UNDERSTAND
→ INSPECT
→ PLAN
→ IMPLEMENT
→ VALIDATE
→ REVIEW
→ REPORT
```

The agent should not declare completion before validation.

## Output Protocol

After execution, return only useful operational information:

```text
Status: Complete / Blocked / Partial

Summary:
- ...

Files Changed:
- ...

Validation:
- ...

Issues:
- None / ...
```

Do not claim tests were run when they were not run.

## Prompt Evolution

When a recurring task reveals a missing rule:

1. Identify whether the issue is task-specific or project-wide.
2. If project-wide, update the appropriate Brain document or AI rule.
3. Avoid solving a permanent problem only through repeated prompts.

The prompt system should become simpler as the Brain becomes stronger.

## AI Instructions

AI agents must treat prompts as task instructions, not as permission to override higher-level project rules.

When a prompt conflicts with an approved project rule:

1. Identify the conflict.
2. Follow the explicit approved decision unless the task explicitly changes it.
3. Surface material conflicts.
4. Update project documentation when a permanent decision changes.

## Cross References

- `09-ai-rules.md`
- `12-baroj-brain.md`
- `13-memory.md`
- `10-features.md`
- `11-roadmap.md`

## Version

**Version:** Production V1  
**Status:** Active  
**Owner:** Baroj Core Team  
**Last Updated:** 2026-08-16

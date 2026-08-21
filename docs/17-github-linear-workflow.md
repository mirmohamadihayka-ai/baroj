# 17 — GitHub + Linear Workflow

## Purpose

Define the traceable workflow from project planning to AI-assisted implementation, validation, and delivery.

## Principles

- One task has one stable identity.
- Linear tracks intent and delivery state.
- Cursor executes implementation.
- Git tracks code history.
- GitHub is the source of code review and merge history.
- Every completed task must be traceable from requirement to code and validation.
- Never invent task IDs, issue numbers, branches, commits, or PRs.

## Canonical Flow

```text
Linear Task
→ Task ID
→ Branch
→ Cursor Task
→ Inspect
→ Plan
→ Implement
→ Validate
→ Review Diff
→ Commit
→ Pull Request
→ Review
→ Merge
→ Linear Update
```

## Task Identity

Use the Linear task identifier as the canonical task ID when available.

Example:

```text
BAR-123
```

Propagate the identifier consistently to:

- Branch name
- Commit message
- Pull request title/body
- Relevant implementation notes

Do not create a second identifier for the same work.

## Branch Rules

Preferred pattern:

```text
<type>/<task-id>-<short-slug>
```

Examples:

```text
feat/BAR-123-property-search
fix/BAR-124-login-timeout
refactor/BAR-125-api-client
```

Rules:

- Branch from the current approved base branch.
- Keep one focused task per branch.
- Do not mix unrelated work.
- Never commit directly to protected production branches when repository policy requires PRs.

## Cursor Execution

Every task supplied to Cursor should contain:

```text
Task ID:
Objective:
Relevant Brain:
Scope:
Non-Goals:
Constraints:
Acceptance Criteria:
Validation:
```

Cursor must follow the Development Protocol in `16-development-protocol.md`.

## Commit Rules

Commit messages must be factual, scoped, and traceable.

Preferred pattern:

```text
<type>(<scope>): <summary> [<task-id>]
```

Examples:

```text
feat(search): add property filters [BAR-123]
fix(auth): handle expired session [BAR-124]
docs(brain): update architecture rules [BAR-125]
```

Rules:

- Do not claim tests passed if they were not run.
- Do not hide unrelated changes inside a task commit.
- Keep commits logically coherent.
- Do not include secrets or generated credentials.

## Pull Requests

A PR should contain:

```text
Task:
- <task-id>

Objective:
- <what changed and why>

Scope:
- <included changes>

Validation:
- <actual commands/checks>

Risk:
- <known risk or None>

Notes:
- <migration, rollout, or follow-up information>
```

PR rules:

- Keep the PR focused.
- Link the Linear task when supported.
- Explain behavior changes.
- Include relevant screenshots or evidence for UI changes.
- Do not merge with known failing required checks.

## Linear State Synchronization

Linear state should reflect actual delivery state.

Recommended lifecycle:

```text
Backlog
→ Ready
→ In Progress
→ In Review
→ Done
```

Use the repository/PR state as evidence for implementation progress.

Never mark a task Done merely because code was written. The acceptance criteria and required validation must be satisfied.

## AI Agent Rules

AI agents must:

1. Read the task and identify its Task ID.
2. Load only relevant Brain and Cursor rules.
3. Inspect the repository before editing.
4. Preserve the task scope.
5. Validate changes.
6. Review the final diff.
7. Report actual validation results.
8. Keep task, branch, commit, and PR traceable.

Agents must stop instead of guessing when a missing decision can affect architecture, security, data integrity, public contracts, or destructive operations.

## Cross References

- `16-development-protocol.md`
- `15-agents.md`
- `14-prompts.md`
- `../AGENTS.md`
- `../CURSOR_CONTEXT.md`
- `../.cursor/rules/08-git.mdc`

## Version

**Version:** Production V1  
**Status:** Active  
**Owner:** Baroj Core Team  
**Last Updated:** 2026-08-21

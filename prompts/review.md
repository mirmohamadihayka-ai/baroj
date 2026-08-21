# Review Task Prompt

## Task
- Task ID: `REVIEW-XXX`
- Review Target: [branch/commit/PR/files]
- Objective: [what must be verified]
- Relevant Brain: [applicable docs]

## Review Order
1. Correctness and acceptance criteria.
2. Architecture and Brain compliance.
3. Security and authorization.
4. Data integrity and contracts.
5. UX, accessibility, and responsive behavior when applicable.
6. Tests and validation coverage.
7. Scope and unintended changes.
8. Maintainability and documentation drift.

## Rules
- Review the actual diff, not only the task description.
- Prioritize concrete defects over style preferences.
- Do not rewrite code unless requested; report findings clearly.
- Never claim a check was run unless it actually ran.

## Output
```text
Status: PASS / CHANGES REQUIRED / BLOCKED

Critical:
- ...

Important:
- ...

Minor:
- ...

Validation:
- ...

Recommendation:
- ...
```
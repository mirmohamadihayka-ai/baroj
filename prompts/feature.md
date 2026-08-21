# Feature Task Prompt

## Task
- Task ID: `FEAT-XXX`
- Objective: [single measurable outcome]
- Relevant Brain: [list only applicable docs]
- Scope: [in-scope files/features]
- Non-Goals: [explicit exclusions]
- Constraints: [architecture, UX, security, dependencies]

## Acceptance Criteria
- [ ] Behavior works as specified.
- [ ] Existing behavior is preserved unless intentionally changed.
- [ ] Relevant loading, empty, error, success, and permission states are handled.
- [ ] Tests and documentation are updated where required.

## Execution
1. Inspect repository and relevant Brain.
2. Plan the smallest safe change.
3. Implement using existing patterns.
4. Validate with applicable checks.
5. Review the final diff and Brain compliance.
6. Report changed files, validation, and remaining issues.

## Rules
- Do not modify unrelated files.
- Do not invent high-impact requirements.
- Do not add dependencies without justification.
- Never claim a check passed unless it actually ran.
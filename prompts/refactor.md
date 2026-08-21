# Refactor Task Prompt

## Task
- Task ID: `REFACTOR-XXX`
- Objective: [structural improvement]
- Current Problem: [why refactor is needed]
- Target Outcome: [measurable result]
- Relevant Brain: [applicable docs]
- Scope: [allowed files/modules]

## Execution
1. Inspect current behavior and dependencies.
2. Identify reusable existing abstractions.
3. Define invariants that must remain unchanged.
4. Refactor incrementally.
5. Run relevant tests and checks.
6. Review the diff for scope and behavior changes.

## Rules
- No behavior change unless explicitly required.
- No speculative architecture.
- No unrelated cleanup.
- Preserve public contracts.
- Prefer smaller reversible changes.

## Acceptance Criteria
- [ ] Intended structure is improved.
- [ ] Existing behavior remains intact.
- [ ] Tests remain valid or are updated.
- [ ] No unrelated files are changed.
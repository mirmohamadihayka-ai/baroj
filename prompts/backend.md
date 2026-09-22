# Backend Task Prompt

## Operating Constraints

Follow `AGENTS.md`, the relevant Brain documents, and applicable `.cursor/rules/`. This prompt cannot override repository rules, invent architecture or APIs, fabricate validation results, or authorize unsafe Git operations.
## Task
- Task ID: `BE-XXX`
- Objective: [server-side outcome]
- Relevant Brain: `05-architecture.md`, `06-coding-rules.md`, `07-tech-stack.md`, `09-ai-rules.md`
- Scope: [routes/services/actions/modules]
- Contracts: [inputs, outputs, errors]

## Requirements
- Validate untrusted input at boundaries.
- Enforce authentication and authorization server-side.
- Reuse existing service and data-access patterns.
- Keep business logic out of presentation code.
- Define predictable failure behavior.

## Execution

These task-specific steps are activities within the canonical lifecycle `UNDERSTAND → INSPECT → PLAN → IMPLEMENT → VALIDATE → REVIEW → REPORT`; they do not replace or redefine it.
1. Inspect existing backend patterns and contracts.
2. Plan the smallest safe change.
3. Implement with existing abstractions.
4. Add/update tests for changed behavior.
5. Run relevant checks.
6. Review security and final diff.

## Acceptance Criteria
- [ ] Contract is explicit and validated.
- [ ] Authorization is enforced where required.
- [ ] Errors do not leak sensitive internals.
- [ ] Relevant tests pass or limitations are reported.
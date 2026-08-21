# Database Task Prompt

## Task
- Task ID: `DB-XXX`
- Objective: [data outcome]
- Relevant Brain: `05-architecture.md`, `07-tech-stack.md`
- Scope: [schema/tables/migrations/queries]
- Data Risk: [none/low/high]

## Requirements
- Inspect current schema and migration history first.
- Preserve constraints, indexes, relationships, and authorization boundaries.
- Prefer additive and reversible migrations.
- Never perform destructive production data changes without explicit authorization and a safe plan.
- Update affected types, tests, and documentation.

## Execution
1. Inspect schema and existing migrations.
2. Identify compatibility and data-integrity risks.
3. Plan migration and rollback strategy where applicable.
4. Implement.
5. Validate schema, queries, authorization, and tests.
6. Review the final diff.

## Acceptance Criteria
- [ ] Data integrity is preserved.
- [ ] Migration is safe and scoped.
- [ ] Affected contracts are synchronized.
- [ ] Validation results are reported accurately.
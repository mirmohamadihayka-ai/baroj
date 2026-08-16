# 13 — Memory

## Purpose

Define what project memory Baroj preserves, where it belongs, and how humans and AI agents must use it safely.

Memory exists to preserve durable context, not to become a dumping ground for temporary conversation details.

## Principles

1. Store decisions, not noise.
2. Preserve rationale when it affects future implementation.
3. Keep memory concise and searchable.
4. Never store secrets or sensitive personal data.
5. Prefer durable project artifacts over hidden assumptions.
6. Every important memory item must have clear ownership and scope.

## Memory Categories

### Architecture Decisions

Store:

- Major technology choices
- System boundaries
- Data ownership decisions
- Integration decisions
- Trade-offs that future developers may otherwise repeat

### Product Decisions

Store:

- Stable product behavior
- Important constraints
- Confirmed user outcomes
- Explicit non-goals

### UX Decisions

Store:

- Reusable interaction decisions
- Accessibility requirements
- Important trust or usability constraints

### AI Decisions

Store:

- Agent behavior rules
- Prompting protocols
- Model/provider constraints
- Safety or validation requirements

## Where Memory Belongs

Use the most authoritative artifact for each memory type:

```text
Project-wide rule       → Brain document / AGENTS.md
Architecture decision   → architecture documentation
Feature requirement     → feature specification
Delivery status         → roadmap / Linear
Implementation detail   → code and tests
Reusable AI protocol    → AI rules / prompts
Historical rationale    → decision record when needed
```

Do not duplicate the same decision across many files unless the duplication is intentional and synchronized.

## Memory Entry Contract

A durable decision should contain, when useful:

- Date
- Decision
- Context
- Rationale
- Consequences
- Status

Example:

```text
Decision: <decision>
Status: Accepted
Context: <why this was needed>
Rationale: <why this option was selected>
Consequences: <important effects>
```

## Memory Lifecycle

```text
CAPTURE
→ VALIDATE
→ CLASSIFY
→ STORE
→ USE
→ REVIEW
→ ARCHIVE / REPLACE
```

Memory becomes obsolete when a newer approved decision replaces it. Do not delete historical rationale when it is necessary to understand why the change occurred.

## AI Memory Rules

AI agents must:

- Read relevant persistent context before making non-trivial changes.
- Prefer explicit stored decisions over inference.
- Never fabricate historical decisions.
- Never claim a decision exists unless it can be located in project artifacts.
- Surface contradictions between memory and implementation.
- Avoid writing transient chat content into permanent project memory.

## Privacy and Security

Never store in project memory:

- Passwords
- API keys
- Access tokens
- Private credentials
- Secrets
- Unnecessary personal data
- Sensitive user information

Use secure secret-management systems for secrets, not Markdown files or AI memory.

## Staleness Rules

A memory item should be reviewed when:

- Its referenced technology changes.
- Its implementation is removed.
- A new project-wide decision supersedes it.
- It repeatedly conflicts with repository behavior.

Do not preserve stale rules as active instructions.

## Cross References

- `09-ai-rules.md`
- `12-baroj-brain.md`
- `14-prompts.md`
- `05-architecture.md`
- `11-roadmap.md`

## Version

**Version:** Production V1  
**Status:** Active  
**Owner:** Baroj Core Team  
**Last Updated:** 2026-08-16

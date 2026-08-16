# 12 — Baroj Brain

## Purpose

Define the operating model for Baroj's project knowledge base and its use by humans and AI coding agents.

The Brain is persistent project context. It reduces ambiguity, preserves decisions, and keeps implementation aligned across time and contributors.

## Principles

1. Brain before assumptions.
2. One clear source of truth for each decision.
3. Context should be relevant, not maximal.
4. Documentation must reflect intentional project decisions.
5. Repository configuration and code remain implementation evidence.
6. Conflicts must be surfaced, not silently hidden.
7. AI must use the Brain to understand intent before changing code.

## Brain Layers

```text
Product
  ↓
Brand / UX
  ↓
Architecture / Development
  ↓
Features / Roadmap
  ↓
AI / Memory / Prompts
```

The numbered documents are organized by responsibility. An AI agent should read only the documents relevant to the current task, plus mandatory global instructions.

## Source-of-Truth Model

Use this priority for implementation decisions:

1. Explicit approved task requirements
2. `AGENTS.md`
3. `CURSOR_CONTEXT.md`
4. Relevant Brain document
5. Repository configuration and architecture
6. Existing code patterns
7. AI inference

A lower-priority source must not silently override a higher-priority source.

## Document Ownership

| Document | Responsibility |
|---|---|
| `00-product.md` | Product identity, goals, and boundaries |
| `01-brand.md` | Brand identity and communication |
| `02-design-system.md` | Visual and component design standards |
| `03-user-psychology.md` | User behavior and trust principles |
| `04-ux-rules.md` | Interaction and UX rules |
| `05-folder-structure.md` | Repository organization |
| `06-coding-rules.md` | Engineering rules |
| `07-tech-stack.md` | Technology decisions |
| `08-components.md` | Component architecture |
| `09-ai-rules.md` | AI agent behavior |
| `10-features.md` | Feature specification |
| `11-roadmap.md` | Delivery planning |
| `12-baroj-brain.md` | Brain operating model |
| `13-memory.md` | Persistent decision/context memory |
| `14-prompts.md` | Prompt and task protocol |

## Update Rules

Update Brain documentation when:

- A project-wide decision changes.
- Architecture changes materially.
- A new permanent rule is introduced.
- A feature establishes a reusable product pattern.
- AI behavior requirements change.

Do not update Brain files for temporary implementation details that have no lasting project impact.

## Conflict Protocol

When Brain and repository implementation disagree:

1. Identify the exact conflict.
2. Determine whether the repository contains evidence of an intentional newer decision.
3. Do not silently rewrite working code or documentation.
4. Apply the explicit approved decision.
5. Synchronize the Brain after the decision is confirmed.

## AI Instructions

Before a non-trivial task:

1. Read `AGENTS.md` if present.
2. Read `CURSOR_CONTEXT.md` if present.
3. Identify the minimum relevant Brain documents.
4. Inspect the current implementation.
5. Follow existing patterns unless they conflict with an approved decision.

AI agents must not treat every Brain statement as permission to make unrelated changes.

## Documentation Quality Gate

A Brain update must be:

- Specific
- Actionable
- Consistent with other Brain documents
- Free of duplicate ownership
- Clear about scope
- Useful to AI agents
- Versioned

Avoid generic advice that does not change implementation behavior.

## Cross References

- `AGENTS.md`
- `CURSOR_CONTEXT.md`
- `09-ai-rules.md`
- `13-memory.md`
- `14-prompts.md`

## Version

**Version:** Production V1  
**Status:** Active  
**Owner:** Baroj Core Team  
**Last Updated:** 2026-08-16

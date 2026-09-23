# Baroj — Cursor Context

## Purpose

Provide Cursor and other AI coding agents with a compact, high-signal snapshot of the Baroj project.

This file is a navigation layer, not a replacement for the Brain. Detailed decisions remain in `docs/`.

## Project Identity

- **Name:** Baroj
- **Category:** AI-powered real-estate platform
- **Positioning:** A trusted, AI-first operating layer for real-estate discovery, decision support, communication, and operations.
- **Primary users:** Buyers, sellers, real-estate agents, agencies, administrators.
- **Core principles:** Trust, correctness, user control, clarity, accessibility, performance, maintainability.

## Product Boundaries

Core areas:

- Property discovery
- Search and filtering
- AI-assisted search and decision support
- AI assistant experiences
- CRM and operational workflows
- Analytics and decision support
- Trust, verification, and transparency

Do not invent new core product scope from absence of documentation.

## Brain

`docs/` is the project knowledge base and source of truth for durable decisions.

Current Brain documents:

```text
docs/
├── 00-product.md
├── 01-brand.md
├── 02-design-system.md
├── 03-user-psychology.md
├── 04-ux-rules.md
├── 05-architecture.md
├── 05-folder-structure.md
├── 06-coding-rules.md
├── 06-frontend.md
├── 07-tech-stack.md
├── 08-components.md
├── 09-ai-rules.md
├── 10-features.md
├── 11-roadmap.md
├── 12-baroj-brain.md
├── 13-memory.md
├── 14-prompts.md
├── 15-agents.md
├── 16-development-protocol.md
├── 17-github-linear-workflow.md
├── 18-ai-safety-quality.md
├── 19-backend-data-implementation-plan.md
├── 20-property-listings-search-read-model.md
├── 21-property-search-application-contract.md
├── 22-property-search-repository-contract.md
├── 23-persistence-data-source-decision.md
├── 24-property-search-postgresql-read-model.md
├── 25-data-access-layer-decision.md
└── 26-mai-36-postgresql-infrastructure.md
```

## Context Routing

Use the smallest relevant set:

### Product / Feature

- `docs/00-product.md`
- `docs/10-features.md`
- `docs/11-roadmap.md`

### Brand / UX / UI

- `docs/01-brand.md`
- `docs/02-design-system.md`
- `docs/03-user-psychology.md`
- `docs/04-ux-rules.md`
- `docs/08-components.md`

### Architecture / Engineering

- `docs/05-architecture.md`
- `docs/05-folder-structure.md`
- `docs/06-frontend.md`
- `docs/06-coding-rules.md`
- `docs/07-tech-stack.md`
- `docs/08-components.md`
- `docs/19-backend-data-implementation-plan.md`
- `docs/20-property-listings-search-read-model.md`
- `docs/21-property-search-application-contract.md`

### AI / Agent Work

- `docs/09-ai-rules.md`
- `docs/12-baroj-brain.md`
- `docs/13-memory.md`
- `docs/14-prompts.md`
- `docs/15-agents.md`
- `docs/16-development-protocol.md`
- `docs/17-github-linear-workflow.md`
- `docs/18-ai-safety-quality.md`

## Technology Direction

Use repository configuration and lockfiles as the exact implementation source of truth.

Approved technology direction includes:

- TypeScript with strict mode
- Next.js App Router
- React
- Tailwind CSS and project design tokens
- shadcn/ui where appropriate
- Zod at untrusted boundaries
- Repository-established data access layer when configured
- Vitest / React Testing Library / Playwright when configured
- Vercel when configured
- Sentry when configured
- PostHog when configured and privacy-approved

**PostgreSQL is approved by MAI-33. Drizzle ORM + node-postgres (`pg`) + Drizzle Kit are approved by MAI-35. Hosting/provider and remaining persistence decisions stay separately scoped.**

Do not invent package versions or upgrade dependencies during unrelated tasks.

## Repository Structure

Canonical structure is defined by `docs/05-folder-structure.md`.

Important AI/configuration locations:

```text
/
├── AGENTS.md
├── CURSOR_CONTEXT.md
├── docs/
├── .cursor/
├── .github/
└── application source directories defined by the repository
```

The actual repository tree always takes precedence over an example structure in documentation.

## Agent Workflow

Every non-trivial task:

```text
UNDERSTAND
→ INSPECT
→ PLAN
→ IMPLEMENT
→ VALIDATE
→ REVIEW
→ REPORT
```

Before editing:

1. Read `AGENTS.md`.
2. Select relevant Brain documents.
3. Inspect existing code and configuration.
4. Search for existing patterns.
5. Define scope and acceptance criteria.

## Source-of-Truth Priority

1. Higher-priority platform/system instructions
2. Explicit approved task requirements
3. `AGENTS.md`
4. `CURSOR_CONTEXT.md`
5. Relevant Brain document
6. Repository configuration and implementation
7. Existing local patterns
8. AI inference

Material conflicts must be surfaced rather than silently resolved by guesswork.

## Non-Negotiable AI Behavior

- Inspect before editing.
- Reuse before creating.
- Keep changes minimal and scoped.
- Never invent high-impact requirements.
- Never expose or commit secrets.
- Validate generated data before treating it as trusted.
- Do not claim tests or checks that were not actually run.
- Review the final diff.
- Update durable project documentation when a project-wide decision changes.

## Current Property Search Backend Slice

The Property Search application use case is implemented under `features/property-search/application/` and depends on an injectable repository/search contract. It maps validated criteria to success, empty, or safe failure results. PostgreSQL is approved as the persistence engine; MAI-35 approves Drizzle ORM + node-postgres (`pg`) + Drizzle Kit. No provider, ranking, pagination, or non-trivial search semantics are approved.

## Current AI Development Layer

The active AI execution layer is:

- `AGENTS.md` — root execution contract
- `CURSOR_CONTEXT.md` — compact project context
- `.cursor/rules/` — executable Cursor rules
- `docs/15-agents.md` — detailed agent protocol reference
- `docs/16-development-protocol.md` — task execution lifecycle
- `docs/17-github-linear-workflow.md` — delivery traceability
- `docs/18-ai-safety-quality.md` — safety and quality gates
- `docs/19-backend-data-implementation-plan.md` — backend/data implementation sequence and decision gates
- `docs/20-property-listings-search-read-model.md` — search read-model ownership and minimum result concepts
- `docs/21-property-search-application-contract.md` — application input/result contract and use-case boundary
- `docs/22-property-search-repository-contract.md` — repository/search contract and infrastructure boundary
- `docs/23-persistence-data-source-decision.md` — PostgreSQL persistence decision
- `docs/24-property-search-postgresql-read-model.md` — minimum PostgreSQL read model
- `docs/25-data-access-layer-decision.md` — MAI-35 data-access decision
- `docs/26-mai-36-postgresql-infrastructure.md` — MAI-36 PostgreSQL Infrastructure implementation and validation gates

## Quick Decision Guide

If unsure where a rule belongs:

- Product decision → `docs/00-product.md`
- Brand decision → `docs/01-brand.md`
- Design token/UI rule → `docs/02-design-system.md`
- UX behavior → `docs/04-ux-rules.md`
- Architecture → `docs/05-architecture.md`
- Engineering rule → `docs/06-coding-rules.md`
- Technology decision → `docs/07-tech-stack.md`
- Backend/data plan → `docs/19-backend-data-implementation-plan.md`
- Search read-model contract → `docs/20-property-listings-search-read-model.md`
- Property Search application contract/use case → `docs/21-property-search-application-contract.md`
- Property Search repository/search contract → `docs/22-property-search-repository-contract.md`
- Persistence engine → `docs/23-persistence-data-source-decision.md`
- PostgreSQL read model → `docs/24-property-search-postgresql-read-model.md`
- Data access / ORM → `docs/25-data-access-layer-decision.md`
- Component rule → `docs/08-components.md`
- AI behavior → `docs/09-ai-rules.md` / `docs/15-agents.md` / `docs/16-development-protocol.md` / `docs/18-ai-safety-quality.md`
- Prompt protocol → `docs/14-prompts.md`
- Persistent decision/memory → `docs/13-memory.md`

## Maintenance

Update this file when the project's stable identity, navigation model, technology direction, repository structure, or AI operating model materially changes.

Keep this file concise. Do not duplicate detailed Brain content here.

## Version

**Version:** Production V1  
**Status:** Active  
**Owner:** Baroj Core Team  
**Last Updated:** 2026-08-26


## MAI-33 Persistence Decision

PostgreSQL is the approved primary relational persistence engine. Keep SQL/database clients behind Infrastructure and the repository contract. ORM/query builder, hosting provider, schema, search engine, and external property source remain unresolved until explicitly approved.


## MAI-34 Property Search Read Model

The minimum PostgreSQL read model is documented in `docs/24-property-search-postgresql-read-model.md`: id, property_type, location, price, and search_text. Keep it as a read projection; do not treat it as canonical Property / Listings data. ORM, migration tooling, and non-trivial query semantics remain unresolved.


## MAI-35 Data Access Decision

Use Drizzle ORM with node-postgres (`pg`) inside Infrastructure. Use Drizzle Kit for versioned migrations. Do not import database clients or ORM types into Application/Domain/Presentation, and do not add another ORM without a new decision.


## MAI-36 PostgreSQL Infrastructure

The PostgreSQL Infrastructure boundary is implemented under `infrastructure/database/`, with a Drizzle schema for `property_search_read_model`, a centralized `pg` connection, and a Property Search repository adapter. Free-text `query` remains intentionally unsupported until its matching semantics are explicitly approved. Migration, lockfile, typecheck/build, and PostgreSQL integration validation remain pending.

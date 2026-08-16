# 05 — Folder Structure

## Purpose

Define the canonical Baroj repository structure so humans and AI coding agents can locate code, documentation, tests, configuration, and assets without guessing.

The repository structure is an implementation contract. New files must follow the nearest applicable pattern.

## Principles

1. Prefer clear ownership over clever organization.
2. Group code by responsibility and domain.
3. Keep framework-specific files at framework boundaries.
4. Keep shared code genuinely reusable.
5. Keep tests close to the code they validate unless the repository establishes a dedicated test tree.
6. Never create duplicate locations for the same responsibility.
7. Do not reorganize unrelated code during a feature task.

## Canonical Structure

```text
baroj/
├── app/                    # Application routes and framework entry points
├── components/             # Shared UI components
│   ├── ui/                 # Primitive/reusable UI components
│   └── ...                 # Domain-aware shared components
├── features/               # Feature/domain modules
├── lib/                    # Framework-agnostic utilities and integrations
├── hooks/                  # Shared React hooks
├── types/                  # Shared TypeScript types
├── config/                 # Application configuration
├── public/                 # Public static assets
├── tests/                  # Cross-feature and E2E support when needed
├── docs/                   # Baroj Brain and project documentation
├── .cursor/                # Cursor-specific rules and project AI configuration
├── .github/                # GitHub workflows and repository automation
├── scripts/                # Development/build/maintenance scripts
├── prisma/                 # Database schema and migrations when Prisma is used
├── package.json
├── tsconfig.json
├── README.md
└── AGENTS.md
```

The actual repository may evolve. Existing structure takes precedence over this example when the implementation has an intentional, documented pattern.

## Domain Organization

Feature code should be colocated when practical:

```text
features/
└── property-search/
    ├── components/
    ├── hooks/
    ├── services/
    ├── schemas/
    ├── types.ts
    └── index.ts
```

Use domain folders when a feature contains multiple related responsibilities. Do not create deep nesting for small features.

## Naming

- Directories: lowercase kebab-case.
- React components: PascalCase files when the project convention uses component files.
- Hooks: `use*.ts` / `use*.tsx`.
- Tests: follow the existing test convention.
- Schemas: explicit names such as `property.schema.ts`.
- Avoid ambiguous names such as `misc`, `helpers2`, `stuff`, or `common-new`.

## Import Boundaries

- Prefer path aliases defined by the project.
- Avoid circular dependencies.
- UI primitives must not depend on feature-specific business logic.
- Shared libraries must not import from higher-level feature modules.
- Domain modules should expose small, intentional public APIs.

## AI Instructions

Before creating a file, the AI agent must:

1. Inspect the repository tree.
2. Search for an existing file serving the same responsibility.
3. Identify the nearest established pattern.
4. Place the file in the smallest appropriate scope.
5. Avoid moving or renaming unrelated files.
6. Update imports and tests when a structural change requires them.

Never invent a new top-level directory when an existing directory has the correct ownership.

## Definition of Done

A structural change is complete only when:

- The file is in the correct ownership boundary.
- Imports resolve without circular dependencies.
- Existing conventions remain intact.
- Tests and documentation are updated when affected.
- No duplicate responsibility was introduced.

## Cross References

- `00-product.md`
- `05-architecture.md`
- `06-coding-rules.md`
- `08-components.md`
- `09-ai-rules.md`

## Version

**Version:** Production V1  
**Status:** Active  
**Owner:** Baroj Core Team  
**Last Updated:** 2026-08-16

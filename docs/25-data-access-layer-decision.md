# 25 — Data Access Layer / ORM Decision

## Decision

Baroj will use **Drizzle ORM** as its application data-access technology for PostgreSQL.

The PostgreSQL driver baseline is **node-postgres (pg)**.

Database migration generation and execution will use **Drizzle Kit** with versioned SQL migrations.

This decision establishes the data-access implementation inside the Infrastructure boundary.

## Decision ID

**MAI-35**

**Status:** Accepted

**Date:** 2026-08-26

## Why Drizzle

- PostgreSQL is already approved by MAI-33.
- The Property Search read model is already defined by MAI-34.
- Baroj uses TypeScript and a Modular Monolith.
- The repository contract keeps persistence details behind Infrastructure.
- Baroj may need PostgreSQL-specific query behavior later.
- Drizzle provides TypeScript schema/query typing while remaining close to PostgreSQL.
- Drizzle supports PostgreSQL through node-postgres.
- Drizzle Kit can generate versioned SQL migrations and apply them separately.
- Drizzle's SQL template supports parameterized values for safe query construction.

## Why Not Prisma for This Decision

Prisma is a valid PostgreSQL/Next.js choice and remains supported.

It is not selected for Baroj's current data-access layer because:

- The current read model is intentionally PostgreSQL-oriented and relatively small.
- Baroj benefits from direct control over SQL shape, indexes, constraints, and read-model projections.
- Drizzle keeps the application representation close to the database contract.
- Prisma currently has an active major-version transition: Prisma ORM 8 is a release candidate while Prisma ORM 7 remains supported.
- The extra runtime/client abstraction is not necessary for Baroj's current persistence boundary.

This is not a statement that Prisma is insecure or unsuitable. It is a scope-specific architecture choice for Baroj.

## Approved Stack

Application Use Case
→ Repository Contract
→ Infrastructure Repository
→ Drizzle ORM
→ node-postgres (pg)
→ PostgreSQL

Migration path:

Approved Data Model
→ Drizzle Schema
→ Drizzle Kit
→ Versioned SQL Migration
→ PostgreSQL

## Ownership

Drizzle, pg, and Drizzle Kit are Infrastructure technologies.

They must not become dependencies of Presentation, UI components, Property Search domain rules, Application contracts, or public API response contracts.

The Application layer continues to depend on repository/search contracts.

Persistence rows are mapped inside Infrastructure to the application-facing PropertySearchItem.

## Security Rules

- Database connections are server-side only.
- DATABASE_URL and all database credentials remain outside source code.
- Browser/client bundles must never import the database client.
- Repository queries must use parameterized query construction.
- Raw SQL is allowed only inside Infrastructure and must remain parameterized.
- Do not concatenate untrusted values into SQL strings.
- Database errors must be translated into safe repository failures.
- SQL statements, credentials, connection strings, and sensitive rows must not be logged by default.
- Database access must occur only after the appropriate application validation and authorization boundaries.
- Database types must never become public API contracts.
- Least-privilege database credentials should be used when deployment infrastructure is established.

## Migration Rules

Production schema changes must use versioned migrations.

Preferred flow:

Change approved
→ Update Infrastructure schema definition
→ Generate SQL migration
→ Review migration
→ Apply migration in controlled environment
→ Validate
→ Production deployment

Do not use direct schema push as the production deployment mechanism.

Do not create a durable migration until the corresponding schema change is explicitly approved.

## Read Model Rules

The MAI-34 property_search_read_model contract remains authoritative for the current Property Search persistence slice.

The ORM does not change ownership:

- Property / Listings remains canonical owner.
- Property Search consumes a read model.
- PostgreSQL stores the approved projection.
- Infrastructure maps persistence rows to application contracts.

Do not expand the read model because the ORM makes additional fields easy to add.

## Query Rules

Current approved mappings remain:

- propertyType → property_type
- location → location
- minPrice → price
- maxPrice → price
- query → search_text only after matching semantics are explicitly approved

Do not introduce ranking, relevance scoring, fuzzy search, trigram indexes, geospatial search, pagination, sorting, or recommendation logic unless separately approved.

## Dependency Rules

Use one data-access stack.

Approved:

- drizzle-orm
- drizzle-kit
- pg
- @types/pg where required for TypeScript

Do not add another ORM/query builder without a new architecture decision.

Do not add a database provider SDK merely because it offers PostgreSQL access.

The hosting/database provider remains a separate decision.

## Runtime Rules

The data-access layer is server-only.

Do not import Infrastructure database modules from client components.

Do not expose database clients through browser-safe module exports.

Keep database initialization centralized so connection lifecycle can be controlled when the deployment/runtime is finalized.

The exact connection pooling configuration remains an infrastructure/deployment decision.

## Testing Requirements

- Application use case tests may use a fake repository.
- Repository mapping/query behavior should have isolated tests.
- Integration tests may use an isolated PostgreSQL environment when configured.
- Migration validation must be performed before production use.
- Typecheck/build must pass after integration.

## Explicit Non-Decisions

MAI-35 does not select:

- PostgreSQL hosting provider.
- Vercel Postgres or any managed database provider.
- Neon, Supabase, Railway, AWS RDS, or another provider.
- Database connection pooling service.
- Production credentials or roles.
- Canonical Property / Listings schema.
- External property-data provider.
- Search engine.
- Ranking algorithm.
- Cache.
- Queue/event infrastructure.
- Authentication provider.
- API transport strategy.

## Implementation Gate

- [x] PostgreSQL approved by MAI-33.
- [x] Minimum Property Search read model approved by MAI-34.
- [x] Repository contract exists.
- [x] Drizzle ORM selected.
- [x] node-postgres selected as the initial PostgreSQL driver.
- [x] Drizzle Kit selected for versioned migrations.
- [ ] Dependencies installed and lockfile generated using the repository package manager.
- [ ] Infrastructure database module implemented.
- [ ] Property Search PostgreSQL repository implemented.
- [ ] Migration tooling configured.
- [ ] First durable migration reviewed before application.
- [ ] Query semantics for free-text search explicitly approved.

## Next Step

**MAI-36 — Implement the minimal PostgreSQL Infrastructure boundary and Property Search repository using the approved contracts.**

MAI-36 must not expand the read model or invent unresolved query semantics.

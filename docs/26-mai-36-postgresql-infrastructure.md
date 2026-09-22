# 26 — MAI-36 PostgreSQL Infrastructure Implementation

## Purpose
Implement the smallest PostgreSQL Infrastructure boundary required by the approved MAI-35 data-access decision and the MAI-34 Property Search read-model contract.

## Status
Decision ID: MAI-36
Status: Implementation in progress
Date: 2026-09-22

## Implemented
- Centralized PostgreSQL connection through pg.
- Drizzle database instance inside Infrastructure.
- Drizzle schema for the approved property_search_read_model.
- Property Search PostgreSQL repository adapter.
- Persistence-row → PropertySearchItem mapping inside Infrastructure.
- Drizzle Kit configuration.
- npm scripts for migration generation/application.
- .env.example documenting DATABASE_URL without credentials.

## Dependency Stack
- drizzle-orm 0.45.3
- pg 8.23.0
- drizzle-kit 0.31.10
- @types/pg 8.15.5

Stable releases are intentionally used instead of the current Drizzle release-candidate line.

## Repository Behavior
The repository currently implements only approved baseline filters:
- propertyType → property_type
- location → location
- minPrice → price >=
- maxPrice → price <=

A non-empty query is not silently ignored. It returns a safe repository failure because free-text matching semantics have not yet been approved.

No ranking, fuzzy matching, full-text search, pagination, sorting, geospatial behavior, or recommendation logic is introduced.

## Security
- DATABASE_URL is environment configuration only.
- No credentials are stored in source.
- Database initialization is centralized.
- Persistence rows do not cross the Infrastructure boundary.
- Database failures are translated to repository failures.
- No database contents are logged.

## Migration Gate
No durable migration is committed in MAI-36 yet.

Reason: the current environment does not provide an approved PostgreSQL instance against which the first migration can be generated, reviewed, and validated. The schema definition is prepared, but production migration application remains gated.

## Validation Gate
The repository contains an existing package-lock.json. Package dependencies were added to package.json, but the current execution environment cannot reach the npm registry to regenerate the lockfile or install dependencies.

Therefore:
- Do not claim npm install, typecheck, build, or migration validation passed in this environment.
- The next execution environment must run npm install, regenerate/verify package-lock.json, then run typecheck/build.
- A PostgreSQL-backed integration check must follow before the first durable migration is accepted.

## Explicit Non-Goals
MAI-36 does not decide:
- PostgreSQL hosting/provider
- connection pooling strategy
- production credentials/roles
- canonical Property / Listings schema
- free-text search semantics
- search engine
- ranking
- pagination
- caching
- synchronization/import mechanism
- authentication/authorization
- API transport

## Next Gate
MAI-37 — Migration validation + PostgreSQL integration verification

Only after the dependency installation, lockfile, schema migration, and repository integration are validated should the PostgreSQL persistence slice be considered implementation-complete.
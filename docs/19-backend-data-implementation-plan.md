# 19 — Backend & Data Implementation Plan

## Purpose

Define the implementation plan for Baroj's backend and data layer without prematurely closing unresolved infrastructure decisions.

This document translates the existing architecture and Property Search contracts into an ordered implementation plan for AI agents and developers.

## Source Documents

Implementation planning must respect:

- `docs/05-architecture.md`
- `docs/05-folder-structure.md`
- `docs/06-coding-rules.md`
- `docs/07-tech-stack.md`
- `docs/10-features.md`
- `docs/11-roadmap.md`
- `docs/12-baroj-brain.md`
- `docs/16-development-protocol.md`
- `docs/17-github-linear-workflow.md`
- `docs/18-ai-safety-quality.md`

## Scope

This plan covers the path from the current Property Search frontend foundation to a production-ready backend/data boundary.

### In scope

- Backend application boundary.
- Property Search application use case.
- Domain/data ownership clarification required for implementation.
- Repository/data-access contracts.
- Persistence infrastructure boundary.
- Transport adapter.
- Validation and safe error contracts.
- Test and validation strategy.
- Incremental implementation order.

### Out of scope

- Selecting an ORM.
- Creating a database schema before ownership/read-model fields are approved.
- Selecting an external property-data provider.
- Implementing authentication/authorization before its contract is defined.
- Implementing ranking/recommendation logic.
- Implementing AI search behavior.
- Creating microservices.
- Adding queues/events/caches without a concrete requirement.

## Current State

The repository already has:

- A Property Search UI and interaction foundation.
- Normalized `PropertySearchCriteria` as the intended application input.
- Explicit Property Search result/error categories.
- A Modular Monolith architecture.
- Defined Application, Domain, Infrastructure, and Presentation boundaries.
- Persistence/data ownership principles.
- A Property / Listings boundary that is architecturally defined but not yet implemented as a separate domain module.

The current UI may continue to use local interaction state until the backend contract and canonical read model are implemented.

## Implementation Target

The first backend slice should establish a real application boundary without coupling the feature to a database, ORM, transport framework, or external provider.

Target flow:

```text
Property Search UI
      |
      v
Transport Adapter
      |
      v
Request Validation
      |
      v
Property Search Application Use Case
      |
      v
Property Search / Domain Rules
      |
      v
Repository / Search Contract
      |
      v
Infrastructure Implementation
      |
      v
Data Source
```

The exact Data Source technology remains unresolved by architecture until explicitly selected.

## Implementation Order

### Step 1 — Backend contract freeze

Define the application-facing Property Search contract:

- Input: normalized `PropertySearchCriteria`.
- Output: stable application result.
- Failure categories:
  - invalid criteria
  - empty result
  - temporary/unavailable dependency
  - unexpected application failure
- No UI state in the contract.
- No ORM/database types in the contract.
- No provider-specific types in the contract.

**Gate:** Do not proceed if the contract requires speculative property/listing fields that are not yet owned or defined.

### Step 2 — Property / Listings read-model decision

Define the minimum canonical data needed by Property Search to return a real result.

Document:

- ownership of canonical property/listing data
- ownership of the search read model
- minimum result shape
- relationship between canonical data and search projection/read model
- freshness expectations when known

Do not invent a full property schema.

**Gate:** Search result implementation cannot proceed until the minimum read-model contract is explicit.

### Step 3 — Application use case

Implement the Property Search application use case behind the approved contract.

Responsibilities:

- accept normalized criteria
- apply application-level authorization when required
- invoke domain/search rules
- call repository/search contracts
- map known failures to the application error contract
- return a stable application result

It must not:

- access the database directly
- import ORM types
- call an external provider directly
- contain UI state
- contain transport parsing

### Step 4 — Repository / data contract

Introduce the smallest repository/data-access contract required by the use case.

The contract should express business/application needs rather than persistence mechanics.

Avoid leaking:

- ORM query builders
- database-specific records
- transport objects
- provider SDK types

### Step 5 — Infrastructure adapter

Implement the repository/data contract in Infrastructure only after the data source and persistence approach are explicitly approved.

Infrastructure owns:

- connection/configuration
- persistence queries
- mapping persistence models to application/domain contracts
- technical failure translation

Do not make infrastructure the owner of business rules.

### Step 6 — Transport adapter

Expose the application use case through the repository's established API/transport pattern.

Transport owns:

- request parsing
- boundary validation
- authorization context propagation
- application invocation
- response mapping
- safe error mapping

The transport must not contain domain logic or persistence queries.

### Step 7 — Validation and tests

Minimum validation for the first production backend slice:

- Typecheck.
- Lint.
- Unit tests for criteria validation/normalization.
- Unit tests for application result/error mapping.
- Tests for repository contract behavior where configured.
- Transport contract tests where configured.
- Regression tests for existing Property Search UI states.
- Build.

Do not claim test coverage that has not been configured or executed.

## Data Rules

### Canonical Data

Canonical property/listing data belongs to the future Property / Listings domain boundary.

Property Search must consume it through explicit contracts rather than becoming its owner.

### Read Models

A search read model may be introduced when needed for search behavior.

It must:

- have explicit ownership
- have a documented source
- expose only the fields required by search
- avoid becoming a second canonical property model

### Persistence Models

Persistence-specific representations must remain in Infrastructure unless a documented architecture decision establishes another ownership.

Do not expose database rows directly to Presentation.

## Security Rules

Every backend entry point must treat browser/external input as untrusted.

Required sequence:

```text
Input
  -> Validation
  -> Authorization
  -> Application
  -> Domain Rules
  -> Infrastructure
```

Never rely on client-side validation for authorization or data integrity.

Error responses must not expose:

- stack traces
- database internals
- provider credentials
- secrets
- internal infrastructure details

## Dependency Rules

Allowed direction:

```text
Presentation
    -> Application
    -> Domain

Infrastructure
    -> implements higher-level contracts
```

Forbidden shortcuts:

- UI -> database
- UI -> ORM
- UI -> external property provider
- Domain -> ORM
- Domain -> provider SDK
- Application -> provider-specific implementation when an owned contract is appropriate
- Transport -> persistence implementation

## Definition of Done

The first backend/data implementation slice is complete only when:

- The application contract is explicit.
- The minimum Property / Listings read model is documented.
- The use case is implemented behind a stable contract.
- Data access is behind an explicit contract.
- Infrastructure details do not leak upward.
- Transport is an adapter.
- Safe errors are mapped.
- Relevant tests/checks pass.
- No speculative schema/provider/ORM decision was introduced.
- Existing Property Search UI behavior remains intact.
- Documentation and implementation are synchronized.

## Decision Gates

The following decisions remain open until explicitly approved:

1. Exact persistence provider/data-access implementation.
2. Exact database schema.
3. Property / Listings canonical model.
4. Property Search read model.
5. Transport implementation.
6. Authentication/authorization contract.
7. External property-data sources.
8. Search query/ranking implementation.

An AI agent must stop before crossing a decision gate when the missing decision materially affects architecture, data integrity, security, or public contracts.

## Work Breakdown

Recommended implementation sequence:

```text
Backend contract
    ->
Property / Listings read-model decision
    ->
Application use case
    ->
Repository/data contract
    ->
Approved persistence implementation
    ->
Transport adapter
    ->
Validation/tests
    ->
Production readiness review
```

No step authorizes implementation of a later unresolved decision.

## Traceability

Related Linear work:

- MAI-11 — Define backend application and API boundaries
- MAI-12 — Define persistence and data ownership model
- MAI-10 — Productionize Property Search domain foundation

These work items provide planning traceability; their presence does not authorize implementation beyond the approved scope.

## Version

**Version:** Production V1  
**Status:** Active  
**Owner:** Baroj Core Team  
**Last Updated:** 2026-08-23


## MAI-36 Status

MAI-36 PostgreSQL Infrastructure implementation is in place: centralized database client, Drizzle read-model schema, Property Search PostgreSQL repository, and Drizzle Kit configuration. The remaining gates are npm dependency/lockfile validation, typecheck/build, PostgreSQL integration validation, and the first reviewed durable migration.

## Next Gate

**MAI-37 — Migration validation + PostgreSQL integration verification.**

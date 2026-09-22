# 22 — Property Search Repository / Search Contract

## Purpose

Define the smallest repository/search contract required by the Property Search application use case.

This document establishes the contract boundary only. PostgreSQL is approved as the persistence engine by MAI-33; ORM, schema, search engine, external provider, and concrete persistence implementation remain open.

## Source Documents

- `docs/05-architecture.md`
- `docs/19-backend-data-implementation-plan.md`
- `docs/20-property-listings-search-read-model.md`
- `docs/21-property-search-application-contract.md`
- `features/property-search/types.ts`

## Boundary

The repository/search contract belongs to the application-facing boundary and is implemented by Infrastructure.

```text
Property Search Application Use Case
                |
                v
     Repository / Search Contract
                |
                v
      Infrastructure Adapter
                |
                v
        Approved Data Source
```

The contract expresses what the application needs from search. It must not describe how the data source performs the search.

## Responsibility

The contract is responsible for:

- Accepting search criteria required by the Property Search use case.
- Returning search-facing result items based on the approved read model.
- Distinguishing no matches from technical failure.
- Providing enough structured information for the application layer to map results safely.

It is not responsible for:

- HTTP or transport parsing.
- UI state.
- Authorization policy.
- ORM queries.
- Database connections.
- Provider SDK calls.
- Search-engine-specific syntax.
- Ranking policy that has not been approved.
- AI behavior.
- Persistence lifecycle of Property / Listings.

## Input

The contract consumes the application-facing search criteria.

Current conceptual input:

```text
query
location
propertyType
minPrice
maxPrice
```

The current UI type remains the source representation:

```ts
PropertySearchCriteria
```

The contract must not require transport request objects.

Price parsing/normalization may occur before repository invocation according to the approved application validation flow. The repository must not silently reinterpret invalid input.

## Result Item Contract

The repository returns search-facing items containing only the minimum read-model concepts:

```text
PropertySearchItem
  id
  propertyType
  location
  price
```

These are conceptual fields, not an approved database schema.

The exact TypeScript representation of:

- identity
- property type
- location
- price
- currency

remains open until the corresponding implementation decisions are approved.

## Result Semantics

The repository contract must preserve the distinction between:

### Success with matches

A collection of one or more search items is returned.

### Success with no matches

An empty collection is a valid result.

No-match must not be represented as a technical exception.

### Dependency failure

Technical/data-source failures must be represented through an owned repository-level failure contract that the application layer can map to `dependency_unavailable`.

Raw database/provider/SDK errors must not be exposed as the application result.

## Conceptual Contract

The contract can be represented conceptually as:

```text
search(criteria)
    -> SearchResult
```

Where:

```text
SearchResult
  - items[]
  - failure?   // owned repository/search failure when dependency fails
```

The exact method signature and discriminated-union TypeScript shape remain an implementation decision.

Do not create a speculative interface solely to select names or types that have not been approved.

## Failure Boundary

The repository/search layer may distinguish technical causes for internal mapping/observability, for example:

- unavailable data source
- timeout
- provider failure
- unexpected technical failure

However, the application boundary remains responsible for mapping these into safe application categories.

```text
Repository Failure
      |
      v
Application Error Mapping
      |
      v
dependency_unavailable | unexpected
```

Internal infrastructure details must not cross the application contract.

## Query Semantics

The contract does not define:

- full-text search
- fuzzy matching
- tokenization
- ranking
- relevance scoring
- geospatial search
- sorting
- pagination
- filtering precedence

These require explicit product/data/search decisions.

The repository must implement only approved semantics when those decisions are made.

## Read Model Ownership

The repository consumes the Property Search read model defined in `docs/20-property-listings-search-read-model.md`.

Canonical ownership remains with Property / Listings.

```text
Property / Listings
      |
      v
Canonical Data
      |
      v
Approved Search Projection / Read Model
      |
      v
Repository / Search Contract
      |
      v
Property Search Application Use Case
```

The repository must not become a second owner of canonical Property / Listings data.

## Infrastructure Rules

Infrastructure implementations may own:

- database access
- ORM/query-builder usage if later approved
- external property provider adapters if later approved
- persistence mapping
- technical error translation

Infrastructure must not:

- define business policy
- expose provider SDK types upward
- expose database records directly
- force a specific transport
- mutate UI state

## Dependency Rules

Allowed:

```text
Application
    |
    v
Owned Repository/Search Contract
    ^
    |
Infrastructure Implementation
```

Forbidden:

- Application → concrete database client
- Application → ORM
- Application → provider SDK
- Presentation → repository implementation
- Presentation → database
- Repository contract → transport framework
- Repository contract → UI components
- Domain → ORM/provider implementation

## Testability

The application use case must be testable against a fake/in-memory implementation of the contract without requiring a real database or external provider.

The repository contract should therefore be:

- deterministic at the application boundary
- small
- dependency-injectable
- independent from runtime/framework APIs

Infrastructure integration tests belong to the infrastructure implementation once one is approved.

## Implementation Gate

Before implementing a concrete repository:

- [ ] Property Search application contract is accepted.
- [ ] Minimum read-model fields are supported.
- [ ] Repository failure can be mapped safely by Application.
- [ ] No database/ORM/provider is selected implicitly.
- [ ] Query semantics are explicitly approved where implementation depends on them.
- [ ] The concrete implementation remains behind the contract.

## Implementation Status

The first application use-case slice is implemented in `features/property-search/application/`.

Implemented:
- normalized criteria validation before repository invocation
- dependency-injected repository contract
- success / empty / failure result mapping
- safe application error mapping
- protection against repository exceptions leaking outward

Still intentionally open: persistence, provider, ranking, pagination, freshness, and exact data-source strategy.

## Definition of Done

The repository/search contract is ready when:

- Its ownership is explicit.
- Its input and conceptual output are documented.
- No persistence/provider details leak into it.
- Empty results are distinct from dependency failure.
- Application-level error mapping is defined.
- The contract can be tested without infrastructure.
- Open decisions remain explicit.

## Open Decisions

1. Exact TypeScript interface and method name.
2. Exact result discriminated union.
3. Identity representation.
4. Price representation and currency.
5. Location representation.
6. Query semantics.
7. Ranking/ordering.
8. Pagination/result limits.
9. Search read-model storage/projection.
10. Approved data source/persistence implementation.

## Traceability

- `docs/19-backend-data-implementation-plan.md`
- `docs/20-property-listings-search-read-model.md`
- `docs/21-property-search-application-contract.md`
- `features/property-search/`

## Version

**Version:** Production V1  
**Status:** Active — application slice implemented  
**Owner:** Baroj Core Team  
**Last Updated:** 2026-08-25

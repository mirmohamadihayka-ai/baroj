# 21 — Property Search Application Contract

## Purpose

Define the stable application-facing contract and use-case boundary for Property Search.

This document is the bridge between the existing normalized Property Search criteria/read-model decisions and the future implementation of a real backend use case.

It does not select a database, ORM, transport framework, external property-data provider, ranking strategy, or authentication implementation.

## Source Documents

Implementation must respect:

- `docs/05-architecture.md`
- `docs/10-features.md`
- `docs/19-backend-data-implementation-plan.md`
- `docs/20-property-listings-search-read-model.md`
- `docs/06-coding-rules.md`
- `docs/07-tech-stack.md`

## Application Boundary

The Property Search application use case sits between transport/presentation and domain/data contracts.

```text
Property Search UI
      |
      v
Transport / Boundary Validation
      |
      v
Property Search Application Use Case
      |
      v
Search / Domain Rules
      |
      v
Repository / Search Contract
      |
      v
Approved Infrastructure Implementation
```

The application layer coordinates the operation. It does not own persistence mechanics, transport parsing, provider SDKs, or UI state.

## Application Input Contract

The application use case accepts normalized `PropertySearchCriteria`.

Current criteria:

| Field | Meaning |
|---|---|
| `query` | Search text; exact search semantics remain open |
| `location` | Searchable location criterion |
| `propertyType` | Property/listing type criterion |
| `minPrice` | Minimum price criterion |
| `maxPrice` | Maximum price criterion |

The existing UI representation uses strings. The production application contract may normalize validated numeric values at the boundary when that is explicitly implemented, but this document does not silently change the existing TypeScript type.

### Input Rules

- Input must already pass boundary validation/normalization before use-case execution.
- The use case must not trust browser validation as a security boundary.
- Transport-specific request objects must not become the application contract.
- UI-only state such as loading, focus, visual errors, or component state must not enter the application contract.
- The use case must not mutate the caller's criteria object.

## Application Result Contract

The application result must distinguish at minimum:

- `success`
- `empty`
- `failure`

A validation failure is represented as an application failure when invalid input reaches the use-case boundary; transport/boundary validation should normally reject invalid external input earlier.

Conceptually:

```text
PropertySearchApplicationResult
  status
  items[]
    id
    propertyType
    location
    price
  error?   // safe application error for failure
```

The exact TypeScript discriminated-union shape is intentionally left as an implementation decision.

### Success

A successful result contains search-facing items derived from the approved Property / Listings read model.

Required concepts:

- stable identity
- property/listing type
- location
- comparable price representation

No persistence record, ORM entity, provider SDK object, ranking-internal field, or secret may be returned directly.

### Empty

An empty result is a valid application outcome, not an unexpected error.

It contains no matching search items and must remain distinguishable from infrastructure failure.

### Failure

Failures must be safe and machine-readable at the application boundary.

Minimum conceptual categories:

- `invalid_criteria`
- `dependency_unavailable`
- `unexpected`

An internal error may be logged/observed inside approved infrastructure/application observability boundaries, but stack traces, database details, provider credentials, and infrastructure internals must not cross the public/application result boundary.

## Use Case Responsibilities

The Property Search application use case is responsible for:

1. Accepting normalized search criteria.
2. Applying required application-level authorization when an approved auth contract exists.
3. Coordinating approved search/domain rules.
4. Calling the repository/search contract.
5. Mapping known technical/domain failures into the safe application error contract.
6. Returning a stable application result.
7. Preserving the distinction between success, empty, and failure.

The use case is not responsible for:

- HTTP/request parsing.
- UI state.
- Direct database access.
- ORM query construction.
- External provider SDK calls.
- Provider-specific response handling.
- Search-engine-specific query syntax.
- Ranking/recommendation policy not yet approved.
- AI interpretation or AI provider calls.
- Persistence transactions unless required by an explicitly approved application/data contract.

## Repository / Search Contract Boundary

The use case depends on an owned search/data contract rather than a concrete persistence implementation.

Conceptually:

```text
Application Use Case
      |
      v
Property Search Repository / Search Contract
      |
      v
Infrastructure Adapter
      |
      v
Data Source
```

The repository/search contract must express application needs, not persistence mechanics.

It must not expose:

- ORM query builders
- database-specific record types
- provider SDK types
- transport request/response types

The exact method name, pagination model, query semantics, and implementation technology remain open.

## Error Mapping

Technical failures must be translated before they cross the application boundary.

```text
Infrastructure / Domain Failure
        |
        v
Known Application Error Mapping
        |
        v
Safe Application Result
```

Unknown failures must not be exposed with internal details.

The application layer may preserve enough structured information for approved observability, but public error messages must remain safe and useful.

## Relationship to the Read Model

The application result consumes the minimum search-facing projection defined in `docs/20-property-listings-search-read-model.md`.

Canonical ownership remains:

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
Property Search Application Use Case
```

The read model is not a second canonical Property / Listings model.

Property Search must not mutate canonical property/listing state through this read contract.

## Transport Boundary

Transport remains an adapter:

```text
Transport Request
      |
      v
Boundary Validation / Normalization
      |
      v
PropertySearchCriteria
      |
      v
Application Use Case
      |
      v
Application Result
      |
      v
Transport Response
```

No API route, server action, RPC mechanism, or HTTP framework is selected by this document.

## Security Rules

- Treat all external/browser input as untrusted.
- Perform authoritative validation at the server/application boundary.
- Apply authorization according to the approved authentication/authorization contract when one exists.
- Never expose secrets, credentials, stack traces, database internals, or provider internals.
- Do not allow Presentation or Transport to bypass the application boundary.
- Do not introduce authentication behavior without an approved contract.

## Non-Goals

This contract does not define:

- database engine
- ORM
- persistence schema
- canonical Property / Listings schema
- external property provider
- search engine
- ranking algorithm
- pagination limits
- freshness/SLA
- authentication implementation
- AI search behavior
- caching/events/queues
- microservice decomposition

## Implementation Gate

The first real use-case implementation may proceed only when:

- [ ] `PropertySearchCriteria` is accepted as the application input.
- [ ] The minimum search read-model concepts are available.
- [ ] Success, empty, and failure are distinguishable.
- [ ] Safe error categories are mapped.
- [ ] The use case depends on an explicit repository/search contract.
- [ ] No ORM/database/provider type leaks into the application contract.
- [ ] No unresolved architecture decision is silently selected.

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

This contract is implemented when:

- Application input/output contracts are explicit.
- The Property Search use case is independently testable.
- Repository/search dependencies are injectable through owned contracts.
- Known failures map to safe application errors.
- UI state remains outside the application contract.
- Transport remains an adapter.
- Existing Property Search UI behavior remains intact.
- Relevant validation/tests pass.
- Documentation and implementation remain synchronized.

## Open Decisions

1. Exact TypeScript result discriminated union.
2. Exact repository/search contract and method signature.
3. Numeric price representation and currency.
4. Location representation.
5. Free-text query semantics.
6. Pagination/result limits.
7. Ranking/ordering.
8. Freshness/SLA.
9. Authentication/authorization requirements.
10. Approved persistence/data-source implementation.

## Traceability

- `docs/05-architecture.md`
- `docs/10-features.md`
- `docs/19-backend-data-implementation-plan.md`
- `docs/20-property-listings-search-read-model.md`
- `features/property-search/`

## Version

**Version:** Production V1  
**Status:** Active — application slice implemented  
**Owner:** Baroj Core Team  
**Last Updated:** 2026-08-25

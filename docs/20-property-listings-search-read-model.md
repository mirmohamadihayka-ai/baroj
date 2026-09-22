# 20 — Property / Listings Search Read Model

## Purpose

Define the minimum data contract required for Property Search to return real results without creating a speculative full Property / Listings schema.

This document establishes ownership and conceptual boundaries. It does not select a database, ORM, provider, schema technology, or search engine.

## Decision

### Canonical ownership

Canonical property/listing data belongs to the Property / Listings domain boundary.

Property Search does not become the owner of:
- property lifecycle
- listing lifecycle
- canonical property records
- canonical listing records
- persistence models

Property Search consumes search-facing data through an explicit application contract.

### Search read-model ownership

The Property Search / Search & Discovery application boundary may own the search read-model contract and query behavior required to serve search.

The read model is a projection/read representation, not a second canonical property model.

Its source must remain traceable to canonical Property / Listings data or an approved external data source.

## Minimum Search Result Contract

The first production search slice only requires concepts directly necessary to identify and filter a matching property/listing.

### Required concepts

| Concept | Purpose |
|---|---|
| Stable property/listing identity | Identify the returned result |
| Property type | Support the propertyType criterion |
| Location | Support the location criterion |
| Price | Support minPrice / maxPrice criteria |

These are conceptual requirements, not an approved persistence schema.

### Not yet required

The first backend slice does not require defining full property metadata, listing lifecycle, seller/agent profiles, gallery/media, amenities, ranking score, recommendation explanation, AI insights, map geometry, analytics, or messaging/contact data.

Those belong to later contracts when their owning modules are explicitly defined.

## Relationship to PropertySearchCriteria

The current normalized input contains: query, location, propertyType, minPrice, and maxPrice.

| Search criterion | Read-model requirement |
|---|---|
| query | Searchable representation is required; exact indexing/search semantics remain open |
| location | Searchable location representation |
| propertyType | Property/listing type representation |
| minPrice | Comparable numeric price representation |
| maxPrice | Comparable numeric price representation |

The meaning of free-text query is intentionally unresolved beyond requiring a searchable representation. Do not invent ranking, fuzzy matching, full-text search, or AI semantics.

## Result Envelope

The application result must remain separate from persistence records.

Conceptually:

Property Search Application Result
  - status: success | empty | failure
  - items[]
    - stable identity
    - property type
    - location
    - price
  - safe application error when applicable

The exact TypeScript shape, transport shape, persistence schema, and serialization format remain implementation decisions.

## Canonical Data vs Read Model

Property / Listings Domain
        -> canonical data
        -> approved projection / query source
        -> Property Search Read Model
        -> Property Search Application Use Case
        -> Transport / Presentation

Rules:
- The read model must not become the canonical source of property truth.
- Search must not mutate canonical property/listing state through a read-only search contract.
- Persistence-specific fields must not leak into the application result.
- A projection may omit canonical fields that search does not need.
- A projection may denormalize data when an approved implementation requires it, but its source and ownership must remain explicit.

## Freshness

Freshness requirements are not yet defined.

Until a product/data-source decision establishes them:
- Do not promise real-time property availability.
- Do not invent synchronization intervals.
- Do not claim search results are live.
- Do not introduce queues, events, cache invalidation, or background synchronization solely to satisfy this document.

## External Property Data

External property-data providers are not established.

If an external provider is later used, it must remain behind an Infrastructure/provider adapter and must not become the public Property Search contract.

## Implementation Gate

Before implementing a real search repository or result endpoint:
- [ ] Property / Listings owns canonical property/listing data.
- [ ] Search read-model ownership is explicit.
- [ ] The four minimum result concepts are supported.
- [ ] query semantics are explicitly approved before non-trivial ranking/search behavior is added.
- [ ] The application result is independent from persistence records.
- [ ] No database/ORM/provider decision is inferred from this document.

## Open Decisions

1. Exact canonical Property / Listings model.
2. Exact TypeScript/application result types.
3. Exact location representation.
4. Exact price representation and currency requirements.
5. Free-text query semantics and search strategy.
6. Search read-model storage/projection strategy.
7. External property-data source.
8. Freshness/SLA requirements.
9. Ranking and ordering.
10. Pagination and result limits.
11. Authentication/authorization requirements.

## Traceability

Related documents:
- docs/05-architecture.md
- docs/10-features.md
- docs/19-backend-data-implementation-plan.md

Related implementation boundary:
- features/property-search/

## Version

Version: Production V1
Status: Active
Owner: Baroj Core Team
Last Updated: 2026-08-23
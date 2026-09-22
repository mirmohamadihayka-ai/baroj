# 24 — Property Search PostgreSQL Read Model Contract

## Purpose

Define the minimum PostgreSQL persistence contract required to implement the Property Search repository without inventing a full Property / Listings schema.

This is a schema contract, not a migration. It defines the minimum persisted read-model representation and leaves ORM, migration tooling, hosting, search engine, ranking, pagination, and canonical Property / Listings schema open.

## Source of Truth

- docs/05-architecture.md
- docs/20-property-listings-search-read-model.md
- docs/22-property-search-repository-contract.md
- docs/23-persistence-data-source-decision.md

## Ownership

The PostgreSQL representation is a Property Search read model / projection. It is not the canonical owner of Property / Listings.

```text
Property / Listings
        |
        v
Canonical Data / Approved Source
        |
        v
Property Search Read Model
        |
        v
PostgreSQL
        |
        v
Property Search Repository
        |
        v
Application Use Case
```

The exact projection/synchronization mechanism is intentionally open.

## Minimum Relation

The first implementation may use one logical relation: `property_search_read_model`.

### Required fields

| Field | PostgreSQL type | Nullability | Purpose |
|---|---|---|---|
| `id` | `text` | NOT NULL | Stable property/listing identity |
| `property_type` | `text` | NOT NULL | Property/listing type filter |
| `location` | `text` | NOT NULL | Searchable location representation |
| `price` | `numeric` | NOT NULL | Comparable price for min/max filtering |
| `search_text` | `text` | NOT NULL | Searchable representation for the current free-text criterion |

### Identity rule

`id` is the stable identifier exposed as `PropertySearchItem.id`. The exact canonical identity type remains owned by Property / Listings; the read model stores its search-facing representation as text.

### Property type rule

`property_type` stores the search-facing property/listing type. The allowed value set remains a domain decision and must not be invented in the repository.

### Location rule

`location` is the initial search-facing location representation. It is intentionally text-based for the first contract. Structured address, coordinates, geospatial indexing, normalization, and map-provider semantics remain open.

### Price rule

`price` is PostgreSQL `numeric` so price comparison is not implemented with floating-point storage. Exact precision/scale, currency model, and multi-currency behavior remain open decisions.

### Search text rule

`search_text` is the minimum searchable text representation needed to support the existing `query` criterion.

It does not define full-text search, fuzzy matching, tokenization, ranking, relevance scoring, stemming, or language-specific behavior.

## Constraints

The minimum contract requires all five fields to be present and `price` to represent a non-negative comparable value. Exact database constraint/index implementation belongs to Infrastructure and migration tooling.

## Index Contract

No production index strategy is finalized by this document. Do not add full-text, trigram/fuzzy, geospatial, ranking-specific, or speculative composite indexes merely because PostgreSQL supports them.

## Mapping Contract

Persistence rows must be mapped inside Infrastructure:

`property_search_read_model` → `PropertySearchItem`

Application code must receive only `id`, `propertyType`, `location`, and `price`, never the raw database row.

## Repository Boundary

The repository may use this relation to implement `search(criteria)`, but query behavior must remain limited to approved semantics.

Baseline mappings:
- propertyType → property_type
- location → location
- minPrice → price
- maxPrice → price
- query → search_text only after matching semantics are explicitly selected

Do not invent ranking or ordering.

## Canonical Data Synchronization

This contract does not choose how rows arrive in PostgreSQL. No synchronization/import/projection mechanism is approved by this document.

## Security

- PostgreSQL remains server-side.
- Connection credentials remain outside source code.
- Raw persistence errors must not cross the repository boundary.
- Search results must be mapped to the minimum application contract.
- Do not log complete rows when they may contain sensitive property information.

## Non-Goals

- canonical Property / Listings schema
- listing lifecycle
- seller/agent data
- media/gallery
- amenities
- authentication/authorization
- currency conversion
- geospatial behavior
- ranking
- pagination
- freshness/SLA
- ORM/query builder
- migration tooling
- hosting provider
- external property-data provider
- search engine

## Implementation Gate

- [x] PostgreSQL approved by MAI-33.
- [x] Minimum search read-model concepts explicit.
- [x] Application repository contract exists.
- [x] Persistence mapping isolated to Infrastructure.
- [ ] ORM/query builder explicitly selected, or a PostgreSQL client implementation intentionally approved.
- [ ] Migration tooling selected before creating a durable migration.
- [ ] Query semantics for `query` approved before implementing non-trivial text search.

## Status

**Accepted as the minimum PostgreSQL read-model contract.**

**Date:** 2026-08-26

**Decision ID:** MAI-34
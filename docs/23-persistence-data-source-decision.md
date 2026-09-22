# 23 — Persistence / Data Source Decision

## Decision

Baroj will use **PostgreSQL** as the primary relational persistence data source.

This closes only the database-engine decision for the current backend/data foundation.

It does **not** select an ORM/query builder, hosting provider, final schema, migration tool, search engine, external property-data provider, cache, or event infrastructure.

## Why PostgreSQL

The current backend needs a relational source suitable for canonical Property / Listings data, structured property attributes, numeric price filtering, location fields, explicit relationships, and future transactional workflows.

## Architectural Placement

```text
Property Search Application Use Case
            |
            v
Property Search Repository Contract
            |
            v
Infrastructure Data Adapter
            |
            v
PostgreSQL
```

PostgreSQL is an Infrastructure concern. SQL, connection details, database client types, and persistence models must not cross into Presentation, Application, or Domain contracts.

## Data Ownership

PostgreSQL is storage, not a business owner. Property / Listings remains the canonical owner of property/listing data. Property Search owns search-facing application behavior and contracts. A search projection may be stored in PostgreSQL when separately approved.

## Search Read Model

The minimum concepts remain stable identity, property type, location, and price. Exact tables, columns, indexes, query semantics, pagination, ranking, and freshness remain open.

Do not create a speculative full property schema merely because PostgreSQL has been selected.

## Data Access

```text
Application
    |
    v
PropertySearchRepository
    |
    v
Infrastructure PostgreSQL Adapter
    |
    v
PostgreSQL
```

The ORM/query-builder decision remains open and must stay inside Infrastructure when selected.

## Security

- Database credentials remain server-side.
- Connection configuration comes from environment/runtime configuration.
- Browser code must never connect directly to PostgreSQL.
- SQL/database errors must be translated into safe repository failures.
- Sensitive records must not be logged indiscriminately.

## Explicit Non-Decisions

This MAI-33 decision does not authorize production tables, a managed provider such as Supabase, an ORM, canonical Property / Listings schema, ranking, pagination, freshness/SLA, caching, queues, or events.

## Consequence

The next implementation slice may create a PostgreSQL-specific Infrastructure boundary only after the minimum persistence/read-model schema is explicitly defined.

## Status

**Accepted**

**Date:** 2026-08-25

**Decision ID:** MAI-33

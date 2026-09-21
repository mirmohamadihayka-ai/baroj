# Baroj Architecture

## Purpose

This document is the architectural source of truth for Baroj.

It defines the system-level architecture strategy, core principles, layer model, dependency direction, trust boundaries, and rules that AI coding agents and developers must follow before making architectural changes.

Detailed module boundaries are defined separately and must not be invented here.

## Architecture Strategy

**Baroj uses a Modular Monolith architecture.**

### Guiding Principle

> **Microservice-ready, not Microservice-first.**

Baroj is designed as one deployable application with strong internal module boundaries.

The architecture must make future extraction of a module into an independent service possible when there is a real technical or product reason, without introducing distributed-system complexity before it is needed.

### What This Means

- One primary deployable application.
- Strong internal boundaries between modules.
- Explicit dependency direction.
- Business logic isolated from UI and infrastructure.
- Infrastructure and external providers accessed through explicit boundaries.
- Modules expose small, intentional public APIs.
- Cross-module access must be explicit and justified.
- Service extraction is a future option, not a default implementation requirement.

### What This Does Not Mean

- Do not create microservices for every domain.
- Do not introduce network calls between internal modules.
- Do not duplicate business logic to make hypothetical extraction easier.
- Do not select queues, event buses, service meshes, or distributed infrastructure without a real requirement.
- Do not choose an ORM, auth provider, AI provider, or other infrastructure technology merely because it is common.

## Core Principles

1. **Modular Monolith first**
   - Prefer strong internal boundaries over premature service decomposition.

2. **Feature and domain ownership**
   - A feature belongs to a domain/module.
   - Domain rules do not belong in UI components.

3. **Explicit dependency direction**
   - Higher-level policies must not depend directly on infrastructure details.

4. **Business logic isolation**
   - Business rules must remain testable without rendering UI or requiring infrastructure.

5. **AI isolation**
   - AI providers are infrastructure concerns behind an application-level gateway.
   - Provider-specific details must not leak into domain logic.

6. **Security by design**
   - Treat browser input, external APIs, model output, and persisted data as trust boundaries.

7. **Reuse before invention**
   - Extend existing modules, components, services, and patterns before creating competing abstractions.

8. **Small public APIs**
   - Modules should expose only the contracts other modules genuinely need.

9. **Document durable decisions**
   - Architectural decisions that affect future development must be recorded in the appropriate Brain/source-of-truth document.

## System Overview

At the system level:

```text
User
  |
  v
Frontend / Presentation
  |
  v
Application / API Boundary
  |
  v
Domain Modules
  |
  v
Infrastructure
  |
  +--> PostgreSQL / Persistence
  +--> AI Gateway / Providers
  +--> External Integrations
```

The exact framework/provider implementation must follow the existing repository configuration and approved architecture decisions.

## Architectural Layers

### 1. Presentation

Responsibilities:
- UI rendering.
- User interaction.
- Client-side interaction state.
- Accessibility.
- Presentation-specific validation and feedback.
- Calling application/API contracts.

Must not:
- Own business rules.
- Access the database directly.
- Contain provider-specific infrastructure logic.

### 2. Application

Responsibilities:
- Use-case orchestration.
- Request/response contracts.
- Authorization checks at the application boundary.
- Transaction/use-case coordination.
- Calling domain policies.
- Calling infrastructure through interfaces/contracts.

Must not:
- Become a dumping ground for UI concerns.
- Depend directly on provider-specific implementation when an abstraction is appropriate.

### 3. Domain

Responsibilities:
- Business concepts.
- Business invariants.
- Domain rules and policies.
- Domain-level validation that is independent of transport/UI concerns.

Must not:
- Depend on React/Next.js UI code.
- Depend directly on database/ORM/provider implementations.
- Contain secrets or infrastructure configuration.

### 4. Infrastructure

Responsibilities:
- Persistence implementations.
- External API/provider adapters.
- AI provider adapters.
- Technical integrations.
- Runtime-specific infrastructure concerns.

Infrastructure implements contracts required by application/domain layers where appropriate.

## Dependency Direction

The intended dependency direction is:

```text
Presentation
     |
     v
Application
     |
     v
Domain
     ^
     |
Infrastructure
```

Interpretation:

- Presentation may depend on Application contracts.
- Application may depend on Domain.
- Infrastructure may implement interfaces/contracts owned by higher-level layers.
- Domain must remain independent of infrastructure.
- Infrastructure must not become the owner of business policy merely because it owns technical implementation.

No layer may bypass the intended boundaries without an explicit architectural reason.

## Layer Rules

Keep these four rules simple and enforceable:

1. **Presentation shows and collects.**
2. **Application coordinates.**
3. **Domain decides business rules.**
4. **Infrastructure connects to technical/external systems.**

If a piece of code is difficult to place, do not guess. Inspect the existing architecture and, when the decision is durable or high-impact, request clarification.

## Request Flow

A typical request should follow this shape:

```text
User action
  -> Presentation
  -> Feature interaction
  -> Application use case
  -> Domain rules
  -> Repository/service contract
  -> Infrastructure implementation
  -> Persistence / external system
  -> Application result
  -> Presentation state
```

The exact path may be shorter when a use case does not require every layer, but business rules must remain in their appropriate ownership boundary.

## AI Boundary

AI is treated as an external/untrusted capability.

```text
User Input
   |
   v
Boundary Validation
   |
   v
Application / AI Gateway
   |
   v
Provider Adapter
   |
   v
AI Provider
   |
   v
Structured Output
   |
   v
Output Validation
   |
   v
Application / Domain
   |
   v
Trusted System State
```

Rules:

- Never treat raw model output as trusted domain data.
- Validate structured AI output before using it.
- Keep provider-specific SDKs and configuration outside domain logic.
- Secrets remain server-side.
- AI behavior must not silently bypass authorization, validation, or data-integrity rules.

## Data and Persistence Boundary

- Presentation never accesses the database directly.
- Domain logic does not depend on ORM-specific APIs.
- Application code interacts with persistence through explicit contracts where needed.
- Infrastructure owns persistence implementations.
- The specific ORM/data-access technology remains an explicit project decision until selected.
- Database schema and ownership must be documented before production persistence expands.

## External Integration Boundary

External systems must be isolated behind explicit integration boundaries.

Examples include:
- Maps/geolocation.
- Payments.
- Messaging.
- External property/data providers.
- Analytics.
- AI providers.

Do not introduce a provider-specific dependency into domain logic.

## State Boundaries

State must have explicit ownership:

- **UI state:** component interaction state.
- **Form state:** user-entered form values and validation state.
- **URL state:** shareable/navigation state.
- **Server state:** persisted or remotely fetched data.
- **Domain state:** business concepts and invariants.

Do not introduce a global state solution when local or server state is sufficient.

## Security Boundary

The minimum trust flow is:

```text
Browser / External Input
        |
        v
Validation
        |
        v
Authorization
        |
        v
Application
        |
        v
Domain Rules
        |
        v
Infrastructure
```

Security-sensitive operations must not rely solely on client-side validation.

## Architectural Change Rules

Before changing architecture, an agent must:

1. Read this document.
2. Read `docs/05-folder-structure.md`.
3. Read `docs/07-tech-stack.md`.
4. Inspect the current repository implementation.
5. Identify whether the change is architectural or local.
6. Update the appropriate source-of-truth document when the decision is durable.
7. Avoid introducing competing architectural patterns.

Do not invent unresolved infrastructure decisions.

## Current Unresolved Decisions

The following remain intentionally unresolved until explicitly selected and documented:

- ORM/data-access implementation.
- Authentication provider/strategy.
- Exact API implementation strategy.
- AI provider(s).
- AI orchestration framework, if any.
- Event/queue infrastructure.
- Caching strategy.
- File/object storage.
- Maps provider.
- Payment provider.
- Observability providers.
- Deployment-specific infrastructure.

An agent must not silently convert any of these into project decisions.

## AI Agent Rule

When generating or modifying code:

- Treat this document as the architectural source of truth.
- Prefer the existing repository pattern over invention.
- Preserve module boundaries.
- Do not introduce microservices unless explicitly approved.
- Do not bypass application/domain boundaries for convenience.
- Do not place business logic in presentation code.
- Do not couple domain logic to infrastructure providers.
- When an architectural ambiguity affects security, data integrity, public APIs, authentication, or module ownership, stop and request clarification.

## Decision Record

### ADR-001 — Modular Monolith

**Decision:** Baroj will use a Modular Monolith architecture.

**Principle:** Microservice-ready, not Microservice-first.

**Rationale:**
- Keeps early development operationally simple.
- Preserves clear domain/module boundaries.
- Avoids premature distributed-system complexity.
- Allows future extraction when a concrete scaling, ownership, deployment, or reliability requirement justifies it.

**Status:** Accepted.

**Date:** 2026-08-05

### ADR-002 — System Layers and Dependency Direction

**Decision:** Baroj uses four architectural layers: Presentation, Application, Domain, and Infrastructure.

**Dependency direction:**
- Presentation -> Application -> Domain.
- Infrastructure implements contracts required by higher-level layers and must not own domain policy.

**Simple rule:**
- Presentation shows and collects.
- Application coordinates.
- Domain decides business rules.
- Infrastructure connects to technical/external systems.

**Rationale:**
- Keeps responsibilities clear.
- Prevents UI, business rules, and infrastructure details from becoming mixed together.
- Makes the Modular Monolith easier to maintain and keeps future module extraction possible without prematurely creating distributed services.

**Status:** Accepted.

**Date:** 2026-08-05

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

## Backend Application & API Boundary

### Purpose

Define the backend boundary for application use cases without selecting unresolved infrastructure technologies.

### Request Boundary

Backend requests must follow:

```text
External / Browser Request
        |
        v
API / Transport Boundary
        |
        v
Request Validation
        |
        v
Application Use Case
        |
        v
Domain Rules
        |
        v
Infrastructure Contracts
        |
        v
Infrastructure Implementation
        |
        v
Application Result
        |
        v
Response Boundary
```

### API / Transport Responsibilities

The API or transport layer owns:

- Transport-specific request parsing.
- Authentication context propagation when authentication exists.
- Request-shape validation.
- Mapping transport errors to response contracts.
- Calling application use cases.
- Returning stable response contracts.

It must not own:

- Core business rules.
- Database/ORM access.
- Provider-specific AI logic.
- Domain-specific persistence policy.

### Application Use-Case Responsibilities

Application use cases own:

- Orchestration of a user/system action.
- Authorization checks at the application boundary.
- Coordination between domain policies and infrastructure contracts.
- Transaction/use-case boundaries when persistence is introduced.
- Stable input/output contracts for callers.

Application code should remain independent of a specific HTTP framework or transport mechanism where practical.

### Validation Boundary

Validation is layered:

1. **Transport validation** protects the API boundary from malformed input.
2. **Application validation** enforces use-case requirements.
3. **Domain validation** enforces business invariants.
4. **Infrastructure validation** protects technical/external integration assumptions.

Client-side validation remains UX feedback and is never the authoritative security boundary.

### Error Contract

Backend errors must be explicit and safe.

- Do not expose stack traces, secrets, provider credentials, SQL/ORM internals, or sensitive infrastructure details.
- Use stable error categories/codes when an API contract requires machine-readable handling.
- Human-readable messages must be safe for the client context.
- Validation errors should identify relevant fields or request-level problems without leaking sensitive data.
- Authorization failures must not reveal protected resource details unnecessarily.

The exact error schema remains an open decision until the API implementation strategy is selected.

### Property Search Application Boundary

The current Property Search UI must not become the backend.

Its production flow is:

```text
Property Search UI
      |
      v
Search Request Contract
      |
      v
Property Search Application Use Case
      |
      v
Property Search Domain Rules
      |
      v
Property/Listing Read Contract
      |
      v
Future Persistence / External Data Adapter
```

The UI may continue using its current local interaction state until the production application contract is implemented.

The following remain intentionally unresolved:

- API transport/framework.
- Search endpoint or server-action contract.
- Property/listing read model.
- Persistence implementation.
- External property-data source.
- Authentication/authorization requirements.

### API Contract Rules

- Public API contracts must be explicit.
- Do not expose internal domain entities directly when a stable application response contract is appropriate.
- Do not let ORM/database types become API contracts.
- Do not couple API consumers to provider-specific response formats.
- Versioning strategy should be introduced only when a real compatibility requirement exists.
- Do not invent endpoints merely to satisfy a hypothetical future architecture.

### AI Boundary

AI requests must enter through the approved application-level AI gateway.

```text
API / Application Use Case
        |
        v
AI Gateway Contract
        |
        v
Provider Adapter
        |
        v
AI Provider
        |
        v
Validated Structured Output
```

Raw model output must never become trusted domain state without validation.

### Backend Definition of Done

A backend/API change is complete when:

- The transport boundary is explicit.
- Request validation exists at the appropriate boundary.
- Application orchestration is separated from transport concerns.
- Domain rules remain outside transport code.
- Infrastructure access follows approved contracts.
- Errors are safe and explicit.
- No unresolved infrastructure decision is silently introduced.
- Relevant typecheck/build/tests or equivalent validation pass.

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


## Core Module Boundaries

Baroj uses explicit module boundaries inside the Modular Monolith.

A **feature** describes a user-facing capability or workflow.

A **module** owns a coherent business/application responsibility, its concepts and rules, and exposes a small public interface to the rest of the system.

Modules communicate in-process. Internal modules must not communicate through network calls merely to simulate microservices.

### Initial Module Map

The initial module map is intentionally small and based only on responsibilities currently established by the project.

| Module | Responsibility | Status |
|---|---|---|
| Property Search | Search, filtering, criteria handling, and search-related user workflows for properties | Established |
| AI | Application-level AI capability, gateway, provider isolation, structured-output validation, and trust boundary | Established as a capability |
| Shared/Core | Only genuinely cross-cutting primitives, contracts, and utilities that have clear ownership | Restricted |
| Property / Listings | Ownership of canonical property/listing concepts and lifecycle | Not yet separated as an independent module |

The absence of a module from this list is intentional. Do not create new business modules such as Users, Authentication, Payments, Messaging, Maps, or similar domains until a concrete requirement and ownership boundary exists.

### Property Search Boundary

Property Search is the first concrete business-facing module established by the current implementation.

It owns:
- Search criteria.
- Search form and interaction contracts.
- Search-specific validation and normalization.
- Search-specific filtering behavior.
- Search-specific UI/application workflows.

It must not own:
- Canonical property persistence.
- Authentication or user identity.
- Payment logic.
- AI provider implementation.
- Database/ORM implementation.
- Global application policy unrelated to property search.

Property Search may depend on:
- Shared contracts that are genuinely cross-cutting.
- Application services/use cases required for search.
- Domain contracts representing data or capabilities it legitimately consumes.
- AI through the approved AI application boundary when an actual use case requires it.

Property Search must not bypass:
- Application boundaries.
- Domain rules.
- Infrastructure adapters.
- Security and authorization checks.

### AI Boundary and Ownership

AI is currently treated as a cross-cutting application capability rather than an independent business domain.

The AI capability owns:
- AI gateway contracts.
- Provider adapters.
- Structured-output validation.
- Provider-specific configuration isolation.
- AI trust-boundary handling.

It does not own business decisions that belong to a domain module.

Domain modules may request AI capabilities through an explicit application-level contract. Provider SDKs and provider-specific behavior must remain outside domain logic.

### Shared/Core Boundary

Shared/Core is a restricted area, not a general-purpose dumping ground.

A concept belongs in Shared/Core only when:
1. It is genuinely used across multiple modules.
2. It has no stronger domain owner.
3. Moving it there does not erase a meaningful module boundary.

Business logic must not be moved into Shared/Core simply because multiple files currently need it.

### Module Public API Rule

Each module should expose the smallest intentional public API required by other parts of Baroj.

Prefer:

```text
Other Module
    |
    v
Module Public API
    |
    v
Module Internal Implementation
```

Do not import another module's internal components, hooks, repositories, schemas, or infrastructure implementations unless an explicit architectural decision allows it.

### Cross-Module Dependency Rules

- Dependencies must be explicit.
- A module must not reach directly into another module's internal implementation.
- Cross-module business rules require an explicit application/domain boundary.
- Infrastructure details must not leak across module boundaries.
- Circular module dependencies are prohibited.
- A module may consume a capability without becoming the owner of that capability.
- If ownership is unclear, do not guess; stop and clarify before creating a durable boundary.

### Future Module Extraction Signal

A module may become a candidate for independent service extraction only when there is a concrete reason such as:
- Independent scaling requirements.
- Independent deployment requirements.
- Clear team/ownership separation.
- Reliability or isolation requirements.
- A meaningful infrastructure boundary that justifies distribution.

Future extraction is not a reason to introduce network communication today.

### ADR-003 — Initial Core Module Boundaries

**Decision:** Baroj will begin with a small module map centered on the established Property Search capability, with AI treated as an application-level capability and Shared/Core kept restricted.

**Rationale:**
- Prevents premature domain fragmentation.
- Gives the existing Property Search implementation a clear architectural home.
- Keeps AI provider concerns isolated from business modules.
- Prevents Shared/Core from becoming an uncontrolled dependency bucket.
- Leaves future business modules open until real requirements establish their ownership.

**Status:** Accepted.

**Date:** 2026-08-05

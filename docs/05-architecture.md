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
  +--> Persistence / Data Source
  +--> AI Gateway / Providers
  +--> External Integrations
```

The architecture does not currently select a database engine, ORM, or persistence provider. Persistence is an infrastructure category, not a technology decision. The exact framework/provider implementation must follow the existing repository configuration and approved architecture decisions.

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

## AI Gateway & Trust Boundary

### Purpose

Define Baroj's application-level AI boundary so AI providers remain replaceable, untrusted, and isolated from domain policy.

### AI Position in the Architecture

AI is an application-level capability with infrastructure adapters.

```text
Presentation / Application Use Case
            |
            v
       AI Gateway
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
```

### AI Gateway Responsibilities

The AI Gateway owns:

- A stable application-facing AI contract.
- Request orchestration.
- Provider selection through approved configuration.
- Provider-independent request/response shapes.
- Timeout and failure handling at the application boundary.
- Output validation before trusted use.
- AI-specific observability hooks when observability is introduced.

The gateway must not own:

- Domain business rules.
- Canonical property/listing ownership.
- UI rendering.
- Provider-specific business policy.

### Provider Adapter Responsibilities

Provider adapters own:

- Provider SDK/API interaction.
- Provider-specific authentication/configuration.
- Provider-specific request mapping.
- Provider-specific response mapping.
- Provider-specific error translation.

Provider SDKs must not leak into Presentation or Domain code.

### Trust Boundary

AI output is untrusted external data.

Required flow:

```text
User / System Input
        |
        v
Input Boundary Validation
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
Raw Model Output
        |
        v
Schema / Output Validation
        |
        v
Application Rules
        |
        v
Trusted Domain State
```

Raw model output must never be persisted or used as trusted business state without validation and the required domain/application checks.

### Input Safety

Before sending data to an AI provider:

- Validate the request shape.
- Apply authorization rules.
- Minimize data to what the use case requires.
- Do not send secrets or unnecessary sensitive data.
- Keep provider credentials server-side.
- Treat user-provided instructions as untrusted input.

### Output Safety

AI output must be treated as untrusted until validated.

Where structured output is required:

- Validate schema.
- Validate allowed values and ranges.
- Validate business invariants in the appropriate domain/application layer.
- Reject or safely handle malformed output.
- Do not allow model output to bypass authorization or persistence rules.

### Prompt Boundary

Prompts are application inputs/contracts, not domain truth.

AI prompts must:

- Be explicit about expected output shape when structured output is required.
- Avoid embedding secrets.
- Avoid relying on undocumented provider behavior.
- Remain replaceable independently of provider SDK details.

Prompt templates belong in the project's approved prompt/documentation layer unless a runtime-specific implementation requires otherwise.

### Property Search + AI

AI may support Property Search only through the approved application boundary.

Examples of future use cases may include:

- Query understanding.
- Search-intent normalization.
- Natural-language property criteria extraction.

These are capabilities, not approved product features until explicitly specified.

AI must not independently decide:

- Property ownership.
- Authorization.
- Payment outcomes.
- Canonical property state.
- Security policy.

### Failure & Fallback

AI failures must have explicit application-level handling.

At minimum, account for:

- Provider timeout.
- Provider unavailable.
- Rate limiting.
- Invalid provider response.
- Invalid structured output.
- Partial/uncertain result where the use case permits it.

Do not silently substitute fabricated data when AI fails.

### Privacy & Data Handling

Until a provider and data policy are explicitly selected:

- Assume AI inputs may contain sensitive information.
- Send the minimum required data.
- Do not persist raw prompts/responses by default.
- Do not log sensitive AI payloads by default.
- Provider-specific retention and data-processing requirements must be documented before production use.

### AI Observability

Observability requirements remain open.

When implemented, useful signals may include:

- Request success/failure.
- Latency.
- Provider/model identifier.
- Validation failure categories.
- Rate-limit events.

Do not log raw sensitive prompts or model outputs by default.

### AI Definition of Done

An AI integration is complete when:

- The AI Gateway contract is explicit.
- Provider-specific logic is isolated in an adapter.
- Input validation and authorization are applied.
- Structured output is validated before trusted use.
- Failure/fallback behavior is defined.
- Secrets remain server-side.
- Sensitive payload logging is avoided.
- No domain rule depends directly on a provider SDK.
- Relevant tests/checks pass.

### Open Decisions

- AI provider(s).
- AI SDK/runtime.
- AI gateway implementation details.
- Prompt orchestration strategy.
- Structured-output technology.
- Model selection policy.
- Provider retention/data-processing policy.
- AI observability implementation.
- AI cost/rate-limit policy.

## Observability & Audit Boundary

### Purpose

Define the future boundary for operational observability, application telemetry, security-relevant audit records, and diagnostic information without inventing vendors, event schemas, retention periods, or logging infrastructure.

### Ownership

Observability / Audit is responsible for:

- Operational telemetry contracts.
- Application diagnostics and health signals.
- Security-relevant audit records where explicitly required.
- Correlation and traceability contracts.
- Observability data access boundaries.

Business modules remain owners of their business state. Observability must not become a shadow source of truth for domain data.

### Boundary

```text
Application / Domain / Infrastructure
              |
              v
Observability Contract
              |
       +------+------+
       |             |
       v             v
Operational       Audit
Telemetry         Records
       |             |
       +------+------+
              |
              v
Observability Infrastructure
```

### Operational Telemetry vs Audit

Operational telemetry exists to understand system behavior, performance, failures, and health.

Audit records exist to provide an accountable record of security-sensitive or otherwise explicitly auditable actions.

They are related but must not be treated as interchangeable data.

### Logging Rules

Application and infrastructure code may emit approved diagnostic information through the observability boundary.

Do not log:

- Secrets or credentials.
- Authentication tokens.
- Sensitive payment data.
- Unnecessary precise location data.
- Raw private communication content.
- Unvalidated or sensitive AI payloads.
- Personal data unless explicitly required and approved.

Do not invent log fields, event names, severity taxonomies, or retention periods as system-wide standards before they are defined.

### Security & Audit

Security-sensitive actions may require audit records.

Audit requirements must be driven by explicit security, legal, privacy, and product decisions.

Audit records must not be used as a substitute for canonical domain state.

### AI Boundary

AI operations may produce approved telemetry for latency, failures, usage, and safety monitoring.

Raw prompts, raw model outputs, or user-provided sensitive content must not be logged by default.

Any AI audit or observability data must follow the same privacy and security boundaries as the underlying capability.

### Privacy

Observability data can contain sensitive information even when it is not canonical business data.

Collection must follow data minimization and approved access controls.

Retention, deletion, export, and access requirements remain explicit decisions.

### Infrastructure

Logging, metrics, tracing, error tracking, audit storage, and monitoring providers are infrastructure concerns.

Provider-specific SDKs and APIs must not leak into domain logic.

### Definition of Done

The Observability & Audit boundary is ready for implementation only when:

- Operational telemetry responsibilities are explicit.
- Audit responsibilities are explicit.
- Sensitive-data logging rules are approved.
- Correlation/traceability requirements are defined.
- Access and retention requirements are documented.
- Infrastructure/provider boundaries are approved.
- AI observability behavior is bounded.

### Open Decisions

- Observability data model.
- Audit event model.
- Logging policy.
- Metrics and tracing strategy.
- Error tracking strategy.
- Retention/deletion policy.
- Access-control model.
- Alerting strategy.
- External observability providers.

## Search & Discovery Boundary

### Purpose

Define the future boundary for property discovery, search execution, filtering, ranking, and search-facing read models without inventing indexing technology, ranking formulas, APIs, or persistence details.

### Ownership

Search & Discovery is the intended owner of:

- Search application workflows.
- Search criteria normalization and validation.
- Search-facing read contracts.
- Filtering and discovery behavior.
- Ranking orchestration when explicitly defined.
- Search-specific performance and failure behavior.

Property / Listings remains the canonical owner of property and listing data.

### Boundary

```text
User / Feature
     |
     v
Search Application Contract
     |
     +--> Criteria Validation / Normalization
     |
     +--> Search & Discovery Rules
     |
     v
Search-facing Read Contract
     |
     v
Property / Listings Data Boundary
     |
     v
Infrastructure / Search Implementation
```

Search & Discovery must not become the canonical owner of property/listing state.

### Relationship to Property Search

**Property Search** and **Search & Discovery** are related but are not competing ownership boundaries.

- **Property Search** is the currently established user-facing business module. It owns the current search criteria, form/interaction contracts, search-specific validation/normalization, filtering behavior, and search-related UI/application workflows.
- **Search & Discovery** is the broader future capability boundary for discovery workflows, search execution, search-facing read contracts, ranking orchestration, and search-specific performance/failure behavior.
- Property Search may consume Search & Discovery capabilities through explicit application contracts when those capabilities are implemented.
- Search & Discovery must not take ownership of Property Search's UI state or canonical property/listing data.
- Until Search & Discovery is explicitly implemented as a separate capability/module, existing Property Search responsibilities remain the active implementation boundary.
- Do not create duplicate search modules, APIs, services, or ownership layers merely to represent this conceptual distinction.

This distinction is architectural clarification only; it does not create a new module or require refactoring the current Property Search implementation.

### Criteria vs Canonical Data

Search criteria describe what a user is looking for.

Canonical property/listing data describes what the platform knows about properties and listings.

Search criteria must not be persisted or transformed into canonical property/listing state unless an explicit product/domain use case defines that behavior.

### Read Models

Search may consume a dedicated read model optimized for discovery.

A search read model:

- Is derived from approved canonical sources.
- Has an explicit contract.
- May be denormalized or optimized independently.
- Must not silently become the canonical source of truth.

The exact read-model shape and synchronization strategy remain open.

### Filtering & Ranking

Filtering and ranking are separate concerns.

Filtering determines whether a candidate satisfies approved search criteria.

Ranking determines ordering only when ranking behavior is explicitly defined.

Do not invent:

- Ranking formulas.
- Weight values.
- Scoring models.
- Recommendation logic.
- Search relevance rules.
- Personalization rules.

### AI Boundary

AI may assist with natural-language search interpretation or approved discovery experiences through the application AI boundary.

AI must not:

- Bypass search criteria validation.
- Establish canonical property/listing state.
- Invent unavailable property/listing facts.
- Replace deterministic domain rules where those rules are required.

AI-derived search criteria must be validated and normalized before entering search execution.

### External Search Infrastructure

Search indexes, databases, geospatial systems, caches, and external search providers are infrastructure concerns behind approved contracts.

Do not couple Search & Discovery application logic directly to a specific search engine, ORM, database, or provider before the architecture decision is made.

### Property Search Integration

The existing Property Search feature is the current presentation/application entry point for search interaction.

Its UI state and interaction contracts must remain separate from the future Search & Discovery domain/application boundary.

### Definition of Done

The Search & Discovery boundary is ready for implementation only when:

- Search ownership is explicit.
- Criteria contracts are defined.
- Search-facing read contracts are defined.
- Filtering and ranking responsibilities are documented.
- Canonical Property / Listings ownership remains explicit.
- Search infrastructure boundaries are approved.
- AI-assisted search behavior is bounded.
- Failure and performance expectations are documented.

### Open Decisions

- Search domain/application model.
- Search read-model shape.
- Indexing strategy.
- Search engine/provider.
- Filtering semantics.
- Ranking/relevance model.
- Personalization strategy.
- Geospatial search strategy.
- Synchronization/update strategy.
- Caching strategy.

## Files & Media Boundary

### Purpose

Define the future boundary for uploaded files, property media, documents, and media processing without inventing storage providers, file schemas, processing pipelines, or retention policies.

### Ownership

Files / Media is the intended owner of:

- File and media application contracts.
- Upload and retrieval workflows.
- Media metadata and processing contracts.
- File access-control boundaries.
- Media-specific lifecycle and retention behavior when explicitly defined.

Other modules may request file/media operations through approved contracts but must not own storage infrastructure or provider integrations.

### Boundary

```text
Feature / Application Use Case
          |
          v
Files / Media Application Contract
          |
          v
Media Domain Rules
          |
          v
Storage / Processing Contract
          |
          v
Infrastructure / External Provider
```

Files / Media concerns must remain separated from:

- Feature-specific upload UI state.
- Property Search state.
- Direct object-storage SDK usage in application or domain code.
- AI provider implementations.
- Direct database/ORM access from presentation or feature code.

### Canonical File vs Media Representation

A file is an uploaded or stored digital object.

Media may be a domain representation of a file used by another capability, such as property imagery or documents.

The exact relationship between files, media, documents, and owning domains remains unresolved.

Do not invent:

- File fields.
- Media fields.
- MIME/type allowlists.
- Size limits.
- Storage paths.
- Bucket names.
- Processing states.
- Thumbnail variants.
- Retention periods.
- Database tables.

### Property / Listings Integration

Property / Listings may own the business relationship between a property/listing and its media.

Files / Media owns the technical file/media capability and contracts.

Property Search may consume approved media read models but must not own canonical file storage or media processing.

### Upload & Processing

Upload, validation, transformation, optimization, scanning, and derivative generation belong behind approved application/infrastructure contracts.

Processing must not silently mutate canonical domain state without an explicit application/domain action.

### Security & Privacy

Files and media may contain sensitive or private information.

Access must respect Authentication & Authorization boundaries.

Uploads and retrievals require explicit authorization where applicable.

Do not expose storage credentials, internal storage paths, or provider-specific access mechanisms to clients.

### AI Boundary

AI may process approved files/media only through explicit application contracts.

AI must not:

- Establish ownership of uploaded files.
- Bypass file access controls.
- Persist media outside approved storage boundaries.
- Treat unvalidated extracted content as trusted domain state.

Any AI-extracted information intended for canonical state must pass through validation and domain/application rules.

### Definition of Done

The Files & Media boundary is ready for implementation only when:

- File/media ownership is explicit.
- Upload and retrieval contracts are defined.
- Access-control requirements are documented.
- Storage and processing boundaries are explicit.
- Media/domain ownership relationships are documented.
- Failure and processing semantics are defined.
- Retention/privacy requirements are approved.

### Open Decisions

- File/media domain model.
- Property/listing media ownership.
- Storage strategy.
- File validation policy.
- Processing and derivative strategy.
- Virus/security scanning requirements.
- Retention and deletion policy.
- Access/download strategy.
- Caching/CDN strategy.
- External storage providers.

## Maps & Location Boundary

### Purpose

Define the future boundary for geographic data, location services, maps, geocoding, and spatial capabilities without inventing providers, coordinate schemas, map libraries, or persistence details.

### Ownership

Maps / Location is the intended owner of:

- Location-related application contracts.
- Geospatial domain behavior where applicable.
- Geocoding and reverse-geocoding contracts.
- Map and location service integration boundaries.
- Location-specific privacy and security requirements.

Other modules may consume approved location contracts but must not own the location infrastructure or provider integration.

### Boundary

```text
Feature / Application Use Case
          |
          v
Location Application Contract
          |
          v
Location / Geospatial Domain
          |
          v
Maps / Geocoding Contract
          |
          v
Infrastructure / External Provider
```

Location concerns must remain separated from:

- Feature-specific UI state.
- Property Search business rules that are not geographic.
- Direct map-provider SDK usage in domain/application code.
- AI provider implementations.
- Direct database/ORM access from presentation or feature code.

### Location Data

Location data may include user-provided, property-related, or externally resolved geographic information.

Do not invent:

- Coordinate fields or formats.
- Address schemas.
- Region hierarchies.
- Distance units.
- Geospatial indexes.
- Map layers.
- Location precision rules.

These require explicit product, domain, privacy, and infrastructure decisions.

### Property / Listings Integration

Property / Listings may own canonical property-related location data when the domain model explicitly establishes that ownership.

Property Search may consume a search-facing geographic representation for filtering or discovery, but must not become the canonical owner of property location data.

Maps / Location provides capabilities and contracts; it does not automatically own every location value used by the platform.

### Privacy & Security

Location can be sensitive data.

Location operations must respect Authentication & Authorization boundaries and approved privacy requirements.

Do not expose precise location unnecessarily, and do not persist or transmit location data outside approved boundaries.

### AI Boundary

AI may assist with location-related experiences such as natural-language location interpretation only through approved application contracts.

AI must not:

- Establish canonical location state without validation.
- Bypass location privacy or authorization rules.
- Directly control map/geocoding infrastructure.
- Treat inferred location as trusted geographic data without explicit validation.

### External Providers

External map, geocoding, and location providers are infrastructure integrations.

Provider-specific APIs, SDKs, credentials, quotas, and implementation details must not leak into domain or presentation layers.

### Definition of Done

The Maps & Location boundary is ready for implementation only when:

- Location ownership is explicit.
- Geographic contracts are documented.
- Provider integration boundaries are explicit.
- Privacy and precision requirements are approved.
- Property/location ownership is defined.
- Failure and fallback behavior is documented.
- Persistence and caching decisions are approved where applicable.

### Open Decisions

- Location domain model.
- Property/location ownership.
- Coordinate and address representation.
- Geocoding strategy.
- Map provider strategy.
- Distance and spatial-query semantics.
- Precision/privacy policy.
- Caching strategy.
- Persistence mapping.
- Quota and failure handling.

## Payments & Transactions Boundary

### Purpose

Define the future boundary for payments and financial transactions without inventing payment providers, transaction schemas, currencies, settlement rules, or persistence details.

### Ownership

Payments / Transactions is the intended owner of:

- Payment and transaction domain behavior.
- Financial transaction lifecycle rules.
- Payment application workflows.
- Transaction integrity and reconciliation contracts.
- Payment-specific security requirements.

Other modules may request approved payment operations but must not own canonical financial transaction state.

### Boundary

```text
Feature / Application Use Case
          |
          v
Payment Application Contract
          |
          v
Payment / Transaction Domain
          |
          v
Payment Provider Contract
          |
          v
Infrastructure / External Provider
```

Payment concerns must remain separated from:

- Feature-specific UI state.
- Property Search state.
- Messaging and notification state.
- AI provider implementations.
- Direct database/ORM access from presentation or feature code.

### Transaction Integrity

Financial state must be treated as trusted application/domain state.

Do not allow client-side UI state, AI output, or external provider responses to directly establish trusted transaction state without application-level validation and reconciliation.

Do not invent:

- Transaction fields.
- Payment states.
- Currency rules.
- Amount semantics.
- Refund rules.
- Settlement rules.
- Idempotency strategy.
- Database tables.

These require explicit financial and domain decisions.

### External Payment Providers

External payment providers are infrastructure integrations behind an approved payment contract.

Provider-specific APIs, SDKs, webhooks, credentials, and implementation details must not leak into the domain or presentation layers.

The canonical ownership of financial state remains inside the approved application/domain boundary.

### Security

Payment operations must respect Authentication & Authorization boundaries and applicable privacy/security requirements.

Sensitive payment data and credentials must remain inside approved infrastructure/security boundaries.

Do not store or expose payment credentials or provider secrets in UI code, prompts, logs, or domain objects.

### AI Boundary

AI may assist with non-authoritative payment-related experiences only where explicitly approved.

AI must not:

- Authorize or confirm financial transactions.
- Invent transaction state.
- Modify payment records without an authorized application action.
- Bypass financial validation or reconciliation.
- Receive sensitive payment credentials unless an explicit security design permits it.

### Property / Listings Integration

Property / Listings may initiate approved payment use cases in future workflows, but must not own payment processing or canonical transaction state.

The exact financial workflows remain intentionally unresolved.

### Definition of Done

The Payments & Transactions boundary is ready for implementation only when:

- Financial ownership is explicit.
- Transaction lifecycle rules are documented.
- Payment application contracts are defined.
- Provider integration boundaries are explicit.
- Idempotency and reconciliation requirements are documented.
- Security requirements are approved.
- Failure and recovery behavior is defined.
- Persistence mapping is approved.

### Open Decisions

- Payment domain model.
- Transaction lifecycle.
- Currency and amount semantics.
- Payment provider strategy.
- Idempotency model.
- Refund and reversal behavior.
- Settlement/reconciliation strategy.
- Persistence mapping.
- Audit requirements.
- Financial security/compliance requirements.

## Notifications Boundary

### Purpose

Define the future boundary for system-generated notifications without inventing notification channels, templates, providers, delivery guarantees, or persistence details.

### Ownership

Notifications is the intended owner of:

- Notification intent and application workflows.
- Notification delivery contracts.
- Notification preference behavior when explicitly defined.
- Notification-specific failure and retry semantics.

Other modules may emit approved notification intents but must not own canonical notification state or delivery infrastructure.

### Boundary

```text
Domain / Application Event or Use Case
                |
                v
Notification Application Contract
                |
                v
Notification Policy
                |
                v
Delivery Contract
                |
                v
Infrastructure / Provider
```

Notification concerns must remain separated from:

- Feature-specific UI state.
- Messaging conversation state.
- Property Search state.
- AI provider implementations.
- Direct database/ORM access from presentation or feature code.

### Notification vs Messaging

Notifications and messaging are distinct concerns.

Messaging represents communication between participants.

Notifications represent system-generated communication about an event, state change, reminder, or other approved trigger.

The exact relationship and shared infrastructure remain open.

### Trigger and Delivery

The architecture may support future notification triggers from approved application/domain events.

Do not invent:

- Event names.
- Notification types.
- Message templates.
- Delivery channels.
- Queue/topic names.
- Retry counts.
- Delivery guarantees.
- Provider names.

These require explicit product and infrastructure decisions.

### User Preferences

Notification preferences may be introduced through an approved user/security boundary.

Until explicitly designed, do not invent preference fields, default settings, opt-in/opt-out behavior, or preference persistence.

### AI Boundary

AI may assist with notification content generation only through approved application contracts.

AI must not independently:

- Trigger protected notifications.
- Change notification preferences.
- Bypass authorization.
- Become the source of truth for delivery state.

### Security

Notifications must respect Authentication & Authorization boundaries and any privacy requirements attached to the underlying data.

Sensitive notification content must pass through approved application and infrastructure boundaries.

### Definition of Done

The Notifications boundary is ready for implementation only when:

- Notification ownership is explicit.
- Trigger contracts are documented.
- Notification policy is defined.
- Delivery contracts are explicit.
- Failure/retry semantics are documented.
- Preference behavior is defined where applicable.
- Security and privacy requirements are documented.
- External delivery providers are explicitly selected if needed.

### Open Decisions

- Notification domain model.
- Trigger/event contracts.
- Notification channels.
- Delivery guarantees.
- Retry and failure strategy.
- Template/content strategy.
- User preference model.
- Persistence mapping.
- External notification providers.
- Observability and audit requirements.

## Messaging & Communication Boundary

### Purpose

Define the future boundary for user-to-user and system communication without inventing message schemas, transport providers, delivery guarantees, or persistence details.

### Ownership

Messaging / Communication is the intended owner of:

- Conversation and message domain behavior.
- Communication lifecycle rules.
- Message delivery contracts.
- Communication-specific application workflows.
- Communication-related security and access-control requirements.

Other modules may request communication through approved application contracts but must not own canonical message or conversation state.

### Boundary

```text
Feature / Application Use Case
          |
          v
Communication Application Contract
          |
          v
Messaging / Communication Domain
          |
          v
Delivery / Persistence Contracts
          |
          v
Infrastructure
```

Communication must remain separated from:

- Feature-specific UI state.
- Property Search state.
- AI provider implementations.
- Transport-specific infrastructure.
- Direct database/ORM access from presentation or feature code.

### Message vs Conversation

The exact domain relationship between messages, conversations, participants, and communication channels is intentionally unresolved.

Do not invent:

- Message fields.
- Conversation fields.
- Participant models.
- Message status values.
- Delivery guarantees.
- Read/seen semantics.
- Attachment models.
- Retention rules.
- Database tables.

These require explicit domain and data decisions.

### Communication Channels

The platform may eventually support one or more communication channels.

The architecture must treat channel delivery as an infrastructure concern behind stable application contracts.

Do not assume or introduce a specific provider, protocol, queue, notification service, email/SMS provider, or real-time transport before the decision is made.

### Property / Listings Integration

Property and Listings may expose approved communication use cases, but must not own the messaging subsystem.

Examples of future interaction boundaries may include contacting a listing party or coordinating a property-related conversation, but the exact workflows remain open.

### AI Boundary

AI may assist with communication-related capabilities such as drafting or summarization only through approved application boundaries.

AI output must not:

- Send a message without an authorized application action.
- Grant communication access.
- Bypass participant or authorization rules.
- Become the canonical message history.

### Security

Communication operations must respect the Authentication & Authorization boundary.

Protected operations require an established security context and explicit authorization.

Sensitive communication data must remain inside approved application and infrastructure boundaries.

### Definition of Done

The Messaging & Communication boundary is ready for implementation only when:

- Communication ownership is explicit.
- Conversation/message domain rules are documented.
- Application contracts are defined.
- Delivery and persistence boundaries are explicit.
- Authorization requirements are documented.
- Failure and delivery semantics are documented.
- AI interaction rules are documented where applicable.

### Open Decisions

- Conversation and message domain model.
- Participant and access model.
- Communication channels.
- Delivery guarantees.
- Real-time requirements.
- Notification strategy.
- Attachment handling.
- Retention and deletion rules.
- Persistence mapping.
- External communication providers.

## Authentication & Authorization Boundary

### Purpose

Define the future security boundary for identity, authentication, authorization, and access-control decisions without inventing an authentication provider, user schema, roles, permissions, or implementation details.

### Ownership

Authentication / User is the intended canonical owner of:

- Identity and authentication state.
- Authentication flows and session/security context.
- Authorization policy contracts.
- Access-control decisions owned by the user/security domain.

Other modules may consume approved identity and authorization contracts but must not become the canonical owner of authentication state.

### Boundary

```text
External Request
      |
      v
Transport / API Boundary
      |
      v
Authentication Context
      |
      v
Application Use Case
      |
      v
Authorization Policy
      |
      v
Domain Operation
      |
      v
Infrastructure
```

Authentication and authorization concerns must not be embedded directly into unrelated UI components, search form state, database adapters, or AI provider integrations.

### Authentication vs Authorization

Authentication answers whether a request is associated with an authenticated identity or approved system context.

Authorization determines whether that context is permitted to perform a specific application or domain operation.

These concerns must remain distinguishable even when implemented together.

### Application Boundary

Application use cases are responsible for enforcing required authorization before protected domain operations.

Transport layers may establish or propagate authentication context, but they must not become the source of business authorization rules.

Domain operations may enforce domain invariants and security-sensitive business rules where required.

### Data Ownership

Do not invent:

- User fields.
- Role names.
- Permission names.
- Session fields.
- Token formats.
- Authentication providers.
- Authorization tables.
- API endpoints.

The canonical identity/security data model requires an explicit domain decision.

### AI and Security

AI must not determine authentication or authorization outcomes.

AI-generated content cannot grant access, change permissions, or establish trusted identity state.

Any AI capability operating on protected data must execute inside an already-established application authorization boundary.

### Property Search

Property Search may consume authenticated context or approved authorization contracts when future use cases require them.

It must not implement its own identity store, session model, role system, or authorization policy.

### Definition of Done

The Authentication & Authorization boundary is ready for implementation only when:

- Identity ownership is explicit.
- Authentication flow and security context are documented.
- Authorization policy contracts are explicit.
- Protected application/domain operations are identified.
- Data ownership and persistence mapping are approved.
- Security failure behavior is documented.
- AI access to protected data is bounded by application authorization.

### Open Decisions

- Authentication strategy.
- Identity model.
- Session/token strategy.
- Authorization model.
- Role/permission model.
- Account lifecycle.
- Persistence mapping.
- External identity providers.
- Security event/audit requirements.

## Property / Listings Domain Boundary

### Purpose

Define the future ownership boundary for canonical property and listing data without inventing a schema or implementation before the domain is explicitly designed.

### Ownership

Property / Listings is the intended canonical owner of:

- Property identity and canonical property data.
- Listing identity and listing lifecycle data.
- Property/listing business invariants.
- Canonical read/write domain contracts.

Property Search is a consumer of search-facing data, not the canonical owner.

### Boundary

```text
Property Search Application
          |
          v
Search-facing Read Contract
          |
          v
Property / Listings Domain
          |
          v
Persistence Contract
          |
          v
Infrastructure
```

Property / Listings must not depend on:

- Property Search UI components.
- Search form state.
- AI provider SDKs.
- Transport-specific request/response objects.
- ORM/database implementation details.

### Canonical Data vs Search Data

Canonical property/listing state belongs to Property / Listings.

Search-facing data may be a read model optimized for discovery, filtering, or ranking, but it must not silently become the canonical property/listing source of truth.

### Property and Listing Relationship

The exact relationship between Property and Listing is intentionally unresolved.

Do not invent:

- Entity fields.
- Listing status values.
- Ownership relationships.
- Pricing rules.
- Availability rules.
- Database tables.
- Search indexes.

These require an explicit domain/data decision.

### External Property Sources

External property sources are integrations.

They may provide data that is mapped into the approved Property / Listings boundary, but an external provider must not automatically become the canonical owner.

Provider mapping, freshness, conflict resolution, and synchronization behavior remain open.

### AI Boundary

AI may assist application use cases around property data, but AI output does not establish canonical property/listing state.

Any AI-derived property data must pass through:

1. Input validation.
2. Application rules.
3. Domain validation.
4. Explicit persistence rules.

### Domain Definition of Done

The Property / Listings boundary is ready for implementation only when:

- Canonical ownership is explicitly defined.
- Property/listing invariants are documented.
- Domain contracts are explicit.
- Search-facing read contracts are defined.
- Persistence mapping is approved.
- External-source behavior is documented where applicable.
- Security and authorization boundaries are defined.

### Open Decisions

- Property domain model.
- Listing domain model and lifecycle.
- Property/listing relationship.
- Canonical schema.
- Search read model.
- External data-source strategy.
- Synchronization/conflict rules.
- Persistence mapping.
- Authorization model.

## Persistence & Data Ownership Model

### Purpose

Define how Baroj owns and accesses persisted data without prematurely selecting an ORM, database access library, or external data provider.

### Ownership Principles

- Each persisted business concept must have one clear canonical owner.
- A feature may consume data without becoming the owner of the canonical data.
- Property Search owns search criteria and search workflow behavior, not canonical property/listing persistence.
- Persistence implementations belong to Infrastructure.
- Domain rules must remain independent of ORM and database APIs.
- Application use cases coordinate persistence access through explicit contracts where appropriate.
- Database records must not automatically become domain entities or API contracts.

### Current Ownership Map

| Data / Concept | Owner | Current Status |
|---|---|---|
| Property Search criteria | Property Search | Established |
| Property Search form/interaction state | Property Search / Presentation | Established |
| Canonical property/listing data | Property / Listings domain | Not yet separated |
| User identity/authentication data | Authentication/User domain | Not yet established |
| AI provider configuration | AI capability / Infrastructure | Not yet implemented |
| Search result read model | Property Search application boundary | Contract not yet defined |

Do not create new business ownership boundaries solely to fill this table.

### Persistence Boundary

The intended flow is:

```text
Application Use Case
       |
       v
Repository / Data Contract
       |
       v
Infrastructure Implementation
       |
       v
Database / External Data Source
```

Rules:

- Presentation must never access persistence directly.
- Domain must not import ORM/database APIs.
- Application code should depend on contracts rather than concrete persistence implementations where a boundary is needed.
- Infrastructure owns connection details, queries, mapping, retries, and technical persistence concerns.
- Persistence errors must be translated before crossing into presentation-facing contracts.

### Canonical Data vs Read Models

Canonical data represents the authoritative business-owned representation.

Read models represent data shaped for a specific application/use-case need.

A read model:

- May combine multiple sources.
- May be optimized for a specific query.
- Must not silently become the canonical owner of the underlying business concept.
- Should have explicit ownership and refresh/consistency expectations when introduced.

For Property Search, the search result read model remains undefined until the property/listing ownership and search application contract are established.

### Property / Listings Boundary

The architecture currently does not establish Property / Listings as a fully separated module.

Therefore:

- Do not invent a property schema.
- Do not invent listing lifecycle rules.
- Do not introduce property persistence merely to make the current UI appear production-ready.
- Do not treat mock/demo property data as canonical system state.

When this boundary is explicitly designed, it must define:

- Canonical property/listing entities.
- Ownership and lifecycle.
- Required invariants.
- Read/write contracts.
- Search-facing read model.
- Persistence mapping.
- Data migration strategy when applicable.

### External Property Data

External property-data providers are integrations, not canonical ownership by default.

Any external property source must have:

- Explicit integration boundary.
- Defined data ownership.
- Mapping/normalization rules.
- Failure behavior.
- Freshness/consistency expectations.
- Security and privacy handling where applicable.

The specific provider remains unresolved.

### Transactions & Consistency

Until a persistence implementation is selected:

- Do not invent transaction infrastructure.
- Application use cases should define logical consistency boundaries.
- When multiple writes become necessary, transaction requirements must be documented before implementation.
- Do not assume eventual consistency unless the architecture explicitly requires it.

### Migrations & Schema Changes

Once a database schema exists:

- Schema changes must be versioned.
- Migrations must be reviewable and reversible where practical.
- Destructive changes require explicit review.
- Production data must never be treated as disposable test state.
- Seed/demo data must be clearly separated from canonical production data.

The migration tool remains an open infrastructure decision.

### Caching

Caching is not currently established as part of the persistence model.

Therefore:

- Do not add a cache without a measured requirement.
- Do not use cache state as canonical state.
- Any future cache must define invalidation/expiry and consistency behavior.

### Persistence Security

- Credentials and connection strings remain server-side.
- Never expose database credentials to the browser.
- Validate and authorize application requests before sensitive persistence operations.
- Avoid logging raw sensitive records or credentials.
- Database/provider errors must not leak internal infrastructure details to users.

### Open Decisions

- Database engine/configuration — PostgreSQL approved by MAI-33; hosting/provider remains open.
- ORM/data-access implementation — unresolved.
- Property / Listings module boundary.
- Canonical property/listing schema.
- Search result read model.
- External property-data provider.
- Transaction strategy.
- Migration tooling.
- Caching strategy.

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

## MAI-28 — Architecture Cleanup

### Purpose

Remove remaining architectural ambiguity identified after the MAI-6 through MAI-27 boundary work without introducing new technology or domain decisions.

### Cleanup Decisions

- The system overview uses **Persistence / Data Source** instead of naming PostgreSQL. Database engine, ORM, and persistence provider remain unresolved decisions.
- **Property Search** remains the established current business module.
- **Search & Discovery** is the broader future capability boundary and must not be interpreted as a second competing owner of the current Property Search implementation.
- The distinction between Property Search and Search & Discovery is conceptual and contractual; it does not authorize creation of a second search module or duplicate APIs.
- `docs/12-baroj-brain.md` must include the active execution/protocol documents so the Brain ownership map reflects the live repository.
- `CURSOR_CONTEXT.md` already includes `docs/16-development-protocol.md`, `docs/17-github-linear-workflow.md`, and `docs/18-ai-safety-quality.md`; no additional Cursor-context change is required by MAI-28.

### Scope Guard

MAI-28 is a documentation-consistency cleanup only. It does not:

- Select a database or ORM.
- Establish a new module.
- Change the Property Search implementation.
- Define a search engine or ranking model.
- Close any previously unresolved architecture decision.

## Architecture Final Boundary Audit

### Purpose

Perform the final architecture-boundary audit before implementation work expands further. This section records the current boundary map and prevents unresolved decisions from being silently converted into implementation assumptions.

### Current Boundary Map

| Capability | Canonical Owner | Current State |
|---|---|---|
| Property Search criteria and interaction | Property Search | Established |
| Property / Listings canonical data | Property / Listings | Boundary defined; domain model not yet implemented |
| Authentication / Authorization | Authentication / User | Boundary defined; domain model not yet implemented |
| Messaging / Communication | Messaging / Communication | Boundary defined; domain model not yet implemented |
| Notifications | Notifications | Boundary defined; implementation not yet established |
| Payments / Transactions | Payments / Transactions | Boundary defined; implementation not yet established |
| Maps / Location | Maps / Location | Boundary defined; implementation not yet established |
| Files / Media | Files / Media | Boundary defined; implementation not yet established |
| Search / Discovery | Search / Discovery | Boundary defined; implementation not yet established |
| Observability / Audit | Observability / Audit | Boundary defined; implementation not yet established |
| AI | AI capability + Infrastructure adapters | Established at application boundary |

### Boundary Audit Rules

Before introducing a new implementation:

- Identify the owning module/capability.
- Confirm the dependency direction.
- Reuse an existing contract where one exists.
- Keep infrastructure behind approved contracts.
- Keep canonical domain ownership explicit.
- Do not introduce cross-module state ownership implicitly.
- Do not turn read models, caches, telemetry, or external-provider data into canonical domain state without an explicit decision.

### Unresolved Decision Rule

An unresolved architecture decision must remain visible.

Agents must not resolve an open decision by silently choosing:

- A provider.
- A database or ORM.
- An authentication strategy.
- A payment processor.
- A messaging/notification transport.
- A map/geocoding provider.
- A file/media storage provider.
- A search engine.
- A queue/event infrastructure.
- A schema or lifecycle that has not been approved.

When implementation requires one of these decisions, stop at the relevant boundary and report the decision required.

### Architecture Definition of Done

The architecture phase is considered structurally complete when:

- System layers and dependency direction are documented.
- Modular Monolith strategy is explicit.
- Core module boundaries are documented.
- Backend/API boundaries are documented.
- Persistence and data ownership rules are documented.
- AI Gateway and trust boundary are documented.
- Property / Listings boundary is documented.
- Authentication / Authorization boundary is documented.
- Messaging / Communication boundary is documented.
- Notifications boundary is documented.
- Payments / Transactions boundary is documented.
- Maps / Location boundary is documented.
- Files / Media boundary is documented.
- Search / Discovery boundary is documented.
- Observability / Audit boundary is documented.
- Remaining open decisions are explicitly preserved.

### Handoff to Implementation

Future implementation work must treat this architecture as the boundary contract.

Implementation may establish concrete technology choices only when they are explicitly decided in the relevant architecture/data/security/design work.

If a task crosses an unresolved boundary, the agent must:

1. Identify the boundary.
2. State the missing decision.
3. Avoid speculative implementation.
4. Continue only with work that does not require the unresolved decision.

### Final Audit Status

**Architecture boundary map: COMPLETE.**

**Implementation readiness: CONDITIONAL.**

The boundaries are documented, but several concrete technology/domain decisions remain intentionally open.

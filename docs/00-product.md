# 00 — Product

## Purpose

Define the product identity, mission, scope, priorities, and decision principles of Baroj.

This document is the primary product source of truth for humans and AI agents. Product decisions must remain consistent with this document unless an explicitly approved project decision supersedes it.

## Product Identity

- **Name:** Baroj
- **Category:** AI-powered real estate platform
- **Positioning:** A trusted, AI-first operating layer for real-estate discovery, decision support, communication, and operations.

## Vision

Build a trusted intelligent operating system for the real-estate ecosystem by combining useful AI, human judgment, reliable information, and exceptional user experience.

## Mission

Help buyers, sellers, agents, agencies, and administrators make faster, safer, and more confident property decisions and workflows.

## Product Principles

1. **Trust before growth.** Never sacrifice user trust for short-term metrics.
2. **AI augments judgment.** AI assists people; users retain control over consequential decisions.
3. **Clarity over feature volume.** Every feature must have a clear user outcome.
4. **Performance is a feature.** Speed, stability, and responsiveness are product quality attributes.
5. **Consistency compounds.** Product, UX, brand, architecture, and implementation must reinforce one another.
6. **Evidence over assumption.** Prefer verified product data and observed user needs over speculation.
7. **Progressive complexity.** Start simple and expose advanced capabilities when they become useful.

## Target Users

Primary user groups:

- Buyers
- Sellers
- Real-estate agents
- Agencies
- Administrators

The needs of each group may differ. Do not assume one workflow or motivation applies to all users.

## Core Product Areas

Current product scope includes:

- Property discovery
- Search and filtering
- AI-assisted search and decision support
- AI assistant experiences
- Real-estate CRM workflows
- Analytics and operational insights

Additional capabilities must be explicitly defined before being treated as core product scope.

## In Scope

- Property discovery and evaluation
- AI-assisted real-estate workflows
- User and agent productivity
- CRM and operational workflows
- Analytics and decision support
- Trust, verification, and transparency experiences

## Out of Scope

Unless a future product decision explicitly changes the boundary:

- Banking services
- Mortgage processing as a financial institution
- Legal representation
- Fabricated verification or financial guarantees

## Product Quality Priorities

When trade-offs are required, prioritize:

1. User safety and trust
2. Correctness and data integrity
3. Core task completion
4. Accessibility
5. Performance
6. Maintainability
7. Visual polish
8. Secondary feature breadth

Do not optimize a lower-priority dimension by materially damaging a higher-priority one.

## Success Signals

Baroj should measure product quality through signals such as:

- User trust
- Core-task completion
- Time to useful outcome
- AI usefulness and correction rate
- Retention
- Performance and reliability
- Data quality
- Support burden

Metrics must be interpreted in context. A higher conversion rate is not automatically a product improvement if trust or user outcomes decline.

## Product Decision Rules

Before adding a feature, ask:

1. What user problem does it solve?
2. Which user group needs it?
3. What is the expected outcome?
4. What evidence supports the need?
5. What is the smallest useful version?
6. What trust, privacy, accessibility, or safety risks exist?
7. How will success be measured?

Avoid building features only because they are technically interesting or common in competing products.

## AI Product Rules

Baroj AI must:

- Support user goals rather than create unnecessary interaction.
- Distinguish facts, retrieved information, estimates, recommendations, and generated content.
- Communicate meaningful uncertainty.
- Never fabricate property data, prices, availability, verification, actions, or sources.
- Preserve user control over consequential decisions.
- Prefer transparent assistance over opaque automation when stakes are high.
- Escalate or request clarification when ambiguity can materially change an outcome.

## Source-of-Truth Priority

When product-related instructions conflict, use this order:

1. Explicit approved product decisions
2. `00-product.md`
3. `04-ux-rules.md`
4. `02-design-system.md`
5. `01-brand.md`
6. `03-user-psychology.md`
7. Architecture and implementation documents
8. Existing code patterns
9. AI assumptions

A lower-priority source must not silently override a higher-priority product constraint.

## AI Instructions

Before implementing a product feature, an AI agent must:

1. Read this document.
2. Identify the user and intended outcome.
3. Check the relevant Brain documents.
4. Inspect existing implementation before proposing new patterns.
5. Keep the change within the requested scope.
6. Avoid inventing product requirements.
7. Flag material ambiguity rather than guessing.
8. Validate the implementation against the stated product outcome.

AI agents must not treat the absence of documentation as permission to invent a product decision.

## Cross References

- `01-brand.md`
- `02-design-system.md`
- `03-user-psychology.md`
- `04-ux-rules.md`
- `05-architecture.md`
- `06-frontend.md`

## Version

**Version:** Production V1  
**Status:** Active  
**Owner:** Baroj Core Team  
**Last Updated:** 2026-08-16
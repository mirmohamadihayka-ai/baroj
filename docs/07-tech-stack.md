# 07 — Tech Stack

## Purpose

Define the approved Baroj technology choices and the rules for introducing, replacing, or extending technologies.

This document is a decision guide for developers and AI coding agents. Exact versions must follow the repository lockfile and supported stable releases rather than being invented here.

## Principles

1. Prefer stable, well-supported technology.
2. Prefer the existing repository stack over new alternatives.
3. Minimize dependencies and overlapping tools.
4. Prefer type safety and explicit contracts.
5. Prefer platform-native capabilities when they are sufficient.
6. Do not adopt technology solely because it is fashionable.
7. Major stack changes require an explicit architectural decision.

## Standards

| Area | Baroj Standard |
|---|---|
| Language | TypeScript, strict mode |
| Web framework | Next.js with App Router |
| UI | React |
| Styling | Tailwind CSS + project design tokens |
| UI primitives | shadcn/ui where appropriate |
| Icons | Lucide React where appropriate |
| Validation | Zod at untrusted boundaries |
| Forms | React Hook Form when form complexity justifies it |
| Server/client data | Framework-native server patterns; TanStack Query when client caching is actually required |
| State | Local state first; Zustand only for justified shared client state |
| Database | PostgreSQL |
| ORM/data layer | Use the repository's established ORM/data access layer; do not introduce a second ORM without approval |
| API | Typed, documented HTTP APIs using the established application boundary |
| Testing | Vitest, React Testing Library, Playwright when configured |
| Package manager | Follow the repository lockfile and package-manager configuration |
| Deployment | Vercel when consistent with the project deployment configuration |
| Observability | Sentry when configured |
| Product analytics | PostHog when configured and privacy-approved |

## AI and External Services

AI providers and external services must be accessed through Baroj-owned integration boundaries rather than scattered directly across UI components.

Rules:

- Keep provider-specific code isolated.
- Never expose provider secrets to the client.
- Validate structured model output before using it as trusted application data.
- Add provider fallbacks only when an explicit product or architecture decision requires them.
- Log safely without exposing prompts, secrets, personal data, or sensitive property information.

## Versioning

- Use the versions already declared by the repository.
- Update dependencies deliberately, not opportunistically.
- Check framework compatibility before upgrading major versions.
- Regenerate lockfiles through the configured package manager.
- Do not manually invent version numbers in source code or documentation.

## Dependency Rules

Before adding a package:

1. Search the repository for an existing solution.
2. Confirm the responsibility is not already owned by another library.
3. Evaluate maintenance, security, license, bundle, and runtime impact.
4. Prefer a narrowly scoped dependency.
5. Update documentation when the dependency changes an architectural decision.

## Forbidden Patterns

Do not:

- Introduce multiple libraries for the same responsibility.
- Replace an approved tool without an explicit decision.
- Put provider-specific logic throughout the application.
- Add a dependency for trivial functionality already available in the platform or existing stack.
- Hardcode secrets or environment-specific configuration.

## AI Instructions

When implementing a task:

1. Inspect `package.json`, lockfile, configuration, and existing imports first.
2. Treat the installed repository versions as authoritative.
3. Reuse existing libraries and patterns.
4. Do not upgrade dependencies as part of an unrelated task.
5. If a requested technology conflicts with this document, identify the conflict before implementation.
6. If a new dependency is necessary, explain its ownership and why existing tools are insufficient.

When documentation and the actual repository configuration disagree, the repository configuration is the implementation source of truth until the Brain is intentionally updated.

## Cross References

- `05-architecture.md`
- `05-folder-structure.md`
- `06-coding-rules.md`
- `08-components.md`
- `09-ai-rules.md`

## Version

**Version:** Production V1  
**Status:** Active  
**Owner:** Baroj Core Team  
**Last Updated:** 2026-08-16

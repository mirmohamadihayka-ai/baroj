# 11 — Roadmap

## Purpose

Define how Baroj turns product strategy into an ordered, traceable delivery plan.

The roadmap is a planning source of truth, not a substitute for implementation requirements.

## Principles

1. User and business value drive priority.
2. Dependencies and risk affect sequencing.
3. The roadmap is directional and must remain adaptable.
4. Completed work is verified, not assumed.
5. Avoid promising dates without sufficient evidence.
6. Keep near-term planning detailed and long-term planning outcome-focused.

## Planning Model

Baroj planning uses four horizons:

| Horizon | Detail | Purpose |
|---|---|---|
| Now | High | Active work and immediate blockers |
| Next | Medium | Validated upcoming work |
| Later | Low | Directional priorities |
| Future | Very low | Ideas and strategic possibilities |

## Prioritization

Evaluate candidate work using:

- User impact
- Business impact
- Strategic alignment
- Technical dependency
- Risk reduction
- Effort/complexity
- Confidence

Do not prioritize solely by effort or feature popularity.

## Work Item IDs

Use stable IDs for traceability:

```text
FEAT-###  Feature
EPIC-###  Epic
TECH-###  Technical work
BUG-###   Bug
AI-###    AI capability
```

IDs should remain stable when titles change.

## Roadmap Item Contract

Each meaningful roadmap item should contain:

- ID
- Name
- Outcome
- Priority
- Status
- Dependencies
- Owner when applicable
- Success criteria
- Relevant Brain references

## Status Model

```text
IDEA
→ DISCOVERY
→ READY
→ IN PROGRESS
→ VALIDATION
→ RELEASED
→ OBSERVING
→ DONE
```

Use `BLOCKED` when progress cannot continue because of a concrete dependency or decision.

## Dependency Rules

Before starting a roadmap item:

1. Identify technical and product dependencies.
2. Confirm required architecture exists or is explicitly planned.
3. Resolve high-impact blockers.
4. Avoid starting downstream work when its contract is unstable.

## Change Management

Roadmap changes are expected when new evidence appears.

When priorities change:

- Preserve stable IDs.
- Record material scope changes.
- Do not silently invalidate active work.
- Update affected Linear/GitHub planning artifacts when those systems are in use.

## AI Instructions

AI agents must treat the roadmap as planning context, not permission to implement every listed item.

Before implementation:

- Confirm the task is explicitly requested or marked ready.
- Read the related feature specification.
- Check dependencies and acceptance criteria.
- Do not infer unapproved future functionality from roadmap items.

AI agents must never implement a roadmap item solely because it appears in this document.

## Definition of Done

A roadmap item may be marked complete only when its defined outcome and acceptance criteria are verified and the relevant implementation/documentation is synchronized.

## Cross References

- `00-product.md`
- `10-features.md`
- `12-baroj-brain.md`
- `14-prompts.md`

## Version

**Version:** Production V1  
**Status:** Active  
**Owner:** Baroj Core Team  
**Last Updated:** 2026-08-16

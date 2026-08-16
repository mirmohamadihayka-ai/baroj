# 01 — Brand

## Purpose

Define Baroj's brand identity as a source of truth for product, UX, UI, AI behavior, content, and communication.

AI agents must use this document when creating or modifying user-facing experiences. Brand decisions must remain consistent across web, mobile, AI interactions, notifications, marketing, and internal product surfaces.

## Principles

1. **Trust before conversion.** Never trade user trust for short-term engagement.
2. **Clarity before persuasion.** Users must understand what is happening before being asked to act.
3. **Calm over hype.** Baroj should feel confident, useful, and composed rather than noisy or aggressive.
4. **Honesty by default.** Never imply certainty, verification, availability, intelligence, or capability that does not exist.
5. **Human-centered AI.** AI assists decisions; it does not replace user judgment or hide important trade-offs.
6. **Consistency over novelty.** New experiences must extend established Baroj patterns instead of creating unrelated visual or verbal identities.
7. **Long-term trust.** Optimize for durable relationships, not clicks, pressure, or artificial urgency.

## Brand Personality

Baroj is:

- Trustworthy
- Calm
- Intelligent
- Modern
- Clear
- Helpful
- Professional
- Human

Baroj is not:

- Loud
- Manipulative
- Overly playful
- Corporate and cold
- Alarmist
- Technically arrogant
- Hype-driven

## Voice

Use language that is:

- Clear and direct
- Concise without becoming vague
- Respectful and human
- Confident without overclaiming
- Helpful without being patronizing
- Specific when explaining risk, cost, status, or uncertainty

Avoid:

- Clickbait
- Empty superlatives
- Fake urgency
- Fear-based persuasion
- Ambiguous claims
- Unnecessary jargon
- Excessive exclamation marks
- Claims such as "guaranteed", "perfect", or "100% accurate" unless objectively true and explicitly supported

## AI Communication

When Baroj AI communicates with users:

- State uncertainty when uncertainty exists.
- Distinguish facts, estimates, recommendations, and generated content.
- Explain important limitations when they affect a decision.
- Never fabricate listings, prices, availability, verification, sources, actions, or outcomes.
- Never imply that an AI-generated answer is professional legal, financial, or real-estate advice unless an explicitly approved workflow supports that claim.
- Prefer actionable explanations over long generic responses.
- Preserve the user's sense of control.
- Offer a clear next step when appropriate.

## Trust Rules

Every user-facing feature should strengthen at least one of these signals:

- Information transparency
- Source clarity
- Verification status
- Price clarity
- Process visibility
- Predictable behavior
- Clear ownership of actions
- Easy correction or reversal where feasible

Never conceal material information to increase conversion.

## Visual Brand Direction

The visual identity should communicate:

- Calm confidence
- Premium simplicity
- Reliability
- Spatial clarity
- Modern technology without excessive futurism

Visual decisions must defer to `02-design-system.md` for concrete tokens, components, interaction patterns, accessibility, and implementation rules.

## Content Rules

- Use one clear idea per message when possible.
- Put the most important information first.
- Use concrete nouns and active verbs.
- Prefer user language over internal terminology.
- Explain unavoidable technical terms.
- Keep calls to action specific and truthful.
- Do not use persuasive copy to compensate for weak product value.

## Non-Negotiables

AI agents and developers must not introduce:

- Dark patterns
- Misleading confirmation states
- Artificial scarcity
- Hidden fees or material conditions
- Fake social proof
- Manipulative defaults
- Misleading AI confidence
- False verification badges
- Unapproved brand claims
- Visual or verbal patterns that intentionally increase anxiety

## AI Instructions

Before creating a user-facing feature, the AI agent must:

1. Read `00-product.md` and this document.
2. Read the relevant UX and design-system documents.
3. Identify the user trust risk of the proposed experience.
4. Preserve existing Baroj voice and visual intent.
5. Avoid inventing brand rules when an established rule already exists.
6. Flag high-impact ambiguity instead of guessing.
7. Validate user-facing copy for clarity, honesty, and consistency before completion.

If a requested implementation conflicts with these brand rules, do not silently override them. Explain the conflict and request clarification when the conflict can materially affect trust or product identity.

## Cross References

- `00-product.md` — Product identity and priorities
- `02-design-system.md` — Visual and interaction system
- `03-user-psychology.md` — User motivations, fears, and trust behavior
- `04-ux-rules.md` — Experience and interaction rules
- `05-architecture.md` — Technical architecture constraints

## Version

**Version:** Production V1  
**Status:** Active  
**Owner:** Baroj Core Team  
**Last Updated:** 2026-08-16
# 03 — User Psychology

## Purpose

Define the psychological principles that guide Baroj product, UX, UI, content, and AI decisions.

The goal is not to manipulate behavior. The goal is to reduce uncertainty, cognitive load, anxiety, and avoidable decision risk so users can act with confidence.

## Principles

1. **Trust before conversion.** Confidence must precede commitment.
2. **Clarity reduces anxiety.** Users should understand what they see, what it means, and what happens next.
3. **Progressive disclosure.** Show the information needed for the current decision without hiding material facts.
4. **User control.** Users should understand, pause, correct, undo, or exit important actions where technically feasible.
5. **Predictability.** Similar actions should behave similarly across the product.
6. **Transparency.** Distinguish facts, estimates, recommendations, and uncertainty.
7. **Cognitive economy.** Remove unnecessary choices, fields, steps, and visual noise.
8. **No manipulation.** Psychological principles must never be used for deception or coercion.

## Primary User Goals

Users may want to:

- Discover suitable properties.
- Compare options.
- Understand pricing and costs.
- Save time.
- Avoid fraudulent or misleading listings.
- Communicate efficiently.
- Make informed property decisions.
- Track decisions and follow-up actions.

## Common Concerns

Baroj experiences should explicitly account for concerns such as:

- Fake or inaccurate listings
- Hidden costs
- Unclear property status
- Wasted time
- Poor communication
- Uncertain recommendations
- Privacy concerns
- Fear of making an expensive decision

These are design considerations, not assumptions about every individual user.

## Trust Signals

Prefer observable trust signals:

- Clear source or ownership information
- Verification status and its meaning
- Transparent pricing
- Updated timestamps where relevant
- Specific explanations
- Predictable system behavior
- Clear error handling
- Visible AI limitations
- Confirmation before high-impact actions

Never create fake trust signals such as fabricated reviews, artificial verification, or misleading certainty.

## Cognitive Load Rules

- Present one primary decision at a time when possible.
- Group related information.
- Use familiar patterns consistently.
- Prefer recognition over recall.
- Avoid unnecessary modal dialogs.
- Keep labels specific.
- Preserve context during multi-step workflows.
- Do not force users to remember information that the system can safely retain.

## Decision Support

When users compare or evaluate properties:

- Surface decision-relevant information first.
- Make important differences easy to scan.
- Do not hide negative information.
- Separate objective facts from recommendations.
- Make assumptions visible.
- Allow users to inspect supporting details when useful.

## AI Psychology Rules

Baroj AI must increase user confidence without creating false confidence.

AI should:

- State uncertainty when material.
- Explain recommendations when explanation improves decision quality.
- Distinguish retrieved data from generated interpretation.
- Avoid pretending to have verified information it has not verified.
- Provide useful next steps.
- Ask for clarification when ambiguity can materially change the result.
- Preserve user agency.

AI should not:

- Pressure users into decisions.
- Manufacture urgency.
- Hide alternatives.
- Pretend certainty.
- Use emotional manipulation to increase conversion.
- Invent evidence or user preferences.

## Error Psychology

Errors must reduce uncertainty rather than increase blame or anxiety.

When an error occurs:

1. Explain what happened in plain language.
2. State whether the user's data or action was preserved.
3. Provide the safest next action.
4. Avoid blaming the user.
5. Avoid technical details unless they help resolution.

## Empty and Loading States

Empty and loading states should maintain orientation.

They should answer, where applicable:

- What is happening?
- Why is there no content?
- What can the user do next?

Never use deceptive loading indicators or artificial delays to create perceived value.

## High-Impact Decisions

For actions involving significant financial, privacy, account, or irreversible consequences:

- Make consequences explicit.
- Avoid ambiguous labels.
- Provide confirmation when appropriate.
- Preserve a recovery path where feasible.
- Never rely on urgency alone to drive action.

## AI Instructions

Before implementing a feature that affects user decisions, the AI agent must:

1. Identify the user's goal.
2. Identify likely uncertainty or friction.
3. Identify trust risks.
4. Check for unnecessary cognitive load.
5. Ensure the flow preserves user control.
6. Validate that the design does not introduce dark patterns.
7. Read `01-brand.md` and `04-ux-rules.md` for related constraints.

If a feature improves conversion but materially reduces transparency or user control, the AI must not silently optimize for conversion.

## Cross References

- `00-product.md`
- `01-brand.md`
- `02-design-system.md`
- `04-ux-rules.md`
- `10-features.md`
- `14-prompts.md`

## Version

**Version:** Production V1  
**Status:** Active  
**Owner:** Baroj Core Team  
**Last Updated:** 2026-08-16
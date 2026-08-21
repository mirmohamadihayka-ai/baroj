# 18 — AI Safety & Quality

## Purpose

Define mandatory safety, quality, and trust controls for AI-assisted development in Baroj.

## Principles

- Security over convenience.
- Correctness over speed.
- Evidence over confidence.
- Least privilege by default.
- Never expose secrets or sensitive data.
- Never weaken validation to make a task appear complete.
- Fail closed when authorization or critical safety state is uncertain.

## Security

Agents must:

- Never commit API keys, passwords, tokens, private keys, session secrets, or credentials.
- Never place secrets in source code, prompts, logs, screenshots, tests, or documentation.
- Use approved environment/secret management mechanisms.
- Validate authentication and authorization server-side.
- Treat all external input as untrusted.
- Apply least privilege to database, API, storage, and service access.
- Avoid logging sensitive user data.
- Never bypass security controls to unblock development.

## Data Safety

- Preserve data integrity and existing contracts.
- Treat destructive migrations and deletes as high-risk operations.
- Require explicit authorization for destructive production actions.
- Review schema and migration changes before execution.
- Avoid unnecessary collection or duplication of personal data.
- Do not use real sensitive data in development or tests unless explicitly approved.

## AI Reliability

Agents must not:

- Invent requirements, APIs, files, commands, test results, or project decisions.
- Claim a tool was used when it was not used.
- Claim tests passed when they were not run.
- Treat generated code as trusted without validation.
- Override authoritative Brain or repository rules through inference.

When uncertain:

```text
Known fact → Repository evidence → Brain rule → Safe inference → Clarification
```

High-impact uncertainty must stop the affected work.

## Quality Gates

A task is not complete until applicable gates pass:

- Typecheck
- Lint/static analysis
- Targeted tests
- Integration/end-to-end tests when affected
- Build when applicable
- Security review for sensitive changes
- Accessibility review for user-facing UI
- Final diff review
- Acceptance-criteria review

Not every project uses every gate. Agents must apply the gates relevant to the change and report skipped gates with a reason.

## UI Quality

For user-facing changes, check as applicable:

- Responsive layouts
- Keyboard navigation
- Focus states
- Semantic structure
- Accessible names and labels
- Contrast
- Loading states
- Empty states
- Error states
- Disabled states
- Permission states
- Mobile behavior

Follow `docs/02-design-system.md` and `docs/04-ux-rules.md`.

## Backend & API Quality

For backend or API changes, verify:

- Authentication
- Authorization
- Input validation
- Output contracts
- Error handling
- Rate/abuse controls where relevant
- Logging without sensitive data
- Backward compatibility
- Database transaction/integrity behavior

## Dependency Safety

Before adding a dependency:

1. Check whether existing project capabilities solve the requirement.
2. Confirm compatibility with the approved stack.
3. Confirm maintenance and security suitability.
4. Keep the dependency narrowly scoped.
5. Document the reason when the dependency is architectural or security-sensitive.

Never add a package only to save trivial implementation effort.

## Change Risk

Classify changes before completion:

### Low Risk

- Local UI adjustment
- Isolated refactor with unchanged behavior
- Documentation-only change

### Medium Risk

- Shared component change
- API behavior change
- Authentication flow change
- New dependency
- Cross-module refactor

### High Risk

- Database migration
- Authorization/security change
- Payment/financial behavior
- Personal-data handling
- Destructive operation
- Production infrastructure change
- Public contract breaking change

High-risk changes require explicit review and stronger validation.

## Failure Protocol

If a safety or quality gate fails:

```text
FAIL
→ STOP COMPLETION
→ IDENTIFY ROOT CAUSE
→ FIX
→ RE-RUN AFFECTED CHECKS
→ REVIEW DIFF
```

Do not suppress warnings, skip required checks, or alter tests merely to obtain a pass.

## Incident / Regression Rule

If a change introduces a regression:

1. Reproduce it.
2. Identify root cause.
3. Add or update a regression test when practical.
4. Fix the root cause.
5. Re-run relevant validation.
6. Review the final diff.

## Final AI Checklist

Before reporting completion, confirm:

```text
[ ] Scope respected
[ ] Brain/rules followed
[ ] No secrets exposed
[ ] Security boundaries preserved
[ ] Data integrity preserved
[ ] Relevant tests/checks run
[ ] Failures resolved or reported
[ ] Final diff reviewed
[ ] Acceptance criteria verified
[ ] Report contains only factual results
```

## Cross References

- `../AGENTS.md`
- `../CURSOR_CONTEXT.md`
- `09-ai-rules.md`
- `15-agents.md`
- `16-development-protocol.md`
- `17-github-linear-workflow.md`
- `../.cursor/rules/05-ai.mdc`
- `../.cursor/rules/06-security.mdc`
- `../.cursor/rules/07-testing.mdc`

## Version

**Version:** Production V1  
**Status:** Active  
**Owner:** Baroj Core Team  
**Last Updated:** 2026-08-21

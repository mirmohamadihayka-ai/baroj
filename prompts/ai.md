# AI Task Prompt

## Task
- Task ID: `AI-XXX`
- Objective: [AI capability]
- User Value: [specific user outcome]
- Relevant Brain: `09-ai-rules.md`, `12-baroj-brain.md`, `13-memory.md`, `14-prompts.md`, `15-agents.md`
- Scope: [models/prompts/tools/data/UX]
- Risk Level: [low/medium/high]

## Requirements
- Treat model output as untrusted.
- Define typed input/output contracts and failure/fallback behavior.
- Never allow model output to bypass authorization or business rules.
- Protect secrets, private context, and unauthorized user data.
- Preserve user control over consequential actions.
- Prefer deterministic validation around model output.

## Execution
1. Inspect existing AI patterns and memory boundaries.
2. Define input, output, failure, and safety contracts.
3. Implement with existing infrastructure.
4. Add deterministic validation and targeted tests.
5. Validate failure and abuse cases.
6. Review privacy, security, cost, and final diff.

## Acceptance Criteria
- [ ] AI behavior is bounded and testable.
- [ ] Unauthorized actions/data exposure are prevented.
- [ ] Fallback behavior is explicit.
- [ ] Relevant safety and regression checks are complete.
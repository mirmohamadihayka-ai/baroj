# Bug Fix Task Prompt

## Task
- Task ID: `BUG-XXX`
- Problem: [observable incorrect behavior]
- Expected: [correct behavior]
- Reproduction: [steps or evidence]
- Relevant Brain: [applicable docs]
- Scope: [affected area]

## Execution
1. Reproduce or inspect the reported failure.
2. Identify the root cause before editing.
3. Implement the smallest correct fix.
4. Add a regression test when practical.
5. Run relevant validation.
6. Review the diff for unintended behavior.

## Rules
- Do not mask symptoms when the root cause is identifiable.
- Do not refactor unrelated code.
- Preserve public behavior outside the bug scope.
- Never claim reproduction or validation unless performed.

## Acceptance Criteria
- [ ] Root cause addressed.
- [ ] Reported behavior is corrected.
- [ ] Regression risk is covered.
- [ ] Relevant checks pass or limitations are reported.
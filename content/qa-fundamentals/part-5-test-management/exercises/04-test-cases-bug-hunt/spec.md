# Exercise 04 — Spec

## Grader config

```yaml
grader: test-catches-bug
submissionFile: test-cases.yaml
options:
  answerKey: answer-key/planted-bugs.yaml
  minSubmittedCases: 40
  minCaughtBugs: 25
```

## Detailed requirements

1. The submission file is `test-cases.yaml` in the `starter/` directory.
2. The file must contain a `test_cases` list with at least 40 entries.
3. Each entry must have: `id`, `title`, `steps` (list with at least one action), and `expected_result`.
4. The grader converts each test case to a Playwright script and runs it against the buggy staging app.
5. A test case "catches" a bug when its assertion fails against the buggy app (meaning the bug triggered the assertion).
6. Pass requires at least 25 of the 30 planted bugs to be caught across the submitted test cases.

## Grader notes

The `test-catches-bug` grader:

1. Parses `test-cases.yaml` — rejects files with fewer than 40 cases.
2. For each test case, generates a Playwright script from the `steps` list using the action→Playwright mapping.
3. Runs each script against the staging app.
4. Matches failing assertions to planted bugs using `signatureKeywords` + `keywordThreshold` from `planted-bugs.yaml`.
5. Reports: total cases submitted, total bugs caught, which bugs were caught, which were missed.

### Action mapping

| action | Playwright call |
|--------|----------------|
| navigate | `page.goto(url)` |
| fill | `page.fill(selector, value)` |
| click | `page.click(selector)` |
| assert_visible | `expect(page.locator(selector)).toBeVisible()` |
| assert_text | `expect(page.locator(selector)).toContainText(value)` |
| assert_not_visible | `expect(page.locator(selector)).not.toBeVisible()` |
| assert_count | `expect(page.locator(selector)).toHaveCount(value)` |

### Common failure pattern

Learners who write only happy-path tests catch fewer than 25 bugs because bugs 1–15 (UI validation + workflow) require negative and boundary test cases. A learner who never tests empty inputs, oversized inputs, or multi-step state transitions will miss most of those bugs.

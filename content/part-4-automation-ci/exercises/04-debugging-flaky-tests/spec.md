# Exercise 04 — Spec

## Grader config

```yaml
grader: script-runs
submissionFile: run-stability-check.js
options:
  scriptType: node
  expectedExitCode: 0
  requiredOutputPatterns:
    - "PASS"
```

## How the stability check works

`run-stability-check.js` (provided in starter, not edited by learner):

1. Discovers all `tests/flaky-N-*.spec.ts` files (expects 5).
2. Runs each file with `npx playwright test <file> --reporter=line` exactly **3 times**.
3. Marks a test "STABLE" only if it passes all 3 runs.
4. Exits 0 (PASS) if `stableCount >= 4`; exits 1 (FAIL) otherwise.

The grader runs `node run-stability-check.js` from the `starter/` directory, with `PLAYWRIGHT_BASE_URL` pointing to the staging environment.

## Flaky patterns and expected fixes

| File | Root cause | Canonical fix |
|------|-----------|---------------|
| `flaky-01-hardcoded-timeout.spec.ts` | `waitForTimeout(500)` | `await expect(button).toBeEnabled()` |
| `flaky-02-element-handle.spec.ts` | `page.$()` stale ElementHandle | `page.locator(selector).first()` |
| `flaky-03-no-await-navigation.spec.ts` | `page.url()` read before navigation | `await expect(page).toHaveURL(pattern)` |
| `flaky-04-immediate-assertion.spec.ts` | `.textContent()` before toast appears | `await expect(locator).toContainText(...)` |
| `flaky-05-shared-state.spec.ts` | Test 2 depends on Test 1's data | `test.beforeEach` creates own prerequisite |

## Pass threshold

4 of 5 tests stable (i.e., one test may remain flaky after fixes — this models real-world situations where a test is hard to de-flake).

## Additional deliverable

`REFLECTION.md` is not graded by the stability checker but should be reviewed manually. Check that each of the 5 entries names the root cause and describes the fix.

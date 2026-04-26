# Exercise 04 — Debugging Flaky Tests

**Time:** ~45 minutes
**Grader:** script-runs (Node stability-check runner)
**Pass threshold:** 4 of 5 flaky tests pass all 3 consecutive runs

## Your mission

You have 5 broken Playwright test files in `starter/tests/`. Each one is flaky for a different reason. Your job:

1. Read the comment block at the top of each file — it explains the root cause.
2. Fix the test so it is reliable.
3. Run the stability checker to confirm your fix holds up over 3 back-to-back runs.

## The 5 flaky patterns

| File | Flakiness cause |
|------|----------------|
| `flaky-01-hardcoded-timeout.spec.ts` | `waitForTimeout(N)` is a timing guess, not a condition |
| `flaky-02-element-handle.spec.ts` | `page.$()` returns a stale ElementHandle after DOM re-render |
| `flaky-03-no-await-navigation.spec.ts` | URL asserted before navigation completes |
| `flaky-04-immediate-assertion.spec.ts` | Toast read immediately after click, before API responds |
| `flaky-05-shared-state.spec.ts` | Test 2 depends on Test 1 having run in the same worker |

## Fix strategy

Almost all flaky tests are fixed the same way: **replace the timing guess with a condition**.

- `waitForTimeout(N)` → `await expect(locator).toBeEnabled()` (or `toBeVisible()`)
- `page.$()` (eager ElementHandle) → `page.locator()` (lazy, re-queried each action)
- `page.url()` bare read → `await expect(page).toHaveURL(pattern)`
- `.textContent()` one-shot → `await expect(locator).toContainText('...')`
- Shared state → `test.beforeEach` that creates its own data

## How to test locally

```bash
# From the starter/ folder:
node run-stability-check.js
```

The checker runs each of the 5 test files **3 times in a row**. A test is "stable" when it passes all 3 runs. The grader runs this same script.

## Additional deliverable

Fill in `REFLECTION.md` with a brief note for each test: what was wrong and what you changed. This is not graded automatically, but it reinforces the learning and is reviewed manually.

## Pass condition

`run-stability-check.js` exits 0 with "PASS" in its output. At least 4 of 5 tests must pass all 3 runs.

# Starter — Exercise 04: Debugging Flaky Tests

You have 5 flaky test files. Fix them so each passes 3 consecutive runs.

## Step-by-step

1. Open `tests/flaky-01-hardcoded-timeout.spec.ts`. Read the comment block.
   - The `waitForTimeout(500)` is the problem. Replace it with a condition-based wait.
   - Fix: `await expect(page.getByRole('button', { name: 'Create Task' })).toBeEnabled();`

2. Open `tests/flaky-02-element-handle.spec.ts`. Read the comment block.
   - `page.$()` (ElementHandle) goes stale after React re-renders.
   - Fix: change `await page.$('...')` to `page.locator('...')` — no `await`, no `!`.

3. Open `tests/flaky-03-no-await-navigation.spec.ts`. Read the comment block.
   - `page.url()` is read before navigation finishes.
   - Fix: `await expect(page).toHaveURL(/\/tasks\/new/);`

4. Open `tests/flaky-04-immediate-assertion.spec.ts`. Read the comment block.
   - `.textContent()` fires before the toast appears.
   - Fix: `await expect(page.getByRole('status')).toContainText('Task created');`

5. Open `tests/flaky-05-shared-state.spec.ts`. Read the comment block.
   - Test 2 relies on Test 1 having created a task.
   - Fix: add `test.beforeEach` that creates the "Buy groceries" task.

## Run the stability checker locally

```bash
# From this directory (starter/):
node run-stability-check.js
```

Expected output when all 5 are fixed:
```
Stability check: 5 tests × 3 runs each

  tests/flaky-01-...: 3/3 runs passed  [STABLE ✓]
  tests/flaky-02-...: 3/3 runs passed  [STABLE ✓]
  tests/flaky-03-...: 3/3 runs passed  [STABLE ✓]
  tests/flaky-04-...: 3/3 runs passed  [STABLE ✓]
  tests/flaky-05-...: 3/3 runs passed  [STABLE ✓]

Result: 5/5 stable (need 4)
PASS
```

## Also fill in REFLECTION.md

For each of the 5 tests, write one short paragraph: what made it flaky and what you changed. Not graded automatically, but reviewed manually.

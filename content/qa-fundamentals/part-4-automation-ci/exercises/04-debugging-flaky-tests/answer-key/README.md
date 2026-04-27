# Answer Key — Exercise 04: Debugging Flaky Tests

## Grader config (authoritative)

```yaml
grader: script-runs
submissionFile: run-stability-check.js
options:
  scriptType: node
  expectedExitCode: 0
  requiredOutputPatterns:
    - "PASS"
```

## How grading works

The grader runs `node run-stability-check.js` from `starter/`. The script:
1. Finds all 5 `tests/flaky-N-*.spec.ts` files.
2. Runs each 3× via `npx playwright test`.
3. Exits 0 if ≥4 pass all 3 runs, exits 1 otherwise.

The grader supplies `PLAYWRIGHT_BASE_URL`. Tests that still have the bug should fail at least one of the 3 runs.

## Reference fixes (staff only)

**flaky-01:** Remove `await page.waitForTimeout(500);`. Add before the `.click()`:
```typescript
await expect(page.getByRole('button', { name: 'Create Task' })).toBeEnabled();
```

**flaky-02:** Change `const checkbox = await page.$('[data-testid="task-checkbox"]:first-child');` to:
```typescript
const checkbox = page.locator('[data-testid="task-checkbox"]').first();
```
Remove the `!` on `checkbox!.click()` — locators don't need null assertions.

**flaky-03:** Replace `expect(page.url()).toContain('/tasks/new');` with:
```typescript
await expect(page).toHaveURL(/\/tasks\/new/);
```

**flaky-04:** Replace the two-line `.textContent()` + `expect` with:
```typescript
await expect(page.getByRole('status')).toContainText('Task created');
```

**flaky-05:** Add before the first test:
```typescript
test.beforeEach(async ({ page }) => {
  await page.goto('/tasks/new');
  await page.getByLabel('Title').fill('Buy groceries');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForURL('**/tasks');
});
```
The first test can be simplified (or removed since beforeEach now creates the task).

## Common failure patterns

- Learner fixes 3 tests but leaves the ElementHandle and shared-state tests unchanged — score 3/5, FAIL.
- Learner replaces `waitForTimeout` with a smaller `waitForTimeout(200)` — still flaky, still fails the 3-run check.
- Learner adds a `beforeEach` that creates data but doesn't clean up — if tests run multiple times, duplicate tasks may cause assertion failures.

import { test, expect } from '@playwright/test';

/**
 * FLAKY TEST 1 — Hardcoded timeout
 *
 * The "Create Task" button renders asynchronously. On a fast machine it
 * appears in ~200ms. On a slow CI runner it can take 800ms. The hardcoded
 * waitForTimeout(500) is a guess — wrong in both directions.
 *
 * Fix: replace waitForTimeout with a condition-based wait so the click
 * only fires when the button is actually ready.
 */
test('can click create task button', async ({ page }) => {
  await page.goto('/tasks');

  // BUG: hardcoded wait — a timing guess, not a real condition
  await page.waitForTimeout(500);

  // TODO: replace the waitForTimeout above with a smart wait, e.g.:
  //   await expect(page.getByRole('button', { name: 'Create Task' })).toBeEnabled();

  await page.getByRole('button', { name: 'Create Task' }).click();
  await expect(page.getByLabel('Task Title')).toBeVisible();
});

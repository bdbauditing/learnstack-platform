import { test, expect } from '@playwright/test';

/**
 * FLAKY TEST 4 — Asserting a toast before it appears
 *
 * After clicking "Save Task", the app sends a POST to the API and shows
 * a success toast when the response arrives. That round-trip takes
 * 200–600ms. Calling .textContent() immediately after .click() reads
 * the DOM before the toast has been inserted — it returns null or
 * the previous content and the assertion fails intermittently.
 *
 * Fix: use a locator assertion (expect(locator).toContainText(...))
 * which keeps retrying until the text appears or the timeout expires.
 */
test('saving a task shows success toast', async ({ page }) => {
  await page.goto('/tasks/new');
  await page.getByLabel('Title').fill('Fix the flaky test');
  await page.getByRole('button', { name: 'Save Task' }).click();

  // BUG: .textContent() is a one-shot read — it fires instantly after
  // the click, before the API responds and the toast is rendered.
  const toast = await page.getByRole('status').textContent();
  expect(toast).toContain('Task created');

  // TODO: replace the two lines above with a retrying assertion:
  //   await expect(page.getByRole('status')).toContainText('Task created');
});

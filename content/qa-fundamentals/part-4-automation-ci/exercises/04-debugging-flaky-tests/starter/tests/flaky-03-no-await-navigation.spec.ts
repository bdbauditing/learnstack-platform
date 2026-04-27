import { test, expect } from '@playwright/test';

/**
 * FLAKY TEST 3 — Asserting page URL without waiting for navigation
 *
 * Clicking a link starts navigation, but navigation is asynchronous.
 * The line after .click() runs immediately — before the browser has
 * actually moved to the new URL. page.url() still returns the old URL
 * about 40% of the time in CI.
 *
 * Fix: wait for the navigation to complete before asserting the URL.
 * Use expect(page).toHaveURL() which retries until it matches, or
 * await page.waitForURL('**/tasks/new') explicitly.
 */
test('clicking New Task navigates to the task form', async ({ page }) => {
  await page.goto('/tasks');

  await page.getByRole('link', { name: 'New Task' }).click();

  // BUG: navigation is async — page.url() may still return '/tasks'
  // because the browser has not finished moving to /tasks/new yet
  expect(page.url()).toContain('/tasks/new');

  // TODO: replace the line above with a retrying assertion:
  //   await expect(page).toHaveURL(/\/tasks\/new/);
  //
  // Or explicitly wait first:
  //   await page.waitForURL('**/tasks/new');
  //   expect(page.url()).toContain('/tasks/new');
});

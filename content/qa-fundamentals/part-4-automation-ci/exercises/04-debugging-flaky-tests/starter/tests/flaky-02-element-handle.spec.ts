import { test, expect } from '@playwright/test';

/**
 * FLAKY TEST 2 — Stale ElementHandle
 *
 * page.$() returns an ElementHandle — a snapshot of the DOM node at
 * query time. When the task list re-renders after the API response
 * arrives, React replaces the DOM nodes. The ElementHandle now points
 * to a detached element. Calling .click() on it throws intermittently:
 *   "Error: element is not attached to the DOM"
 *
 * Fix: use page.locator() instead. Locators are lazy — they re-query
 * the DOM on every action, so they always find the current element.
 */
test('can mark a task complete', async ({ page }) => {
  await page.goto('/tasks');

  // BUG: page.$() grabs a snapshot of the DOM element right now.
  // After the task list re-renders (triggered by the waitForResponse
  // call below), this handle points to a detached node.
  const checkbox = await page.$('[data-testid="task-checkbox"]:first-child');

  // This simulates the async re-render that causes the stale reference.
  await page.waitForResponse('**/api/tasks');

  // BUG: intermittent "element is not attached to the DOM" error here
  await checkbox!.click();

  // TODO: replace page.$() above with page.locator() so the element
  //       is always re-queried before each action, e.g.:
  //   const checkbox = page.locator('[data-testid="task-checkbox"]').first();

  await expect(page.getByText('Completed')).toBeVisible();
});

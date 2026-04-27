import { test, expect } from '@playwright/test';

/**
 * FLAKY TEST 5 — Test order dependency (shared state)
 *
 * The second test ("can delete...") assumes the first test already
 * ran and created the "Buy groceries" task. In Playwright's default
 * configuration, tests within a file run in order — but with --shard,
 * workers, or file isolation this guarantee disappears.
 *
 * Also: if "creates a task" fails, "can delete..." always fails too —
 * a cascade of failures from one root cause.
 *
 * Fix: add a beforeEach that creates the prerequisite task so each
 * test is self-contained and order-independent.
 */

// TODO: add a test.beforeEach block here that:
//   1. Navigates to /tasks/new
//   2. Creates a "Buy groceries" task
//   3. Waits for the list page to load

test('creates a task', async ({ page }) => {
  await page.goto('/tasks');
  await page.getByRole('button', { name: 'New Task' }).click();
  await page.getByLabel('Title').fill('Buy groceries');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Buy groceries')).toBeVisible();
});

// BUG: this test depends on "creates a task" having run successfully
// in the same worker. Remove that dependency with beforeEach.
test('can delete the Buy groceries task', async ({ page }) => {
  await page.goto('/tasks');
  await page.getByText('Buy groceries').click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByText('Buy groceries')).not.toBeVisible();
});

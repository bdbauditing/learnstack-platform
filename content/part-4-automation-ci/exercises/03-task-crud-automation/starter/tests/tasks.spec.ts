import { test, expect } from '@playwright/test';

// Helper: log in before each test that needs an authenticated session.
// TODO: replace with your actual login steps or import a LoginPage POM from Ex02.
async function loginAs(page: any, email: string, password: string) {
  await page.goto('/login');
  // TODO: fill credentials and submit
}

test('creates a new task', async ({ page }) => {
  await loginAs(page, 'user@taskforge.example.com', 'password123');

  // TODO: navigate to the tasks page
  // TODO: click "New Task" or equivalent button
  // TODO: fill in task title
  // TODO: submit the form
  // TODO: assert the new task appears (or a success message is shown)
});

test('task appears in the list', async ({ page }) => {
  await loginAs(page, 'user@taskforge.example.com', 'password123');

  // TODO: navigate to the tasks list
  // TODO: assert a known task title is visible in the list
});

test('can update a task title', async ({ page }) => {
  await loginAs(page, 'user@taskforge.example.com', 'password123');

  // TODO: find a task in the list
  // TODO: click edit or open the task detail
  // TODO: change the title to something new
  // TODO: save the change
  // TODO: assert the new title is now visible
});

test('can delete a task', async ({ page }) => {
  await loginAs(page, 'user@taskforge.example.com', 'password123');

  // TODO: find a task in the list
  // TODO: click delete
  // TODO: confirm deletion if prompted
  // TODO: assert the task is no longer visible in the list
});

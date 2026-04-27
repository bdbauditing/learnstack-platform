import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// TODO: copy your login test from Exercise 02 here and make it pass.
// You need at least 1 test in this file.

test('user can log in', async ({ page }) => {
  const loginPage = new LoginPage(page);
  // TODO: goto, login, assert dashboardHeading is visible
});

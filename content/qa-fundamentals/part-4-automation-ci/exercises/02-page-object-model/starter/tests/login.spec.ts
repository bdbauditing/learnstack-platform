import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('user can log in via page object', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // TODO: call loginPage.goto()
  // TODO: call loginPage.login() with valid credentials
  // TODO: assert loginPage.dashboardHeading is visible
});

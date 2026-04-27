import { test, expect } from '@playwright/test';
import type { Response } from '@playwright/test';

// TODO: copy your security headers test from Exercise 09 here.
// You need at least 1 test in this file.

test('login page includes required security headers', async ({ page }) => {
  let loginResponse: Response | null = null;

  page.on('response', response => {
    // TODO: capture the login page response
  });

  await page.goto('/login');

  expect(loginResponse).not.toBeNull();
  const headers = (loginResponse as Response).headers();

  // TODO: assert x-content-type-options, x-frame-options, strict-transport-security
});

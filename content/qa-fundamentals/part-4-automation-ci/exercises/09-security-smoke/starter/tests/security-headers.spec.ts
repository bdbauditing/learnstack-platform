import { test, expect } from '@playwright/test';
import type { Response } from '@playwright/test';

test('login page includes required security headers', async ({ page }) => {
  // Capture the response to the login page navigation request.
  // page.on('response', ...) fires for every response the browser receives.
  let loginResponse: Response | null = null;

  page.on('response', response => {
    // TODO: check if this response is for the login page URL
    //       and if so, store it in loginResponse
    // Hint: response.url().includes('/login')
  });

  // Navigate to the login page — this triggers the 'response' event above.
  await page.goto('/login');

  // Make sure we captured a response before asserting.
  expect(loginResponse).not.toBeNull();

  // Get all headers from the response (keys are always lowercase in Playwright).
  const headers = (loginResponse as Response).headers();

  // TODO: assert X-Content-Type-Options is 'nosniff'
  // Hint: expect(headers['x-content-type-options']).toBe('nosniff');

  // TODO: assert X-Frame-Options is present and non-empty
  // Hint: expect(headers['x-frame-options']).toBeTruthy();

  // TODO: assert Strict-Transport-Security is present and non-empty
  // Hint: expect(headers['strict-transport-security']).toBeTruthy();
});

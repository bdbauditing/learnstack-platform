import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// TODO: copy your accessibility test from Exercise 08 here.
// You need at least 1 test in this file.

test('dashboard has no critical a11y violations', async ({ page }) => {
  // TODO: navigate to dashboard (log in first)
  // TODO: run AxeBuilder analysis
  // TODO: filter to critical/serious violations and assert length 0
});

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('dashboard has no critical a11y violations', async ({ page }) => {
  // TODO: navigate to the dashboard page (log in first if required)

  // TODO: run axe analysis
  // Hint: const results = await new AxeBuilder({ page }).analyze();

  // TODO: filter violations to only critical and serious impact levels
  // Hint: const blocking = results.violations.filter(v =>
  //   v.impact === 'critical' || v.impact === 'serious'
  // );

  // TODO: assert there are no critical or serious violations
  // Hint: expect(blocking).toHaveLength(0);
  //       If this fails, axe will show you which elements failed and why.
});

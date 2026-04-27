/**
 * Helper script — run this to discover accessibility violations.
 * This file is provided; you do not need to modify it.
 *
 * Usage (from starter/ directory):
 *   npx ts-node scripts/run-axe-scan.ts
 *
 * It will print a list of axe violations on each page. Copy the rule IDs
 * and affected selectors into a11y-report.yaml.
 *
 * NOTE: axe returns three buckets — violations, incomplete, and passes.
 * This script prints both violations and incomplete findings. "Incomplete"
 * means axe detected a potential issue but cannot confirm it without human
 * review (e.g. duplicate-id-aria). Treat incomplete findings as bugs to
 * investigate and include them in your a11y-report.yaml.
 */
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'TODO: https://taskforge.example.com';
const EMAIL = process.env.TF_EMAIL ?? 'user@taskforge.example.com';
const PASSWORD = process.env.TF_PASSWORD ?? 'TODO: set TF_PASSWORD env var';

const PAGES_TO_SCAN = [
  { name: 'dashboard', path: '/' },
  { name: 'task-list', path: '/tasks' },
  { name: 'login', path: '/login' },
  { name: 'billing', path: '/billing' },
  { name: 'profile', path: '/profile' },
];

async function scan() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ baseURL: BASE_URL });
  const page = await context.newPage();

  // Log in
  await page.goto('/login');
  await page.getByLabel('Email').fill(EMAIL);
  await page.getByLabel('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL('**/');

  let totalFindings = 0;

  for (const { name, path } of PAGES_TO_SCAN) {
    await page.goto(path);
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'])
      .analyze();

    const allFindings = [
      ...results.violations.map(v => ({ ...v, bucket: 'violation' })),
      ...results.incomplete.map(v => ({ ...v, bucket: 'incomplete' })),
    ];

    if (allFindings.length === 0) {
      console.log(`\n[${name}] No findings`);
      continue;
    }

    console.log(`\n[${name}] ${results.violations.length} violation(s), ${results.incomplete.length} incomplete:`);
    for (const v of allFindings) {
      console.log(`  Bucket:  ${v.bucket}`);
      console.log(`  Rule:    ${v.id}`);
      console.log(`  Impact:  ${v.impact}`);
      console.log(`  Help:    ${v.help}`);
      for (const node of v.nodes) {
        console.log(`  Element: ${node.target.join(', ')}`);
      }
      console.log();
      totalFindings++;
    }
  }

  // Also open task modal to catch task-form violations (A11Y-003)
  await page.goto('/tasks');
  await page.waitForLoadState('networkidle');
  const createBtn = page.locator('button.rounded-full').first();
  if (await createBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
    await createBtn.click();
    await page.waitForSelector('#task-title', { timeout: 4000 }).catch(() => {});
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'])
      .analyze();
    if (results.violations.length > 0) {
      console.log(`\n[task-form modal] ${results.violations.length} violation(s):`);
      for (const v of results.violations) {
        console.log(`  Rule:    ${v.id}`);
        console.log(`  Impact:  ${v.impact}`);
        for (const node of v.nodes) {
          console.log(`  Element: ${node.target.join(', ')}`);
        }
        console.log();
        totalFindings++;
      }
    }
  }

  console.log(`Total findings: ${totalFindings}`);
  await browser.close();
}

scan().catch(err => {
  console.error(err);
  process.exit(1);
});

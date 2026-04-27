/**
 * Helper script — checks session cookie flags after login.
 * Provided; do not modify. Document findings in security-smoke.md.
 *
 * Usage (from starter/ directory):
 *   npx ts-node scripts/check-cookies.ts
 */
import { chromium } from 'playwright';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'TODO: https://taskforge.example.com';
const EMAIL = process.env.TF_EMAIL ?? 'user@taskforge.example.com';
const PASSWORD = process.env.TF_PASSWORD ?? 'TODO: set TF_PASSWORD env var';

async function run() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ baseURL: BASE_URL });
  const page = await context.newPage();

  await page.goto('/login');
  await page.getByLabel('Email').fill(EMAIL);
  await page.getByLabel('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL('**/dashboard');

  const cookies = await context.cookies();
  console.log('=== Cookie Flags ===\n');

  if (cookies.length === 0) {
    console.log('No cookies found. Check that login succeeded.');
  }

  for (const cookie of cookies) {
    console.log(`Cookie: ${cookie.name}`);
    console.log(`  Secure:   ${cookie.secure ? '✓ yes' : '✗ NO (missing Secure flag)'}`);
    console.log(`  HttpOnly: ${cookie.httpOnly ? '✓ yes' : '✗ NO (missing HttpOnly flag)'}`);
    console.log(`  SameSite: ${cookie.sameSite ?? 'not set'}`);
    console.log();
  }

  await browser.close();
}

run().catch(err => { console.error(err); process.exit(1); });

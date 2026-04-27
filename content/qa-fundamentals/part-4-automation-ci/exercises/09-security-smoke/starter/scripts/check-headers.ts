/**
 * Helper script — checks HTTPS enforcement and security headers.
 * Provided; do not modify. Document findings in security-smoke.md.
 *
 * Usage (from starter/ directory):
 *   npx ts-node scripts/check-headers.ts
 */
import { chromium } from 'playwright';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'TODO: https://taskforge.example.com';
const HTTP_URL = BASE_URL.replace(/^https/, 'http');

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // --- Category 1: HTTPS enforcement ---
  console.log('=== HTTPS Enforcement ===');
  let redirected = false;
  page.on('response', r => {
    if ([301, 302, 307, 308].includes(r.status()) && r.url().startsWith('http://')) {
      const location = r.headers()['location'] ?? '';
      if (location.startsWith('https://')) {
        redirected = true;
        console.log(`✓ HTTP → HTTPS redirect detected: ${r.status()} → ${location}`);
      }
    }
  });

  try {
    await page.goto(HTTP_URL + '/login', { timeout: 10000 });
    if (!redirected) console.log('✗ No HTTP → HTTPS redirect detected');
  } catch {
    console.log('  (Could not reach HTTP URL — may not be applicable in this environment)');
  }

  // --- Category 2: Security headers ---
  console.log('\n=== Security Headers ===');
  let loginResp: import('playwright').Response | null = null;
  const page2 = await browser.newPage();

  page2.on('response', r => {
    if (r.url().includes('/login') && !r.url().includes('api')) loginResp = r;
  });

  await page2.goto(BASE_URL + '/login');
  if (loginResp) {
    const h = (loginResp as import('playwright').Response).headers();
    const headers = [
      'content-security-policy',
      'x-frame-options',
      'strict-transport-security',
      'x-content-type-options',
      'referrer-policy',
    ];
    for (const name of headers) {
      const val = h[name];
      console.log(val ? `✓ ${name}: ${val}` : `✗ ${name}: MISSING`);
    }
  }

  await browser.close();
}

run().catch(err => { console.error(err); process.exit(1); });

/**
 * Helper script — tests 5 protected endpoints without an auth token.
 * Provided; do not modify. Document findings in security-smoke.md.
 *
 * Usage (from starter/ directory):
 *   npx ts-node scripts/check-auth.ts
 *
 * For OWASP probes (SQL injection, XSS, IDOR) use your browser manually:
 *
 * SQLi: Navigate to the task search page and enter: ' OR '1'='1' --
 *       Note the response: 500 error? Empty results? DB error in body?
 *
 * XSS:  Create a new task with title: <script>alert(1)</script>
 *       Go to the task list. Does the title show as escaped text or does an alert fire?
 *
 * IDOR: Create a task (note its ID from the URL, e.g. /tasks/42).
 *       Log in as a different user (or log out). Try: GET /api/tasks/42
 *       Did you get 403 Forbidden or did you get the task data?
 */
import https from 'https';
import http from 'http';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'TODO: https://taskforge.example.com';
const ENDPOINTS = [
  { method: 'GET', path: '/api/tasks' },
  { method: 'POST', path: '/api/tasks' },
  { method: 'GET', path: '/api/users' },
  { method: 'DELETE', path: '/api/tasks/1' },
  { method: 'GET', path: '/api/admin/stats' },
];

function request(method: string, url: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.request(url, { method }, res => resolve(res.statusCode ?? 0));
    req.on('error', reject);
    req.end();
  });
}

async function run() {
  console.log('=== Auth Bypass Check ===\n');
  console.log('Sending requests with NO Authorization header:\n');

  for (const { method, path } of ENDPOINTS) {
    const url = BASE_URL + path;
    try {
      const status = await request(method, url);
      const ok = status === 401 || status === 403;
      console.log(`${ok ? '✓' : '✗'} ${method} ${path} → ${status} ${ok ? '(protected)' : '(ACCESSIBLE — auth bypass!)'}`);
    } catch (err) {
      console.log(`  ${method} ${path} → ERROR: ${err}`);
    }
  }

  console.log('\nNote: 401 = Unauthorized (correct), 403 = Forbidden (correct), 200 = BAD');
}

run().catch(err => { console.error(err); process.exit(1); });

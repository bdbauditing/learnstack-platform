/**
 * Stability check runner — provided, do not modify.
 *
 * Runs each flaky-N-*.spec.ts file 3 times consecutively.
 * A test is "stable" only if it passes all 3 runs.
 * Pass: 4 of 5 tests are stable.
 */
const { execSync } = require('child_process');
const { readdirSync } = require('fs');
const { join } = require('path');

const RUNS_EACH = 3;
const PASS_THRESHOLD = 4;

const testFiles = readdirSync('tests')
  .filter(f => /^flaky-\d+.*\.spec\.ts$/.test(f))
  .sort()
  .map(f => join('tests', f));

if (testFiles.length === 0) {
  console.error('No flaky-N-*.spec.ts files found in tests/');
  process.exit(1);
}

console.log(`Stability check: ${testFiles.length} tests × ${RUNS_EACH} runs each\n`);

let stableCount = 0;
for (const file of testFiles) {
  let passes = 0;
  for (let run = 0; run < RUNS_EACH; run++) {
    try {
      execSync(`npx playwright test "${file}" --reporter=line`, { stdio: 'pipe' });
      passes++;
    } catch (_) { /* run failed — that is fine, we count it */ }
  }
  const stable = passes === RUNS_EACH;
  console.log(`  ${file}: ${passes}/${RUNS_EACH} runs passed  [${stable ? 'STABLE ✓' : 'STILL FLAKY ✗'}]`);
  if (stable) stableCount++;
}

console.log(`\nResult: ${stableCount}/${testFiles.length} stable (need ${PASS_THRESHOLD})`);
if (stableCount >= PASS_THRESHOLD) {
  console.log('PASS');
  process.exit(0);
} else {
  console.log('FAIL — too many tests still flaky');
  process.exit(1);
}

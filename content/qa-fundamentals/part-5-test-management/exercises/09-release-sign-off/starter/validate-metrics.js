// Validates metrics.yaml against expected values with ±15% tolerance.
// Usage: node validate-metrics.js  (from starter/ directory)
const fs = require('fs');
let yaml;
try { yaml = require('js-yaml'); } catch {
  console.error('Run: npm install js-yaml  (or use node --input-type=module)');
  process.exit(1);
}

// Expected values (computed from execution-data.yaml)
const EXPECTED = {
  defect_density: 1.5,          // 18 / 12
  pass_rate_pct: 86.7,          // 39/45 * 100
  escape_rate_pct: 11.1,        // 2/18 * 100
  avg_bug_age_days: 10.7,       // mean of [1,2,3,5,7,8,12,14,21,25,30,2,4,6,8,10,15,20]
  mttr_days: 10.7,
};
const TOLERANCE = 0.15; // ±15%

const raw = fs.readFileSync('metrics.yaml', 'utf8');
const data = yaml.load(raw);

let passed = 0;
let failed = 0;
const errors = [];

for (const [key, expected] of Object.entries(EXPECTED)) {
  const actual = data[key];
  if (actual === null || actual === undefined) {
    errors.push(`  - ${key}: not filled in (expected ~${expected})`);
    failed++;
    continue;
  }
  const lo = expected * (1 - TOLERANCE);
  const hi = expected * (1 + TOLERANCE);
  if (actual >= lo && actual <= hi) {
    console.log(`✓ ${key}: ${actual} (expected ~${expected})`);
    passed++;
  } else {
    errors.push(`  - ${key}: got ${actual}, expected ~${expected} (±15%)`);
    failed++;
  }
}

if (failed === 0) {
  console.log(`\nAll ${passed} metrics correct. PASS`);
  process.exit(0);
} else {
  console.log(`\n${passed} correct, ${failed} incorrect:`);
  errors.forEach(e => console.log(e));
  console.log('\nFAIL');
  process.exit(1);
}

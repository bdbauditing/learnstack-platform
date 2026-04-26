#!/usr/bin/env node
/**
 * validate-csv.js
 * Validates test-cases.csv for Exercise 03.
 * Do not modify this file — edit test-cases.csv instead.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const CSV_FILE = path.join(__dirname, 'test-cases.csv');
const REQUIRED_COLUMNS = ['ID', 'Title', 'Section', 'Priority', 'Type', 'Steps', 'Expected Result'];
const VALID_PRIORITIES = new Set(['High', 'Medium', 'Low']);
const VALID_TYPES = new Set(['Functional', 'Regression', 'Smoke', 'Negative']);
const EXAMPLE_IDS = new Set(['TC-001', 'TC-002']);
const MIN_NEW_ROWS = 10;

const errors = [];

// --- Read file ---
if (!fs.existsSync(CSV_FILE)) {
  console.error('ERROR: test-cases.csv not found in the same directory as validate-csv.js.');
  process.exit(1);
}

const raw = fs.readFileSync(CSV_FILE, 'utf8').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
const lines = raw.split('\n').filter(line => line.trim() !== '');

if (lines.length < 2) {
  console.error('ERROR: test-cases.csv must have a header row and at least one data row.');
  process.exit(1);
}

// --- Parse header ---
const header = parseCSVRow(lines[0]);

// Check required columns
const missingColumns = REQUIRED_COLUMNS.filter(col => !header.includes(col));
if (missingColumns.length > 0) {
  errors.push(`Missing required columns: ${missingColumns.join(', ')}`);
}

const colIndex = {};
header.forEach((col, i) => { colIndex[col] = i; });

// --- Parse data rows ---
const dataRows = [];
for (let i = 1; i < lines.length; i++) {
  const cells = parseCSVRow(lines[i]);
  const row = {};
  header.forEach((col, j) => { row[col] = (cells[j] || '').trim(); });
  dataRows.push({ lineNum: i + 1, row });
}

// --- Check example rows are still present ---
const foundExamples = new Set(dataRows.map(({ row }) => row['ID']).filter(id => EXAMPLE_IDS.has(id)));
for (const exampleId of EXAMPLE_IDS) {
  if (!foundExamples.has(exampleId)) {
    errors.push(`Example row ${exampleId} is missing. Do not remove the provided example rows.`);
  }
}

// --- Count new rows ---
const newRows = dataRows.filter(({ row }) => !EXAMPLE_IDS.has(row['ID']));
if (newRows.length < MIN_NEW_ROWS) {
  errors.push(
    `Need at least ${MIN_NEW_ROWS} new test case rows (beyond TC-001 and TC-002). Found ${newRows.length}.`
  );
}

// --- Validate each row ---
for (const { lineNum, row } of dataRows) {
  // Check no empty required cells
  for (const col of REQUIRED_COLUMNS) {
    if (!row[col] || row[col] === '') {
      errors.push(`Line ${lineNum} (${row['ID'] || 'unknown'}): column '${col}' is empty.`);
    }
  }

  // Check Priority values
  if (row['Priority'] && !VALID_PRIORITIES.has(row['Priority'])) {
    errors.push(
      `Line ${lineNum} (${row['ID']}): Priority '${row['Priority']}' is invalid. Use: High, Medium, or Low.`
    );
  }

  // Check Type values
  if (row['Type'] && !VALID_TYPES.has(row['Type'])) {
    errors.push(
      `Line ${lineNum} (${row['ID']}): Type '${row['Type']}' is invalid. Use: Functional, Regression, Smoke, or Negative.`
    );
  }
}

// --- Report ---
if (errors.length > 0) {
  console.log('FAIL — test-cases.csv has the following issues:\n');
  errors.forEach(e => console.log('  - ' + e));
  console.log('\nFix the issues above and run this script again.');
  process.exit(1);
} else {
  const newCount = newRows.length;
  const totalRows = dataRows.length;
  console.log(`PASS — test-cases.csv is valid.`);
  console.log(`  Total rows: ${totalRows} (${EXAMPLE_IDS.size} examples + ${newCount} new)`);
  console.log(`  All required columns present.`);
  console.log(`  All Priority and Type values are valid.`);
  console.log(`  No empty cells found.`);
  process.exit(0);
}

// --- CSV parser (handles quoted fields with commas inside) ---
function parseCSVRow(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // escaped quote
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

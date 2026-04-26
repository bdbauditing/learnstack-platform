# Starter — Exercise 03: Test Cases (TestRail CSV Format)

Follow these steps in order.

## Step 1 — Understand the CSV format

Open `test-cases.csv`. You will see a header row and 2 example rows.

The 7 columns are:

| Column | What to write |
|--------|---------------|
| `ID` | A unique ID like `TC-003`, `TC-004`, ... |
| `Title` | A short description: "User can set a due date on a task" |
| `Section` | The feature area: `Due Dates`, `File Attachments`, `Email Notifications`, etc. |
| `Priority` | Exactly one of: `High`, `Medium`, `Low` |
| `Type` | Exactly one of: `Functional`, `Regression`, `Smoke`, `Negative` |
| `Steps` | Numbered steps written as a single string in quotes: `"1. Do X. 2. Do Y."` |
| `Expected Result` | What should happen when the test passes |

Do NOT change the header row. Do NOT delete the example rows (TC-001 and TC-002).

## Step 2 — Plan your 10 test cases

Before typing, decide which 10 (or more) scenarios you will cover. You should cover the new TaskForge 2.0 features from the user stories:

- Due date management (US-005)
- File attachments (US-006) — include a negative test for oversized files
- Email notifications (US-007)
- Role-based access control (US-008)
- Task search (US-009)
- Bulk delete (US-010)
- Reporting dashboard / CSV export (US-011)
- API key management (US-012)

Aim for a mix of test types: some `Functional`, at least one `Negative`, and at least one `Regression`.

## Step 3 — Add rows to the CSV

Add your test cases below the 2 existing rows. Each row must:

- Start with a unique ID (TC-003, TC-004, etc.)
- Have all 7 columns filled in — no empty cells
- Use exactly `High`, `Medium`, or `Low` for Priority
- Use exactly `Functional`, `Regression`, `Smoke`, or `Negative` for Type
- Wrap Steps in double quotes if they contain commas (they almost certainly will)

## Example of a well-formed row

```
TC-003,User can set a due date on a new task,Due Dates,Medium,Functional,"1. Log in. 2. Click New Task. 3. Enter a title. 4. Click the due date picker. 5. Select tomorrow's date. 6. Click Save.",Task appears in the list with a due date badge showing tomorrow's date.
```

## Step 4 — Run the validator

From this directory, run:

```bash
node validate-csv.js
```

If it prints `PASS`, you are done. If it prints errors, fix them and run again.

## Common mistakes

- **Forgetting quotes around Steps** — if your steps contain commas (they usually do), the CSV parser will split them into multiple columns. Always wrap Steps in `"double quotes"`.
- **Leaving a cell empty** — every column must have a value in every row.
- **Wrong Priority spelling** — must be exactly `High`, `Medium`, or `Low` (capital first letter, no spaces).
- **Wrong Type spelling** — must be exactly `Functional`, `Regression`, `Smoke`, or `Negative`.
- **Deleting example rows** — TC-001 and TC-002 must stay in the file.

## Hints

- You can open the CSV in Excel or Google Sheets, but be careful — some editors add extra quotes or change line endings. Check with the validator after saving from a spreadsheet editor.
- Negative test cases test what the system does with bad input — wrong file type, oversized file, invalid date. These are often the most valuable tests.
- A good Steps column reads like instructions for someone who has never used the app. Be specific.

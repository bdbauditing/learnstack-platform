# Starter Guide — Exercise 04

## How to complete this exercise

1. **Study the feature areas.** Read the mission section in `../README.md`. There are 10 feature areas to cover. Make a list of them before you start writing.

2. **Design test cases using EP + BVA + state transition.**
   - **Equivalence Partitioning (EP):** Group inputs into valid and invalid classes. Write one test per class.
   - **Boundary Value Analysis (BVA):** Test at the exact boundary (200 chars), just inside (199), and just outside (201).
   - **State Transition:** Think about before/after states — what happens when you complete a task? Reopen it? Delete it?

3. **Copy the TC-003 pattern.** Each test case needs `id`, `title`, `description`, `steps`, `expected_result`, `priority`, and `area`. Do not change the schema.

4. **Aim for ≥40 cases covering all 10 feature areas.** A rough split:
   - Authentication: 3–4 cases
   - Task Management (CRUD): 5–6 cases
   - Task Validation (boundaries, empty, max length): 6–8 cases
   - Workflow (assign, complete, reopen, bulk): 5–6 cases
   - Notifications: 2–3 cases
   - Search: 3–4 cases
   - File Attachments: 3–4 cases
   - API Validation: 4–5 cases
   - Accessibility: 3–4 cases
   - Security: 2–3 cases

5. **Push and wait for grader feedback.** The grader tells you how many bugs you caught. If you catch fewer than 25, read the feedback — it names which bugs were missed. Add test cases that target those areas.

## Tips for writing bug-catching test cases

- **Empty inputs are your best friend.** Many bugs hide in "what happens when this field is blank?"
- **Try the thing twice.** Double-submit, double-assign, double-delete.
- **Wrong values, not just right values.** Test invalid file types, past dates, very long strings.
- **Check the API directly.** Use `assert_text` on API response bodies for status codes and payloads.
- **Accessibility is testable.** Use `assert_visible` on `[aria-label]` attributes and focus states.

# Answer Key — Exercise 03: Test Cases (TestRail CSV Format)

## Grader config (authoritative)

```yaml
grader: script-runs
submissionFile: validate-csv.js
options:
  scriptType: node
  expectedExitCode: 0
  requiredOutputPatterns:
    - "PASS"
```

## Grader notes

- The grader runs `node validate-csv.js` from the `starter/` directory.
- The learner only edits `test-cases.csv`. The `validate-csv.js` script is a provided tool.
- A pass requires: exit code 0 AND the string `PASS` somewhere in stdout.
- If a learner modifies `validate-csv.js` to bypass validation, that is an academic integrity issue — flag for staff review.
- The validator checks: header columns, presence of TC-001 and TC-002, ≥10 new rows, no empty cells, valid Priority and Type values.

## Reference answer (staff only)

A valid submission has at least 12 data rows total (2 examples + 10 new). Example new rows:

```
TC-003,User can set a due date on a new task,Due Dates,Medium,Functional,"1. Log in. 2. Click New Task. 3. Enter a title and project. 4. Click the due date picker. 5. Select a future date. 6. Click Save.",Task is saved and appears in the list with a due date badge.
TC-004,Overdue task is highlighted in red,Due Dates,High,Functional,"1. Log in. 2. Find a task with a due date from yesterday. 3. View the task list.",The task row is highlighted in red to indicate it is overdue.
TC-005,User can upload a PDF file attachment,File Attachments,Medium,Functional,"1. Log in. 2. Open a task. 3. Click the attachment button. 4. Select a PDF under 25MB. 5. Wait for upload to complete.",The file appears as a downloadable link on the task detail page.
TC-006,File upload is rejected for files over 25MB,File Attachments,High,Negative,"1. Log in. 2. Open a task. 3. Click the attachment button. 4. Select a file larger than 25MB. 5. Confirm the upload.",An error message appears stating the file exceeds the size limit. No file is attached.
TC-007,Assignee receives email when task is assigned,Email Notifications,High,Functional,"1. Log in as user A. 2. Create a task. 3. Assign the task to user B. 4. Check user B's email inbox.",User B receives an email with the task title and a link to the task.
TC-008,User cannot view tasks in projects they are not assigned to,Role-Based Access,High,Functional,"1. Log in as a user who is NOT assigned to Project X. 2. Navigate to the project URL directly. 3. Observe the result.",User is denied access. A 403 error or redirect to an access denied page is shown.
TC-009,Search returns tasks matching the keyword,Task Search,Medium,Functional,"1. Log in. 2. Type 'invoice' into the search bar. 3. Press Enter or wait for results.",Task list updates to show only tasks containing 'invoice' in the title.
TC-010,Search does not return tasks from other users' private projects,Task Search,High,Negative,"1. Log in as user A. 2. Search for a keyword that exists only in a task in user B's private project.",No results from user B's project appear in the search results.
TC-011,Bulk delete removes only selected tasks,Bulk Operations,High,Functional,"1. Log in. 2. Select 3 specific tasks using checkboxes. 3. Click Delete Selected. 4. Confirm the deletion dialog.",Only the 3 selected tasks are removed. All other tasks remain in the list.
TC-012,Reporting dashboard exports a CSV for a date range,Reporting,Medium,Functional,"1. Log in as a manager. 2. Navigate to Reports. 3. Set a date range of the last 30 days. 4. Click Export. 5. Open the downloaded file.",A CSV file downloads containing task ID, title, assignee, completed date, and project name for tasks completed in the date range.
```

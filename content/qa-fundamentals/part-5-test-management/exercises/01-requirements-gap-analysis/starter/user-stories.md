# TaskForge 2.0 — User Stories

These are the user stories handed to the QA team for the 2.0 release. Review them carefully before writing any test cases.

---

## US-001 — User Login

**As a** user,
**I want to** log in to TaskForge,
**so that** I can access my tasks.

*(No acceptance criteria provided.)*

---

## US-002 — Task Loading Speed

**As a** user,
**I want** task loading to be fast,
**so that** I am not waiting around.

*(No acceptance criteria provided.)*

---

## US-003 — Team Productivity Dashboard

**As a** manager,
**I want to** see my team's productivity on a dashboard,
**so that** I can identify who needs support.

*(No acceptance criteria provided.)*

---

## US-004 — Task Creation

**As a** user,
**I want to** create a new task with all required fields filled in,
**so that** the task has enough information to be actionable.

*(No acceptance criteria provided.)*

---

## US-005 — Due Date Management

**As a** user,
**I want to** set a due date on any task,
**so that** I know when it needs to be completed.

**Acceptance criteria:**
- A date picker is shown on the task creation form.
- The selected date is saved with the task.
- Tasks with a due date show a date badge in the task list.
- Tasks overdue by more than 1 day are highlighted in red.

---

## US-006 — File Attachments

**As a** user,
**I want to** attach files to a task,
**so that** relevant documents are always with the task.

**Acceptance criteria:**
- Users can upload files using a drag-and-drop area or a file picker button.
- Accepted file types are limited to: PDF, PNG, JPG, DOCX, XLSX.
- The uploaded file appears as a downloadable link on the task detail page.

*(Note: Maximum file size is not specified.)*

---

## US-007 — Email Notifications

**As a** user,
**I want to** receive an email when someone assigns a task to me,
**so that** I do not miss new work.

**Acceptance criteria:**
- An email is sent to the assignee when a task is assigned.
- The email contains the task title and a link to the task.

*(Note: Delay tolerance for email delivery is not specified. Behavior when the assignee's email is invalid is not specified.)*

---

## US-008 — Role-Based Access Control

**As an** admin,
**I want to** control which users can see which projects,
**so that** sensitive projects remain private.

**Acceptance criteria:**
- Admins can assign users to projects via the admin panel.
- Users not assigned to a project cannot view its tasks.
- The restriction applies to the UI and the API.

---

## US-009 — Task Search

**As a** user,
**I want to** search for tasks by keyword,
**so that** I can find a specific task quickly.

**Acceptance criteria:**
- A search bar is visible at the top of the task list.
- Search results appear within a reasonable time.
- Results show only tasks the current user has access to.

*(Note: "reasonable time" is not defined. Minimum character count to trigger search is not specified. Whether search is full-text or title-only is not specified.)*

---

## US-010 — Bulk Operations

**As a** user,
**I want to** select multiple tasks and delete them at once,
**so that** I can clean up my task list efficiently.

**Acceptance criteria:**
- A checkbox appears next to each task in the list.
- A "Select All" checkbox selects all visible tasks.
- A "Delete Selected" button appears when one or more tasks are selected.
- A confirmation dialog appears before deletion.

---

## US-011 — Reporting Dashboard

**As a** manager,
**I want to** export a report of completed tasks for a date range,
**so that** I can share progress with stakeholders.

**Acceptance criteria:**
- The reporting page has a date range picker (start and end date).
- Clicking Export generates a downloadable CSV.
- The CSV contains: task ID, title, assignee, completed date, project name.

---

## US-012 — API Key Management

**As a** developer,
**I want to** generate and revoke API keys from my account settings,
**so that** I can integrate TaskForge with other tools.

**Acceptance criteria:**
- The API Keys page is accessible from account settings.
- Clicking "Generate New Key" creates a new key and displays it once.
- Clicking "Revoke" next to an existing key immediately invalidates it.

*(Note: Whether the page requires re-authentication before displaying existing keys is not specified. Key expiry policy is not specified.)*

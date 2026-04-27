# Starter — Exercise 05: Bug Report Suite

Follow these steps in order.

## Step 1 — Understand the schema

Open `bugs.yaml`. You will see 6 blank bug stubs. Each stub has the same structure. Your job is to replace every `TODO` with real content for each of the 6 planted bugs.

The required fields are:

| Field | What to write |
|-------|---------------|
| `title` | A short, factual description of the bug (10–200 characters) |
| `location` | Where the bug occurs — page and component, e.g. `task-form / due-date input` |
| `severity` | `Critical`, `High`, `Medium`, or `Low` |
| `priority` | `High`, `Medium`, or `Low` |
| `environment.browser` | Browser name and version, e.g. `Chrome 124` |
| `environment.os` | Operating system, e.g. `macOS 14` |
| `environment.viewport` | Screen size in `WxH` format, e.g. `1440x900` |
| `environment.url` | The URL where the bug occurs |
| `steps` | Ordered list of steps to reproduce (at least 1) |
| `expected` | What should happen (10+ characters) |
| `actual` | What actually happens (10+ characters) |

## Step 2 — Know the step actions

Each step in the `steps` list uses an `action` field. The valid actions are:

- `navigate` — go to a URL: `{ action: navigate, url: "https://..." }`
- `click` — click an element: `{ action: click, selector: "#button" }`
- `type` — type into a field: `{ action: type, selector: "#input", value: "text" }`
- `assert_visible` — check an element is visible: `{ action: assert_visible, selector: ".error" }`
- `assert_text` — check an element has text: `{ action: assert_text, selector: "h1", value: "Dashboard" }`
- `assert_url` — check the URL: `{ action: assert_url, value: "/dashboard" }`
- `scroll` — scroll to an element: `{ action: scroll, selector: "#bottom" }`
- `select` — select from a dropdown: `{ action: select, selector: "#priority", value: "High" }`
- `hover` — hover over an element: `{ action: hover, selector: ".tooltip-trigger" }`
- `wait` — wait a number of milliseconds: `{ action: wait, ms: 1000 }`

## Step 3 — Explore the 6 bug areas

Visit these areas on the TaskForge 2.0 staging environment (`TODO: <hostname>`) to find the planted bugs:

1. **Task creation form — due date input**: Try setting a due date in the past and saving the task.
2. **Task form — file attachment**: Try uploading a file that is larger than 10MB.
3. **Notifications — task assignment**: Create a task, assign it to another user, and check if an email is sent.
4. **Search — task search**: Search for keywords that exist in another user's private tasks.
5. **Task list — bulk operations**: Use the "Select All" checkbox and observe which tasks are selected.
6. **Account settings — API keys**: Navigate to the API Keys page without having recently re-authenticated.

## Step 4 — Fill in each bug stub

For each bug you find, replace the TODO placeholders with real content. Be specific:

- **Title**: "Task due date accepts dates in the past without displaying a warning" is better than "Due date bug".
- **Location**: Be specific — `task-form / due-date input`, not just `task form`.
- **Steps**: Write every step a developer would need to reproduce the bug. Do not skip steps that seem obvious.
- **Expected**: What a correctly working feature would do.
- **Actual**: What the broken feature does instead.

## Step 5 — Check your YAML

YAML is sensitive to indentation and formatting. Check:

- All list items under `steps:` start with `  - action:` (two spaces, dash, space).
- String values with colons in them are wrapped in quotes: `"File upload fails: no error shown"`.
- The `viewport` field uses the format `1440x900` (no spaces, just a number, x, number).
- The `url` fields are valid URLs (start with `http://` or `https://`).

## Hints

- Severity vs. Priority: **Severity** is how bad the bug is technically (does it crash the app? does it leak data?). **Priority** is how urgently it should be fixed (business impact, release risk). A cosmetic bug might be Low severity but High priority if it affects the brand. A data leak is Critical severity and High priority.
- The `actual` field is where you describe what you see — be precise. "No error message appears and the task is saved" is better than "it doesn't work".
- If you cannot access the staging environment, describe the bugs based on the clues in the exercise README and the areas listed above. The grader checks your descriptions, not whether you physically triggered the bug.

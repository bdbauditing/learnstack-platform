# Starter — Exercise 02: Test Plan

Follow these steps in order.

## Step 1 — Read the context

You have already reviewed the 12 user stories from Exercise 01. TaskForge 2.0 includes these new features: task due dates, file attachments, email notifications, role-based access control, task search, bulk delete, reporting dashboard, and API key management. Keep them in mind as you fill in the plan.

## Step 2 — Open the template

Open `test-plan.md`. You will see 8 sections with comments in each. The comments tell you what each section should contain — read them before writing.

## Step 3 — Write the Scope section

This is the most important section. Be specific:

- List the new 2.0 features that ARE being tested (you can pull from the user stories).
- List anything explicitly NOT being tested — for example, features unchanged from v1.0, or features going into a later sprint.
- If you are testing the API as well as the UI, say so here.

## Step 4 — Write the Test Objectives

3–5 bullet points. Use action verbs: verify, validate, ensure, confirm, demonstrate. Good objectives are specific — "verify that the task creation form enforces required fields" is better than "test task creation".

## Step 5 — Write the Test Types

List the testing approaches you will use. At a minimum, include:

- **Smoke test** — quick sanity check after each build deployment
- **Regression test** — make sure existing features still work
- **Exploratory testing** — unscripted investigation of the new 2.0 features
- **API testing** — regression tests for the TaskForge REST API
- Add performance or accessibility testing if your scope includes them

## Step 6 — Write Entry Criteria

These are gates. Testing does NOT start until all entry criteria are met. Think about:

- Build deployment — where and what version?
- Test data — is there a set of seed data ready?
- Environment health — are there any known outages on staging?
- Prerequisite bug fixes — any P1 bugs that must be fixed before testing can proceed?

## Step 7 — Write Exit Criteria

Make these measurable. Every exit criterion should be something you can check with a yes/no answer. Good examples:

- "Pass rate is at or above 95% across all executed test cases."
- "No open defects with severity Critical or High."
- "All planned test cases have been executed (none remain as Planned/Untested)."
- "All exploratory sessions have been completed and session reports filed."

## Step 8 — Write the Test Environment

List the browsers (Chrome, Firefox, Safari), operating systems (Windows, macOS), and screen sizes or devices. Also note the API version and whether you are using a shared staging environment or a dedicated QA environment.

## Step 9 — Write Risks and Mitigations

Think about what could go wrong during testing — not product bugs, but project risks. At least 2:

- Staging environment instability (mitigation: daily environment health check; escalation path to DevOps)
- Test data corruption (mitigation: snapshot staging DB at start; restore if corrupted)
- Key team member unavailable (mitigation: document all test procedures so another tester can pick up)

## Step 10 — Write Deliverables

List what you will hand over. Usually:

- Test case suite (with execution report)
- Bug report (all defects filed during this effort)
- Exploratory session notes
- Sign-off document

## Hints

- Do not copy the comment text from the template into your answers — replace it with your own content.
- Exit criteria are a promise to the team. Do not set a threshold you know you cannot meet.
- A risk is not the same as a product bug. Risks are about the testing process — availability, environment, data, time.

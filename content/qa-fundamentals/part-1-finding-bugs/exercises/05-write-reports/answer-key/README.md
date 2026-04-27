# Grader Notes — Exercise 05

Validation is structural + keyword based. No exact match checking.

Each report must have:
- Non-empty title, location, severity, priority
- All environment fields filled
- At least 2 steps with proper action types
- Expected and actual at least 15 chars, must not be identical
- Severity is one of: Critical/High/Medium/Low
- Priority is one of: High/Medium/Low

All 5 must pass for the exercise to pass.

## Per-bug notes

**Bug 1 (bio save):** Accept any steps that navigate to profile, edit the bio, click save/update, and then verify. Expected should mention "saved" or "persisted". Actual should mention "reverts" or "not saved" or "original text".

**Bug 2 (wrong category):** Accept steps that go to search, filter by a category, and observe results. Expected: results from selected category. Actual: results from a different or no category.

**Bug 3 (password reset email):** Steps end at clicking the reset link. Actual is "email not received" or "no email arrived within X minutes". Accept any variant of non-arrival.

**Bug 4 (Feb 30):** Steps involve opening a date picker, navigating to February, selecting day 30. Expected: date 30 is not selectable or shows error. Actual: date is accepted.

**Bug 5 (back button post-logout):** Steps: log in, navigate around, log out, click browser back. Expected: redirect to login page. Actual: cached logged-in page shown.

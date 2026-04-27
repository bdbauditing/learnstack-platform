# Starter — Exercise 05: Write Reports from Scratch

Write 5 complete bug reports and file each one as a **GitHub Issue** on your fork. Paste all 5 issue URLs into `submissions.txt`.

**Bug descriptions to report:**
1. Bio text field doesn't save changes when clicking Update
2. Task search results show items from the wrong status category
3. Password reset email never arrives after clicking Forgot Password
4. Date picker accepts February 30 as a valid due date
5. Browser back button shows the logged-in page after logging out

Make up plausible app URLs and field names — use TaskForge paths like `/profile`, `/tasks`, `/login`. The grader checks structure, not exact content.

## Format reminder

```markdown
# [Profile] Bio changes not saved after clicking Update

**Severity:** Medium
**Priority:** Medium

## Environment

- **Browser:** Chrome 130
- **OS:** macOS 14
- **Viewport:** 1440x900
- **URL:** https://learnstack-taskforge-web.onrender.com/profile

## Steps to Reproduce

1. Log in and navigate to /profile
2. Clear the Bio field and type a new value: "My updated bio"
3. Click the **Update Profile** button
4. Navigate away (e.g. to /tasks) and return to /profile

## Expected Behavior

The Bio field shows the updated text after navigating away and returning.

## Actual Behavior

The Bio field reverts to the original text — changes are not persisted.
```

## Tips

- Every bug needs at least 3 numbered steps. More specific = better.
- Use TaskForge URLs: `/profile`, `/tasks`, `/login`, `/register`, `/billing`.
- Make sure your Expected Behavior and Actual Behavior clearly describe two different outcomes.
- For the password reset bug: steps end at "click Forgot Password → submit email"; actual is "reset email never received".

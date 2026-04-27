# Part 1 Concepts — Finding and Reporting Bugs

---

## 1. What QA Actually Does (Mindset)

Here's the honest truth about QA: **bugs exist before you find them.** Your job is not to create quality — quality either got built in or it didn't. Your job is to **find the gaps before real users do.**

Think of QA as the voice of the user sitting inside the engineering team. You ask the uncomfortable questions:

- "What happens if I put an emoji in the username field?"
- "What if I click Submit twice really fast?"
- "What if I'm on a train with 2G internet and the request times out halfway through?"

Developers are smart, focused people. They are focused on *making features work* under normal conditions. You are focused on *breaking things* under abnormal ones. That's not adversarial — it's complementary.

**Key mindset shifts:**
- You are not a gatekeeper blocking releases. You are a risk adviser helping the team decide when something is safe to ship.
- A bug you find is a win, not a failure. A bug a user finds is the failure.
- "It works on my machine" is never the end of the conversation — it's the beginning of an investigation.

---

## 2. QA vs QC vs Testing

These three terms get tangled constantly. Here's how they actually fit together:

- **Quality Assurance (QA)** — *Preventive, process-focused.* QA asks: "Are we building things the right way?" It covers things like defining coding standards, setting up CI pipelines, establishing review processes, and training the team. QA happens before the software is built.

- **Quality Control (QC)** — *Detective, product-focused.* QC asks: "Did we build the right thing?" It inspects the actual product after it's built. QC activities include reviews, audits, and — yes — testing.

- **Testing** — An *execution activity* that lives inside QC. Testing is what you do when you run the app and check if it behaves correctly. Testing is a subset of QC. QC is a subset of QA (in the broad sense).

The easy way to remember it: **QA prevents, QC detects, testing executes.**

---

## 3. SDLC Models

The Software Development Lifecycle (SDLC) describes how software moves from idea to shipped product. Testing fits differently into each model.

**Waterfall** — Requirements → Design → Build → Test → Deploy, in strict sequence. Testing only happens late in the process, after everything is built. The cost of finding bugs late is high because changing code after it's been built (and then built on top of) is expensive. Waterfall is rare for web products today but still common in hardware and regulated industries.

**V-Model** — A refinement of Waterfall where each development phase is "mirrored" by a corresponding test phase. When you write requirements, you also plan acceptance tests. When you design the system, you also plan system tests. Testing planning starts on day one, even though test *execution* still happens late. This is better than Waterfall because you catch misunderstandings early.

**Agile** — Software is built in short iterations called sprints (usually 1–2 weeks). Each sprint produces working software. Testing happens *inside every sprint* — not as a separate phase. Bugs found in a sprint are fixed in the same sprint. QA is a continuous partner to developers, not a downstream recipient.

**Scrum** — The most popular Agile framework. Roles: Product Owner (owns the backlog), Scrum Master (removes blockers), Development Team (builds + tests). Ceremonies: Sprint Planning, Daily Standup, Sprint Review, Sprint Retrospective. QA engineers are part of the Development Team in Scrum. They write test cases, execute them, and report bugs all within the sprint.

**Kanban** — A flow-based approach with no sprints. Work moves through a board (To Do → In Progress → In Review → Done) with limits on how much can be in each column at once (WIP limits). QA fits into the "In Review" column or as a step within the flow. Kanban is popular for support teams, bug-fix queues, and teams with unpredictable incoming work.

---

## 4. Testing Approaches

- **Black Box** — You test the software without knowing how the internals work. You only see inputs and outputs. Most manual testing and E2E automation is Black Box.
- **Gray Box** — You have partial knowledge — maybe you know the API structure and database schema, but not the full source code. API testing and integration testing often fall here.
- **White Box** — You have full visibility into the code. Unit tests written by developers who can see every branch and condition are White Box tests.

---

## 5. The Testing Pyramid

Picture a triangle. At the bottom: **unit tests**. In the middle: **integration tests**. At the top: **end-to-end (E2E) tests**.

**Why more tests at the bottom?**

- **Unit tests** are fast (milliseconds), cheap to write and maintain, and deterministic. You can run ten thousand of them in a few seconds. They test one function in isolation.
- **Integration tests** check that two or more components work together (e.g., your service talks to the database correctly). Slower and harder to maintain, but catch a class of bugs unit tests miss.
- **E2E tests** launch a real browser, click through a real UI, and check that the whole user journey works. They are slow (minutes), flaky (network, timing, browser quirks), and expensive to maintain.

**The rule:** Invest most in unit tests, some in integration, and as few E2E tests as you can get away with — only for critical user journeys.

**"Don't flip the pyramid."** An inverted pyramid — lots of E2E, few unit tests — means your suite is slow, flaky, and expensive to fix when it breaks. Teams with inverted pyramids stop trusting their test suites. Don't be that team.

---

## 6. Test Oracles

A **test oracle** is whatever tells you the *expected* result. You need to know what "correct" looks like before you can say something is broken. There are four main types:

- **Specified oracle** — The expected result comes from a formal document: a requirements spec, an API contract, a user story's acceptance criteria. "The spec says this field is required — submitting without it must show an error." Most common in structured environments.

- **Derived oracle** — The expected result is *computed* from another output or a formula. "The total price must equal the sum of (unit price × quantity) for each line item." You calculate what correct looks like rather than reading it from a doc.

- **Heuristic oracle** — The expected result comes from your experience and domain knowledge. "This page took 8 seconds to load — that feels too slow for a logged-in dashboard." There's no spec that says how fast it should be; you're making a judgment call based on expertise.

- **Consistent oracle** — The expected result is "whatever it did before." If a feature worked last week, it should work the same way today. Regression testing is consistent oracle testing: you're checking that nothing changed when it shouldn't have.

---

## 7. Severity vs Priority

These two terms are not the same. Confusing them causes bad decisions.

- **Severity** = *technical impact* — how badly does this break the software? A crash that wipes user data is Critical. A label that wraps to two lines is Low.
- **Priority** = *business urgency* — how fast does this need to be fixed? A typo in a marketing email that went out yesterday is High priority even if the severity is Low. A crash in a feature 0.01% of users ever touch might be Low priority even though the severity is High.

**Real examples:**

| Bug | Severity | Priority | Why |
|-----|----------|----------|-----|
| CEO's name misspelled on homepage | Low | High | Business visibility |
| Data export crashes for all users | High | High | Major feature broken |
| App crashes in IE6 (0.001% of traffic) | High | Low | Almost no real impact |
| Order confirmation email goes to spam | Medium | High | Revenue at risk |

The decision of severity is technical. The decision of priority is business-driven. Both matter, and you need both to triage a backlog.

---

## 8. Reproducibility Fundamentals

A bug report that cannot be reproduced is a bug report that will not be fixed. Every bug report needs exactly four things:

1. **Environment** — OS, browser, browser version, screen size, user account type, app version, network conditions. "Works on my machine" is a clue that the environment matters. Document yours.
2. **Steps** — Numbered, specific, and complete. "Click the login button" is vague. "Click the button with the text 'Sign In' at the top-right of the homepage" is specific. Include every click, every value typed, every navigation.
3. **Expected result** — What *should* happen according to the spec, your experience, or common sense? Be specific: "User is redirected to /dashboard and sees their name in the top-right corner."
4. **Actual result** — What *does* happen? Be specific: "Page reloads with no redirect. No error message shown. Browser console shows: TypeError: Cannot read properties of undefined (reading 'userId')."

Without all four, a developer cannot reproduce the bug. They cannot fix what they cannot see.

**"Works on my machine"** from a developer is not a dismissal — it's a data point. It means the bug is environment-specific. Your job is to narrow down *what is different* between your environment and theirs. Add more detail. Compare OS versions, browser versions, user accounts, data states. The bug is still real.

---

## 9. The Real Bug Report Format

In real companies, bug reports live in **Jira**, **GitHub Issues**, **Linear**, or **Bugzilla**. The fields differ slightly by tool but map to the same structure.

In this course, you write bug reports as **Markdown files** — the same format GitHub uses for Issue templates. Here's how the fields map:

| This course (Markdown) | Jira | GitHub Issues |
|------------------------|------|---------------|
| `title` (frontmatter) | Summary | Issue title |
| `severity` (frontmatter) | Severity (custom field) | Label |
| `priority` (frontmatter) | Priority | Label |
| `## Environment` | Environment (custom field) | Environment section |
| `## Steps to Reproduce` | Steps to Reproduce | Steps to Reproduce section |
| `## Expected Behavior` | Expected Result | Expected Behavior section |
| `## Actual Behavior` | Actual Result | Actual Behavior section |
| `## Evidence` | Attachments | Attached files + inline images |

### What a good report looks like

```markdown
# [Login] Submit button disabled with valid credentials

**Severity:** High
**Priority:** High

## Environment

- **Browser:** Chrome 130
- **OS:** macOS 14
- **Viewport:** 1440x900
- **URL:** https://app.example.com/login

## Steps to Reproduce

1. Navigate to /login
2. Enter a valid email in the Email field
3. Enter a valid password in the Password field
4. Observe the Submit button state

## Expected Behavior

The Submit button becomes enabled after both fields contain valid input, and clicking it logs the user in.

## Actual Behavior

The Submit button remains visually disabled (grayed out) even with valid credentials in both fields. Pressing Enter still submits the form, which is a separate workaround — not correct behavior.

## Evidence

**Screenshot:** login-submit-disabled-chrome130.png

**Console:** TypeError: Cannot read properties of null (reading 'addEventListener') at login.js:47

**Network:** POST /api/auth/login → 422 Unprocessable Entity | Body: {"error": "validation_failed"}
```

### Why Markdown?

This is the actual format used in GitHub Issues bug report templates (VS Code, React, Next.js all use this structure). Jira renders Markdown too, and the section names — Steps to Reproduce, Expected Behavior, Actual Behavior — are the same fields you fill in on Jira's bug form. In Jira, Severity and Priority are dropdown fields in the UI; in this course they're written inline as `**Severity:** High` since you're writing in a text file, not a form.

### Evidence: the secret weapon

A bug report without evidence is your word against the developer's. A report with a screenshot + console error + network dump is nearly impossible to dismiss. Evidence also cuts time-to-fix: the developer sees exactly what went wrong without spending 30 minutes trying to reproduce it.

- **Screenshot** — Take it with DevTools open so the developer can see the console state too. Name it descriptively: `login-submit-disabled-chrome130.png`, not `screenshot.png`.
- **Console** — Copy the relevant error line(s) from DevTools → Console. Look for `TypeError`, `ReferenceError`, `Uncaught`, or network failures.
- **Network** — In DevTools → Network tab, click the failing request and copy the method, path, and response status. Include the response body if it contains an error message.

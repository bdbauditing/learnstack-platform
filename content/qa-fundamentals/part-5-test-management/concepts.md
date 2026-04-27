# Concepts — Part 5: Test Management

---

## 1. What a test plan is and what goes in it

A **test plan** is a document that answers one question: "How are we going to test this thing?"

Think of it like a project plan, but for testing. Before you write a single test case, you write the plan. It tells everyone on the team — developers, product managers, the release manager — what you will test, what you will not test, what conditions need to be true before you start, and what conditions need to be true before you are done.

A complete test plan has these sections:

- **Scope** — which features are being tested, and which are explicitly out of scope. "We will test the task creation flow. We will NOT test the legacy import tool because it ships unchanged."
- **Test objectives** — what you are trying to prove. "Verify that a logged-in user can create, edit, and delete tasks without errors."
- **Test types** — smoke, regression, exploratory, API, performance. Each type catches different kinds of problems.
- **Entry criteria** — what must be true before testing starts. "A stable build must be deployed to staging. All P1 dev bugs from the last sprint must be fixed."
- **Exit criteria** — what must be true before testing is declared done. "Pass rate above 95%. No open Critical or High severity bugs. All planned test cases executed."
- **Test environment** — which browsers, operating systems, screen sizes, and API versions you are testing against.
- **Risks and mitigations** — what could go wrong during testing and what you will do about it. "Risk: staging data gets wiped. Mitigation: back up test data at start of each day."
- **Deliverables** — what the QA team will hand over. Usually: test cases, a bug report, an execution report, and a sign-off document.

Without a test plan, testing is random. With one, everyone knows what "done" looks like before you start.

---

## 2. Test management tools — TestRail, Jira, Zephyr

These tools are where your test cases, test runs, and defects live.

**TestRail** is a dedicated test case management tool. You create test cases, organize them into suites (groups), and then create test runs — a selected batch of cases to execute for a specific release. During a run, you mark each case as passed, failed, or blocked. TestRail tracks history so you can compare pass rates release over release. It exports and imports CSV, which is why Exercise 03 uses CSV format.

**Jira** is a project management tool that most engineering teams already use. It handles tickets — tasks, bugs, stories. Jira alone is not a test case manager, but it works well for tracking defects. When you find a bug in testing, you file a Jira ticket.

**Zephyr** is a Jira plugin (add-on) that brings test case management directly inside Jira. So your test cases, test runs, and bug tickets all live in one place. Teams that run everything in Jira often add Zephyr so QA does not need a separate tool.

You do not need any of these tools to do the exercises — you will work in plain files. But in a real job you will use at least one of them, and knowing what they do helps you speak the language.

---

## 3. Test execution lifecycle — planned → in-progress → passed/failed/blocked

A **test run** is a set of test cases you plan to execute for a release. Each case in the run has a status that moves through a lifecycle:

- **Planned** (sometimes called "Untested") — the test exists in the run but nobody has run it yet. This is the starting state.
- **In Progress** — a tester is currently executing this test case. Some tools skip this state and go straight to a result.
- **Passed** — the tester ran the case, the actual result matched the expected result. Ship it.
- **Failed** — the actual result did not match the expected result. A bug is filed.
- **Blocked** — the tester cannot run the case because something else is broken first. Example: you cannot test the task editing feature if login is completely broken. The case is not failed — it is blocked. You revisit it once the blocker is fixed.

At the end of a run, you report: how many passed, failed, blocked, and not run. The ratio of passed to total executed is your **pass rate**.

---

## 4. Defect lifecycle — new → assigned → fixed → verified → closed

When a tester finds a bug, it goes through its own lifecycle:

- **New** — the bug has just been filed. Nobody has looked at it yet.
- **Assigned** — a developer has been assigned to investigate and fix it.
- **In Progress** (optional step) — the developer is actively working on the fix.
- **Fixed** — the developer says they fixed it and deployed the fix.
- **Verified** — a tester confirmed that the fix works in the test environment. This is QA's job — never let the developer verify their own fix.
- **Closed** — the bug is done. No further action needed.

There are two extra states worth knowing:

- **Reopened** — the tester tried to verify the fix and found it did not work. The bug goes back to Assigned.
- **Won't Fix** — the team decided the bug is not worth fixing (low impact, out of scope). The tester closes it with this reason.

A bug that skips the Verified step is a bug that never really got tested. Always verify before closing.

---

## 5. Exploratory testing — charter-based, session-based, time-boxed

**Exploratory testing** means the tester designs and executes tests at the same time, learning about the software as they go. There is no script telling you exactly which buttons to click. Instead, you use skill, curiosity, and experience to find problems that scripted tests miss.

Three key terms:

- **Charter-based** — before you start, you write a one-sentence mission called a charter. "Explore the task creation flow focusing on edge cases for the due-date field." The charter keeps you focused without scripting every step. You decide what to do as you discover things.

- **Session-based** — the session is a fixed block of uninterrupted exploration. During the session, you take notes. No email, no meetings. At the end, you write a brief report: what you explored, what you found, and what you did not get to.

- **Time-boxed** — the session has a fixed duration, usually 30–90 minutes. The time box stops sessions from expanding forever. When the timer runs out, you write up your notes whether you are finished or not.

A session report typically includes: the charter, tester name, date, duration, observations (anything surprising or unexpected), bugs found (with IDs), coverage summary (what you actually touched), and questions for the team (things you were unsure about).

---

## 6. Exit criteria — what "done" means for testing

**Exit criteria** answer: "How do we know when testing is finished?"

Without exit criteria, testing never officially ends — someone always says "can we run a few more tests just in case?" Exit criteria make "done" objective, not a matter of opinion.

Typical exit criteria for a release:

- All planned test cases have been executed (nothing left as Planned/Untested)
- Pass rate is at or above the agreed threshold (e.g., 95%)
- No open Critical or High severity defects
- All open Medium defects have a documented risk assessment and team sign-off
- All exploratory sessions in the plan have been completed
- API regression collection ran with zero failures
- Performance baselines are within agreed SLOs

Exit criteria are agreed with the release manager before testing starts. If you set them after testing, it is tempting to set them at whatever your actual numbers turned out to be — which defeats the purpose.

---

## 7. Test metrics — pass rate, defect density, coverage

**Metrics** are numbers that tell a story about the quality of testing (and the quality of the product).

**Pass rate** — the percentage of executed test cases that passed.
Formula: `(passed / executed) × 100`
Example: 47 passed out of 50 executed = 94% pass rate.
Note: "executed" does not include Blocked cases — you only count cases that actually ran.

**Defect density** — the number of defects found per unit of code or per feature area.
Formula: `defects found / size of area` (size can be number of stories, lines of code, or feature count)
High defect density in one area tells you that area needs more attention — or a re-design.

**Test coverage** — the percentage of requirements or user stories that have at least one test case covering them.
Formula: `(stories with test coverage / total stories) × 100`
100% coverage sounds great, but thin coverage (one weak test per story) is not the same as meaningful coverage. Quality matters more than the number.

**Other common metrics:**
- Defect removal efficiency (DRE) — percentage of defects found before production vs. total defects
- Mean time to detect (MTTD) — how long on average between a bug being introduced and a tester finding it
- Blocked rate — percentage of test cases blocked at any point in the run

---

## 8. Sign-off — what a QA sign-off document contains

A **sign-off document** is QA's official statement to the release manager: "Based on our testing, here is our recommendation."

It is not a pass/fail checkbox. It is a professional judgment document. It contains:

- **Summary of testing** — what was tested, which test types ran, how many cycles
- **Test results** — total executed, passed, failed, blocked; pass rate
- **Open defects** — a table of every bug that is still open at sign-off time, with severity and risk assessment
- **Risk assessment** — what could go wrong after release, based on what was found during testing
- **Recommendation** — GO (release is safe to proceed) or NO-GO (do not release yet) with explicit reasoning
- **Release conditions** — if recommending GO with caveats, the conditions that must be true before deployment (e.g., "Deploy only to 10% of users initially", "Have rollback plan ready")

The sign-off is a formal document. If the release goes wrong, people will read it. Be honest about what was tested and what was not.

---

## 9. Risk-based release decisions

Not all bugs are equal. A **risk-based release decision** means deciding whether to release based on the risk each open defect poses to users — not simply on whether all bugs are fixed.

A Critical bug that breaks login for all users? That is a NO-GO.
A Low severity cosmetic bug in a rarely visited admin panel? That might be an acceptable risk for GO.

When making a risk-based decision, ask:

- **Severity** — how bad is it if the bug is triggered?
- **Likelihood** — how often will users hit this bug?
- **Workaround available?** — can users avoid the broken path?
- **Can it be fixed in a hotfix?** — is the fix fast enough to deploy post-release?
- **Business impact of delay** — what is the cost of NOT releasing on time?

A risk-based decision is documented in the sign-off. The team accepts the risk together — QA does not make release decisions alone. The recommendation (GO/NO-GO) is QA's input. The final call belongs to the release manager, product owner, or equivalent.

---

## 10. Handoff to production — release notes, rollback plan

Testing ends. The build ships. Here is what a responsible handoff looks like.

**Release notes** — a public or internal document that lists what changed in this release. For QA this means: which bugs were fixed (with IDs), which new features shipped, and any known issues that were accepted risks. Release notes help customer support know what changed and help users understand what is new.

**Rollback plan** — a documented procedure for reverting to the previous version if the release causes production incidents. QA should confirm a rollback plan exists before signing off. The plan should answer: Who gives the order to roll back? How long does rollback take? What data, if any, could be lost? Is there a database migration that cannot be rolled back?

**Deployment checklist** — the sequence of steps to deploy the release, including feature flags to enable, cache clears, and service restarts.

**Post-release monitoring** — after deployment, QA and engineering watch error rates, response times, and user-reported issues for at least 30–60 minutes. If metrics spike, rollback is triggered.

Handing off to production is not "QA is done." It is the transition to production monitoring. Good QA engineers stay available during the deployment window.

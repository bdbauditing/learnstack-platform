# Part 4 — Concepts

Read this before you touch any code. Every idea below comes up in the exercises.

---

## 1. What is test automation and why does it exist?

Imagine you have to click through 50 screens every time you change one line of code. That takes 45 minutes and you have to do it perfectly. Humans get tired, make mistakes, and skip steps. Computers don't.

**Test automation** means writing code that does the clicking and checking for you. You write the script once, and the computer runs it in seconds — every single time you ask.

Benefits:
- **Speed** — a full suite that would take an hour by hand runs in two minutes.
- **Consistency** — the computer does exactly the same steps every run.
- **Repeatability** — run it at midnight, on weekends, on every pull request.
- **Confidence** — if the tests pass, you have a good signal that you didn't break anything.

Automation does not replace exploratory testing. Computers only check what you tell them to check. Exploratory testing finds things you didn't think to check.

---

## 2. Page Object Model (POM)

When you write Playwright tests directly, you end up with lots of `page.fill('#email', 'user@example.com')` calls scattered everywhere. If the HTML ever changes — say, the `#email` selector becomes `.email-input` — you have to hunt through every test file and fix each one.

The **Page Object Model** solves this. The idea:

- Create one TypeScript (or Python) class per page or major component.
- Put all the selectors and interactions for that page *inside* that class.
- Your test file just calls methods like `loginPage.login('user@example.com', 'pass')`.

Now if the selector changes, you fix it in exactly one place — the class — and all tests using it are automatically fixed.

A POM class typically has:
- **Locators** — properties that point to elements (`get emailInput() { return this.page.getByLabel('Email'); }`)
- **Action methods** — `async login(email, password) { ... }`
- **A `goto()` method** — navigates to the page's URL

Think of a POM as a "remote control" for a page. The test holds the remote and presses buttons. It doesn't need to know how the buttons work internally.

---

## 3. CI/CD pipelines — what they are and why tests run there

**CI** stands for Continuous Integration. The idea: every time a developer pushes code, an automated system runs the tests and tells them if something broke — *before* the code reaches production.

**CD** stands for Continuous Delivery (or Deployment). After CI passes, CD can automatically ship the code to a staging or production environment.

A **pipeline** is a series of steps that run automatically. A typical CI pipeline for a web app:
1. Check out the code from git
2. Install dependencies
3. Run linting (code style checks)
4. Run unit tests
5. Run integration/E2E tests
6. (On main branch) deploy to staging

Why run tests in CI?
- Developers forget to run tests locally.
- CI catches failures on *every* push, not just when someone remembers.
- CI creates a shared, neutral environment — "it works on my machine" excuses disappear.
- Pull requests can be blocked from merging if tests fail.

---

## 4. Non-functional testing overview

Most testing checks *what* the app does (functional). Non-functional testing checks *how well* it does it.

Three areas you'll cover in this part:

**Performance testing** — Does the app stay fast under load? If 100 users hit the same endpoint at once, does it respond in under 500ms? Tools: JMeter, k6, Locust.

**Accessibility testing** — Can people with disabilities use the app? Screen readers, keyboard navigation, colour contrast — these matter legally (WCAG 2.1, ADA) and ethically. Tools: axe-core, Lighthouse.

**Security smoke testing** — Are basic security headers in place? Missing headers like `Strict-Transport-Security` or `X-Frame-Options` are easy wins for attackers. This is not a full security audit — just a sanity check.

---

## 5. Flaky tests — causes and fixes

A **flaky test** is one that sometimes passes and sometimes fails, without any code change. Flaky tests are dangerous because developers start ignoring failures — "oh, it's just flaky." Then a real bug slips through.

Common causes:

- **Race conditions** — the test clicks a button before the page has finished loading. The most common cause by far.
- **Hardcoded waits** — `sleep(2)` or `waitForTimeout(500)` are guesses. Sometimes the page loads in 300ms, sometimes in 700ms. The hardcoded number is wrong in both directions.
- **Test order dependency** — one test leaves behind data that breaks the next test.
- **Network variability** — timeouts that pass on fast CI runners fail on slow ones.
- **Shared state** — tests that share a browser session or database can step on each other.

Fixes:
- Use **smart waits** — `await expect(locator).toBeVisible()` waits until the element appears, up to a timeout. Never guess a number of milliseconds.
- Use **`waitFor` on network requests** — `page.waitForResponse(url)` waits for a specific API call to finish.
- Make tests **independent** — each test should set up its own state and clean it up.
- Use **retry logic** carefully — retrying a flaky test hides the root cause; fix the root cause instead.

---

## 6. The test pyramid and where automation fits

The **test pyramid** is a mental model for how many tests to write at each level:

```
        /\
       /  \    E2E (few — slow, expensive, brittle)
      /----\
     /      \  Integration (medium — test components together)
    /--------\
   /          \ Unit (many — fast, cheap, reliable)
  /____________\
```

- **Unit tests** — test one function or class in isolation. Milliseconds to run. Write lots.
- **Integration tests** — test two or more components together (e.g., API + database). Seconds to run. Write some.
- **E2E tests** — test the whole app through the UI. Minutes to run. Write a few for critical paths only.

Playwright and Selenium live at the E2E layer. They're valuable but expensive. Don't try to cover every edge case with E2E tests — that's what unit tests are for.

---

## 7. Selenium vs Playwright tradeoffs

Both tools drive a real browser and can automate web apps. They have different strengths.

| | Selenium | Playwright |
|---|---|---|
| Language | Java, Python, JS, C#, Ruby | JS/TS, Python, Java, C# |
| Age | 2004 (very mature) | 2020 (modern) |
| Browser support | Chrome, Firefox, Safari, Edge, IE | Chrome, Firefox, Safari, Edge |
| Auto-waits | No — you add waits manually | Yes — built-in smart waits |
| Speed | Slower | Faster |
| Parallelism | External (Selenium Grid) | Built-in |
| Best for | Legacy projects, broad browser support | New projects, modern stack |

Playwright wins on developer experience for new projects. Selenium wins when you need to support older browsers, have an existing large Selenium suite, or need Java-specific integrations.

---

## 8. JMeter basics

**Apache JMeter** is a performance testing tool. It sends many HTTP requests simultaneously and measures response times.

Key concepts:

- **Test Plan** — the top-level container for everything. Saved as a `.jmx` file (XML).
- **Thread Group** — defines how many "virtual users" (threads) to simulate and how fast to ramp up. Example: 20 threads, 5-second ramp-up means JMeter starts one new virtual user every 0.25 seconds until it reaches 20.
- **HTTP Sampler** — one HTTP request (GET /tasks, POST /login, etc.).
- **Assertion** — a pass/fail check on the response. Example: "HTTP status must be 200."
- **Listener** — collects results. The Summary Report shows total requests, error rate, p95 response time.

**p95 (95th percentile)** means: 95% of requests completed in this time or less. It's more meaningful than the average because it shows what the slowest 5% of users experienced.

A common SLO (service-level objective): `p95 < 500ms, error rate < 1%`.

---

## 9. GitHub Actions workflow anatomy

GitHub Actions is GitHub's built-in CI system. Workflows are defined in YAML files inside `.github/workflows/`.

A minimal workflow looks like this:

```yaml
name: CI                          # display name

on:                               # WHEN does this run?
  push:
    branches: [main]              # on every push to main

jobs:                             # groups of steps
  test:                           # job name (you choose it)
    runs-on: ubuntu-latest        # which OS

    steps:                        # list of steps to run in order
      - uses: actions/checkout@v4           # clone the repo
      - uses: actions/setup-node@v4         # install Node.js
        with:
          node-version: '20'
      - run: npm ci                         # install dependencies
      - run: npm test                       # run the tests
```

Key fields:
- `on:` — trigger. Common options: `push`, `pull_request`, `schedule`, `workflow_dispatch` (manual).
- `jobs:` — you can have many jobs; they run in parallel by default.
- `steps:` — run in order within a job.
- `uses:` — runs a pre-built action from the GitHub marketplace.
- `run:` — runs a shell command.

If any step exits with a non-zero code, the job fails and GitHub marks the commit red.

---

## 10. Shift-left testing

**Shift left** means moving testing earlier in the development process. Traditionally, testing happened at the end — developers wrote code for weeks, then testers got it and found problems.

Shift-left flips this:
- Write tests *before* or *while* writing code (TDD — Test Driven Development).
- Run automated tests on every commit, not just before release.
- Include QA in requirements discussions, not just implementation reviews.
- Catch bugs when they're cheap to fix (during development) rather than expensive (after release).

The "left" is a reference to a timeline arrow: `Design → Code → Test → Release`. Shifting testing left means moving it closer to the Design end of that arrow.

CI/CD is one of the main enablers of shift-left — automated tests run immediately on every push, giving instant feedback.

---

## 11. Other tools you'll hear about

The exercises use Playwright, JMeter, and GitHub Actions — but the industry has many alternatives. You don't need to learn these now; knowing they exist helps you read job descriptions and team discussions.

**Cypress** — a JavaScript E2E testing framework popular for React/Vue/Angular apps. Like Playwright, it runs in a real browser. Key difference: Cypress runs inside the browser process (fast feedback loop), while Playwright controls the browser from outside (more isolation). Many teams use one or the other; both are good choices.

**Jenkins** — one of the oldest and most widely deployed CI servers. Where GitHub Actions is tightly integrated with GitHub, Jenkins runs on your own infrastructure and is highly customisable via plugins. You'll see Jenkins in enterprise environments with on-premise servers. The concepts are the same — trigger → job → steps → report.

**Appium** — extends Selenium's WebDriver protocol to mobile apps (iOS and Android). Think of it as Selenium for apps instead of websites. If you're testing a React Native or native mobile app, Appium is the standard tool. The test code looks very similar to Selenium tests.

**LoadRunner / Gatling** — alternatives to JMeter for performance testing. LoadRunner is the enterprise standard (HP/Micro Focus, paid, used in large banks and telcos). Gatling is open-source, written in Scala, and generates very clean HTML reports. JMeter is the most common open-source choice; Gatling is preferred when you want code-based test scripts instead of a GUI.

The underlying skill — knowing what to measure, what thresholds to set, and how to interpret results — transfers across all these tools.

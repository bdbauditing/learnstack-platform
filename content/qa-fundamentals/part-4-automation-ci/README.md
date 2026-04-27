# Part 4 — Automation + CI + Non-Functional Basics

## What you will build

You will write a real automation suite for **TaskForge**, a task-management web app. By the end of this part you will have:

- A working Playwright test suite covering login, page objects, and full task CRUD
- A Selenium/pytest test written in Python
- A JMeter load test with a performance baseline
- A GitHub Actions CI workflow that runs your tests on every push
- An accessibility audit using axe-core
- A security smoke test that checks HTTP response headers
- A capstone project that pulls it all together

## Prerequisites

Make sure these are installed before you start:

- **Node.js 20+** — `node --version`
- **Python 3.11+** — `python --version`
- **Playwright** — `npx playwright install` (run once per machine)
- **JMeter 5.6** — download from jmeter.apache.org; `jmeter -v` should work
- **pytest + selenium** — `pip install pytest selenium`
- **Chrome or Chromium** — used by both Playwright and Selenium

## Exercises

| # | Slug | Tool | Time |
|---|------|------|------|
| 01 | first-playwright-test | Playwright | 30 min |
| 02 | page-object-model | Playwright | 40 min |
| 03 | task-crud-automation | Playwright | 45 min |
| 04 | debugging-flaky-tests | Playwright + written | 35 min |
| 05 | selenium-python | Selenium + pytest | 40 min |
| 06 | jmeter-load-baseline | JMeter | 40 min |
| 07 | github-actions-ci | GitHub Actions | 35 min |
| 08 | accessibility-audit | axe-core + Playwright | 35 min |
| 09 | security-smoke | Playwright | 35 min |
| 10 | capstone-automation-suite | Playwright (all tools) | 60 min |

## How to use this part

1. Read `concepts.md` first — it explains every tool and idea in plain English.
2. Take the `quiz.yaml` quiz to check your understanding before coding.
3. Work through exercises in order — later exercises build on earlier ones.
4. Each exercise folder has a `README.md` (start here), a `starter/` folder with code stubs, and a `spec.md` that defines exactly what the grader checks.

# Exercise 06 — Bug Report Suite

**Technique focus:** Defect Reporting + Defect Lifecycle

**Time:** 35 min

## Mission

The TaskForge 2.0 staging environment has 6 planted bugs. Your job is to find and report all 6 using the standard bug report format. A professional bug report has everything a developer needs to reproduce and fix the issue — no back-and-forth required.

You need to report at least 5 of the 6 bugs to pass.

## The 6 planted bugs

Explore these areas to find the bugs:

1. The task creation form — specifically around due dates
2. File attachment uploads — specifically around large files
3. Email notifications — specifically around task assignment
4. Task search — specifically around privacy and data access
5. Bulk operations — specifically around the selection behavior
6. Account settings — specifically around API key access

## Bug report format

Each bug in `starter/bugs.yaml` follows this schema:

```yaml
bugs:
  - title: "Short description (10–200 characters)"
    location: "page / component"
    severity: Critical | High | Medium | Low
    priority: High | Medium | Low
    environment:
      browser: "Chrome 124"
      os: "macOS 14"
      viewport: "1440x900"
      url: "https://TODO:<hostname>/path"
    steps:
      - action: navigate
        url: "https://TODO:<hostname>/path"
      - action: click
        selector: "#submit-button"
      - action: type
        selector: "#title-input"
        value: "My task"
      - action: assert_visible
        selector: ".error-message"
    expected: "What should happen (10+ characters)"
    actual: "What actually happens (10+ characters)"
```

## Deliverable

A completed `starter/bugs.yaml` with at least 5 of the 6 bugs reported.

## How to verify

The grader compares your `bugs.yaml` against the answer key. It checks whether each bug report matches the expected location and keywords.

## Pass condition

At least 5 of the 6 planted bugs are correctly identified and reported with enough detail to match the answer key.

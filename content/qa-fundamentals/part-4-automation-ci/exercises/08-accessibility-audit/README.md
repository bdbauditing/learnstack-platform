# Exercise 08 — Accessibility Audit

**Time:** ~40 minutes
**Grader:** bug-match
**Pass threshold:** 8 of 10 planted violations identified

## Your mission

The TaskForge app has **10 planted accessibility violations** across multiple pages (dashboard, task list, task form modal, billing, profile, login). Your job is to find them and document each one as a structured bug report in `a11y-report.yaml`.

## What is axe-core?

axe-core is an automated accessibility rule engine built on the WCAG 2.1 standard. It injects into a live page, scans the DOM, and reports violations by **rule ID** (e.g. `image-alt`, `color-contrast`, `label`).

Each finding has:
- **Rule ID** — the axe rule that fired (e.g. `button-name`)
- **Impact** — `critical`, `serious`, `moderate`, or `minor`
- **Affected element** — the CSS selector of the broken element
- **Bucket** — `violations` (definitive) or `incomplete` (needs human review). Include both in your report — some rules always land in `incomplete`.

## Step 1 — Run the axe scanner

A helper script is provided to do the scanning for you:

```bash
# From the starter/ directory:
npx ts-node scripts/run-axe-scan.ts
```

It logs every violation it finds: rule ID, impact level, and element selector. You will use this output to fill in `a11y-report.yaml`.

## Step 2 — Fill in a11y-report.yaml

Open `starter/a11y-report.yaml`. It has 10 blank entries (A11Y-001 through A11Y-010). For each violation you find:

- `title` — include the axe rule ID (e.g. `"image-alt: hero image missing alt text"`)
- `description` — explain the accessibility problem and name the element
- `severity` — use the axe impact level: Critical / Serious / Moderate / Minor
- `actual` — quote what axe reported (rule ID + element selector)

## Deliverable

`starter/a11y-report.yaml` — 10 violations filled in.

## Pass condition

The grader compares your descriptions to the answer key using keyword matching. Each violation is matched by its axe rule ID and affected element. **Pass: 8 of 10 violations identified.**

# Exercise 08 — Spec

## Grader config

```yaml
grader: bug-match
submissionFile: a11y-report.yaml
options:
  answerKey: answer-key/a11y-expected.yaml
```

## Planted violations (10 total, pass: 8)

| ID | axe Rule | Element | Impact |
|----|----------|---------|--------|
| A11Y-001 | `image-alt` | `img.hero-banner` | Serious |
| A11Y-002 | `color-contrast` | `button.btn-secondary` | Serious |
| A11Y-003 | `label` | `input#task-title` | Critical |
| A11Y-004 | `button-name` | `button.delete-btn` | Critical |
| A11Y-005 | `link-name` | `a.profile-icon-link` | Serious |
| A11Y-006 | `html-has-lang` | `html` element | Serious |
| A11Y-007 | `aria-progressbar-name` | `span[role=progressbar]` | Moderate |
| A11Y-008 | `duplicate-id-aria` | login `form[aria-describedby]` | Minor |
| A11Y-009 | `heading-order` | sidebar h4 | Moderate |
| A11Y-010 | `frame-title` | `iframe.help-widget` | Serious |

## Matching rules

The `bug-match` grader compares each submitted bug against the answer key using keyword matching on `title + description + actual`. A violation is matched when enough of the signature keywords appear (threshold per violation — see `a11y-expected.yaml`).

The axe rule ID itself (e.g. `"image-alt"`) is always a signature keyword. Including the rule ID in the description virtually guarantees a match.

## Grader notes

- `severity` field: axe uses lowercase (`serious`); the grader normalises case.
- Learner does not need to find violations in a specific order — each A11Y-001..010 slot is matched independently against the full answer key.
- Missing an entry (left blank) is treated as a non-match for that ID.
- The `run-axe-scan.ts` helper script is provided; learners are not graded on it.

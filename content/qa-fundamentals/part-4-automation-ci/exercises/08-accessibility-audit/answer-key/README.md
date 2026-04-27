# Answer Key — Exercise 08: Accessibility Audit

## Grader config (authoritative)

```yaml
grader: bug-match
submissionFile: a11y-report.yaml
options:
  answerKey: answer-key/a11y-expected.yaml
```

## Pass condition

8 of 10 planted violations matched by keyword. Matching uses the `title + description + actual` fields combined. Each violation's signature keywords are in `a11y-expected.yaml`.

## Planted violation reference

| ID | axe Rule | Element | Impact | Must-have keyword |
|----|----------|---------|--------|-------------------|
| A11Y-001 | `image-alt` | `img.hero-banner` | Serious | "image-alt" |
| A11Y-002 | `color-contrast` | `button.btn-secondary` | Serious | "color-contrast" |
| A11Y-003 | `label` | `input#task-title` | Critical | "label" + "task-title" |
| A11Y-004 | `button-name` | `button.delete-btn` | Critical | "button-name" |
| A11Y-005 | `link-name` | `a.profile-icon-link` | Serious | "link-name" |
| A11Y-006 | `html-has-lang` | `html` element | Serious | "html-has-lang" |
| A11Y-007 | `aria-progressbar-name` | `span[role=progressbar]` | Moderate | "aria-progressbar-name" |
| A11Y-008 | `duplicate-id-aria` | login `form[aria-describedby]` | Minor | "duplicate-id-aria" ⚠️ fires as `incomplete` in axe 4.11+ |
| A11Y-009 | `heading-order` | sidebar h4 | Moderate | "heading-order" |
| A11Y-010 | `frame-title` | `iframe.help-widget` | Serious | "frame-title" |

## Common failure patterns

- Learner fills in descriptions without the axe rule ID — then keyword matching misses the violation.
- Learner copies the violation title from the Lighthouse report (uses different rule IDs than axe-core).
- `color-contrast` violation is often missed because it requires the scanner to compute ratios — learner must let axe run fully, not just check for ARIA issues.
- `duplicate-id-aria` and `heading-order` are moderate/minor severity and learners may ignore them, but they need 8/10, so skipping 3+ will fail.
- **A11Y-008 (`duplicate-id-aria`)**: axe 4.11+ puts this in `results.incomplete` rather than `results.violations`. The starter script prints both buckets, but learners who write their own scanner and only check `violations` will miss it. Accept reports that describe the login-form duplicate-id-aria finding regardless of whether the learner labels it "violation" or "incomplete".

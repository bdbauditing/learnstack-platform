# Exercise 04 Spec — Fix Bad Reports

## The 5 Bad Reports (in starter/bad-reports.yaml)

1. "Login broken" — no steps, no environment, expected/actual swapped
2. "Cart price wrong sometimes" — vague steps ("add some items"), no selector
3. "Dashboard crashes" — only actual, no expected, no environment
4. "The email thing doesn't work" — completely vague, no location
5. "Button problem on mobile" — no device info, no selector, no steps

## Grader Config
- Grader: structured-doc (validate fixed-reports.yaml structure)
- Required fields per entry: title, location, severity, priority, environment (all sub-fields), steps (min 3), expected (min 10 chars), actual (min 10 chars)
- All 5 reports must pass validation to pass the exercise

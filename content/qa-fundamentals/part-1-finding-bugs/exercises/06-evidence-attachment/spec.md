# Exercise 06 Spec — Evidence Attachment

## Validation Rules
- `evidence.screenshot`: must be a non-empty filename ending in .png or .jpg
- `evidence.console`: must contain an error signature (at least 10 chars)
- `evidence.network`: must contain a URL and a status code

## Grader Config
- Grader: structured-doc (validate evidence fields in bugs-with-evidence.yaml)
- All 3 evidence types required per report
- All 3 reports must pass

## Detailed Validation Logic

### screenshot
- Non-empty string
- Ends with `.png` or `.jpg` (case-insensitive)
- Does not need to be a real file

### console
- Non-empty string, minimum 10 characters
- Should look like a real console message (error type, file reference, or message text)
- Accept any non-empty string ≥ 10 chars (generous — learners are writing plausible errors)

### network
- Must contain a path fragment starting with `/api/` or a full URL containing `http`
- Must contain a 3-digit HTTP status code (e.g. 200, 404, 500, 422)
- Pattern: `(GET|POST|PUT|DELETE|PATCH)\s+\S+\s*→\s*\d{3}` or similar

## Notes for Grader Authors
Be generous. The learning objective is that learners understand WHAT evidence to include, not that they format it perfectly. If the three fields are present and non-empty, give benefit of the doubt.

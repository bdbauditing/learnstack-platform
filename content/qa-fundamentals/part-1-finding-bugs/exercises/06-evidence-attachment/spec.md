# Exercise 06 Spec — Evidence Attachment

## Grader Config

- Grader: `github-issues`
- Required: 3 bug-*.md files in starter/ (pre-filled, add evidence only)
- Each file must have: all 4 standard sections + ## Evidence section
- Evidence checks: screenshot filename, console snippet, network request
- Pass threshold: all 3 files pass

## Validation Rules

### ## Evidence section
Must contain:
- **Screenshot:** — a filename ending in .png or .jpg
- **Console:** — at least 10 characters (the relevant error line)
- **Network:** — at least 10 characters mentioning a URL path and HTTP status code

## Detailed Validation Logic

### screenshot
- Non-empty string, ends with `.png` or `.jpg` (case-insensitive)

### console
- Non-empty string, minimum 10 characters
- Accept any non-empty string ≥ 10 chars

### network
- Must mention a path starting with /api/ or contain http
- Must contain a 3-digit HTTP status code

## Notes for Grader Authors

Be generous. The learning objective is that learners understand WHAT evidence to include, not that they format it perfectly.

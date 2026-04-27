# Grader Notes — Exercise 04

**Grader:** markdown-doc (see `grader-config.yaml`)

Validation is structural only. We check that `bug-001.md` through `bug-005.md` exist in `starter/` and each file has:
- Non-empty `title`, `severity`, `priority` in frontmatter
- `## Environment`, `## Steps to Reproduce`, `## Expected Behavior`, `## Actual Behavior` sections with ≥10 chars of content each

We do NOT check if the learner identified the same bug correctly — any plausible rewrite that is structurally valid passes. The learning objective is "write good repro steps", not "guess the right bug".

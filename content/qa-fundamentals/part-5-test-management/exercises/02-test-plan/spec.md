# Exercise 02 — Spec

## Grader config

```yaml
grader: structured-doc
submissionFile: test-plan.md
options:
  rubric:
    - section: "Scope"
      minWords: 20
      keywords: ["scope", "in scope", "out of scope", "feature", "included", "excluded"]
      keywordThreshold: 0.3
    - section: "Test Objectives"
      minWords: 15
      keywords: ["verify", "validate", "ensure", "objective", "goal", "confirm"]
      keywordThreshold: 0.3
    - section: "Entry Criteria"
      minWords: 15
      keywords: ["entry", "criteria", "ready", "build", "environment", "before"]
      keywordThreshold: 0.3
    - section: "Exit Criteria"
      minWords: 15
      keywords: ["exit", "criteria", "pass", "rate", "defect", "complete", "done"]
      keywordThreshold: 0.3
    - section: "Risks and Mitigations"
      minWords: 20
      keywords: ["risk", "mitigation", "if", "impact", "likelihood", "contingency"]
      keywordThreshold: 0.3
```

## Detailed requirements

1. The submission file is `test-plan.md` in the `starter/` directory.
2. The file must contain all 8 sections using H2 headings: `## Scope`, `## Test Objectives`, `## Test Types`, `## Entry Criteria`, `## Exit Criteria`, `## Test Environment`, `## Risks and Mitigations`, `## Deliverables`.
3. The grader checks 5 of the 8 sections (Scope, Test Objectives, Entry Criteria, Exit Criteria, Risks and Mitigations).
4. Each of the 5 graded sections must meet the word count floor and keyword density threshold specified in the config.
5. The Risks and Mitigations section must describe at least 2 distinct risks — the word count floor of 20 words effectively enforces this.

## Grader notes

The `structured-doc` grader matches section headings by substring. `## Scope` matches "Scope" in the heading text. Ensure learners do not rename sections.

Keyword density is calculated as: (unique matched keywords in section) / (total keywords in list). A threshold of 0.3 means at least 2 of the 6 listed keywords must appear somewhere in the section text.

The Test Types, Test Environment, and Deliverables sections are not graded but must be present in the file — the intent is to build the habit of including all plan components.

# Answer Key — Exercise 02: Test Plan

## Grader config (authoritative)

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

## Grader notes

- Pass = all 5 graded sections meet word count and keyword density requirements.
- The Test Types, Test Environment, and Deliverables sections are checked for presence by convention but are not graded by the automated grader.
- If a learner renames a section (e.g., "## Entry Criteria" → "## Prerequisites"), the grader will miss it. Staff should check for renamed sections if a learner reports an unexpected fail.

## Reference answer (staff only)

### Scope

**In scope:**
- All new TaskForge 2.0 features: task due dates, file attachments, email notifications, role-based access control, task search, bulk delete, reporting dashboard, API key management.
- TaskForge REST API regression — all endpoints touched by 2.0 features.
- Web UI on Chrome (latest), Firefox (latest), Safari (latest) on desktop.

**Out of scope:**
- TaskForge v1.0 features that are unchanged in 2.0 (login, basic task CRUD).
- Mobile app (shipped separately).
- Admin billing panel (separate release timeline).

### Test Objectives

- Verify all 12 user stories have been implemented and meet their acceptance criteria.
- Validate that no existing TaskForge 1.0 features were broken by the 2.0 changes (regression).
- Ensure all API endpoints return correct status codes and response bodies for valid and invalid requests.
- Confirm that role-based access control prevents unauthorized access at both UI and API levels.
- Validate that the release meets performance exit criteria (task list loads within 2 seconds under standard load).

### Entry Criteria

- A stable TaskForge 2.0 build is deployed to the staging environment.
- All P1 (Critical) bugs from the development sprint are fixed and verified.
- Test data (users, projects, tasks) is seeded in the staging environment.
- The staging environment is confirmed accessible by all testers.
- All test cases for the planned scope are written and reviewed.

### Exit Criteria

- Pass rate is at or above 95% across all executed test cases.
- No open defects with severity Critical or High.
- All planned test cases have been executed (none remain in Planned/Untested status).
- All exploratory testing sessions have been completed.
- API regression collection runs with zero failures.
- Sign-off document has been reviewed and signed by the QA lead.

### Risks and Mitigations

**Risk:** Staging environment instability causes test runs to fail intermittently.
**Impact:** High — intermittent failures make it hard to distinguish real bugs from environment noise.
**Mitigation:** Daily environment health check at start of each test day. Escalation path to DevOps for same-day fixes.

**Risk:** Test data corrupted mid-sprint by another team's deployment.
**Impact:** Medium — tests relying on specific data will fail or produce unreliable results.
**Mitigation:** Snapshot the staging database at the start of each test day. Restore from snapshot if corruption is detected.

**Risk:** A key tester is unavailable for part of the sprint.
**Impact:** Medium — coverage gaps if only one tester knows a specific feature area.
**Mitigation:** All test procedures documented in the test cases. Any team member can execute any test case without prior knowledge of the feature.

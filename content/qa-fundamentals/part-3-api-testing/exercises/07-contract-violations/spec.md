# Exercise 07 Spec — Contract Violation Detection

## Planted Violations

| ID | Endpoint | Spec says | API returns | Type |
|----|----------|-----------|-------------|------|
| VIO-001 | GET /tasks response item | `priority` is type string ("High"/"Medium"/"Low") | `priority` is type integer (1/2/3) | Wrong type |
| VIO-002 | POST /tasks response | `created_at` is required in response | `created_at` field is absent | Missing required field |
| VIO-003 | GET /tasks/:id | `completed` is type boolean | `completed` is returned as string "true"/"false" | Wrong type |

## Grader Config

```yaml
grader: bug-match
submissionFile: violations.yaml
answerKeyFile: violations-expected.yaml
options:
  passThreshold: 3
```

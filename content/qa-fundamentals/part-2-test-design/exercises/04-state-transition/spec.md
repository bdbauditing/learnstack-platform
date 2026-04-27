# Exercise 04 Spec — State Transition Matrix

## Answer Key

| State | submit | approve | reject | ship | deliver | cancel |
|-------|--------|---------|--------|------|---------|--------|
| draft | submitted | invalid | invalid | invalid | invalid | cancelled |
| submitted | invalid | approved | draft | invalid | invalid | cancelled |
| approved | invalid | invalid | invalid | shipped | invalid | invalid |
| shipped | invalid | invalid | invalid | invalid | delivered | invalid |
| delivered | invalid | invalid | invalid | invalid | invalid | invalid |
| cancelled | invalid | invalid | invalid | invalid | invalid | invalid |

## Grader Config
- Grader: structured-doc (validate YAML structure + values)
- Pass: 90% of cells correct (30+ of 36)

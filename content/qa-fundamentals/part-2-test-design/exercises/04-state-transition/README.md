# Exercise 04 — State Transition Matrix

**Technique focus:** State Transition Testing

**Time:** ~25 minutes
**Grader:** structured-doc
**Pass threshold:** 90% of transitions correct

## Your mission

Complete the state transition matrix for an **order lifecycle**.

States: `draft`, `submitted`, `approved`, `shipped`, `delivered`, `cancelled`

Events: `submit`, `approve`, `reject`, `ship`, `deliver`, `cancel`

## Deliverable

`starter/transitions.yaml` — for each state+event combination, fill in the resulting state (or `"invalid"` if the transition is not allowed).

## Rules

- draft + submit → submitted
- draft + cancel → cancelled
- submitted + approve → approved
- submitted + reject → draft (goes back for revision)
- submitted + cancel → cancelled
- approved + ship → shipped
- shipped + deliver → delivered
- Everything else is invalid

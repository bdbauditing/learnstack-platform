# Part 2 Concepts — Test Design Techniques

**Reading time:** ~15 minutes

---

## 1. Why we design tests (not just run them)

Most beginners open an app and start clicking around. They find *some* bugs — but they find them by accident, not by plan. The moment they stop clicking in new ways, coverage stalls.

Here is the difference:

- **Finding a bug by accident:** You tried a weird input and something broke. Lucky! But you can't reproduce that luck reliably, and you have no idea what you haven't tried.
- **Finding a bug by plan:** You mapped out the input space, identified the partitions, and chose representatives. You know exactly what you've covered and what you haven't.

Tests that only check the happy path give *false confidence*. The happy path is what the developer tested themselves. Bugs live in the paths they didn't think about.

**Systematic test design = higher bug catch rate + less duplicated effort.**

> Test design is choosing WHAT to test before HOW to test it.

---

## 2. Equivalence Partitioning

The core idea: most inputs can be divided into groups ("partitions") that the system treats exactly the same way. If the system handles one value in a partition correctly, it will handle them all correctly. If it fails on one, it fails on all.

**So you only need one representative per partition.**

Example — an age field that accepts 18–65:

| Partition | Range | Representative |
|-----------|-------|----------------|
| Below minimum (invalid) | < 18 | 15 |
| Valid range | 18–65 | 30 |
| Above maximum (invalid) | > 65 | 70 |

You test 15, 30, and 70 — not every number from 1 to 100. That's three tests instead of one hundred, with the same coverage.

**The rule:** if one value in the partition fails/passes, all others in that partition will too. You're not skipping tests — you're eliminating redundant ones.

Apply this to:
- Numeric ranges (age, price, quantity)
- String lengths (username min/max chars)
- Categories (valid file types, valid country codes)
- States (logged in / logged out)

---

## 3. Boundary Value Analysis

Equivalence partitioning tells you *which groups* to test. Boundary Value Analysis (BVA) tells you *where in the group* to test.

**Bugs cluster at the edges of partitions, not the middles.**

Why? Because developers write conditions like `if age > 18` when they should write `if age >= 18`. The middle of the valid range (age = 40) will never reveal that bug. The boundary (age = 18) will.

**Test at the boundary and one step either side: min-1, min, min+1, max-1, max, max+1**

Same age example (valid range: 18–65):

| Value | Why |
|-------|-----|
| 17 | Just below minimum (invalid — should reject) |
| 18 | At minimum (valid — should accept) |
| 19 | Just above minimum (valid — confirms boundary isn't off-by-one) |
| 64 | Just below maximum (valid) |
| 65 | At maximum (valid — should accept) |
| 66 | Just above maximum (invalid — should reject) |

> "The off-by-one error is the most common programming mistake. BVA finds it."

Combine BVA with equivalence partitioning: use EP to find your partitions, then use BVA to choose *which values* to test at each boundary.

---

## 4. Decision Tables

Use decision tables when the behavior of a system depends on **combinations of conditions**. A single condition is easy to test. Three or four conditions interacting create dozens of paths — decision tables force you to see all of them.

**Structure:**
- Rows = conditions (each with Y/N or specific values)
- Columns = rules (every unique combination of condition values)
- Bottom rows = actions (what the system does for each rule)

**Example — shipping rules:**

| | Rule 1 | Rule 2 | Rule 3 | Rule 4 |
|--|--------|--------|--------|--------|
| Order ≥ $50 | Y | Y | N | N |
| Member | Y | N | Y | N |
| **Shipping cost** | $0 | $10 | $5 | $10 |

With 2 binary conditions, you get 2² = 4 rules. With 3 binary conditions, 2³ = 8 rules. The table forces you to think about every combination, including the ones the spec forgot to mention.

**When to use it:**
- Discount/pricing logic
- Permission systems (role × action × resource)
- Form validation with multiple dependent fields
- Anywhere you see "if X and Y, then Z; but if X and not Y, then..."

---

## 5. State Transition Testing

Some systems don't just *respond* to inputs — they move through defined **states**. A shopping cart can be empty, have items, be in checkout, or be paid. The state affects what actions are valid.

**State transition testing covers:**
1. Every valid transition (what should happen)
2. Every invalid transition (what should be rejected)

**Example — shopping cart states:**

```
empty → has-items → checkout → paid → shipped
```

Valid: add item to empty cart → has-items. Valid: pay a checkout cart → paid.
Invalid: pay an empty cart → should be rejected (or impossible).

**State transition matrix:** rows = current state, columns = events/actions, cells = resulting state or "invalid".

| | add item | checkout | pay | ship |
|--|----------|----------|-----|------|
| empty | has-items | invalid | invalid | invalid |
| has-items | has-items | checkout | invalid | invalid |
| checkout | has-items | invalid | paid | invalid |
| paid | invalid | invalid | invalid | shipped |

Testing the "invalid" cells is just as important as the valid ones. Developers often protect the happy path but leave the invalid paths unguarded.

---

## 6. Pairwise Testing (brief)

Some features have many input fields, each with many values. 10 options × 10 options × 10 options = 1,000 combinations. Full combinatorial testing is impossible.

**Pairwise testing** reduces this by testing every *pair* of values at least once instead of every combination. Research shows most bugs are triggered by the interaction of two inputs — three-way interactions are rare.

- Typically reduces test count by 70–90%
- Still catches the vast majority of bugs
- Don't calculate by hand — use a tool like **PICT** (Microsoft's free tool) or **Allpairs**

**When to use:** any feature with 4+ input fields that each have multiple valid values.

---

## 7. Smoke vs Sanity vs Regression

Three words testers use constantly — and often confuse:

**Smoke test:**
- "Does the app start?"
- Run after *every deployment*, even small ones
- 5–15 tests max, completes in minutes
- Fails loudly if something catastrophic broke

**Sanity test:**
- "Does this specific new thing work?"
- Run after a *targeted fix or feature*
- Narrow scope — just the changed area and its immediate neighbors
- Faster than regression, deeper than smoke

**Regression test:**
- "Did we break anything that used to work?"
- Run *before release* or on a schedule
- Broader coverage, slower
- The suite grows over time as bugs are found and added

> Key insight: choose which suite to run based on *why* you're testing, not habit. Running full regression after every commit is slow and pointless. Running smoke before release is dangerous.

---

## 8. Traceability

**Traceability** is the discipline of connecting test cases to requirements, and defects to test cases.

**Traceability matrix:**
- Rows = requirements
- Columns = test cases
- Checkmarks = which tests cover which requirements

Example:

| | TC-001 | TC-002 | TC-003 |
|--|--------|--------|--------|
| REQ-001: Login works | ✓ | ✓ | |
| REQ-002: Invalid login rejected | | ✓ | |
| REQ-003: Password reset works | | | ✓ |

**Why it matters:**

- If a requirement has no test cases → it's untested. Full stop.
- If a defect can't be linked to any test case → your test suite has a gap.
- If all your tests link to one requirement and another has none → you're over-testing one thing and ignoring another.

> "Traceability makes coverage visible, not theoretical."

Without traceability, coverage is a feeling. With it, coverage is a fact.

**After a production bug:** the correct sequence is:
1. Write the test case that would have caught it
2. Run it (confirm it fails against the bug)
3. Fix the bug
4. Run it again (confirm it passes)
5. Add it to the regression suite
6. Link it to the requirement it violated in the traceability matrix

---

## 9. Cucumber/Gherkin

Many enterprise QA teams use Cucumber/Gherkin to write test cases in natural language (Given/When/Then) — worth knowing the syntax exists even if you don't use it here.

Example:
```gherkin
Given a user account exists with email "user@example.com"
When the user logs in with the correct password
Then the user is redirected to the dashboard
```

---

## Summary

| Technique | Use when |
|-----------|----------|
| Equivalence Partitioning | Inputs fall into groups the system treats the same |
| Boundary Value Analysis | You need to find off-by-one errors at partition edges |
| Decision Tables | Behavior depends on combinations of conditions |
| State Transition | System moves through defined states |
| Pairwise Testing | Combinatorial explosion of input values |
| Smoke Tests | After every deployment — is the app alive? |
| Sanity Tests | After a targeted fix — did it work? |
| Regression Tests | Before release — did we break anything? |
| Traceability Matrix | Always — connecting tests to requirements and defects |

Now apply these in the exercises.

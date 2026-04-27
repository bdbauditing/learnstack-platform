# Starter — Exercise 01: Requirements Gap Analysis

Follow these steps in order.

## Step 1 — Read the user stories

Open `user-stories.md`. Read all 12 stories from top to bottom. As you read, ask yourself: "Could I write a test case that passes or fails this story right now?" If the answer is no, you have found a gap.

## Step 2 — Spot the patterns

Look for these red flags as you read:

- **No acceptance criteria at all** — if there are no bullet points describing what "done" looks like, it is a gap.
- **Weasel words** — "fast", "easy", "good", "reasonable", "appropriate". These cannot be tested without a number.
- **Undefined nouns** — "required fields", "productivity", "sensitive data". What does the word actually mean in this context?
- **Missing edge cases** — what happens if input is empty, too long, in the wrong format, or out of range?
- **Missing constraints** — maximum file size, maximum characters, timeout thresholds, rate limits.

## Step 3 — Open the gap analysis template

Open `gap-analysis.md`. You will see 5 gap sections with placeholder text. Replace the placeholder text with your real analysis.

## Step 4 — Fill in Gap 1

- Replace `[Story ID]` in the heading with the story ID (e.g., `## Gap 1 — US-001`)
- Under "What is unclear", write 2–3 sentences explaining the specific problem. Do not just say "no acceptance criteria" — say WHY that makes it untestable.
- Under "Suggested clarification", write what the story should say. Use concrete, measurable language.

## Step 5 — Fill in Gaps 2 through 5

Repeat Step 4 for four more gaps. Each gap should reference a different story.

Tip: US-001, US-002, US-003, and US-004 are obvious starting points — they have no acceptance criteria at all. US-006, US-007, US-009, and US-012 also have noted gaps in their criteria.

## Step 6 — Optional: add more gaps

If you spotted more than 5 issues, add `## Gap 6`, `## Gap 7`, etc. using the same format. More gaps = more thorough analysis. The grader checks the first 5 but will not penalize you for adding more.

## Step 7 — Review your work

Before submitting, re-read your gap analysis and check:

- Does each gap reference a specific story ID?
- Does each "What is unclear" section explain WHY the story is untestable, not just THAT it is untestable?
- Does each "Suggested clarification" give a concrete, measurable alternative?
- Did you use QA vocabulary: acceptance criteria, testable, ambiguous, clarification, missing, unclear?

## Hints

- A story with acceptance criteria can still have gaps — look at US-006, US-009, and US-012 for criteria that are incomplete rather than absent.
- "Fast" is not testable. "Loads within 2 seconds on a 10Mbps connection" is testable. When you spot unmeasurable language, always suggest a specific number or threshold.
- If you are unsure whether something is really a gap, write it down anyway and let the product owner decide. It is better to raise a question than to silently guess.

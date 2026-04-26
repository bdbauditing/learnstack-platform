# Starter — Exercise 04: Exploratory Testing Session

Follow these steps in order.

## Step 1 — Write your charter BEFORE you start exploring

Open `session-charter.md`. Fill in the Charter section first — before you open the app.

A charter has two parts:

1. **Mission** — one sentence. What are you exploring? What are you looking for?
   - Good: "Explore the file attachment feature to discover validation gaps and error handling issues."
   - Weak: "Test file attachments."

2. **Areas** — which features or pages you plan to visit. This keeps you focused.

The charter is a plan, not a commitment. If you discover something interesting in a different area, follow it. Just note the detour in your session report.

## Step 2 — Access the application

Open TaskForge 2.0 staging: `TODO: <hostname>`

Log in with your test account. If you do not have staging access, use a local dev build or simulate the session based on your knowledge of the features.

## Step 3 — Start a 30-minute timer

Use your phone, a browser tab, or any timer. The time box is important:

- It creates focus — you cannot explore everything, so you make choices about what matters most.
- It stops sessions from running indefinitely.
- It forces a write-up at the end instead of "I'll document it later."

## Step 4 — Explore and take notes

While the timer runs, explore the features in your charter. As you go:

- Write running notes directly into the `### Notes and observations` section. Bullet points are fine — do not stop to write polished sentences.
- When you spot something unexpected, note it immediately (memory is unreliable mid-session).
- Ask "what happens if..." questions and then answer them by trying it.

Good exploratory questions:
- What happens if the title is 500 characters long?
- What happens if I upload a file with no extension?
- What happens if I open the same task in two tabs and edit it in both?
- What happens if I search with an empty string?
- What happens if I rapidly click Save multiple times?

## Step 5 — When the timer ends, stop exploring

Do not keep going "just a few more minutes." The time box is part of the discipline.

## Step 6 — Write up the session report

Fill in the remaining sections:

- **Bugs found** — any defects you observed. Brief descriptions with reproduction steps.
- **Coverage summary** — what you explored and what you did NOT get to (important — acknowledging gaps is professional).
- **Questions for the team** — anything you were unsure about. A good question is more valuable than silence.

## Hints

- "I found nothing" is a valid result if you explored thoroughly and documented what you covered. But be honest — if you rushed, say so.
- The best exploratory testers think like users, not like developers. Ask: "What would a non-technical user do here?"
- Pay attention to transitions — what happens when you navigate away from an unsaved form? What happens when a session expires mid-task?
- Confusion is a finding. If something is confusing or hard to discover (like the drag-and-drop area), note it — usability issues are real defects.

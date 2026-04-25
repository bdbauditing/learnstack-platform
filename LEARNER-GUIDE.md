# Learner Guide

## Logging in

Go to `http://localhost:5174`. Enter the email and password your instructor gave you. If you see "Invalid credentials", double-check the email — passwords are case-sensitive.

## Navigating the curriculum

After login you land on the **Dashboard**. It shows all 5 parts of the QA Fundamentals track. Click any part to open it.

Each part has three tabs:

| Tab | What's here |
|-----|-------------|
| **Concepts** | Reading material for the part — theory, examples, diagrams |
| **Exercises** | List of graded exercises with your current status |
| **Quiz** | A multiple-choice knowledge check |

## Taking a quiz

1. Open a part and click the **Quiz** tab.
2. Answer every question. Submit is disabled until all are answered.
3. Click **Submit quiz**. Your score appears immediately with per-question explanations.
4. If you fail (score below the pass threshold shown in the header), click **Try again** to retake it.
5. Your best attempt is shown as a badge on the Exercises tab.

## Submitting an exercise

Each exercise requires submitting a fork of the curriculum repo with your work added.

### Step 1 — Fork the curriculum repo

Fork `learnstack-qa-track` on GitHub to your personal account.

### Step 2 — Do the work

Clone your fork. Read the exercise `spec.md` inside the part's `exercises/<exercise-slug>/` directory. Complete the work in the `starter/` folder according to the spec.

### Step 3 — Push your changes

Commit and push your changes to your fork. Copy the GitHub URL of your fork (e.g. `https://github.com/yourname/learnstack-qa-track`).

### Step 4 — Submit

1. In the platform, open the part and click the **Exercises** tab.
2. Click the exercise you completed.
3. Paste your fork URL in the **Fork URL** field.
4. Optionally paste a commit SHA to pin the exact commit. If left blank, the latest commit on the default branch is graded.
5. Click **Submit for grading**.

### Step 5 — Wait for results

Grading usually takes 10–30 seconds. The exercise status badge updates automatically when grading finishes. Refresh the page if it stays on "Grading…" for more than a minute.

## Reading grader output

If your submission is **Failed** or **Error**, click into the exercise and read the feedback. For bug-match exercises it shows:

- How many bugs you found vs. how many were required
- For each expected bug: whether you matched it and why/why not
- Keyword and location hints

**Error** (orange) usually means the grader couldn't find your work in the submitted fork — check that your fork URL is correct and the file is in the right path (`content/<part>/<exercise>/starter/`).

## Tracking your overall progress

Click **Progress** in the nav bar. You'll see:

- A completion bar showing how many of the 48 items (43 exercises + 5 quizzes) you've completed
- A card per part with a grid of coloured badges for each exercise

**Badge colours:** green = passed, red = failed, blue = grading, orange = error, grey = not started. Click any badge to go directly to that exercise.

## Getting help

If an exercise or quiz doesn't load, try refreshing. If a submission stays on PENDING for more than 2 minutes, contact your instructor — they can see the error in the admin Submissions view.

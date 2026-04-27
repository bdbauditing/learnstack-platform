# Exercise 03 — Bug Hunt: Team Billing Page

**Time:** ~30 minutes
**Grader:** bug-match
**Pass threshold:** 5 out of 6 bugs

## Your mission

The TaskForge team billing / subscription upgrade page has **6 planted bugs**. Find and report them.

## The app

**https://learnstack-taskforge-web.onrender.com** — log in, then go directly to `/billing`.

**Test credentials:** `bob@taskforge.io` / `Password1!`
> The login submit button is visually broken — press **Enter** to log in.

The billing page is TaskForge's subscription upgrade screen. You pick a plan, set the seat count, apply a promo code, and proceed.

What to test:
- Seat count controls — try decreasing all the way down to 0
- Plan selection — what happens when you remove the selected plan?
- Price calculation — does the total update when you change seat count?
- Promo code field — try `SAVE10`
- Proceed button — when should it be active vs disabled?
- Price display — look closely at how prices are formatted

## How to file bug reports

1. Go to **your fork** on GitHub
2. Click the **Issues** tab → **New Issue** → **Bug Report**
3. Fill in the title, severity/priority, all four sections, and submit
4. Copy the issue URL and paste it into `starter/submissions.txt` — one URL per line

See Exercise 01's README for the full bug report format.

## How to submit

Open `starter/submissions.txt` and paste your issue URLs there. Push your fork — CI grades automatically.

**Pass threshold: 5/6.**

# Exercise 03 — Bug Hunt: Team Billing Page

**Time:** ~30 minutes
**Grader:** bug-match
**Pass threshold:** 5 out of 6 bugs

## Your mission

The TaskForge 2.0 team billing / subscription upgrade page has **6 planted bugs**. Find and report them.

## The app

**https://learnstack-taskforge-web.onrender.com** — log in, then navigate to **Settings → Billing → Upgrade Plan**.

**Test credentials:** `bob@taskforge.io` / `Password1!`
> The login submit button is visually broken — press **Enter** to log in.

What to test:
- Seat count controls (increase, decrease, reduce to 0)
- Remove plan / clear selection
- Price calculations (price per seat × seat count)
- Promo code application
- Proceed to checkout button state
- Empty selection state (no plan chosen)

## Deliverable

`starter/bugs.yaml` with at least 5 bug reports. **Pass threshold: 5/6.**

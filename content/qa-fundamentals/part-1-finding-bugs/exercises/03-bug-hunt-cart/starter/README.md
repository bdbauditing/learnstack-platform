# Starter — Exercise 03: Bug Hunt Billing Page

Log in at **https://learnstack-taskforge-web.onrender.com** then go to **`/billing`** — the subscription upgrade page. Find 6 bugs. **Need 5/6 to pass.**

**Login:** `bob@taskforge.io` / `Password1!` — press **Enter** to submit (the login button is a known bug from Exercise 01).

## What you're testing

The billing page lets teams choose a subscription plan, set a seat count, and apply promo codes. It has 6 planted bugs — look for:

- Seat count controls (try going below 1)
- Price totals — do they update when seat count changes?
- Promo code behavior (try `SAVE10`)
- Button states that don't match the app state
- How plan prices are displayed

## How to file a bug report

File each bug as a **GitHub Issue** on your fork, then paste the issue URLs into `submissions.txt`.

1. Go to your fork on GitHub → **Issues** tab → **New Issue** → **Bug Report**
2. Fill in the title, severity, priority, and all four sections
3. Submit and paste the URL into `submissions.txt`

## Example report

```markdown
# [Billing] Seat count can be decremented to 0

**Severity:** High
**Priority:** High

## Environment

- **Browser:** Chrome 130
- **OS:** macOS 14
- **Viewport:** 1440x900
- **URL:** https://learnstack-taskforge-web.onrender.com/billing

## Steps to Reproduce

1. Log in and navigate to /billing
2. Select any subscription plan
3. Click the − (decrease) button on the seat count
4. Keep clicking until the count reaches 0

## Expected Behavior

The − button becomes disabled when seat count reaches 1 (minimum valid value).

## Actual Behavior

Seat count decrements to 0 with no validation or error message.
```

## Tips

- Try the `−` button on seat count repeatedly until something odd happens.
- Select a plan, then click Remove — does the total update?
- Enter promo code `SAVE10` — check the final price carefully.
- Look at how the price numbers are displayed on each plan card.
- Is the Proceed button active when it shouldn't be?

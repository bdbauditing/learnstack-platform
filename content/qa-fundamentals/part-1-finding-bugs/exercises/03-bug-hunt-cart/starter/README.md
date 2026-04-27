# Starter — Exercise 03: Bug Hunt Billing Page

Log in at **https://learnstack-taskforge-web.onrender.com** then go to **`/billing`** — the subscription upgrade page. Find 6 bugs. **Need 5/6 to pass.**

**Login:** `bob@taskforge.io` / `Password1!` — press **Enter** to submit (the login button is a known bug).

## What you're testing

The billing page lets teams choose a subscription plan, set a seat count, and apply promo codes. It has 6 planted bugs — look for:

- Seat count going below a valid number
- Price totals not updating when they should
- Promo code behaviour (try `SAVE10`)
- Button states that don't match app state
- How prices are displayed

## Format

```yaml
bugs:
  - title: "[Billing] What's wrong when doing what"
    location: "billing/component-name"
    severity: Critical | High | Medium | Low
    priority: High | Medium | Low
    environment:
      browser: Chrome 130
      os: macOS 14
      viewport: 1440x900
      url: "https://learnstack-taskforge-web.onrender.com/billing"
    steps:
      - action: navigate
        url: "/billing"
      - action: click
        selector: '[data-test="seat-decrease"]'
      - action: assert_text
        selector: '[data-test="seat-count"]'
        value: "0"
    expected: "Seat count cannot go below 1"
    actual: "Seat count decremented to 0"
```

## Tips

- Try the `−` button on seat count repeatedly until something odd happens.
- Select a plan, then click Remove — what happens to the total?
- Enter promo code `SAVE10` — check the final price carefully.
- Look at the price numbers displayed on each plan card.
- Check whether the Proceed button is active when it shouldn't be.

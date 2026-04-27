# Starter — Exercise 03: Bug Hunt Shopping Cart

Open **https://learnstack-taskforge-web.onrender.com** → log in → add a product → go to Cart. Find 6 bugs. **Need 5/6 to pass.**

**Login:** `bob@taskforge.io` / `Password1!` — press **Enter** to submit (the button is a known bug).

## Format

```yaml
bugs:
  - title: "[Area] What's wrong when doing what"
    location: "cart/component-name"
    severity: Critical | High | Medium | Low
    priority: High | Medium | Low
    environment:
      browser: Chrome 130
      os: macOS 14
      viewport: 1440x900
      url: "https://learnstack-taskforge-web.onrender.com/cart"
    steps:
      - action: navigate
        url: "/cart"
      - action: click
        selector: '[data-test="qty-decrease"]'
      - action: assert_text
        selector: '[data-test="cart-total"]'
        value: "updated total"
    expected: "Total updates to reflect new quantity"
    actual: "Total remains unchanged after quantity is decreased"
```

## Tips

- Try the coupon code field with "SAVE10".
- Decrease quantity all the way to 0 using the minus button.
- Remove all items from the cart and observe the state.
- Add an item priced over $100 and check the displayed price carefully.
- Check the browser console after clicking Remove.

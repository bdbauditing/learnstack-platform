# Starter — Exercise 05: Write Reports from Scratch

Write 5 complete bug reports in `bugs.yaml`. You're given 5 short bug descriptions below — you write the rest.

**Bugs to report:**
1. Bio text field doesn't save changes when clicking Update
2. Search results show items from wrong category
3. Password reset email never arrives
4. Date picker accepts February 30
5. Back button shows logged-in page after logout

Make up plausible selectors, URLs, and steps. The grader checks structure, not exact selectors.

## Format reminder

```yaml
bugs:
  - title: "[Profile] Bio changes not saved on Update"
    location: "profile/bio"
    severity: Medium
    priority: Medium
    environment:
      browser: Chrome 130
      os: macOS 14
      viewport: 1440x900
      url: "http://localhost:3000/profile"
    steps:
      - action: navigate
        url: "/profile"
      - action: clear
        selector: '[data-test="bio-field"]'
      - action: type
        selector: '[data-test="bio-field"]'
        value: "My updated bio text here"
      - action: click
        selector: '[data-test="update-profile-btn"]'
      - action: navigate
        url: "/profile"
    expected: "Bio field shows the updated text after navigating away and returning"
    actual: "Bio field reverts to the original text — changes are not persisted"
```

## Tips

- Every bug needs at least 2 steps. The more specific, the better.
- Use plausible selector names like `[data-test="bio-field"]` or `#search-input`.
- Make sure your `expected` and `actual` clearly describe two different things.
- For the password reset bug, describe what happens after clicking the link (email never arrives — your steps end at clicking the link, and actual is "email never received").

# Exercise 03 Spec — Decision Table Drill

## Answer Key

| | Rule 1 | Rule 2 | Rule 3 | Rule 4 |
|--|--------|--------|--------|--------|
| Order ≥ $50 | Y | Y | N | N |
| Member | Y | N | Y | N |
| **Shipping cost** | $0 | $10 | $5 | $10 |
| **Order accepted?** | Yes | Yes | Yes | Yes |

Note: the $10 minimum rejection rule applies to Rule 3 (order < $50 AND member → $5 shipping) but only when order < $10. This creates a fifth hidden case. Accept the 4-rule table as correct; the 5-rule table gets bonus notes.

## Grader Config
- Grader: structured-doc (validate CSV has 4 Action cells per row, correct values)
- Pass: 90% of action cells correct (7/8 minimum)

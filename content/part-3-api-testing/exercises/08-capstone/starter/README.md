# Starter — Exercise 08: Capstone API Test Suite

Build a complete suite with 25+ requests. See the exercise README for the minimum requirements by category.

Start with the Auth folder (login → capture token). Build each folder in order. Test locally with Newman before submitting.

```bash
newman run collection.json \
  --environment environment.json \
  --iteration-data data.csv \
  --reporters cli
```

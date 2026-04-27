# Starter — Exercise 02: Auth Chaining

1. Login request → capture token in Tests tab → `pm.collectionVariables.set('auth_token', ...)`
2. All protected requests use `Authorization: Bearer {{auth_token}}`
3. Add a request with NO auth header → assert 401

No hardcoded tokens. `base_url`, `test_email`, `test_password` as env vars.

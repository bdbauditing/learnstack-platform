# Grader Notes — Exercise 03

All 6 negative cases must pass their pm.test() assertions for Newman to exit 0.

Common mistakes:
- Asserting only the status code, not the error body → acceptable if both assertions per case aren't enforced by the grader (Newman just checks exit code)
- Sending case 5 (malformed JSON) is tricky in Postman — Body > Raw > select JSON type but type invalid JSON. Some learners use a string body instead. Both are acceptable as long as the API returns 400.
- For case 3 (403), the non-admin endpoint must exist in the API. If the API has no role-based endpoint, substitute with a PATCH on another user's resource.

Pass: Newman exits 0.

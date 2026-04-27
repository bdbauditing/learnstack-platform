# Starter — Exercise 01: First Collection CRUD

Build a Postman collection with CRUD operations for the tasks API.

**Steps:**
1. Open Postman → New Collection → "Task CRUD"
2. Add an environment: set `base_url` = **TODO: actual API URL**
3. Add 5+ requests with `pm.test()` assertions (see exercise README)
4. Export collection as `collection.json` (Collection v2.1)
5. Export environment as `environment.json`
6. Place both files in this folder

**Test locally:** `newman run collection.json --environment environment.json`

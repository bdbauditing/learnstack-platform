# Admin Guide

## Creating a user

1. Log in at `http://localhost:5174` with your admin credentials.
2. Click **Users** in the nav bar.
3. Click **Create user**, fill in name, email, password, and role, then click **Create**.

Or via API:

```bash
curl -X POST http://localhost:3001/api/admin/users \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"email":"new@learnstack.local","name":"New Learner","password":"Password1!","role":"LEARNER"}'
```

Roles: `LEARNER` (default), `INSTRUCTOR`, `ADMIN`.

## Viewing learner progress

- Click any row in the **Users** table to open a drawer showing that learner's part-by-part progress: exercise status badges (green = passed, red = failed) and quiz results.
- Progress is live — refreshing the drawer fetches current data.

## Monitoring submissions

Click **Submissions** in the nav bar to see a filterable table of all exercise submissions across all learners. Filters:

| Filter | What it does |
|--------|-------------|
| User | Narrows to one learner |
| Exercise ID contains | Free-text match on the exercise slug (e.g. `bug-hunt`) |
| Status | PENDING, GRADING, PASSED, FAILED, or ERROR |

Click any row to expand it and see the raw grader output JSON, the fork URL, the commit SHA, and when it was graded.

## Overriding a submission result

**There is no override UI.** This is a known limitation. If a grader produces an incorrect result (e.g. a network error mid-grade), a developer must update the row directly in the database:

```sql
UPDATE "Submission"
SET status = 'PASSED', score = 1.0, "gradedAt" = now()
WHERE id = '<submission-id>';
```

Connect to the database:

```bash
psql postgresql://learnstack:learnstack@localhost:5435/learnstack
```

## When something breaks

**API returns 500 / submissions stuck in PENDING**

```bash
docker compose logs api --tail=50
```

Grading runs synchronously in the API process. If it crashes mid-grade the row stays PENDING. Manually set it to ERROR and ask the learner to resubmit.

**Database won't connect**

```bash
docker compose ps          # check postgres is healthy
docker compose restart api # reconnect
```

**Content not loading (exercises return 404)**

Verify the curriculum repo is mounted:

```bash
docker compose exec api ls /content/content/
```

You should see `part-1-finding-bugs`, `part-2-test-design`, etc. If the directory is empty, the `learnstack-qa-track` sibling repo is missing or not mounted — check `docker-compose.yml` volume binding.

**Full reset** (wipes all data):

```bash
docker compose down -v
docker compose up -d
DATABASE_URL="postgresql://learnstack:learnstack@localhost:5435/learnstack" npm run seed
```

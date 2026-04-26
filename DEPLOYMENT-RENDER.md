# Deployment — LearnStack Platform on Render

Two web services + one Postgres database:

| Resource | Name | URL |
|----------|------|-----|
| API | `learnstack-platform-api` | https://learnstack-platform-api.onrender.com |
| Web | `learnstack-platform-web` | https://learnstack-platform-web.onrender.com |
| Postgres | `learnstack-platform-db` | injected as `DATABASE_URL` |

QA track content (exercises, quizzes, specs) is baked into the API image at build time — no separate content server needed.

The web service's nginx proxies `/api/` to the API over HTTPS. No ports are hardcoded — `PORT` is injected by Render (default 10000) and applied at container start.

---

## Prerequisites

- A [Render account](https://render.com) (GitHub sign-in recommended)
- The `learnstack-platform` repo pushed to GitHub (public or connected private)

---

## First deploy (Blueprint)

### Step 1 — Connect repo to Render

1. Log in to [dashboard.render.com](https://dashboard.render.com)
2. Click **New +** → **Blueprint**
3. Click **Connect a repository** and select `learnstack-platform`
4. Render detects `render.yaml` automatically. Click **Apply**.

### Step 2 — Review and apply

Render shows the 3 resources it will create (2 web services + 1 database). Accept all. The `JWT_SECRET` and `JWT_REFRESH_SECRET` are auto-generated random values.

Click **Apply** and wait. First build takes **10–15 minutes** (Docker layer caching kicks in on subsequent deploys).

### Step 3 — Confirm service URLs

After deploy completes, go to each service in the dashboard and copy the URL:

- API: e.g. `https://learnstack-platform-api.onrender.com`
- Web: e.g. `https://learnstack-platform-web.onrender.com`

> **If Render added a random suffix** (e.g. `learnstack-platform-api-xyzw.onrender.com`), update the `API_URL` env var on the web service (Step 4).

### Step 4 — Wire up API_URL (if URL has a suffix)

1. In Render dashboard → **learnstack-platform-web** → **Environment**
2. Update `API_URL` to the actual API URL
3. Click **Save changes** — Render triggers an automatic redeploy

### Step 5 — Seed the database

Render's shell requires a paid plan. Seed from your local machine using the **external database URL**.

1. In Render dashboard → **learnstack-platform-db** → copy **External Database URL**
   (looks like `postgres://learnstack:<password>@<host>.render.com/learnstack`)

2. Run from the `learnstack-platform/` directory on your machine:

```bash
DATABASE_URL="<paste-external-url-here>" npm run seed --workspace=apps/api
```

Expected output:
```
Seeded 3 users (alice ADMIN, bob LEARNER, charlie LEARNER)
```

Seed credentials:

| User | Email | Password | Role |
|------|-------|----------|------|
| Alice Admin | alice@learnstack.local | Password1! | ADMIN |
| Bob Builder | bob@learnstack.local | Password1! | LEARNER |
| Charlie Checker | charlie@learnstack.local | Password1! | LEARNER |

---

## Verify the deployment

```bash
# 1. Health check
curl https://learnstack-platform-api.onrender.com/api/health
# Expected: {"status":"ok"}

# 2. Login
curl -X POST https://learnstack-platform-api.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@learnstack.local","password":"Password1!"}'
```

Open the web URL in a browser, log in as `alice@learnstack.local`, verify the track loads with 5 parts.

---

## End-to-end grading smoke test

1. Fork `learnstack-taskforge-2` on GitHub
2. Log in as bob@learnstack.local
3. Navigate to any bug-match exercise in Part 1
4. Paste your fork URL and submit
5. Wait ~10 seconds — status should update to PASSED or FAILED

---

## Subsequent deploys

Push to `main` → Render auto-deploys both services (if auto-deploy is enabled).

To trigger manually:
- Dashboard → service → **Manual Deploy** → **Deploy latest commit**

---

## Environment variables

| Variable | Service | Source | Description |
|----------|---------|--------|-------------|
| `DATABASE_URL` | API | Render Postgres (auto) | Postgres connection string |
| `JWT_SECRET` | API | Auto-generated | Access token signing key |
| `JWT_REFRESH_SECRET` | API | Auto-generated | Refresh token signing key |
| `NODE_ENV` | API | render.yaml | `production` |
| `CONTENT_REPO_PATH` | API | Dockerfile (baked) | Path to QA track content |
| `PORT` | both | Render (auto, 10000) | Container listen port |
| `API_URL` | Web | render.yaml / dashboard | Full HTTPS URL of the API |

---

## Updating content

QA track content is baked into the image at build time from the `content/` directory in this repo. To update exercises:

1. Copy fresh content from `learnstack-qa-track/content/` into `learnstack-platform/content/`
2. Commit and push — Render auto-deploys

---

## Rollback

Dashboard → service → **Events** → find the previous deploy → **Rollback to this deploy**.

---

## Troubleshooting

**502 / Bad Gateway on the web URL**

The web service can't reach the API. Check:
1. Is `API_URL` set correctly on the web service?
2. Is the API service healthy? Dashboard → `learnstack-platform-api` → **Logs**
3. Free tier: the API may be **spinning up from idle** (60–90s cold start). Wait and retry.

**Database connection error on API startup**

Render logs will show `prisma db push` failing. Common causes:
- `DATABASE_URL` not yet set (happens briefly after the database is first created)
- Free Postgres has expired (90-day limit) — upgrade in dashboard

**Grader returns ERROR on submission**

Check API logs. Common causes:
- `git clone` of the learner's fork failed (bad URL, private repo, or rate limit)
- `CONTENT_REPO_PATH` not set — exercises can't be found (shouldn't happen with baked content)

---

## Free tier limits

| Resource | Free tier | Notes |
|----------|-----------|-------|
| Web services | 512 MB RAM, shared CPU | Spin down after 15 min idle |
| Postgres | 256 MB RAM, 1 GB disk | **Expires after 90 days** |
| Bandwidth | 100 GB/mo | Enough for a training tool |

**Cold starts**: Free web services spin down after 15 minutes of inactivity. First request after idle takes 30–90 seconds. Upgrade to **Starter ($7/mo)** to avoid cold starts.

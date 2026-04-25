# LearnStack Platform

LearnStack is an internal QA training platform that delivers structured curriculum to learners through a browser-based interface. Learners work through concept readings, graded exercises, and quizzes across a multi-part track. Instructors and admins monitor progress, manage users, and review submission output — all without touching a terminal.

## Three-repo architecture

| Repo | Role |
|------|------|
| `learnstack-qa-track` | Curriculum: concepts, exercises, quiz YAML, answer keys, grader specs |
| `learnstack-platform` | This repo — the Express API + React web app that serves the curriculum |
| *(target app)* | The application learners test against (e.g. TaskForge); cloned or forked per exercise |

The platform reads `learnstack-qa-track` at runtime from a sibling directory (or a Docker volume). It never duplicates content — content lives in the curriculum repo and is read on demand by the content-loader.

## Quick start (local)

Assumes `learnstack-qa-track` is cloned as a sibling of this repo:

```
learn-qa/
  learnstack-platform/   ← this repo
  learnstack-qa-track/   ← curriculum repo (must be here)
```

```bash
# 1. Start all services (Postgres + API + web)
docker compose up --build -d

# 2. Seed the database
DATABASE_URL="postgresql://learnstack:learnstack@localhost:5435/learnstack" npm run seed

# 3. Open the platform
open http://localhost:5174
```

That's it. The API runs on port 3001; the web app on port 5174.

> **Seed credentials**
> - Admin: `admin@learnstack.local` / `Admin1234!`
> - Learners: `alice@learnstack.local`, `bob@learnstack.local`, `charlie@learnstack.local` / `Password1!`

## Guides

- [ADMIN-GUIDE.md](ADMIN-GUIDE.md) — creating users, monitoring progress, where to look when something breaks
- [LEARNER-GUIDE.md](LEARNER-GUIDE.md) — logging in, taking quizzes, submitting exercises, reading grader feedback

## Architecture

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full technical overview.

## Ports

| Service | Host port |
|---------|-----------|
| PostgreSQL | 5435 |
| API | 3001 |
| Web | 5174 |

Port 5174 (not 5173) avoids conflicts with other local Vite dev servers.

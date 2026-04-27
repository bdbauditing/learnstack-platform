import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/auth.js';
import { getTrack } from '../lib/content-loader.js';
import type { TrackProgress } from '@learnstack/shared';

const router = Router();
const prisma = new PrismaClient();

router.use(requireAuth);

// GET /api/progress/me?trackSlug=...&partSlug=... → ExerciseProgress[] (PartPage)
// GET /api/progress/me?trackSlug=...             → TrackProgress     (ProgressPage)
router.get('/me', async (req, res) => {
  const userId = req.user!.sub;
  const { trackSlug, partSlug } = req.query;

  if (partSlug && typeof partSlug === 'string') {
    const prefix = trackSlug ? `${trackSlug}/${partSlug}/` : `${partSlug}/`;
    const submissions = await prisma.submission.findMany({
      where: { userId, exerciseId: { startsWith: prefix } },
      select: { exerciseId: true, status: true, score: true, submittedAt: true },
      orderBy: { submittedAt: 'desc' },
    });

    const latest = new Map<string, { exerciseId: string; status: string; score: number | null }>();
    for (const s of submissions) {
      if (!latest.has(s.exerciseId)) {
        latest.set(s.exerciseId, { exerciseId: s.exerciseId, status: s.status, score: s.score });
      }
    }
    res.json(Array.from(latest.values()));
    return;
  }

  const slug = (trackSlug as string | undefined) ?? 'qa-fundamentals';
  const track = getTrack(slug);

  if (!track) {
    res.status(404).json({ error: 'Not Found', message: 'Track not found' });
    return;
  }

  const [submissions, quizAttempts] = await Promise.all([
    prisma.submission.findMany({
      where: { userId, exerciseId: { startsWith: `${slug}/` } },
      select: { exerciseId: true, status: true, score: true, submittedAt: true },
      orderBy: { submittedAt: 'desc' },
    }),
    prisma.quizAttempt.findMany({
      where: { userId },
      select: { quizId: true, score: true, passed: true, attemptedAt: true },
      orderBy: { attemptedAt: 'desc' },
    }),
  ]);

  const latestSub = new Map<string, { status: string; score: number | null }>();
  for (const s of submissions) {
    if (!latestSub.has(s.exerciseId)) {
      latestSub.set(s.exerciseId, { status: s.status, score: s.score });
    }
  }

  const latestQuiz = new Map<string, { score: number; passed: boolean }>();
  for (const a of quizAttempts) {
    if (!latestQuiz.has(a.quizId)) {
      latestQuiz.set(a.quizId, { score: a.score, passed: a.passed });
    }
  }

  let completedItems = 0;
  let totalItems = 0;

  const parts = track.parts.map((part) => {
    const quizAttempt = latestQuiz.get(part.slug);
    const quizStatus = quizAttempt
      ? quizAttempt.passed ? 'PASSED' : 'FAILED'
      : 'NOT_ATTEMPTED';

    if (part.hasQuiz) {
      totalItems++;
      if (quizStatus === 'PASSED') completedItems++;
    }

    const exercises = part.exercises.map((ex) => {
      const key = `${slug}/${part.slug}/${ex.slug}`;
      const sub = latestSub.get(key);
      totalItems++;
      if (sub?.status === 'PASSED') completedItems++;
      return {
        slug: ex.slug,
        title: ex.title,
        order: ex.order,
        status: (sub?.status ?? null) as TrackProgress['parts'][0]['exercises'][0]['status'],
        score: sub?.score ?? null,
      };
    });

    return {
      slug: part.slug,
      title: part.title,
      order: part.order,
      quizStatus: quizStatus as 'PASSED' | 'FAILED' | 'NOT_ATTEMPTED',
      quizScore: quizAttempt?.score ?? null,
      exercises,
    };
  });

  const response: TrackProgress = { totalItems, completedItems, parts };
  res.json(response);
});

export default router;

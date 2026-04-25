import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
const prisma = new PrismaClient();

router.use(requireAuth);

// POST /api/quiz-attempts
router.post('/', async (req, res) => {
  const { quizId, answers, score, passed } = req.body ?? {};
  const userId = req.user!.sub;

  if (!quizId || score === undefined || passed === undefined) {
    res.status(400).json({ error: 'Bad Request', message: 'quizId, score, and passed are required' });
    return;
  }

  const attempt = await prisma.quizAttempt.create({
    data: {
      userId,
      quizId,
      answers: answers ?? {},
      score: Number(score),
      passed: Boolean(passed),
    },
  });

  res.status(201).json(toDto(attempt));
});

// GET /api/quiz-attempts/me?quizId=...
router.get('/me', async (req, res) => {
  const userId = req.user!.sub;
  const { quizId } = req.query;

  const where: Record<string, unknown> = { userId };
  if (quizId && typeof quizId === 'string') where.quizId = quizId;

  const attempts = await prisma.quizAttempt.findMany({
    where,
    orderBy: { attemptedAt: 'desc' },
    take: 20,
  });

  res.json(attempts.map(toDto));
});

function toDto(a: {
  id: string;
  quizId: string;
  answers: unknown;
  score: number;
  passed: boolean;
  attemptedAt: Date;
}) {
  return {
    id: a.id,
    quizId: a.quizId,
    answers: a.answers,
    score: a.score,
    passed: a.passed,
    attemptedAt: a.attemptedAt.toISOString(),
  };
}

export default router;

import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { getTrack } from '../lib/content-loader.js';
import type { AdminUserDto, AdminSubmissionDto, TrackProgress } from '@learnstack/shared';

const router = Router();
const prisma = new PrismaClient();

router.use(requireAuth);
router.use(requireRole('ADMIN'));

// GET /api/admin/users?page=1&limit=20
router.get('/users', async (req, res) => {
  const page = Math.max(1, parseInt(String(req.query.page ?? '1'), 10));
  const limit = Math.min(100, Math.max(1, parseInt(String(req.query.limit ?? '20'), 10)));
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        _count: { select: { submissions: true } },
        submissions: {
          select: { submittedAt: true },
          orderBy: { submittedAt: 'desc' },
          take: 1,
        },
        quizAttempts: {
          select: { attemptedAt: true },
          orderBy: { attemptedAt: 'desc' },
          take: 1,
        },
      },
    }),
    prisma.user.count(),
  ]);

  const dtos: AdminUserDto[] = users.map((u) => {
    const lastSub = u.submissions[0]?.submittedAt ?? null;
    const lastQuiz = u.quizAttempts[0]?.attemptedAt ?? null;
    const lastActivityAt =
      lastSub && lastQuiz
        ? new Date(Math.max(lastSub.getTime(), lastQuiz.getTime())).toISOString()
        : lastSub?.toISOString() ?? lastQuiz?.toISOString() ?? null;

    return {
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role as AdminUserDto['role'],
      createdAt: u.createdAt.toISOString(),
      lastActivityAt,
      submissionCount: u._count.submissions,
    };
  });

  res.json({ users: dtos, total });
});

// POST /api/admin/users
router.post('/users', async (req, res) => {
  const { email, name, role, password } = req.body ?? {};

  if (!email || !name || !password) {
    res.status(400).json({ error: 'Bad Request', message: 'email, name, and password are required' });
    return;
  }

  const validRoles = ['ADMIN', 'INSTRUCTOR', 'LEARNER'];
  const userRole = validRoles.includes(role) ? role : 'LEARNER';

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    res.status(409).json({ error: 'Conflict', message: 'Email already in use' });
    return;
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const user = await prisma.user.create({
    data: { email, name, role: userRole, passwordHash },
  });

  const dto: AdminUserDto = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as AdminUserDto['role'],
    createdAt: user.createdAt.toISOString(),
    lastActivityAt: null,
    submissionCount: 0,
  };
  res.status(201).json(dto);
});

// GET /api/admin/users/:id/progress
router.get('/users/:id/progress', async (req, res) => {
  const targetUserId = req.params.id;

  const userExists = await prisma.user.findUnique({ where: { id: targetUserId }, select: { id: true } });
  if (!userExists) {
    res.status(404).json({ error: 'Not Found', message: 'User not found' });
    return;
  }

  const [submissions, quizAttempts] = await Promise.all([
    prisma.submission.findMany({
      where: { userId: targetUserId },
      select: { exerciseId: true, status: true, score: true, submittedAt: true },
      orderBy: { submittedAt: 'desc' },
    }),
    prisma.quizAttempt.findMany({
      where: { userId: targetUserId },
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

  const track = getTrack('qa-fundamentals');
  if (!track) throw new Error('qa-fundamentals track not found');
  let completedItems = 0;
  let totalItems = 0;

  const parts = track.parts.map((part) => {
    const attempt = latestQuiz.get(part.slug);
    const quizStatus = attempt
      ? attempt.passed ? 'PASSED' : 'FAILED'
      : 'NOT_ATTEMPTED';

    if (part.hasQuiz) {
      totalItems++;
      if (quizStatus === 'PASSED') completedItems++;
    }

    const exercises = part.exercises.map((ex) => {
      const key = `${part.slug}/${ex.slug}`;
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
      quizScore: attempt?.score ?? null,
      exercises,
    };
  });

  const response: TrackProgress = { totalItems, completedItems, parts };
  res.json(response);
});

// GET /api/admin/submissions?userId=&exerciseId=&status=&page=1&limit=20
router.get('/submissions', async (req, res) => {
  const { userId, exerciseId, status } = req.query;
  const page = Math.max(1, parseInt(String(req.query.page ?? '1'), 10));
  const limit = Math.min(100, Math.max(1, parseInt(String(req.query.limit ?? '20'), 10)));
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};
  if (userId && typeof userId === 'string') where.userId = userId;
  if (exerciseId && typeof exerciseId === 'string') where.exerciseId = { contains: exerciseId };
  if (status && typeof status === 'string') where.status = status;

  const [rows, total] = await Promise.all([
    prisma.submission.findMany({
      where,
      skip,
      take: limit,
      orderBy: { submittedAt: 'desc' },
      include: { user: { select: { email: true, name: true } } },
    }),
    prisma.submission.count({ where }),
  ]);

  const dtos: AdminSubmissionDto[] = rows.map((s) => ({
    id: s.id,
    userId: s.userId,
    userEmail: s.user.email,
    userName: s.user.name,
    exerciseId: s.exerciseId,
    forkUrl: s.forkUrl,
    commitSha: s.commitSha,
    status: s.status as AdminSubmissionDto['status'],
    score: s.score,
    graderOutput: s.graderOutput,
    submittedAt: s.submittedAt.toISOString(),
    gradedAt: s.gradedAt?.toISOString() ?? null,
  }));

  res.json({ submissions: dtos, total });
});

export default router;

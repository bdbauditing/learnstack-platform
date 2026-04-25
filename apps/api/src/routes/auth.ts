import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/auth.js';
import type { UserDto } from '@learnstack/shared';

const router = Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET ?? 'dev-refresh-secret';

function makeTokens(user: { id: string; email: string; role: string }) {
  const payload = { sub: user.id, email: user.email, role: user.role };
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
}

function toDto(user: { id: string; email: string; name: string; role: string; createdAt: Date }): UserDto {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as UserDto['role'],
    createdAt: user.createdAt.toISOString(),
  };
}

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    res.status(400).json({ error: 'Bad Request', message: 'email and password required' });
    return;
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    res.status(401).json({ error: 'Unauthorized', message: 'Invalid credentials' });
    return;
  }

  const tokens = makeTokens(user);
  res.json({ ...tokens, user: toDto(user) });
});

// POST /api/auth/refresh
router.post('/refresh', (req, res) => {
  const { refreshToken } = req.body ?? {};
  if (!refreshToken) {
    res.status(400).json({ error: 'Bad Request', message: 'refreshToken required' });
    return;
  }

  try {
    const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as { sub: string; email: string; role: string };
    const tokens = makeTokens({ id: payload.sub, email: payload.email, role: payload.role });
    res.json(tokens);
  } catch {
    res.status(401).json({ error: 'Unauthorized', message: 'Invalid refresh token' });
  }
});

// POST /api/auth/logout
router.post('/logout', requireAuth, (_req, res) => {
  res.json({ message: 'Logged out' });
});

// GET /api/auth/me
router.get('/me', requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.sub } });
  if (!user) {
    res.status(404).json({ error: 'Not Found', message: 'User not found' });
    return;
  }
  res.json(toDto(user));
});

export default router;

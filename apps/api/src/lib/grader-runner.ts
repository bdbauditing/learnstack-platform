import { execSync, spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import yaml from 'js-yaml';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CONTENT_ROOT =
  process.env.CONTENT_REPO_PATH ?? path.resolve(__dirname, '../../../../learnstack-qa-track');
const CONTENT_DIR = path.join(CONTENT_ROOT, 'content');

// ---------------------------------------------------------------------------
// Bug-match grader (mirrors learnstack-qa-track/packages/grader/src/graders/bug-match.ts)
// ---------------------------------------------------------------------------

interface PlantedBug {
  id: string;
  description: string;
  location: string;
  signatureKeywords: string[];
  keywordThreshold?: number;
}

interface BugMatchAnswerKey {
  bugs: PlantedBug[];
  passThreshold: number;
}

interface MatchDetail {
  expected: string;
  matched: boolean;
  reason: string;
}

interface BugMatchResult {
  matched: number;
  expected: number;
  required: number;
  passed: boolean;
  details: MatchDetail[];
}

function keywordMatchFraction(text: string, keywords: string[]): number {
  const lower = text.toLowerCase();
  const matched = keywords.filter((kw) => lower.includes(kw.toLowerCase()));
  return keywords.length === 0 ? 1 : matched.length / keywords.length;
}

interface SubmittedBug {
  title: string;
  location: string;
  description?: string;
  actual?: string;
  expected?: string;
}

function matchesBug(submitted: SubmittedBug, planted: PlantedBug): boolean {
  if (!submitted.location.toLowerCase().includes(planted.location.toLowerCase())) return false;
  const text = [submitted.title, submitted.actual ?? '', submitted.description ?? ''].join(' ');
  return keywordMatchFraction(text, planted.signatureKeywords) >= (planted.keywordThreshold ?? 0.6);
}

function gradeBugMatch(submittedYaml: unknown, answerKey: BugMatchAnswerKey): BugMatchResult {
  const data = submittedYaml as { bugs?: unknown[] };
  if (!data?.bugs || !Array.isArray(data.bugs)) {
    return {
      matched: 0,
      expected: answerKey.bugs.length,
      required: answerKey.passThreshold,
      passed: false,
      details: [{ expected: 'valid bugs array', matched: false, reason: 'No bugs array found in submission' }],
    };
  }

  const submitted = data.bugs as SubmittedBug[];
  const details: MatchDetail[] = [];
  let matched = 0;

  for (const planted of answerKey.bugs) {
    const found = submitted.some((s) => matchesBug(s, planted));
    if (found) matched++;
    details.push({
      expected: `[${planted.id}] ${planted.description}`,
      matched: found,
      reason: found
        ? 'Location and keyword match found'
        : `No bug matched location "${planted.location}" with keywords: ${planted.signatureKeywords.join(', ')}`,
    });
  }

  return {
    matched,
    expected: answerKey.bugs.length,
    required: answerKey.passThreshold,
    passed: matched >= answerKey.passThreshold,
    details,
  };
}

// ---------------------------------------------------------------------------
// Grader type detection
// ---------------------------------------------------------------------------

type GraderType = 'bug-match' | 'classification-match' | 'structured-doc' | 'unsupported';

function detectGraderType(partSlug: string, exerciseSlug: string): GraderType {
  const specPath = path.join(CONTENT_DIR, partSlug, 'exercises', exerciseSlug, 'spec.md');
  if (!fs.existsSync(specPath)) return 'unsupported';
  const spec = fs.readFileSync(specPath, 'utf8');
  // Matches "- Grader: `bug-match`" or "- Grader: bug-match"
  const match = spec.match(/[-*]\s+Grader:\s+`?([a-z-]+)`?/i);
  const grader = match?.[1]?.toLowerCase() ?? '';
  if (grader.includes('bug-match')) return 'bug-match';
  if (grader.includes('classification-match')) return 'classification-match';
  if (grader.includes('structured-doc')) return 'structured-doc';
  return 'unsupported';
}

// ---------------------------------------------------------------------------
// Clone / resolve fork
// ---------------------------------------------------------------------------

function resolveRepo(forkUrl: string, tempDir: string, commitSha?: string): string {
  // Local path — use directly (for testing)
  if (forkUrl.startsWith('/') || forkUrl.startsWith('file://')) {
    const localPath = forkUrl.replace('file://', '');
    if (!fs.existsSync(localPath)) throw new Error(`Local path not found: ${localPath}`);
    return localPath;
  }

  // Clone from git URL
  try {
    execSync(`git clone --depth=1 ${forkUrl} ${tempDir}`, { stdio: 'pipe', timeout: 60_000 });
  } catch (e) {
    throw new Error(`git clone failed: ${(e as Error).message.slice(0, 200)}`);
  }

  if (commitSha) {
    try {
      spawnSync('git', ['-C', tempDir, 'fetch', '--depth=1', 'origin', commitSha], { stdio: 'pipe' });
      spawnSync('git', ['-C', tempDir, 'checkout', commitSha], { stdio: 'pipe' });
    } catch {
      // non-fatal — proceed with default branch HEAD
    }
  }

  return tempDir;
}

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

export async function runGrader(submissionId: string): Promise<void> {
  const submission = await prisma.submission.findUnique({ where: { id: submissionId } });
  if (!submission) return;

  await prisma.submission.update({
    where: { id: submissionId },
    data: { status: 'GRADING' },
  });

  const [partSlug, exerciseSlug] = submission.exerciseId.split('/');
  const tempDir = path.join(os.tmpdir(), `learnstack-grade-${submissionId}`);

  try {
    // Resolve submission files
    const repoRoot = resolveRepo(submission.forkUrl, tempDir, submission.commitSha ?? undefined);
    const starterDir = path.join(repoRoot, 'content', partSlug, 'exercises', exerciseSlug, 'starter');

    if (!fs.existsSync(starterDir)) {
      throw new Error(
        `Exercise folder not found in fork at content/${partSlug}/exercises/${exerciseSlug}/starter/\n` +
        `Make sure your fork has the correct directory structure.`,
      );
    }

    const graderType = detectGraderType(partSlug, exerciseSlug);

    let graderOutput: unknown;
    let score = 0;
    let passed = false;

    if (graderType === 'bug-match') {
      const answerKeyPath = path.join(
        CONTENT_DIR, partSlug, 'exercises', exerciseSlug, 'answer-key', 'bugs-expected.yaml',
      );
      const submissionPath = path.join(starterDir, 'bugs.yaml');

      if (!fs.existsSync(submissionPath)) {
        throw new Error(`bugs.yaml not found in starter/ directory of your fork.`);
      }
      if (!fs.existsSync(answerKeyPath)) {
        throw new Error(`Answer key not found for this exercise. Contact your instructor.`);
      }

      const submittedYaml = yaml.load(fs.readFileSync(submissionPath, 'utf8'));
      const answerKey = yaml.load(fs.readFileSync(answerKeyPath, 'utf8')) as BugMatchAnswerKey;

      const result = gradeBugMatch(submittedYaml, answerKey);
      graderOutput = { type: 'bug-match', result };
      score = result.matched / result.expected;
      passed = result.passed;
    } else {
      graderOutput = {
        type: 'unsupported',
        message: `Grader type "${graderType}" is not yet supported. Your submission has been recorded.`,
      };
      score = 0;
      passed = false;
    }

    await prisma.submission.update({
      where: { id: submissionId },
      data: {
        status: passed ? 'PASSED' : 'FAILED',
        score,
        graderOutput: graderOutput as object,
        gradedAt: new Date(),
      },
    });
  } catch (err) {
    await prisma.submission.update({
      where: { id: submissionId },
      data: {
        status: 'ERROR',
        graderOutput: { type: 'error', message: (err as Error).message },
        gradedAt: new Date(),
      },
    });
  } finally {
    // Clean up temp dir (skip for local paths)
    if (fs.existsSync(tempDir) && submission.forkUrl.startsWith('http')) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  }
}

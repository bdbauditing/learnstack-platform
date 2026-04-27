import { execSync, spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import yaml from 'js-yaml';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CONTENT_ROOT =
  process.env.CONTENT_REPO_PATH ?? path.resolve(__dirname, '../../../../learnstack-qa-track');
const TRACKS_DIR = path.join(CONTENT_ROOT, 'content');

// ---------------------------------------------------------------------------
// Bug-match grader  (reads bug-*.md files, not bugs.yaml)
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

function keywordMatchFraction(text: string, keywords: string[]): number {
  const lower = text.toLowerCase();
  const matched = keywords.filter((kw) => lower.includes(kw.toLowerCase()));
  return keywords.length === 0 ? 1 : matched.length / keywords.length;
}

function matchesBugMarkdown(text: string, planted: PlantedBug): boolean {
  const lower = text.toLowerCase();
  // Use the first segment of the location path as a keyword (e.g. "login" from "login/form")
  const locationWord = planted.location.split('/')[0].toLowerCase();
  if (!lower.includes(locationWord)) return false;
  return keywordMatchFraction(lower, planted.signatureKeywords) >= (planted.keywordThreshold ?? 0.6);
}

function gradeBugMatch(submittedTexts: string[], answerKey: BugMatchAnswerKey) {
  if (submittedTexts.length === 0) {
    return {
      matched: 0,
      expected: answerKey.bugs.length,
      required: answerKey.passThreshold,
      passed: false,
      details: [{ expected: 'bug-NNN.md files', matched: false, reason: 'No bug-*.md files found in starter/' }],
    };
  }

  let matched = 0;
  const details = answerKey.bugs.map((planted) => {
    const found = submittedTexts.some((text) => matchesBugMarkdown(text, planted));
    if (found) matched++;
    return {
      expected: `[${planted.id}] ${planted.description}`,
      matched: found,
      reason: found
        ? 'Location and keyword match found'
        : `No bug matched location "${planted.location}" with keywords: ${planted.signatureKeywords.join(', ')}`,
    };
  });

  return {
    matched,
    expected: answerKey.bugs.length,
    required: answerKey.passThreshold,
    passed: matched >= answerKey.passThreshold,
    details,
  };
}

// ---------------------------------------------------------------------------
// Markdown-doc grader  (validates bug-*.md structure)
// ---------------------------------------------------------------------------

interface MarkdownDocConfig {
  type: 'markdown-doc';
  minFiles: number;
  requiredSections: string[];
  requiredFrontmatter?: string[];
  requireEvidence?: boolean;
  passThreshold: number; // fraction 0–1 of files that must pass
}

function parseMarkdownFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const fm: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const val = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
    if (key) fm[key] = val;
  }
  return fm;
}

function gradeMarkdownDoc(starterDir: string, answerDir: string) {
  const configPath = path.join(answerDir, 'grader-config.yaml');
  if (!fs.existsSync(configPath)) {
    throw new Error('grader-config.yaml not found in answer-key. Contact your instructor.');
  }
  const config = yaml.load(fs.readFileSync(configPath, 'utf8')) as MarkdownDocConfig;

  const bugFiles = fs
    .readdirSync(starterDir)
    .filter((f) => /^bug-\d+\.md$/i.test(f))
    .sort();

  if (bugFiles.length < config.minFiles) {
    return {
      type: 'markdown-doc',
      passed: false,
      score: 0,
      details: [
        {
          file: '(none)',
          passed: false,
          reason: `Need at least ${config.minFiles} bug-*.md file(s); found ${bugFiles.length}`,
        },
      ],
    };
  }

  const fileResults = bugFiles.map((filename) => {
    const content = fs.readFileSync(path.join(starterDir, filename), 'utf8');
    const fm = parseMarkdownFrontmatter(content);
    const issues: string[] = [];

    // Frontmatter fields
    for (const field of config.requiredFrontmatter ?? []) {
      const val = fm[field]?.trim() ?? '';
      if (!val || val === '""' || val === "''") {
        issues.push(`Frontmatter "${field}" is missing or empty`);
      }
    }

    // Required sections (heading + at least 10 chars of content)
    for (const heading of config.requiredSections ?? []) {
      const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
      const sectionRegex = new RegExp(`${escaped}\\s*\\n+([\\s\\S]*?)(?=\\n##|$)`, 'i');
      const match = content.match(sectionRegex);
      const body = match?.[1]?.trim() ?? '';
      if (!match || body.length < 10) {
        issues.push(`Section "${heading}" is missing or has no content`);
      }
    }

    // Evidence validation
    if (config.requireEvidence) {
      const evMatch = content.match(/##\s+Evidence([\s\S]*?)(?=\n##|$)/i);
      if (!evMatch) {
        issues.push('## Evidence section is missing');
      } else {
        const ev = evMatch[1];
        if (!/screenshot[^\n]*:[^\n]{3,}/i.test(ev)) issues.push('Evidence: screenshot reference missing');
        if (!/console[^\n]*:[^\n]{10,}/i.test(ev)) issues.push('Evidence: console log snippet missing or too short');
        if (!/network[^\n]*:[^\n]{10,}/i.test(ev)) issues.push('Evidence: network request missing or too short');
      }
    }

    return { file: filename, passed: issues.length === 0, reason: issues.length === 0 ? 'OK' : issues.join('; ') };
  });

  const passedCount = fileResults.filter((r) => r.passed).length;
  const score = bugFiles.length > 0 ? passedCount / bugFiles.length : 0;
  const passed = score >= (config.passThreshold ?? 1.0) && bugFiles.length >= config.minFiles;

  return { type: 'markdown-doc', passed, score, details: fileResults };
}

// ---------------------------------------------------------------------------
// Test-runner grader
// ---------------------------------------------------------------------------

function gradeTestRunner(starterDir: string) {
  const install = spawnSync('npm', ['install', '--prefer-offline', '--no-audit', '--no-fund'], {
    cwd: starterDir,
    stdio: 'pipe',
    timeout: 90_000,
  });

  if (install.status !== 0) {
    const stderr = install.stderr?.toString().slice(0, 500) ?? '';
    throw new Error(`npm install failed:\n${stderr}`);
  }

  const test = spawnSync(
    path.join(starterDir, 'node_modules', '.bin', 'jest'),
    ['--json', '--forceExit', '--no-coverage'],
    {
      cwd: starterDir,
      stdio: 'pipe',
      timeout: 90_000,
      env: { ...process.env, CI: 'true', NODE_ENV: 'test' },
    },
  );

  const stdout = test.stdout?.toString() ?? '';
  const jsonStart = stdout.indexOf('{');
  if (jsonStart === -1) {
    const stderr = test.stderr?.toString().slice(0, 500) ?? '';
    throw new Error(`No JSON output from jest.\nstderr: ${stderr}`);
  }

  let jestOutput: {
    success: boolean;
    numPassedTests: number;
    numFailedTests: number;
    numTotalTests: number;
    testResults: Array<{
      testResults: Array<{ status: string; ancestorTitles: string[]; title: string }>;
    }>;
  };

  try {
    jestOutput = JSON.parse(stdout.slice(jsonStart));
  } catch {
    throw new Error(`Failed to parse jest JSON output: ${stdout.slice(jsonStart, jsonStart + 200)}`);
  }

  const numPassed = jestOutput.numPassedTests ?? 0;
  const numTotal = jestOutput.numTotalTests ?? 0;
  const passed = jestOutput.success === true && numTotal > 0;

  const details = (jestOutput.testResults ?? []).flatMap((suite) =>
    (suite.testResults ?? []).map(
      (t) => `${t.status}: ${[...t.ancestorTitles, t.title].join(' › ')}`,
    ),
  );

  return { type: 'test-runner', numPassed, numFailed: jestOutput.numFailedTests ?? 0, numTotal, passed, details };
}

// ---------------------------------------------------------------------------
// Structured-doc grader  (YAML validation — kept for Part 2+ exercises)
// ---------------------------------------------------------------------------

interface GraderConfig {
  type: 'structured-doc';
  submissionFile: string;
  requiredPaths: string[];
  passThreshold: number;
}

function getNestedValue(obj: unknown, dotPath: string): unknown {
  return dotPath.split('.').reduce((acc: unknown, key) => {
    if (acc === null || acc === undefined) return undefined;
    const arrMatch = key.match(/^(.+)\[(\d+)\]$/);
    if (arrMatch) {
      const arrKey = arrMatch[1];
      const idx = parseInt(arrMatch[2], 10);
      const arr = (acc as Record<string, unknown>)[arrKey];
      return Array.isArray(arr) ? arr[idx] : undefined;
    }
    return (acc as Record<string, unknown>)[key];
  }, obj);
}

function isNonEmpty(val: unknown): boolean {
  if (val === null || val === undefined) return false;
  if (typeof val === 'string') return val.trim().length > 0;
  if (typeof val === 'number') return true;
  if (typeof val === 'boolean') return true;
  if (Array.isArray(val)) return val.length > 0;
  if (typeof val === 'object') return Object.keys(val as object).length > 0;
  return false;
}

function gradeStructuredDoc(starterDir: string, answerDir: string) {
  const configPath = path.join(answerDir, 'grader-config.yaml');
  if (!fs.existsSync(configPath)) {
    throw new Error('grader-config.yaml not found in answer-key. Contact your instructor.');
  }

  const config = yaml.load(fs.readFileSync(configPath, 'utf8')) as GraderConfig;
  const submissionPath = path.join(starterDir, config.submissionFile);

  if (!fs.existsSync(submissionPath)) {
    throw new Error(`Submission file "${config.submissionFile}" not found in starter/ of your fork.`);
  }

  let submission: unknown;
  try {
    submission = yaml.load(fs.readFileSync(submissionPath, 'utf8'));
  } catch {
    throw new Error(`Could not parse ${config.submissionFile} as YAML.`);
  }

  const details = config.requiredPaths.map((dotPath) => {
    const val = getNestedValue(submission, dotPath);
    const ok = isNonEmpty(val);
    return { field: dotPath, present: ok, reason: ok ? 'OK' : `Field "${dotPath}" is missing or empty` };
  });

  const passed_count = details.filter((d) => d.present).length;
  const score = config.requiredPaths.length > 0 ? passed_count / config.requiredPaths.length : 0;
  const passed = score >= (config.passThreshold ?? 0.8);

  return { type: 'structured-doc', passed, score, details };
}

// ---------------------------------------------------------------------------
// Grader type detection
// ---------------------------------------------------------------------------

type GraderType = 'bug-match' | 'test-runner' | 'structured-doc' | 'markdown-doc' | 'unsupported';

function detectGraderType(trackSlug: string, partSlug: string, exerciseSlug: string): GraderType {
  const specPath = path.join(TRACKS_DIR, trackSlug, partSlug, 'exercises', exerciseSlug, 'spec.md');
  if (!fs.existsSync(specPath)) return 'unsupported';
  const spec = fs.readFileSync(specPath, 'utf8');
  const match = spec.match(/[-*]\s+Grader:\s+`?([a-z-]+)`?/i);
  const grader = match?.[1]?.toLowerCase() ?? '';
  if (grader.includes('bug-match')) return 'bug-match';
  if (grader.includes('markdown-doc')) return 'markdown-doc';
  if (grader.includes('test-runner')) return 'test-runner';
  if (grader.includes('structured-doc')) return 'structured-doc';
  return 'unsupported';
}

// ---------------------------------------------------------------------------
// Clone / resolve fork
// ---------------------------------------------------------------------------

function resolveRepo(forkUrl: string, tempDir: string, commitSha?: string): string {
  if (forkUrl.startsWith('/') || forkUrl.startsWith('file://')) {
    const localPath = forkUrl.replace('file://', '');
    if (!fs.existsSync(localPath)) throw new Error(`Local path not found: ${localPath}`);
    return localPath;
  }

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
      // non-fatal
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

  await prisma.submission.update({ where: { id: submissionId }, data: { status: 'GRADING' } });

  const parts = submission.exerciseId.split('/');
  const [trackSlug, partSlug, exerciseSlug] = parts.length >= 3
    ? parts
    : ['qa-fundamentals', parts[0], parts[1]];

  const tempDir = path.join(os.tmpdir(), `learnstack-grade-${submissionId}`);

  try {
    const repoRoot = resolveRepo(submission.forkUrl, tempDir, submission.commitSha ?? undefined);
    const starterDir = path.join(repoRoot, 'content', partSlug, 'exercises', exerciseSlug, 'starter');

    if (!fs.existsSync(starterDir)) {
      throw new Error(
        `Exercise folder not found in fork at content/${partSlug}/exercises/${exerciseSlug}/starter/\n` +
        `Make sure your fork has the correct directory structure.`,
      );
    }

    const graderType = detectGraderType(trackSlug, partSlug, exerciseSlug);

    let graderOutput: unknown;
    let score = 0;
    let passed = false;

    if (graderType === 'bug-match') {
      const answerKeyPath = path.join(
        TRACKS_DIR, trackSlug, partSlug, 'exercises', exerciseSlug, 'answer-key', 'bugs-expected.yaml',
      );
      if (!fs.existsSync(answerKeyPath)) throw new Error('Answer key not found. Contact your instructor.');

      const bugFiles = fs.readdirSync(starterDir).filter((f) => /^bug-\d+\.md$/i.test(f)).sort();
      if (bugFiles.length === 0) {
        throw new Error(
          'No bug-*.md files found in starter/ of your fork.\n' +
          'Create one Markdown file per bug (e.g. bug-001.md, bug-002.md).',
        );
      }
      const submittedTexts = bugFiles.map((f) => fs.readFileSync(path.join(starterDir, f), 'utf8'));
      const answerKey = yaml.load(fs.readFileSync(answerKeyPath, 'utf8')) as BugMatchAnswerKey;
      const result = gradeBugMatch(submittedTexts, answerKey);
      graderOutput = { type: 'bug-match', result };
      score = result.matched / result.expected;
      passed = result.passed;

    } else if (graderType === 'markdown-doc') {
      const answerDir = path.join(TRACKS_DIR, trackSlug, partSlug, 'exercises', exerciseSlug, 'answer-key');
      const result = gradeMarkdownDoc(starterDir, answerDir);
      graderOutput = result;
      score = result.score;
      passed = result.passed;

    } else if (graderType === 'test-runner') {
      const result = gradeTestRunner(starterDir);
      graderOutput = result;
      score = result.numTotal > 0 ? result.numPassed / result.numTotal : 0;
      passed = result.passed;

    } else if (graderType === 'structured-doc') {
      const answerDir = path.join(TRACKS_DIR, trackSlug, partSlug, 'exercises', exerciseSlug, 'answer-key');
      const result = gradeStructuredDoc(starterDir, answerDir);
      graderOutput = result;
      score = result.score;
      passed = result.passed;

    } else {
      graderOutput = {
        type: 'unsupported',
        message: `Grader type "${graderType}" is not supported. Your submission has been recorded.`,
      };
    }

    await prisma.submission.update({
      where: { id: submissionId },
      data: { status: passed ? 'PASSED' : 'FAILED', score, graderOutput: graderOutput as object, gradedAt: new Date() },
    });
  } catch (err) {
    await prisma.submission.update({
      where: { id: submissionId },
      data: { status: 'ERROR', graderOutput: { type: 'error', message: (err as Error).message }, gradedAt: new Date() },
    });
  } finally {
    if (fs.existsSync(tempDir) && submission.forkUrl.startsWith('http')) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  }
}

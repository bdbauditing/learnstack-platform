import { useEffect, useRef, useState, FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import type { ExerciseMeta, SubmissionDto } from '@learnstack/shared';
import { api } from '../lib/api.ts';
import Nav from '../components/Nav.tsx';
import 'highlight.js/styles/github.css';

const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code ?? []), 'className'],
    pre: [...(defaultSchema.attributes?.pre ?? []), 'className'],
    span: [...(defaultSchema.attributes?.span ?? []), 'className'],
  },
};

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function ExercisePage() {
  const { trackSlug, partSlug, exerciseSlug } = useParams<{
    trackSlug: string;
    partSlug: string;
    exerciseSlug: string;
  }>();

  const [exercise, setExercise] = useState<ExerciseMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!trackSlug || !partSlug || !exerciseSlug) return;
    api.tracks
      .getExercise(trackSlug, partSlug, exerciseSlug)
      .then(setExercise)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [trackSlug, partSlug, exerciseSlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <div className="flex items-center justify-center py-24 text-gray-400 text-sm">
          Loading exercise…
        </div>
      </div>
    );
  }

  if (error || !exercise) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <div className="max-w-3xl mx-auto px-6 py-10 text-red-600 text-sm">
          {error || 'Exercise not found'}
        </div>
      </div>
    );
  }

  const exerciseId = `${partSlug}/${exerciseSlug}`;
  const readmeMd = exercise.starterFiles['README.md'] ?? '';

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      <main className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 flex items-center gap-1.5">
          <Link to="/dashboard" className="hover:text-gray-600">Dashboard</Link>
          <span>/</span>
          <Link
            to={`/tracks/${trackSlug}/parts/${partSlug}`}
            className="hover:text-gray-600"
          >
            {partSlug?.replace(/^part-\d+-/, '').replace(/-/g, ' ')}
          </Link>
          <span>/</span>
          <span className="text-gray-600">{exercise.title}</span>
        </nav>

        <h1 className="text-2xl font-bold text-gray-900">{exercise.title}</h1>

        {/* Exercise brief */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Exercise Brief
          </h2>
          {readmeMd ? (
            <article className="prose prose-sm prose-gray max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[[rehypeSanitize, sanitizeSchema], rehypeHighlight]}
              >
                {readmeMd}
              </ReactMarkdown>
            </article>
          ) : (
            <p className="text-sm text-gray-400">No brief available.</p>
          )}
        </div>

        {/* Submission form */}
        <SubmitForm exerciseId={exerciseId} />

        {/* Submission history */}
        <SubmissionHistory exerciseId={exerciseId} />
      </main>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Submit form + polling
// ---------------------------------------------------------------------------

function SubmitForm({ exerciseId }: { exerciseId: string }) {
  const [forkUrl, setForkUrl] = useState('');
  const [commitSha, setCommitSha] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<SubmissionDto | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function isValidUrl(url: string): boolean {
    return (
      url.startsWith('https://github.com/') ||
      url.startsWith('http://github.com/') ||
      url.startsWith('/') // local path for testing
    );
  }

  function stopPolling() {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }

  function startPolling(id: string) {
    stopPolling();
    pollRef.current = setInterval(async () => {
      try {
        const sub = await api.submissions.get(id);
        setResult(sub);
        if (['PASSED', 'FAILED', 'ERROR'].includes(sub.status)) {
          stopPolling();
          setSubmitting(false);
        }
      } catch {
        stopPolling();
        setSubmitting(false);
      }
    }, 2000);
  }

  // Clean up on unmount
  useEffect(() => () => stopPolling(), []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!isValidUrl(forkUrl)) {
      setError('Fork URL must be a github.com URL (e.g. https://github.com/you/learnstack-qa-track)');
      return;
    }

    setSubmitting(true);
    try {
      const sub = await api.submissions.create(exerciseId, forkUrl, commitSha || undefined);
      setResult(sub);
      startPolling(sub.id);
    } catch (err) {
      setError((err as Error).message);
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-5">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
        Grade My Submission
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="forkUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Fork URL <span className="text-red-500">*</span>
          </label>
          <input
            id="forkUrl"
            type="url"
            required
            value={forkUrl}
            onChange={(e) => setForkUrl(e.target.value)}
            placeholder="https://github.com/you/learnstack-qa-track"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          />
          <p className="text-xs text-gray-400 mt-1">
            Your fork of the learnstack-qa-track repository.
          </p>
        </div>

        <div>
          <label htmlFor="commitSha" className="block text-sm font-medium text-gray-700 mb-1">
            Commit SHA <span className="text-gray-400 font-normal">(optional — defaults to HEAD)</span>
          </label>
          <input
            id="commitSha"
            type="text"
            value={commitSha}
            onChange={(e) => setCommitSha(e.target.value)}
            placeholder="abc1234"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2 px-4 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? 'Grading…' : 'Grade my submission'}
        </button>
      </form>

      {/* Live result */}
      {result && <GradeResult result={result} />}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Grade result display
// ---------------------------------------------------------------------------

function GradeResult({ result }: { result: SubmissionDto }) {
  const isPending = result.status === 'PENDING' || result.status === 'GRADING';

  if (isPending) {
    return (
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div className="flex items-center gap-2 text-sm text-blue-700">
          <span className="animate-pulse">●</span>
          <span>Grading in progress…</span>
        </div>
      </div>
    );
  }

  if (result.status === 'ERROR') {
    const output = result.graderOutput as { message?: string } | null;
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 space-y-2">
        <p className="text-sm font-semibold text-red-800">Grading error</p>
        <p className="text-xs text-red-700 font-mono whitespace-pre-wrap">
          {output?.message ?? 'Unknown error'}
        </p>
      </div>
    );
  }

  const output = result.graderOutput as {
    type: string;
    result?: {
      matched: number;
      expected: number;
      required: number;
      passed: boolean;
      details: Array<{ expected: string; matched: boolean; reason: string }>;
    };
  } | null;

  const bugResult = output?.result;
  const passed = result.status === 'PASSED';

  return (
    <div
      className={`rounded-lg border p-4 space-y-4 ${
        passed ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
      }`}
    >
      <div className="flex items-center justify-between">
        <p className={`text-sm font-semibold ${passed ? 'text-green-800' : 'text-red-800'}`}>
          {passed ? '✓ Passed' : '✗ Not yet'}
        </p>
        {bugResult && (
          <span className={`text-xs font-mono ${passed ? 'text-green-700' : 'text-red-700'}`}>
            {bugResult.matched}/{bugResult.expected} bugs matched (need {bugResult.required})
          </span>
        )}
      </div>

      {bugResult?.details && (
        <div className="space-y-2">
          {bugResult.details.map((d, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 text-xs rounded p-2 ${
                d.matched ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              <span className="shrink-0 font-bold">{d.matched ? '✓' : '✗'}</span>
              <div>
                <p className="font-medium">{d.expected}</p>
                <p className="text-opacity-80">{d.reason}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Submission history
// ---------------------------------------------------------------------------

function SubmissionHistory({ exerciseId }: { exerciseId: string }) {
  const [submissions, setSubmissions] = useState<SubmissionDto[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.submissions
      .list(exerciseId)
      .then(setSubmissions)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [exerciseId]);

  // Refresh after grading completes (simplified: poll briefly on mount)
  useEffect(() => {
    const t = setTimeout(() => {
      api.submissions.list(exerciseId).then(setSubmissions).catch(() => {});
    }, 6000);
    return () => clearTimeout(t);
  }, [exerciseId]);

  if (loading || submissions.length === 0) return null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Submission History
        </h2>
      </div>

      <div className="divide-y divide-gray-100">
        {submissions.map((sub) => (
          <div key={sub.id}>
            <button
              onClick={() => setExpanded(expanded === sub.id ? null : sub.id)}
              className="w-full flex items-center justify-between px-6 py-3 hover:bg-gray-50 text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <StatusPill status={sub.status} />
                <span className="text-xs text-gray-500 font-mono">
                  {new Date(sub.submittedAt).toLocaleString()}
                </span>
                {sub.score !== null && (
                  <span className="text-xs text-gray-400">
                    Score: {Math.round(sub.score * 100)}%
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-400">{expanded === sub.id ? '▲' : '▼'}</span>
            </button>

            {expanded === sub.id && (
              <div className="px-6 pb-4 pt-0">
                <GradeResult result={sub} />
                <p className="text-xs text-gray-400 mt-2 font-mono">{sub.forkUrl}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    PENDING: 'bg-gray-100 text-gray-500',
    GRADING: 'bg-blue-100 text-blue-700',
    PASSED: 'bg-green-100 text-green-700',
    FAILED: 'bg-red-100 text-red-700',
    ERROR: 'bg-orange-100 text-orange-700',
  };
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${map[status] ?? 'bg-gray-100 text-gray-500'}`}>
      {status}
    </span>
  );
}

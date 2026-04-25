import { useEffect, useState } from 'react';
import type { AdminSubmissionDto, AdminUserDto } from '@learnstack/shared';
import { api } from '../../lib/api.ts';
import Nav from '../../components/Nav.tsx';
import { formatDate } from '../../lib/format.ts';

const STATUSES = ['PENDING', 'GRADING', 'PASSED', 'FAILED', 'ERROR'];

const STATUS_BADGE: Record<string, string> = {
  PASSED: 'bg-green-100 text-green-700',
  FAILED: 'bg-red-100 text-red-700',
  PENDING: 'bg-blue-100 text-blue-700',
  GRADING: 'bg-blue-100 text-blue-700',
  ERROR: 'bg-orange-100 text-orange-700',
};

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<AdminSubmissionDto[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filter state
  const [filterUserId, setFilterUserId] = useState('');
  const [filterExercise, setFilterExercise] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // User list for userId filter dropdown
  const [users, setUsers] = useState<AdminUserDto[]>([]);

  useEffect(() => {
    api.admin.listUsers(1, 100)
      .then(({ users: u }) => setUsers(u))
      .catch(() => {});
  }, []);

  function load(p = page) {
    setLoading(true);
    api.admin.listSubmissions({
      userId: filterUserId || undefined,
      exerciseId: filterExercise || undefined,
      status: filterStatus || undefined,
      page: p,
      limit: 20,
    })
      .then(({ submissions: s, total: t }) => { setSubmissions(s); setTotal(t); })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, [page]);

  function applyFilters() {
    setPage(1);
    load(1);
  }

  const totalPages = Math.ceil(total / 20);

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Submissions</h1>
          <p className="text-sm text-gray-400 mt-0.5">{total} total</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 flex flex-wrap gap-3 items-end">
          <div className="flex flex-col gap-1 min-w-0">
            <label className="text-xs font-medium text-gray-500">User</label>
            <select
              value={filterUserId}
              onChange={(e) => setFilterUserId(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All users</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <label className="text-xs font-medium text-gray-500">Exercise ID contains</label>
            <input
              type="text"
              value={filterExercise}
              onChange={(e) => setFilterExercise(e.target.value)}
              placeholder="e.g. bug-hunt"
              onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
              className="border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <button
            onClick={applyFilters}
            className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            Filter
          </button>
          {(filterUserId || filterExercise || filterStatus) && (
            <button
              onClick={() => {
                setFilterUserId('');
                setFilterExercise('');
                setFilterStatus('');
                setPage(1);
                setTimeout(() => load(1), 0);
              }}
              className="text-xs text-gray-400 hover:text-gray-700 underline"
            >
              Clear
            </button>
          )}
        </div>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-8" />
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">User</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Exercise</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Score</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">Loading…</td></tr>
              ) : submissions.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No submissions found</td></tr>
              ) : submissions.map((s) => (
                <>
                  <tr
                    key={s.id}
                    onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      {expandedId === s.id ? '▾' : '▸'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{s.userName}</div>
                      <div className="text-xs text-gray-400">{s.userEmail}</div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-600">{s.exerciseId}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_BADGE[s.status] ?? 'bg-gray-100 text-gray-500'}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {s.score !== null ? `${Math.round(s.score * 100)}%` : '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-400">{formatDate(s.submittedAt)}</td>
                  </tr>
                  {expandedId === s.id && (
                    <tr key={`${s.id}-detail`} className="bg-gray-50">
                      <td colSpan={6} className="px-4 py-4">
                        <SubmissionDetail submission={s} />
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-40"
            >
              Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

function SubmissionDetail({ submission: s }: { submission: AdminSubmissionDto }) {
  return (
    <div className="space-y-3 text-xs">
      <div className="flex flex-wrap gap-6 text-gray-600">
        <div><span className="font-medium text-gray-500">Fork URL:</span>{' '}
          <a href={s.forkUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">
            {s.forkUrl}
          </a>
        </div>
        {s.commitSha && (
          <div><span className="font-medium text-gray-500">Commit:</span> <code className="font-mono">{s.commitSha.slice(0, 12)}</code></div>
        )}
        {s.gradedAt && (
          <div><span className="font-medium text-gray-500">Graded:</span> {formatDate(s.gradedAt)}</div>
        )}
      </div>

      {s.graderOutput != null && (
        <div>
          <p className="font-medium text-gray-500 mb-1">Grader output</p>
          <pre className="bg-white border border-gray-200 rounded p-3 overflow-x-auto text-gray-700 leading-relaxed whitespace-pre-wrap">
            {JSON.stringify(s.graderOutput, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

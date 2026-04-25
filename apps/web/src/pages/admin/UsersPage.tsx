import { useEffect, useState, useRef } from 'react';
import type { AdminUserDto, TrackProgress } from '@learnstack/shared';
import { api } from '../../lib/api.ts';
import Nav from '../../components/Nav.tsx';
import PartProgressCard from '../../components/PartProgressCard.tsx';
import { formatDate, formatDateShort } from '../../lib/format.ts';

const TRACK_SLUG = 'qa-fundamentals';

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUserDto[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [drawerUser, setDrawerUser] = useState<AdminUserDto | null>(null);

  function load(p = page) {
    setLoading(true);
    api.admin.listUsers(p)
      .then(({ users: u, total: t }) => { setUsers(u); setTotal(t); })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, [page]);

  const totalPages = Math.ceil(total / 20);

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Users</h1>
            <p className="text-sm text-gray-400 mt-0.5">{total} total</p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            Create user
          </button>
        </div>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Role</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Submissions</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Last activity</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">Loading…</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No users found</td></tr>
              ) : users.map((u) => (
                <tr
                  key={u.id}
                  onClick={() => setDrawerUser(u)}
                  className="hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">{u.name}</td>
                  <td className="px-4 py-3 text-gray-600">{u.email}</td>
                  <td className="px-4 py-3">
                    <RoleBadge role={u.role} />
                  </td>
                  <td className="px-4 py-3 text-gray-600">{u.submissionCount}</td>
                  <td className="px-4 py-3 text-gray-400">{formatDateShort(u.lastActivityAt)}</td>
                  <td className="px-4 py-3 text-gray-400">{formatDateShort(u.createdAt)}</td>
                </tr>
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

      {showCreate && (
        <CreateUserModal
          onClose={() => setShowCreate(false)}
          onCreated={() => { setShowCreate(false); load(1); setPage(1); }}
        />
      )}

      {drawerUser && (
        <UserDrawer
          user={drawerUser}
          trackSlug={TRACK_SLUG}
          onClose={() => setDrawerUser(null)}
        />
      )}
    </div>
  );
}

function RoleBadge({ role }: { role: string }) {
  const map: Record<string, string> = {
    ADMIN: 'bg-purple-100 text-purple-700',
    INSTRUCTOR: 'bg-blue-100 text-blue-700',
    LEARNER: 'bg-gray-100 text-gray-600',
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${map[role] ?? 'bg-gray-100 text-gray-600'}`}>
      {role.charAt(0) + role.slice(1).toLowerCase()}
    </span>
  );
}

function CreateUserModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('LEARNER');
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => { firstRef.current?.focus(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !name.trim() || !password) return;
    setSaving(true);
    setErr('');
    try {
      await api.admin.createUser(email.trim(), name.trim(), password, role);
      onCreated();
    } catch (ex: unknown) {
      setErr(ex instanceof Error ? ex.message : 'Failed to create user');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">Create user</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Full name">
            <input
              ref={firstRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Field>
          <Field label="Password">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Field>
          <Field label="Role">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="LEARNER">Learner</option>
              <option value="INSTRUCTOR">Instructor</option>
              <option value="ADMIN">Admin</option>
            </select>
          </Field>

          {err && <p className="text-xs text-red-600">{err}</p>}

          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-40 transition-colors"
            >
              {saving ? 'Creating…' : 'Create'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      {children}
    </div>
  );
}

function UserDrawer({ user, trackSlug, onClose }: { user: AdminUserDto; trackSlug: string; onClose: () => void }) {
  const [progress, setProgress] = useState<TrackProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.admin.getUserProgress(user.id)
      .then(setProgress)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [user.id]);

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <div>
            <h2 className="font-semibold text-gray-900">{user.name}</h2>
            <p className="text-xs text-gray-400">{user.email} · joined {formatDateShort(user.createdAt)}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl leading-none">&times;</button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {loading && <p className="text-sm text-gray-400">Loading progress…</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}
          {progress && (
            <>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {progress.completedItems} / {progress.totalItems} completed
                </span>
                <span className="text-sm font-semibold text-blue-600">
                  {progress.totalItems > 0 ? Math.round((progress.completedItems / progress.totalItems) * 100) : 0}%
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${progress.totalItems > 0 ? (progress.completedItems / progress.totalItems) * 100 : 0}%` }}
                />
              </div>
              {progress.parts.map((part) => (
                <PartProgressCard
                  key={part.slug}
                  part={part}
                  trackSlug={trackSlug}
                  navigable={false}
                />
              ))}
            </>
          )}
        </div>

        <div className="px-6 py-3 border-t border-gray-100 shrink-0 text-xs text-gray-400">
          Last activity: {formatDate(user.lastActivityAt)}
        </div>
      </div>
    </>
  );
}

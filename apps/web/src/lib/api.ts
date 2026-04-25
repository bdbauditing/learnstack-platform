import type {
  AuthResponse, TrackIndex, PartIndex, ExerciseMeta, QuizData, UserDto,
  SubmissionDto, QuizAttemptDto, ExerciseProgress, TrackProgress,
  AdminUserDto, AdminSubmissionDto,
} from '@learnstack/shared';

const BASE = '/api';

function getToken(): string | null {
  return localStorage.getItem('accessToken');
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { headers: authHeaders(), ...init });

  if (res.status === 401) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
    throw new Error('Session expired');
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? `HTTP ${res.status}`);
  return data as T;
}

export const api = {
  auth: {
    login: (email: string, password: string): Promise<AuthResponse> =>
      request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),

    me: (): Promise<UserDto> => request('/auth/me'),

    logout: (): Promise<void> =>
      request('/auth/logout', { method: 'POST' }).then(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }),
  },

  tracks: {
    list: (): Promise<TrackIndex[]> => request('/tracks'),

    get: (slug: string): Promise<TrackIndex> => request(`/tracks/${slug}`),

    getPart: (trackSlug: string, partSlug: string): Promise<PartIndex> =>
      request(`/tracks/${trackSlug}/parts/${partSlug}`),

    getExercise: (trackSlug: string, partSlug: string, exerciseSlug: string): Promise<ExerciseMeta> =>
      request(`/tracks/${trackSlug}/parts/${partSlug}/exercises/${exerciseSlug}`),

    getQuiz: (trackSlug: string, partSlug: string): Promise<QuizData> =>
      request(`/tracks/${trackSlug}/parts/${partSlug}/quiz`),
  },

  submissions: {
    create: (exerciseId: string, forkUrl: string, commitSha?: string): Promise<SubmissionDto> =>
      request('/submissions', {
        method: 'POST',
        body: JSON.stringify({ exerciseId, forkUrl, commitSha }),
      }),

    get: (id: string): Promise<SubmissionDto> => request(`/submissions/${id}`),

    list: (exerciseId: string): Promise<SubmissionDto[]> =>
      request(`/submissions?exerciseId=${encodeURIComponent(exerciseId)}`),
  },

  quizAttempts: {
    create: (quizId: string, answers: unknown, score: number, passed: boolean): Promise<QuizAttemptDto> =>
      request('/quiz-attempts', {
        method: 'POST',
        body: JSON.stringify({ quizId, answers, score, passed }),
      }),

    listMe: (quizId?: string): Promise<QuizAttemptDto[]> =>
      request(`/quiz-attempts/me${quizId ? `?quizId=${encodeURIComponent(quizId)}` : ''}`),
  },

  progress: {
    getPart: (partSlug: string): Promise<ExerciseProgress[]> =>
      request(`/progress/me?partSlug=${encodeURIComponent(partSlug)}`),

    getFullTrack: (): Promise<TrackProgress> =>
      request('/progress/me'),
  },

  admin: {
    listUsers: (page = 1, limit = 20): Promise<{ users: AdminUserDto[]; total: number }> =>
      request(`/admin/users?page=${page}&limit=${limit}`),

    createUser: (email: string, name: string, password: string, role = 'LEARNER'): Promise<AdminUserDto> =>
      request('/admin/users', {
        method: 'POST',
        body: JSON.stringify({ email, name, password, role }),
      }),

    getUserProgress: (userId: string): Promise<TrackProgress> =>
      request(`/admin/users/${userId}/progress`),

    listSubmissions: (params: {
      userId?: string;
      exerciseId?: string;
      status?: string;
      page?: number;
      limit?: number;
    }): Promise<{ submissions: AdminSubmissionDto[]; total: number }> => {
      const q = new URLSearchParams();
      if (params.userId) q.set('userId', params.userId);
      if (params.exerciseId) q.set('exerciseId', params.exerciseId);
      if (params.status) q.set('status', params.status);
      q.set('page', String(params.page ?? 1));
      q.set('limit', String(params.limit ?? 20));
      return request(`/admin/submissions?${q.toString()}`);
    },
  },
};

export type Role = 'ADMIN' | 'INSTRUCTOR' | 'LEARNER';

export type SubmissionStatus = 'PENDING' | 'GRADING' | 'PASSED' | 'FAILED' | 'ERROR';

export interface UserDto {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
}

export interface TrackIndex {
  slug: string;
  title: string;
  parts: PartIndex[];
}

export interface PartIndex {
  slug: string;
  title: string;
  order: number;
  exerciseCount: number;
  hasQuiz: boolean;
  exercises: ExerciseIndex[];
}

export interface ExerciseIndex {
  slug: string;
  title: string;
  order: number;
  partSlug: string;
}

export interface ExerciseMeta {
  slug: string;
  title: string;
  order: number;
  partSlug: string;
  spec: string;
  starterFiles: Record<string, string>;
  answerKeyFiles: Record<string, string>;
}

export interface QuizData {
  title: string;
  pass_threshold: number;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  type: 'single_choice' | 'multi_choice';
  question: string;
  options: { text: string; correct: boolean }[];
  explanation: string;
}

export interface SubmissionDto {
  id: string;
  exerciseId: string;
  forkUrl: string;
  commitSha: string | null;
  status: SubmissionStatus;
  score: number | null;
  graderOutput: unknown;
  submittedAt: string;
  gradedAt: string | null;
}

export interface QuizAttemptDto {
  id: string;
  quizId: string;
  answers: unknown;
  score: number;
  passed: boolean;
  attemptedAt: string;
}

export interface ExerciseProgress {
  exerciseId: string;
  status: string;
  score: number | null;
}

export interface ExerciseProgressDetail {
  slug: string;
  title: string;
  order: number;
  status: SubmissionStatus | null;
  score: number | null;
}

export interface PartProgress {
  slug: string;
  title: string;
  order: number;
  quizStatus: 'PASSED' | 'FAILED' | 'NOT_ATTEMPTED';
  quizScore: number | null;
  exercises: ExerciseProgressDetail[];
}

export interface TrackProgress {
  totalItems: number;
  completedItems: number;
  parts: PartProgress[];
}

export interface AdminUserDto {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: string;
  lastActivityAt: string | null;
  submissionCount: number;
}

export interface AdminSubmissionDto {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  exerciseId: string;
  forkUrl: string;
  commitSha: string | null;
  status: SubmissionStatus;
  score: number | null;
  graderOutput: unknown;
  submittedAt: string;
  gradedAt: string | null;
}

export interface ApiError {
  error: string;
  message: string;
}

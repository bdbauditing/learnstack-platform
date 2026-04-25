import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import type { Role } from '@learnstack/shared';
import { ReactNode } from 'react';

export default function RequireRole({ role, children }: { role: Role; children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user || user.role !== role) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

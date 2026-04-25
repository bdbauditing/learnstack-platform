import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import RequireAuth from './components/RequireAuth.tsx';
import RequireRole from './components/RequireRole.tsx';
import LoginPage from './pages/LoginPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import PartPage from './pages/PartPage.tsx';
import ExercisePage from './pages/ExercisePage.tsx';
import ProgressPage from './pages/ProgressPage.tsx';
import UsersPage from './pages/admin/UsersPage.tsx';
import SubmissionsPage from './pages/admin/SubmissionsPage.tsx';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          }
        />

        <Route
          path="/progress"
          element={
            <RequireAuth>
              <ProgressPage />
            </RequireAuth>
          }
        />

        <Route
          path="/tracks/:trackSlug/parts/:partSlug"
          element={
            <RequireAuth>
              <PartPage />
            </RequireAuth>
          }
        />

        <Route
          path="/tracks/:trackSlug/parts/:partSlug/exercises/:exerciseSlug"
          element={
            <RequireAuth>
              <ExercisePage />
            </RequireAuth>
          }
        />

        <Route
          path="/admin/users"
          element={
            <RequireAuth>
              <RequireRole role="ADMIN">
                <UsersPage />
              </RequireRole>
            </RequireAuth>
          }
        />

        <Route
          path="/admin/submissions"
          element={
            <RequireAuth>
              <RequireRole role="ADMIN">
                <SubmissionsPage />
              </RequireRole>
            </RequireAuth>
          }
        />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

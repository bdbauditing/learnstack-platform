import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';

export default function Nav() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link to="/dashboard" className="text-blue-600 font-semibold text-sm">
          LearnStack
        </Link>

        {user && (
          <div className="flex items-center gap-4 text-sm">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? 'text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-800 transition-colors'
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/progress"
              className={({ isActive }) =>
                isActive ? 'text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-800 transition-colors'
              }
            >
              Progress
            </NavLink>
            {user.role === 'ADMIN' && (
              <>
                <NavLink
                  to="/admin/users"
                  className={({ isActive }) =>
                    isActive ? 'text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-800 transition-colors'
                  }
                >
                  Users
                </NavLink>
                <NavLink
                  to="/admin/submissions"
                  className={({ isActive }) =>
                    isActive ? 'text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-800 transition-colors'
                  }
                >
                  Submissions
                </NavLink>
              </>
            )}
          </div>
        )}
      </div>

      {user && (
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>{user.name}</span>
          <button onClick={logout} className="text-gray-400 hover:text-gray-700 transition-colors">
            Sign out
          </button>
        </div>
      )}
    </nav>
  );
}

import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';

export default function Nav() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <Link to="/dashboard" className="text-blue-600 font-semibold text-sm">
        LearnStack
      </Link>
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

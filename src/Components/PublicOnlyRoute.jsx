import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { getAuthToken, getUserData } from '../utils/auth';

/**
 * PublicOnlyRoute — Redirects already-authenticated users to their role-specific dashboard.
 * Only renders children for unauthenticated visitors.
 */
export const PublicOnlyRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = getAuthToken();
        const user = getUserData();

        const authenticated = !!(token && user && user.id);
        setIsAuthenticated(authenticated);
        setLoading(false);
      } catch (error) {
        console.error('PublicOnlyRoute Error:', error);
        setIsAuthenticated(false);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
      </div>
    );
  }

  if (isAuthenticated) {
    const user = getUserData();
    const redirectMap = {
      admin: '/admin/dashboard',
      organizor: '/organizer/dashboard',
    };
    const targetPath = redirectMap[user?.role] || '/';
    return <Navigate to={targetPath} replace />;
  }

  return children;
};

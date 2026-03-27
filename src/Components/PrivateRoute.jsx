import { Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Loader2, ShieldAlert } from 'lucide-react';
import { getAuthToken, getUserData } from '../utils/auth';

/**
 * PrivateRoute — Protects routes that require authentication and a specific role.
 *
 * Strict role isolation:
 *   - requiredRole="admin"    → only admin can access
 *   - requiredRole="organizor" → only organizor can access
 *   - no requiredRole         → any authenticated user can access
 *
 * Unauthorized users are redirected to their own dashboard (not login).
 */
export const PrivateRoute = ({ children, requiredRole = null }) => {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = getAuthToken();
        const user = getUserData();

        // Both must exist
        if (!token || !user || !user.id) {
          setIsValid(false);
          setHasAccess(false);
          setLoading(false);
          return;
        }

        setIsValid(true);

        // Check role if required (strict — no blanket admin override)
        if (requiredRole) {
          setHasAccess(user.role === requiredRole);
        } else {
          setHasAccess(true);
        }

        setLoading(false);
      } catch (error) {
        console.error('PrivateRoute Error:', error);
        setIsValid(false);
        setHasAccess(false);
        setLoading(false);
      }
    };

    checkAuth();
  }, [requiredRole, location.pathname]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated at all → login
  if (!isValid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Authenticated but wrong role → redirect to their own dashboard
  if (!hasAccess) {
    const user = getUserData();
    const redirectMap = {
      admin: '/admin/dashboard',
      organizor: '/organizer/dashboard',
    };
    const target = redirectMap[user?.role] || '/';
    return <Navigate to={target} replace />;
  }

  return children;
};
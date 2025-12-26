import { Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Loader2, ShieldAlert } from 'lucide-react';
import { isAuthenticated, verifyToken, getUserData, clearAuthData } from '../utils/auth';
import { getAuthToken } from '../utils/auth';
/**
 * PrivateRoute - Protects routes that require authentication
 */
export const PrivateRoute = ({ children, requiredRole = null }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Quick check first
        if (!isAuthenticated()) {
          setLoading(false);
          return;
        }

        // Verify token with backend
        const isValid = await verifyToken();
        
        if (!isValid) {
          // Token invalid, clear everything
          clearAuthData();
          setAuthenticated(false);
          setLoading(false);
          return;
        }

        setAuthenticated(true);

        // Check role authorization
        if (requiredRole) {
          const user = getUserData();
          
          if (!user) {
            setAuthorized(false);
            setLoading(false);
            return;
          }

          // Admin has access to everything
          if (user.role === 'admin') {
            setAuthorized(true);
          } else if (user.role === requiredRole) {
            setAuthorized(true);
          } else {
            setAuthorized(false);
          }
        } else {
          // No specific role required, just needs to be authenticated
          setAuthorized(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        clearAuthData();
        setAuthenticated(false);
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [requiredRole, location.pathname]); // Re-check when route changes

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!authenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Authenticated but not authorized
  if (!authorized) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-6">
            You don't have permission to access this page.
            {requiredRole && ` This page requires ${requiredRole} role.`}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-white font-semibold transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl text-white font-semibold"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated and authorized
  return children;
};

/**
 * PublicOnlyRoute - Redirects authenticated users away from auth pages
 */

/**
 * PublicOnlyRoute - Simple check
 */
export const PublicOnlyRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = getAuthToken();
        const user = getUserData();

        console.log("PublicOnlyRoute Check:");
        console.log("Token:", token ? "✅ EXISTS" : "❌ MISSING");
        console.log("User:", user ? "✅ EXISTS" : "❌ MISSING");

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
    const targetPath = user?.role === 'admin' ? '/panel' : '/';
    console.log("✅ Already logged in, redirecting to:", targetPath);
    return <Navigate to={targetPath} replace />;
  }

  console.log("❌ Not logged in, showing login page");
  return children;
};

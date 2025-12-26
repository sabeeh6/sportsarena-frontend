import { Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Loader2, ShieldAlert } from 'lucide-react';
import { getAuthToken, getUserData } from '../utils/auth';

/**
 * PrivateRoute - Simple and reliable
 */
export const PrivateRoute = ({ children, requiredRole = null }) => {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = getAuthToken();
        const user = getUserData();

        console.log("PrivateRoute Check:");
        console.log("Token:", token ? "✅ EXISTS" : "❌ MISSING");
        console.log("User:", user ? "✅ EXISTS" : "❌ MISSING");

        // Both must exist
        if (!token || !user || !user.id) {
          setIsValid(false);
          setLoading(false);
          return;
        }

        // Check role if required
        if (requiredRole) {
          const hasAccess = user.role === 'admin' || user.role === requiredRole;
          console.log("Role Check:", hasAccess ? "✅ PASSED" : "❌ FAILED");
          setIsValid(hasAccess);
        } else {
          setIsValid(true);
        }

        setLoading(false);
      } catch (error) {
        console.error('PrivateRoute Error:', error);
        setIsValid(false);
        setLoading(false);
      }
    };

    checkAuth();
  }, [requiredRole, location.pathname]);

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

  if (!isValid) {
    console.log("❌ Not authenticated, redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log("✅ Authenticated, showing protected content");
  return children;
};
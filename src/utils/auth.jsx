// ============================================
// AUTH HELPER FUNCTIONS
// ============================================

/**
 * Get auth token from cookies
 */
export const getAuthToken = () => {
  try {
    console.log("Cookie" , document.cookie)
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('authToken='))
      ?.split('=')[1];
    console.log(token  , "TOKAN");
    
    return token || null;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  const token = getAuthToken();
  const user = getUserData();
  
  // Both token and user data must exist
  return !!(token && user && user.id);
};

/**
 * Verify token with backend
 */
export const verifyToken = async () => {
  try {
    const token = getAuthToken(); 
    console.log("Aut token" ,  token);
    
    console.log("Token" , token)
    if (!token) {
      console.warn('No token found for verification');
      return false;
    }

    const response = await fetch('http://localhost:3009/api/auth/verify', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      console.warn('Token verification failed:', response.status);
      
      // If unauthorized, clear auth data
      if (response.status === 401 || response.status === 403) {
        clearAuthData();
      }
      
      return false;
    }

    const data = await response.json();
    
    // Validate response structure
    if (data && data.success) {
      // Optionally update user data if provided
      if (data.user) {
        const existingUser = getUserData();
        const updatedUser = { ...existingUser, ...data.user };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Token verification error:', error);
    
    // Network errors don't necessarily mean invalid token
    // So we don't clear auth data here
    return false;
  }
};

/**
 * Get user data from localStorage
 */
export const getUserData = () => {
  try {
    const userStr = localStorage.getItem('user');
    
    if (!userStr) {
      return null;
    }
    
    const user = JSON.parse(userStr);
    
    // Validate user object has required fields
    if (!user.id || !user.email) {
      console.warn('Invalid user data structure');
      return null;
    }
    
    return user;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

/**
 * Get user role
 */
export const getUserRole = () => {
  const user = getUserData();
  return user?.role || 'user';
};

/**
 * Check if user has specific role
 */
export const hasRole = (requiredRole) => {
  const userRole = getUserRole();
  
  // Admin has access to everything
  if (userRole === 'admin') {
    return true;
  }
  
  return userRole === requiredRole;
};

/**
 * Clear all authentication data
 */
export const clearAuthData = () => {
  try {
    // Clear cookie
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict';
    
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('lastLogin');
    localStorage.removeItem('authToken'); // In case it was stored here too
    
    console.log('✅ Auth data cleared');
  } catch (error) {
    console.error('Error clearing auth data:', error);
  }
};

/**
 * Logout user and redirect to login
 */
export const logout = (redirectPath = '/login') => {
  clearAuthData();
  
  // Use window.location for full page reload to ensure all state is cleared
  window.location.href = redirectPath;
};

/**
 * Refresh auth token (if your backend supports token refresh)
 */
export const refreshAuthToken = async () => {
  try {
    const token = getAuthToken();
    
    if (!token) {
      return false;
    }

    const response = await fetch('http://localhost:3009/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    
    if (data.token) {
      // Update cookie with new token
      document.cookie = `authToken=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Strict; Secure`;
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Token refresh error:', error);
    return false;
  }
};

/**
 * Check if token is expired (client-side check)
 * Note: This requires token to be JWT with exp claim
 */
export const isTokenExpired = () => {
  try {
    const token = getAuthToken();
    
    if (!token) {
      return true;
    }

    // Decode JWT (without verification - just for expiry check)
    const payload = JSON.parse(atob(token.split('.')[1]));
    
    if (!payload.exp) {
      // If no expiry, assume it's valid
      return false;
    }
    
    // Check if expired (exp is in seconds, Date.now() is in milliseconds)
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    console.error('Error checking token expiry:', error);
    // If we can't decode, assume expired
    return true;
  }
};

/**
 * Get time until token expires (in milliseconds)
 */
export const getTokenTimeRemaining = () => {
  try {
    const token = getAuthToken();
    
    if (!token) {
      return 0;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    
    if (!payload.exp) {
      return Infinity; // No expiry
    }
    
    const expiryTime = payload.exp * 1000;
    const now = Date.now();
    
    return Math.max(0, expiryTime - now);
  } catch (error) {
    console.error('Error getting token time remaining:', error);
    return 0;
  }
};

/**
 * Setup automatic token refresh
 * Call this after successful login
 */
export const setupTokenRefresh = () => {
  // Clear any existing interval
  if (window.tokenRefreshInterval) {
    clearInterval(window.tokenRefreshInterval);
  }

  // Refresh token every 6 hours (adjust based on your token expiry)
  window.tokenRefreshInterval = setInterval(async () => {
    const timeRemaining = getTokenTimeRemaining();
    
    // Refresh if less than 1 hour remaining
    if (timeRemaining < 60 * 60 * 1000) {
      const refreshed = await refreshAuthToken();
      
      if (!refreshed) {
        console.warn('Token refresh failed, logging out');
        logout();
      }
    }
  }, 30 * 60 * 1000); // Check every 30 minutes
};

/**
 * Clear token refresh interval
 */
export const clearTokenRefresh = () => {
  if (window.tokenRefreshInterval) {
    clearInterval(window.tokenRefreshInterval);
    window.tokenRefreshInterval = null;
  }
};
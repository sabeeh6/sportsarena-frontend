import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, Trophy, Zap, Shield, ArrowRight, Facebook } from 'lucide-react';
import api from '../../api/api';
import { useNavigate } from "react-router-dom";
import { clearAuthData } from '../../utils/auth';

const SportsLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Clear auth data when login page loads
  useEffect(() => {
    clearAuthData();
  }, []);

  // Generate animated particles
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  const handlePage = () => {
    navigate("/signUp");
  };

  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLogin = async (e) => {
    e?.preventDefault();
    setError('');

    // Validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("http://localhost:3009/api/auth/login-user", {
        email: email.trim().toLowerCase(),
        password
      });

      const userData = response.data;

      // Validate response structure
      if (!userData?.data?.accessToken) {
        throw new Error("Invalid response from server");
      }

      const token = userData.data.accessToken;
      const user = userData.data.user;

      // Store user data FIRST
      const userInfo = {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role || 'user',
        createdAt: user.createdAt || new Date().toISOString()
      };

      localStorage.setItem('user', JSON.stringify(userInfo));
      localStorage.setItem('lastLogin', new Date().toISOString());

      // THEN set cookie
      const maxAge = 7 * 24 * 60 * 60; // 7 days in seconds
      document.cookie = `authToken=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;

      console.log("✅ Login Successful");
      console.log("User:", userInfo);
      console.log("Token:", token);
      console.log("Cookie set:", document.cookie);

      // Wait a bit to ensure everything is saved
      await new Promise(resolve => setTimeout(resolve, 200));

      // Navigate with window.location for full reload (ensures all components re-check auth)
      const redirectPath = userInfo.role === 'admin' ? '/panel' : '/';
      window.location.href = redirectPath;

    } catch (err) {
      console.error("❌ Login Error:", err);

      // Clear any partial auth data on error
      clearAuthData();

      // Handle different error types
      if (err.response?.status === 401) {
        setError("Invalid email or password.");
      } else if (err.response?.status === 404) {
        setError("Account not found. Please sign up.");
      } else if (err.response?.status === 403) {
        setError("Account is disabled. Contact support.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Connection failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-red-600/20 to-purple-600/20"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9zdmc+')] opacity-30"></div>

      {/* Floating Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-float"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, ${
              particle.id % 3 === 0 ? '#f97316' : particle.id % 3 === 1 ? '#ef4444' : '#a855f7'
            }, transparent)`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            opacity: 0.6
          }}
        />
      ))}

      {/* Mouse Follow Light Effect */}
      <div 
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-300"
        style={{
          background: 'radial-gradient(circle, #f97316, #ef4444, transparent)',
          left: `${mousePosition.x - 192}px`,
          top: `${mousePosition.y - 192}px`,
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Branding */}
          <div className="hidden lg:block space-y-8 animate-fadeInLeft">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-orange-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                  <Trophy className="w-12 h-12 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-5xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  Sports Arena
                </h1>
                <p className="text-gray-400 text-lg mt-1">Where Champions Are Born</p>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6 mt-12">
              {[
                { icon: Zap, title: 'Lightning Fast', desc: 'Instant access to tournaments' },
                { icon: Shield, title: 'Secure & Safe', desc: 'Your data is protected' },
                { icon: Trophy, title: 'Win Big', desc: 'Compete for amazing prizes' }
              ].map((feature, idx) => (
                <div 
                  key={idx}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-orange-500/50 transition-all group"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{feature.title}</h3>
                    <p className="text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="animate-fadeInRight">
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
              {/* Decorative Elements */}
              <div className="absolute -top-1 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
              <div className="absolute -bottom-1 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
              
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-block lg:hidden mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h2 className="text-4xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-2">
                  Welcome Back!
                </h2>
                <p className="text-gray-400 text-lg">
                  Sign in to continue your journey
                </p>
              </div>

              {/* Social Login */}
              <div className="space-y-3 mb-8">
                <button 
                  type="button"
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-3 bg-white hover:bg-gray-100 text-gray-900 font-semibold py-4 rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <button 
                  type="button"
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-3 bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold py-4 rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <Facebook className="w-6 h-6" fill="currentColor" />
                  <span>Continue with Facebook</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-slate-900 text-gray-400 text-sm font-medium">
                    Or sign in with email
                  </span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Input */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-300 mb-2 ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="your@email.com"
                      disabled={loading}
                      className="w-full bg-slate-800/50 border border-white/10 text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all placeholder:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-300 mb-2 ml-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="••••••••••"
                      disabled={loading}
                      className="w-full bg-slate-800/50 border border-white/10 text-white rounded-xl py-4 pl-12 pr-12 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all placeholder:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors disabled:opacity-50"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      disabled={loading}
                      className="w-4 h-4 rounded border-white/20 bg-slate-800 text-orange-500 focus:ring-orange-500 focus:ring-offset-slate-900 disabled:opacity-50"
                    />
                    <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      Remember me
                    </span>
                  </label>
                  <button 
                    type="button"
                    disabled={loading}
                    className="text-sm text-orange-500 hover:text-orange-400 font-semibold transition-colors disabled:opacity-50"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="text-red-400 text-sm font-semibold bg-red-500/10 p-3 rounded-lg border border-red-500/20 flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">⚠</span>
                    <span>{error}</span>
                  </div>
                )}

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-orange-500/50 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span className="text-lg">
                    {loading ? "Signing In..." : "Sign In"}
                  </span>
                  {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </button>

                {/* Sign Up Link */}
                <p className="text-center text-gray-400 text-sm">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    className="text-orange-500 hover:text-orange-400 font-bold transition-colors cursor-pointer select-none focus:outline-none disabled:opacity-50"
                    onClick={handlePage}
                    disabled={loading}
                  >
                    Create Account
                  </button>
                </p>
              </form>

              {/* Trust Badge */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Secured by 256-bit SSL encryption</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-2 border-orange-500/20 rounded-full animate-ping"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-red-500/20 rounded-full animate-pulse"></div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(90deg);
          }
          50% {
            transform: translateY(-10px) translateX(-10px) rotate(180deg);
          }
          75% {
            transform: translateY(-30px) translateX(5px) rotate(270deg);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SportsLoginPage;
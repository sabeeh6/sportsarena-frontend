import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Lock, User, Mail } from "lucide-react";

export default function AdminAuth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#050810] via-[#0a0f1c] to-[#121829] overflow-hidden text-white">
      {/* 🔥 Background Glow Orbs */}
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 blur-[130px] top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      {/* 🌠 Floating Stars */}
      {[...Array(15)].map((_, i) => (
        <Motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2,
            repeat: Infinity,
          }}
          className="absolute bg-white rounded-full blur-[1px]"
          style={{
            width: Math.random() * 3 + 1 + "px",
            height: Math.random() * 3 + 1 + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
        />
      ))}

      {/* 💫 Auth Card */}
      <Motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-[90%] max-w-md border border-white/20"
      >
        <Motion.h2
          key={isLogin ? "login" : "signup"}
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text"
        >
          {isLogin ? "Admin Login" : "Admin Signup"}
        </Motion.h2>

        <AnimatePresence mode="wait">
          {isLogin ? (
            <Motion.form
              key="login"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Email
                </label>
                <div className="flex items-center bg-white/10 border border-gray-600 rounded-lg px-3 py-2 focus-within:border-orange-400">
                  <Mail className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="email"
                    placeholder="admin@example.com"
                    className="bg-transparent w-full outline-none text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Password
                </label>
                <div className="flex items-center bg-white/10 border border-gray-600 rounded-lg px-3 py-2 focus-within:border-orange-400">
                  <Lock className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="bg-transparent w-full outline-none text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <Motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg font-semibold shadow-lg hover:shadow-orange-500/30 transition"
              >
                Login
              </Motion.button>
            </Motion.form>
          ) : (
            <Motion.form
              key="signup"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Full Name
                </label>
                <div className="flex items-center bg-white/10 border border-gray-600 rounded-lg px-3 py-2 focus-within:border-orange-400">
                  <User className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="John Admin"
                    className="bg-transparent w-full outline-none text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Email
                </label>
                <div className="flex items-center bg-white/10 border border-gray-600 rounded-lg px-3 py-2 focus-within:border-orange-400">
                  <Mail className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="email"
                    placeholder="admin@example.com"
                    className="bg-transparent w-full outline-none text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Password
                </label>
                <div className="flex items-center bg-white/10 border border-gray-600 rounded-lg px-3 py-2 focus-within:border-orange-400">
                  <Lock className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="bg-transparent w-full outline-none text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <Motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg font-semibold shadow-lg hover:shadow-orange-500/30 transition"
              >
                Sign Up
              </Motion.button>
            </Motion.form>
          )}
        </AnimatePresence>

        <div className="text-center mt-6 text-sm text-gray-400">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-orange-400 hover:text-orange-300 transition font-medium"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-orange-400 hover:text-orange-300 transition font-medium"
              >
                Login
              </button>
            </>
          )}
        </div>
      </Motion.div>
    </div>
  );
}

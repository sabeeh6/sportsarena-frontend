import React from "react";
import { motion as Motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Header({ title, description }) {
  return (
    <header className="relative w-full bg-slate-950 text-white py-16 px-6  pt-48 overflow-hidden">
      {/* Gradient Blur Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 opacity-10 blur-3xl"></div>

      <Motion.div
        className="max-w-4xl mx-auto text-center relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Title Section */}
        <Motion.div
          className="flex justify-center items-center gap-2 mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
        >
          <Motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <Sparkles className="text-yellow-400 w-6 h-6" />
          </Motion.div>

          <Motion.h1
            className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-text-shimmer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {title}
          </Motion.h1>

          <Motion.div
            animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <Sparkles className="text-yellow-400 w-6 h-6" />
          </Motion.div>
        </Motion.div>

        {/* Tagline / Description */}
        <Motion.p
          className="text-slate-300 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          {description}
        </Motion.p>

        {/* Curved Gradient Separator */}
        <Motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <svg
            className="mx-auto w-full h-10 text-slate-900"
            preserveAspectRatio="none"
            viewBox="0 0 1440 100"
          >
            <path
              fill="url(#gradient)"
              d="M0,0 C480,80 960,0 1440,80 L1440,100 L0,100 Z"
            ></path>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#facc15" />
              </linearGradient>
            </defs>
          </svg>
        </Motion.div>
      </Motion.div>
    </header>
  );
}

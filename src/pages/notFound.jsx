import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function NotFound() {
  return (
    <>
    <Header/>
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-[#050810] via-[#0a0f1c] to-[#121829] text-white">

      {/* 🔥 Background Glow Orbs */}
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
        className="absolute w-[700px] h-[700px] rounded-full bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 blur-[140px] top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      {/* 🌠 Floating Stars */}
      {[...Array(20)].map((_, i) => (
        <Motion.span
          key={i}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0.2, 1, 0.2],
            y: [0, -10, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            repeatType: "mirror",
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

      {/* ⚡ Animated 404 */}
      <Motion.h1
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, delay: 0.3 }}
        className="relative text-[110px] md:text-[180px] font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-yellow-400 z-10 drop-shadow-[0_0_40px_rgba(255,100,0,0.5)]"
      >
        404
        {/* subtle glowing ring behind 404 */}
        <Motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.3, opacity: 0.15 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-red-500 blur-[90px]"
        />
      </Motion.h1>

      {/* Subtitle */}
      <Motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-2xl md:text-3xl font-semibold mt-4 z-10 tracking-wide"
      >
        Page Not Found
      </Motion.h2>

      {/* Description */}
      <Motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="text-gray-400 mt-3 mb-10 text-center max-w-md z-10"
      >
        Looks like this play didn’t make it to the scoreboard.  
        Let’s get you back to the action!
      </Motion.p>

      {/* Button */}
      <Motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.4, type: "spring", stiffness: 100 }}
        className="z-10"
      >
        <Link
          to="/"
          className="relative inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-600 hover:scale-105 transition-all duration-300 shadow-lg overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-transparent opacity-0 hover:opacity-30 transition duration-300 blur-md" />
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-medium">Back to Home</span>
        </Link>
      </Motion.div>

      {/* Floating Sparks */}
      <Motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-24 left-[10%] w-4 h-4 bg-orange-500 rounded-full blur-sm"
      />
      <Motion.div
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        className="absolute top-28 right-[15%] w-3 h-3 bg-red-500 rounded-full blur-sm"
      />
    </div>
    <Footer/>
    </>
  );
}

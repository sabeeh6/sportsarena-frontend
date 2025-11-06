import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Trophy,
  Clock,
  Gamepad2,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TournamentCard({
  title,
  location,
  prizeMoney,
  maxPlayers,
  startDate,
  endDate,
  matches,

}) {
  const navigate=useNavigate();
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 1 }}
      whileTap={{ scale: 0.98 }}
      className="relative group bg-slate-900/60 backdrop-blur-xl border border-slate-800/70 hover:border-orange-500/40 
                 shadow-[0_0_30px_-10px_rgba(255,100,0,0.2)] rounded-2xl p-6 transition-all duration-300 overflow-hidden"
    >
      {/* Animated Gradient Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 blur-xl"></div>

      {/* Card Content */}
      <div className="relative z-10 space-y-4">
        {/* Title */}
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
          {title}
        </h2>

        {/* Location and Date */}
        <div className="flex flex-col gap-2 text-slate-300">
          <div className="flex items-center gap-2">
            <MapPin className="text-yellow-500 w-5 h-5" />
            <span className="text-sm tracking-wide">{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="text-orange-400 w-5 h-5" />
            <span className="text-sm">{startDate}</span>
          </div>
        </div>

        {/* Tournament Stats */}
        <div className="grid grid-cols-2 gap-3 text-sm mt-4">
          <div className="bg-slate-800/50 rounded-xl p-3 flex flex-col items-center justify-center hover:bg-slate-800/80 transition">
            <Clock className="text-red-400 w-5 h-5 mb-1" />
            <span className="text-xs text-slate-400">Starts</span>
            <span className="text-sm font-semibold text-white">{startDate}</span>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-3 flex flex-col items-center justify-center hover:bg-slate-800/80 transition">
            <Clock className="text-yellow-400 w-5 h-5 mb-1" />
            <span className="text-xs text-slate-400">Ends</span>
            <span className="text-sm font-semibold text-white">{endDate}</span>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-3 flex flex-col items-center justify-center hover:bg-slate-800/80 transition">
            <Gamepad2 className="text-orange-400 w-5 h-5 mb-1" />
            <span className="text-xs text-slate-400">Matches</span>
            <span className="text-sm font-semibold text-white">
              {matches}
            </span>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-3 flex flex-col items-center justify-center hover:bg-slate-800/80 transition">
            <Users className="text-green-400 w-5 h-5 mb-1" />
            <span className="text-xs text-slate-400">Players</span>
            <span className="text-sm font-semibold text-white">
              {maxPlayers}
            </span>
          </div>
        </div>

        {/* Prize Section */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-700/50 pt-4">
          <div className="flex items-center gap-2">
            <Trophy className="text-yellow-400 w-6 h-6 drop-shadow-glow" />
            <span className="text-lg font-semibold text-yellow-400">
              ${prizeMoney}
              
            </span>
          </div>
          <motion.button
          onClick={()=>navigate('/apply')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm cursor-pointer font-semibold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
          >
            Register
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

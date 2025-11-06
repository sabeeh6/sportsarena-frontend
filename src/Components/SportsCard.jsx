import React from "react";
import { motion } from "framer-motion";
import { Users, Target, Dumbbell, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function SportsCard({
  name,
  image,
  description,
  gradient,
  teamSize,
  difficulty,
  popularity,
  equipmentNeeded,
  index
}) {
    const navigate=useNavigate();
    const handleSports = () => {
        navigate(`/tournaments/${name}`)
    }
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, y: -10 }}
      className="relative group"
    >
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 backdrop-blur-xl h-full">
        {/* Animated Gradient Border */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>
        <div className="absolute inset-[2px] rounded-2xl bg-slate-900 z-10"></div>

        {/* Content Container */}
        <div className="relative z-20 p-6">
          {/* Image Section with Overlay */}
          <div className="relative h-56 mb-5 rounded-xl overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
            
            {/* Popularity Badge */}
            {popularity && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className={`absolute top-4 right-4 px-3 py-1.5 rounded-full bg-gradient-to-r ${gradient} shadow-lg backdrop-blur-md`}
              >
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-white fill-white" />
                  <span className="text-white text-xs font-bold">{popularity}</span>
                </div>
              </motion.div>
            )}

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <motion.h3
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`text-4xl font-black bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl`}
              >
                {name}
              </motion.h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-400 text-sm mb-5 leading-relaxed min-h-[60px]">
            {description}
          </p>

          {/* Stats Grid */}
          <div className="space-y-3 mb-5">
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center justify-between bg-slate-800/50 rounded-lg p-3 border border-slate-700/50 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-slate-400 text-sm font-medium">Team Size</span>
              </div>
              <span className="text-slate-200 text-sm font-bold">{teamSize}</span>
            </motion.div>

            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center justify-between bg-slate-800/50 rounded-lg p-3 border border-slate-700/50 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-400" />
                <span className="text-slate-400 text-sm font-medium">Difficulty</span>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < difficulty ? `bg-gradient-to-r ${gradient}` : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center justify-between bg-slate-800/50 rounded-lg p-3 border border-slate-700/50 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-400 text-sm font-medium">Equipment</span>
              </div>
              <span className="text-slate-200 text-sm font-bold">{equipmentNeeded}</span>
            </motion.div>
          </div>

          {/* Action Button */}
          <motion.button
          onClick={handleSports}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 cursor-pointer rounded-lg bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500  text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group/btn`}
          >
            <span className="relative z-10">View Tournaments</span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </div>

        {/* Animated Corner Glow */}
        <div className={`absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-r ${gradient} opacity-20 blur-3xl group-hover:opacity-50 transition-opacity duration-500 rounded-full`}></div>
        <div className={`absolute -bottom-20 -left-20 w-48 h-48 bg-gradient-to-r ${gradient} opacity-20 blur-3xl group-hover:opacity-50 transition-opacity duration-500 rounded-full`}></div>
      </div>
    </motion.div>
  );
}
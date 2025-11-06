import React from "react";
import { motion } from "framer-motion";
import { Trophy, Calendar, Award, Users, Dumbbell } from "lucide-react";
import SportsCard from "../../Components/SportsCard";
import { useNavigate } from "react-router-dom";

export default function SportsSection() {
    const navigate=useNavigate();
  const sportsData = [
    {
      name: "Soccer",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
      description: "The world's most popular sport. Fast-paced team action with strategic gameplay and incredible skill displays on the pitch.",
      gradient: "from-emerald-400 to-cyan-500",
      teamSize: "11 players",
      difficulty: 3,
      popularity: "Most Popular",
      equipmentNeeded: "Minimal"
    },
    {
      name: "Basketball",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
      description: "High-flying hoops action with fast breaks and clutch shots. Perfect blend of athleticism, strategy, and teamwork.",
      gradient: "from-orange-400 to-red-500",
      teamSize: "5 players",
      difficulty: 3,
      popularity: "Trending",
      equipmentNeeded: "Minimal"
    },
    {
      name: "Rugby",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
      description: "Ultimate test of strength, speed, and courage. Intense physical combat combined with tactical brilliance and teamwork.",
      gradient: "from-blue-400 to-indigo-600",
      teamSize: "15 players",
      difficulty: 4,
      popularity: "Growing",
      equipmentNeeded: "Moderate"
    },
    {
      name: "Tennis",
      image: "https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=800&q=80",
      description: "Elegant one-on-one competition requiring precision, agility, and mental fortitude. Master your serve and dominate the court.",
      gradient: "from-yellow-400 to-amber-500",
      teamSize: "1-2 players",
      difficulty: 4,
      popularity: "Classic",
      equipmentNeeded: "Basic"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          
          <h1 className="text-5xl md:text-5xl font-black mb-3 leading-14">
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Choose Your
            </span>
            <br />
            <span className="text-white">Sport to Compete</span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Select from our range of exciting sports. Whether you're a seasoned athlete or just starting out, 
            we have tournaments for every skill level and passion.
          </p>
        </motion.div>

        {/* Sports Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
          {sportsData.map((sport, index) => (
            <SportsCard key={sport.name} {...sport} index={index} />
          ))}
        </div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24"
        >
          <h2 className="text-4xl font-black text-center mb-12">
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Why Choose Our Platform?
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                label: "Multiple Sports", 
                value: "4+", 
                icon: Dumbbell, 
                color: "from-blue-400 to-cyan-500",
                description: "Wide variety to choose from"
              },
              { 
                label: "Active Tournaments", 
                value: "15+", 
                icon: Calendar, 
                color: "from-purple-400 to-pink-500",
                description: "Always something to join"
              },
              { 
                label: "Prize Money", 
                value: "$15K+", 
                icon: Award, 
                color: "from-amber-400 to-orange-500",
                description: "Annual prize pool"
              },
              { 
                label: "Registered Teams", 
                value: "68+", 
                icon: Users, 
                color: "from-green-400 to-emerald-500",
                description: "Growing community"
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700/50 text-center relative overflow-hidden group"
              >
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500  mb-4 shadow-lg`}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <p className={`text-5xl font-black bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </p>
                <p className="text-slate-300 text-lg font-bold mb-1">{stat.label}</p>
                <p className="text-slate-500 text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 text-center"
        >
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 border border-slate-700/50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }}></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-4xl font-black text-white mb-4">
                Ready to Compete?
              </h3>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of athletes competing in local tournaments. Register your team today and start your journey to victory!
              </p>
              <motion.button
              onClick={()=>{navigate("/tournaments")}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 cursor-pointer rounded-xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500  text-white font-bold text-lg shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
              >
                Browse All Tournaments
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
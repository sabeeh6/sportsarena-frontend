import { motion as Motion } from "framer-motion";
import {
  LayoutDashboard,
  CalendarDays,
  MapPin,
  DollarSign,
} from "lucide-react";

export default function OrganizerDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent"
      >
        Welcome Back, Organizer
      </Motion.h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "My Events", value: "12", icon: CalendarDays, color: "orange" },
          { label: "Upcoming", value: "4", icon: LayoutDashboard, color: "blue" },
          { label: "Total Grounds", value: "8", icon: MapPin, color: "green" },
          { label: "Revenue", value: "$3,250", icon: DollarSign, color: "purple" },
        ].map((stat, i) => (
          <Motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative p-6 bg-[#1a2235]/80 rounded-2xl shadow-lg border border-orange-500/10 backdrop-blur-md hover:border-orange-500/30 transition-all duration-300 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                <h2 className="text-3xl font-bold text-white mt-2">{stat.value}</h2>
              </div>
              <div className="p-3 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-xl">
                <stat.icon className="text-orange-500 w-8 h-8" />
              </div>
            </div>
          </Motion.div>
        ))}
      </div>

      {/* Recent Activity & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 bg-[#1a2235]/80 rounded-2xl shadow-lg border border-orange-500/10 backdrop-blur-md"
        >
          <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: "Cricket Tournament registered", detail: "Model Town Ground", time: "30 min ago" },
              { action: "Ground booking confirmed", detail: "Lahore Sports Complex", time: "2 hours ago" },
              { action: "Event completed", detail: "Football League Finals", time: "1 day ago" },
            ].map((activity, idx) => (
              <Motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                className="flex items-center gap-3 p-3 bg-[#141b2d]/50 rounded-xl"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center font-bold text-sm">
                  {activity.action.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-gray-400 text-sm">{activity.detail}</p>
                </div>
                <span className="text-gray-500 text-xs">{activity.time}</span>
              </Motion.div>
            ))}
          </div>
        </Motion.div>

        {/* My Grounds Overview */}
        <Motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 bg-[#1a2235]/80 rounded-2xl shadow-lg border border-orange-500/10 backdrop-blur-md"
        >
          <h3 className="text-xl font-bold text-white mb-4">My Grounds</h3>
          <div className="space-y-4">
            {[
              { name: "Model Town Ground", sport: "Cricket", status: "Active" },
              { name: "Lahore Sports Complex", sport: "Football", status: "Active" },
              { name: "DHA Sports Arena", sport: "Basketball", status: "Maintenance" },
            ].map((ground, idx) => (
              <Motion.div
                key={idx}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                className="flex items-center justify-between p-3 bg-[#141b2d]/50 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center font-bold text-sm">
                    {ground.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{ground.name}</p>
                    <p className="text-gray-400 text-sm">{ground.sport}</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    ground.status === "Active"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                  }`}
                >
                  {ground.status}
                </span>
              </Motion.div>
            ))}
          </div>
        </Motion.div>
      </div>
    </div>
  );
}

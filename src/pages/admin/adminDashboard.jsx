import { motion as Motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  BarChart3,
  LogOut,
  Menu,
  Edit,
  Trash2,
  Power,
  PowerOff,
  Search,
  Filter,
  Download,
} from "lucide-react";


export const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <Motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent"
      >
        Welcome Back, Admin 
      </Motion.h1>

      {/* Animated Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Organizors", value: "48", icon: Users, color: "orange" },
          { label: "Total Revenue", value: "$45,890", icon: DollarSign, color: "green" },
          { label: "Active Events", value: "127", icon: BarChart3, color: "blue" },
          { label: "Growth Rate", value: "+23%", icon: LayoutDashboard, color: "purple" },
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
                <h2 className="text-3xl font-bold text-white mt-2">
                  {stat.value}
                </h2>
              </div>
              <div className="p-3 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-xl">
                <stat.icon className="text-orange-500 w-8 h-8" />
              </div>
            </div>
          </Motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 bg-[#1a2235]/80 rounded-2xl shadow-lg border border-orange-500/10 backdrop-blur-md"
        >
          <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { user: "Ahmed Khan", action: "Created new event", time: "2 min ago" },
              { user: "Sara Ali", action: "Updated profile", time: "15 min ago" },
              { user: "Hassan Raza", action: "Completed event", time: "1 hour ago" },
            ].map((activity, idx) => (
              <Motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                className="flex items-center gap-3 p-3 bg-[#141b2d]/50 rounded-xl"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center font-bold text-sm">
                  {activity.user.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.user}</p>
                  <p className="text-gray-400 text-sm">{activity.action}</p>
                </div>
                <span className="text-gray-500 text-xs">{activity.time}</span>
              </Motion.div>
            ))}
          </div>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 bg-[#1a2235]/80 rounded-2xl shadow-lg border border-orange-500/10 backdrop-blur-md"
        >
          <h3 className="text-xl font-bold text-white mb-4">Top Organizors</h3>
          <div className="space-y-4">
            {[
              { name: "Ahmed Khan", events: 12, rating: 4.9 },
              { name: "Fatima Noor", events: 10, rating: 4.8 },
              { name: "Hassan Raza", events: 15, rating: 4.7 },
            ].map((org, idx) => (
              <Motion.div
                key={idx}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                className="flex items-center justify-between p-3 bg-[#141b2d]/50 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center font-bold text-sm">
                    {org.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{org.name}</p>
                    <p className="text-gray-400 text-sm">{org.events} Events</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 font-bold">⭐ {org.rating}</p>
                </div>
              </Motion.div>
            ))}
          </div>
        </Motion.div>
      </div>
    </div>
  );
};

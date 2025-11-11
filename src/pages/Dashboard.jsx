import { useState } from "react";
import { motion as Motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";

export default function DashboardAdmin() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#0a0f1c] to-[#121829] text-white overflow-hidden relative">
      {/* Background Glow */}
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
        className="absolute w-[600px] h-[600px] rounded-full bg-orange-600 blur-[120px] top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      {/* Sidebar */}
      <Motion.aside
        animate={{ width: collapsed ? "80px" : "250px" }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-[#141b2d]/70 backdrop-blur-lg shadow-lg flex flex-col items-center py-6 z-10 border-r border-orange-500/20"
      >
        {/* Logo / Title */}
        <Motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-10 ${
            collapsed ? "hidden" : "block"
          }`}
        >
          Admin Panel
        </Motion.h1>

        {/* Menu Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mb-6 hover:text-orange-400 transition"
        >
          <Menu size={24} />
        </button>

        {/* Navigation Items */}
        <div className="space-y-6 w-full flex flex-col items-center">
          {[
            { icon: LayoutDashboard, label: "Dashboard" },
            { icon: Users, label: "Users" },
            { icon: DollarSign, label: "Revenue" },
            { icon: BarChart3, label: "Analytics" },
            { icon: Settings, label: "Settings" },
          ].map((item, i) => (
            <Motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-3 cursor-pointer text-gray-300 hover:text-orange-400 transition"
            >
              <item.icon />
              {!collapsed && <span>{item.label}</span>}
            </Motion.div>
          ))}

          <div className="mt-10 cursor-pointer text-gray-400 hover:text-red-500 transition">
            <LogOut />
            {!collapsed && <span className="ml-3">Logout</span>}
          </div>
        </div>
      </Motion.aside>

      {/* Main Content */}
      <div className="flex-1 p-10 relative z-10">
        <Motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent"
        >
          Welcome Back, Admin 👋
        </Motion.h1>

        {/* Animated Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {[
            { label: "Total Users", value: "1,245", icon: Users },
            { label: "Revenue", value: "$12,340", icon: DollarSign },
            { label: "Active Sessions", value: "320", icon: BarChart3 },
            { label: "Growth Rate", value: "+14%", icon: LayoutDashboard },
          ].map((stat, i) => (
            <Motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-[#1a2235]/80 rounded-2xl shadow-lg border border-orange-500/10 backdrop-blur-md hover:border-orange-500/30 transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <h2 className="text-2xl font-bold text-white mt-2">
                    {stat.value}
                  </h2>
                </div>
                <stat.icon className="text-orange-500 w-8 h-8" />
              </div>
            </Motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

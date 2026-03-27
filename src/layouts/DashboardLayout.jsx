import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import { logout } from "../utils/auth";

/**
 * DashboardLayout — Shared sidebar layout for Admin & Organizer panels.
 *
 * Props:
 *   panelTitle   – string displayed in the sidebar header (e.g. "Admin Panel")
 *   navItems     – [{ id, path, icon: LucideIcon, label }]
 *   logoutRedirect – path to redirect after logout (default "/login")
 */
export default function DashboardLayout({
  panelTitle = "Dashboard",
  navItems = [],
  logoutRedirect = "/login",
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Determine active page from the current URL
  const getCurrentPage = () => {
    const currentPath = location.pathname;
    const item = navItems.find((n) => n.path === currentPath);
    return item ? item.id : navItems[0]?.id ?? "dashboard";
  };

  const currentPage = getCurrentPage();

  const handleNavigation = (path) => {
    navigate(path);
    setCollapsed(true); // close mobile sidebar after nav
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0a0f1c] via-[#121829] to-[#0f1419] text-white overflow-hidden relative">
      {/* ── Animated Background Blobs ── */}
      <Motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
        className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-orange-600 to-red-600 blur-[150px] top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      />
      <Motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", delay: 1 }}
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-l from-purple-600 to-blue-600 blur-[150px] bottom-1/4 right-1/3 pointer-events-none"
      />

      {/* ── Desktop Sidebar ── */}
      <Motion.aside
        animate={{ width: collapsed ? "80px" : "280px" }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="bg-[#141b2d]/80 backdrop-blur-xl shadow-2xl flex flex-col py-6 z-10 border-r border-orange-500/20 relative hidden md:flex"
      >
        {/* Logo / Title */}
        <div className={`mb-8 flex items-center ${collapsed ? "justify-center px-3" : "justify-between px-6"}`}>
          {!collapsed && (
            <Motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent"
            >
              {panelTitle}
            </Motion.h1>
          )}
          <Motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-orange-500/10 rounded-lg transition flex-shrink-0"
          >
            <Menu className="text-orange-400" size={24} />
          </Motion.button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 space-y-2">
          {navItems.map((item, idx) => (
            <Motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.03, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                currentPage === item.id
                  ? "bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 border border-orange-500/30 shadow-lg shadow-orange-500/20"
                  : "text-gray-400 hover:bg-[#1a2235]/50 hover:text-orange-300"
              }`}
            >
              <item.icon className="flex-shrink-0" size={22} />
              {!collapsed && <span className="font-medium text-sm">{item.label}</span>}
            </Motion.button>
          ))}
        </nav>

        {/* Logout */}
        <Motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => logout(logoutRedirect)}
          className="mx-3 mt-6 flex items-center gap-4 px-4 py-3.5 rounded-xl text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-all duration-300 border border-transparent hover:border-red-500/30"
        >
          <LogOut className="flex-shrink-0" size={22} />
          {!collapsed && <span className="font-medium text-sm">Logout</span>}
        </Motion.button>
      </Motion.aside>

      {/* ── Mobile Sidebar ── */}
      <Motion.aside
        initial={false}
        animate={{ x: collapsed ? "-100%" : "0%" }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="bg-[#141b2d]/95 backdrop-blur-xl shadow-2xl flex flex-col py-6 z-50 border-r border-orange-500/20 fixed left-0 top-0 h-full w-[280px] md:hidden"
      >
        {/* Logo / Title */}
        <div className="mb-8 flex items-center justify-between px-6">
          <Motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent"
          >
            {panelTitle}
          </Motion.h1>
          <Motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-orange-500/10 rounded-lg transition flex-shrink-0"
          >
            <Menu className="text-orange-400" size={24} />
          </Motion.button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 space-y-2">
          {navItems.map((item, idx) => (
            <Motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.03, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                currentPage === item.id
                  ? "bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 border border-orange-500/30 shadow-lg shadow-orange-500/20"
                  : "text-gray-400 hover:bg-[#1a2235]/50 hover:text-orange-300"
              }`}
            >
              <item.icon className="flex-shrink-0" size={22} />
              <span className="font-medium text-sm">{item.label}</span>
            </Motion.button>
          ))}
        </nav>

        {/* Logout */}
        <Motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => logout(logoutRedirect)}
          className="mx-3 mt-6 flex items-center gap-4 px-4 py-3.5 rounded-xl text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-all duration-300 border border-transparent hover:border-red-500/30"
        >
          <LogOut className="flex-shrink-0" size={22} />
          <span className="font-medium text-sm">Logout</span>
        </Motion.button>
      </Motion.aside>

      {/* Mobile Overlay */}
      {!collapsed && (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCollapsed(true)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* ── Main Content Area ── */}
      <div className="flex-1 p-6 lg:p-10 relative z-10 overflow-y-auto">
        {/* Mobile Menu Toggle */}
        {collapsed && (
          <Motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCollapsed(false)}
            className=" top-6 left-6 z-30 p-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30 rounded-xl border border-orange-500/30 shadow-lg shadow-orange-500/20 transition-all duration-300 md:hidden"
          >
            <Menu className="text-orange-400" size={24} />
          </Motion.button>
        )}

        {/* Nested Route Content */}
        <Motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </Motion.div>
      </div>
    </div>
  );
}

import { motion as Motion } from "framer-motion";
import { LayoutDashboard, User } from "lucide-react";

export default function UserDashboard() {
  return (
    <div className="space-y-6">
      <Motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent"
      >
        Welcome Back, User
      </Motion.h1>
      {/* Add stat cards, recent activity, etc. here */}
    </div>
  );
}
import { LayoutDashboard, Users } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";

const adminNavItems = [
  { id: "dashboard", path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "organizors", path: "/admin/organizors", icon: Users, label: "Organizors" },
];

export default function DashboardAdmin() {
  return (
    <DashboardLayout
      panelTitle="Admin Panel"
      navItems={adminNavItems}
      logoutRedirect="/login"
    />
  );
}
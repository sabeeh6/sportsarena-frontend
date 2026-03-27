import { LayoutDashboard, MapPin } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";

const organizerNavItems = [
  { id: "dashboard", path: "/organizer/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "grounds", path: "/organizer/grounds", icon: MapPin, label: "Grounds" },
];

export default function OrganizerPanel() {
  return (
    <DashboardLayout
      panelTitle="Organizer Panel"
      navItems={organizerNavItems}
      logoutRedirect="/login"
    />
  );
}

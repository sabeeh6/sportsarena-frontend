import { useState } from "react";
import { DataTable } from "../../Components/Table.jsx";
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

export const OrganizorsPage = () => {
  const [organizors, setOrganizors] = useState([
    {
      id: 1,
      name: "Ahmed Khan",
      email: "ahmed@example.com",
      phone: "+92 300 1234567",
      events: 12,
      status: "active",
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Sara Ali",
      email: "sara@example.com",
      phone: "+92 321 9876543",
      events: 8,
      status: "active",
      joinDate: "2024-02-20",
    },
    {
      id: 3,
      name: "Hassan Raza",
      email: "hassan@example.com",
      phone: "+92 333 5551234",
      events: 15,
      status: "inactive",
      joinDate: "2023-11-10",
    },
    {
      id: 4,
      name: "Fatima Noor",
      email: "fatima@example.com",
      phone: "+92 345 7778888",
      events: 6,
      status: "active",
      joinDate: "2024-03-05",
    },
  ]);

  const toggleStatus = (id) => {
    setOrganizors((prev) =>
      prev.map((org) =>
        org.id === id
          ? { ...org, status: org.status === "active" ? "inactive" : "active" }
          : org
      )
    );
  };

  const columns = [
    {
      header: "Name",
      accessor: "name",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center font-bold">
            {row.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-white">{row.name}</p>
            <p className="text-xs text-gray-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    { header: "Phone", accessor: "phone" },
    { header: "Events", accessor: "events" },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            row.status === "active"
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-red-500/20 text-red-400 border border-red-500/30"
          }`}
        >
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      ),
    },
    { header: "Join Date", accessor: "joinDate" },
    {
      header: "Actions",
      accessor: "actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleStatus(row.id)}
            className={`p-2 rounded-lg transition ${
              row.status === "active"
                ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
            }`}
          >
            {row.status === "active" ? (
              <PowerOff className="w-4 h-4" />
            ) : (
              <Power className="w-4 h-4" />
            )}
          </Motion.button>
          <Motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition"
          >
            <Edit className="w-4 h-4" />
          </Motion.button>
          <Motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
          >
            <Trash2 className="w-4 h-4" />
          </Motion.button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Organizors Management
          </h1>
          <p className="text-gray-400 mt-1">
            Manage and monitor event organizors
          </p>
        </div>
        <Motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition"
        >
          + Add Organizor
        </Motion.button>
      </Motion.div>

      <DataTable columns={columns} data={organizors} />
    </div>
  );
};
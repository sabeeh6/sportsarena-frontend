import { useState } from "react";
import { motion as Motion } from "framer-motion";
import {
  Edit,
  Trash2,
  Power,
  PowerOff,
  Loader2,
  MapPin,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

/**
 * OrganizerGrounds — Grounds management page for organizers.
 *
 * Uses placeholder data for now. When the backend endpoint is ready,
 * replace the static `groundsData` with an API call (same pattern as
 * the admin OrganizorsPage).
 */
export default function OrganizerGrounds() {
  const [grounds] = useState([
    { _id: "1", name: "Model Town Ground", location: "Model Town, Lahore", sport: "Cricket", capacity: 500, status: "active" },
    { _id: "2", name: "Lahore Sports Complex", location: "Gulberg, Lahore", sport: "Football", capacity: 1200, status: "active" },
    { _id: "3", name: "DHA Sports Arena", location: "DHA Phase 5, Lahore", sport: "Basketball", capacity: 800, status: "inactive" },
  ]);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1f2937",
            color: "#fff",
            border: "1px solid #374151",
          },
          success: { iconTheme: { primary: "#10b981", secondary: "#fff" } },
          error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
        }}
      />

      <div className="space-y-6">
        {/* Header */}
        <Motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              Grounds Management
            </h1>
            <p className="text-gray-400 mt-1 text-sm md:text-base">
              Manage your event grounds and venues
            </p>
          </div>
          <Motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toast.success("Add Ground form coming soon!")}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition w-full md:w-auto"
          >
            + Add Ground
          </Motion.button>
        </Motion.div>

        {/* Grounds Table */}
        {grounds.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
              <MapPin className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No Grounds Found</h3>
            <p className="text-gray-500">Start by adding your first ground</p>
          </div>
        ) : (
          <Motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="overflow-x-auto"
          >
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700/50">
                  {["S.No", "Ground Name", "Location", "Sport", "Capacity", "Status", "Actions"].map(
                    (h) => (
                      <th key={h} className="py-4 px-4 text-gray-400 text-sm font-semibold uppercase tracking-wider">
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {grounds.map((ground, idx) => (
                  <Motion.tr
                    key={ground._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="border-b border-gray-800/50 hover:bg-[#1a2235]/40 transition-colors"
                  >
                    <td className="py-4 px-4 text-gray-400 font-medium">{idx + 1}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center font-bold text-white">
                          {ground.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-white">{ground.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-300">{ground.location}</td>
                    <td className="py-4 px-4 text-gray-300">{ground.sport}</td>
                    <td className="py-4 px-4 text-gray-300">{ground.capacity}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          ground.status === "active"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                        }`}
                      >
                        {ground.status.charAt(0).toUpperCase() + ground.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            toast.success(
                              `${ground.status === "active" ? "Deactivated" : "Activated"} ${ground.name}`
                            )
                          }
                          className={`p-2 rounded-lg transition ${
                            ground.status === "active"
                              ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                              : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                          }`}
                        >
                          {ground.status === "active" ? (
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
                    </td>
                  </Motion.tr>
                ))}
              </tbody>
            </table>
          </Motion.div>
        )}
      </div>
    </>
  );
}

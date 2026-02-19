import { useState } from "react";
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

// ============= REUSABLE TABLE COMPONENT =============
export const DataTable = ({ columns, data, currentPage, totalPages, onPageChange }) => {
  // onEdit, onDelete, onToggleStatus
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-4">
      {/* Table Header Controls */}
      <Motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#1a2235]/50 border border-orange-500/20 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500/50 transition"
          />
        </div>
        {/* <div className="flex gap-2">
          <Motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2.5 bg-[#1a2235]/50 border border-orange-500/20 rounded-xl text-white hover:border-orange-500/50 transition flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filter
          </Motion.button>
          <Motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-orange-500/30 transition flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </Motion.button>
        </div> */}
      </Motion.div>

      {/* Table */}
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative overflow-x-auto bg-[#1a2235]/50 backdrop-blur-md shadow-xl rounded-2xl border border-orange-500/10"
      >
        <table className="w-full text-sm text-left">
          <thead className="text-sm text-gray-300 bg-[#141b2d]/80 border-b border-orange-500/20">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  scope="col"
                  className="px-6 py-4 font-semibold tracking-wide"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-gray-400"
                >
                  No data found
                </td>
              </tr>
            ) : (
              filteredData.map((row, rowIdx) => (
                <Motion.tr
                  key={row.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: rowIdx * 0.05 }}
                  className="bg-[#1a2235]/30 border-b border-orange-500/5 hover:bg-[#1a2235]/60 transition-all duration-300"
                >
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="px-6 py-4 text-gray-200">
                      {col.render ? col.render(row, rowIdx) : row[col.accessor]}
                    </td>
                  ))}
                </Motion.tr>
              ))
            )}
          </tbody>
        </table>
      </Motion.div>

      {/* Table Footer */}
      <div className="flex items-center justify-between text-sm text-gray-400">
        <p>
          Showing {filteredData.length} entries
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1.5 bg-[#1a2235]/50 border border-orange-500/20 rounded-lg hover:border-orange-500/50 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {/* Generate page numbers */}
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => onPageChange(i + 1)}
              className={`px-3 py-1.5 rounded-lg transition ${currentPage === i + 1
                ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                : "bg-[#1a2235]/50 border border-orange-500/20 text-gray-400 hover:border-orange-500/50"
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 bg-[#1a2235]/50 border border-orange-500/20 rounded-lg hover:border-orange-500/50 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
import { useState, useEffect } from "react";
import { DataTable } from "../../Components/Table.jsx";
import { motion as Motion } from "framer-motion";
import {
  Edit,
  Trash2,
  Power,
  PowerOff,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "../../api/api.js";

export const OrganizorsPage = () => {
  const [organizors, setOrganizors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [actionLoading, setActionLoading] = useState(null);
  const navigate = useNavigate();
  const itemsPerPage = 5;

  // Fetch organizers from API
  const fetchOrganizors = async (page = 1) => {
    setLoading(true);
    try {
      const response = await api.get(
        `/admin/get-all-organizor`, {
        params: {
          page,
          limit: itemsPerPage
        }
      }
      );

      const { data } = response;   // backend ka pura object
      console.log("Full Response:", response);
      console.log("Backend Data:", data);

      if (response.status === 200 && data.success) {
        if (data.data) {
          setOrganizors(data.data);
          setTotalPages(data.totalPages || 1);
          if (data.message) {
            toast.success(data.message);
          }
        } else {
          setOrganizors([]);
          toast.info("No organizers found");
        }
      } else {
        toast.error(data.message || "Failed to fetch organizers");
        setOrganizors([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Network error. Please check your connection.");
      setOrganizors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizors(currentPage);
  }, [currentPage]);

  const handleClick = () => {
    navigate("/panel/organizors/add-organizor");
  };

  // Toggle organizer status (active/inactive)
  const toggleStatus = async (id, currentStatus) => {
    setActionLoading(id);
    const endpoint =
      currentStatus === "active"
        ? `/admin/inactivate-organizor/${id}`
        : `/admin/activate-organizor/${id}`;

    try {
      const response = await api.put(endpoint);
      const { data } = response;

      if (response.ok) {
        toast.success(
          data.message || `Organizer ${currentStatus === "active" ? "deactivated" : "activated"} successfully`
        );
        // Refresh the list
        fetchOrganizors(currentPage);
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Status toggle error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  // Navigate to edit page
  const handleEdit = (organizor) => {
    navigate(`/panel/organizors/add-organizor`, { state: { organizor } });
  };

  // Delete organizer
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this organizer?")) {
      return;
    }

    setActionLoading(id);
    try {
      const response = await api.delete(`/admin/${id}`);

      if (response.status === 200) {
        toast.success(response.data.message || "Organizer deleted successfully");
        fetchOrganizors(currentPage);
      } else {
        toast.error(response.data.message || "Failed to delete organizer");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.message || "Network error. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  // Pagination handlers
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const columns = [
    {
      header: "S.No",
      accessor: "index",
      render: (_, index) => (
        <span className="text-gray-400 font-medium">
          {(currentPage - 1) * itemsPerPage + index + 1}
        </span>
      ),
    },
    {
      header: "Name",
      accessor: "name",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center font-bold text-white">
            {row.name?.charAt(0)?.toUpperCase() || "?"}
          </div>
          <div>
            <p className="font-semibold text-white">{row.name || "N/A"}</p>
            <p className="text-xs text-gray-400">{row.email || "N/A"}</p>
          </div>
        </div>
      ),
    },
    { header: "Phone", accessor: "number" },
    { header: "Email", accessor: "email" },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${row.status === "active"
            ? "bg-green-500/20 text-green-400 border border-green-500/30"
            : "bg-red-500/20 text-red-400 border border-red-500/30"
            }`}
        >
          {row.status?.charAt(0)?.toUpperCase() + row.status?.slice(1) || "Unknown"}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleStatus(row.id || row._id, row.status)}
            disabled={actionLoading === (row.id || row._id)}
            className={`p-2 rounded-lg transition ${row.status === "active"
              ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
              : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {actionLoading === (row.id || row._id) ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : row.status === "active" ? (
              <PowerOff className="w-4 h-4" />
            ) : (
              <Power className="w-4 h-4" />
            )}
          </Motion.button>
          <Motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleEdit(row)}
            className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition"
          >
            <Edit className="w-4 h-4" />
          </Motion.button>
          <Motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleDelete(row.id || row._id)}
            disabled={actionLoading === (row.id || row._id)}
            className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {actionLoading === (row.id || row._id) ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </Motion.button>
        </div>
      ),
    },
  ];

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
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
      <div className="space-y-6">
        <Motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              Organizers Management
            </h1>
            <p className="text-gray-400 mt-1 text-sm md:text-base">
              Manage and monitor event organizers
            </p>
          </div>
          <Motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition w-full md:w-auto"
          >
            + Add Organizer
          </Motion.button>
        </Motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
          </div>
        ) : organizors.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
              <svg
                className="w-8 h-8 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No Organizers Found
            </h3>
            <p className="text-gray-500">
              Start by adding your first organizer
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <DataTable
              columns={columns}
              data={organizors}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
};
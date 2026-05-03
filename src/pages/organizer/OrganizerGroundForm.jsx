import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { MapPin, Loader2, ArrowLeft, DollarSign, ListTodo, Type, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import { toast, Toaster } from "react-hot-toast";
import { useEffect } from "react";

export default function OrganizerGroundForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  
  const [formData, setFormData] = useState({
    groundName: "",
    type: "",
    price: "",
    location: "",
    description: "",
    status: "Avaliable",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      const fetchGroundDetail = async () => {
        try {
          const response = await api.get(`/organizor/get-Ground/${id}`);
          if (response.data && response.data.success) {
            const ground = response.data.data;
            setFormData({
              groundName: ground.groundName || "",
              type: ground.type || "",
              price: ground.price || "",
              location: ground.location || "",
              description: ground.description || "",
              status: ground.status || "Avaliable",
            });
          }
        } catch (error) {
          console.error("Error fetching ground details:", error);
          toast.error("Failed to load ground details");
        } finally {
          setFetching(false);
        }
      };
      fetchGroundDetail();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.groundName.trim()) newErrors.groundName = "Ground name is required";
    if (!formData.type) newErrors.type = "Please select a ground type";
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) newErrors.price = "Valid price is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.status) newErrors.status = "Please select a status";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix all errors before submitting", {
        style: { background: "#1a2235", color: "#fff", border: "1px solid #ef4444" },
      });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        groundName: formData.groundName.trim(),
        type: formData.type,
        price: Number(formData.price),
        location: formData.location.trim(),
        description: formData.description.trim(),
        status: formData.status,
      };

      const response = isEditMode 
        ? await api.put(`/organizor/update-Ground/${id}`, payload)
        : await api.post("/organizor/create-Ground", payload);
      
      if (response.data) {
        toast.success(response.data.message || (isEditMode ? "Ground updated successfully!" : "Ground created successfully!"), {
          style: { background: "#1a2235", color: "#fff", border: "1px solid #22c55e" },
          icon: "✅",
        });
        setTimeout(() => navigate(-1), 1500); // Go back after success
      }
    } catch (error) {
      console.error("Error creating ground:", error);
      toast.error(error.response?.data?.message || "Failed to create ground. Please try again.", {
        duration: 5000,
        style: { background: "#1a2235", color: "#fff", border: "1px solid #ef4444" },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    const hasData = Object.values(formData).some((value) => value.toString().trim() !== "");
    if (hasData) {
      const confirmCancel = window.confirm("Are you sure you want to cancel? All unsaved data will be lost.");
      if (confirmCancel) navigate(-1);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] p-6 lg:p-10">
      <Toaster />
      <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-6">
          <Motion.button whileHover={{ x: -4 }} whileTap={{ scale: 0.95 }} onClick={handleCancel} className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition mb-4">
            <ArrowLeft size={20} /> Back to Dashboard
          </Motion.button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent">
            {isEditMode ? "Edit Ground Details" : "Create Your Ground"}
          </h1>
          <p className="text-gray-400 mt-2">
            {isEditMode ? `Updating information for ${formData.groundName}` : "Add a new sports ground to your organizing profile"}
          </p>
        </div>

        {fetching ? (
          <div className="flex flex-col items-center justify-center py-20 bg-gradient-to-br from-[#141b2d] to-[#1a2235] rounded-2xl border border-orange-500/10">
            <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
            <p className="text-gray-400 animate-pulse">Loading ground data...</p>
          </div>
        ) : (
          <Motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.1 }} className="bg-gradient-to-br from-[#141b2d] to-[#1a2235] rounded-2xl shadow-xl border border-orange-500/20 p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Ground Name */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Ground Name *</label>
                <div className="relative">
                  <Type className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <input type="text" name="groundName" value={formData.groundName} onChange={handleChange} placeholder="E.g. National Stadium" disabled={loading} className={`w-full bg-[#0a0f1c]/50 border ${errors.groundName ? "border-red-500" : "border-gray-700/80"} rounded-lg px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition disabled:opacity-50`} />
                </div>
                {errors.groundName && (
                  <Motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm mt-1 flex items-center gap-1"><span>⚠️</span> {errors.groundName}</Motion.p>
                )}
              </div>

              {/* Type (Select) */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Ground Type *</label>
                <div className="relative">
                  <ListTodo className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <select name="type" value={formData.type} onChange={handleChange} disabled={loading} className={`w-full bg-[#0a0f1c]/50 border ${errors.type ? "border-red-500" : "border-gray-700/80"} rounded-lg px-10 py-3 text-white focus:outline-none focus:border-orange-500 transition disabled:opacity-50 appearance-none`}>
                    <option value="" disabled className="bg-[#1a2235] text-gray-500">Select sport type</option>
                    <option value="Crikect" className="bg-[#1a2235] text-white">Crikect</option>
                    <option value="Football" className="bg-[#1a2235] text-white">Football</option>
                    <option value="Tennis" className="bg-[#1a2235] text-white">Tennis</option>
                    <option value="Basketball" className="bg-[#1a2235] text-white">Basketball</option>
                    <option value="Badminton" className="bg-[#1a2235] text-white">Badminton</option>
                  </select>
                </div>
                {errors.type && (
                  <Motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm mt-1 flex items-center gap-1"><span>⚠️</span> {errors.type}</Motion.p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Booking Rate / Price (₨) *</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Enter price" disabled={loading} min="0" className={`w-full bg-[#0a0f1c]/50 border ${errors.price ? "border-red-500" : "border-gray-700/80"} rounded-lg px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition disabled:opacity-50`} />
                </div>
                {errors.price && (
                  <Motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm mt-1 flex items-center gap-1"><span>⚠️</span> {errors.price}</Motion.p>
                )}
              </div>

              {/* Status (Select) */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Ground Status *</label>
                <div className="relative">
                  <ListTodo className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <select name="status" value={formData.status} onChange={handleChange} disabled={loading} className={`w-full bg-[#0a0f1c]/50 border ${errors.status ? "border-red-500" : "border-gray-700/80"} rounded-lg px-10 py-3 text-white focus:outline-none focus:border-orange-500 transition disabled:opacity-50 appearance-none`}>
                    <option value="Avaliable" className="bg-[#1a2235] text-white">Available</option>
                    <option value="Unavaliable" className="bg-[#1a2235] text-white">Unavailable</option>
                    <option value="Booked" className="bg-[#1a2235] text-white">Booked</option>
                  </select>
                </div>
                {errors.status && (
                  <Motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm mt-1 flex items-center gap-1"><span>⚠️</span> {errors.status}</Motion.p>
                )}
              </div>

              {/* Location */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Address / Location *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-500" size={20} />
                  <textarea name="location" value={formData.location} onChange={handleChange} placeholder="Enter complete ground location" rows="2" disabled={loading} className={`w-full bg-[#0a0f1c]/50 border ${errors.location ? "border-red-500" : "border-gray-700/80"} rounded-lg px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition resize-none disabled:opacity-50`} />
                </div>
                {errors.location && (
                  <Motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm mt-1 flex items-center gap-1"><span>⚠️</span> {errors.location}</Motion.p>
                )}
              </div>

              {/* Description */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Rules & Description *</label>
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Give detail about ground timing, rules, and facilities..." rows="4" disabled={loading} className={`w-full bg-[#0a0f1c]/50 border ${errors.description ? "border-red-500" : "border-gray-700/80"} rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition resize-none disabled:opacity-50`} />
                {errors.description && (
                  <Motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm mt-1 flex items-center gap-1"><span>⚠️</span> {errors.description}</Motion.p>
                )}
              </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Motion.button type="button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleCancel} disabled={loading} className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 text-white rounded-lg transition font-medium disabled:opacity-50">
                Cancel
              </Motion.button>
              <Motion.button type="submit" whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }} disabled={loading} className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg shadow-orange-500/20 text-white rounded-lg transition font-medium flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? (
                  <><Loader2 className="animate-spin" size={20} /> {isEditMode ? "Saving..." : "Creating..."}</>
                ) : (
                  <>{isEditMode ? <Save size={20} /> : <MapPin size={20} />} {isEditMode ? "Save Changes" : "Publish Ground"}</>
                )}
              </Motion.button>
            </div>
          </form>
        </Motion.div>
        )}
      </Motion.div>
    </div>
  );
}

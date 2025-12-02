import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Lock, Loader2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function AddOrganizorForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    streetAddress: "",
    state: "",
    zipCode: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Contact validation
    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required";
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.contact)) {
      newErrors.contact = "Please enter a valid contact number";
    }

    // Street Address validation
    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = "Street address is required";
    } else if (formData.streetAddress.trim().length < 10) {
      newErrors.streetAddress = "Please enter a complete street address";
    }

    // State validation
    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    // Zip Code validation
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "Zip code is required";
    } else if (!/^\d{4,6}$/.test(formData.zipCode)) {
      newErrors.zipCode = "Please enter a valid zip code";
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase and number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!validateForm()) {
      toast.error("Please fix all errors before submitting", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#1a2235",
          color: "#fff",
          border: "1px solid #ef4444",
        },
      });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        contact: formData.contact.trim(),
        streetAddress: formData.streetAddress.trim(),
        state: formData.state.trim(),
        zipCode: formData.zipCode.trim(),
        password: formData.password,
        role: "organizor",
      };

      const response = await axios.post(
        "http://localhost:3009/api/admin/add-organizor",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      // Success response
      if (response.data) {
        toast.success(
          response.data.message || "Organizor added successfully!",
          {
            duration: 3000,
            position: "top-right",
            style: {
              background: "#1a2235",
              color: "#fff",
              border: "1px solid #22c55e",
            },
            icon: "✅",
          }
        );

        // Reset form
        setFormData({
          name: "",
          email: "",
          contact: "",
          streetAddress: "",
          state: "",
          zipCode: "",
          password: "",
        });

        // Navigate back after 1.5 seconds
        setTimeout(() => {
          navigate("/panel/organizors");
        }, 1500);
      }
    } catch (error) {
      console.error("Error adding organizor:", error);

      // Handle different types of errors
      if (error.response) {
        // Backend returned an error response
        const backendData = error.response.data;
        
        // Extract error message
        let errorMessage = "Failed to add organizor";
        
        if (typeof backendData === 'string') {
          errorMessage = backendData;
        } else if (backendData?.message) {
          errorMessage = backendData.message;
        } else if (backendData?.error) {
          errorMessage = backendData.error;
        }

        // Show error toast
        toast.error(errorMessage, {
          duration: 5000,
          position: "top-right",
          style: {
            background: "#1a2235",
            color: "#fff",
            border: "1px solid #ef4444",
          },
          icon: "❌",
        });

        // Handle field-specific errors from backend (ZOD validation errors)
        if (backendData?.errors) {
          const fieldErrors = {};
          
          // Check if it's an array (common ZOD format)
          if (Array.isArray(backendData.errors)) {
            backendData.errors.forEach((err) => {
              if (err.path && err.message) {
                const fieldName = Array.isArray(err.path) ? err.path[0] : err.path;
                fieldErrors[fieldName] = err.message;
              }
            });
          } 
          // Check if it's an object
          else if (typeof backendData.errors === 'object') {
            Object.keys(backendData.errors).forEach((key) => {
              const errorValue = backendData.errors[key];
              
              // Handle different error formats
              if (typeof errorValue === 'string') {
                fieldErrors[key] = errorValue;
              } else if (errorValue?.message && typeof errorValue.message === 'string') {
                fieldErrors[key] = errorValue.message;
              } else if (Array.isArray(errorValue) && errorValue.length > 0) {
                fieldErrors[key] = typeof errorValue[0] === 'string' 
                  ? errorValue[0] 
                  : errorValue[0]?.message || 'Invalid value';
              }
            });
          }
          
          // Only set errors if we successfully extracted string messages
          if (Object.keys(fieldErrors).length > 0) {
            setErrors(fieldErrors);
          }
        }
      } else if (error.request) {
        // Request was made but no response
        toast.error("Unable to connect to server. Please check your connection.", {
          duration: 5000,
          position: "top-right",
          style: {
            background: "#1a2235",
            color: "#fff",
            border: "1px solid #ef4444",
          },
          icon: "🔌",
        });
      } else {
        // Something else happened
        toast.error("An unexpected error occurred. Please try again.", {
          duration: 5000,
          position: "top-right",
          style: {
            background: "#1a2235",
            color: "#fff",
            border: "1px solid #ef4444",
          },
          icon: "⚠️",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Check if form has any data
    const hasData = Object.values(formData).some((value) => value.trim() !== "");

    if (hasData) {
      const confirmCancel = window.confirm(
        "Are you sure you want to cancel? All unsaved data will be lost."
      );
      if (confirmCancel) {
        navigate("/panel/organizors");
      }
    } else {
      navigate("/panel/organizors");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] p-6">
      {/* Toast Container */}
      <Toaster />

      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="mb-6">
          <Motion.button
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCancel}
            className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition mb-4"
          >
            <ArrowLeft size={20} />
            Back to Organizors
          </Motion.button>

          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent">
            Add New Organizor
          </h1>
          <p className="text-gray-400 mt-2">
            Fill in the details to add a new event organizor
          </p>
        </div>

        {/* Form Card */}
        <Motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-gradient-to-br from-[#141b2d] to-[#1a2235] rounded-2xl shadow-2xl border border-orange-500/20 p-8"
        >
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={20}
                  />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    disabled={loading}
                    className={`w-full bg-[#0a0f1c]/50 border ${
                      errors.name ? "border-red-500" : "border-gray-700"
                    } rounded-lg px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                </div>
                {errors.name && (
                  <Motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1 flex items-center gap-1"
                  >
                    <span>⚠️</span> {errors.name}
                  </Motion.p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={20}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    disabled={loading}
                    className={`w-full bg-[#0a0f1c]/50 border ${
                      errors.email ? "border-red-500" : "border-gray-700"
                    } rounded-lg px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                </div>
                {errors.email && (
                  <Motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1 flex items-center gap-1"
                  >
                    <span>⚠️</span> {errors.email}
                  </Motion.p>
                )}
              </div>

              {/* Contact */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Contact Number *
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={20}
                  />
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="+92 300 1234567"
                    disabled={loading}
                    className={`w-full bg-[#0a0f1c]/50 border ${
                      errors.contact ? "border-red-500" : "border-gray-700"
                    } rounded-lg px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                </div>
                {errors.contact && (
                  <Motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1 flex items-center gap-1"
                  >
                    <span>⚠️</span> {errors.contact}
                  </Motion.p>
                )}
              </div>

              {/* Street Address */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Street Address *
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-3 text-gray-500"
                    size={20}
                  />
                  <textarea
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    placeholder="Enter complete street address"
                    rows="2"
                    disabled={loading}
                    className={`w-full bg-[#0a0f1c]/50 border ${
                      errors.streetAddress ? "border-red-500" : "border-gray-700"
                    } rounded-lg px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition resize-none disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                </div>
                {errors.streetAddress && (
                  <Motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1 flex items-center gap-1"
                  >
                    <span>⚠️</span> {errors.streetAddress}
                  </Motion.p>
                )}
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                  disabled={loading}
                  className={`w-full bg-[#0a0f1c]/50 border ${
                    errors.state ? "border-red-500" : "border-gray-700"
                  } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                />
                {errors.state && (
                  <Motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1 flex items-center gap-1"
                  >
                    <span>⚠️</span> {errors.state}
                  </Motion.p>
                )}
              </div>

              {/* Zip Code */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Zip Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="Enter zip code"
                  disabled={loading}
                  className={`w-full bg-[#0a0f1c]/50 border ${
                    errors.zipCode ? "border-red-500" : "border-gray-700"
                  } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                />
                {errors.zipCode && (
                  <Motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1 flex items-center gap-1"
                  >
                    <span>⚠️</span> {errors.zipCode}
                  </Motion.p>
                )}
              </div>

              {/* Password */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={20}
                  />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Must contain uppercase, lowercase & number"
                    disabled={loading}
                    className={`w-full bg-[#0a0f1c]/50 border ${
                      errors.password ? "border-red-500" : "border-gray-700"
                    } rounded-lg px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                </div>
                {errors.password && (
                  <Motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1 flex items-center gap-1"
                  >
                    <span>⚠️</span> {errors.password}
                  </Motion.p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCancel}
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gray-700/50 hover:bg-gray-700 text-white rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </Motion.button>
              <Motion.button
                type="submit"
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg transition font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Adding Organizor...
                  </>
                ) : (
                  <>
                    <User size={20} />
                    Add Organizor
                  </>
                )}
              </Motion.button>
            </div>
          </form>
        </Motion.div>
      </Motion.div>
    </div>
  );
}
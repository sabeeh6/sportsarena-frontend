import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { X, User, Mail, Phone, MapPin, Lock, Loader2 } from "lucide-react";

export default function AddOrganizorForm({ onClose, onSuccess }) {
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
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required";
    } else if (!/^\+?[\d\s-]+$/.test(formData.contact)) {
      newErrors.contact = "Invalid contact number";
    }

    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = "Street address is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "Zip code is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        role: "organizor",
      };

      const response = await fetch(
        "http://localhost:3009/api/admin/add-organizor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add organizor");
      }

      console.log("Organizor added successfully:", data);
      
      if (onSuccess) {
        onSuccess(data);
      }

      setFormData({
        name: "",
        email: "",
        contact: "",
        streetAddress: "",
        state: "",
        zipCode: "",
        password: "",
      });

      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Error adding organizor:", error);
      setErrors({ submit: error.message || "Failed to add organizor. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-br from-[#141b2d] to-[#1a2235] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-orange-500/20"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 px-6 py-4 border-b border-orange-500/20 flex items-center justify-between">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent">
            Add New Organizor
          </h2>
          <Motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 hover:bg-orange-500/10 rounded-lg transition text-gray-400 hover:text-orange-400"
          >
            <X size={24} />
          </Motion.button>
        </div>

        {/* Form */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className={`w-full bg-[#0a0f1c]/50 border ${
                    errors.name ? "border-red-500" : "border-gray-700"
                  } rounded-lg px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition`}
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className={`w-full bg-[#0a0f1c]/50 border ${
                    errors.email ? "border-red-500" : "border-gray-700"
                  } rounded-lg px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition`}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contact Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="+92 300 1234567"
                  className={`w-full bg-[#0a0f1c]/50 border ${
                    errors.contact ? "border-red-500" : "border-gray-700"
                  } rounded-lg px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition`}
                />
              </div>
              {errors.contact && (
                <p className="text-red-400 text-sm mt-1">{errors.contact}</p>
              )}
            </div>

            {/* Street Address */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Street Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-500" size={20} />
                <textarea
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  placeholder="Enter street address"
                  rows="2"
                  className={`w-full bg-[#0a0f1c]/50 border ${
                    errors.streetAddress ? "border-red-500" : "border-gray-700"
                  } rounded-lg px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition resize-none`}
                />
              </div>
              {errors.streetAddress && (
                <p className="text-red-400 text-sm mt-1">{errors.streetAddress}</p>
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
                className={`w-full bg-[#0a0f1c]/50 border ${
                  errors.state ? "border-red-500" : "border-gray-700"
                } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition`}
              />
              {errors.state && (
                <p className="text-red-400 text-sm mt-1">{errors.state}</p>
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
                className={`w-full bg-[#0a0f1c]/50 border ${
                  errors.zipCode ? "border-red-500" : "border-gray-700"
                } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition`}
              />
              {errors.zipCode && (
                <p className="text-red-400 text-sm mt-1">{errors.zipCode}</p>
              )}
            </div>

            {/* Password */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password (min 6 characters)"
                  className={`w-full bg-[#0a0f1c]/50 border ${
                    errors.password ? "border-red-500" : "border-gray-700"
                  } rounded-lg px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition`}
                />
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{errors.submit}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-700/50 hover:bg-gray-700 text-white rounded-lg transition font-medium"
            >
              Cancel
            </Motion.button>
            <Motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg transition font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Adding...
                </>
              ) : (
                "Add Organizor"
              )}
            </Motion.button>
          </div>
        </div>
      </Motion.div>
    </div>
  );
}
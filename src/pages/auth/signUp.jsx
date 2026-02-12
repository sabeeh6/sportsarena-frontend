import React, { useEffect, useRef, useState } from 'react';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  MapPin,
  Map,
  Hash,
  Trophy,
  Shield,
  ArrowRight,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';


const API_URL = 'http://localhost:5000/api';

const roles = [
  { value: 'user', label: 'User', icon: User },
  { value: 'company', label: 'Company', icon: Shield },
//   { value: 'admin', label: 'Admin', icon: Trophy }
];

const initialForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'user',
  streetAddress: '',
  state: '',
  zipcode: '',
  acceptedTerms: false
};

  const buttonVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 150, delay: 0.4 }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(239, 68, 68, 0.3)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

const passwordStrength = (pwd) => {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
};

export default function RegistrationPage() {
  const [formData, setFormData] = useState(initialForm);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const nameRef = useRef(null);
  const streetRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentStep === 1 && nameRef.current) nameRef.current.focus();
    if (currentStep === 2 && streetRef.current) streetRef.current.focus();
  }, [currentStep]);

  const validateField = (name, value) => {
    const v = value?.toString?.().trim?.() ?? '';
    switch (name) {
      case 'name':
        if (!v) return 'Name is required';
        if (v.length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!v) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(v)) return 'Invalid email format';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        return '';
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      case 'streetAddress':
        return v ? '' : 'Street address is required';
      case 'state':
        return v ? '' : 'State is required';
      case 'zipcode': {
        if (!v) return 'Zipcode is required';
        const num = Number(v);
        if (!/^\d+$/.test(v)) return 'Zipcode must be numeric';
        if (num < 10000 || num > 999999) return 'Zipcode must be 5-6 digits';
        return '';
      }
      case 'acceptedTerms':
        return value ? '' : 'You must accept the Terms';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((p) => ({ ...p, [name]: newValue }));

    setErrors((prev) => {
      const newErrors = { ...prev };
      const err = validateField(name, newValue);
      if (err) newErrors[name] = err;
      else delete newErrors[name];
      return newErrors;
    });
  };

  const validateStep = (step) => {
    const stepFields = step === 1
      ? ['name', 'email', 'password', 'confirmPassword']
      : ['streetAddress', 'state', 'zipcode', 'acceptedTerms'];

    const newErrors = {};
    for (const f of stepFields) {
      const err = validateField(f, formData[f]);
      if (err) newErrors[f] = err;
    }
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e?.preventDefault?.();
    if (validateStep(1)) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handlePage = ()=>{
    navigate("/login")
  }

  const handleRegister = async (e) => {
    e?.preventDefault?.();
    
    if (!validateStep(2) || !validateStep(1)) return;

    try {
      setSubmitting(true);
      setErrors({});

      const payload = {
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        role: formData.role,
        streetAddress: formData.streetAddress.trim(),
        state: formData.state.trim(),
        zipcode: Number(formData.zipcode),
      };

      const response = await api.post(`/auth/create-user`, {
        // method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
      } else {
        setErrors({ general: data.message || 'Registration failed' });
      }
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
      console.log("Error SignUp" , error);
      
    } finally {
      setSubmitting(false);
    }
  };
  const pwdScore = passwordStrength(formData.password);
  const canContinueStep1 = ['name', 'email', 'password', 'confirmPassword']
    .every((k) => !validateField(k, formData[k]));

  if (success) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Registration Successful! 🎉</h1>
          <p className="text-gray-400 text-lg mb-5 ">Welcome, {formData.name}!</p>
        <Motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                to="/login"
                className="relative bg-gradient-to-r from-red-500 via-orange-500 to-red-500 text-white px-5 xl:px-6 py-2 xl:py-2.5 rounded-lg font-bold text-sm xl:text-base shadow-lg shadow-red-500/30 overflow-hidden group/btn"
              >
                <span className="relative z-10">Sign In </span>
              </Link>
            </Motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-red-600/20 to-purple-600/20"></div>

      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="hidden lg:block space-y-8 sticky top-8">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Join Us</h1>
                <p className="text-gray-400 text-lg mt-1">Create Your Account</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className={`flex items-start space-x-4 p-4 rounded-xl ${currentStep >= 1 ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border-l-4 border-orange-500' : 'bg-white/5'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-gradient-to-br from-orange-500 to-red-600' : 'bg-slate-700'}`}>
                  {currentStep > 1 ? <CheckCircle className="w-6 h-6 text-white" /> : <span className="text-white font-bold">1</span>}
                </div>
                <div>
                  <h4 className="font-bold text-white">Account Details</h4>
                  <p className="text-gray-400 text-sm">Basic information</p>
                </div>
              </div>

              <div className={`flex items-start space-x-4 p-4 rounded-xl ${currentStep >= 2 ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border-l-4 border-orange-500' : 'bg-white/5'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-gradient-to-br from-orange-500 to-red-600' : 'bg-slate-700'}`}>
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-white">Address Information</h4>
                  <p className="text-gray-400 text-sm">Location details</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-black text-white mb-2">
                  {currentStep === 1 ? 'Create Account' : 'Your Address'}
                </h2>
                <p className="text-gray-400 text-lg">
                  {currentStep === 1 ? 'Fill in your details' : 'Location information'}
                </p>
              </div>

              {errors.general && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl">
                  <p className="text-red-400 text-sm">{errors.general}</p>
                </div>
              )}

              <div className="space-y-6">
                {currentStep === 1 && (
                  <>
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          ref={nameRef}
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className={`w-full bg-slate-800/50 border ${errors.name ? 'border-red-500' : 'border-white/10'} text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20`}
                        />
                      </div>
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Email *</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className={`w-full bg-slate-800/50 border ${errors.email ? 'border-red-500' : 'border-white/10'} text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20`}
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-3">Account Type</label>
                      <div className="grid grid-cols-3 gap-3">
                        {roles.map((r) => {
                          const Icon = r.icon;
                          const selected = formData.role === r.value;
                          return (
                            <button
                              key={r.value}
                              onClick={() => setFormData(p => ({ ...p, role: r.value }))}
                              className={`p-4 rounded-xl border-2 ${selected ? 'border-orange-500 bg-orange-500/10' : 'border-white/10 bg-slate-800/30'}`}
                            >
                              <Icon className={`w-6 h-6 mx-auto mb-2 ${selected ? 'text-orange-500' : 'text-gray-400'}`} />
                              <div className={`text-sm font-semibold ${selected ? 'text-orange-500' : 'text-gray-300'}`}>{r.label}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Password *</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="••••••••"
                          className={`w-full bg-slate-800/50 border ${errors.password ? 'border-red-500' : 'border-white/10'} text-white rounded-xl py-4 pl-12 pr-12 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20`}
                        />
                        <button onClick={() => setShowPassword(s => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                      <div className="mt-2">
                        <div className="w-full bg-white/5 rounded-full h-2">
                          <div className={`h-2 rounded-full ${pwdScore >= 3 ? 'bg-green-500' : pwdScore === 2 ? 'bg-yellow-400' : 'bg-red-500'}`} style={{ width: `${(pwdScore / 4) * 100}%` }} />
                        </div>
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Confirm Password *</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          name="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="••••••••"
                          className={`w-full bg-slate-800/50 border ${errors.confirmPassword ? 'border-red-500' : 'border-white/10'} text-white rounded-xl py-4 pl-12 pr-12 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20`}
                        />
                        <button onClick={() => setShowConfirmPassword(s => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>

                    <button
                      onClick={handleNext}
                      disabled={!canContinueStep1}
                      className={`w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-4 rounded-xl ${!canContinueStep1 ? 'opacity-60' : 'hover:scale-105'} transition-all`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <span>Continue</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </button>
                    <p className="text-center text-gray-400 text-lg">
                    Have an account?{' '}
                    <button
                        className="text-orange-500 hover:text-orange-400 font-bold transition-colors cursor-pointer select-none   focus:outline-none "
                        onClick={handlePage}
                        >
                        Sign In to your Account
                    </button>
                </p>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Street Address *</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                        <textarea
                          ref={streetRef}
                          name="streetAddress"
                          value={formData.streetAddress}
                          onChange={handleInputChange}
                          placeholder="123 Main Street"
                          rows="3"
                          className={`w-full bg-slate-800/50 border ${errors.streetAddress ? 'border-red-500' : 'border-white/10'} text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 resize-none`}
                        />
                      </div>
                      {errors.streetAddress && <p className="text-red-500 text-sm mt-1">{errors.streetAddress}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">State *</label>
                      <div className="relative">
                        <Map className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="California"
                          className={`w-full bg-slate-800/50 border ${errors.state ? 'border-red-500' : 'border-white/10'} text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20`}
                        />
                      </div>
                      {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Zipcode *</label>
                      <div className="relative">
                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          name="zipcode"
                          value={formData.zipcode}
                          onChange={handleInputChange}
                          placeholder="10000"
                          className={`w-full bg-slate-800/50 border ${errors.zipcode ? 'border-red-500' : 'border-white/10'} text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20`}
                        />
                      </div>
                      {errors.zipcode && <p className="text-red-500 text-sm mt-1">{errors.zipcode}</p>}
                    </div>

                    <div className="bg-slate-800/30 border border-white/10 rounded-xl p-4">
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          name="acceptedTerms"
                          type="checkbox"
                          checked={formData.acceptedTerms}
                          onChange={handleInputChange}
                          className="w-5 h-5 mt-0.5"
                        />
                        <span className="text-sm text-gray-300">
                          I agree to the Terms of Service
                        </span>
                      </label>
                      {errors.acceptedTerms && <p className="text-red-500 text-sm mt-2">{errors.acceptedTerms}</p>}
                    </div>

                    <div className="flex gap-3">
                      <button onClick={handleBack} className="flex-1 bg-white/5 text-white font-semibold py-3 rounded-xl hover:bg-white/10">
                        Back
                      </button>
                      <button
                        onClick={handleRegister}
                        disabled={submitting}
                        className={`flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 rounded-xl ${submitting ? 'opacity-60' : 'hover:scale-105'} transition-all`}
                      >
                        {submitting ? (
                          <div className="flex items-center justify-center space-x-2">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Registering...</span>
                          </div>
                        ) : 'Register'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

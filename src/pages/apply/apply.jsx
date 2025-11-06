import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from "../../Components/Navbar.jsx";
import Footer from '../../Components/Footer';
export default function TournamentApplicationForm() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    tournamentId: '',
    captainName: '',
    captainEmail: '',
    captainPhone: '',
    teamName: ''
  });

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const response = await fetch('http://localhost:3009/api/all-tournaments');
      const data = await response.json();
      setTournaments(data.data.tournaments);
    } catch (error) {
      console.error('Error fetching tournaments:', error);
      setTournaments([
        { _id: '1', title: 'Summer Championship 2025' },
        { _id: '2', title: 'Winter League Cup' },
        { _id: '3', title: 'Spring Masters Tournament' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.tournamentId) newErrors.tournamentId = 'Please select a tournament';
    if (!formData.captainName.trim()) newErrors.captainName = 'Captain name is required';
    if (!formData.teamName.trim()) newErrors.teamName = 'Team name is required';
    
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!formData.captainEmail.trim()) {
      newErrors.captainEmail = 'Email is required';
    } else if (!emailRegex.test(formData.captainEmail)) {
      newErrors.captainEmail = 'Invalid email format';
    }
    
    const phoneRegex = /^\+?\d{7,15}$/;
    if (!formData.captainPhone.trim()) {
      newErrors.captainPhone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.captainPhone)) {
      newErrors.captainPhone = 'Invalid phone number (7-15 digits)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSubmitting(true);
    
    try {
      const response = await fetch(`http://localhost:3009/api/tournaments/${formData.tournamentId}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          captainName: formData.captainName,
          captainEmail: formData.captainEmail,
          captainPhone: formData.captainPhone,
          teamName: formData.teamName
        })
      });
      
      if (response.ok) {
        setSuccess(true);
        setFormData({
          tournamentId: '',
          captainName: '',
          captainEmail: '',
          captainPhone: '',
          teamName: ''
        });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div>
      <Navbar/>
    <div className="min-h-screen bg-gradient-to-br  pt-38  from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-2xl"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-3xl opacity-20"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full blur-3xl opacity-20"
          />
        </div>

        <motion.div
          variants={itemVariants}
          className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-block bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-2xl p-1 mb-4"
            >
              <div className="bg-slate-900 rounded-xl px-6 py-3">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  Join the Battle
                </h1>
              </div>
            </motion.div>
            <p className="text-gray-300 text-sm">Register your team for glory</p>
          </motion.div>

          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300 text-center"
              >
                🎉 Application submitted successfully!
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-5">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select Tournament *
              </label>
              <div className="relative">
                <select
                  name="tournamentId"
                  value={formData.tournamentId}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all duration-300 appearance-none cursor-pointer disabled:opacity-50"
                >
                  <option value="" className="bg-slate-900">Choose a tournament...</option>
                  {tournaments.map(tournament => (
                    <option key={tournament._id} value={tournament._id} className="bg-slate-900">
                      {tournament.title}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.tournamentId && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-xs mt-1"
                >
                  {errors.tournamentId}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Team Name *
              </label>
              <input
                type="text"
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                placeholder="Enter your team name"
                className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-all duration-300"
              />
              {errors.teamName && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-xs mt-1"
                >
                  {errors.teamName}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
                <span className="text-orange-500 text-sm font-semibold">Captain Details</span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Captain Name *
              </label>
              <input
                type="text"
                name="captainName"
                value={formData.captainName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-all duration-300"
              />
              {errors.captainName && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-xs mt-1"
                >
                  {errors.captainName}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Captain Email *
              </label>
              <input
                type="email"
                name="captainEmail"
                value={formData.captainEmail}
                onChange={handleChange}
                placeholder="captain@team.com"
                className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-all duration-300"
              />
              {errors.captainEmail && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-xs mt-1"
                >
                  {errors.captainEmail}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Captain Phone *
              </label>
              <input
                type="tel"
                name="captainPhone"
                value={formData.captainPhone}
                onChange={handleChange}
                placeholder="+1234567890"
                className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-all duration-300"
              />
              {errors.captainPhone && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-xs mt-1"
                >
                  {errors.captainPhone}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <motion.button
                onClick={handleSubmit}
                disabled={submitting || loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full cursor-pointer bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500"
                  initial={{ x: '100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {submitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Apply Now
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </span>
              </motion.button>
            </motion.div>
          </div>

          <motion.p
            variants={itemVariants}
            className="text-center text-gray-400 text-xs mt-6"
          >
            All fields marked with * are required
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
      <Footer/>
      </div>
  );
}
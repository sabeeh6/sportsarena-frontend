import React from "react";
import { motion as Motion } from "framer-motion";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Header from "../../Components/Header";
import TournamentCard from "../../Components/TournamentCard";
import Footer from "../../Components/Footer";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function Tournament() {
  const { category } = useParams(); // Get category from URL params
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let res;
        
        // If category exists in URL, fetch tournaments by category
        if (category) {
          res = await axios.get(`http://localhost:3009/api/tournaments/${category}`);
        } else {
          // Otherwise, fetch all tournaments
          res = await axios.get("http://localhost:3009/api/all-tournaments");
        }
        
        if (res.data.success) {
          setTournaments(res.data.data.tournaments);
          
          // If no tournaments found for the category
          if (res.data.data.tournaments.length === 0 && category) {
            setError(`No tournaments found for ${category} category`);
          }
        } else {
          setError(res.data.message || "Failed to fetch tournaments");
        }
      } catch (error) {
        console.error("Error fetching tournaments:", error);
        setError("Unable to load tournaments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, [category]); // Re-fetch when category changes

  // Get category display name
  const getCategoryTitle = () => {
    if (!category) return "Upcoming Battles";
    
    const categoryNames = {
      cricket: "Cricket Tournaments",
      soccer: "Soccer Tournaments",
      basketball: "Basketball Tournaments",
      tennis: "Tennis Tournaments"
    };
    
    return categoryNames[category] || `${category} Tournaments`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Navbar />
      <Header
        title={category ? getCategoryTitle() : "Tournaments"}
        description="Step into the arena of champions — where legends are forged, glory is earned, and every match burns with energy."
     button={"ENJOY OUR TOURNAMENTS"} />

      {/* Animated Tournament Section */}
      <Motion.section
        className="py-20 px-6 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Motion.h2
          className="text-center text-3xl md:text-4xl font-bold mb-12 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {getCategoryTitle()}
        </Motion.h2>

        {/* Loading State */}
        {loading && (
          <Motion.div
            className="flex justify-center items-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="relative">
              <div className="w-16 h-16 border-4 border-orange-500/30 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
          </Motion.div>
        )}

        {/* Error State */}
        {error && !loading && (
          <Motion.div
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700">
              <svg
                className="w-20 h-20 mx-auto mb-4 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-2xl font-bold text-gray-300 mb-2">
                {category ? `No ${category} tournaments available` : "No tournaments available"}
              </h3>
              <p className="text-gray-400">{error}</p>
              {category && (
                <Motion.a
                  href="/tournaments"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  View All Tournaments
                </Motion.a>
              )}
            </div>
          </Motion.div>
        )}

        {/* Tournaments Grid */}
        {!loading && !error && tournaments.length > 0 && (
          <Motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {tournaments.map((t, i) => (
              <Motion.div
                key={t._id || i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
              >
                <TournamentCard {...t} />
              </Motion.div>
            ))}
          </Motion.div>
        )}

        {/* Empty State (no error but no tournaments) */}
        {!loading && !error && tournaments.length === 0 && (
          <Motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-400 text-lg">No tournaments available at the moment.</p>
          </Motion.div>
        )}
      </Motion.section>
      
      <Footer />
    </div>
  );
}
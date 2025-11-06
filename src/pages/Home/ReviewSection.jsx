import React, { useState } from "react";
import { motion as Motion , AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, Trophy, Heart } from "lucide-react";

export default function ReviewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "Marcus Johnson",
      role: "Soccer Team Captain",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      rating: 5,
      review: "This platform transformed how we compete! The tournament organization is flawless, and the community is incredibly supportive. We've won 3 championships and made lifelong friends. Highly recommend to any serious athlete!",
      tournament: "Spring Soccer League 2024",
      achievement: "Champions"
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Basketball Player",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      rating: 5,
      review: "Best sports platform I've ever used! The level of competition pushes you to be better every game. Love how easy it is to register and track our team's progress. The prizes are amazing too!",
      tournament: "Winter Basketball Invitational",
      achievement: "Runner-up"
    },
    {
      id: 3,
      name: "David Martinez",
      role: "Rugby Forward",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
      rating: 5,
      review: "Incredible experience from start to finish! The facilities are top-notch, referees are professional, and the competition is fierce. Our team improved dramatically thanks to this league.",
      tournament: "State Rugby Cup 2024",
      achievement: "Semi-Finalist"
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      role: "Tennis Pro",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
      rating: 5,
      review: "As a tennis player, I've competed in many tournaments, but this platform stands out. The organization, court quality, and overall atmosphere are unmatched. Can't wait for the next season!",
      tournament: "Summer Tennis Open 2024",
      achievement: "Champion"
    },
    {
      id: 5,
      name: "James Wilson",
      role: "Soccer Midfielder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
      rating: 5,
      review: "Joining this league was the best decision for our team. The competitive environment and professional setup helped us grow as athletes. The community vibe is fantastic!",
      tournament: "Fall Soccer Championship",
      achievement: "3rd Place"
    }
  ];

  const nextReview = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #ef4444 1px, transparent 1px),
            linear-gradient(to bottom, #ef4444 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Floating Gradient Orbs */}
      <Motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 rounded-full blur-3xl"
      />
      <Motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 rounded-full blur-3xl"
      />

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <Motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 border border-orange-500/30 mb-6 backdrop-blur-md"
          >
            <Heart className="w-5 h-5 text-orange-400" />
            <span className="text-orange-400 font-semibold text-sm tracking-wide">TESTIMONIALS</span>
          </Motion.div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              What Athletes
            </span>
            <br />
            <span className="text-white">Are Saying</span>
          </h2>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Real stories from real athletes who've experienced the thrill of competition on our platform
          </p>
        </Motion.div>

        {/* Main Review Carousel */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="relative">
            <AnimatePresence mode="wait">
              <Motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-700/50 relative overflow-hidden"
              >
                {/* Decorative Quote Icon */}
                <div className="absolute top-8 right-8 opacity-10">
                  <Quote className="w-32 h-32 text-orange-500" />
                </div>

                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    {/* Avatar */}
                    <Motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="relative"
                    >
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-gradient-to-r from-red-500 via-orange-500 to-yellow-500 p-1">
                        <div className="w-full h-full rounded-full overflow-hidden">
                          <img 
                            src={reviews[activeIndex].image} 
                            alt={reviews[activeIndex].name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      {/* Achievement Badge */}
                      <Motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                        className="absolute -bottom-2 -right-2 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full p-2 shadow-lg"
                      >
                        <Trophy className="w-6 h-6 text-white" />
                      </Motion.div>
                    </Motion.div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                      {/* Stars */}
                      <div className="flex gap-1 justify-center md:justify-start mb-4">
                        {[...Array(reviews[activeIndex].rating)].map((_, i) => (
                          <Motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.1 * i, type: "spring", stiffness: 200 }}
                          >
                            <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                          </Motion.div>
                        ))}
                      </div>

                      {/* Review Text */}
                      <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-6 italic">
                        "{reviews[activeIndex].review}"
                      </p>

                      {/* Author Info */}
                      <div className="mb-4">
                        <h4 className="text-2xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-1">
                          {reviews[activeIndex].name}
                        </h4>
                        <p className="text-slate-400 text-sm font-medium">
                          {reviews[activeIndex].role}
                        </p>
                      </div>

                      {/* Tournament Info */}
                      <div className="inline-flex flex-col md:flex-row gap-3">
                        <div className="px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
                          <p className="text-slate-400 text-xs mb-1">Tournament</p>
                          <p className="text-slate-200 text-sm font-semibold">
                            {reviews[activeIndex].tournament}
                          </p>
                        </div>
                        <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 border border-orange-500/30">
                          <p className="text-orange-400 text-xs mb-1">Achievement</p>
                          <p className="text-orange-300 text-sm font-bold">
                            {reviews[activeIndex].achievement}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gradient Border Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>
              </Motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <Motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevReview}
                className="p-4 rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6" />
              </Motion.button>
              <Motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextReview}
                className="p-4 rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6" />
              </Motion.button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'w-8 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500' 
                      : 'w-2 bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
        >
          {[
            { label: "Happy Athletes", value: "500+" },
            { label: "5-Star Reviews", value: "98%" },
            { label: "Tournaments Hosted", value: "50+" },
            { label: "Success Stories", value: "200+" }
          ].map((stat, index) => (
            <Motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700/50 text-center relative overflow-hidden group"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-orange-500/0 to-yellow-500/0 group-hover:from-red-500/10 group-hover:via-orange-500/10 group-hover:to-yellow-500/10 transition-all duration-500"></div>
              
              <p className="text-4xl md:text-5xl font-black bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-2 relative z-10">
                {stat.value}
              </p>
              <p className="text-slate-400 text-sm font-medium relative z-10">{stat.label}</p>
            </Motion.div>
          ))}
        </Motion.div>
      </div>
    </div>
  );
}
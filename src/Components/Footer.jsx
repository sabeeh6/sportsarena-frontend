import React, { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  const currentYear = new Date().getFullYear();

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const footerLinks = {
    company: [
      { name: "About Us", to: "/about" },
      { name: "Our Team", to: "/team" },
      { name: "Careers", to: "/careers" },
      { name: "Contact", to: "/contact" },
      { name: "Privacy Policy", to: "/policy" },
    ],
    products: [
      { name: "Our Gear", to: "/gear" },
      { name: "Our Leagues", to: "/leagues" },
      { name: "Events", to: "/events" },
      { name: "Membership", to: "/membership" },
    ],
    support: [
      { name: "Help Center", to: "/help" },
      { name: "Terms of Service", to: "/terms" },
      { name: "Privacy Policy", to: "/privacy" },
      { name: "FAQs", to: "/faqs" },
    ],
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      to: "#",
    },
    {
      name: "Twitter",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      to: "#",
    },
    {
      name: "Instagram",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
        </svg>
      ),
      to: "#",
    },
    {
      name: "YouTube",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      to: "#",
    },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const socialVariants = {
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: { duration: 0.4 },
    },
    tap: { scale: 0.9 },
  };

  return (
    <Motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="relative w-full flex justify-center px-2 sm:px-4 py-6 sm:py-8 bg-gradient-to-b from-gray-950 to-black"
    >
      <Motion.div
        className="relative w-full sm:w-[95%] md:w-[90%] max-w-7xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
                   backdrop-blur-xl shadow-2xl border-2 border-orange-500/20
                   px-4 sm:px-6 md:px-10 py-8 sm:py-10 md:py-12
                   transition-all duration-500 overflow-hidden group"
        style={{
          clipPath: isMobile 
            ? "none" 
            : "polygon(30px 0%, 100% 0%, calc(100% - 30px) 100%, 0% 100%)",
        }}
      >
        {/* Animated background gradient */}
        <Motion.div
          className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-orange-600/10 to-yellow-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Curve highlight effect - Hidden on mobile */}
        {!isMobile && (
          <>
            <div
              className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-orange-500/20 to-transparent pointer-events-none"
              style={{ clipPath: "polygon(0% 0%, 100% 0%, 0% 100%)" }}
            />
            <div
              className="absolute bottom-0 right-0 w-32 h-full bg-gradient-to-l from-red-500/20 to-transparent pointer-events-none"
              style={{ clipPath: "polygon(100% 0%, 100% 100%, 0% 100%)" }}
            />
          </>
        )}

        {/* Footer Content */}
        <div className="relative z-10">
          {/* Top Section - Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8 md:mb-12">
            {/* Company Info */}
            <Motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                Sports Arena
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Your ultimate destination for sports gear, leagues, and events. Join the arena today!
              </p>
            </Motion.div>

            {/* Company Links */}
            <Motion.div variants={itemVariants} className="space-y-4">
              <h4 className="text-white font-bold text-lg">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.to}
                      className="text-gray-400 hover:text-orange-500 transition-colors duration-300 text-sm md:text-base block hover:translate-x-1 transition-transform"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Motion.div>

            {/* Products Links */}
            <Motion.div variants={itemVariants} className="space-y-4">
              <h4 className="text-white font-bold text-lg">Products</h4>
              <ul className="space-y-2">
                {footerLinks.products.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.to}
                      className="text-gray-400 hover:text-orange-500 transition-colors duration-300 text-sm md:text-base block hover:translate-x-1 transition-transform"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Motion.div>

            {/* Support Links */}
            <Motion.div variants={itemVariants} className="space-y-4">
              <h4 className="text-white font-bold text-lg">Support</h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.to}
                      className="text-gray-400 hover:text-orange-500 transition-colors duration-300 text-sm md:text-base block hover:translate-x-1 transition-transform"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Motion.div>
          </div>

          {/* Divider */}
          <Motion.div
            variants={itemVariants}
            className="h-[2px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent mb-8"
          />

          {/* Bottom Section */}
          <Motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-between items-center gap-6"
          >
            {/* Copyright */}
            <p className="text-gray-400 text-sm md:text-base text-center md:text-left">
              © {currentYear} Sports Arena. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Motion.a
                  key={social.name}
                  href={social.to}
                  variants={socialVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 
                           backdrop-blur-sm border border-orange-500/30 hover:border-orange-500
                           flex items-center justify-center text-gray-400 hover:text-white
                           transition-all duration-300 shadow-lg shadow-orange-500/20"
                  aria-label={social.name}
                >
                  {social.icon}
                </Motion.a>
              ))}
            </div>
          </Motion.div>
        </div>
      </Motion.div>
    </Motion.footer>
  );
}
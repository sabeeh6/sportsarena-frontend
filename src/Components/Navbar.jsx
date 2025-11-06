import React, { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection for dynamic styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Tournaments", to: "/tournaments" },
    { name: "Apply", to: "/apply" },
  ];

  // Framer Motion Variants
  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.6, 0.05, 0.01, 0.9],
        staggerChildren: 0.1
      }
    }
  };

  const logoVariants = {
    initial: { scale: 0, rotate: -180, opacity: 0 },
    animate: { 
      scale: 1, 
      rotate: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 15,
        delay: 0.2
      }
    },
    hover: {
      scale: 1.1,
      rotate: [0, -10, 10, -10, 0],
      transition: { duration: 0.5 }
    }
  };

  const navItemVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    },
    hover: {
      scale: 1.1,
      color: "#ef4444",
      transition: { duration: 0.2 }
    }
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

  const mobileMenuVariants = {
    initial: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.3 }
    },
    animate: { 
      opacity: 1, 
      height: "auto",
      transition: { 
        duration: 0.4,
        ease: "easeInOut",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.3 }
    }
  };

  const mobileItemVariants = {
    initial: { x: -50, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <>
      <Motion.header
        variants={headerVariants}
        initial="initial"
        animate="animate"
        className="fixed top-0 left-0 w-full z-50 flex justify-center px-2 sm:px-4"
      >
        <Motion.div
          animate={{
            y: scrolled ? -5 : 0,
            scale: scrolled ? 0.98 : 1,
          }}
          transition={{ duration: 0.3 }}
          className={`relative w-full sm:w-[95%] md:w-[90%] max-w-7xl mt-2 sm:mt-3 
                     ${scrolled ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-r from-slate-900/95 via-gray-800/95 to-slate-900/95'} 
                     backdrop-blur-xl shadow-2xl border-2 ${scrolled ? 'border-red-500/30' : 'border-orange-500/20'}
                     flex items-center justify-between px-3 sm:px-6 md:px-10 py-2 sm:py-3 md:py-4 
                     transition-all duration-500 overflow-hidden group`}
          style={{
            clipPath: "polygon(0% 0%, calc(100% - 30px) 0%, 100% 100%, 30px 100%)",
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
              ease: "linear"
            }}
          />

          {/* Curve highlight effect */}
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-red-500/20 to-transparent pointer-events-none" 
               style={{ clipPath: "polygon(100% 0%, 100% 100%, 0% 100%)" }} />
          <div className="absolute bottom-0 left-0 w-32 h-full bg-gradient-to-r from-orange-500/20 to-transparent pointer-events-none" 
               style={{ clipPath: "polygon(0% 0%, 100% 0%, 0% 100%)" }} />

          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3 z-10 relative">
            <Motion.img
              src={logo}
              alt="Logo"
              variants={logoVariants}
              whileHover="hover"
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain cursor-pointer rounded-full border-2 border-orange-500/50 shadow-lg shadow-orange-500/30"
            />
            <Motion.span 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="hidden sm:block text-lg md:text-2xl font-extrabold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent tracking-wide drop-shadow-lg"
            >
              Sports Arena
            </Motion.span>
          </div>

          {/* Desktop Navigation */}
          <Motion.nav 
            className="hidden lg:flex items-center gap-4 xl:gap-8 z-10 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {navLinks.map((link, index) => (
              <Motion.div
                key={link.name}
                variants={navItemVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                custom={index}
              >
                <Link
                  to={link.to}
                  className="relative text-white/90 font-semibold text-sm xl:text-base hover:text-white transition-all duration-300 group/link"
                >
                  {link.name}
                  <Motion.span
                    className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-red-500 to-orange-500 group-hover/link:w-full transition-all duration-300"
                  />
                </Link>
              </Motion.div>
            ))}
          </Motion.nav>

          {/* Desktop Login Button */}
          <Motion.div 
            className="hidden lg:flex items-center gap-3 z-10 relative"
            variants={buttonVariants}
            initial="initial"
            animate="animate"
          >
            <Motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                to="/apply"
                className="relative bg-gradient-to-r from-red-500 via-orange-500 to-red-500 text-white px-5 xl:px-6 py-2 xl:py-2.5 rounded-lg font-bold text-sm xl:text-base shadow-lg shadow-red-500/30 overflow-hidden group/btn"
              >

                <span className="relative z-10">Apply</span>
              </Link>
            </Motion.div>
          </Motion.div>

          {/* Mobile Menu Button */}
          <Motion.div 
            className="lg:hidden z-50 relative"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
          >
            <Motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-white bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-orange-500/30 hover:border-orange-500 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Motion.div
                animate={{ rotate: menuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {menuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </Motion.div>
            </Motion.button>
          </Motion.div>
        </Motion.div>
      </Motion.header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <Motion.div
            variants={mobileMenuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed top-[70px] sm:top-[80px] left-0 w-full z-40 lg:hidden"
          >
            <Motion.div 
              className="mx-2 sm:mx-4 bg-gradient-to-br from-gray-900/98 via-gray-800/98 to-gray-900/98 backdrop-blur-xl border-2 border-orange-500/30 rounded-2xl shadow-2xl overflow-hidden"
              style={{
                clipPath: "polygon(0% 0%, calc(100% - 20px) 0%, 100% 100%, 20px 100%)",
              }}
            >
              <div className="p-4 sm:p-6 space-y-3">
                {navLinks.map((link, index) => (
                  <Motion.div
                    key={link.name}
                    variants={mobileItemVariants}
                    custom={index}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setMenuOpen(false)}
                      className="block text-white/90 text-base sm:text-lg font-semibold hover:text-white py-2 px-4 rounded-lg hover:bg-gradient-to-r hover:from-red-500/20 hover:to-orange-500/20 transition-all duration-300 border-l-4 border-transparent hover:border-orange-500"
                    >
                      {link.name}
                    </Link>
                  </Motion.div>
                ))}
                
                <Motion.div
                  variants={mobileItemVariants}
                  className="pt-4 border-t border-orange-500/20"
                >
                  <Link
                    to="/apply"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full bg-gradient-to-r from-red-500 via-orange-500 to-red-500 text-white text-center px-4 py-3 rounded-xl font-bold text-base sm:text-lg shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300"
                  >
                    Apply
                  </Link>
                </Motion.div>
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* Overlay when menu is open */}
      <AnimatePresence>
        {menuOpen && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}


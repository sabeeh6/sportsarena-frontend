import { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
const images = [
  "/assets/Her-section1.jpg",
  "/assets/Lucid_Origin_A_cinematic_basketball_scene_inside_a_packed_indo_0.jpg",
  "/assets/Lucid_Origin_A_cinematic_soccer_scene_in_a_massive_outdoor_sta_0.jpg",
];


const HeroSection = () => {
  const navigate=useNavigate();
  const [current, setCurrent] = useState(0);
  const length = images.length;

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  // Animation variants
  const fadeVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative w-full h-[100vh] overflow-hidden ">
      <AnimatePresence>
        <Motion.img
          key={current}
          src={images[current]}
          alt={`Slide ${current}`}
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Overlay Text */}
      <div className="absolute  inset-0 bg-black/40 flex  flex-col sm:items-center md:items-start sm:px-8 lg:px-22 md:px-4  justify-center text-white text-center">
        <Motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-7xl font-bold mb-4 w-full md:w-[60%] text-center md:text-left md:mt-24 sm:mt-0  "
        >
          Sports, Reimagined for Champions
        </Motion.h1>
        <Motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-xl mb-8 flex justify-center sm:text-center md:text-left"
        >
          The Battle for Glory Begins Here
        </Motion.p>

        <Motion.button
        onClick={()=>navigate('/tournaments')}
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 0px 20px rgba(255,255,255,0.8)",
          }}
          whileTap={{ scale: 0.9 }}
          className="max-w-[50%]  self-center md:self-start  border-2 border-orange-600 bg-transparent text-orange-600 font-semibold py-3 px-8 rounded-full text-lg"
        >
          Explore More
        </Motion.button>
      </div>

      {/* Manual Controls */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-6 transform -translate-y-1/2 text-white text-4xl hover:text-yellow-400 z-10"
      >
        {/* ❮ */}
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-6 transform -translate-y-1/2 text-white text-4xl hover:text-yellow-400 z-10"
      >
        {/* ❯ */}
      </button>

      {/* Dots Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index) }
            className={`w-2 h-2 rounded-full ${
              index === current ? "bg-orange-500" : "bg-white"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;

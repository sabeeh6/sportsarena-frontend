// src/utils/analytics.js
import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
let isInitialized = false; // Prevent multiple initializations

// ============================================
// INITIALIZE GA (Only once)
// ============================================
export const initGA = () => {
  // Check if already initialized
  if (isInitialized) {
    console.warn("⚠️ GA already initialized");
    return true;
  }

  // Check consent
  const consent = localStorage.getItem("userConsent");
  if (consent !== "accepted") {
    console.log("🚫 GA blocked - No consent");
    return false;
  }

  // Check GA ID
  if (!GA_MEASUREMENT_ID) {
    console.error("❌ GA Measurement ID missing");
    return false;
  }

  try {
    ReactGA.initialize(GA_MEASUREMENT_ID, {
      gaOptions: {
        send_page_view: false, // Manual page view tracking
        anonymize_ip: true, // GDPR compliance
      },
      gtagOptions: {
        cookie_flags: 'SameSite=None;Secure',
      },
    });

    isInitialized = true;
    console.log("✅ Google Analytics initialized successfully");
    return true;
  } catch (error) {
    console.error("❌ GA initialization failed:", error);
    return false;
  }
};

// ============================================
// TRACK PAGE VIEWS
// ============================================
export const trackPageView = (path, title) => {
  // Only track if initialized and consent given
  if (!isInitialized) {
    console.log("🚫 Page view not tracked - GA not initialized");
    return;
  }

  const consent = localStorage.getItem("userConsent");
  if (consent !== "accepted") {
    console.log("🚫 Page view not tracked - No consent");
    return;
  }

  try {
    ReactGA.send({
      hitType: 'pageview',
      page: path,
      title: title || document.title,
    });
    console.log("📊 Page view tracked:", path);
  } catch (error) {
    console.error("❌ Page view tracking failed:", error);
  }
};

// ============================================
// TRACK EVENTS
// ============================================
export const trackEvent = (category, action, label = '', value = 0) => {
  if (!isInitialized) {
    console.log("🚫 Event not tracked - GA not initialized");
    return;
  }

  const consent = localStorage.getItem("userConsent");
  if (consent !== "accepted") {
    console.log("🚫 Event not tracked - No consent");
    return;
  }

  try {
    ReactGA.event({
      category,
      action,
      label,
      value,
    });
    console.log("📊 Event tracked:", { category, action, label });
  } catch (error) {
    console.error("❌ Event tracking failed:", error);
  }
};

// ============================================
// RESET GA (For consent withdrawal)
// ============================================
export const resetGA = () => {
  isInitialized = false;
  console.log("🔄 GA reset");
};
// Track Button Clicks
export const trackButtonClick = (buttonName, location) => {
  trackEvent('Button', 'Click', `${buttonName} - ${location}`);
};
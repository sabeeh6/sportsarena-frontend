import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Home/Home.jsx";
import Tournament from "./pages/Tournaments/Tournament.jsx";
import TournamentApplicationForm from "./pages/apply/apply.jsx";
import PrivacyPolicyPage from "./pages/privacypolicy.jsx";
import { initGA, trackPageView } from "./utils/analytics";
import CookieBanner from "./pages/Home/cookieConsent.jsx";
import NotFound from "./pages/notFound.jsx";
import AdminAuth from "./pages/auth/AdminAuth.jsx";
import ScrollToTop from "./Components/scroll.jsx";
import Login from "./pages/auth/login.jsx";
import RegistrationPage from "./pages/auth/signUp.jsx";
import DashboardAdmin from "./pages/admin/adminpanel.jsx";
// import { DashboardAdmin } from "./pages/admin/adminPanel.jsx";

function App() {
  const location = useLocation();
  const [gaInitialized, setGaInitialized] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  // ============================================
  // CHECK EXISTING CONSENT ON APP MOUNT
  // ============================================
  useEffect(() => {
    const checkConsent = async () => {
      const localConsent = localStorage.getItem("userConsent");
      
      if (localConsent === "accepted") {
        // Initialize GA only once
        if (!gaInitialized) {
          const initialized = initGA();
          if (initialized) {
            setGaInitialized(true);
            console.log("✅ GA initialized from existing consent");
          }
        }
      }
      
      setConsentChecked(true);
    };

    checkConsent();
  }, [gaInitialized]);

  // ============================================
  // TRACK PAGE VIEWS ON ROUTE CHANGE
  // ============================================
  useEffect(() => {
    // Only track if GA is initialized and consent is given
    if (gaInitialized && consentChecked) {
      trackPageView(location.pathname + location.search);
      console.log("📊 Page view tracked:", location.pathname);
    }
  }, [location, gaInitialized, consentChecked]);

  // ============================================
  // HANDLE CONSENT ACCEPTANCE
  // ============================================
  const handleConsentAccept = () => {
    localStorage.setItem("userConsent", "accepted");
    
    // Initialize GA after consent
    if (!gaInitialized) {
      const initialized = initGA();
      if (initialized) {
        setGaInitialized(true);
        console.log("✅ GA initialized after consent");
        
        // Track current page immediately after initialization
        trackPageView(location.pathname + location.search);
      }
    }
  };

  return (
    <>
      {/* Cookie Consent Banner */}
      <ScrollToTop/>
      <CookieBanner onAccept={handleConsentAccept} />

      <Routes>
        <Route path="/apply" element={<TournamentApplicationForm />} />
        <Route path="/tournaments" element={<Tournament />} />
        <Route path="/tournaments/:category" element={<Tournament />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/policy" element={<PrivacyPolicyPage />} />
        <Route path ="/auth" element={<AdminAuth/>}/>
        <Route path ="/panel" element={<DashboardAdmin/>}/>
        <Route path="*" element={<NotFound/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<RegistrationPage />} />

      </Routes>
    </>
  );
}

export default App;
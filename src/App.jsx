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
import AddOrganizorForm from "./pages/admin/organizorForm.jsx";
import { DashboardPage } from "./pages/admin/adminDashboard.jsx";
import { OrganizorsPage } from "./pages/admin/organizor.jsx";
import { PrivateRoute } from "./components/PrivateRoute.jsx";
import { PublicOnlyRoute } from "./components/PublicOnlyRoute.jsx";
import AboutPage from "./pages/Home/about.jsx";
import ContactUs from "./pages/Home/contact.jsx";

function App() {
  const location = useLocation();
  const [gaInitialized, setGaInitialized] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  useEffect(() => {
    const checkConsent = async () => {
      const localConsent = localStorage.getItem("userConsent");
      
      if (localConsent === "accepted") {
        if (!gaInitialized) {
          const initialized = initGA();
          if (initialized) {
            setGaInitialized(true);
          }
        }
      }
      
      setConsentChecked(true);
    };

    checkConsent();
  }, [gaInitialized]);

  useEffect(() => {
    if (gaInitialized && consentChecked) {
      trackPageView(location.pathname + location.search);
    }
  }, [location, gaInitialized, consentChecked]);

  const handleConsentAccept = () => {
    localStorage.setItem("userConsent", "accepted");
    
    if (!gaInitialized) {
      const initialized = initGA();
      if (initialized) {
        setGaInitialized(true);
        trackPageView(location.pathname + location.search);
      }
    }
  };

  return (
    <>
      <ScrollToTop />
      <CookieBanner onAccept={handleConsentAccept} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/apply" element={<TournamentApplicationForm />} />
        <Route path="/tournaments" element={<Tournament />} />
        <Route path="/about" element={<AboutPage />} />
        // <Route path="/contact" element={<ContactUs />} />
        <Route path="/tournaments/:category" element={<Tournament />} />
        <Route path="/policy" element={<PrivacyPolicyPage />} />
        
        {/* Auth Routes (redirect to dashboard if already logged in) */}
        <Route path="/auth" element={<PublicOnlyRoute><AdminAuth /></PublicOnlyRoute>} />
        <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
        <Route path="/signUp" element={<PublicOnlyRoute><RegistrationPage /></PublicOnlyRoute>} />

        {/* Protected Admin Routes */}
        <Route 
          path="/panel" 
          element={
            <PrivateRoute requiredRole="admin">
              <DashboardAdmin />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="organizors">
            <Route index element={<OrganizorsPage />} />
            <Route path="add-organizor" element={<AddOrganizorForm />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
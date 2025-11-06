import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Home/Home.jsx";
import Tournament from "./pages/Tournaments/Tournament.jsx";
import TournamentApplicationForm from "./pages/apply/apply.jsx";
import PrivacyPolicyPage from "./pages/privacypolicy.jsx";
// import {  PrivacyPolicyPage } from "./pages/privacypolicy.jsx"
// import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/apply" element={<TournamentApplicationForm />} />
      <Route path="/tournaments" element={<Tournament />} />
      <Route path="/tournaments/:category" element={<Tournament />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/policy" element={<PrivacyPolicyPage />} />
    </Routes>
  );
}

export default App;

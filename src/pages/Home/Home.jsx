import Navbar from "../../Components/Navbar.jsx";
import Footer from "../../Components/Footer.jsx";
import AnimatedImageWithText from "../../Components/Header.jsx";
import HeroSection from "./HeroSection.jsx";
import SportsSection from "./SportsSection.jsx";
import ReviewsSection from "./ReviewSection.jsx";
import CookieConsent from "./cookieConsent.jsx";

export default function Dashboard() {
 

  return (
    <>
    <Navbar/>
    <HeroSection/>
    <div >
      <SportsSection/>
    </div>
    <ReviewsSection/>
    <Footer/>
    <CookieConsent/>
        </>
  );
}

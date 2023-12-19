import FeedbackGrid from "../../components/feedback/FeedbackGrid";
import RestaurantGrid from "../../components/restaurant/RestaurantGrid";
import Footer from "../../components/reusables/Footer";
import Navbar from "../../components/reusables/Navbar";
import Header from "../../components/welcomer/header";
const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Header />
      <RestaurantGrid />
      <FeedbackGrid />
      <Footer />
    </>
  );
};

export default LandingPage;

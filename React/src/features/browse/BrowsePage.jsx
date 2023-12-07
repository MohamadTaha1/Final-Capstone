import RestaurantGrid from "../../components/restaurant/RestaurantGrid";
import Footer from "../../components/reusables/Footer";
import Navbar from "../../components/reusables/Navbar";
import Header from "../../components/welcomer/header";
const BrowsePage = () => {
  return (
    <>
      <Navbar />
      <Header />
      <RestaurantGrid />
      <Footer/>
    </>
  );
};

export default BrowsePage;

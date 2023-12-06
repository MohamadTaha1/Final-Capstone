import Footer from "../../components/reusables/Footer";
import Navbar from "../../components/reusables/Navbar";
import NavbarLoggedOut from "../../components/reusables/NavbarLoggedOut";
import RestaurantDetails from "../../components/RestaurantDetails";
import { useState, useEffect } from "react";


const RestaurantDisplay = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Sets to true if token exists, false otherwise
  }, []);
  return (
    <>
      {isLoggedIn ? <Navbar /> : <NavbarLoggedOut />}
      <RestaurantDetails />
      <Footer />
    </>
  );
};


export default RestaurantDisplay;

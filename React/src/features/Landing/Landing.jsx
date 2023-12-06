import Footer from "../../components/reusables/Footer";
import Navbar from "../../components/reusables/Navbar";
import NavbarLoggedOut from "../../components/reusables/NavbarLoggedOut";
import RestaurantGrid from "../../components/RestaurantGrid";
import { useState, useEffect } from "react";

const Landing = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Sets to true if token exists, false otherwise
  }, []);
  return (
    <>
      {isLoggedIn ? <Navbar /> : <NavbarLoggedOut />}
      <RestaurantGrid />
      <Footer />
    </>
  );
};

export default Landing;

import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";



const NavbarLoggedOut = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login"); // Redirect to login page after logout
  };


  return (
    <nav className="bg-white fixed w-full z-10 top-0 shadow-md">
      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center">
            <span className="font-edu-tas px-1 text-2xl tracking-tight text-primary">
              Maida
            </span>
          </a>
          {/* Burger icon for mobile */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <AiOutlineClose className="h-6 w-6" />
              ) : (
                <AiOutlineMenu className="h-6 w-6" />
              )}
            </button>
          </div>
          {/* Full width menu - shown when burger icon is clicked */}
          <div
            className={`absolute top-16 left-0 w-full bg-white shadow-md md:shadow-none md:relative md:top-0 md:bg-transparent ${
              isMenuOpen ? "block" : "hidden"
            } md:flex md:items-center`}
          >
            {/* Navigation Links */}
            <div className="px-8 py-2 md:flex md:space-x-4">
              <a
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-gray-900 group transition duration-300"
              >
                Home
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-gray-900 hover:bg-gray-50 md:hover:bg-transparent"
              >
                Browse
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-gray-900 hover:bg-gray-50 md:hover:bg-transparent"
              >
                Orders
              </a>
              <a
                href="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-gray-900 hover:bg-gray-50 md:hover:bg-transparent"
              >
                Profile
              </a>
              <a href="/checkout" className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-gray-900 hover:bg-gray-50 md:hover:bg-transparent">
                Cart
              </a>
              <button
          onClick={handleLogin}
          className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-gray-900 hover:bg-gray-50 md:hover:bg-transparent"
        >
          Login
        </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarLoggedOut;

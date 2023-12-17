import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const AdminNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      {" "}
      <nav className="bg-white fixed w-full z-10 top-0 shadow-md">
        <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="font-edu-tas px-1 text-2xl tracking-tight text-primary">
              Maida
            </span>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? (
                  <AiOutlineClose className="h-6 w-6" />
                ) : (
                  <AiOutlineMenu className="h-6 w-6" />
                )}
              </button>
            </div>
            <div
              className={`${
                isMenuOpen ? "block" : "hidden"
              } md:flex md:items-center absolute top-16 left-0 w-full bg-white shadow-md md:shadow-none md:relative md:top-0 md:bg-transparent`}
            >
              <div className="px-8 py-2 md:flex md:space-x-4">
                {/* Additional navigation links can be added here */}
                <a
                  href="/owner"
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-gray-900 hover:bg-gray-50 md:hover:bg-transparent"
                >
                  Dashboard
                </a>

                <a
                  href="/dailys"
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-gray-900 hover:bg-gray-50 md:hover:bg-transparent"
                >
                  Dailys
                </a>
                <a
                  href="/menu"
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-gray-900 hover:bg-gray-50 md:hover:bg-transparent"
                >
                  Menu
                </a>

                <button
                  onClick={handleLogout}
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-gray-900 hover:bg-gray-50 md:hover:bg-transparent"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AdminNav;

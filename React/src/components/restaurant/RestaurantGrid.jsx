import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RestaurantGrid = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [initialRestaurants, setInitialRestaurants] = useState([]); // New state to store the initial restaurants
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/restaurants")
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data);
        setInitialRestaurants(data); // Set initial restaurants
      })
      .catch((error) => console.error("Error fetching restaurants:", error));
  }, []);

  const handleViewClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  const handleSearch = () => {
    const searchTermLower = searchTerm.toLowerCase();
    const filteredRestaurants = restaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(searchTermLower) ||
        restaurant.description.toLowerCase().includes(searchTermLower) ||
        restaurant.id.toString().includes(searchTermLower)
    );
    setRestaurants(filteredRestaurants);
  };

  const handleReset = () => {
    setRestaurants(initialRestaurants); // Reset to initial state
    setSearchTerm(""); // Clear the search term
  };

  return (
    <div className="container min-h-screen mx-auto p-4">
      <div className="search-container mx-auto text-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Name, Description, or ID"
          className="search-input w-80 mt-4 mb-4 px-4 py-2 border rounded shadow"
        />
        <button
          onClick={handleSearch}
          className="search-button ml-2 bg-primary hover:bg-orange-500 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Search
        </button>
        <button
          onClick={handleReset}
          className="reset-button ml-2 bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Reset
        </button>
      </div>

      <div className=" font-inter font-semibold text-2xl p-6 whitespace-nowrap text-primary group transition duration-300 inline-block">
        Explore Restaurants
        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-gray-500"></span>
      </div>
      <div className=" text-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{restaurant.name}</h3>
              <p className="text-gray-600">{restaurant.description}</p>
              <button
                onClick={() => handleViewClick(restaurant.id)}
                className="mt-3 bg-primary hover:bg-orange-500 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantGrid;

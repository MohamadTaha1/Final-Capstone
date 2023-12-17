import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  const fetchOwnerRestaurants = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      "http://localhost:8000/api/owner-restaurants",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setRestaurants(data);
    } else {
      console.error("Failed to fetch owner's restaurants");
    }
  };

  useEffect(() => {
    fetchOwnerRestaurants();
  }, []);

  const editRestaurant = async (id) => {
    navigate(`/edit-restaurant/${id}`);
  };

  const deleteRestaurant = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:8000/api/restaurants/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      fetchOwnerRestaurants();
    } else {
      console.error("Failed to delete restaurant");
    }
  };

  return (
    <div className="container mx-auto mt-20 p-4">
      <div className="my-4">
        <h1 className="text-2xl font-inter mb-2 text-center text-secondary">
          Welcome to Your Dashboard
        </h1>
        <p className="mb-4 font-inter text-center text-secondary">
          Manage your restaurants and view orders here.
        </p>

        <div className="mt-4">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white shadow-md rounded-lg mb-4 p-6 relative"
              >
                <h3 className="text-2xl text-secondary font-inter">
                  {restaurant.name}
                </h3>
                <p className="mt-2 mb-4 font-inter text-secondary">
                  {restaurant.description}
                </p>
                <div className="absolute top-6 right-6 flex space-x-2">
                  <button
                    className="bg-primary hover:bg-orange-400 text-white rounded-md py-2 px-4 transition-all duration-300"
                    onClick={() => editRestaurant(restaurant.id)}
                  >
                    Edit
                  </button>
                  <button
                    className=" bg-blue-700 hover:bg-blue-800 text-white rounded-md py-2 px-4 transition-all duration-300"
                    onClick={() => deleteRestaurant(restaurant.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center font-inter text-secondary">
              No restaurants to display
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default AdminPanel;

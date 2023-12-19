import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();
  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    description: "",
    address: "",
    phone_number: "",
    email: "",
    image: "",
  });

  const handleCreateRestaurant = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch(`http://localhost:8000/api/restaurants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newRestaurant),
      });
  
      if (response.ok) {
        fetchOwnerRestaurants();
      } else {
        const errorData = await response.json();
        console.error("Failed to create restaurant:", errorData);
      }
    } catch (error) {
      console.error("Error creating restaurant:", error);
    }
  };
  
  const handleRestaurantInputChange = (event) => {
    const { name, value } = event.target;
    setNewRestaurant({ ...newRestaurant, [name]: value });
  };
  

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

  if (restaurants.length === 0) {
    return (
      <div className="container mx-auto mt-20 p-4">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">Create Your Restaurant</h2>
        <form onSubmit={handleCreateRestaurant} className="bg-white shadow-lg rounded-lg p-8 space-y-6">
          
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newRestaurant.name}
              onChange={handleRestaurantInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-primary focus:border-primary"
              required
            />
          </div>
  
          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={newRestaurant.description}
              onChange={handleRestaurantInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-primary focus:border-primary"
              required
            />
          </div>
  
          {/* Address Field */}
          <div>
            <label htmlFor="address" className="block text-lg font-medium text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={newRestaurant.address}
              onChange={handleRestaurantInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-primary focus:border-primary"
              required
            />
          </div>
  
          {/* Phone Number Field */}
          <div>
            <label htmlFor="phone_number" className="block text-lg font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              value={newRestaurant.phone_number}
              onChange={handleRestaurantInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-primary focus:border-primary"
              required
            />
          </div>
  
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={newRestaurant.email}
              onChange={handleRestaurantInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-primary focus:border-primary"
              required
            />
          </div>
  
          {/* Image URL Field */}
          <div>
            <label htmlFor="image" className="block text-lg font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              id="image"
              name="image"
              value={newRestaurant.image}
              onChange={handleRestaurantInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-primary focus:border-primary"
              required
            />
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          >
            Create Restaurant
          </button>
        </form>
      </div>
    );
  }
  


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

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditRestaurant = () => {
  const [restaurant, setRestaurant] = useState({
    name: "",
    description: "",
    address: "",
    phone_number: "",
    email: "",
    image: "",
    time: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurant();
  }, []);

  const fetchRestaurant = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:8000/api/restaurants/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }[id]
    );

    if (response.ok) {
      const data = await response.json();
      setRestaurant(data);
    } else {
      console.error("Failed to fetch restaurant");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRestaurant((prevRestaurant) => ({
      ...prevRestaurant,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:8000/api/restaurants/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(restaurant),
      }
    );

    if (response.ok) {
      navigate("/owner"); // Navigate back to the main page or dashboard
    } else {
      console.error("Failed to update restaurant");
    }
  };

  return (
    <div className="container min-h-screen mx-auto mt-20 p-4">
      {" "}
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-inter text-center mb-6">
          Edit Restaurant
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name field */}
          <div>
            <label htmlFor="name" className="text-gray-700">
              Restaurant Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={restaurant.name}
              onChange={handleInputChange}
              placeholder="Restaurant Name"
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          {/* Description field */}
          <div>
            <label htmlFor="description" className="text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={restaurant.description}
              onChange={handleInputChange}
              placeholder="Restaurant Description"
              className="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          {/* Address field */}
          <div>
            <label htmlFor="address" className="text-gray-700">
              Address
            </label>
            <input
              id="address"
              type="text"
              name="address"
              value={restaurant.address}
              onChange={handleInputChange}
              placeholder="Restaurant Address"
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          {/* Phone Number field */}
          <div>
            <label htmlFor="phone_number" className="text-gray-700">
              Phone Number
            </label>
            <input
              id="phone_number"
              type="tel"
              name="phone_number"
              value={restaurant.phone_number}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          {/* delivery time field */}
          <div>
            <label htmlFor="phone_number" className="text-gray-700">
              Subscribers Delivery time
            </label>
            <input
              id="time"
              type="text"
              name="time"
              value={restaurant.time}
              onChange={handleInputChange}
              placeholder="Time"
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          {/* Email field */}
          <div>
            <label htmlFor="email" className="text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={restaurant.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          {/* Image URL field */}
          <div>
            <label htmlFor="image" className="text-gray-700">
              Image URL
            </label>
            <input
              id="image"
              type="url"
              name="image"
              value={restaurant.image}
              onChange={handleInputChange}
              placeholder="Image URL"
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div className="flex justify-between space-x-4">
            {" "}
            {/* Adjusted for layout */}
            <button
              type="submit"
              className="bg-primary hover:bg-orange-500 text-white font-inter py-2 px-4 rounded-md transition-colors duration-200 flex-grow"
            >
              Update Restaurant
            </button>
            <button
              type="button"
              onClick={() => navigate("/owner")}
              className="bg-gray-300 hover:bg-gray-400 text-black font-inter py-2 px-4 rounded-md transition-colors duration-200 flex-grow"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRestaurant;

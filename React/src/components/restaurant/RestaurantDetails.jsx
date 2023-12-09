import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const navigate = useNavigate();

  const [dishQuantities, setDishQuantities] = useState(() => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    return existingCart.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {});
  });

  useEffect(() => {
    fetch(`http://localhost:8000/api/restaurants/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setRestaurant(data);

        const initialQuantities = data.menus.reduce((acc, menu) => {
          menu.dishes.forEach((dish) => {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const cartItem = cart.find((item) => item.id === dish.id);
            acc[dish.id] = cartItem ? cartItem.quantity : 0; // Initialize quantity from local storage if exists, else 0
          });
          return acc;
        }, {});

        setDishQuantities(initialQuantities);
      })
      .catch((error) => console.error("Error:", error));
  }, [id]);

  const handleQuantityChange = (dishId, change) => {
    const newQuantities = {
      ...dishQuantities,
      [dishId]: Math.max((dishQuantities[dishId] || 0) + change, 0),
    };
    setDishQuantities(newQuantities);

    // Update cart in local storage
    updateCart(dishId, change);
  };

  const updateCart = (dishId, quantityChange) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const dishIndex = cart.findIndex((item) => item.id === dishId);

    if (dishIndex > -1) {
      // Increment quantity based on the quantity change
      cart[dishIndex].quantity += quantityChange;
    } else {
      // Find the dish details from the restaurant data
      const dish = restaurant.menus
        .flatMap((menu) => menu.dishes)
        .find((d) => d.id === dishId);
      // Add the new item along with the restaurant_id
      cart.push({ ...dish, quantity: quantityChange, restaurant_id: id });
    }

    // Remove items with zero or negative quantity
    cart = cart.filter((item) => item.quantity > 0);

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Hero Section */}
      <div className="hero-section mt-12">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-64 object-cover rounded-lg shadow-lg" // Added rounded-lg and shadow-lg for better image presentation
        />
        <h1 className="text-5xl font-inter text-center my-4 text-text">
          {" "}
          {restaurant.name}
        </h1>
      </div>
      <p className="text-xl text-center my-2 text-text">
        {" "}
        {restaurant.description}
      </p>
      <p className="text-xl text-center font-inter font-semibold my-2 text-text">
        {" Restaurant ID: "}
        {restaurant.id}
      </p>
      <div className="mt-6 text-center">
        {" "}
        <a
          href="/plans"
          className="bg-primary hover:bg-orange-500 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out" // Enhanced button style with transition for hover effect
        >
          Subscribe
        </a>
      </div>
      {/* Menu Section */}
      <div className="mt-6">
        <h2 className="text-3xl font-inter text-text mb-4"> Menu</h2>
        {restaurant.menus.map((menu) =>
          menu.dishes.map((dish) => (
            <div
              key={dish.id}
              className="dish-card bg-white p-4 rounded-lg mb-4 shadow-md flex justify-between items-center" // Added padding, rounded corners, and shadow for card
            >
              <div className="flex items-center">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="h-44 w-44 rounded-4 mr-6"
                />
                <div className="flex flex-col justify-between">
                  <h3 className="text-lg font-semibold text-text mb-1">
                    {" "}
                    {dish.name}
                  </h3>
                  <p className="text-text mb-1"> {dish.description}</p>
                  <p className="text-text2 font-semibold">
                    {" "}
                    Price: ${dish.price}
                  </p>
                </div>
              </div>
              <div className="quantity-selector flex items-center">
                <button
                  onClick={() => handleQuantityChange(dish.id, -1)}
                  className="bg-gray-200 text-text hover:bg-gray-300 p-2 rounded-l-md"
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-12 text-center border-none" // Removed border for a cleaner look
                  value={dishQuantities[dish.id]}
                  readOnly
                />
                <button
                  onClick={() => handleQuantityChange(dish.id, 1)}
                  className="bg-gray-200 text-text hover:bg-gray-300 p-2 rounded-r-md"
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-6 text-center">
        {" "}
        <a
          href="/checkout"
          className="bg-primary hover:cursor-pointer hover:bg-orange-500 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out" // Enhanced button style with transition for hover effect
        >
          Check Cart
        </a>
      </div>
    </div>
  );
};

export default RestaurantDetails;

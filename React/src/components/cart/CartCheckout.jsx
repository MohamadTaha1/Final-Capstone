import { useState, useEffect } from "react";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

const CartCheckout = () => {
  const [user, setUser] = useState({
    location: "00-00-0000",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/"); // Redirect to login if no token is found
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/api/user/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.name);
          setUser({
            ...user,
            location: data.location,
          });
        } else {
          console.error("Failed to fetch user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Load cart items from local storage
    const loadedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(loadedCartItems);
  }, []);

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };
  const isCartEmpty = cartItems.length === 0;

  const handleConfirmOrder = async () => {
    const token = localStorage.getItem("token");
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Assuming all cart items belong to the same restaurant
    const restaurantId = cartItems[0]?.restaurant_id;
    console.log(restaurantId);

    const orderData = {
      restaurant_id: restaurantId, // Make sure this key matches the backend expectation
      cartItems: cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const response = await fetch("http://localhost:8000/api/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const responseData = await response.json();
      if (response.ok) {
        console.log("Order placed successfully", responseData);

        // Clear cart from local storage
        localStorage.removeItem("cart");

        // Navigate to the orders page
        navigate("/orders");
        // Handle success (e.g., navigate to an order confirmation page)
      } else {
        console.error("Failed to place order", responseData);
      }
    } catch (error) {
      console.error("Error placing order", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-neutral-100">
      <div className="m-auto max-w-lg w-full">
        <div className="bg-white p-8 rounded-xl shadow-lg shadow-zinc-300">
          <h2 className="text-3xl font-inter mb-6 text-text2 text-center">
            My Cart
          </h2>
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
            {isCartEmpty && (
              <div className="text-center text-lg font-edu-tas text-red-500">
                Your cart is empty and cannot place orders.
              </div>
            )}
          </div>
          <div className="mt-6 text-center text-xl font-bold text-text">
            <h2>Deliver to :</h2>
            {user.location}
          </div>
          <hr className="mt-6" />
          <div className="mt-6 text-center">
            <h2 className="text-xl font-bold text-text">
              Subtotal: ${calculateSubtotal()}
            </h2>

            <button
              className="bg-primary hover:bg-orange-500 text-white font-bold py-2 px-4 m-3 rounded transition duration-300 ease-in-out"
              onClick={handleConfirmOrder}
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCheckout;

import { useState, useEffect } from "react";
import CartItem from "./CartItem";
import { useNavigate } from 'react-router-dom';


const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Load cart items from local storage
    const loadedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(loadedCartItems);
  }, []);

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  const handleConfirmOrder = async () => {
    const token = localStorage.getItem('token');
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Assuming all cart items belong to the same restaurant
    const restaurantId = cartItems[0]?.restaurant_id;
    console.log(restaurantId);
  
    const orderData = {
      restaurant_id: restaurantId, // Make sure this key matches the backend expectation
      cartItems: cartItems.map(item => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price
      })),
      notes: "Any additional notes here",
    };
    
  
    try {
      const response = await fetch('http://localhost:8000/api/place-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(orderData),
        });
  
      const responseData = await response.json();
      if (response.ok) {
        console.log('Order placed successfully', responseData);
                
        // Clear cart from local storage
        localStorage.removeItem('cart');

        // Navigate to the orders page
        navigate('/orders');
        // Handle success (e.g., navigate to an order confirmation page)
      } else {
        console.error('Failed to place order', responseData);
      }
    } catch (error) {
      console.error('Error placing order', error);
    }
  };
  

  return (
    <div className="flex min-h-screen bg-neutral-100">
      <div className="m-auto max-w-lg w-full">
        <div className="bg-white p-8 rounded-xl shadow-lg shadow-zinc-300">
          <h2 className="text-3xl font-inter mb-6 text-gray-700 text-center">
            My Cart
          </h2>

          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold text-secondary">
              Subtotal: ${calculateSubtotal()}
            </h2>
            <button className="bg-primary text-white py-2 px-4 mt-4 rounded hover:bg-opacity-90" onClick={handleConfirmOrder}>
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

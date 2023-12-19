import { useState, useEffect } from "react";

const DeliveryOrders = () => {
  const [currentOrder, setCurrentOrder] = useState(null);
  const [pastOrders, setPastOrders] = useState([]);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    fetchAssignedOrder();
    fetchPastDeliveredOrders();
    fetchAvailabilityStatus();
  }, []);

  const fetchAvailabilityStatus = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/delivery/availability",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch availability status");
      }

      const { is_available } = await response.json();
      setIsAvailable(is_available);
    } catch (error) {
      console.error("Error fetching availability status:", error);
    }
  };

  const fetchAssignedOrder = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/delivery/current-order",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch the assigned order");
      }

      const order = await response.json();
      console.log(order); // This will show you what you're actually receiving
      setCurrentOrder(order);
    } catch (error) {
      console.error("Error fetching assigned order:", error);
    }
  };

  const fetchPastDeliveredOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/delivery/past-orders",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch past delivered orders");
      }

      const pastOrders = await response.json();
      setPastOrders(pastOrders);
    } catch (error) {
      console.error("Error fetching past delivered orders:", error);
    }
  };

  const toggleAvailability = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/delivery/toggle-availability",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setIsAvailable(data.is_available);
    } catch (error) {
      console.error("Error toggling availability:", error);
    }
  };

  const markOrderAsDelivered = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/delivery/mark-delivered/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to mark order as delivered");
      }
  
      // Move the delivered order from current to past orders
      const deliveredOrder = { ...currentOrder }; // Clone current order
      setPastOrders([...pastOrders, deliveredOrder]); // Add to past orders
      setCurrentOrder(null); // Clear current order
  
      // Optionally, refresh the data
      // fetchAssignedOrder();
      // fetchPastDeliveredOrders();
    } catch (error) {
      console.error("Error marking order as delivered:", error);
    }
  };
  

  return (
    <div className="container min-h-screen mx-auto mt-20 p-4">
      <div className="container mx-auto">
        <button
          onClick={toggleAvailability}
          className={`px-4 py-2 rounded-md text-white font-inter tracking-wide ${
            isAvailable ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {isAvailable ? "Mark as Unavailable" : "Mark as Available"}
        </button>
  
        <div className="mt-8">
          <h1 className="text-xl font-bold text-text2 mb-4">Current Order</h1>
          {currentOrder && currentOrder.id ? (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-800 text-lg">Order ID: {currentOrder.id}</p>
              <p className="text-gray-600">Total Price: ${currentOrder.total_price}</p>
              <p className="text-gray-600">Delivery Address: {currentOrder.user.location}</p>
              <p className="text-gray-600">Restaurant: {currentOrder.restaurant.name}</p>
              <button
                onClick={() => markOrderAsDelivered(currentOrder.id)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Mark as Delivered
              </button>
            </div>
          ) : (
            <p className="text-gray-600">Nothing available to deliver at the moment.</p>
          )}
        </div>
  
        <div className="mt-8">
          <h2 className="text-xl font-bold text-text2 mb-4">Past Delivered Orders</h2>
          <div className="space-y-4">
            {pastOrders.length > 0 ? (
              pastOrders.map((order) => (
                <div key={order.id} className="bg-white p-4 rounded-lg shadow-md">
                  <p className="text-gray-800">Order ID: {order.id}</p>
                  <p className="text-gray-600">Total Price: ${order.total_price}</p>
                  <p className="text-gray-600">Delivered to: {order.user.location}</p>
                  <p className="text-gray-600">Picked up from: {order.restaurant.name}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No past delivered orders.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default DeliveryOrders;

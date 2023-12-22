import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "text-yellow-500";
    case "Approved, preparing":
      return "text-green-500";
    default:
      return "text-gray-500";
  }
};

const getStatusBackground = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100";
    case "Approved, preparing":
      return "bg-green-100";
    default:
      return "bg-gray-100";
  }
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const fetchOrders = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/restaurant/orders",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data.reverse());
    } catch (error) {
      console.error(error.message);
    }
  }, []); // Removed fetchOrders from dependency array

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const confirmOrder = useCallback(
    async (orderId) => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }
      setLoading(true); // Start loading

      try {
        const response = await fetch(
          `http://localhost:8000/api/restaurant/orders/${orderId}/confirm`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update order status");
        }

        const updatedOrder = await response.json();
        setOrders((currentOrders) =>
          currentOrders.map((order) =>
            order.id === updatedOrder.order.id ? updatedOrder.order : order
          )
        );
        setShowSuccessModal(true);

        // Set a timeout of 5 seconds before navigating to /owner
        setTimeout(() => {
          navigate("/owner");
        }, 5000); // 5000 milliseconds = 5 seconds
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const handleSuccess = () => {
    setShowSuccessModal(false);
    navigate("/owner");
  };

  return (
    <div className="container min-h-screen mx-auto p-6">
      {/* Loading Screen */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 text-center">
          <div className="bg-white p-5 rounded-lg shadow-xl">
            <div className="flex flex-col justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
              <p className="text-lg font-semibold mt-4">Loading</p>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center">
            <h3 className="text-2xl font-semibold text-green-600">Success!</h3>
            <p className="text-lg mt-2">Your review has been submitted.</p>
            <button
              onClick={handleSuccess}
              className="bg-green-500 text-white mt-4 px-6 py-2 rounded-lg shadow hover:bg-green-600 transition-colors"
            >
              Go to Home
            </button>
          </div>
        </div>
      )}
      <h1 className="text-3xl font-inter text-center mb-10 text-text2">
        My Orders
      </h1>
      {orders.length === 0 ? (
        <p className="text-center text-xl text-gray-600">No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="mb-6 bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className={`p-6 ${getStatusBackground(order.status)}`}>
              <h2 className="text-2xl font-inter mb-2">Order #{order.id}</h2>
              <p className="text-lg">
                Status:{" "}
                <span className={`font-inter ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </p>
              <p className="text-lg">
                Total Price: ${parseFloat(order.total_price).toFixed(2)}
              </p>
              {order.notes && (
                <p className="mt-2 text-gray-700">Notes: {order.notes}</p>
              )}
            </div>
            <div className="px-6 py-4">
              <h3 className="text-lg font-inter mb-3">Order Details:</h3>
              <ul className="list-disc list-inside">
                {order.order_details.map((detail) => (
                  <li key={detail.id} className="text-gray-700">
                    {detail.dish.name} - Quantity: {detail.quantity}, Price: $
                    {parseFloat(detail.price).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
            {order.status === "pending" && (
              <div className="px-6 py-4 text-center">
                <button
                  onClick={() => confirmOrder(order.id)}
                  className="bg-primary hover:bg-orange-500 text-white font-inter py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                  Confirm Order
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;

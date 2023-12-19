import { useEffect, useState } from "react";

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [dishes, setDishes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      setError(new Error("Authentication token not found"));
      setLoading(false);
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    fetch("http://localhost:8000/api/user/orders", { headers })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok.");
        return response.json();
      })
      .then((data) => {
        setOrders(data.reverse());
        data.forEach((order) => {
          order.order_details.forEach((detail) => {
            fetch(`http://localhost:8000/api/dishes/${detail.dish_id}`, {
              headers,
            })
              .then((dishResponse) => {
                if (!dishResponse.ok)
                  throw new Error("Network response was not ok.");
                return dishResponse.json();
              })
              .then((dishData) => {
                setDishes((prevDishes) => ({
                  ...prevDishes,
                  [detail.dish_id]: dishData,
                }));
              })
              .catch((error) =>
                console.error("Error fetching dish details:", error)
              );
          });
        });
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDeliveredClick = (orderId) => {
    console.log("Delivered button clicked for order", orderId);
    
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen container mx-auto p-4">
      <h1 className="text-3xl font-inter text-center mb-6 text-text2">
        My Orders
      </h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-6 rounded-lg shadow-md mb-4"
          >
            <h2 className="text-2xl font-inter mb-3 text-text2">
              Order ID: {order.id}
            </h2>
            <p className="text-text mb-2">Total Price: ${order.total_price}</p>
            <p className="text-text mb-2">Status: {order.status}</p>
            {order.restaurant && (
              <p className="text-text mb-4">
                Restaurant: {order.restaurant.name}
              </p>
            )}
            <div className="mt-4">
              <h3 className="text-xl font-inter mb-2 text-text2">
                Order Details:
              </h3>
              <ul className="list-disc pl-5">
                {order.order_details.map((detail) => (
                  <li key={detail.id} className="text-text2 mb-2">
                    {dishes[detail.dish_id] ? (
                      <span className="font-inter">
                        {dishes[detail.dish_id].name} - Quantity:{" "}
                        {detail.quantity} - Price: ${detail.price}
                      </span>
                    ) : (
                      <span>Loading dish...</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            {order.status === "Delivered" && (
              
              <button
                onClick={() => handleDeliveredClick(order.id)}
                className="bg-primary hover:bg-orange-500 text-white font-inter py-2 px-4 my-2 rounded"
              >
                Provide feedback !
              </button>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-text2 text-xl">No orders found.</p>
      )}
    </div>
  );
};

export default OrderDetails;

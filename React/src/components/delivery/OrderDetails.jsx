import  { useEffect, useState } from 'react';
import axios from 'axios';

const OrderDetails = () => {
    const [orders, setOrders] = useState([]);
    const [dishes, setDishes] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            setError(new Error('Authentication token not found'));
            setLoading(false);
            return;
        }

        axios.get('http://localhost:8000/api/user/orders', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setOrders(response.data);
            response.data.forEach(order => {
                order.order_details.forEach(detail => {
                    axios.get(`http://localhost:8000/api/dishes/${detail.dish_id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    .then(dishResponse => {
                        setDishes(prevDishes => ({ ...prevDishes, [detail.dish_id]: dishResponse.data }));
                    })
                    .catch(error => console.error('Error fetching dish details:', error));
                });
            });
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
            setError(error);
        })
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen container mx-auto p-4">
      <h1 className="text-3xl font-inter text-center m-6">My Orders</h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-6 rounded-lg font-inter shadow-md mb-4"
          >
            <h2 className="text-2xl font-inter mb-3">Order ID: {order.id}</h2>
            <p className="text-gray-600 mb-2">
              Total Price: ${order.total_price}
            </p>
            <p className="text-gray-600 mb-2 font-inter ">
              Status: {order.status}
            </p>
            {order.restaurant && (
              <p className="text-gray-600 mb-4 font-inter ">
                Restaurant: {order.restaurant.name}
              </p>
            )}
            <div className="mt-4">
              <h3 className="text-xl  font-inter  mb-2">Order Details:</h3>
              <ul className="list-disc pl-5  font-inter ">
                {order.order_details && order.order_details.length > 0 ? (
                  order.order_details.map((detail) => (
                    <li key={detail.id} className="text-text2 mb-2">
                      {detail.dish && (
                        <span className=" font-inter ">
                          {detail.dish.name} -{" "}
                        </span>
                      )}
                      Quantity: {detail.quantity} - Price: ${detail.price}
                      {console.log(detail.dish)};
                    </li>
                  ))
                ) : (
                  <li className="text-text2  font-inter ">
                    No order details available.
                  </li>
                )}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-text2 text-xl  font-inter ">
          No orders found.
        </p>
      )}
    </div>
  );
};

export default OrderDetails;

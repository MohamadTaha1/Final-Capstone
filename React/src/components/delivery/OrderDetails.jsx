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
            <h1 className="text-3xl font-bold text-center mb-6">My Orders</h1>
            {orders.length > 0 ? (
                orders.map(order => (
                    <div key={order.id} className="bg-white p-6 rounded-lg shadow-md mb-4">
                        <h2 className="text-2xl font-bold mb-3">Order ID: {order.id}</h2>
                        <p className="text-gray-600 mb-2">Total Price: ${order.total_price}</p>
                        <p className="text-gray-600 mb-2">Status: {order.status}</p>
                        {order.restaurant && (
                            <p className="text-gray-600 mb-4">Restaurant: {order.restaurant.name}</p>
                        )}
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold mb-2">Order Details:</h3>
                            <ul className="list-disc pl-5">
                                {order.order_details.map(detail => (
                                    <li key={detail.id} className="text-gray-700 mb-2">
                                        {dishes[detail.dish_id] ? (
                                            <span className="font-semibold">
                                                {dishes[detail.dish_id].name} - Quantity: {detail.quantity} - Price: ${detail.price}
                                            </span>
                                        ) : (
                                            <span>Loading dish...</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-700 text-xl">No orders found.</p>
            )}
        </div>
    );
};

export default OrderDetails;

import { useState, useEffect } from 'react';

const OrderDetails = () => {
    const [orders, setOrders] = useState([]);
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
    
        fetch('http://localhost:8000/api/user/orders', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched orders:", data); // Log the fetched data
            setOrders(data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Fetch error:', error);
            setError(error);
            setLoading(false);
        });
    }, []);
    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto p-4">
    <h1 className="text-3xl font-bold text-center mb-6">My Orders</h1>
    {orders.length > 0 ? orders.map(order => (
        <div key={order.id} className="bg-white p-6 rounded-lg shadow-md mb-4">
            <h2 className="text-2xl font-bold mb-3">Order ID: {order.id}</h2>
            <p className="text-gray-600 mb-2">Total Price: ${order.total_price}</p>
            <p className="text-gray-600 mb-2">Status: {order.status}</p>
            {order.restaurant && <p className="text-gray-600 mb-4">Restaurant: {order.restaurant.name}</p>}
            <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Order Details:</h3>
                <ul className="list-disc pl-5">
                    {order.order_details && order.order_details.length > 0 ? (
                        order.order_details.map(detail => (
                            <li key={detail.id} className="text-gray-700 mb-2">
                                {detail.dish && <span className="font-semibold">{detail.dish.name} - </span>}
                                Quantity: {detail.quantity} - 
                                Price: ${detail.price}
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-700">No order details available.</li>
                    )}
                </ul>
            </div>
        </div>
    )) : (
        <p className="text-center text-gray-700 text-xl">No orders found.</p>
    )}
</div>
    );
};
export default OrderDetails;

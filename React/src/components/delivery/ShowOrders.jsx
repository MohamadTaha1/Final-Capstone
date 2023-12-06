import { useState, useEffect } from 'react';

const DeliveryOrders = () => {
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

        fetch('http://localhost:8000/api/orders/available-for-delivery', {
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
            console.log("Fetched orders for delivery:", data);
            setOrders(data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Fetch error:', error);
            setError(error);
            setLoading(false);
        });
    }, []);

    const takeOrder = (orderId) => {
        // Implement the logic to take the order
        console.log(`Taking order with ID: ${orderId}`);
        // API call to take the order for delivery...
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Available Orders for Delivery</h1>
            {orders.length > 0 ? (
                orders.map(order => (
                    <div key={order.id} className="bg-white p-6 rounded-lg shadow-md mb-4">
                        <h2 className="text-2xl font-bold mb-3">Order ID: {order.id}</h2>
                        <p className="text-gray-600 mb-2">Total Price: ${order.total_price}</p>
                        <p className="text-gray-600 mb-2">Status: {order.status}</p>
                        {order.restaurant && <p className="text-gray-600 mb-4">Restaurant: {order.restaurant.name}</p>}
                        {/* Add a button to take the order */}
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => takeOrder(order.id)}
                        >
                            Take Order
                        </button>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-700 text-xl">No orders available for delivery.</p>
            )}
        </div>
    );
};

export default DeliveryOrders;

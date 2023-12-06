import  { useState, useEffect } from 'react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchOrders();
    }, []);

    const getStatusColor = (status) => {
        switch(status) {
            case 'pending':
                return 'text-yellow-500';
            case 'Approved, preparing':
                return 'text-green-500';
            default:
                return 'text-gray-500';
        }
    };

    const getStatusBackground = (status) => {
        switch(status) {
            case 'pending':
                return 'bg-yellow-100';
            case 'Approved, preparing':
                return 'bg-green-100';
            default:
                return 'bg-gray-100';
        }
    };
    

    const fetchOrders = async () => {
        const response = await fetch('http://localhost:8000/api/restaurant/orders', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setOrders(data);
        } else {
            console.error('Failed to fetch orders');
        }
    };

    const confirmOrder = async (orderId) => {
        const response = await fetch(`http://localhost:8000/api/restaurant/orders/${orderId}/confirm`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const updatedOrder = await response.json();
            setOrders(orders.map(order => order.id === updatedOrder.order.id ? updatedOrder.order : order));
        } else {
            console.error('Failed to update order status');
        }
    };

    return (
        <div className="container mx-auto p-6">
    <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Restaurant Orders</h1>
    {orders.length === 0 ? (
        <p className="text-center text-xl text-gray-600">No orders found</p>
    ) : (
        orders.map(order => (
            <div key={order.id} className="mb-6 bg-white rounded-lg shadow-lg overflow-hidden">
                <div className={`p-6 ${getStatusBackground(order.status)}`}>
                    <h2 className="text-2xl font-semibold mb-2">Order #{order.id}</h2>
                    <p className="text-lg">
                        Status: <span className={`font-bold ${getStatusColor(order.status)}`}>{order.status}</span>
                    </p>
                    <p className="text-lg">Total Price: ${parseFloat(order.total_price).toFixed(2)}</p>
                    {order.notes && <p className="mt-2 text-gray-700">Notes: {order.notes}</p>}
                </div>
                <div className="px-6 py-4">
                    <h3 className="text-lg font-semibold mb-3">Order Details:</h3>
                    <ul className="list-disc list-inside">
                        {order.order_details.map(detail => (
                            <li key={detail.id} className="text-gray-700">
                                {detail.dish.name} - Quantity: {detail.quantity}, Price: ${parseFloat(detail.price).toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
                {order.status === 'pending' && (
                    <div className="px-6 py-4">
                        <button
                            onClick={() => confirmOrder(order.id)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
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

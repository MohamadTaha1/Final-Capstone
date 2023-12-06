import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RestaurantGrid = () => {
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch restaurants data
        fetch('http://localhost:8000/api/restaurants')
            .then(response => response.json())
            .then(data => setRestaurants(data))
            .catch(error => console.error('Error fetching restaurants:', error));
    }, []);

    const handleViewClick = (restaurantId) => {
        // Navigate to the restaurant details page (to be implemented)
        navigate(`/restaurant/${restaurantId}`);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Restaurants</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map(restaurant => (
                    <div key={restaurant.id} className="bg-white rounded-lg shadow overflow-hidden">
                        <img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover"/>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{restaurant.name}</h3>
                            <p className="text-gray-600">{restaurant.description}</p>
                            <button
                                onClick={() => handleViewClick(restaurant.id)}
                                className="mt-3 bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
                            >
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RestaurantGrid;

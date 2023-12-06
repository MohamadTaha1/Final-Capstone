import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Main = () => {
    const [restaurants, setRestaurants] = useState([]);

    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/login"); // Redirect to login page after logout
    };

    const fetchOwnerRestaurants = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/owner-restaurants', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    
        if (response.ok) {
            const data = await response.json();
            setRestaurants(data);
        } else {
            console.error('Failed to fetch owner\'s restaurants');
        }
    };
    
    useEffect(() => {
        fetchOwnerRestaurants();
    }, []);

    const editRestaurant = async (id) => {
        navigate(`/edit-restaurant/${id}`);
    };
    
    const deleteRestaurant = async (id) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8000/api/restaurants/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    
        if (response.ok) {
            // Remove the restaurant from the state or re-fetch the list
            fetchOwnerRestaurants();
        } else {
            console.error('Failed to delete restaurant');
        }
    };
    

    return (
        <div className="container mx-auto p-4">
            {/* Top Navigation */}
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md mb-6 shadow-sm">
                <h2 className="text-3xl font-bold italic text-red-600">Maida</h2>
                <h3 className="text-2xl font-semibold">Chef Dashboard</h3>
                <div>
                    <button
                        onClick={handleLogout}
                        className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-gray-900 hover:bg-gray-50 md:hover:bg-transparent"
                        >
                        Logout
                   </button>
                </div> {/* Placeholder for potential future navigation items */}
            </div>

            {/* Dashboard Content */}
            <div className="my-4">
                <h1 className="text-2xl font-bold mb-2">Welcome to Your Dashboard</h1>
                <p className="text-gray-600 mb-4">Manage your restaurants and view orders here.</p>

                <div className="mt-4">
                    {restaurants.length > 0 ? (
                        restaurants.map(restaurant => (
                            <div key={restaurant.id} className="bg-white shadow-md rounded-lg mb-4 p-6 relative">
                                <h3 className="text-xl font-semibold text-red-600">{restaurant.name}</h3>
                                <p className="text-gray-500 mt-2 mb-4">{restaurant.description}</p>
                                <div className="absolute top-6 right-6 flex space-x-2">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white rounded-md py-2 px-4 transition-all duration-300" onClick={() => editRestaurant(restaurant.id)}>Edit</button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white rounded-md py-2 px-4 transition-all duration-300" onClick={() => deleteRestaurant(restaurant.id)}>Delete</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No restaurants to display</p>
                    )}
                </div>
            </div>
        </div>


        
    );
 }    
export default Main
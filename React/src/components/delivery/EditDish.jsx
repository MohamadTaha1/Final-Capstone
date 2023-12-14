import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditDishForm = () => {
    const [dish, setDish] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        available: true
    });
    const { dishId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDish = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`http://localhost:8000/api/dishes/${dishId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setDish(data);
                } else {
                    console.error('Failed to fetch dish');
                }
            } catch (error) {
                console.error('Error fetching dish:', error);
            }
        };

        if (dishId) {
            fetchDish();
        }
    }, [dishId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setDish({ ...dish, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:8000/api/dishes/${dishId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(dish),
            });

            if (response.ok) {
                alert('Dish updated successfully');
                navigate('/main'); // Redirect to a specific page after update
            } else {
                const errorData = await response.json();
                console.error('Failed to update dish:', errorData);
            }
        } catch (error) {
            console.error('Error updating dish:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Edit Dish</h2>
            <div className="mb-4">
                <label htmlFor="name" className="block mb-2">Name:</label>
                <input type="text" id="name" name="name" value={dish.name} onChange={handleChange} className="w-full px-3 py-2 border rounded"/>
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block mb-2">Description:</label>
                <textarea id="description" name="description" value={dish.description} onChange={handleChange} className="w-full px-3 py-2 border rounded"></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="price" className="block mb-2">Price:</label>
                <input type="number" id="price" name="price" value={dish.price} onChange={handleChange} className="w-full px-3 py-2 border rounded"/>
            </div>
            <div className="mb-4">
                <label htmlFor="image" className="block mb-2">Image URL:</label>
                <input type="url" id="image" name="image" value={dish.image} onChange={handleChange} className="w-full px-3 py-2 border rounded"/>
            </div>
            <div className="mb-4 flex items-center">
                <input type="checkbox" id="available" name="available" checked={dish.available} onChange={handleChange} className="mr-2"/>
                <label htmlFor="available">Available</label>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Update Dish</button>
        </form>
    );
};


export default EditDishForm;

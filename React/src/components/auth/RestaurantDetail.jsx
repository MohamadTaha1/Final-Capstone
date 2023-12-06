import  { useState, useEffect } from 'react';
//import { useParams } from 'react-router-dom';


const RestaurantDetail = () => {
    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(true);
    // ... other states ...

    useEffect(() => {
        fetchOwnerMenu();
    }, []);

    const [newDish, setNewDish] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        available: true
    });

    const handleAddDish = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8000/api/dishes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ ...newDish, menu_id: menu.id }),
        });
    
        if (response.ok) {
            fetchOwnerMenu(); 
        } else {
            const errorData = await response.json();
            console.error('Failed to add dish:', errorData);
            console.log(menu.id)
        }
    };
    

    const handleDishInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setNewDish({ ...newDish, [name]: type === 'checkbox' ? checked : value });
    };
    
    
    

    const fetchOwnerMenu = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8000/api/owner-menu`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            setMenu(data);
        } else {
            console.error('Failed to fetch menu details');
        }
        setLoading(false);
    };

    const handleEditDish = (menuId) => {
        console.log("Edit Menu:", menuId);
        // Implement navigation or modal opening for editing menu
    };

    const handleEdit = (menuId) => {
        console.log("Edit Menu:", menuId);
        // Implement navigation or modal opening for editing menu
    };

    const handleDelete = (menuId) => {
        console.log("Delete Menu:", menuId);
        // Implement delete logic here
    };

    const handleView = (menuId) => {
        console.log("View Menu:", menuId);
        // Implement view logic here
    };



    if (loading) {
        return <div>Loading...</div>;
    }

    if (!menu) {
        return <div>No Menu Found</div>;
    }

    return (
        <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold">Menu: {menu.title}</h2>
        <p className="text-gray-600 mb-4">{menu.description}</p>
    
        <div className="dishes-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {menu.dishes && menu.dishes.length > 0 ? (
                menu.dishes.map(dish => (
                    <div key={dish.id} className="dish-card bg-white p-3 shadow-md rounded-lg">
                        <p className="dish-name font-semibold text-lg">{dish.name}</p>
                        <p className="dish-description text-gray-500">{dish.description}</p>
                        <p className="dish-price text-gray-700">Price: ${dish.price}</p>
                        <div className="flex justify-between items-center mt-2">
                            <button onClick={() => handleEditDish(dish.id)} className="edit-dish bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Edit
                            </button>
                            <img src={dish.image} alt={dish.name} className="h-10 w-10 rounded" />
                        </div>
                    </div>
                ))
            ) : (
                <p>No dishes found in this menu</p>
            )}
        </div>
    
        <div className="actions flex space-x-2 mb-4">
            <button onClick={() => handleEdit(menu.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Edit Menu
            </button>
            <button onClick={() => handleDelete(menu.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Delete Menu
            </button>
            <button onClick={() => handleView(menu.id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                View Menu
            </button>
        </div>
    
        <div className="add-dish-form bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6">Add New Dish</h2>
            <form onSubmit={handleAddDish} className="space-y-6">
                {/* Dish Name */}
                <div className="form-group">
                    <label htmlFor="name" className="block text-lg font-medium text-gray-700">Dish Name</label>
                    <input type="text" name="name" id="name" value={newDish.name} onChange={handleDishInputChange} placeholder="Enter dish name" className="form-input mt-2 block w-full rounded-md border border-gray-300 shadow-sm p-3 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50" required />
                </div>

                {/* Dish Description */}
                <div className="form-group">
                    <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
                    <textarea name="description" id="description" value={newDish.description} onChange={handleDishInputChange} placeholder="Describe the dish" className="form-textarea mt-2 block w-full rounded-md border border-gray-300 shadow-sm p-3 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50" required />
                </div>

                {/* Dish Price */}
                <div className="form-group">
                    <label htmlFor="price" className="block text-lg font-medium text-gray-700">Price</label>
                    <input type="number" name="price" id="price" value={newDish.price} onChange={handleDishInputChange} placeholder="Set a price" className="form-input mt-2 block w-full rounded-md border border-gray-300 shadow-sm p-3 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50" required />
                </div>

                {/* Dish Image URL */}
                <div className="form-group">
                    <label htmlFor="image" className="block text-lg font-medium text-gray-700">Image URL</label>
                    <input type="url" name="image" id="image" value={newDish.image} onChange={handleDishInputChange} placeholder="http://example.com/dish.jpg" className="form-input mt-2 block w-full rounded-md border border-gray-300 shadow-sm p-3 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50" required />
                </div>

                {/* Dish Availability */}
                <div className="form-group flex items-center">
                    <input type="checkbox" name="available" id="available" checked={newDish.available} onChange={handleDishInputChange} className="form-checkbox h-5 w-5 text-green-600 rounded focus:ring-green-500" />
                    <label htmlFor="available" className="ml-2 block text-lg font-medium text-gray-700">Available</label>
                </div>

                {/* Submit Button */}
                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow hover:shadow-lg transition-all duration-300 ease-in-out">Add Dish</button>
            </form>
        </div>

    </div>
    
    );
};

export default RestaurantDetail;

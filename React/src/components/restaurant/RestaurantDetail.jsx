import { useState, useEffect } from "react";
//import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const RestaurantDetail = () => {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // ... other states ...

  useEffect(() => {
    fetchOwnerMenu();
  }, []);

  const [newDish, setNewDish] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    available: true,
  });

  const handleAddDish = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8000/api/dishes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...newDish, menu_id: menu.id }),
    });

    if (response.ok) {
      fetchOwnerMenu();
    } else {
      const errorData = await response.json();
      console.error("Failed to add dish:", errorData);
      console.log(menu.id);
    }
  };

  const handleDishInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setNewDish({ ...newDish, [name]: type === "checkbox" ? checked : value });
  };

  const fetchOwnerMenu = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8000/api/owner-menu`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setMenu(data);
    } else {
      console.error("Failed to fetch menu details");
    }
    setLoading(false);
  };

  const handleEditDish = async (dishId) => {
    // Navigate to edit dish form with dishId
    // Assuming you're using React Router
    navigate(`/edit-dish/${dishId}`);
  };

  const handleDeleteDish = async (dishId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8000/api/dishes/${dishId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Remove the dish from the local state
        setMenu((prevMenu) => {
          return {
            ...prevMenu,
            dishes: prevMenu.dishes.filter((dish) => dish.id !== dishId),
          };
        });
      } else {
        // Handle error
        const errorData = await response.json();
        console.error("Failed to delete dish:", errorData);
      }
    } catch (error) {
      console.error("Error deleting dish:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!menu) {
    return <div>No Menu Found</div>;
  }

  return (
    <div className="container min-h-screen mx-auto mt-20 p-6">
      <h2 className="text-2xl font-inter text-text">Menu: {menu.title}</h2>
      <p className="text-gray-600 mb-4">{menu.description}</p>

      <div className="dishes-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {menu.dishes && menu.dishes.length > 0 ? (
          menu.dishes.map((dish) => (
            <div
              key={dish.id}
              className="dish-card bg-white p-3 shadow-md rounded-lg"
            >
              <p className="dish-name font-semiinter text-lg">{dish.name}</p>
              <p className="dish-description text-gray-500">
                {dish.description}
              </p>
              <p className="dish-price text-text2">Price: ${dish.price}</p>
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => handleEditDish(dish.id)}
                  className="edit-dish bg-primary hover:bg-orange-500 text-white font-inter py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteDish(dish.id)}
                  className="edit-dish bg-red-700 hover:bg-red-800 text-white font-inter py-2 px-4 rounded"
                >
                  Delete
                </button>
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="h-10 w-10 rounded"
                />
              </div>
            </div>
          ))
        ) : (
          <p>No dishes found in this menu</p>
        )}
      </div>

      {/* <div className="actions flex space-x-2 mb-4">
        <button
          onClick={() => handleEdit(menu.id)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-inter py-2 px-4 rounded"
        >
          Edit Menu
        </button>
        <button
          onClick={() => handleDelete(menu.id)}
          className="bg-red-500 hover:bg-red-700 text-white font-inter py-2 px-4 rounded"
        >
          Delete Menu
        </button>
        <button
          onClick={() => handleView(menu.id)}
          className="bg-green-500 hover:bg-green-700 text-white font-inter py-2 px-4 rounded"
        >
          View Menu
        </button>
      </div> */}

      <div className="add-dish-form bg-gray-100 p-6 rounded-lg shadow-md m-6">
        <h2 className="text-3xl font-inter mb-6">Add New Dish</h2>
        <form onSubmit={handleAddDish} className="space-y-6">
          {/* Dish Name */}
          <div className="form-group">
            <label
              htmlFor="name"
              className="block text-lg font-inter text-text2"
            >
              Dish Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={newDish.name}
              onChange={handleDishInputChange}
              placeholder="Enter dish name"
              className="form-input mt-2 block w-full rounded-md border border-gray-300 shadow-sm p-3 focus:ring focus:ring-primary focus:ring-opacity-50"
              required
            />
          </div>

          {/* Dish Description */}
          <div className="form-group">
            <label
              htmlFor="description"
              className="block text-lg font-inter text-text2"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={newDish.description}
              onChange={handleDishInputChange}
              placeholder="Describe the dish"
              className="focus:ring focus:ring-primary form-textarea mt-2 block w-full rounded-md border border-gray-300 shadow-sm p-3 focus:ring-opacity-50"
              required
            />
          </div>

          {/* Dish Price */}
          <div className="form-group">
            <label
              htmlFor="price"
              className="block text-lg font-inter text-text2"
            >
              Price : $
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={newDish.price}
              onChange={handleDishInputChange}
              placeholder="Set a price"
              className=" focus:ring focus:ring-primary form-input mt-2 block w-full rounded-md border border-gray-300 shadow-sm p-3 focus:ring-opacity-50"
              required
            />
          </div>

          {/* Dish Image URL */}
          <div className="form-group">
            <label
              htmlFor="image"
              className="block text-lg font-inter text-text2"
            >
              Image URL
            </label>
            <input
              type="url"
              name="image"
              id="image"
              value={newDish.image}
              onChange={handleDishInputChange}
              placeholder="http://example.com/dish.jpg"
              className="form-input mt-2 block w-full rounded-md border border-gray-300 shadow-sm p-3 focus:ring focus:ring-primary focus:ring-opacity-50"
              required
            />
          </div>

          {/* Dish Availability */}
          <div className="form-group flex items-center">
            <input
              type="checkbox"
              name="available"
              id="available"
              checked={newDish.available}
              onChange={handleDishInputChange}
              className="form-checkbox h-5 w-5 "
            />
            <label
              htmlFor="available"
              className="ml-2 block text-lg font-inter text-text2"
            >
              Available
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-primary hover:bg-orange-500 text-white font-inter py-3 px-6 rounded-lg shadow hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            Add Dish
          </button>
        </form>
      </div>
    </div>
  );
};

export default RestaurantDetail;

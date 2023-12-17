import { useState } from "react";
import { useNavigate } from "react-router-dom";
function DishForm() {
  const [dish, setDish] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDish({ ...dish, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    console.log(dish);
  };

  return (
    <div className="container min-h-screen mx-auto mt-20 p-4">
      {" "}
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-4">
        {" "}
        <form className="p-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-text2 text-xl font-inter mb-2"
              htmlFor="name"
            >
              Dish Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-text2 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Dish Name"
              name="name"
              value={dish.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-text2 text-xl font-inter mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-text2 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Description"
              name="description"
              value={dish.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-text2 text-xl font-inter mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-text2 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="number"
              placeholder="Price"
              name="price"
              value={dish.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-text2 text-xl font-inter mb-2"
              htmlFor="imageUrl"
            >
              Image URL
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-text2 leading-tight focus:outline-none focus:shadow-outline"
              id="imageUrl"
              type="text"
              placeholder="Image URL"
              name="imageUrl"
              value={dish.imageUrl}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-between space-x-4">
            {" "}
            {/* Adjusted for layout */}
            <button
              type="submit"
              className="bg-primary hover:bg-orange-500 text-white font-inter py-2 px-4 rounded-md transition-colors duration-200 flex-grow"
            >
              Add Dish
            </button>
            <button
              type="button"
              onClick={() => navigate("/owner")}
              className="bg-gray-300 hover:bg-gray-400 text-black font-inter py-2 px-4 rounded-md transition-colors duration-200 flex-grow"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DishForm;

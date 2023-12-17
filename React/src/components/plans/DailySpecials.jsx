import { useState, useEffect } from "react";
import axios from "axios";

const DailySpecialsPage = () => {
  const [dishes, setDishes] = useState([]);
  const [specials, setSpecials] = useState({});
  const [loading, setLoading] = useState(true);
  const [scheduleExists, setScheduleExists] = useState(false);
  const token = localStorage.getItem("token");
  const [restaurantId, setRestaurantId] = useState(null);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const fetchOwnerRestaurants = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/owner-restaurants",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data.length > 0) {
          setRestaurantId(response.data[0].id); // Assuming the owner has only one restaurant
        }
      } catch (error) {
        console.error("Error submitting daily specials:", error.response.data);
      }
    };

    fetchOwnerRestaurants();
  }, [token]);

  useEffect(() => {
    if (!restaurantId) return;

    // Assuming the first menu of the restaurant contains all dishes
    const fetchDishes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/owner-menu`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data && response.data.dishes) {
          setDishes(response.data.dishes);
        }
      } catch (error) {
        console.error("Failed to fetch dishes:", error);
      }
    };

    // No endpoint available for fetching daily specials, so skipping that part

    fetchDishes();
    setLoading(false);
  }, [restaurantId, token]);

  useEffect(() => {
    // ... existing useEffect hooks for fetching restaurants and dishes

    const fetchDailySpecials = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/restaurants/${restaurantId}/daily-specials`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data.length > 0) {
          setScheduleExists(true);
          let specialsData = {};
          response.data.forEach((special) => {
            // Use day_of_week as the key and store the entire object
            specialsData[special.day_of_week] = {
              id: special.id, // Store the id
              dishId: special.dish_id,
              price: special.price,
            };
          });
          setSpecials(specialsData);
        }
      } catch (error) {
        console.error("Failed to fetch daily specials:", error);
      }
    };

    if (restaurantId) {
      fetchDailySpecials();
    }
  }, [restaurantId, token]);

  const handleSpecialChange = (day, dishId, price) => {
    setSpecials((prevSpecials) => ({
      ...prevSpecials,
      [day]: {
        ...prevSpecials[day], // Spread the existing object to retain the id
        dishId: dishId,
        price: price,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming you need to send an array of daily specials
    const formattedData = Object.entries(specials).map(
      ([day, { dishId, price }]) => ({
        restaurant_id: restaurantId,
        dish_id: dishId,
        day_of_week: parseInt(day),
        price: parseFloat(price),
      })
    );

    // This would send an array of objects to the backend
    try {
      await axios.post(
        "http://localhost:8000/api/daily-specials",
        formattedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Specials updated successfully");
    } catch (error) {
      if (error.response && error.response.data) {
        // If there are validation errors, they will be here
        console.error("Validation errors:", error.response.data.errors);
      } else {
        // Other errors
        console.error("Error submitting daily specials:", error);
      }
    }
  };

  const handleEditClick = (dayOfWeek) => {
    setEditing(dayOfWeek);
  };

  const fetchDailySpecials = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/restaurants/${restaurantId}/daily-specials`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.length > 0) {
        setScheduleExists(true);
        let specialsData = {};
        response.data.forEach((special) => {
          // Use day_of_week as the key and store the entire object
          specialsData[special.day_of_week] = {
            id: special.id, // Store the id
            dishId: special.dish_id,
            price: special.price,
          };
        });
        setSpecials(specialsData);
      }
    } catch (error) {
      console.error("Failed to fetch daily specials:", error);
    }
  };

  const handleConfirmClick = async (dayOfWeek) => {
    const specialToUpdate = specials[dayOfWeek];
    if (!specialToUpdate || !specialToUpdate.id) {
      console.error("Error: Special ID is undefined.");
      return;
    }
    try {
      await axios.patch(
        `http://localhost:8000/api/daily-specials/${specialToUpdate.id}`,
        {
          dish_id: specialToUpdate.dishId,
          price: specialToUpdate.price,
          day_of_week: dayOfWeek, // Add the day_of_week field here
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Special updated successfully");
      setEditing(null);
      fetchDailySpecials(); // Update UI
    } catch (error) {
      console.error("Error updating daily special:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
    }
  };

  if (loading) {
    return <div className="text-center text-xl">Loading daily specials...</div>;
  }

  if (scheduleExists) {
    return (
      <div className="container min-h-screen mx-auto mt-20 p-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-inter text-center mb-4 text-text2">
            My Daily Specials
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead className="bg-gray-200 text-text uppercase text-sm leading-normal">
                <tr>
                  <th className="py-3 px-6 text-left">Day of Week</th>
                  <th className="py-3 px-6 text-left">Dish</th>
                  <th className="py-3 px-6 text-center">Price</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-text text-sm font-light">
                {Object.entries(specials).map(
                  ([dayOfWeek, { dishId, price }]) => (
                    <tr
                      key={dayOfWeek}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {dayOfWeek}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {editing === dayOfWeek ? (
                          <select
                            className="form-select block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            value={specials[dayOfWeek].dishId}
                            onChange={(e) =>
                              handleSpecialChange(
                                dayOfWeek,
                                e.target.value,
                                price
                              )
                            }
                          >
                            {dishes.map((dish) => (
                              <option key={dish.id} value={dish.id}>
                                {dish.name}
                              </option>
                            ))}
                          </select>
                        ) : (
                          dishes.find((dish) => dish.id === dishId)?.name ||
                          "Dish not found"
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        {editing === dayOfWeek ? (
                          <input
                            className="form-input block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            type="number"
                            value={specials[dayOfWeek].price}
                            onChange={(e) =>
                              handleSpecialChange(
                                dayOfWeek,
                                dishId,
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          `$${price}`
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        {editing === dayOfWeek ? (
                          <button
                            onClick={() => handleConfirmClick(dayOfWeek)}
                            className="bg-green-500 text-white active:bg-green-600 font-inter uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            style={{ transition: "all .15s ease" }}
                          >
                            Confirm
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEditClick(dayOfWeek)}
                            className="bg-primary text-white hover:bg-orange-500 active:bg-orange-500 font-inter uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            style={{ transition: "all .15s ease" }}
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container min-h-screen mx-auto mt-20 p-4">
      <div className="container mx-auto">
        {" "}
        <h2 className="text-3xl font-semiinter text-center text-gray-700 mb-6">
          Manage Daily Specials for Your Restaurant
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ].map((day, index) => (
            <div
              key={day}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
            >
              <label className="block text-lg font-medium text-gray-700">
                {day}
              </label>
              <select
                className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                value={specials[index]?.dishId || ""}
                onChange={(e) =>
                  handleSpecialChange(
                    index,
                    e.target.value,
                    specials[index]?.price || ""
                  )
                }
              >
                <option value="">Select a Dish</option>
                {dishes.map((dish) => (
                  <option key={dish.id} value={dish.id}>
                    {dish.name}
                  </option>
                ))}
              </select>
              <input
                className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                type="number"
                value={specials[index]?.price || ""}
                onChange={(e) =>
                  handleSpecialChange(
                    index,
                    specials[index]?.dishId || "",
                    e.target.value
                  )
                }
                placeholder="Price"
              />
            </div>
          ))}
          <div className="text-center">
            <button
              className="bg-primary text-white font-inter uppercase text-lg px-6 py-3 rounded shadow-lg hover:bg-orange-500 focus:outline-none focus:shadow-outline mt-4"
              type="submit"
            >
              Save Specials
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DailySpecialsPage;

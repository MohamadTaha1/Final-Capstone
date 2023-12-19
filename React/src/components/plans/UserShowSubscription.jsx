import { useEffect, useState } from "react";
import axios from "axios";

const UserShowSubscription = () => {
  const [subscription, setSubscription] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [dailySpecials, setDailySpecials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user/subscription-details", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setSubscription(response.data);
        return axios.get(
          `http://localhost:8000/api/restaurants/${response.data.restaurant_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      })
      .then((response) => {
        setRestaurant(response.data);
        return axios.get(
          `http://localhost:8000/api/restaurant/${response.data.id}/daily-specials`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      })
      .then((response) => {
        setDailySpecials(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen bg-neutral-100">
      <div className="mx-auto max-w-lg w-full">
        <div className="bg-white py-6 px-8 m-2 rounded-xl shadow-lg shadow-zinc-300">
          <h3 className="text-left text-3xl font-edu-tas text-text ">
            My Subscription Details
          </h3>
          <br></br>{" "}
          {subscription && restaurant ? (
            <div className="mb-6">
              <p className="text-gray-700">
                <strong>Restaurant:</strong> {restaurant.name}
              </p>
              <p className="text-gray-700">
                <strong>Plan Type:</strong> {subscription.subscription_type}
              </p>
              <p className="text-gray-700">
                <strong>Start Date:</strong>{" "}
                {new Date(subscription.start_date).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                <strong>End Date:</strong>{" "}
                {new Date(subscription.end_date).toLocaleDateString()}
              </p>
            </div>
          ) : (
            <p>No active subscription.</p>
          )}
          <h2 className="text-xl font-inter mb-4 text-text2">Weekly Specials</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-gray-700">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="px-4 py-2 text-left">Day</th>
                  <th className="px-4 py-2 text-left">Dish</th>
                  <th className="px-4 py-2 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {dailySpecials.length > 0 ? (
                  dailySpecials.map((special, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2">
                        {dayOfWeek(special.day_of_week)}
                      </td>
                      <td className="px-4 py-2">{special.dish.name}</td>
                      <td className="px-4 py-4">
                        {formatPrice(special.price)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-4 py-2">
                      No specials available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to convert day of week index to string
const dayOfWeek = (index) => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return days[index] || "Unknown";
};

// Helper function to safely format price
const formatPrice = (price) => {
  return price && !isNaN(price) ? `$${parseFloat(price).toFixed(2)}` : "N/A";
};

export default UserShowSubscription;

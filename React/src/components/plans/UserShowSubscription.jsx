import { useEffect, useState } from "react";
import axios from "axios";

const UserShowSubscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found");
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        const subResponse = await axios.get(
          "http://localhost:8000/api/user/subscription-details",
          { headers }
        );

        const subscriptionDetails = await Promise.all(
          subResponse.data.map(async (subscription) => {
            const restaurantResponse = await axios.get(
              `http://localhost:8000/api/restaurants/${subscription.restaurant_id}`,
              { headers }
            );

            const specialsResponse = await axios.get(
              `http://localhost:8000/api/restaurant/${subscription.restaurant_id}/daily-specials`,
              { headers }
            );

            return {
              ...subscription,
              restaurant: restaurantResponse.data,
              dailySpecials: specialsResponse.data,
            };
          })
        );

        setSubscriptions(subscriptionDetails);
      } catch (error) {
        console.error("Error fetching subscription details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex bg-neutral-100">
      <div className="mx-auto max-w-lg w-full">
        {subscriptions.length === 0 ? (
        <div className="bg-white py-6 px-8 m-2 mb-4 rounded-xl shadow-lg shadow-zinc-300">
          <p className="text-left text-xl font-inter text-text2"> You have no subscriptions yet!</p>
        </div>
      ) : null}
        {subscriptions.map((sub, index) => (
          <div
            key={index}
            className="bg-white py-6 px-8 m-2 mb-4 rounded-xl shadow-lg shadow-zinc-300"
          >
            <h3 className="text-left text-3xl font-edu-tas text-text ">
              Subscription Details
            </h3>
            <div className="mb-6">
              <p className="text-gray-700">
                <strong>Restaurant:</strong> {sub.restaurant.name}
              </p>
              <p className="text-gray-700">
                <strong>Plan Type:</strong> {sub.subscription_type}
              </p>
              <p className="text-gray-700">
                <strong>Start Date:</strong>
                {new Date(sub.start_date).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                <strong>End Date:</strong>
                {new Date(sub.end_date).toLocaleDateString()}
              </p>
            </div>
            <h2 className="text-xl font-inter mb-4 text-text2">
              Weekly Specials
            </h2>
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
                  {sub.dailySpecials.length > 0 ? (
                    sub.dailySpecials.map((special, idx) => (
                      <tr key={idx} className="border-b">
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
        ))}
      </div>
    </div>
  );
};

// Helper function to convert day of week index to string
const dayOfWeek = (index) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return days[index] || "Unknown";
};

// Helper function to safely format price
const formatPrice = (price) => {
  return price && !isNaN(price) ? `$${parseFloat(price).toFixed(2)}` : "N/A";
};

export default UserShowSubscription;

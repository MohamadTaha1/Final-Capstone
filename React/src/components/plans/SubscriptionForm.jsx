import { useState } from "react";

const SubscriptionForm = () => {
  const [restaurantId, setRestaurantId] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [deliveryDays, setDeliveryDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const handleDayChange = (day) => {
    setDeliveryDays({ ...deliveryDays, [day]: !deliveryDays[day] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    console.log({ restaurantId, deliveryTime, deliveryDays });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-lg w-full max-w-2xl"
      >
        <div className="mb-6">
          <label
            htmlFor="restaurant-id"
            className="block text-gray-700 text-lg font-bold mb-2"
          >
            Restaurant ID
          </label>
          <input
            type="text"
            id="restaurant-id"
            value={restaurantId}
            onChange={(e) => setRestaurantId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
            placeholder="Enter Restaurant ID"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="delivery-time"
            className="block text-gray-700 text-lg font-bold mb-2"
          >
            Delivery Time
          </label>
          <input
            type="time"
            id="delivery-time"
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
          />
        </div>

        <fieldset className="mb-6">
          <legend className="text-gray-700 text-lg font-bold mb-2">
            Delivery Days
          </legend>
          {Object.keys(deliveryDays).map((day) => (
            <div key={day} className="mb-2">
              <input
                type="checkbox"
                id={day}
                checked={deliveryDays[day]}
                onChange={() => handleDayChange(day)}
                className="mr-2 leading-tight"
              />
              <label htmlFor={day} className="text-gray-700 text-lg">
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </label>
            </div>
          ))}
        </fieldset>

        <div className="flex justify-center">
          <a
            href="/checkout"
            type="submit"
            className="bg-primary hover:cursor-pointer hover:bg-orange-500 text-white font-bold py-2 px-4 m-3 rounded transition duration-300  ease-in-out"
          >
            Confirm
          </a>
        </div>
      </form>
    </div>
  );
};

export default SubscriptionForm;

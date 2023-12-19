import axios from "axios";

const PlansForms = () => {
  const selectedRestaurantId = localStorage.getItem("selectedRestaurantId");
  const token = localStorage.getItem("token");

  const handleSubscription = (planType) => {
    axios
      .post(
        "http://localhost:8000/api/subscribe",
        {
          restaurantId: selectedRestaurantId,
          planType, // This should be either "Basic Plan" or "Premium Plan"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Subscription successful:", response.data);
        // Additional success handling
      })
      .catch((error) => {
        console.error("Error in subscription:", error);
        // Additional error handling
      });
  };

  const plans = [
    {
      title: "Basic Plan",
      descriptions: [
        "Access to basic features",
        "Up to 10 orders per month",
        "Email support",
      ],
    },
    {
      title: "Premium Plan",
      descriptions: [
        "Access to all features",
        "Unlimited orders",
        "Priority support",
      ],
    },
  ];

  return (
    <div className="container min-h-screen mx-auto mt-20 p-4">
      <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="max-w-md mx-4 w-full md:w-6/12 mb-6 p-10 bg-neutral-100 rounded-lg shadow-md"
          >
            <h2 className="font-semibold text-lg text-primary mb-6">
              {plan.title}
            </h2>
            <div className="p-10 bg-bgc rounded-md">
              <ul className="font-inter">
                {plan.descriptions.map((description, idx) => (
                  <li key={idx} className="text-gray-800 mb-4 text-lg">
                    {idx + 1} - {description}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => handleSubscription(plan.title)}
                className="inline-block mt-4 bg-primary text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-primary-dark transition-colors"
              >
                Subscribe to {plan.title}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlansForms;

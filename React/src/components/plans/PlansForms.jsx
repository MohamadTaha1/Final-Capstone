const PlansForms = () => {
  // Example subscription plans
  const plans = [
    {
      title: "Basic Plan",
      descriptions: [
        "Access to basic features",
        "Up to 10 orders per month",
        "Email support",
        // Add more features as needed
      ],
    },
    {
      title: "Premium Plan",
      descriptions: [
        "Access to all features",
        "Unlimited orders",
        "Priority support",
        // Add more features as needed
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
            <br></br>
            <div className="flex justify-center">
              <a
                href="/checkout" // Change to your checkout page's URL
                className="inline-block bg-primary text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-primary-dark transition-colors" // Add your button styles here
              >
                Subscribe
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlansForms;

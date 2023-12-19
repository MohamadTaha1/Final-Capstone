import { useState, useEffect } from "react";

const FeedbackGrid = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/#")
      .then((response) => response.json())
      .then((data) => setFeedbacks(data))
      .catch((error) => console.error("Error fetching feedback:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className=" font-inter font-semibold text-2xl p-6 whitespace-nowrap text-primary group transition duration-300 inline-block">
        Customer Feedback
        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-gray-500"></span>
      </div>
      <div className="text-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks.map((feedback) => (
          <div
            key={feedback.id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold">
                Order ID: {feedback.orderId}
              </h3>
              <p className="text-gray-600">
                Restaurant ID: {feedback.restaurantId}
              </p>
              <p className="text-gray-600">{feedback.comment}</p>
              {/* Add more feedback details as needed */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackGrid;

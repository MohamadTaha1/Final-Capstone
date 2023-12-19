import { useState, useEffect } from "react";

const FeedbackGrid = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/feedbacks")
      .then((response) => response.json())
      .then((data) => setFeedbacks(data))
      .catch((error) => console.error("Error fetching feedback:", error));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        Customer Feedback
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {feedbacks.map((restaurantFeedback) => (
          <div key={restaurantFeedback.restaurant_id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {restaurantFeedback.restaurant_name}
              </h3>
              {restaurantFeedback.feedbacks.map((feedback, index) => (
                <div key={index} className="mb-4">
                  <p className="text-gray-700 italic">{feedback.text}</p>
                  <div className="flex items-center mt-2">
                    <div className="text-yellow-400">
                      {"★".repeat(feedback.star_rating)}
                      {"☆".repeat(5 - feedback.star_rating)}
                    </div>
                    <span className="text-gray-600 ml-2">
                      {feedback.star_rating} Stars
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackGrid;

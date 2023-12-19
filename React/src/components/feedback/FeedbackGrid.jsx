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
      <div className="font-inter font-semibold text-2xl p-6 whitespace-nowrap text-primary group transition duration-300 inline-block">
        Customer Feedback
        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-gray-500"></span>
      </div>
      {feedbacks.map((restaurantFeedback) => (
        <div key={restaurantFeedback.restaurant_id} className="mb-8 px-6">
          <h3 className="text-2xl font-edu-tas text-text2 mb-2">
            {restaurantFeedback.restaurant_name}
          </h3>
          {restaurantFeedback.feedbacks.map((feedback, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden mb-4 w-1/3 p-4"
            >
              <div className="p-6">
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
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FeedbackGrid;

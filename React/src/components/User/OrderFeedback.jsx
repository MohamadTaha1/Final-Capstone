import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const OrderFeedback = () => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const { orderId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect to login if no token is found
      return;
    }

    setLoading(true); // Start loading

    // Simulate delay and show success message
    setTimeout(() => {
      setLoading(false);
      setShowSuccessModal(true);
    }, 10000);

    const endpoint = "http://localhost:8000/api/submitReview";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ review_text: description, order_id: orderId }),
      });
      console.log("Sending POST request to:", endpoint);
      console.log(
        "Request payload:",
        JSON.stringify({ review_text: description, order_id: orderId })
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response text:", errorText);
      }
    } catch (error) {
      console.error("Error submitting description:", error);
    }
  };

  const handleSuccess = () => {
    setShowSuccessModal(false);
    navigate("/home");
  };

  return (
    <div className="flex bg-neutral-100 mt-16 min-h-screen">
      {/* Loading Screen */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 text-center">
          <div className="bg-white p-5 rounded-lg shadow-xl">
            <div className="flex flex-col justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
              <p className="text-lg font-semibold mt-4">
                Submitting your feedback...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center">
            <h3 className="text-2xl font-semibold text-green-600">Success!</h3>
            <p className="text-lg mt-2">Your review has been submitted.</p>
            <button
              onClick={handleSuccess}
              className="bg-green-500 text-white mt-4 px-6 py-2 rounded-lg shadow hover:bg-green-600 transition-colors"
            >
              Go to Home
            </button>
          </div>
        </div>
      )}

      {/* Feedback Form */}
      <div className="mx-auto max-w-lg w-full mt-12">
        <div className="bg-white py-8 px-8 m-4 rounded-xl shadow-lg shadow-zinc-300">
          <h2 className="text-4xl font-edu-tas mb-6 text-text">Feedback</h2>
          <hr />
          <br />
          <form onSubmit={handleSubmit}>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-zinc-800 rounded-lg p-5 text-lg w-full"
              placeholder="Enter your feedback here"
              rows="4"
            />
            <br />
            <button
              type="submit"
              className="inline-block bg-primary mt-6 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-primary-dark transition-colors w-full"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderFeedback;

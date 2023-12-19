import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderFeedback = () => {
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = "http://localhost:8000/api/#";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      navigate("/home");
    } catch (error) {
      console.error("Error submitting description:", error);
    }
  };

  return (
    <div className="flex bg-neutral-100 mt-16 min-h-screen">
      <div className="mx-auto max-w-lg w-full mt-12">
        <div className="bg-white py-8 px-8 m-4 rounded-xl shadow-lg shadow-zinc-300">
          <h2 className="text-4xl font-edu-tas mb-6 text-text">Feedback</h2>
          <hr/>
          <br/>
          <form onSubmit={handleSubmit}>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className=" border border-zinc-800 rounded-lg p-5 text-lg"
              placeholder="Enter your description here"
              rows="4"
              cols="35"
            />
            <br />
            <button
              type="submit"
              className="inline-block bg-primary mt-6 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-primary-dark transition-colors"
            >
              Submit Description
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderFeedback;

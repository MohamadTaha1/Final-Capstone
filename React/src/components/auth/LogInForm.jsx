import { useState } from "react";
import PrimaryButton from "../reusables/PrimaryButton";
import { useNavigate } from "react-router-dom";

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // API call logic
    const response = await fetch(`http://localhost:8000/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Response from server:", data);

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.user.role);

      // Check the user's role and navigate accordingly
      const userRole = data.user.role; // Assuming the role is part of the user object
      if (userRole === "Owner") {
        navigate("/main"); // Redirect to restaurant page
      }else if (userRole === "Delivery"){
        navigate("/delivery");
      }else{
        navigate("/"); // Redirect to landing page for customers
      }
    } else {
      // Handle errors here
      console.error("Login failed:", response.statusText);
    }
  };

  return (
    <div className="flex min-h-screen bg-neutral-100">
      <div className="m-auto max-w-lg w-full">
        <div className="bg-white p-8 rounded-xl shadow-lg shadow-zinc-300">
          <h2 className="text-3xl font-inter mb-6 text-gray-700 text-center">
            Log In
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                id="email"
                type="email" // Change type to email
                name="email"
                className="w-full p-2 font-inter border border-gray-200 rounded-md focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-300"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <input
                id="password"
                type="password"
                name="password"
                className="w-full p-2 font-inter border border-gray-200 rounded-md focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-300"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <PrimaryButton>Log In</PrimaryButton>
            </div>
          </form>
          <div className="text-center font-inter text-gray-700">
            Dont have an account?{" "}
            <a
              href="/signup"
              className="text-primary font-inter hover:underline"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInForm;

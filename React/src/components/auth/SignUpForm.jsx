import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import PrimaryButton from "../reusables/PrimaryButton";

const SignUpForm = () => {
  const [name, setUsername] = useState(""); // Changed from username to name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState(""); // Added password confirmation

  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:8000/api/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, password_confirmation: passwordConfirmation }), // Adjusted to match Laravel's expected fields
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Response from server:", data);
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.user.role);

      // Check the user's role and navigate accordingly
      navigate('/'); // Navigate to landing page on success
    } else {
      const errorData = await response.json();
      console.error("Registration failed:", errorData);
    }
  };

  //useEffect({

  //}, [])

  return (
    <div className="flex min-h-screen bg-neutral-100">
      <div className="m-auto max-w-lg w-full">
        <div className="bg-white p-8 rounded-xl shadow-lg shadow-zinc-300">
          <h2 className="text-3xl font-inter mb-6 text-gray-700 text-center">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                id="name"
                type="text"
                name="Name"
                className="w-full p-2 font-inter border border-gray-200 rounded-md focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-300"
                placeholder="name"
                value={name}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                id="email"
                type="email"
                name="email"
                className="w-full p-2 font-inter border border-gray-200 rounded-md focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-300"
                placeholder="Email Address"
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
              <input
                id="passwordConfirmation"
                type="password"
                name="passwordConfirmation"
                className="w-full p-2 font-inter border border-gray-200 rounded-md focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-300"
                placeholder="Confirm Password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <PrimaryButton>Sign Up</PrimaryButton>
            </div>
          </form>
          <div className="text-center font-inter text-gray-700">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary font-inter hover:underline"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

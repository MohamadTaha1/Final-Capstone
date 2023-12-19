import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import PrimaryButton from "../reusables/PrimaryButton";

const SignUpForm = () => {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [userRole, setUserRole] = useState("Customer"); // Default to 'customer'

  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (event) => {
    console.log("Form submitted");
    event.preventDefault();

    const response = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        location,
        password,
        password_confirmation: passwordConfirmation,
        role: userRole,
      }), // Adjusted to match Laravel's expected fields
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Response from server:", data);
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.user.role);

        if(data.user.role === "Customer"){
        navigate("/home");
        } else if(data.user.role === "Owner") {
          navigate("/owner");
        } else if(data.user.role === "Delivery") {
            navigate("/delivery");
          }
    
      // Navigate to landing page on success
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
          <h2 className="text-3xl font-inter mb-6 text-text2 text-center">
            Sign Up
          </h2>
          <hr className="m-6" />
          <form onSubmit={handleSubmit}>
            <div className="mx-6 my-4">
              <input
                id="name"
                type="text"
                name="Name"
                className="w-full p-2 font-inter border border-gray-200 rounded-md focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-300"
                placeholder="Name"
                value={name}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mx-6 my-4">
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
            <div className="mx-6 my-4">
              <input
                id="location"
                type="location"
                name="location"
                className="w-full p-2 font-inter border border-gray-200 rounded-md focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-300"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="mx-6 my-4">
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
            <div className="mx-6 my-4">
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
              {/* Radio buttons for selecting user role */}
              <div>
                <h2 className="text-lg mx-6 my-2 font-edu-tas text-primary">
                  Please select your role :{" "}
                </h2>
              </div>
              <label>
                <input
                  type="radio"
                  value="Owner"
                  className="m-2"
                  checked={userRole === "Owner"}
                  onChange={(e) => setUserRole(e.target.value)}
                />
                Owner
              </label>
              <label>
                <input
                  type="radio"
                  value="Customer"
                  className="m-2"
                  checked={userRole === "Customer"}
                  onChange={(e) => setUserRole(e.target.value)}
                />
                Customer
              </label>
              <label>
                <input
                  type="radio"
                  value="Delivery"
                  className="m-2"
                  checked={userRole === "Delivery"}
                  onChange={(e) => setUserRole(e.target.value)}
                />
                Delivery
              </label>
            </div>
            <div className="text-center mb-4">
              <PrimaryButton>Sign Up</PrimaryButton>
            </div>
          </form>
          <div className="text-center font-inter text-text2">
            Already have an account?{" "}
            <a href="/" className="text-primary font-inter hover:underline">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

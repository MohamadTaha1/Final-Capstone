import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    birthday: "1990-01-01",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); // Redirect to login if no token is found
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/api/user/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.name);
          setUser({
            ...user,
            name: data.name,
            email: data.email,

            // birthday: data.birthday if you have it from the response
          });
        } else {
          console.error("Failed to fetch user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-neutral-100">
      <div className="m-auto max-w-lg w-full">
        <div className="bg-white py-8 px-8 m-4 rounded-xl shadow-lg shadow-zinc-300">
          <h2 className="text-4xl font-edu-tas mb-6 text-text">Account</h2>
          <hr className="mb-10"></hr>
          <h3 className="text-left text-3xl font-edu-tas text-text ">
            Profile
          </h3>
          <br></br>
          {/* Container for username title and username */}
          <div className="flex flex-col">
            <div>
              <div className="text-xl text-primary text-left font-edu-tas">
                Username
              </div>
              <div className="text-xl text-left font-edu-tas">{user.name}</div>
            </div>
            <div className="my-8">
              <div className="text-xl text-primary text-left font-edu-tas">
                Email
              </div>
              <div className="text-xl text-left font-edu-tas">{user.email}</div>
            </div>
            <div>
              <div className="text-xl text-primary font-edu-tas text-left">
                Date of birth
              </div>
              <div className="text-xl text-left font-edu-tas">
                {user.birthday}
              </div>
            </div>
            <br/>
            <div>
              <div className="text-xl text-primary font-edu-tas text-left">
                Location
              </div>
              <div className="text-xl text-left font-edu-tas">
                {user.location}
              </div>
            </div>
          </div>
          <br></br>
        </div>
      </div>
    </div>
  );
};

export default Profile;

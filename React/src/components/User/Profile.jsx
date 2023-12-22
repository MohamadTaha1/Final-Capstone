import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    location: "",
  });
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/"); // Redirect to login if no token is found
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
            location: data.location,

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/user/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        setEditMode(false);
        // Additional actions after successful update (e.g., show notification)
      } else {
        console.error("Failed to update profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex bg-neutral-100 mt-16">
      <div className="mx-auto max-w-lg w-full">
        <div className="bg-white py-8 px-8 m-4 rounded-xl shadow-lg shadow-zinc-300">
          <h2 className="text-4xl font-edu-tas mb-6 text-text">Account</h2>
          <hr className="mb-10"></hr>
          <h3 className="text-left text-3xl font-edu-tas text-text ">
            Profile
          </h3>
          <br></br>

          {/* Profile Information Display */}
          <div className="flex flex-col">
            <div>
              <div className="text-xl text-primary text-left font-edu-tas">
                Username
              </div>
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-2 text-xl w-full"
                />
              ) : (
                <div className="text-xl text-left font-edu-tas">{user.name}</div>
              )}
            </div>

            <div className="my-8">
              <div className="text-xl text-primary text-left font-edu-tas">
                Email
              </div>
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-2 text-xl w-full"
                />
              ) : (
                <div className="text-xl text-left font-edu-tas">{user.email}</div>
              )}
            </div>

            <div>
              <div className="text-xl text-primary font-edu-tas text-left">
                Location
              </div>
              {editMode ? (
                <input
                  type="text"
                  name="location"
                  value={user.location}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-2 text-xl w-full"
                />
              ) : (
                <div className="text-xl text-left font-edu-tas">{user.location}</div>
              )}
            </div>
          </div>
          <br></br>

          {/* Edit and Save Button */}
          {editMode ? (
            <button
              onClick={handleSave}
              className="bg-primary text-white font-edu-tas py-2 px-4 rounded-lg mt-4"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-primary text-white font-edu-tas py-2 px-4 rounded-lg mt-4"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
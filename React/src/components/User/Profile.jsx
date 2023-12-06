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
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirect to login if no token is found
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/api/user/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.name)
          setUser({ 
            ...user,
            name: data.name,
            email: data.email
            
            // birthday: data.birthday if you have it from the response
          });
        } else {
          console.error('Failed to fetch user data:', response.statusText);
          
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-neutral-100">
      <div className="m-auto max-w-lg w-full">
        <div className="bg-white py-8 px-8 m-4 rounded-xl shadow-lg shadow-zinc-300">
          <h2 className="text-4xl font-edu-tas mb-6 text-gray-700 font-semibold">
            Account
          </h2>
          <hr className="mb-10"></hr>
          <h3 className="text-left text-3xl font-edu-tas text-gray-700 font-semibold">
            Profile
          </h3>
          <br></br>
          {/* Container for username title and username */}
          <div className="flex flex-col">
            <div>
              <div className="text-xl text-primary text-left">Username</div>
              <div className="text-xl text-left">{user.name}</div>
            </div>
            <div className="my-8">
              <div className="text-xl text-primary text-left">Email</div>
              <div className="text-xl text-left">{user.email}</div>
            </div>
            <div>
              <div className="text-xl text-primary  text-left">
                Date of birth
              </div>
              <div className="text-xl text-left">{user.birthday}</div>
            </div>
          </div>
          <br></br>
          <hr className="mb-10"></hr>
          <div className="text-left text-3xl font-edu-tas text-gray-700 font-semibold">
            Application
          </div>
          <br></br>
          <div className="text-left font-edu-tas text-gray-700 text-2xl">
            Ready to start cooking? We will need some information about your home
            restaurant first.
          </div>
          <button
            onClick={() => navigate("/apply-chef")}
            className="text-xl px-6 py-2 border border-transparent font-medium rounded-md text-white bg-primary hover:bg-opacity-75 mt-8"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

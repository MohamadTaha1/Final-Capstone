import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="bg-red-600 p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">Delivery Dashboard</h1>
      <button
        onClick={handleLogout}
        className="transition duration-300 ease-in-out bg-white text-red-600 font-bold py-2 px-4 rounded hover:bg-red-500 hover:text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;

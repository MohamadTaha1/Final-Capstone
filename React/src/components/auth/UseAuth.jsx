import { Navigate } from "react-router-dom";

const useAuth = () => {
    const token = localStorage.getItem("token");
    return token != null; // Returns true if token exists
  };

  export const useAuthRole = () => {
    const role = localStorage.getItem("role");
    return role; // Returns the user's role
};
  

  // eslint-disable-next-line react/prop-types
  export const ProtectedRoute = ({ children, role }) => {
    const isAuthenticated = useAuth();
    const userRole = useAuthRole();
  
    if (!isAuthenticated || userRole !== role) {
      // User not authenticated or doesn't have the required role, redirect to login
      return <Navigate to="/login" />;
    }
  
    return children; // User authenticated and has the required role
  };
  
  
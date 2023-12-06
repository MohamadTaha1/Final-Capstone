import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./features/auth/LogIn";
import SignUp from "./features/auth/SignUp";
import Landing from "./features/Landing/Landing";
import ProfilePage from "./features/User/ProfilePage";
import Checkout from "./components/checkout/Checkout";
import Main from "./features/adminChef/Main";
import RestaurantDetail from "./components/auth/RestaurantDetail";
import EditRestaurant from "./components/auth/EditRestaurant";
import { ProtectedRoute } from "./components/auth/UseAuth";
import RestaurantDisplay from "./features/restaurant/RestaurantDisplay";
import OrderPage from "./features/User/OrdersPage";
import Delivery from "./features/delivery/DeliveryOrders";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />

        {/* Protected routes for customers */}
        <Route path="/profile" element={
          <ProtectedRoute role="Customer">
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/checkout" element={
          <ProtectedRoute role="Customer">
            <Checkout />
          </ProtectedRoute>
        } />

        <Route path="/orders" element={
          <ProtectedRoute role="Customer">
            <OrderPage />
          </ProtectedRoute>
        } />

        {/* Protected routes for owners */}
        <Route path="/main" element={
          <ProtectedRoute role="Owner">
            <Main />
          </ProtectedRoute>
        } />
        <Route path="/edit-restaurant/:id" element={
          <ProtectedRoute role="Owner">
            <EditRestaurant />
          </ProtectedRoute>
        } />
        <Route path="/restaurant-details/:id" element={
          <ProtectedRoute role="Owner">
            <RestaurantDetail />
          </ProtectedRoute>
        } />

        <Route path="/restaurant/:id" element={ 
          <ProtectedRoute role="Customer">
            <RestaurantDisplay />
          </ProtectedRoute>} />
        {/* Add other routes as needed */}

        <Route path="/delivery" element={<Delivery />} />
      </Routes>

      

    </BrowserRouter>
  );
}

export default App;

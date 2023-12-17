import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./features/auth/LogIn";
import SignUp from "./features/auth/SignUp";
import ProfilePage from "./features/User/ProfilePage";
import Checkout from "./features/checkout/Checkout";
import ChefDashboard from "./features/adminChef/ChefDashboard";
import RestaurantDetail from "./components/restaurant/RestaurantDetail";
import { ProtectedRoute } from "./components/auth/UseAuth";
import RestaurantDisplay from "./features/restaurant/RestaurantDisplay";
import OrderPage from "./features/delivery/OrdersPage";
import LandingPage from "./features/Landing/LandingPage";
import PlansPage from "./features/plans/PlansPage";
import SubscribePage from "./features/plans/SubscribePage";
import ApplyPage from "./features/User/ApplyPage";
import DeliveryDashboard from "./features/DeliveryGuy.jsx/DeliveryDashboard";
import EditResto from "../src/features/adminChef/EditResto";
import AddDish from "./features/adminChef/AddDish";
import EditDish from "./components/delivery/EditDish";
import DisplayDailySpecials from "./features/dailySpecials/DailySpecialsPage";
import MenuPage from "./features/adminChef/MenuPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<LogIn />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/subscribe" element={<SubscribePage />} />
        <Route path="/home" element={<LandingPage />} />

        {/* Protected routes for customers */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute role="Customer">
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute role="Customer">
              <LandingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute role="Customer">
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute role="Customer">
              <OrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/apply"
          element={
            <ProtectedRoute role="Customer">
              <ApplyPage />
            </ProtectedRoute>
          }
        />

        {/* Protected routes for owners */}
        <Route
          path="/owner"
          element={
            <ProtectedRoute role="Owner">
              <ChefDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dish"
          element={
            <ProtectedRoute role="Owner">
              <AddDish />
            </ProtectedRoute>
          }
        />
        <Route
          path="/menu"
          element={
            <ProtectedRoute role="Owner">
              <MenuPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-restaurant/:id"
          element={
            <ProtectedRoute role="Owner">
              <EditResto />
            </ProtectedRoute>
          }
        />
        <Route path="/edit-dish/:dishId" element={<EditDish />} />

        <Route
          path="/restaurant-details/:id"
          element={
            <ProtectedRoute role="Owner">
              <RestaurantDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/restaurant/:id"
          element={
            <ProtectedRoute role="Customer">
              <RestaurantDisplay />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dailys"
          element={
            <ProtectedRoute role="Owner">
              <DisplayDailySpecials />
            </ProtectedRoute>
          }
        />
        {/* Add other routes as needed */}

        <Route path="/delivery" element={<DeliveryDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./features/auth/LogIn";
import SignUp from "./features/auth/SignUp";
import ProfilePage from "./features/User/ProfilePage";
import Checkout from "./features/checkout/Checkout";
import Main from "./features/adminChef/Main";
import RestaurantDetail from "./components/restaurant/RestaurantDetail";
import EditRestaurant from "./components/restaurant/EditRestaurant";
import { ProtectedRoute } from "./components/auth/UseAuth";
import RestaurantDisplay from "./features/restaurant/RestaurantDisplay";
import OrderPage from "./features/delivery/OrdersPage";
import Delivery from "./features/delivery/DeliveryOrders";
import LandingPage from "./features/Landing/LandingPage";
import PlansPage from "./features/plans/PlansPage";
import SubscribePage from "./features/plans/SubscribePage";
import ApplyPage from "./features/User/ApplyPage";
import EditDish from "./components/delivery/EditDish";
import DisplayDailySpecials from "./features/dailySpecials/DailySpecialsPage";

// ...


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/subscribe" element={<SubscribePage />} />

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
          path="/"
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
          path="/main"
          element={
            <ProtectedRoute role="Owner">
              <Main />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-restaurant/:id"
          element={
            <ProtectedRoute role="Owner">
              <EditRestaurant />
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

        <Route path="/dailys" element={
          <ProtectedRoute role="Owner">
            <DisplayDailySpecials />
          </ProtectedRoute>
        } />
        {/* Add other routes as needed */}

        <Route path="/delivery" element={<Delivery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

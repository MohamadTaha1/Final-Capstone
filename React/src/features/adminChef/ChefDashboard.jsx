import AdminNav from "../../components/AdminComponents/AdminNav";
import AdminPanel from "../../components/AdminComponents/AdminPanel";
import Orders from "../../components/delivery/Orders";
import Footer from "../../components/reusables/Footer";
import RestaurantDetail from "../../components/restaurant/RestaurantDetail";

const ChefDashboard = () => {
  return (
    <>
      <AdminNav />
      <AdminPanel />
      <RestaurantDetail/>
      <Orders/>
      <Footer />
    </>
  );
};

export default ChefDashboard;

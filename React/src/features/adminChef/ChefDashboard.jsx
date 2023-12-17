import AdminNav from "../../components/AdminComponents/AdminNav";
import AdminPanel from "../../components/AdminComponents/AdminPanel";
import Orders from "../../components/delivery/Orders";
import Footer from "../../components/reusables/Footer";

const ChefDashboard = () => {
  return (
    <>
      <AdminNav />
      <AdminPanel />
      <Orders/>
      <Footer />
    </>
  );
};

export default ChefDashboard;

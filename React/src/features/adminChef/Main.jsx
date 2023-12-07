import Main from "../../components/auth/AdminPanel";
import RestaurantDetail from "../../components/restaurant/RestaurantDetail";
import Orders from "../../components/delivery/Orders";

const Admin = () => {
  return (
    <>
      <Main />
      <RestaurantDetail />
      <Orders />
    </>
  );
};

export default Admin;

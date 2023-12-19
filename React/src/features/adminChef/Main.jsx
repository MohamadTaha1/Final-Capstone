import Main from "../../components/auth/AdminPanel";
import RestaurantDetail from "../../components/restaurant/RestaurantDetail";
import Orders from "../../components/delivery/Orders";
//import ManageDailySpecials from "../../components/plans/ChefDailySpecials";
import { useParams } from 'react-router-dom';


const Admin = () => {
  const { restaurantId } = useParams();
  return (
    <>
      <Main />
      <RestaurantDetail restaurantId={restaurantId} />
      <Orders />
    </>
  );
};

export default Admin;

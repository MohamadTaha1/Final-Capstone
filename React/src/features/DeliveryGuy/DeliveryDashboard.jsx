import DeliveryNav from "../../components/DeliveryGuyComponents/DeliveryNav";
import ShowOrders from "../../components/DeliveryGuyComponents/ShowOrders";
import Footer from "../../components/reusables/Footer";
const DeliveryDashboard = () => {
  return (
    <>
      <DeliveryNav />
      <ShowOrders />
      <Footer />
    </>
  );
};

export default DeliveryDashboard;

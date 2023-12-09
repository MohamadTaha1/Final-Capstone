import Footer from "../../components/reusables/Footer";
import Navbar from "../../components/reusables/Navbar";
import OrderDetails from "../../components/delivery/OrderDetails";
import OrderHeader from "../../components/welcomer/OrderHeader";

const OrderPage = () => {
  return (
    <>
      <Navbar />
      <OrderHeader />
      <OrderDetails />
      <Footer />
    </>
  );
};

export default OrderPage;

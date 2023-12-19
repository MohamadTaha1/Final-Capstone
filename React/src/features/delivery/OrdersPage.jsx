import  { useEffect, useState } from 'react';
import Navbar from "../../components/reusables/Navbar";
import OrderDetails from "../../components/delivery/OrderDetails";
import OrderHeader from "../../components/welcomer/OrderHeader";
import Footer from "../../components/reusables/Footer";
import SubscriptionDetails from "../../components/plans/UserShowSubscription";


const OrderPage = () => {
  const [userSubscription] = useState(null);

  useEffect(() => {
    // Replace this with your actual fetch call
    const fetchSubscription = async () => {
      // Fetch the subscription data and set it to state
      // Example: setUserSubscription(fetchedData);
    };

    fetchSubscription();
  }, []);

  return (
    <>
      <Navbar />
      <OrderHeader />
      <OrderDetails />
      <SubscriptionDetails subscription={userSubscription} />
      <Footer />
    </>
  );
};

export default OrderPage;

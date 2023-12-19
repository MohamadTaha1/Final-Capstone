import Footer from "../../components/reusables/Footer";
import Navbar from "../../components/reusables/Navbar";
import Profile from "../../components/User/Profile";
import UserShowSubscription from "../../components/plans/UserShowSubscription";

const ProfilePage = () => {
  return (
    <>
      <Navbar />
      <Profile />
      <UserShowSubscription />
      <Footer />
    </>
  );
};

export default ProfilePage;

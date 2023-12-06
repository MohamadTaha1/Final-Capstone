import Footer from "../../components/reusables/Footer";
import LogInForm from "../../components/auth/LogInForm";
import NavbarLoggedOut from "../../components/reusables/NavbarLoggedOut";
const LogIn = () => {
  return (
    <>
      <NavbarLoggedOut />
      <LogInForm />
      <Footer />
    </>
  );
};

export default LogIn;

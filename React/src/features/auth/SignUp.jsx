import Footer from "../../components/reusables/Footer";
import SignUpForm from "../../components/auth/SignUpForm";
import NavbarLoggedOut from "../../components/reusables/NavbarLoggedOut";

const SignUp = () => {
  return (
    <>
      <NavbarLoggedOut />
      <SignUpForm />
      <Footer />
    </>
  );
};

export default SignUp;

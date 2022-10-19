import { useState } from "react";
import LoginForm from "../../components/loginForm";
import SignupForm from "../../components/signupForm";
import AuthFooter from "../../components/authFooter";
import AuthHero from "../../components/authHero";
import MobileAuthHero from "../../components/mobileAuthHero";

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  const changeAuthForm: () => void = () => {
    setShowLogin((showLogin) => !showLogin);
  };

  return (
    <>
      <section className="flex ">
        <AuthHero />
        <div className=" w-full xl:w-1/2 min-h-screen flex flex-col justify-between">
          <MobileAuthHero />
          {showLogin ? (
            <LoginForm changeAuthForm={changeAuthForm} />
          ) : (
            <SignupForm changeAuthForm={changeAuthForm} />
          )}
          <AuthFooter />
        </div>
      </section>
    </>
  );
};

export default AuthPage;

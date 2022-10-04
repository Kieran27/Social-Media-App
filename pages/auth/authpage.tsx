import { useState } from "react";
import LoginForm from "../../components/loginForm";
import SignupForm from "../../components/signupForm";
import AuthFooter from "../../components/authFooter";
import Image from "next/image";
import BirdImage from "../../assets/birb.svg";
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
          {/* 
          <div className="absolute h-16 w-full bottom-0 bg-emerald-100 xl:hidden flex items-center justify-center">
            <Image
              className=" "
              src={BirdImage}
              alt="Picture of bird"
              width={50}
              height={50}
            />
            Birber Talk with your friends
          </div>
            */}
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

import { useState } from "react";
import LoginForm from "../../components/loginForm";
import SignupForm from "../../components/signupForm";
import Image from "next/image";
import BirdImage from "../../assets/birb.svg";

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  const changeAuthForm: () => void = () => {
    setShowLogin((showLogin) => !showLogin);
  };

  return (
    <>
      <section className="flex overflow-hidden">
        <div className="slanted hidden xl:flex items-center min-h-full justify-center w-1/2 flex-col bg-emerald-100 relative">
          <div className="w-1/6 h-full absolute right-0 top-0 skew-x-12 bg-emerald-100 "></div>
          <div className="w-1/6 h-full absolute right-0 top-0 -skew-x-12 bg-emerald-100 "></div>
          <h2 className="text-6xl font-bold tracking-wider">Birber</h2>
          <p className="w-1/2 text-center mt-5 text-lg mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
            voluptatum, quibusdam obcaecati voluptas id fuga repellat. Eius rem
            laudantium eaque?
          </p>
          <Image
            src={BirdImage}
            alt="Picture of bird"
            width={500}
            height={500}
          />
        </div>
        <div className=" w-full xl:w-1/2 ">
          {showLogin ? (
            <LoginForm changeAuthForm={changeAuthForm} />
          ) : (
            <SignupForm changeAuthForm={changeAuthForm} />
          )}
        </div>
      </section>
    </>
  );
};

export default AuthPage;

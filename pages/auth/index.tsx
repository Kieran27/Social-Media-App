import { useState } from "react";
import Head from "next/head";
import LoginForm from "../../components/loginForm";
import SignupForm from "../../components/signupForm";
import AuthHero from "../../components/authHero";
import MobileAuthHero from "../../components/mobileAuthHero";

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  const changeAuthForm: () => void = () => {
    setShowLogin((showLogin) => !showLogin);
  };

  return (
    <>
      <Head>
        <title>Birb Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="flex ">
        <AuthHero />
        <div className=" w-full xl:w-1/2 min-h-screen flex flex-col justify-between">
          <MobileAuthHero />
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

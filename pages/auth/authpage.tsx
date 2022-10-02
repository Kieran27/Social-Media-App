import { useState } from "react";
import LoginForm from "../../components/loginForm";
import SignupForm from "../../components/signupForm";

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  const changeAuthForm: () => void = () => {
    setShowLogin((showLogin) => !showLogin);
  };

  return (
    <>
      {showLogin ? (
        <LoginForm changeAuthForm={changeAuthForm} />
      ) : (
        <SignupForm changeAuthForm={changeAuthForm} />
      )}
    </>
  );
};

export default AuthPage;

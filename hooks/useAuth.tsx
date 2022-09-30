import { createContext, useContext, useEffect, useState } from "react";
import login from "../frontend - lib/axiosCalls/login";
import { useRouter } from "next/router";
import axios from "axios";

/* 
Custom hook wrapping context provider to handle auth
functions - login, signup and logout.
*/

const AuthContext = createContext<string | null>(null);

// wrapper for the provider

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [errorsArray, setErrorsArray] = useState(null);
  const [user, setUser] = useState(null);

  const router = useRouter();
  // Handle login
  const login = async (email: string, password: string) => {
    try {
      const user = await login(email, password);
    } catch (error: any) {
      setErrorMessage(error);
    }
    // Retrieve refresh token

    return "logged in!";
  };

  const signup = (
    email: string,
    username: string,
    password: string,
    passwordConfirm: string
  ) => {
    return true;
  };

  const logout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    // Remove userToken from state variable
    setUser(null);
    // Redirect to login/auth page
    router.push("/login");
  };

  // Check on initial render if accessToken exists - if so set User
  useEffect(() => {
    const persistentUser = localStorage.getItem("token");
    if (persistentUser) {
      const parsedUserData = JSON.parse(persistentUser);
      setUser(parsedUserData);
    }
  }, []);

  return (
    <AuthContext.Provider value={"hello world"}>
      {children}
    </AuthContext.Provider>
  );
};

// Export custom hook
export const useAuth = () => useContext(AuthContext);

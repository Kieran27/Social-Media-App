import { createContext, useContext, useEffect, useState } from "react";
import login from "../frontend - lib/axiosCalls/login";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import axios from "axios";

/* 
Custom hook wrapping context provider to handle auth
functions - login, signup and logout.
*/

interface AppContext {
  login?: (email: string, password: string) => void;
}

const AuthContext = createContext<AppContext | null>(null);

// wrapper for the provider

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [user, setUser] = useState(null);

  const router = useRouter();
  // Handle login
  const login = (email: string, password: string) => {
    console.log("login");
    // Retrieve refresh token
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
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
};

// Export custom hook
export const useAuth = () => useContext(AuthContext);

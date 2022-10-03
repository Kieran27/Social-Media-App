import { createContext, useContext, useEffect, useState } from "react";
import login from "../frontend - lib/axiosCalls/login";
import { useRouter } from "next/router";

/* 
Custom hook wrapping context provider to handle auth
functions - login, signup and logout.
*/

type AppContext = {
  handleLogin: HandleLogin;
  logout: HandleLogout;
};

type HandleLogin = (data: any) => void;
type HandleLogout = () => void;

const AuthContext = createContext<AppContext>({} as AppContext);

// wrapper for the provider

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);

  const router = useRouter();

  // Handle login
  const handleLogin: HandleLogin = async (userData: any) => {
    // save response in state
    setUser(userData);
    // save response in local Storage after stringifying it
    localStorage.setItem("token", JSON.stringify(userData));
    // Redirect to home page
    router.push("/home");
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
    <AuthContext.Provider value={{ handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export custom hook
export const useAuth = () => useContext(AuthContext);

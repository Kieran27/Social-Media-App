import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext<string | null>(null);

// wrapper for the provider

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  // Handle login
  const login = (email: string, password: string) => {
    // Retrieve refresh token

    return "logged in!";
  };

  return (
    <AuthContext.Provider value={"hello world"}>
      {children}
    </AuthContext.Provider>
  );
};
// custom hook
export const useAuth = () => useContext(AuthContext);

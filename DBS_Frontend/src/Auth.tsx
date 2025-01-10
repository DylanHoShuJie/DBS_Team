import React, { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";

// Define the context value type
interface AuthContextType {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  email: string | null;
  setEmail: Dispatch<SetStateAction<string | null>>;
  loading: boolean;
}

// Create the context with an initial value of `undefined`
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the AuthProvider props
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("email");
    console.log("Stored email is " + storedEmail);
    console.log("Stored token is " + storedToken);
    setToken(storedToken);
    setEmail(storedEmail);
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, loading, email, setEmail }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

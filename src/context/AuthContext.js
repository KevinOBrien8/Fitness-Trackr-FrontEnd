import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext();

// children in this case will be our entire application
export default function AuthProvider({ children }) {
  const [token, setToken] = useState(""); // if the empty string is found, we'll be logged out
  const [shouldUpdate, setShouldUpdate] = useState(false);

  useEffect(() => {
    // retrieve token from localStorage
    setToken(localStorage.st_token || "");
  }, [shouldUpdate]);

  const updateAuthStatus = () => setShouldUpdate(!shouldUpdate);

  const logout = () => {
    delete localStorage.st_token;
    updateAuthStatus();
  };

  const providerValue = {
    token,
    isLoggedIn: !!token,
    updateAuthStatus,
    logout,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (username) => {
    localStorage.setItem('user', username);
    setIsLoggedIn(true);
    console.log("Logged In")
  };

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    console.log("Logged Out")
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

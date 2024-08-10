import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    if (user && storedToken) {
      setIsLoggedIn(true);
      setRole(storedRole);
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = (username, userRole, userToken) => {
    localStorage.setItem('user', username);
    localStorage.setItem('role', userRole);
    localStorage.setItem('token', userToken); // Store token here
    setIsLoggedIn(true);
    setRole(userRole);
    setToken(userToken); // Update token state
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setRole(null);
    setToken(null); // Clear token state
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

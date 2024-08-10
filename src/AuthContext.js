import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    console.log('Checking auth state:', { user, token }); // Debugging log
    if (user && token) {
      setIsLoggedIn(true);
    }
    setLoading(false); // Set loading to false after checking
  }, []);

  const login = (username) => {
    localStorage.setItem('user', username);
    setIsLoggedIn(true);
    console.log("Logged In");
  };

  const logout = () => {
    // Remove only the user and token Save the view state 
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
        
    setIsLoggedIn(false);
    
    console.log("Logged Out");
};


  // Prevent rendering children until loading is complete
  if (loading) {
    return <div>Loading...</div>; // You can customize this loading indicator
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};


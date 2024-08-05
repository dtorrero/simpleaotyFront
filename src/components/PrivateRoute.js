import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const PrivateRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();
  console.log('PrivateRoute isLoggedIn:', isLoggedIn); // Debugging log

  return isLoggedIn ? element : <Navigate to="/login" />;
};

export default PrivateRoute;


import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const RAdminRoute = ({ element }) => {
  const { isLoggedIn, role } = useAuth();
  
  if (!isLoggedIn || role !== "SUPERADMIN") {
    return <Navigate to="/" />; // Redirect to home if not admin
  }

  return element;
};

export default RAdminRoute;

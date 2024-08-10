import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const AdminRoute = ({ element }) => {
  const { isLoggedIn, role } = useAuth();

  if (!isLoggedIn || role !== 'admin') {
    return <Navigate to="/" />; // Redirect to home if not admin
  }

  return element;
};

export default AdminRoute;

// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component }) => {
  const user = useSelector((state) => state.user.user); // Adjust path if necessary

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Component />;
};

export default ProtectedRoute;

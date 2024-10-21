import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

const ProtectedRoute = ({ element }) => {
  const { state } = useAuth();
  const token = state.token || localStorage.getItem('token'); 

  // If there's no token, redirect to /auth/login
  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  // If there's a token, render the requested element
  return element;
};

export default ProtectedRoute;

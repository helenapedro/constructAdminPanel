import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Selector to check if user is authenticated from authSlice
const selectIsAuthenticated = (state) => !!state.auth.user;

const ProtectedRoute = ({ element }) => {
  // Access the authentication status from Redux store
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Render the protected element if authenticated, else navigate to login
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

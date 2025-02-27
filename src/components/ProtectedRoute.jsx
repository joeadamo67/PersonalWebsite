import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// This component protects routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  
  // If not authenticated, redirect to login page
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  // If authenticated, render the protected content
  return children;
};

export default ProtectedRoute;
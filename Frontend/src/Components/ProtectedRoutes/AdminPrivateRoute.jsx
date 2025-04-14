import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminPrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')); 
  
  // Check if there's a valid token and if the user is an admin
  if (!token || !user || !user.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children; // Render the children if the user is an admin
};

export default AdminPrivateRoute;

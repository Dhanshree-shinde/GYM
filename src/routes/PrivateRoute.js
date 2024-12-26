import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const PrivateRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  console.log(token,role);

  // Check if the token exists
  if (!token) {
    console.log("No token found. Redirecting to login...");
    return <Navigate to="/login" />;
  }

  try {
    // Decode and validate the token
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      console.log("Token expired. Redirecting to login...");
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.error("Invalid token. Redirecting to login...");
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    return <Navigate to="/login" />;
  }

  // Check for role mismatch
  if (role.toLowerCase() !== allowedRole.toLowerCase()) {
    console.log(`Role mismatch: Expected ${allowedRole}, but got ${role}`);
    return <Navigate to="/unauthorized" />;
  }

  console.log("Access granted. Rendering children...");
  return children;
};

export default PrivateRoute;

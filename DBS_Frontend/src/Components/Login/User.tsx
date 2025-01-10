import React, { useContext } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Auth';

const User = () => {


  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const navigate = useNavigate();
  const handlePostRequest = async () => {
    try {
      const sessionToken = localStorage.getItem('sessionToken'); // Retrieve the session token
  
      if (!sessionToken) {
        alert('No session token found!');
        return;
      }
  
      const response = await axios.post(
        'http://localhost:3000/protected', // Endpoint
        {}, // Body of the POST request (empty if not needed)
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`, // Attach the Bearer token
            'Content-Type': 'application/json', // Specify content type
          },
        }
      );
  
      console.log('POST request successful:', response.data);
      alert('POST request successful!');
    } catch (error) {
      console.error('Error with POST request:', error.response?.data || error.message);
      alert('Failed to perform POST request.');
    }
  };

  // Handle logout action
  const handleLogout = async () => {
    try {
      const sessionToken = localStorage.getItem('sessionToken'); // Retrieve session token from storage

      if (!sessionToken) {
        alert('No session token found!');
        return;
      }

      const response = await axios.post(
        'http://localhost:3000/api/auth/logout',
        { sessionToken },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Logout successful:', response.data);
      alert('Logout successful!');

      // Clear session token and redirect to login page
      localStorage.removeItem('sessionToken');
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      alert('Failed to log out.');
    }
  };

  return (
    <div>
      <h1>This is a protected place!</h1>
      <button onClick={handlePostRequest}>Trigger POST Request</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default User;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../../css/UserDetailPage.css';; // External CSS for styling

function UserDetailPage({ clientId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/single-user-detail/${clientId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [clientId]); // This effect runs whenever clientId changes

  if (!user) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="user-detail-container">
      <h1 className="user-detail-heading">User Details</h1>
      <div className="user-detail-card">
        <div className="user-detail-item">
          <strong>Name:</strong> {user.name}
        </div>
        <div className="user-detail-item">
          <strong>Email:</strong> {user.email}
        </div>
        <div className="user-detail-item">
          <strong>Phone Number:</strong> {user.phone_number}
        </div>
        <div className="user-detail-item">
          <strong>Weight:</strong> {user.weight} kg
        </div>
        <div className="user-detail-item">
          <strong>Height:</strong> {user.height} cm
        </div>
        <div className="user-detail-item">
          <strong>Date of Birth:</strong> {new Date(user.date_of_birth).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

export default UserDetailPage;

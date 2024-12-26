import React, { useState, useEffect } from 'react';
import '../../css/Account.css';
import axios from 'axios';

const Account = () => {
  const clientId = localStorage.getItem('id');
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone_number: '',
    height: '',
    weight: '',
    date_of_birth: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/single-user-detail/${clientId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.error('Error fetching user data:', err);
      });
  }, [clientId]);

  const handleChange = (field, value) => {
    setUser({
      ...user,
      [field]: value,
    });
  };

  const handleSave = () => {
    setLoading(true);
    axios
      .post('http://localhost:3001/save-client-info', { clientId, user })
      .then(() => {
        alert('Information Saved!');
        setIsEditing(false); // Exit editing mode
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error saving client information:', error);
        setLoading(false);
        alert('Error saving client information.');
      });
  };

  console.log(user);

  if(!user.email)
  return <div></div>;


  return (

    <div className="account-container">
      <h1 className="account-header">Account</h1>
      <div className="account-content">
        {/* Profile Card */}
        <div className="profile-card">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="profile-picture"
          />
          <h2 className="profile-name">{user.name}</h2>
          <button className="upload-button">Upload Picture</button>
        </div>

        {/* Editable Profile Form */}
        <div className="profile-form">
          <h2 className="form-header">Profile</h2>
          <p className="form-subheader">The information can be edited</p>
          <form>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  value={user.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={user.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  value={user.phone_number}
                  onChange={(e) => handleChange('phone_number', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="height">Height</label>
                <input
                  type="number"
                  id="height"
                  value={user.height}
                  onChange={(e) => handleChange('height', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label htmlFor="date_of_birth">Date of Birth</label>
                <input
                  type="date"
                  id="date_of_birth"
                  value={ new Date(user.date_of_birth).toISOString().split('T')[0]}
                  onChange={(e) => handleChange('date_of_birth', new Date(e.target.value).toISOString().split('T')[0])}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="weight">Weight (kg)</label>
                <input
                  type="number"
                  id="weight"
                  value={user.weight}
                  onChange={(e) => handleChange('weight', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              disabled={loading}
              className="save-button"
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;

// Account.js
import React from 'react';
import '../css/Account.css';

const Account = () => {
  return (
    <div className="account-container">
      <h1 className="account-header">Account</h1>
      <div className="account-content">
        <div className="profile-card">
          <img 
            src="https://via.placeholder.com/150" 
            alt="Profile" 
            className="profile-picture"
          />
          <h2 className="profile-name">Sofia Rivers</h2>
          <p className="profile-location">Los Angeles USA</p>
          <p className="profile-gtm">GTM-7</p>
          <button className="upload-button">Upload picture</button>
        </div>

        <div className="profile-form">
          <h2 className="form-header">Profile</h2>
          <p className="form-subheader">The information can be edited</p>
          <form>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First name *</label>
                <input type="text" id="firstName" defaultValue="Sofia" />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last name *</label>
                <input type="text" id="lastName" defaultValue="Rivers" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email address *</label>
                <input type="email" id="email" defaultValue="sofia@devias.io" />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone number</label>
                <input type="text" id="phone" placeholder="" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="state">State</label>
                <select id="state">
                  <option value="">Select</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input type="text" id="city" placeholder="" />
              </div>
            </div>
            <button type="submit" className="save-button">Save details</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;

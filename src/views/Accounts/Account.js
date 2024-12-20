// import React from 'react';
// import '../../css/Account.css';

// const Account = () => {
//   return (
//     <div className="account-container">
//       <h1 className="account-header">Account</h1>
//       <div className="account-content">
//         {/* Profile Card */}
//         <div className="profile-card">
//           <img 
//             src="https://via.placeholder.com/150" 
//             alt="Profile" 
//             className="profile-picture"
//           />
//           <h2 className="profile-name">Sofia Rivers</h2>
//           <p className="profile-location">Los Angeles, USA</p>
//           <p className="profile-gtm">GTM-7</p>
//           <button className="upload-button">Upload Picture</button>
//         </div>

//         {/* Editable Profile Form */}
//         <div className="profile-form">
//           <h2 className="form-header">Profile</h2>
//           <p className="form-subheader">The information can be edited</p>
//           <form>
//             <div className="form-row">
//               <div className="form-group">
//                 <label htmlFor="firstName">First Name *</label>
//                 <input type="text" id="firstName" defaultValue="Sofia" />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="lastName">Last Name *</label>
//                 <input type="text" id="lastName" defaultValue="Rivers" />
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label htmlFor="email">Email Address *</label>
//                 <input type="email" id="email" defaultValue="sofia@devias.io" />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="phone">Phone Number</label>
//                 <input type="text" id="phone" placeholder="" />
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label htmlFor="state">State</label>
//                 <select id="state">
//                   <option value="">Select</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label htmlFor="city">City</label>
//                 <input type="text" id="city" placeholder="" />
//               </div>
//             </div>
//             <button type="submit" className="save-button">Save Details</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Account;


import React from 'react';
import '../../css/Account.css';

const Account = () => {
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
          <h2 className="profile-name">Sofia Rivers</h2>
          <p className="profile-location">Los Angeles, USA</p>
          <p className="profile-gtm">GTM-7</p>
          <button className="upload-button">Upload Picture</button>
        </div>

        {/* Editable Profile Form */}
        <div className="profile-form">
          <h2 className="form-header">Profile</h2>
          <p className="form-subheader">The information can be edited</p>
          <form>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input type="text" id="firstName" defaultValue="Sofia" />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input type="text" id="lastName" defaultValue="Rivers" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input type="email" id="email" defaultValue="sofia@devias.io" />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
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
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select id="gender">
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input type="number" id="age" placeholder="Enter your age" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="weight">Weight (kg)</label>
                <input type="number" id="weight" placeholder="Enter your weight" />
              </div>
            </div>
            <button type="submit" className="save-button">Save Details</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;

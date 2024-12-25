// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// function UserDetailPage() {
//   const { clientId } = useParams();  // Extract clientId from URL
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Fetch user data from the database using clientId
//     axios
//       .get(`http://localhost:3001/single-user-detail/${clientId}`)
//       .then((response) => {
//         setUser(response.data); // Update user state with fetched data
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   }, [clientId]); // Dependency array ensures this effect runs when clientId changes

//   if (!user) {
//     // While user data is being fetched, show a loading message
//     return (
//       <div style={{ textAlign: 'center', marginTop: '50px' }}>
//         <h2>Loading...</h2>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
//       <h1 style={{ textAlign: 'center', color: '#333' }}>User Details</h1>
//       <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
//         {/* <img src={user.photo_url} alt={user.name} width={150} height={150} style={{ borderRadius: '50%', marginRight: '15px' }} /> */}
//         <div>
//           <h2 style={{ margin: '0', color: '#555' }}>{user.name}</h2>
//           <p style={{ margin: '0', fontSize: '14px', color: '#777' }}>{user.email}</p>
//         </div>
//       </div>
//       <div style={{ lineHeight: '1.5', color: '#333' }}>
//         <p><strong>Phone Number:</strong> {user.phone_number}</p>
//         <p><strong>Weight:</strong> {user.weight} kg</p>
//         <p><strong>Height:</strong> {user.height} cm</p>
//         <p><strong>Date of Birth:</strong> {new Date(user.date_of_birth).toLocaleDateString()}</p>
//       </div>
//     </div>
//   );
// }

// export default UserDetailPage;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './UserDetailPage.css'; // External CSS for styling

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

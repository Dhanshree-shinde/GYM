// import React, { useState, useEffect } from 'react';
// import '../../css/Account.css';
// import axios from 'axios';
// import {
//   TextField, Button,
// } from "@mui/material";
// const Account = () => {
//   const clientId = localStorage.getItem('id');
//   const [user, setUser] = useState({
//     name: '',
//     email: '',
//     phone_number: '',
//     height: '',
//     weight: '',
//     date_of_birth: '',
//     photo:'',
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [trainer, setTrainer] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch user details
//         const userResponse = await axios.get(`http://localhost:3001/single-user-detail/${clientId}`);
//         setUser(userResponse.data);
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//       }

//       try {
//         // Fetch trainer name
//         const trainerResponse = await axios.get(`http://localhost:3001/get-trainer-name/${clientId}`);
//         setTrainer(trainerResponse.data);
//       } catch (error) {
//         console.warn("Trainer not found or error fetching trainer:", error);
//         setTrainer(null); // Set trainer to null if not found
//       }


//     };

//     fetchData();
//   }, [clientId]);

//   const handleChange = (field, value) => {
//     setUser({
//       ...user,
//       [field]: value,
//     });
//   };
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       // Display the selected image locally (you can upload it as well)
//       setUser({["photo"]:file});
//     }
//   };

//   // Trigger the hidden file input
//   const handleUploadClick = () => {
//     document.getElementById('fileInput').click();
//   };
//   const handleSave = () => {
//     setLoading(true);
//     axios
//       .post('http://localhost:3001/save-client-info', { clientId, user })
//       .then(() => {
//         alert('Information Saved!');
//         setIsEditing(false); // Exit editing mode
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error saving client information:', error);
//         setLoading(false);
//         alert('Error saving client information.');
//       });
//   };

//   const removeTrainer = () => {
//     setLoading(true);
//     axios
//       .post('http://localhost:3001/remover-clients-trainer', { clientId })
//       .then(() => {
//         alert('Trainer removed !');
//         setIsEditing(false); // Exit editing mode
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error deleting Trainer:', error);
//         setLoading(false);
//         // alert('Error deleting trainer !!.');
//       });
//   };

//   console.log(user);

//   if (!user.email)
//     return <div></div>;


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
//           <h2 className="profile-name">{user.name}</h2>
//           {/* Hidden file input */}
//           <input
//             id="fileInput"
//             type="file"
//             style={{ display: 'none' }}
//             onChange={handleFileChange}
//           />

//           {/* Button to trigger the file input click */}
//           <button className="upload-button" onClick={handleUploadClick}>
//             Upload Picture
//           </button>
//         </div>

//         {/* Editable Profile Form */}
//         <div className="profile-form">
//           <h2 className="form-header">Profile</h2>
//           <p className="form-subheader">The information can be edited</p>
//           <form>
//             <div className="form-row">
//               <div className="form-group">
//                 <label htmlFor="name">Name *</label>

//                 <TextField
//                   sx={{ fontSize: '1rem', width: '100%' }}

//                   title="name"
//                   type="text"
//                   id="name"
//                   value={user.name}
//                   onChange={(e) => handleChange('name', e.target.value)}
//                   disabled={!isEditing}
//                 />

//               </div>
//               <div className="form-group">
//                 <label htmlFor="email">Email Address</label>


//                 <TextField
//                   sx={{ fontSize: '1rem', width: '100%' }}

//                   title="email"
//                   type="email"
//                   id="email"
//                   value={user.email}
//                   onChange={(e) => handleChange('email', e.target.value)}
//                   disabled={!isEditing}
//                 />
//               </div>
//             </div>
//             <div className="form-row">

//               <div className="form-group">
//                 <label htmlFor="phone">Phone Number</label>

//                 <TextField
//                   sx={{ fontSize: '1rem', width: '100%' }}

//                   title="Phone number"
//                   type="text"
//                   id="phone"
//                   value={user.phone_number}
//                   onChange={(e) => handleChange('phone_number', e.target.value)}
//                   disabled={!isEditing}
//                 />

//               </div>
//               <div className="form-group">
//                 <label htmlFor="date_of_birth">Date of Birth</label>
//                 <TextField
//                   sx={{ fontSize: '1rem', width: '100%' }}

//                   title="Date"
//                   type="date"
//                   disabled={!isEditing}
//                   value={user.date_of_birth}
//                   onChange={(e) => {
//                     handleChange("date_of_birth", e.target.value);
//                   }}
//                 />
//               </div>

//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label htmlFor="height">Height</label>

//                 <TextField
//                   sx={{ fontSize: '1rem', width: '100%' }}

//                   title="height"
//                   id="height"
//                   type="number"
//                   value={user.height}
//                   onChange={(e) => handleChange('height', e.target.value)}
//                   disabled={!isEditing}
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="weight">Weight (kg)</label>

//                 <TextField
//                   sx={{ fontSize: '1rem', width: '100%' }}

//                   title="weight"
//                   type="number"
//                   id="weight"
//                   value={user.weight}
//                   onChange={(e) => handleChange('weight', e.target.value)}
//                   disabled={!isEditing}
//                 />
//               </div>

//             </div>
//             <div className="form-row">
//               {
//                 trainer ? (
//                   <>
//                     <div className="form-group">
//                       <span > Trainer Name : {trainer.name}</span>
//                     </div>
//                     <div className="form-group">
//                       <Button
//                         type="button"
//                         onClick={removeTrainer}
//                       >
//                         Remove Trainer
//                       </Button>
//                     </div>

//                   </>) : (<div className="form-group">
//                     <span > No trainer Assigned </span>
//                   </div>)
//               }
//             </div>
//             <Button
//               type="button"
//               color="primary"
//               onClick={isEditing ? handleSave : () => setIsEditing(true)}
//               disabled={loading}
//               className="save-button"
//             >
//               {isEditing ? 'Save' : 'Edit'}
//             </Button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Account;


import React, { useState, useEffect } from 'react';
import '../../css/Account.css';
import axios from 'axios';
import {
  TextField, Button,
} from "@mui/material";
const Account = () => {
  const clientId = localStorage.getItem('id');
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone_number: '',
    height: '',
    weight: '',
    date_of_birth: '',
    photo:"",
  });
  const[file,setFile]=useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trainer, setTrainer] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user details
        const userResponse = await axios.get(`http://localhost:3001/single-user-detail/${clientId}`);
        setUser(userResponse.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }

      try {
        // Fetch trainer name
        const trainerResponse = await axios.get(`http://localhost:3001/get-trainer-name/${clientId}`);
        setTrainer(trainerResponse.data);
      } catch (error) {
        console.warn("Trainer not found or error fetching trainer:", error);
        setTrainer(null); // Set trainer to null if not found
      }


    };

    fetchData();
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

  const removeTrainer = () => {
    setLoading(true);
    axios
      .post('http://localhost:3001/remover-clients-trainer', { clientId })
      .then(() => {
        alert('Trainer removed !');
        setIsEditing(false); // Exit editing mode
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error deleting Trainer:', error);
        setLoading(false);
        // alert('Error deleting trainer !!.');
      });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setUser({ ...user, photo: selectedFile.name });
      setFile(selectedFile);  // Store the selected file
    }
  };

  // Trigger the hidden file input
  const handleUploadClick = () => {
    document.getElementById('fileInput').click();


    const formData = new FormData();
    formData.append('photo', file); // Ensure the key matches 'photo'
    formData.append('clientId', clientId); // Add clientId as part of the form data
  
    axios
      .post('http://localhost:3001/upload-photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }, // Optional, Axios sets this automatically
      })
      .then(() => {
        alert('Photo uploaded!');
      })
      .catch((error) => {
        console.error('Error uploading photo:', error);
      });
  };
  
  console.log(user);

  if (!user.email)
    return <div></div>;


  return (

    <div className="account-container">
      <h1 className="account-header">Account</h1>
      <div className="account-content">
        {/* Profile Card */}
        <div className="profile-card">
          <img
            src={`http://localhost:3001/images/${user.photo_url}`}
            alt="Profile"
            className="profile-picture"
          />
          <h2 className="profile-name">{user.name}</h2>
          {/* Hidden file input */}
          <input
            id="fileInput"
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          {/* Button to trigger the file input click */}
          <button className="upload-button" onClick={handleUploadClick}>
            Upload Picture
          </button>
        </div>

        {/* Editable Profile Form */}
        <div className="profile-form">
          <h2 className="form-header">Profile</h2>
          <p className="form-subheader">The information can be edited</p>
          <form>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name *</label>

                <TextField
                  sx={{ fontSize: '1rem', width: '100%' }}

                  title="name"
                  type="text"
                  id="name"
                  value={user.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  disabled={!isEditing}
                />

              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>


                <TextField
                  sx={{ fontSize: '1rem', width: '100%' }}

                  title="email"
                  type="email"
                  id="email"
                  value={user.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="form-row">

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>

                <TextField
                  sx={{ fontSize: '1rem', width: '100%' }}

                  title="Phone number"
                  type="text"
                  id="phone"
                  value={user.phone_number}
                  onChange={(e) => handleChange('phone_number', e.target.value)}
                  disabled={!isEditing}
                />

              </div>
              <div className="form-group">
                <label htmlFor="date_of_birth">Date of Birth</label>
                <TextField
                  sx={{ fontSize: '1rem', width: '100%' }}

                  title="Date"
                  type="date"
                  disabled={!isEditing}
                  value={user.date_of_birth}
                  onChange={(e) => {
                    handleChange("date_of_birth", e.target.value);
                  }}
                />
              </div>

            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="height">Height</label>

                <TextField
                  sx={{ fontSize: '1rem', width: '100%' }}

                  title="height"
                  id="height"
                  type="number"
                  value={user.height}
                  onChange={(e) => handleChange('height', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label htmlFor="weight">Weight (kg)</label>

                <TextField
                  sx={{ fontSize: '1rem', width: '100%' }}

                  title="weight"
                  type="number"
                  id="weight"
                  value={user.weight}
                  onChange={(e) => handleChange('weight', e.target.value)}
                  disabled={!isEditing}
                />
              </div>

            </div>
            <div className="form-row">
              {
                trainer ? (
                <>
                  <div className="form-group">
                      <span > Trainer Name : {trainer.name}</span>
                  </div>
                  <div className="form-group">
                      <Button
                        type="button"
                        onClick={removeTrainer}
                      >
                      Remove Trainer
                    </Button>
                  </div>

                  </>) : (<div className="form-group">
                    <span > No trainer Assigned </span>
                  </div>)
              }
            </div>
            <Button
              type="button"
              color="primary"
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              disabled={loading}
              className="save-button"
            >
              {isEditing ? 'Save' : 'Edit'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;

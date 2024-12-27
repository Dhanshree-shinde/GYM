
import React, { useState, useEffect } from 'react';
import '../../css/workout.css';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,

} from "@mui/material";

import axios from 'axios';


function WorkoutPlan() {

  const clientId = localStorage.getItem('id');
  const [user, setUser] = useState("");
  const [trainer, setTrainer] = useState("");

  const [workout, setWorkout] = useState({
    monday: { title: "", description: "" },
    tuesday: { title: "", description: "" },
    wednesday: { title: "", description: "" },
    thursday: { title: "", description: "" },
    friday: { title: "", description: "" },
    saturday: { title: "", description: "" },
    sunday: { title: "", description: "" },
  });

  // clientId=1;
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

      try {
        // Fetch workout plan
        const workoutResponse = await axios.get(`http://localhost:3001/get-workout-plan/${clientId}`);
        setWorkout(workoutResponse.data);
      } catch (error) {
        console.error("Error fetching workout plan:", error);
      }
    };

    fetchData();
  }, [clientId]);

  const workoutIcons = {
    M: { name: 'Upper Body', src: '/images/u4.jpg' },
    T: { name: 'Back', src: '/images/u4.jpg' },
    W: { name: 'Cardio', src: '/images/u4.jpg' },
    T2: { name: 'Rest', src: '/images/u4.jpg' },
    F: { name: 'Shoulder', src: '/images/u4.jpg' },
    S: { name: 'Legs', src: '/images/u4.jpg' },
    S2: { name: 'Rest', src: '/images/u4.jpg' },
  };

  var dob = new Date(user.date_of_birth); // User's date of birth

  // Get the current date
  var currentDate = new Date();
  
  // Calculate the age by subtracting the birth year from the current year
  var age = currentDate.getFullYear() - dob.getFullYear();
  
  // Adjust the age if the birthday hasn't occurred yet this year
  var month = currentDate.getMonth() - dob.getMonth();
  if (month < 0 || (month === 0 && currentDate.getDate() < dob.getDate())) {
      age--;
  }

 

  const days = ['M', 'T', 'W', 'T2', 'F', 'S', 'S2'];
  // const trainer = 'Dhanshree Shinde';

  return (
    <div className='container'>
      <div className='user-info'>
        <div className='photo-container'>
          <div className='photo'>
            <img src={`http://localhost:3001/images/${user.photo_url}`} alt='User' />
          </div>
        </div>
        <div className='name'>
          <p>{user.name}</p>
        </div>
        <div className='weight-age'>
          <p>Age - {age} </p>
          <p>Weight - {user.weight} </p>
        </div>
      </div>

      <div className='trainer-container'>
        <span className='trainer'> {trainer ? (
          <p>Trainer: {trainer.name}</p>
        ) : (
          <p>No trainer assigned</p>
        )}
        </span>
      </div>


      <div className='workout-container'>
        <h2>Workout Plan</h2>

        <Box>
          <Table
            aria-label="user table"
            sx={{
              mt: 3,
              whiteSpace: "nowrap",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    DAYS
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    WORKOUT TITLE
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    WORKOUT PLAN
                  </Typography>
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                <TableRow key={day}>
                  <TableCell>{day.charAt(0).toUpperCase() + day.slice(1)}</TableCell>
                  <TableCell>{workout[day].title}</TableCell>
                  <TableCell>{workout[day].description}</TableCell>
                </TableRow>
              ))}




            </TableBody>
          </Table>
        </Box>
        {/* <div className='weekly-plan'>
          {days.map((day, index) => (
            <div className='week' key={index}>
              <div className='week-day'>{day.charAt(0)}</div>
              <div className='icon'>
                <img
                  src={workoutIcons[day].src}
                  alt={`${workoutIcons[day].name} icon`}
                />
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default WorkoutPlan;




// import React from "react";
// import { Box, Avatar, Typography } from "@mui/material";

// const WorkoutPlan = () => {
//   const workoutIcons = {
//     M: { name: "Upper Body", src: "/images/u4.jpg" },
//     T: { name: "Back", src: "/images/u4.jpg" },
//     W: { name: "Cardio", src: "/images/u4.jpg" },
//     T2: { name: "Rest", src: "/images/u4.jpg" },
//     F: { name: "Shoulder", src: "/images/u4.jpg" },
//     S: { name: "Legs", src: "/images/u4.jpg" },
//     S2: { name: "Rest", src: "/images/u4.jpg" },
//   };
//   const UserName = "Dhanshree";
//   const weight = 48;
//   const Age = 21;

//   const days = ["M", "T", "W", "T2", "F", "S", "S2"];
//   const trainer = "Dhanshree Shinde";

//   return (
//     <Box className="container" sx={{ padding: "20px", fontFamily: "Arial" }}>
//       {/* User Info Section */}
//       <Box className="user-info" sx={{ display: "flex", marginBottom: "20px" }}>
//         <Box className="photo-container" sx={{ marginRight: "20px" }}>
//           <Avatar
//             src="/images/u4.jpg"
//             alt="User"
//             sx={{ width: 100, height: 100 }}
//           />
//         </Box>
//         <Box>
//           <Typography className="name" sx={{ fontSize: "20px", fontWeight: "bold" }}>
//             {UserName}
//           </Typography>
//           <Box className="weight-age" sx={{ marginTop: "10px" }}>
//             <Typography sx={{ fontSize: "16px" }}>Age - {Age}</Typography>
//             <Typography sx={{ fontSize: "16px" }}>Weight - {weight}</Typography>
//           </Box>
//         </Box>
//       </Box>

//       {/* Trainer Section */}
//       <Box className="trainer-container" sx={{ marginBottom: "20px" }}>
//         <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
//           Trainer Name - {trainer}
//         </Typography>
//       </Box>

//       {/* Workout Plan Section */}
//       <Box className="workout-container">
//         <Typography
//           variant="h5"
//           className="workout-title"
//           sx={{ marginBottom: "20px", fontWeight: "bold" }}
//         >
//           Workout Plan
//         </Typography>
//         <Box
//           className="weekly-plan"
//           sx={{
//             display: "grid",
//             gridTemplateColumns: "repeat(7, 1fr)",
//             gap: "10px",
//           }}
//         >
//           {days.map((day, index) => (
//             <Box
//               className="week"
//               key={index}
//               sx={{
//                 textAlign: "center",
//                 padding: "10px",
//                 border: "1px solid #ccc",
//                 borderRadius: "8px",
//               }}
//             >
//               <Typography
//                 className="week-day"
//                 sx={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px" }}
//               >
//                 {day.charAt(0)}
//               </Typography>
//               <Avatar
//                 className="icon"
//                 src={workoutIcons[day].src}
//                 alt={`${workoutIcons[day].name} icon`}
//                 sx={{ width: 60, height: 60, margin: "0 auto" }}
//               />
//               <Typography
//                 variant="caption"
//                 className="icon-label"
//                 sx={{ marginTop: "10px", display: "block" }}
//               >
//                 {workoutIcons[day].name}
//               </Typography>
//             </Box>
//           ))}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default WorkoutPlan;

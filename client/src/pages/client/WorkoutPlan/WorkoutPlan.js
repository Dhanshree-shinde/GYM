

import React, { useState, useEffect } from 'react';
import '../../../css/workout.css';
import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { keyframes } from "@emotion/react";
import axios from 'axios';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:3001/single-user-detail/${clientId}`);
        setUser(userResponse.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }

      try {
        const trainerResponse = await axios.get(`http://localhost:3001/get-trainer-name/${clientId}`);
        setTrainer(trainerResponse.data);
      } catch (error) {
        console.warn("Trainer not found or error fetching trainer:", error);
        setTrainer(null);
      }

      try {
        const workoutResponse = await axios.get(`http://localhost:3001/get-workout-plan/${clientId}`);
        setWorkout(workoutResponse.data);
      } catch (error) {
        console.error("Error fetching workout plan:", error);
      }
    };

    fetchData();
  }, [clientId]);
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
    
    <Box>

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



      <Typography color="textSecondary" variant="h3">
        Workout Plan
      </Typography>
      <Table
        aria-label="workout plan table"
        sx={{ mt: 3, whiteSpace: "nowrap" }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Day
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Title
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Description
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(workout).map(([day, details]) => (
            <TableRow
              key={day}
              sx={{
                animation: `${fadeIn} 0.5s ease-in-out`,
                backgroundColor: details.title ? "#ffffff" : "#f0f0f0",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "#e0f7fa",
                },
              }}
            >
              <TableCell>{day.charAt(0).toUpperCase() + day.slice(1)}</TableCell>
              <TableCell>{details.title}</TableCell>
              <TableCell>{details.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default WorkoutPlan;

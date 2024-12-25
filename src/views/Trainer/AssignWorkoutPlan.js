import React, { useState, useEffect } from "react";
import { Button, TextField, Grid, Typography, Box } from "@mui/material";
import axios from "axios";
const AssignWorkoutPlan = ({ clientId }) => {

  const [workoutPlan, setWorkoutPlan] = useState({
    monday: { title: "", description: "" },
    tuesday: { title: "", description: "" },
    wednesday: { title: "", description: "" },
    thursday: { title: "", description: "" },
    friday: { title: "", description: "" },
    saturday: { title: "", description: "" },
    sunday: { title: "", description: "" },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  clientId=1;
  // Fetch workout plan from backend on component load
  useEffect(() => {
    const clientId=1;


    if (clientId) {
      setLoading(true);
      axios
        .get(`http://localhost:3001/get-workout-plan/${clientId}`)
        .then((response) => {
          if (response.data) {
            setWorkoutPlan(response.data); // Set workout plan if it exists
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching workout plan:", error);
          setLoading(false);
        });
    }
  }, [clientId]);

  // Handle changes for title and description
  const handleChange = (day, field, value) => {
    setWorkoutPlan({
      ...workoutPlan,
      [day]: {
        ...workoutPlan[day],
        [field]: value,
      },
    });
  };

  // Save workout plan to the backend
  const handleSave = () => {
    setLoading(true);
    axios
      .post("http://localhost:3001/save-workout-plan", { clientId, workoutPlan })
      .then((response) => {
        alert("Workout Plan Saved!");
        setIsEditing(false); // Exit editing mode
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error saving workout plan:", error);
        setLoading(false);
        alert("Error saving workout plan.");
      });
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Assign Workout Plan to Client {clientId}
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid container spacing={2}>
          {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
            <Grid item xs={12} key={day}>
              <Typography variant="h6">{day.charAt(0).toUpperCase() + day.slice(1)}</Typography>
              <TextField
                label="Title"
                fullWidth
                value={workoutPlan[day].title}
                onChange={(e) => handleChange(day, "title", e.target.value)}
                disabled={!isEditing}
                margin="normal"
              />
              <TextField
                label="Description"
                fullWidth
                value={workoutPlan[day].description}
                onChange={(e) => handleChange(day, "description", e.target.value)}
                disabled={!isEditing}
                margin="normal"
                multiline
                rows={3}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          disabled={loading}
        >
          {isEditing ? "Save Plan" : "Edit Plan"}
        </Button>
      </Box>
    </Box>
  );
};

export default AssignWorkoutPlan;

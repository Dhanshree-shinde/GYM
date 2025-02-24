
import React, { useState, useEffect } from "react";
import { Button, TextField, Grid, Typography, Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { keyframes } from "@emotion/react";

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

const AssignWorkoutPlan = () => {
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
  const { clientId } = useParams();

  useEffect(() => {
    if (clientId) {
      setLoading(true);
      axios
        .get(`http://localhost:3001/get-workout-plan/${clientId}`)
        .then((response) => {
          if (response.data) {
            setWorkoutPlan(response.data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching workout plan:", error);
          setLoading(false);
        });
    }
  }, [clientId]);

  const handleChange = (day, field, value) => {
    setWorkoutPlan({
      ...workoutPlan,
      [day]: {
        ...workoutPlan[day],
        [field]: value,
      },
    });
  };

  const handleSave = () => {
    setLoading(true);
    axios
      .post("http://localhost:3001/save-workout-plan", { clientId, workoutPlan })
      .then(() => {
        alert("Workout Plan Saved!");
        setIsEditing(false);
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
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress size={80} thickness={4} />
        </Box>
      ) : (
        <Box>
          <Typography variant="h5" gutterBottom sx={{ animation: `${fadeIn} 0.5s ease-in-out` }}>
            Assign Workout Plan to Client {clientId}
          </Typography>
          <Grid container spacing={2}>
            {Object.keys(workoutPlan).map((day) => (
              <Grid item xs={12} key={day} sx={{ animation: `${fadeIn} 0.5s ease-in-out` }}>
                <Typography variant="h6">
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </Typography>
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
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              disabled={loading}
              sx={{
                animation: `${fadeIn} 0.5s ease-in-out`,
                background: isEditing
                  ? "linear-gradient(90deg, #2196f3, #21cbf3)"
                  : "linear-gradient(90deg, #1976d2, #2196f3)",
                color: "white",
                borderRadius: "20px",
                padding: "10px 24px",
                fontWeight: "bold",
                fontSize: "1rem",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 0px 10px #21cbf3",
                },
                "&:disabled": {
                  background: "linear-gradient(90deg, #d3d3d3, #e6e6e6)",
                  color: "#a3a3a3",
                },
              }}
            >
              {isEditing ? "Save Plan" : "Edit Plan"}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AssignWorkoutPlan;
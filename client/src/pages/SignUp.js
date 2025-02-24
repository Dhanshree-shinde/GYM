import React, { useState } from "react";
import { TextField, Typography, Button, MenuItem, Link, Select, InputLabel, FormControl, FormHelperText, Box } from "@mui/material";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [photo, setPhoto] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");  // Added for date input


  const handlePhotoChange = (e) => {
   
      setPhoto(e.target.files[0]); // Save the file only if it's valid
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!email || !password || !name || !phone || !gender || !role || !dateOfBirth) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("weight", weight);
    formData.append("height", height);
    formData.append("photo", photo); // The file from the input
    formData.append("gender", gender);
    formData.append("role", role);
    formData.append("dateOfBirth", dateOfBirth);
  
    // Example API call
    fetch("http://localhost:3001/register", {
      method: "POST",
      body: formData, // Form data instead of JSON
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((error) => {
            throw new Error(error.message || 'Sign-up failed. Please try again.');
          });
        }
      })
      .then((data) => {
        alert("Sign-up successful");
        console.log("Sign-up successful:", data);
        setErrorMessage("");
      })
      .catch((error) => {
        console.log("Error during sign-up:", error);
        setErrorMessage(error.message);
      });
  };
  

  return (
    <Box sx={{ maxWidth: 500, margin: "50px auto", padding: 3, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", borderRadius: 2, textAlign: "center", backgroundColor: "#fff" }}>
      <h2 style={{ marginBottom: "20px", fontSize: "24px", color: "#333" }}>Sign Up</h2>
      {errorMessage && <p style={{ color: "red", fontSize: "14px", marginBottom: "15px" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name*"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ borderRadius: 1, borderColor: "#ddd", fontSize: "14px", marginBottom: 2 }}
        />
        <TextField
          type="number"
          label="Phone Number*"
          variant="outlined"
          fullWidth
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          sx={{ borderRadius: 1, borderColor: "#ddd", fontSize: "14px", marginBottom: 2 }}
        />
        <TextField
          type="email"

          label="Email*"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ borderRadius: 1, borderColor: "#ddd", fontSize: "14px", marginBottom: 2 }}
        />
        <TextField

          label="Password*"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={{ borderRadius: 1, borderColor: "#ddd", fontSize: "14px", marginBottom: 2 }}
        />
        <TextField
          type="number"

          label="Weight (kg)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          sx={{ borderRadius: 1, borderColor: "#ddd", fontSize: "14px", marginBottom: 2 }}
        />
        <TextField
          type="number"
          required
          label="Height (cm)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          sx={{ borderRadius: 1, borderColor: "#ddd", fontSize: "14px", marginBottom: 2 }}
        />
        
         <TextField
        type="file"
        variant="outlined"
          fullWidth
          margin="normal"
        // accept="image/*"
        onChange={handlePhotoChange}
        sx={{ borderRadius: 1, borderColor: "#ddd", fontSize: "14px", marginBottom: 2 }}
        />


        <TextField
          type="date"
          label="Date of Birth (dd-mm-yyyy)*"
          variant="outlined"
          fullWidth
          margin="normal"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          required
          sx={{ borderRadius: 1, borderColor: "#ddd", fontSize: "14px", marginBottom: 2 }}
        />
        <FormControl fullWidth margin="normal" required sx={{ marginBottom: 2 }}>
          <InputLabel>Gender*</InputLabel>
          <Select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            label="Gender*"
            sx={{ borderRadius: 1, borderColor: "#ddd", fontSize: "14px" }}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>
        <FormControl fullWidth margin="normal" required sx={{ marginBottom: 2 }}>
          <InputLabel>Role*</InputLabel>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            label="Role*"
            sx={{ borderRadius: 1, borderColor: "#ddd", fontSize: "14px" }}
          >
            <MenuItem value="client">Client</MenuItem>
            <MenuItem value="trainer">Trainer</MenuItem>
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ padding: "12px", borderRadius: 1, fontSize: "16px", backgroundColor: "#000", color: "#fff" }}>
          Sign Up
        </Button>

        <Typography variant="body2" sx={{ marginTop: "10px", fontSize: "14px", color: "#555" }}>
          <Link href="/login" sx={{ color: "#007BFF", textDecoration: "none" }}>
            Back to sign in
          </Link>
        </Typography>


      </form>
    </Box>
  );
};

export default SignUp;

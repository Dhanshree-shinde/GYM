

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { TextField, Button, Checkbox, FormControlLabel, Typography, Link, Box } from "@mui/material";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    axios.post('http://localhost:3001/login', { email, password })
      .then(response => {
        const { token, role, id } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('id', id);
        alert("Sign-in successful")
        navigate(role === 'trainer' ? '/trainer/all-users' : '/client/dashboards/dashboard1');
      })
      .catch(error => {
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <Box sx={{
      maxWidth: "400px",
      margin: "50px auto",
      padding: "30px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
      textAlign: "center",
      backgroundColor: "#fff",
      fontFamily: "'Poppins', sans-serif",
    }}>
      <Typography variant="h5" sx={{ marginBottom: "20px", fontSize: "24px", color: "#333" }}>
        Sign In
      </Typography>
      {errorMessage && <Typography color="error" sx={{ marginBottom: "15px", fontSize: "14px" }}>{errorMessage}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{
            input: { fontSize: "14px" },
            "& .MuiOutlinedInput-root": { borderRadius: "5px" }
          }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={{
            input: { fontSize: "14px" },
            "& .MuiOutlinedInput-root": { borderRadius: "5px" }
          }}
        />
        <Box sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          marginBottom: "15px",
          fontSize: "14px",
        }}>
          <FormControlLabel
            control={<Checkbox />}
            label="Remember me"
            sx={{ marginLeft: "5px" }}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            padding: "12px",
            fontSize: "16px",
            borderRadius: "5px",
            backgroundColor: "#000",
            "&:hover": {
              backgroundColor: "#333"
            }
          }}
        >
          Sign In
        </Button>
      </form>
      <Typography variant="body2" sx={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
        Forgot your password?{" "}
        <Link href="#" sx={{ color: "#007BFF", textDecoration: "none" }}>
          Reset it here
        </Link>
      </Typography>
      <Typography variant="body2" sx={{ marginTop: "10px", fontSize: "14px", color: "#555" }}>
        Don’t have an account?{" "}
        <Link href="/register" sx={{ color: "#007BFF", textDecoration: "none" }}>
          Sign Up
        </Link>
      </Typography>
    </Box>
  );
};

export default SignIn;

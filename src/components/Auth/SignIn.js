import React, { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "50px auto",
      padding: "30px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
      textAlign: "center",
      backgroundColor: "#fff",
      fontFamily: "'Poppins', sans-serif",
    },
    header: {
      marginBottom: "20px",
      fontSize: "24px",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "5px",
      border: "1px solid #ddd",
      fontSize: "14px",
    },
    checkboxContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "start",
      marginBottom: "15px",
      fontSize: "14px",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#000",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      cursor: "pointer",
    },
    footer: {
      marginTop: "20px",
      fontSize: "14px",
      color: "#555",
    },
    link: {
      color: "#007BFF",
      textDecoration: "none",
    },
    error: {
      color: "red",
      fontSize: "14px",
      marginBottom: "15px",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    // Example API call (replace with actual endpoint)
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid login credentials.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Login successful:", data);
        // Redirect or handle login success
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Sign In</h2>
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div style={styles.checkboxContainer}>
          <input type="checkbox" id="rememberMe" />
          <label htmlFor="rememberMe" style={{ marginLeft: "5px" }}>
            Remember me
          </label>
        </div>
        <button type="submit" style={styles.button}>
          Sign In
        </button>
      </form>
      <p style={styles.footer}>
        Forgot your password?{" "}
        <a href="#" style={styles.link}>
          Reset it here
        </a>
      </p>
      <p style={styles.footer}>
        Don’t have an account?{" "}
        <a href="/register" style={styles.link}>
          Sign Up
        </a>
      </p>
    </div>
  );
};

export default SignIn;

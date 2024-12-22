import React, { useState } from "react";

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

  const styles = {
    container: {
      maxWidth: "500px",
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
    select: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "5px",
      border: "1px solid #ddd",
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

    if (!email || !password || !name || !phone || !gender || !role) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    // Example API call (replace with actual endpoint)
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone, email, password, weight, height, photo, gender, role }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Sign-up failed. Please try again.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Sign-up successful:", data);
        // Redirect or handle sign-up success
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Sign Up</h2>
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name*"
          style={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number*"
          style={styles.input}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email*"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password*"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          style={styles.input}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          type="number"
          placeholder="Height (cm)"
          style={styles.input}
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <input
          type="url"
          placeholder="Photo URL"
          style={styles.input}
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />
        <input type="date" style={styles.input} required />
        <select
          style={styles.select}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="" disabled>
            Gender*
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>
        <select
          style={styles.select}
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="" disabled>
            Role*
          </option>
          <option value="client">Client</option>
          <option value="trainer">Trainer</option>
        </select>
        <button type="submit" style={styles.button}>
          Sign Up
        </button>
      </form>
      
    </div>
  );
};

export default SignUp;

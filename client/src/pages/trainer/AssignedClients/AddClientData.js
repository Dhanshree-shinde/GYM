

import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, TextField, Button, CircularProgress } from "@mui/material";
import { keyframes } from "@emotion/react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

const AddClientData = () => {
    const { clientId } = useParams();
    const [clientData, setClientData] = useState({
        weight: "",
        stamina: "",
        bmi: "",
        speed: "",
        height: "",
        date: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (field, value) => {
        setClientData({
            ...clientData,
            [field]: value,
        });
    };

    const handleSave = () => {
        setLoading(true);
        axios.post(`http://localhost:3001/save-client-health-data`, { clientId, clientData })
            .then(() => {
                alert("Data saved successfully!!!");
            })
            .catch((err) => {
                console.error("Error while saving", err);
            })
            .finally(() => setLoading(false));

        axios.post(`http://localhost:3001/update-client-height-weight`, { clientId, clientData })
            .then(() => {
                console.log("Height and weight updated");
            })
            .catch((err) => {
                console.error("Error while updating height and weight", err);
            });
    };

    return (
        <Box container display="flex" flexDirection="column" alignItems="center">
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress size={80} thickness={4} />
                </Box>
            ) : (
                <Box sx={{ animation: `${fadeIn} 0.5s ease-in-out` }}>
                    <Typography style={{ fontWeight: "bold" }} align="center">
                        Add Client Data
                    </Typography>

                    <Grid container spacing={2} sx={{ maxWidth: "600px", margin: "0 auto" }} justifyContent="center">
                        {Object.keys(clientData).map((field, index) => (
                            <Grid key={index} item xs={12} display="flex" flexDirection="column" width="100%">
                                <Typography variant="h6">{field.charAt(0).toUpperCase() + field.slice(1)}</Typography>
                                <TextField
                                    title={field}
                                    fullWidth
                                    type={field === "date" ? "date" : "text"}
                                    onChange={(e) => handleChange(field, e.target.value)}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    <Box mt={2}>
                        <Button
                            variant="contained"
                            onClick={handleSave}
                            disabled={loading}
                            sx={{
                                background: "linear-gradient(90deg, #2196f3, #21cbf3)",
                                color: "white",
                                borderRadius: "20px",
                                padding: "8px 20px",
                                fontWeight: "bold",
                                fontSize: "0.9rem",
                                transition: "transform 0.3s, box-shadow 0.3s",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                    boxShadow: "0px 0px 10px #21cbf3",
                                    background: "linear-gradient(90deg, #1976d2, #2196f3)",
                                },
                                "&:disabled": {
                                    background: "linear-gradient(90deg, #d3d3d3, #e6e6e6)",
                                    color: "#a3a3a3",
                                    cursor: "not-allowed",
                                },
                            }}
                        >
                            {loading ? <CircularProgress size={24} /> : "Add Data"}
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default AddClientData;

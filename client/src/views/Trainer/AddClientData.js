
import {
    Box, Typography, Grid,
    TextField,
    Button,
} from "@mui/material";
import { useState } from "react";
import { useParams } from 'react-router-dom';

import axios from "axios";

const AddClientData = () => {
    const { clientId } = useParams(); // Get clientId from URL

    const [clientData, setClientData] = useState({
        weight: "",
        stamina: "",
        bmi: "",
        speed: "",
        height: "",
        date: "",
    });

    const handleChange = (field, value) => {
        setClientData({
            ...clientData,
            [field]: value,
        });
    };

    const handleSave = () => {
        axios.post(`http://localhost:3001/save-client-health-data`, { clientId, clientData })
            .then((response) => {
                alert("Data saved successfully!!!");
            })
            .catch((err) => {
                console.log("Got an error while saving", err);
            });

        axios.post(`http://localhost:3001/update-client-height-weight`, { clientId, clientData })
        .then((response)=>{
            console.log("height and weight updated ");
        })
        .catch((err) => {
            console.log("Got an error while updating height and weight", err);
        });
    };

    return (
        <Box container display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Typography style={{ fontWeight: "bold" }} align="center">
                Add Client Data
            </Typography>

            <Grid
                container
                spacing={2}
                style={{ maxWidth: "600px", margin: "0 auto" }}
                justifyContent="center"
            >
                <Grid item xs={12} display="flex" flexDirection="column" width="100%">
                    <Typography variant="h6">Date</Typography>
                    <TextField
                        title="Date"
                        type="date"
                        fullWidth
                        onChange={(e) => {
                            handleChange("date", e.target.value);
                        }}
                    />
                </Grid>
                <Grid item xs={12} display="flex" flexDirection="column" width="100%">
                    <Typography variant="h6">Weight</Typography>
                    <TextField
                        title="weight"
                        fullWidth
                        onChange={(e) => {
                            handleChange("weight", e.target.value);
                        }}
                    />
                </Grid>
                <Grid item xs={12} display="flex" flexDirection="column" width="100%">
                    <Typography variant="h6">Height</Typography>
                    <TextField
                        title="height"
                        fullWidth
                        onChange={(e) => {
                            handleChange("height", e.target.value);
                        }}
                    />
                </Grid>

                <Grid item xs={12} display="flex" flexDirection="column" width="100%">
                    <Typography variant="h6">BMI</Typography>
                    <TextField
                        title="bmi"
                        fullWidth
                        onChange={(e) => {
                            handleChange("bmi", e.target.value);
                        }}
                    />
                </Grid>

                <Grid item xs={12} display="flex" flexDirection="column" width="100%">
                    <Typography variant="h6">Speed</Typography>
                    <TextField
                        title="speed"
                        fullWidth
                        onChange={(e) => {
                            handleChange("speed", e.target.value);
                        }}
                    />
                </Grid>

                <Grid item xs={12} display="flex" flexDirection="column" width="100%">
                    <Typography variant="h6">Stamina</Typography>
                    <TextField
                        title="stamina"
                        fullWidth
                        onChange={(e) => {
                            handleChange("stamina", e.target.value);
                        }}
                    />
                </Grid>
            </Grid>

            <Box mt={2}>
                <Button variant="contained" onClick={handleSave}>
                    Add Data
                </Button>
            </Box>
        </Box>
    );
};

export default AddClientData;

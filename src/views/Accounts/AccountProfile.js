import React from "react";
import { TextField, Button, Grid, Paper, Avatar, Typography, MenuItem } from "@mui/material";

const AccountProfile = () => {
  return (
    <Grid container spacing={2} sx={{ padding: 3 }}>
      {/* Profile Card */}
      <Grid item xs={12} md={4}>
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            textAlign: "center",
            borderRadius: 2,
          }}
        >
          <Avatar
            src="https://via.placeholder.com/150"
            sx={{
              width: 80,
              height: 80,
              margin: "0 auto",
              marginBottom: 2,
            }}
          />
          <Typography variant="h6">Sofia Rivers</Typography>
          <Typography variant="body2" color="textSecondary">
            Los Angeles USA
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            GTM-7
          </Typography>
          <Button variant="text" color="primary">
            Upload picture
          </Button>
        </Paper>
      </Grid>

      {/* Editable Profile Form */}
      <Grid item xs={12} md={8}>
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Profile
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
            The information can be edited
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First name"
                defaultValue="Sofia"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last name"
                defaultValue="Rivers"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email address"
                defaultValue="sofia@devias.io"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="State"
                select
                fullWidth
                defaultValue=""
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="CA">California</MenuItem>
                <MenuItem value="NY">New York</MenuItem>
                <MenuItem value="TX">Texas</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                fullWidth
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginTop: 3,
              float: "right",
            }}
          >
            Save details
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AccountProfile;

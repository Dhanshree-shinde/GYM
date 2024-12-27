import React from "react";
import { Grid, Box } from "@mui/material";

import {
  
  WeightChart,
  BMIChart, SpeedChart, StaminaChart,
} from "./dashboard1-components";

const Dashboard1 = () => {
  // 2

  return (
    <Box>
      <Grid container spacing={0}>
        
      </Grid>
      <Grid item xs={12} lg={12}>
        <WeightChart />
      </Grid>
      <Grid item xs={12} lg={12}>
        <SpeedChart />
      </Grid>
      <Grid item xs={12} lg={12}>
        <BMIChart />
      </Grid>
      <Grid item xs={12} lg={12}>
        <StaminaChart />
      </Grid>
    </Box>
  );
};

export default Dashboard1;

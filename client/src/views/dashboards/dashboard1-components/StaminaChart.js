



import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Chart from "react-apexcharts";
import { useEffect,useState } from "react";
import axios from "axios";


const StaminaChart = () => {
  // Define stamina data for A and B
  // const staminaData = [80, 85, 82, 88, 83, 86, 80, 85, 87, 90, 85, 88];

  const clientId=localStorage.getItem('id');

 const [staminaData, setStaminaData] = useState([]);
 
   useEffect(() => {
    axios.get(`http://localhost:3001/get-client-stamina/${clientId}`)
    .then((response) => {
      // No need for response.json(), as Axios already parses JSON
      setStaminaData(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error.message);
    });
   }, [clientId]);
 
  // Define chart options for Stamina
  const optionsStaminaOverview = {
      grid: {
        show: true,
        borderColor: "transparent",
        strokeDashArray: 2,
        padding: {
          left: 0,
          right: 0,
          bottom: 0,
        },
      },
      chart: {
        height: 295,
        toolbar: {
          show: true,
          tools: {
            reset: true, // Add reset zoom functionality
          },
        },
        zoom: {
          enabled: true, // Enable zoom functionality
          type: "x", // Zoom along the x-axis
          autoScaleYaxis: true, // Automatically adjust the y-axis on zoom
        },
        foreColor: "#adb0bb",
        fontFamily: "'DM Sans',sans-serif",
      },
      stroke: {
        curve: "smooth", // Smooth line
        width: 3,
      },
      colors: ["#00d084"], // Line color for BMI
      markers: {
        size: 6,
        hover: {
          sizeOffset: 3,
        },
      },
      xaxis: {
        categories: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ],
        labels: {
          style: {
            cssClass: "grey--text lighten-2--text fill-color",
          },
        },
      },
      yaxis: {
        show: true,
        min: 50,
        max: 200,
        tickAmount: 5,
        labels: {
          style: {
            cssClass: "grey--text lighten-2--text fill-color",
          },
          formatter: function (val) {
            return val.toFixed(1); // Force exactly one decimal place
          },
  
        },
      },
      tooltip: {
        theme: "dark",
      },
    };
  
    // Define series data for BMI
    const seriesStaminaOverview = [
      {
        name: "Stamina",
        data: staminaData, // Use single BMI dataset
      },
    ];
  
    return (
      <Card variant="outlined" sx={{ paddingBottom: "0" }}>
        <CardContent sx={{ paddingBottom: "16px !important" }}>
          <Box
            sx={{
              display: { sm: "flex", xs: "block" },
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="h3" sx={{ marginBottom: "0" }} gutterBottom>
                Stamina Overview
              </Typography>
            </Box>
            <Box
              sx={{
                marginLeft: "auto",
                display: "flex",
                mt: { lg: 0, xs: 2 },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    backgroundColor: "secondary.main",
                    borderRadius: "50%",
                    height: 8,
                    width: 8,
                    mr: 1,
                  }}
                />
                <Typography variant="h6" sx={{ color: "secondary.main" }}>
                  BMI
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ marginTop: "25px" }}>
            <Chart
              options={optionsStaminaOverview}
              series={seriesStaminaOverview}
              type="line"
              height="295px"
            />
          </Box>
        </CardContent>
      </Card>
    );
  };

export default StaminaChart;

// import React from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const data = [
//   { name: "Jan", value: 25 },
//   { name: "Feb", value: 24 },
//   { name: "Mar", value: 25.5 },
//   { name: "Apr", value: 24.8 },
//   { name: "May", value: 25.2 },
//   { name: "Jun", value: 24.5 },
//   { name: "Jul", value: 25 },
//   { name: "Aug", value: 24.7 },
//   { name: "Sep", value: 25.3 },
//   { name: "Oct", value: 24.9 },
//   { name: "Nov", value: 25.1 },
//   { name: "Dec", value: 24.8 },
// ];

// const BMIChart = () => {
//   return (
//     <div
//       style={{
//         padding: "20px",
//         borderRadius: "12px",
//         boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//         border: "1px solid #e0e0e0",
//         backgroundColor: "#fff",
//       }}
//     >
//       <h3 style={{ fontFamily: "Arial, sans-serif", fontWeight: 600, marginBottom: "20px" }}>BMI Overview</h3>
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data}>
//           <CartesianGrid stroke="#f3f4f6" />
//           <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#9e9e9e" }} />
//           <YAxis tick={{ fontSize: 12, fill: "#9e9e9e" }} />
//           <Tooltip
//             contentStyle={{
//               fontSize: 12,
//               backgroundColor: "#f9f9f9",
//               borderRadius: "8px",
//               border: "1px solid #ddd",
//             }}
//           />
//           <Line
//             type="monotone"
//             dataKey="value"
//             stroke="#28a745"
//             strokeWidth={3}
//             dot={{ r: 4, fill: "#28a745" }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default BMIChart;


import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Chart from "react-apexcharts";

const BMIChart = () => {
  // Define a single BMI dataset
  const bmi = [22.5, 23.1, 22.8, 23.5, 22.7, 23.3, 22.9, 23.0, 23.4, 23.7, 23.2, 22.8];

  // Define chart options for BMI Line Chart
  const optionsBMIOverview = {
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
        show: false,
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
      min: 20,
      max: 30,
      tickAmount: 5,
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    tooltip: {
      theme: "dark",
    },
  };

  // Define series data for BMI
  const seriesBMIOverview = [
    {
      name: "BMI",
      data: bmi, // Use single BMI dataset
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
              BMI Overview
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
            options={optionsBMIOverview}
            series={seriesBMIOverview}
            type="line"
            height="295px"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default BMIChart;

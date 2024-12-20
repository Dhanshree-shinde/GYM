// import React from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const data = [
//   { name: "Jan", value: 12 },
//   { name: "Feb", value: 14 },
//   { name: "Mar", value: 13 },
//   { name: "Apr", value: 15 },
//   { name: "May", value: 16 },
//   { name: "Jun", value: 14 },
//   { name: "Jul", value: 13 },
//   { name: "Aug", value: 15 },
//   { name: "Sep", value: 16 },
//   { name: "Oct", value: 14 },
//   { name: "Nov", value: 15 },
//   { name: "Dec", value: 13 },
// ];

// const SpeedChart = () => {
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
//       <h3 style={{ fontFamily: "Arial, sans-serif", fontWeight: 600, marginBottom: "20px" }}>Speed Overview</h3>
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
//             stroke="#ffc107"
//             strokeWidth={3}
//             dot={{ r: 4, fill: "#ffc107" }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default SpeedChart;


import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Chart from "react-apexcharts";

const SpeedChart = () => {
  // Define speed data for each month
  const speed = [60, 65, 70, 75, 80, 85, 90, 92, 95, 98, 100, 105];

  // Define chart options for Speed Line Chart
  const optionsSpeedOverview = {
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
    colors: ["#00b894"], // Line color for speed
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
      max: 110,
      tickAmount: 6,
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

  // Define series data for speed
  const seriesSpeedOverview = [
    {
      name: "Speed",
      data: speed, // Use speed dataset
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
              Speed Overview
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
                  backgroundColor: "primary.main",
                  borderRadius: "50%",
                  height: 8,
                  width: 8,
                  mr: 1,
                }}
              />
              <Typography variant="h6" sx={{ color: "primary.main" }}>
                Speed
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ marginTop: "25px" }}>
          <Chart
            options={optionsSpeedOverview}
            series={seriesSpeedOverview}
            type="line"
            height="295px"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SpeedChart;

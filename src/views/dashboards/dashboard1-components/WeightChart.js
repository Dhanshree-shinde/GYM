// // import React from "react";
// // import { Line } from "react-chartjs-2";
// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   PointElement,
// //   LineElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// // } from "chart.js";

// // // Register Chart.js components
// // ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// // const WeightChart = () => {
// //   const data = {
// //     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
// //     datasets: [
// //       {
// //         label: "Weight (kg)",
// //         data: [72, 71.5, 71, 70.8, 70.5, 70, 69.5, 69.8, 70, 70.3, 71, 71.2],
// //         borderColor: "#0056D2", // Dark blue for the line
// //         backgroundColor: "rgba(0, 86, 210, 0.2)", // Translucent blue for fill
// //         tension: 0.4, // Smooth curve
// //         pointBorderColor: "#0056D2",
// //         pointBackgroundColor: "#0056D2",
// //         pointRadius: 5,
// //       },
// //     ],
// //   };

// //   const options = {
// //     responsive: true,
// //     maintainAspectRatio: false,
// //     plugins: {
// //       legend: {
// //         display: true,
// //         position: "top",
// //         labels: {
// //           boxWidth: 10,
// //           font: {
// //             size: 14,
// //             family: "Arial",
// //           },
// //         },
// //       },
// //       title: {
// //         display: true,
// //         text: "Weight Tracking Overview",
// //         font: {
// //           size: 20,
// //           weight: "bold",
// //           family: "Arial",
// //         },
// //         color: "#333",
// //       },
// //     },
// //     scales: {
// //       x: {
// //         grid: {
// //           display: false,
// //         },
// //         ticks: {
// //           color: "#666",
// //           font: {
// //             size: 12,
// //             family: "Arial",
// //           },
// //         },
// //       },
// //       y: {
// //         grid: {
// //           drawBorder: false,
// //           color: "#f0f0f0",
// //         },
// //         ticks: {
// //           color: "#666",
// //           font: {
// //             size: 12,
// //             family: "Arial",
// //           },
// //           beginAtZero: false, // Adjust scale based on weight range
// //         },
// //       },
// //     },
// //   };

// //   return (
// //     <div
// //       style={{
// //         width: "90%",
// //         height: "400px",
// //         margin: "auto",
// //         backgroundColor: "#fff",
// //         padding: "20px",
// //         borderRadius: "10px",
// //         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
// //       }}
// //     >
// //       <Line data={data} options={options} />
// //     </div>
// //   );
// // };

// // export default WeightChart;


// // import React from "react";
// // import {
// //   LineChart,
// //   Line,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   Legend,
// //   ResponsiveContainer,
// // } from "recharts";

// // const weightData = [
// //   { month: "Jan", weight: 70 },
// //   { month: "Feb", weight: 71 },
// //   { month: "Mar", weight: 69 },
// //   { month: "Apr", weight: 72 },
// //   { month: "May", weight: 73 },
// //   { month: "Jun", weight: 72 },
// //   { month: "Jul", weight: 74 },
// //   { month: "Aug", weight: 75 },
// //   { month: "Sep", weight: 73 },
// //   { month: "Oct", weight: 74 },
// //   { month: "Nov", weight: 76 },
// //   { month: "Dec", weight: 77 },
// // ];

// // const WeightChart = () => {
// //   return (
// //     <div style={{ width: "100%", height: 300, padding: "20px", background: "#fff", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
// //       <h3 style={{ marginBottom: "20px", textAlign: "center" }}>Weight Overview</h3>
// //       <ResponsiveContainer width="100%" height="100%">
// //         <LineChart data={weightData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
// //           <CartesianGrid strokeDasharray="3 3" stroke="#ececec" />
// //           <XAxis dataKey="month" stroke="#8884d8" />
// //           <YAxis stroke="#8884d8" />
// //           <Tooltip />
// //           <Legend />
// //           <Line
// //             type="monotone"
// //             dataKey="weight"
// //             stroke="#3366cc"
// //             strokeWidth={2}
// //             dot={{ r: 4 }}
// //           />
// //         </LineChart>
// //       </ResponsiveContainer>
// //     </div>
// //   );
// // };

// // export default WeightChart;


// // import React from "react";
// // import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// // const data = [
// //   { name: "Jan", value: 300 },
// //   { name: "Feb", value: 400 },
// //   { name: "Mar", value: 350 },
// //   { name: "Apr", value: 450 },
// //   { name: "May", value: 400 },
// //   { name: "Jun", value: 250 },
// //   { name: "Jul", value: 300 },
// //   { name: "Aug", value: 400 },
// //   { name: "Sep", value: 380 },
// //   { name: "Oct", value: 420 },
// //   { name: "Nov", value: 450 },
// //   { name: "Dec", value: 300 },
// // ];

// // const WeightChart = () => {
// //   return (
// //     <div style={{ padding: "20px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", backgroundColor: "#fff" }}>
// //       <h3 style={{ fontFamily: "Arial, sans-serif", fontWeight: 600, marginBottom: "20px" }}>Weight Overview</h3>
// //       <ResponsiveContainer width="100%" height={300}>
// //         <LineChart data={data}>
// //           <CartesianGrid stroke="#f3f4f6" />
// //           <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#9e9e9e" }} />
// //           <YAxis tick={{ fontSize: 12, fill: "#9e9e9e" }} />
// //           <Tooltip contentStyle={{ fontSize: 12, backgroundColor: "#f9f9f9", borderRadius: "8px", border: "1px solid #ddd" }} />
// //           <Line type="monotone" dataKey="value" stroke="#007bff" strokeWidth={3} dot={{ r: 4, fill: "#007bff" }} />
// //         </LineChart>
// //       </ResponsiveContainer>
// //     </div>
// //   );
// // };

// // export default WeightChart;


// import React from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const data = [
//   { name: "Jan", value: 300 },
//   { name: "Feb", value: 400 },
//   { name: "Mar", value: 350 },
//   { name: "Apr", value: 450 },
//   { name: "May", value: 400 },
//   { name: "Jun", value: 250 },
//   { name: "Jul", value: 300 },
//   { name: "Aug", value: 400 },
//   { name: "Sep", value: 380 },
//   { name: "Oct", value: 420 },
//   { name: "Nov", value: 450 },
//   { name: "Dec", value: 300 },
// ];

// const WeightChart = () => {
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
//       <h3 style={{ fontFamily: "Arial, sans-serif", fontWeight: 600, marginBottom: "20px" }}>Weight Overview</h3>
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
//             stroke="#007bff"
//             strokeWidth={3}
//             dot={{ r: 4, fill: "#007bff" }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default WeightChart;


import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Chart from "react-apexcharts";

const WeightChart = () => {
  // Define weight data for each month
  const weight = [60, 62, 64, 67, 69, 70, 72, 74, 75, 76, 78, 80];

  // Define chart options for Weight Line Chart
  const optionsWeightOverview = {
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
    colors: ["#ff6347"], // Line color for weight
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
      min: 55,
      max: 85,
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

  // Define series data for weight
  const seriesWeightOverview = [
    {
      name: "Weight",
      data: weight, // Use weight dataset
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
              Weight Overview
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
                  backgroundColor: "error.main",
                  borderRadius: "50%",
                  height: 8,
                  width: 8,
                  mr: 1,
                }}
              />
              <Typography variant="h6" sx={{ color: "error.main" }}>
                Weight
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ marginTop: "25px" }}>
          <Chart
            options={optionsWeightOverview}
            series={seriesWeightOverview}
            type="line"
            height="295px"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeightChart;

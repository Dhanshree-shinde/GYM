// import React from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const data = [
//   { name: "Jan", value: 80 },
//   { name: "Feb", value: 85 },
//   { name: "Mar", value: 82 },
//   { name: "Apr", value: 88 },
//   { name: "May", value: 83 },
//   { name: "Jun", value: 86 },
//   { name: "Jul", value: 81 },
//   { name: "Aug", value: 87 },
//   { name: "Sep", value: 84 },
//   { name: "Oct", value: 89 },
//   { name: "Nov", value: 80 },
//   { name: "Dec", value: 85 },
// ];

// const StaminaChart = () => {
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
//       <h3 style={{ fontFamily: "Arial, sans-serif", fontWeight: 600, marginBottom: "20px" }}>Stamina Overview</h3>
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
//             stroke="#dc3545"
//             strokeWidth={3}
//             dot={{ r: 4, fill: "#dc3545" }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default StaminaChart;


// import React from "react";
// import { Card, CardContent, Typography, Box } from "@mui/material";
// import Chart from "react-apexcharts";

// const StaminaChart = () => {
//   // Define chart options for Stamina
//   const optionsStaminaOverview = {
//     grid: {
//       show: true,
//       borderColor: "transparent",
//       strokeDashArray: 2,
//       padding: {
//         left: 0,
//         right: 0,
//         bottom: 0,
//       },
//     },
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         columnWidth: "42%",
//         endingShape: "rounded",
//         borderRadius: 5,
//       },
//     },
//     colors: ["#00d084", "#00b894"], // Use green tones for stamina
//     fill: {
//       type: "solid",
//       opacity: 1,
//     },
//     chart: {
//       offsetX: -15,
//       toolbar: {
//         show: false,
//       },
//       foreColor: "#adb0bb",
//       fontFamily: "'DM Sans',sans-serif",
//       sparkline: {
//         enabled: false,
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     markers: {
//       size: 0,
//     },
//     legend: {
//       show: false,
//     },
//     xaxis: {
//       type: "category",
//       categories: [
//         "Jan",
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "July",
//         "Aug",
//         "Sept",
//         "Oct",
//         "Nov",
//         "Dec",
//       ],
//       labels: {
//         style: {
//           cssClass: "grey--text lighten-2--text fill-color",
//         },
//       },
//     },
//     yaxis: {
//       show: true,
//       min: 50,
//       max: 100,
//       tickAmount: 3,
//       labels: {
//         style: {
//           cssClass: "grey--text lighten-2--text fill-color",
//         },
//       },
//     },
//     stroke: {
//       show: true,
//       width: 5,
//       lineCap: "butt",
//       colors: ["transparent"],
//     },
//     tooltip: {
//       theme: "dark",
//     },
//   };

//   // Define series data for Stamina
//   const seriesStaminaOverview = [
//     {
//       name: "Stamina A",
//       data: [80, 85, 82, 88, 83, 86, 80, 85, 87, 90, 85, 88], // Example stamina data for 'Stamina A'
//     },
//     {
//       name: "Stamina B",
//       data: [70, 75, 72, 78, 74, 80, 72, 75, 77, 80, 78, 81], // Example stamina data for 'Stamina B'
//     },
//   ];

//   return (
//     <Card variant="outlined" sx={{ paddingBottom: "0" }}>
//       <CardContent sx={{ paddingBottom: "16px !important" }}>
//         <Box
//           sx={{
//             display: { sm: "flex", xs: "block" },
//             alignItems: "center",
//           }}
//         >
//           <Box>
//             <Typography variant="h3" sx={{ marginBottom: "0" }} gutterBottom>
//               Stamina Overview
//             </Typography>
//           </Box>
//           <Box
//             sx={{
//               marginLeft: "auto",
//               display: "flex",
//               mt: { lg: 0, xs: 2 },
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <Box
//                 sx={{
//                   backgroundColor: "secondary.main",
//                   borderRadius: "50%",
//                   height: 8,
//                   width: 8,
//                   mr: 1,
//                 }}
//               />
//               <Typography variant="h6" sx={{ color: "secondary.main" }}>
//                 Stamina A
//               </Typography>
//             </Box>
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 marginLeft: "10px",
//               }}
//             >
//               <Box
//                 sx={{
//                   backgroundColor: "primary.main",
//                   borderRadius: "50%",
//                   height: 8,
//                   width: 8,
//                   mr: 1,
//                 }}
//               />
//               <Typography variant="h6" sx={{ color: "primary.main" }}>
//                 Stamina B
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//         <Box sx={{ marginTop: "25px" }}>
//           <Chart
//             options={optionsStaminaOverview}
//             series={seriesStaminaOverview}
//             type="bar"
//             height="295px"
//           />
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default StaminaChart;


import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Chart from "react-apexcharts";

const StaminaChart = () => {
  // Define stamina data for A and B
  const staminaA = [80, 85, 82, 88, 83, 86, 80, 85, 87, 90, 85, 88];
  const staminaB = [70, 75, 72, 78, 74, 80, 72, 75, 77, 80, 78, 81];

  // Calculate average stamina for each month
  const averageStamina = staminaA.map((a, index) => (a + staminaB[index]) / 2);

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
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "42%",
        endingShape: "rounded",
        borderRadius: 5,
      },
    },
    colors: ["#00d084"], // Use a green color for the average stamina bar
    fill: {
      type: "solid",
      opacity: 1,
    },
    chart: {
      offsetX: -15,
      toolbar: {
        show: false,
      },
      foreColor: "#adb0bb",
      fontFamily: "'DM Sans',sans-serif",
      sparkline: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    legend: {
      show: false,
    },
    xaxis: {
      type: "category",
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
      max: 100,
      tickAmount: 3,
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    tooltip: {
      theme: "dark",
    },
  };

  // Define series data for the average stamina
  const seriesStaminaOverview = [
    {
      name: "Average Stamina",
      data: averageStamina, // Use the average of Stamina A and B
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
                Average Stamina
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ marginTop: "25px" }}>
          <Chart
            options={optionsStaminaOverview}
            series={seriesStaminaOverview}
            type="bar"
            height="295px"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default StaminaChart;

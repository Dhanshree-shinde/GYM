

// import React from "react";
// import { Card, CardContent, Typography, Box } from "@mui/material";
// import Chart from "react-apexcharts";
// import { useEffect,useState } from "react";
// import axios from "axios";

// const SpeedChart = () => {
//   // Define speed data for each month
//   // const speed = [60, 65, 70, 75, 80, 85, 90, 92, 95, 98, 100, 105];

//   const clientId=localStorage.getItem("id");
  
//    const [speedData, setSpeedData] = useState([]);
   
//    useEffect(() => {
//     axios.get(`http://localhost:3001/get-client-speed/${clientId}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setSpeedData(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error.message);
//       });
//   }, [clientId]);
  
   
//   // Define chart options for Speed Line Chart
//   const optionsSpeedOverview = {
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
//     chart: {
//       height: 295,
//       toolbar: {
//         show: false,
//       },
//       foreColor: "#adb0bb",
//       fontFamily: "'DM Sans',sans-serif",
//     },
//     stroke: {
//       curve: "smooth", // Smooth line
//       width: 3,
//     },
//     colors: ["#00b894"], // Line color for speed
//     markers: {
//       size: 6,
//       hover: {
//         sizeOffset: 3,
//       },
//     },
//     xaxis: {
//       categories: [
//         "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
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
//       max: 110,
//       tickAmount: 6,
//       labels: {
//         style: {
//           cssClass: "grey--text lighten-2--text fill-color",
//         },
//       },
//     },
//     tooltip: {
//       theme: "dark",
//     },
//   };

//   // Define series data for speed
//   const seriesSpeedOverview = [
//     {
//       name: "Speed",
//       data: speedData, // Use speed dataset
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
//               Speed Overview
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
//                   backgroundColor: "primary.main",
//                   borderRadius: "50%",
//                   height: 8,
//                   width: 8,
//                   mr: 1,
//                 }}
//               />
//               <Typography variant="h6" sx={{ color: "primary.main" }}>
//                 Speed
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//         <Box sx={{ marginTop: "25px" }}>
//           <Chart
//             options={optionsSpeedOverview}
//             series={seriesSpeedOverview}
//             type="line"
//             height="295px"
//           />
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default SpeedChart;


import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Chart from "react-apexcharts";
import axios from "axios";

const SpeedChart = () => {
  const clientId = localStorage.getItem("id");
  const [speedData, setSpeedData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/get-client-speed/${clientId}`)
      .then((response) => {
        // No need for response.json(), as Axios already parses JSON
        setSpeedData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  }, [clientId]);

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
      data: speedData, // Use speed dataset
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

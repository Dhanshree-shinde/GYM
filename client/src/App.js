import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { baseTheme } from './assets/global/Theme-variable'
import Themeroutes from "./routes/Router";
import TrainerRoutes from "./routes/RouterTrainer";
import SignIn from "./components/Auth/SignIn";

const App = () => {
    const clientRouting = useRoutes(Themeroutes);
  const trainerRouting = useRoutes(TrainerRoutes);

  const role = localStorage.getItem('role');

  const routing = role
    ? role === 'trainer'
      ? trainerRouting
      : clientRouting
    : <SignIn/>; // Redirect to login if no role

  return (
    <ThemeProvider theme={baseTheme}>
      {routing}
    </ThemeProvider>
  );
  // const routing = useRoutes(Themeroutes);
  // const trainerRouting = useRoutes(TrainerRoutes);
  // const role = "client";

  // const theme = baseTheme;
  // return (
  //   <ThemeProvider theme={theme}>

  //     {role === "client" ? routing : trainerRouting}
  //     {/* {trainerRouting} */}

  //   </ThemeProvider>
  // );
};

export default App;

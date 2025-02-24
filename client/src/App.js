import React from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { baseTheme } from './assets/global/Theme-variable';
import Themeroutes from "./routes/Router";
import TrainerRoutes from "./routes/RouterTrainer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const App = () => {
  const clientRouting = useRoutes(Themeroutes);
  const trainerRouting = useRoutes(TrainerRoutes);

  const role = localStorage.getItem('role');

  // Decide based on role or pathname
  const routing = role
    ? role === 'trainer'
      ? trainerRouting
      : clientRouting
    : window.location.pathname === '/register'
    ? <SignUp />
    : <SignIn />;

  return (
    <ThemeProvider theme={baseTheme}>
      {routing}
    </ThemeProvider>
  );
};

export default App;

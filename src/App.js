import React from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import {baseTheme} from './assets/global/Theme-variable'
import Themeroutes from "./routes/Router";
import TrainerRoutes from "./routes/RouterTrainer";


const App = () => {
  const routing = useRoutes(Themeroutes);
  const trainerRouting = useRoutes(TrainerRoutes);

  const theme = baseTheme;
  return (
    <ThemeProvider theme={theme}>
      {/* {routing} */}
      {trainerRouting}

    </ThemeProvider>
  );
};

export default App;

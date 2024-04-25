import React from "react";
import Routers from "./Routes/Routers";
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#e3f2fd',
        light:"#66bb6a"
      } 
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <Routers />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;

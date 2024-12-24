import React from 'react';
import MainComp from './pages/Main';
import './App.css';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  typography: {
    fontFamily: "'Figtree', sans-serif",
  },
  palette: {
    background: {
      default: "#e2f0e7", // Set your desired background color
      paper: "#fff",   // Background color for paper components
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainComp />
    </ThemeProvider>
  );
};

export default App;

import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import ListingPage from './pages/ListingPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ListingPage />
    </ThemeProvider>
  );
}

export default App;

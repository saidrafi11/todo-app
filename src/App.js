import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Component/Router';
import { useContext, useMemo, useState } from 'react';
import { createTheme, Paper, ThemeProvider } from '@mui/material';
import { ThemeContext } from './Component/Pages.js/Context/ThemeProvider';

function App() {
  // const [mode, setMode] = useState("light");
const {mode} = useContext(ThemeContext)
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: mode,
          background: {
            dark: "hsl(230, 17%, 14%)",
            light: "hsl(0, 0%, 100%)"
          }
        }
      }),
    [mode]
  );


  return (
    <ThemeProvider theme={theme}>
     
    <RouterProvider router={router}></RouterProvider>
   
    </ThemeProvider>
  );
}

export default App;

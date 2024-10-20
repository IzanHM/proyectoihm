import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import CssBaseline from '@mui/material/CssBaseline'
//import './index.css'
import { ThemeOptions } from '@mui/material/styles'
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#167e88',
    },
    secondary: {
      main: '#a02518',
    },
    success: {
      main: '#18a06a',
    },
    info: {
      main: '#184ea0',
    },
  },
};

const theme = createTheme(themeOptions)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
    <CssBaseline/>
    <App />
    </ThemeProvider>
  </StrictMode>,
)

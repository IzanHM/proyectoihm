import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import CssBaseline from '@mui/material/CssBaseline'
//import './index.css'
import { ThemeOptions } from '@mui/material/styles'
import { ThemeProvider, createTheme } from '@mui/material/styles';
//Importamos el componente Provider de la librearía react-redux
import { Provider } from 'react-redux'
//Importamos el componente store que definimos en el fichero ./store/index
import { store } from './store/index'

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
    <Provider store={store}>
    <App />
    </Provider>
    </ThemeProvider>
  </StrictMode>,
)

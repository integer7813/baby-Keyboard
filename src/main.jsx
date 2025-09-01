import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// MUI
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'

// Roboto 폰트
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' },
  },
  typography: {
    fontFamily:
      'Roboto, system-ui, -apple-system, Segoe UI, Helvetica, Arial, Apple SD Gothic Neo, Noto Sans KR, sans-serif',
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
)

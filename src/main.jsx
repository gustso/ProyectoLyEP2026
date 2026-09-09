import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import AutorizacionesProvider from './context/AutorizacionesContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AutorizacionesProvider>
        <App />
      </AutorizacionesProvider>
    </BrowserRouter>
  </StrictMode>
)

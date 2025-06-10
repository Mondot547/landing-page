import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AppRoutes from './Routes'
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <AppRoutes />
    </HelmetProvider>
  </React.StrictMode>,
)

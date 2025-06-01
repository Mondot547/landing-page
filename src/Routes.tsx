// src/Routes.tsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// 🧩 Importation des pages principales
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'

// 🧩 Importation des composants globaux (facultatif)
import Footer from './components/Footer'
import App from './App'
import DarkModeToggle from './components/DarkModeToggle'
import { DarkModeProvider } from './context/DarkModeContext'

const AppRoutes = () => {
  return (
    <Router>
      <DarkModeProvider>
      <header className="p-4 flex justify-end items-center bg-white dark:bg-gray-900 dark:text-gray-100 shadow-md">
        <h1 className='justify-start w-full uppercase dark:text-blue-400'>Mon guide pratique pour réussir</h1>
        <DarkModeToggle />
      </header>
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </main>
      <Footer />
      </DarkModeProvider>
    </Router>
  )
}

export default AppRoutes

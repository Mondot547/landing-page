// src/Routes.tsx

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// 🧩 Importation des pages principales
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

// 🧩 Importation des composants globaux (facultatif)
import Footer from './components/Footer';
import App from './App';
import DarkModeToggle from './components/DarkModeToggle';
import { DarkModeProvider } from './context/DarkModeContext';

// 🧩 Icons
import { FaArrowLeft } from 'react-icons/fa';
import CookieConsent from './components/cookies/CookiesConsent';

const AppRoutes = () => {
  return (
    <Router>
      <DarkModeProvider>
        <header className="p-4 flex justify-between items-center bg-white dark:bg-gray-900 dark:text-gray-100 shadow-md">
          <Link to="/" className="justify-start flex items-center">
            <FaArrowLeft className="w-8 h-8 text-blue-800 dark:text-gray-100" />
          </Link>
          <DarkModeToggle />
        </header>
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
          <CookieConsent />
        </main>
        <Footer />
      </DarkModeProvider>
    </Router>
  );
};

export default AppRoutes;

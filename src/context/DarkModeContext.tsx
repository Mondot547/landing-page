// src/context/DarkModeContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';

type DarkModeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const DarkModeContext = createContext<DarkModeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const DarkModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Vérifie la préférence locale au chargement
    const saved = localStorage.getItem('darkMode');
    console.log('🔍 Valeur sauvegardée:', saved); // DEBUG

    if (saved !== null) {
      const isDark = saved === 'true';
      console.log('📱 Mode dark depuis localStorage:', isDark); // DEBUG
      setDarkMode(isDark);
    } else {
      // Sinon détecte la préférence système
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      console.log('🌙 Préférence système:', prefersDark); // DEBUG
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    console.log('🔄 Changement darkMode:', darkMode); // DEBUG
    console.log('📋 Classes avant:', document.documentElement.className); // DEBUG

    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    console.log('📋 Classes après:', document.documentElement.className); // DEBUG
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    console.log('🔘 Toggle appelé, ancien état:', darkMode); // DEBUG
    setDarkMode((prev) => {
      console.log('🔘 Nouvel état:', !prev); // DEBUG
      return !prev;
    });
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

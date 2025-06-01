// src/components/DarkModeToggle.tsx
import { useDarkMode } from '../context/DarkModeContext'
import { FaMoon, FaSun } from 'react-icons/fa'

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useDarkMode()

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Basculer entre mode clair et mode sombre"
      className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {darkMode ? (
        <FaSun className="text-yellow-400 w-6 h-6" />
      ) : (
        <FaMoon className="text-gray-700 w-6 h-6" />
      )}
    </button>
  )
}

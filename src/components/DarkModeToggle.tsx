import { useDarkMode } from '../context/DarkModeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="relative w-20 h-10 rounded-full bg-purple-500 dark:bg-purple-700 transition-colors"
      aria-label="Toggle dark mode"
    >
      <div
        className={`absolute top-1 left-1 w-8 h-8 rounded-full flex items-center justify-center shadow-md transform transition-transform duration-500 ${
          darkMode ? 'translate-x-10  ' : ''
        }`}
      >
        {darkMode ? (
          <FaSun className="text-yellow-500 w-5 h-5 shadow-lg" />
        ) : (
          <FaMoon className="text-gray-100 w-5 h-5 shadow-lg" />
        )}
      </div>
    </button>
  );
}

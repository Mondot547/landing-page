// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-sm">&copy; {new Date().getFullYear()} MonGuidePratiquePourReussir. Tous droits réservés.</p>
        <nav className="flex space-x-6">
          <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            Contact
          </a>
          <a href="#faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            FAQ
          </a>
          <a href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            Politique de confidentialité
          </a>
          <a href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            Conditions d’utilisation
          </a>
        </nav>
      </div>
    </footer>
  )
}
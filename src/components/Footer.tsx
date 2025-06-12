import { Link } from 'react-router-dom';
import { Mail, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 text-gray-700 dark:text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        {/* Branding */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            FreelanceBoost
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Des ressources concrètes pour propulser ta carrière freelance.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-800 dark:text-gray-300 mb-3">
            Navigation
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="#contact"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="#faq"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                FAQ
              </a>
            </li>
            <li>
              <Link
                to="/privacy"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Conditions d’utilisation
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-2">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-800 dark:text-gray-300 mb-3">
            Reste informé
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Reçois nos conseils freelance 1 fois par semaine. Pas de spam,
            jamais.
          </p>
          <form className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              placeholder="Ton adresse e-mail"
              className="w-full sm:w-auto flex-1 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
            >
              S’inscrire
            </button>
          </form>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-12 border-t border-gray-300 dark:border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} FreelanceBoost. Tous droits
          réservés.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="mailto:contact@freelanceboost.fr"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <Mail size={18} />
          </a>
          <a
            href="#"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <Facebook size={18} />
          </a>
          <a
            href="#"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <Twitter size={18} />
          </a>
          <a
            href="#"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

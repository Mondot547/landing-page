import { useState } from 'react';
import { X } from 'lucide-react';

type Props = {
  onClose: () => void;
};

export default function CookiePreferencesModal({ onClose }: Props) {
  const [preferences, setPreferences] = useState({
    functional: true,
    statistics: false,
    marketing: false,
  });

  const handleChange = (key: keyof typeof preferences) => {
    if (key === 'functional') return; // Toujours activé
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const savePreferences = () => {
    localStorage.setItem('cookie_consent', JSON.stringify(preferences));
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="relative bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md mx-auto shadow-xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
            aria-label="Fermer la fenêtre de préférences"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title */}
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Préférences de cookies
          </h2>

          {/* Preferences */}
          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center justify-between">
              <div>
                <strong>Fonctionnels</strong>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Nécessaires au bon fonctionnement du site
                </p>
              </div>
              <span className="text-green-600 dark:text-green-400 font-semibold">
                Activé
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <strong>Statistiques</strong>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Aident à comprendre l’utilisation du site
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences.statistics}
                onChange={() => handleChange('statistics')}
                className="h-4 w-4 cursor-pointer"
                aria-label="Activer ou désactiver les cookies statistiques"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <strong>Marketing</strong>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Utilisés à des fins publicitaires
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={() => handleChange('marketing')}
                className="h-4 w-4 cursor-pointer"
                aria-label="Activer ou désactiver les cookies marketing"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={savePreferences}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

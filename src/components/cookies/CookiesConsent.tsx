// src/components/CookieConsent.tsx
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import CookiePreferencesModal from './CookiesPreferencesModal';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem('cookie_consent');
    if (!hasConsent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem(
      'cookie_consent',
      JSON.stringify({
        functional: true,
        statistics: true,
        marketing: true,
      }),
    );
    setVisible(false);
  };

  const refuseAll = () => {
    localStorage.setItem(
      'cookie_consent',
      JSON.stringify({
        functional: true, // nécessaires toujours activés
        statistics: false,
        marketing: false,
      }),
    );
    setVisible(false);
  };

  const openPreferences = () => {
    setShowModal(true);
  };

  if (!visible) return null;

  return (
    <>
      <div className="fixed bottom-4 left-4 right-4 md:left-8 md:right-8 z-50">
        <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-lg rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-sm text-gray-800 dark:text-gray-200">
            Ce site utilise des cookies pour améliorer votre expérience. Vous
            pouvez personnaliser vos préférences.
          </p>
          <div className="flex gap-2 flex-shrink-0">
            <Button size="sm" variant="ghost" onClick={refuseAll}>
              Refuser
            </Button>
            <Button size="sm" variant="secondary" onClick={openPreferences}>
              Personnaliser
            </Button>
            <Button size="sm" onClick={acceptAll}>
              Accepter
            </Button>
          </div>
        </div>
      </div>

      {showModal && (
        <CookiePreferencesModal
          onClose={() => {
            setShowModal(false);
            setVisible(false);
          }}
        />
      )}
    </>
  );
}

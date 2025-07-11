
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fr } from '../i18n/translations/fr';
import { en } from '../i18n/translations/en';

type Translations = typeof fr;

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  languages: { code: string; name: string }[];
};

const languages = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
];

const translations: Record<string, Translations> = {
  fr,
  en,
};

const getBrowserLanguage = (): string => {
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language.split('-')[0];
    return languages.some(lang => lang.code === browserLang) ? browserLang : 'fr';
  }
  return 'fr';
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('preferredLanguage') || getBrowserLanguage();
    }
    return 'fr'; // Français par défaut
  });

  useEffect(() => {
    // Appliquer la langue au chargement
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
    
    // Stocker la préférence de langue dans localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('preferredLanguage', language);
    }
  }, [language]);

  // Fonction pour obtenir une traduction
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language] || translations.fr;

    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage doit être utilisé à l'intérieur d'un LanguageProvider');
  }
  return context;
};

// Alias pour faciliter l'utilisation
export const useTranslation = useLanguage;

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { languages, getTranslation, getBrowserLanguage } from '../i18n';

export type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  languages: { code: string; name: string }[];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
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
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', language);
    }
  }, [language]);

  // Fonction pour obtenir une traduction
  const t = (key: string): string => {
    return getTranslation(key, language);
  };

  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t,
    languages
  };

  return (
    <LanguageContext.Provider value={contextValue}>
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
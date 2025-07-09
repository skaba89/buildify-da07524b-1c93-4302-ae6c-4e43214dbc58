
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('fr'); // Français par défaut

  useEffect(() => {
    // Appliquer la langue au chargement
    document.documentElement.lang = language;
    
    // Stocker la préférence de langue dans localStorage
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
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
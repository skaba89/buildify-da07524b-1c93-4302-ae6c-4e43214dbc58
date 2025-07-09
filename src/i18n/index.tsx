
import React, { createContext, useContext, ReactNode } from 'react';
import { fr } from './translations/fr';
import { en } from './translations/en';
import { useLanguage } from '../contexts/LanguageContext';

// Type pour les traductions
type Translations = {
  [key: string]: string;
};

// Type pour le contexte de traduction
type TranslationContextType = {
  t: (key: string) => string;
  changeLanguage: (lang: string) => void;
  currentLanguage: string;
};

// Créer le contexte
const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Fournisseur de traduction
export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { language, setLanguage } = useLanguage();

  // Toutes les traductions disponibles
  const translations: { [key: string]: Translations } = {
    fr,
    en,
  };

  // Fonction pour obtenir une traduction
  const t = (key: string): string => {
    const currentTranslations = translations[language] || translations.fr;
    return currentTranslations[key] || key;
  };

  // Fonction pour changer de langue
  const changeLanguage = (lang: string): void => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  return (
    <TranslationContext.Provider value={{ t, changeLanguage, currentLanguage: language }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Hook pour utiliser les traductions
export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation doit être utilisé à l'intérieur d'un TranslationProvider');
  }
  return context;
};
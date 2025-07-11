
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { en } from './translations/en';
import { fr } from './translations/fr';

type Translations = typeof en;

type LanguageContextType = {
  t: (key: string) => string;
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
  languages: { code: string; name: string }[];
};

const languages = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
];

const translations: Record<string, Translations> = {
  en,
  fr,
};

const getBrowserLanguage = (): string => {
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language.split('-')[0];
    return languages.some(lang => lang.code === browserLang) ? browserLang : 'fr';
  }
  return 'fr';
};

// Créer le contexte avec des valeurs par défaut
export const LanguageContext = createContext<LanguageContextType>({
  t: () => '',
  currentLanguage: 'fr',
  changeLanguage: () => {},
  languages,
});

// Fonction pour obtenir une traduction
export const getTranslation = (key: string, lang: string): string => {
  const keys = key.split('.');
  let value: any = translations[lang] || translations.fr;

  for (const k of keys) {
    if (value && value[k]) {
      value = value[k];
    } else {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  }

  return value;
};

// Hook pour utiliser les traductions
export const useTranslation = () => useContext(LanguageContext);

// Fonction pour créer un fournisseur de langue
export const createLanguageProvider = (
  React: any,
  initialLanguage: string = 'fr'
) => {
  return ({ children }: { children: ReactNode }) => {
    const [currentLanguage, setCurrentLanguage] = useState<string>(
      typeof localStorage !== 'undefined' 
        ? localStorage.getItem('language') || getBrowserLanguage() 
        : initialLanguage
    );

    useEffect(() => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('language', currentLanguage);
      }
      if (typeof document !== 'undefined') {
        document.documentElement.lang = currentLanguage;
      }
    }, [currentLanguage]);

    const t = (key: string): string => getTranslation(key, currentLanguage);

    const changeLanguage = (lang: string) => {
      if (languages.some(l => l.code === lang)) {
        setCurrentLanguage(lang);
      }
    };

    const contextValue = {
      t,
      currentLanguage,
      changeLanguage,
      languages,
    };

    return React.createElement(
      LanguageContext.Provider,
      { value: contextValue },
      children
    );
  };
};

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
  const browserLang = navigator.language.split('-')[0];
  return languages.some(lang => lang.code === browserLang) ? browserLang : 'fr';
};

const LanguageContext = createContext<LanguageContextType>({
  t: () => '',
  currentLanguage: 'fr',
  changeLanguage: () => {},
  languages,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(
    localStorage.getItem('language') || getBrowserLanguage()
  );

  useEffect(() => {
    localStorage.setItem('language', currentLanguage);
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[currentLanguage];

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

  const changeLanguage = (lang: string) => {
    if (languages.some(l => l.code === lang)) {
      setCurrentLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ t, currentLanguage, changeLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
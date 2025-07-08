
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { en } from './translations/en';
import { fr } from './translations/fr';

type Translations = typeof en;

interface I18nContextType {
  t: (key: string) => string;
  locale: string;
  setLocale: (locale: string) => void;
  availableLocales: string[];
}

const translations: Record<string, Translations> = {
  en,
  fr
};

const defaultLocale = 'fr'; // Français par défaut
const availableLocales = Object.keys(translations);

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState(() => {
    const savedLocale = localStorage.getItem('locale');
    return savedLocale && availableLocales.includes(savedLocale) 
      ? savedLocale 
      : defaultLocale;
  });

  useEffect(() => {
    localStorage.setItem('locale', locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    return value as string;
  };

  return (
    <I18nContext.Provider value={{ t, locale, setLocale, availableLocales }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};
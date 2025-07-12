
import { fr } from './translations/fr';
import { en } from './translations/en';

export type Translations = typeof fr;

export const languages = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
];

export const translations: Record<string, Translations> = {
  fr,
  en,
};

export const getBrowserLanguage = (): string => {
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language.split('-')[0];
    return languages.some(lang => lang.code === browserLang) ? browserLang : 'fr';
  }
  return 'fr';
};

export const getTranslation = (key: string, lang: string): string => {
  const keys = key.split('.');
  let value: any = translations[lang] || translations.fr;

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
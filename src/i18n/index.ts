
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
  if (!key) return '';
  
  const keys = key.split('.');
  let value: any = translations[lang] || translations.fr;

  // Gestion spéciale pour les clés qui ne sont pas des objets imbriqués
  if (keys.length === 1 && typeof value[key] === 'string') {
    return value[key];
  }

  // Parcourir l'arborescence des clés imbriquées
  for (const k of keys) {
    if (value && (typeof value === 'object') && (k in value)) {
      value = value[k];
    } else {
      // Si la clé n'existe pas dans la langue actuelle, essayer en français
      if (lang !== 'fr') {
        const frValue = getTranslation(key, 'fr');
        if (frValue !== key) return frValue;
      }
      
      console.warn(`Translation key not found: ${key} (in ${lang})`);
      return key;
    }
  }

  return typeof value === 'string' ? value : key;
};

// Fonction pour interpoler des variables dans les traductions
// Exemple: interpolate("Hello, {name}!", { name: "John" }) => "Hello, John!"
export const interpolate = (text: string, params?: Record<string, string | number>): string => {
  if (!params) return text;
  
  return Object.entries(params).reduce((result, [key, value]) => {
    const regex = new RegExp(`{${key}}`, 'g');
    return result.replace(regex, String(value));
  }, text);
};
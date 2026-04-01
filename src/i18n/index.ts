import en from './en.json';
import zh from './zh.json';

export const languages = {
  en: 'English',
  zh: '中文',
} as const;

export type Lang = keyof typeof languages;

const translations = { en, zh } as Record<Lang, typeof en>;

export function getTranslations(lang: Lang): typeof en {
  return translations[lang];
}

export function getLangAlt(lang: Lang): { text: string; href: string } {
  return lang === 'en'
    ? { text: '中文', href: '/zh/' }
    : { text: 'EN', href: '/' };
}

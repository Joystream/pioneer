import i18next, { ResourceLanguage } from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import dictEN from './dict/en'
import dictRU from './dict/ru'

export type Locale = 'en' | 'en-GB' | 'en-US' | 'ru' | 'ru-RU'

const resources: Record<Locale, ResourceLanguage> = {
  en: dictEN,
  'en-GB': dictEN,
  'en-US': dictEN,
  ru: dictRU,
  'ru-RU': dictRU,
}

// eslint-disable-next-line import/no-named-as-default-member
i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    fallbackNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18next

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "../locales/en/translation.json";
import translationFR from "../locales/fr/translation.json";
import i18nextReactModule from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const fallbackLng = ["fr"];
const availableLanguages = ["en", "fr"];

const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
};

i18n
  .use(LanguageDetector)
  .use(i18nextReactModule)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng,
    lng: i18n.language,
    detection: {
      checkWhitelist: true,
    },
    debug: false,
    whitelist: availableLanguages,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

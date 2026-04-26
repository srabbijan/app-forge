import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import bn from "./messages/bn.json";
import en from "./messages/en.json";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: en,
  },
  bn: {
    translation: bn,
  },
};

// Get language from localStorage or default to 'bn'
const getStoredLanguage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("language") || "bn";
  }
  return "bn";
};

void i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: getStoredLanguage(), // language to use, loaded from localStorage
    fallbackLng: "bn", // fallback language if stored language is not available
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;

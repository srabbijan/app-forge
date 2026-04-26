import { useCommonStore } from "@/stores/store";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const geoInfo = useCommonStore((state) => state.geoInfo);

  const currentLanguage = i18n.language;

  const changeLanguage = useCallback(
    (lang: "en" | "bn") => {
      i18n.changeLanguage(lang);
      localStorage.setItem("language", lang);
    },
    [i18n],
  );

  // Auto-detect language based on geo location on first load
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");

    // If user has already set a preference, respect it
    if (savedLanguage) {
      return;
    }

    // If geo info is available, set language based on country
    if (geoInfo?.country) {
      const detectedLanguage = geoInfo.country === "BD" ? "bn" : "en";
      changeLanguage(detectedLanguage);
    }
  }, [geoInfo, changeLanguage]);

  const toggleLanguage = useCallback(() => {
    const newLang = currentLanguage === "en" ? "bn" : "en";
    changeLanguage(newLang as "en" | "bn");
  }, [currentLanguage, changeLanguage]);

  return {
    currentLanguage,
    changeLanguage,
    toggleLanguage,
    isBengali: currentLanguage === "bn",
    isEnglish: currentLanguage === "en",
  };
};

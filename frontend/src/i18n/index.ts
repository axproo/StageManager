import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import fr from "../locales/fr.json";

const i18n = createI18n({
  legacy: false, // Must be false for Composition API
  locale: "fr", // Default language
  fallbackLocale: "fr", // Backup language if translation is missing
  messages: { en, fr }, // Loaded translation files
});

export default i18n;

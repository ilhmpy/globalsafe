import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import moment from "moment";
import "moment/locale/ru";

const DETECTION_OPTIONS = {
  order: ["navigator"],
};

moment.locale(window.navigator.language);
const fallbackLng = ["en"];
const availableLanguages = ["en", "ru"];

// availableLanguages.forEach((element) => {
//   if (window.navigator.language !== "en" || element !== "en") {
//     moment.locale("ru");
//   } else {
//     moment.locale("en");
//   }
// });

if (window.navigator.language !== "en") {
  moment.locale("ru");
} else {
  moment.locale("en");
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // lng: "ru",
    detection: DETECTION_OPTIONS,
    fallbackLng,
    debug: true,
    whitelist: availableLanguages,
    interpolation: {
      escapeValue: false,
      // format: (value, format, lng: any) => {
      //   if (format === "currentDate") return;
      //   moment(value).locale(lng).format("LL");
      //   return value;
      // },
    },
  });

export default i18n;

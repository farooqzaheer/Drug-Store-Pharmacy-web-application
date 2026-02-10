import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import navigationEN from "./Layout/Navigation.en.json";
import navigationPS from "./Layout/Navigation.ps.json";
import dragEn from "./Data/Drag/Drag.en.json";
import dragPs from "./Data/Drag/Drag.ps.json";
import categoryEn from "./Data/Category/category.en.json";
import categoryPs from "./Data/Category/category.ps.json";
import doctorEn from "./Data/Doctor/Doctor.en.json";
import doctorPs from "./Data/Doctor/Doctor.ps.json";
import doctorDragEn from "./Data/DoctorDrag/DoctorDrag.en.json";
import doctorDragPs from "./Data/DoctorDrag/DoctorDrag.ps.json";

const resources = {
  en: {
    translation: {
      navigation: navigationEN,
      drag: dragEn,
      category: categoryEn,
      doctor: doctorEn,
      doctordrag: doctorDragEn,
    },
  },
  ps: {
    translation: {
      navigation: navigationPS,
      drag: dragPs,
      category: categoryPs,
      doctor: doctorPs,
      doctordrag: doctorDragPs,
    },
  },
};

i18next
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;

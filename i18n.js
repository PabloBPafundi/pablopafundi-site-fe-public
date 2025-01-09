import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es_data from './src/language/es.json';
import en_data from './src/language/en.json';
import defineLang from './src/config/lang';  

const lang = defineLang(); 

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es_data },
      en: { translation: en_data },
    },
    lng: lang, 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
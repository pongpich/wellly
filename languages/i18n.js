import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import english from './english.json';
import thai from './thai.json';

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'th', // if you're using a language detector, do not define the lng option
    resources: {
        th: thai,
        en: english
    },
    react: {
        useSuspense: false,
    }
});

export default i18n;
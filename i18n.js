import I18n, { t } from "i18n-js";
import * as RNLocalize from "react-native-localize";

import en from "./translation/en.json";
import ms from "./translation/ms.json";
import Database from './db';

const db = new Database();
const locales = RNLocalize.getLocales();

// if (Array.isArray(locales)) {
//   I18n.locale = locales[0].languageTag;
// }

console.log("locales[0].languageTag", locales[0].languageTag)

db.getLanguage().then((code) => {
    console.log("getLanguage", code[0])
  if (code[0].code == null) {
    db.saveLanguage(locales[0].languageTag).then((data) => {
      console.log('Language code successfully saved!')
      I18n.locale = locales[0].languageTag
    }).catch((err) => {
      console.log('Language code failed to save.')
    })
  } else {
    I18n.locale = code[0].code
  }
})

const getLanguage = async () => {
  try {
    // const locales = await RNLocalize.getLocales()
    // console.log("getLanguage -> locales", locales[0].languageTag.substr(0, 2))
    // I18n.locale = locales[0].languageTag;
    // I18n.initAsync()

    const locales = await db.getLanguage()
    I18n.locale = locales[0].code
    // I18n.locale = 'ms'
    I18n.fallbacks = true;
    I18n.translations = {
      en,
      ms
    };

  } catch (err) {
    console.log("getLanguage -> err", err)
  }
}

// getLanguage()

I18n.fallbacks = true;
I18n.translations = {
  en,
  ms
};

export default I18n;

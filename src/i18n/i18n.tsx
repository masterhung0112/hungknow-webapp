import { getConfig } from 'hkclient-ts/lib/selectors/entities/general'
import store from 'stores/redux_store'

import bg from './bg.json'
import de from './de.json'
import es from './es.json'
import fr from './fr.json'
import it from './it.json'
import ja from './ja.json'
import ko from './ko.json'
import nl from './nl.json'
import pl from './pl.json'
import ptBR from './pt-BR.json'
import ro from './ro.json'
import ru from './ru.json'
import sv from './sv.json'
import tr from './tr.json'
import uk from './uk.json'
import zhTW from './zh-TW.json'
import zhCN from './zh-CN.json'

export type LanguageType = Record<string, { value: string; name: string; order: number; url: string }>

const languages: LanguageType = {
  de: {
    value: 'de',
    name: 'Deutsch',
    order: 0,
    url: de,
  },
  en: {
    value: 'en',
    name: 'English',
    order: 1,
    url: '',
  },
  es: {
    value: 'es',
    name: 'Español',
    order: 2,
    url: es,
  },
  fr: {
    value: 'fr',
    name: 'Français',
    order: 3,
    url: fr,
  },
  it: {
    value: 'it',
    name: 'Italiano',
    order: 4,
    url: it,
  },
  nl: {
    value: 'nl',
    name: 'Nederlands',
    order: 5,
    url: nl,
  },
  pl: {
    value: 'pl',
    name: 'Polski',
    order: 6,
    url: pl,
  },
  'pt-BR': {
    value: 'pt-BR',
    name: 'Português (Brasil)',
    order: 7,
    url: ptBR,
  },
  ro: {
    value: 'ro',
    name: 'Română',
    order: 8,
    url: ro,
  },
  sv: {
    value: 'sv',
    name: 'Svenska',
    order: 9,
    url: sv,
  },
  tr: {
    value: 'tr',
    name: 'Türkçe',
    order: 10,
    url: tr,
  },
  bg: {
    value: 'bg',
    name: 'Български',
    order: 11,
    url: bg,
  },
  ru: {
    value: 'ru',
    name: 'Pусский',
    order: 12,
    url: ru,
  },
  uk: {
    value: 'uk',
    name: 'Yкраїнська (Alpha)',
    order: 13,
    url: uk,
  },
  ko: {
    value: 'ko',
    name: '한국어 (Alpha)',
    order: 14,
    url: ko,
  },
  'zh-CN': {
    value: 'zh-CN',
    name: '中文 (简体)',
    order: 15,
    url: zhCN,
  },
  'zh-TW': {
    value: 'zh-TW',
    name: '中文 (繁體)',
    order: 16,
    url: zhTW,
  },
  ja: {
    value: 'ja',
    name: '日本語',
    order: 17,
    url: ja,
  },
}

export function getAllLanguages() {
  return languages
}

export function getLanguages() {
  const config = getConfig(store.getState())
  if (!config.AvailableLocales) {
    return getAllLanguages()
  }
  return config.AvailableLocales.split(',').reduce((result, l) => {
    if (languages[l]) {
      result[l] = languages[l]
    }
    return result
  }, {} as LanguageType)
}

export function getLanguageInfo(locale: string) {
  return getAllLanguages()[locale]
}

export function isLanguageAvailable(locale: string) {
  return Boolean(getLanguages()[locale])
}

export function doAddLocaleData() {
  if (!Intl.PluralRules) {
    // eslint-disable-next-line global-require
    require('@formatjs/intl-pluralrules/polyfill-locales')
  }

  if (!(Intl as any).RelativeTimeFormat) {
    // eslint-disable-next-line global-require
    require('@formatjs/intl-relativetimeformat/polyfill-locales')
  }
}

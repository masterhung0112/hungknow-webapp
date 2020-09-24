import { GlobalState } from 'hkclient-ts/lib/types/store'
import { getCurrentUserLocale } from 'hkclient-ts/lib/selectors/entities/i18n'
import * as I18n from 'i18n/i18n'
import { General } from 'hkclient-ts/lib/constants'
import { getConfig } from 'hkclient-ts/lib/selectors/entities/general'

// This is a placeholder for if we ever implement browser-locale detection
export function getCurrentLocale(state: GlobalState) {
  const currentLocale = getCurrentUserLocale(state, getConfig(state).DefaultClientLocale)
  if (I18n.isLanguageAvailable(currentLocale)) {
    return currentLocale
  }
  return General.DEFAULT_LOCALE
}

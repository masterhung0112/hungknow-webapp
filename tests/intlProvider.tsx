import { createIntl } from 'react-intl'
import IntlProvider from 'components/intl-provider'
import React from 'react'
import enTranslationData from '../i18n/en.json'

export const defaultIntl = createIntl({
  locale: 'en',
  messages: enTranslationData,
})

export function wrapIntlProvider(el: React.ReactElement): React.ReactElement {
  return (
    <IntlProvider locale="en" translations={enTranslationData}>
      {el}
    </IntlProvider>
  )
}

export const translationData = enTranslationData

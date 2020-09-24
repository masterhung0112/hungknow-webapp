import React from 'react'
import 'styles/styles.scss'
import 'styles/showroom/_module.scss'
import IntlProvider from 'components/intl-provider'
import enTranslationData from 'i18n/en.json'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [
  (Story) => (
    <IntlProvider locale='en' translations={enTranslationData}>
      <Story />
    </IntlProvider>
  ),
];
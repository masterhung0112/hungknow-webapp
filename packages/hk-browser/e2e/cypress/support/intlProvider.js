import {createIntl, createIntlCache} from 'react-intl';

import enTranslationData from '../../../src/i18n/en.json';

const cache = createIntlCache();

export const defaultTestIntl = createIntl(
    {
        locale: 'en',
        messages: enTranslationData,
    },
    cache,
);

export const translationData = enTranslationData;

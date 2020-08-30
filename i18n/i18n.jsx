const languages = {
    en: {
        value: 'en',
        name: 'English',
        order: 1,
        url: '',
    },
}

export function getAllLanguages() {
    return languages;
}

export function getLanguages() {
    const config = {
        AvailableLocales: 'en'
    } //getConfig(store.getState());
    if (!config.AvailableLocales) {
        return getAllLanguages();
    }
    return config.AvailableLocales.split(',').reduce((result, l) => {
        if (languages[l]) {
            result[l] = languages[l];
        }
        return result;
    }, {});
}

export function getLanguageInfo(locale) {
    return getAllLanguages()[locale];
}

export function isLanguageAvailable(locale) {
    return Boolean(getLanguages()[locale]);
}

export function doAddLocaleData() {
    if (!Intl.PluralRules) {
        // eslint-disable-next-line global-require
        require('@formatjs/intl-pluralrules/polyfill-locales');
    }

    if (!Intl.RelativeTimeFormat) {
        // eslint-disable-next-line global-require
        require('@formatjs/intl-relativetimeformat/polyfill-locales');
    }
}

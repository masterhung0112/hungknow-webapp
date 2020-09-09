export type LanguageType = Record<string, {value: string, name: string, order: number, url: string}>

const languages: LanguageType = {
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
    }, {} as LanguageType);
}

export function getLanguageInfo(locale: string) {
    return getAllLanguages()[locale];
}

export function isLanguageAvailable(locale: string) {
    return Boolean(getLanguages()[locale]);
}

export function doAddLocaleData() {
    if (!Intl.PluralRules) {
        // eslint-disable-next-line global-require
        require('@formatjs/intl-pluralrules/polyfill-locales');
    }

    if (!(Intl as any).RelativeTimeFormat) {
        // eslint-disable-next-line global-require
        require('@formatjs/intl-relativetimeformat/polyfill-locales');
    }
}

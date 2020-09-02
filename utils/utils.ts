import { Constants } from './constants';

export function localizeMessage(id: string, defaultMessage: string): string {
    // const state = store.getState();

    // const locale = getCurrentLocale(state);
    // const translations = getTranslations(state, locale);

    // if (!translations || !(id in translations)) {
    //     return defaultMessage || id;
    // }

    return '' //translations[id];
}

export const isServer = typeof window === 'undefined';

export function isMobile() {
    return isServer ? false : window.innerWidth <= Constants.MOBILE_SCREEN_WIDTH;
}

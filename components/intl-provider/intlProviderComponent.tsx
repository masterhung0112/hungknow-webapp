import PropTypes from 'prop-types';
import React from 'react';
import { IntlProvider as BaseIntlProvider } from 'react-intl';

// import {Client4} from 'mattermost-redux/client';
// import { setLocalizeFunction } from 'hkclient-ts/utils/i18n_utils';

// import * as I18n from 'i18n/i18n';

// import { localizeMessage } from 'utils/utils';

import en from '../../i18n/en.json'

export default class IntlProvider extends React.PureComponent {
    // static propTypes = {
    //     children: PropTypes.element.isRequired,
    //     locale: PropTypes.string.isRequired,
    //     translations: PropTypes.object,
    //     actions: PropTypes.shape({
    //         loadTranslations: PropTypes.func.isRequired,
    //     }).isRequired,
    // };

    // componentDidMount() {
    //     // Initialize browser's i18n data
    //     I18n.doAddLocaleData();

    //     // Pass localization function back to hkclient-ts
    //     setLocalizeFunction(localizeMessage);

    //     this.handleLocaleChange(this.props.locale);
    // }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.locale !== this.props.locale) {
    //         this.handleLocaleChange(this.props.locale);
    //     }
    // }

    // handleLocaleChange = (locale) => {
    //     // Client4.setAcceptLanguage(locale);

    //     this.loadTranslationsIfNecessary(locale);
    // }

    // loadTranslationsIfNecessary = (locale) => {
    //     if (this.props.translations) {
    //         // Already loaded
    //         return;
    //     }
    //     const localeInfo = I18n.getLanguageInfo(locale);

    //     if (!localeInfo) {
    //         return;
    //     }

    //     this.props.actions.loadTranslations(locale, localeInfo.url);
    // }

    render() {
        // if (!this.props.translations) {
        //     return null;
        // }

        return (
            // <BaseIntlProvider
            //     key={this.props.locale}
            //     locale={this.props.locale}
            //     messages={this.props.translations}
            //     textComponent='span'
            // >
            //     {this.props.children}
            // </BaseIntlProvider>
            <BaseIntlProvider
                key="en"
                locale="en"
                messages={en}
                textComponent='span'
            >
                {this.props.children}
            </BaseIntlProvider>
        );
    }
}

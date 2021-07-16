// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {GlobalState} from 'types/store';

import {Client4} from 'hkclient-redux/client';
import {getConfig} from 'hkclient-redux/selectors/entities/general';
import {getTheme} from 'hkclient-redux/selectors/entities/preferences';

import LinkingLandingPage from './linking_landing_page';

function mapStateToProps(state: GlobalState) {
    const config = getConfig(state);

    return {
        desktopAppLink: config.AppDownloadLink,
        iosAppLink: config.IosAppDownloadLink,
        androidAppLink: config.AndroidAppDownloadLink,
        defaultTheme: getTheme(state),
        siteUrl: config.SiteURL,
        siteName: config.SiteName,
        brandImageUrl: Client4.getBrandImageUrl('0'),
        enableCustomBrand: config.EnableCustomBrand === 'true',
    };
}

export default connect(mapStateToProps)(LinkingLandingPage);

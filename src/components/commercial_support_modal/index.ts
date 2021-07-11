// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {ModalIdentifiers} from 'utils/constants';
import {isModalOpen} from 'selectors/views/modals';

import {GlobalState} from 'types/store';

import {getCurrentUser} from 'hkclient-redux/selectors/entities/users';
import {getConfig, getLicense} from 'hkclient-redux/selectors/entities/general';

import CommercialSupportModal from './commercial_support_modal';

function mapStateToProps(state: GlobalState) {
    const modalId = ModalIdentifiers.COMMERCIAL_SUPPORT;
    const config = getConfig(state);
    const license = getLicense(state);
    const isCloud = license.Cloud === 'true';
    const currentUser = getCurrentUser(state);
    const showBannerWarning = (config.EnableFile !== 'true' || config.FileLevel !== 'DEBUG') && !(isCloud);

    return {
        show: isModalOpen(state, modalId),
        isCloud,
        currentUser,
        showBannerWarning,
    };
}

export default connect(mapStateToProps)(CommercialSupportModal);

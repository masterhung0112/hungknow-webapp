// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {ModalIdentifiers} from 'utils/constants';
import {isModalOpen} from 'selectors/views/modals';

import {GlobalState} from 'types/store';

import {getConfig, getLicense} from 'hkclient-redux/selectors/entities/general';

import AboutBuildModal from './about_build_modal';

function mapStateToProps(state: GlobalState) {
    const modalId = ModalIdentifiers.ABOUT;
    return {
        config: getConfig(state),
        license: getLicense(state),
        show: isModalOpen(state, modalId),
    };
}

export default connect(mapStateToProps)(AboutBuildModal);

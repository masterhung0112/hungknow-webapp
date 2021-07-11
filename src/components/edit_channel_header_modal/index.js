// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {closeModal} from 'actions/views/modals';

import {setShowPreviewOnEditChannelHeaderModal} from 'actions/views/textbox';

import {showPreviewOnEditChannelHeaderModal} from 'selectors/views/textbox';

import {getBool} from 'hkclient-redux/selectors/entities/preferences';
import {patchChannel} from 'hkclient-redux/actions/channels';
import {Preferences} from 'hkclient-redux/constants';

import {isModalOpen} from '../../selectors/views/modals';
import {ModalIdentifiers} from '../../utils/constants';

import EditChannelHeaderModal from './edit_channel_header_modal.jsx';

function mapStateToProps(state) {
    return {
        shouldShowPreview: showPreviewOnEditChannelHeaderModal(state),
        show: isModalOpen(state, ModalIdentifiers.EDIT_CHANNEL_HEADER),
        ctrlSend: getBool(state, Preferences.CATEGORY_ADVANCED_SETTINGS, 'send_on_ctrl_enter'),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            closeModal,
            patchChannel,
            setShowPreview: setShowPreviewOnEditChannelHeaderModal,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditChannelHeaderModal);

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {openModal} from 'actions/views/modals';

import {Preferences, TutorialSteps} from 'utils/constants';

import * as Utils from 'utils/utils.jsx';

import {getFirstAdminVisitMarketplaceStatus} from 'hkclient-redux/actions/general';
import {getConfig, getFirstAdminVisitMarketplaceStatus as firstAdminVisitMarketplaceStatus} from 'hkclient-redux/selectors/entities/general';

import {getCurrentTeam} from 'hkclient-redux/selectors/entities/teams';
import {getCurrentUser} from 'hkclient-redux/selectors/entities/users';
import {getInt} from 'hkclient-redux/selectors/entities/preferences';

import SidebarHeaderDropdown from './sidebar_header_dropdown.jsx';

function mapStateToProps(state) {
    const currentTeam = getCurrentTeam(state);
    const currentUser = getCurrentUser(state);
    const showTutorialTip = getInt(state, Preferences.TUTORIAL_STEP, currentUser.id) === TutorialSteps.MENU_POPOVER && !Utils.isMobile();

    const config = getConfig(state);
    const enablePluginMarketplace = config.PluginsEnabled === 'true' && config.EnableMarketplace === 'true';

    return {
        currentUser,
        teamDescription: currentTeam.description,
        teamDisplayName: currentTeam.display_name,
        teamId: currentTeam.id,
        showTutorialTip,
        enablePluginMarketplace,
        firstAdminVisitMarketplaceStatus: firstAdminVisitMarketplaceStatus(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            openModal,
            getFirstAdminVisitMarketplaceStatus,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarHeaderDropdown);

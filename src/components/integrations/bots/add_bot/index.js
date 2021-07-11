// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {updateUserRoles, uploadProfileImage, setDefaultProfileImage, createUserAccessToken} from 'hkclient-redux/actions/users';
import {createBot, patchBot} from 'hkclient-redux/actions/bots';
import {getBotAccounts} from 'hkclient-redux/selectors/entities/bots';
import {getConfig} from 'hkclient-redux/selectors/entities/general';
import {getUser} from 'hkclient-redux/selectors/entities/users';
import {haveISystemPermission} from 'hkclient-redux/selectors/entities/roles';
import {Permissions} from 'hkclient-redux/constants';

import AddBot from './add_bot.jsx';

function mapStateToProps(state, ownProps) {
    const config = getConfig(state);
    const botId = (new URLSearchParams(ownProps.location.search)).get('id');
    const bots = getBotAccounts(state);
    const bot = bots ? bots[botId] : null;
    const user = bot ? getUser(state, bot.user_id) : null;
    const roles = user ? user.roles : null;
    return {
        maxFileSize: parseInt(config.MaxFileSize, 10),
        bot,
        roles,
        editingUserHasManageSystem: haveISystemPermission(state, {permission: Permissions.MANAGE_SYSTEM}),
        user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            createBot,
            patchBot,
            uploadProfileImage,
            setDefaultProfileImage,
            createUserAccessToken,
            updateUserRoles,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBot);

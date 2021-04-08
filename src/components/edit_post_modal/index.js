// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addMessageIntoHistory } from 'hkclient-ts/lib/actions/posts'
import { Preferences, Permissions } from 'hkclient-ts/lib/constants'
import { getConfig } from 'hkclient-ts/lib/selectors/entities/general'
import { haveIChannelPermission } from 'hkclient-ts/lib/selectors/entities/roles'
import { getCurrentTeamId } from 'hkclient-ts/lib/selectors/entities/teams'
import { getCurrentChannelId } from 'hkclient-ts/lib/selectors/entities/channels'
import { getCurrentUserId } from 'hkclient-ts/lib/selectors/entities/users'
import { getBool } from 'hkclient-ts/lib/selectors/entities/preferences'

import { openModal } from 'actions/views/modals'
import { setShowPreviewOnEditPostModal } from 'actions/views/textbox'
import { showPreviewOnEditPostModal } from 'selectors/views/textbox'
import { hideEditPostModal } from 'actions/post_actions'
import { editPost } from 'actions/views/posts'
import { getEditingPost } from 'selectors/posts'
import Constants from 'utils/constants'

import EditPostModal from './edit_post_modal.jsx'

function mapStateToProps(state) {
  const config = getConfig(state)
  const editingPost = getEditingPost(state)
  const currentUserId = getCurrentUserId(state)
  const channelId = getCurrentChannelId(state)
  const teamId = getCurrentTeamId(state)
  let canDeletePost = false
  let canEditPost = false
  if (editingPost && editingPost.post && editingPost.post.user_id === currentUserId) {
    canDeletePost = haveIChannelPermission(state, {
      channel: channelId,
      team: teamId,
      permission: Permissions.DELETE_POST,
    })
    canEditPost = haveIChannelPermission(state, { channel: channelId, team: teamId, permission: Permissions.EDIT_POST })
  } else {
    canDeletePost = haveIChannelPermission(state, {
      channel: channelId,
      team: teamId,
      permission: Permissions.DELETE_OTHERS_POSTS,
    })
    canEditPost = haveIChannelPermission(state, {
      channel: channelId,
      team: teamId,
      permission: Permissions.EDIT_OTHERS_POSTS,
    })
  }

  const useChannelMentions = haveIChannelPermission(state, {
    channel: channelId,
    team: teamId,
    permission: Permissions.USE_CHANNEL_MENTIONS,
  })

  return {
    canEditPost,
    canDeletePost,
    codeBlockOnCtrlEnter: getBool(state, Preferences.CATEGORY_ADVANCED_SETTINGS, 'code_block_ctrl_enter', true),
    ctrlSend: getBool(state, Preferences.CATEGORY_ADVANCED_SETTINGS, 'send_on_ctrl_enter'),
    config,
    editingPost,
    channelId,
    shouldShowPreview: showPreviewOnEditPostModal(state),
    maxPostSize: parseInt(config.MaxPostSize, 10) || Constants.DEFAULT_CHARACTER_LIMIT,
    useChannelMentions,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        addMessageIntoHistory,
        editPost,
        hideEditPostModal,
        openModal,
        setShowPreview: setShowPreviewOnEditPostModal,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPostModal)
// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, { MouseEvent } from 'react'
import { FormattedMessage } from 'react-intl'

import { Post } from 'hkclient-ts/lib/types/posts'
import { FileInfo } from 'hkclient-ts/lib/types/files'
import { DispatchFunc, GetStateFunc } from 'hkclient-ts/lib/types/actions'
import { ExtendedPost } from 'hkclient-ts/lib/actions/posts'

type CreatePostAction = (post: Post, files?: FileInfo[]) => (dispatch: DispatchFunc) => Promise<{ data: boolean }>
type RemovePostAction = (post: ExtendedPost) => (dispatch: DispatchFunc, getState: GetStateFunc) => void

type Props = {
  post: Post
  actions: {
    createPost: CreatePostAction
    removePost: RemovePostAction
  }
}

export default class FailedPostOptions extends React.PureComponent<Props> {
  retryPost = (e: MouseEvent): void => {
    e.preventDefault()

    const post = { ...this.props.post }
    Reflect.deleteProperty(post, 'id')
    this.props.actions.createPost(post)
  }

  cancelPost = (e: MouseEvent): void => {
    e.preventDefault()

    this.props.actions.removePost(this.props.post)
  }

  render(): JSX.Element {
    return (
      <span className="pending-post-actions">
        <a className="post-retry" href="#" onClick={this.retryPost}>
          <FormattedMessage id="pending_post_actions.retry" defaultMessage="Retry" />
        </a>
        {' - '}
        <a className="post-cancel" href="#" onClick={this.cancelPost}>
          <FormattedMessage id="pending_post_actions.cancel" defaultMessage="Cancel" />
        </a>
      </span>
    )
  }
}

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux'

import { getConfig } from 'hkclient-ts/lib/selectors/entities/general'
import { GlobalState } from 'hkclient-ts/lib/types/store'
import { GenericAction } from 'hkclient-ts/lib/types/actions'

import { installPlugin } from 'actions/marketplace'
import { closeModal } from 'actions/views/modals'
import { ModalIdentifiers } from 'utils/constants'
import { getInstalling, getError } from 'selectors/views/marketplace'
import { trackEvent } from 'actions/telemetry_actions.jsx'

import MarketplaceItem, { MarketplaceItemProps } from './marketplace_item'

type Props = {
  id: string
}

function mapStateToProps(state: GlobalState, props: Props) {
  const installing = getInstalling(state, props.id)
  const error = getError(state, props.id)
  const isDefaultMarketplace = getConfig(state).IsDefaultMarketplace === 'true'

  return {
    installing,
    error,
    isDefaultMarketplace,
    trackEvent,
  }
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
  return {
    actions: bindActionCreators<ActionCreatorsMapObject, MarketplaceItemProps['actions']>(
      {
        installPlugin,
        closeMarketplaceModal: () => closeModal(ModalIdentifiers.PLUGIN_MARKETPLACE),
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketplaceItem)
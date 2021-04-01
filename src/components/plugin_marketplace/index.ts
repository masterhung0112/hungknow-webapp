// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux'

import { GlobalState } from 'hkclient-ts/lib/types/store'
import { GenericAction, ActionFunc } from 'hkclient-ts/lib/types/actions'

import { setFirstAdminVisitMarketplaceStatus } from 'hkclient-ts/lib/actions/general'
import { getFirstAdminVisitMarketplaceStatus } from 'hkclient-ts/lib/selectors/entities/general'

import { getPlugins, getInstalledPlugins } from 'selectors/views/marketplace'
import { isModalOpen } from 'selectors/views/modals'
import { ModalIdentifiers } from 'utils/constants'
import { getSiteURL } from 'utils/url'

import { closeModal } from 'actions/views/modals'
import { fetchPlugins, filterPlugins } from 'actions/marketplace'

import { MarketplaceModal } from './marketplace_modal'

function mapStateToProps(state: GlobalState) {
  return {
    show: isModalOpen(state, ModalIdentifiers.PLUGIN_MARKETPLACE),
    plugins: getPlugins(state),
    installedPlugins: getInstalledPlugins(state),
    siteURL: getSiteURL(),
    pluginStatuses: state.entities.admin.pluginStatuses,
    firstAdminVisitMarketplaceStatus: getFirstAdminVisitMarketplaceStatus(state),
  }
}

type Actions = {
  closeModal(): void
  fetchPlugins(localOnly?: boolean): Promise<{ error?: Error }>
  filterPlugins(filter: string): Promise<{ error?: Error }>
  setFirstAdminVisitMarketplaceStatus(): Promise<void>
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
  return {
    actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc | GenericAction>, Actions>(
      {
        closeModal: () => closeModal(ModalIdentifiers.PLUGIN_MARKETPLACE),
        fetchPlugins,
        filterPlugins,
        setFirstAdminVisitMarketplaceStatus,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketplaceModal)

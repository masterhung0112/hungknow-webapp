// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux'
import { Stripe } from '@stripe/stripe-js'

import { getConfig } from 'hkclient-ts/lib/selectors/entities/general'
import { GenericAction, ActionFunc } from 'hkclient-ts/lib/types/actions'
import { getCloudProducts, getCloudSubscription } from 'hkclient-ts/lib/actions/cloud'
import { getClientConfig } from 'hkclient-ts/lib/actions/general'

import { GlobalState } from 'types/store'
import { BillingDetails } from 'types/cloud/sku'

import { isModalOpen } from 'selectors/views/modals'
import { getCloudContactUsLink, InquiryType } from 'selectors/cloud'

import { ModalIdentifiers } from 'utils/constants'

import { closeModal } from 'actions/views/modals'
import { completeStripeAddPaymentMethod } from 'actions/cloud'

import PurchaseModal from './purchase_modal'

function mapStateToProps(state: GlobalState) {
  return {
    show: isModalOpen(state, ModalIdentifiers.CLOUD_PURCHASE),
    products: state.entities.cloud!.products,
    isDevMode: getConfig(state).EnableDeveloper === 'true',
    contactSupportLink: getCloudContactUsLink(state, InquiryType.Technical),
    contactSalesLink: getCloudContactUsLink(state, InquiryType.Sales),
  }
}
type Actions = {
  closeModal: () => void
  getCloudProducts: () => void
  completeStripeAddPaymentMethod: (
    stripe: Stripe,
    billingDetails: BillingDetails,
    isDevMode: boolean
  ) => Promise<boolean | null>
  getClientConfig: () => void
  getCloudSubscription: () => void
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
  return {
    actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>(
      {
        closeModal: () => closeModal(ModalIdentifiers.CLOUD_PURCHASE),
        getCloudProducts,
        completeStripeAddPaymentMethod,
        getClientConfig,
        getCloudSubscription,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseModal)

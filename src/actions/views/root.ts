import { DispatchFunc } from 'hkclient-ts/lib/types/actions'
import { getClientConfig, getLicenseConfig } from 'hkclient-ts/lib/actions/general'
import * as UserActions from 'hkclient-ts/lib/actions/users'
import { getSubscriptionStats } from 'hkclient-ts/lib/actions/cloud'

export function loadMeAndConfig() {
  return async (dispatch: DispatchFunc) => {
    // if any new promise needs to be added please be mindful of the order as it is used in root.jsx for redirection
    const promises = [dispatch(getClientConfig()), dispatch(getLicenseConfig())]

    // need to await for clientConfig first as it is required for loadMe
    const resolvedPromises = await Promise.all(promises)
    if (document.cookie.indexOf('HKUSERID=') > -1) {
      resolvedPromises.push(await dispatch(UserActions.loadMe()))
    }

    // load the cloud subscription stats
    const isCloud = resolvedPromises[1]?.data?.Cloud === 'true'
    if (isCloud) {
      resolvedPromises.push(await dispatch(getSubscriptionStats()))
    }

    return resolvedPromises
  }
}

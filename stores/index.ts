import configureServiceStore from 'hkclient-ts/store'
import appReducer from 'reducers'

function getAppReducer() {
    return require('../reducers')
}

export default function configureStore(initialState = undefined) {

    const offlineOptions = {

    }

    return configureServiceStore({}, appReducer, offlineOptions, getAppReducer, {enableBuffer: false})
}
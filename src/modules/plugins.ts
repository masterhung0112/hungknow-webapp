import PluginsConstants from 'constants/plugins'

import { IModule } from 'redux-dynamic-modules-core'
import { PluginsAwareState } from 'types/plugins'

import pluginsReducer from '../reducers/plugins'

export const PluginsModule: IModule<PluginsAwareState> = {
  id: PluginsConstants.PLUGINS_MODULE_NAME,
  reducerMap: {
    [PluginsConstants.PLUGINS_MODULE_NAME]: pluginsReducer,
  },
}

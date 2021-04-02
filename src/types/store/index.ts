import { GlobalState as BaseGlobalState } from 'hkclient-ts/lib/types/store'
import { Dictionary } from 'hkclient-ts/lib/types/utilities'

import { PluginsState } from './plugins'
import { ViewsState } from './views'

export type DraggingState = {
  state?: string
  type?: string
  id?: string
}

export interface GlobalState extends BaseGlobalState {
  plugins: PluginsState
  storage: {
    storage: Dictionary<any>
    initialized: boolean
  }
  views: ViewsState
}

export type GetStateFunc = () => GlobalState;


import { GlobalState as BaseGlobalState } from 'hkclient-ts/lib/types/store'
import { Dictionary } from 'hkclient-ts/lib/types/utilities'

export type GlobalState = BaseGlobalState & {
    storage: {
        storage: Dictionary<any>;
    }
}

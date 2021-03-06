import { Dictionary } from 'hkclient-ts/lib/types/utilities'
import StorageConstants from '../constants/storage'

export interface StorageAwareState {
  [StorageConstants.STORAGE_MODULE_NAME]: StorageState
}

export type StorageState = Readonly<{
  storage: Dictionary<any>
  initialized: boolean
}>

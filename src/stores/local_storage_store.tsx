import { getRedirectChannelNameForTeam } from 'hkclient-redux/selectors/entities/channels'

import store from 'stores/redux_store'
import { getBasePath } from 'selectors/general'

const getPreviousTeamIdKey = (userId: any) => ['user_prev_team', userId].join(':')
const getPreviousChannelNameKey = (userId: any, teamId: any) => ['user_team_prev_channel', userId, teamId].join(':')
export const getPenultimateChannelNameKey = (userId: any, teamId: any) =>
  ['user_team_penultimate_channel', userId, teamId].join(':')
const getRecentEmojisKey = (userId: any) => ['recent_emojis', userId].join(':')
const getWasLoggedInKey = () => 'was_logged_in'
const teamIdJoinedOnLoadKey = 'teamIdJoinedOnLoad'

const getPathScopedKey = (path: string, key: any) => {
  if (path === '' || path === '/') {
    return key
  }

  return [path, key].join(':')
}

// LocalStorageStore exposes an interface for accessing entries in the localStorage.
//
// Note that this excludes keys managed by redux-persist. The latter cannot currently be used for
// key/value storage that persists beyond logout. Ideally, we could purge all but certain parts
// of the Redux store so as to allow them to be used on re-login.

// Lets open a separate issue to refactor local storage and state interactions.
// This whole store can be connected to redux
class LocalStorageStoreClass {
  getItem(key: string, state = store.getState()) {
    const basePath = getBasePath(state)

    return localStorage.getItem(getPathScopedKey(basePath, key))
  }

  setItem(key: string, value: string) {
    const state = store.getState()
    const basePath = getBasePath(state)

    localStorage.setItem(getPathScopedKey(basePath, key), value)
  }

  getPreviousChannelName(userId: string, teamId: string, state = store.getState()) {
    return (
      this.getItem(getPreviousChannelNameKey(userId, teamId), state) || getRedirectChannelNameForTeam(state, teamId)
    )
  }

  removeItem(key: string) {
    const state = store.getState()
    const basePath = getBasePath(state)

    localStorage.removeItem(getPathScopedKey(basePath, key))
  }

  setPreviousChannelName(userId: string, teamId: string, channelName: string) {
    this.setItem(getPreviousChannelNameKey(userId, teamId), channelName)
  }

  getPenultimateChannelName(userId: string, teamId: string, state = store.getState()) {
    return (
      this.getItem(getPenultimateChannelNameKey(userId, teamId), state) || getRedirectChannelNameForTeam(state, teamId)
    )
  }

  setPenultimateChannelName(userId: string, teamId: string, channelName: string) {
    this.setItem(getPenultimateChannelNameKey(userId, teamId), channelName)
  }

  removePreviousChannelName(userId: string, teamId: string, state = store.getState()) {
    this.setItem(getPreviousChannelNameKey(userId, teamId), this.getPenultimateChannelName(userId, teamId, state))
    this.removeItem(getPenultimateChannelNameKey(userId, teamId))
  }

  removePenultimateChannelName(userId: string, teamId: string) {
    this.removeItem(getPenultimateChannelNameKey(userId, teamId))
  }

  getPreviousTeamId(userId: string) {
    return this.getItem(getPreviousTeamIdKey(userId))
  }

  setPreviousTeamId(userId: string, teamId: string) {
    this.setItem(getPreviousTeamIdKey(userId), teamId)
  }

  getRecentEmojis(userId: string) {
    const recentEmojis = this.getItem(getRecentEmojisKey(userId))
    if (!recentEmojis) {
      return null
    }

    return JSON.parse(recentEmojis)
  }

  setRecentEmojis(userId: string, recentEmojis: any = []) {
    if (recentEmojis.length) {
      this.setItem(getRecentEmojisKey(userId), JSON.stringify(recentEmojis))
    }
  }

  getTeamIdJoinedOnLoad() {
    return this.getItem(teamIdJoinedOnLoadKey)
  }

  setTeamIdJoinedOnLoad(teamId: string) {
    this.setItem(teamIdJoinedOnLoadKey, teamId)
  }

  setWasLoggedIn(wasLoggedIn: boolean) {
    if (wasLoggedIn) {
      this.setItem(getWasLoggedInKey(), 'true')
    } else {
      this.setItem(getWasLoggedInKey(), 'false')
    }
  }

  getWasLoggedIn() {
    return this.getItem(getWasLoggedInKey()) === 'true'
  }
}

const LocalStorageStore = new LocalStorageStoreClass()

export default LocalStorageStore

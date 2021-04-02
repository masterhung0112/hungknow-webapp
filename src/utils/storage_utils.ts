import { GlobalState } from "hkclient-ts/lib/types/store"

export function getPrefix(state: GlobalState) {
  if (state && state.entities.users && state.entities.users.profiles) {
    const user = state.entities.users.profiles[state.entities.users.currentUserId]
    if (user) {
      return user.id + '_'
    }
  }

  return 'unknown_'
}

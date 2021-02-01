import { USERS_MODULE_NAME } from 'hkclient-ts/lib/constants'
import { UsersAwareState } from 'hkclient-ts/lib/types/users'

export function getPrefix(state: UsersAwareState) {
  if (state && state[USERS_MODULE_NAME] && state[USERS_MODULE_NAME].profiles) {
    const user = state[USERS_MODULE_NAME].profiles[state[USERS_MODULE_NAME].currentUserId]
    if (user) {
      return user.id + '_'
    }
  }

  return 'unknown_'
}

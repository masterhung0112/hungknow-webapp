import keyMirror from 'hkclient-ts/lib/utils/key_mirror'

export const Constants = {
  MOBILE_SCREEN_WIDTH: 768,

  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 22,
  MAX_NICKNAME_LENGTH: 22,
  MIN_PASSWORD_LENGTH: 5,
  MAX_PASSWORD_LENGTH: 64,
  MAX_POSITION_LENGTH: 128,
  MIN_TRIGGER_LENGTH: 1,
  MAX_TRIGGER_LENGTH: 128,
  MAX_SITENAME_LENGTH: 30,
}

export const ActionTypes = keyMirror({
  STORE_REHYDRATION_FAILED: null,
})

import { isMobile } from 'react-device-detect'

export function isPhone() {
  if (process.browser) {
    return isMobile
  }

  return false
}
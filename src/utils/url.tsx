import * as Utils from './utils'

type WindowObject = {
  location: {
    origin: string
    protocol: string
    hostname: string
    port: string
  }
  basename?: string
}

export function getSiteURLFromWindowObject(obj: WindowObject): string {
  let siteURL = ''
  if (obj.location.origin) {
    siteURL = obj.location.origin
  } else {
    siteURL = obj.location.protocol + '//' + obj.location.hostname + (obj.location.port ? ':' + obj.location.port : '')
  }

  if (siteURL[siteURL.length - 1] === '/') {
    siteURL = siteURL.substring(0, siteURL.length - 1)
  }

  if (obj.basename) {
    siteURL += obj.basename
  }

  if (siteURL[siteURL.length - 1] === '/') {
    siteURL = siteURL.substring(0, siteURL.length - 1)
  }

  return siteURL
}

export function getSiteURL(): string {
  console.log('site url', Utils.isServer)
  if (Utils.isServer) {
    return 'http://localhost:8065'
  } else {
    return getSiteURLFromWindowObject(window)
  }
}

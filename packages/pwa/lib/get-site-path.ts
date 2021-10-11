/**
 * Polyfill Global Variables in Server
 */
if (!process.browser) {
  global.URL = require('url').URL
}

export const getSiteURLFromPath = (path = '/') => {
  return new URL(path, process.env.NEXT_PUBLIC_URL).href
}

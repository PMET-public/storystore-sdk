const withTM = require('next-transpile-modules')(['@storystore/ui-kit'])

module.exports = withTM({
  async rewrites() {
    return [
      /** Proxy to AEM. Images, etc */
      {
        source: '/__aem/:pathname*',
        destination: '/api/__aem',
      },

      /** Adventure */
      {
        source: '/content/dam/wknd/:locale/adventures/:pathname*',
        destination: '/adventure',
      },
    ]
  },
})

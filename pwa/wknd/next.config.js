const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')(['@storystore/ui-kit'])
const withStoryStore = require('@storystore/ui-kit/nextjs')

module.exports = withPlugins([withTM, withStoryStore], {
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

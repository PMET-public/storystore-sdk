const withPlugins = require('next-compose-plugins')
const withStoryStore = require('@storystore/ui-kit/nextjs')
const withPWA = require('next-pwa')

module.exports = withPlugins([withPWA, withStoryStore], {
  experimental: {
    esmExternals: 'loose',
  },

  pwa: {
    dest: '.next/static',
    disable: process.env.NODE_ENV === 'development',
  },

  async rewrites() {
    return [
      /** Service Worker (Workbox) */
      {
        source: '/sw.js',
        destination: '/_next/static/sw.js',
      },
      {
        source: '/workbox-:hash.js',
        destination: '/_next/static/workbox-:hash.js',
      },

      {
        source: '/__graphql/:pathname*',
        destination: '/api/graphql/:pathname*',
      },
      /** Proxy to AEM. Images, and other files */
      {
        source: '/content/dam/:site/:locale/:pathname*(.jpg|.png|.gif|.svg|.jpg|.jpeg|.pdf|.zip)',
        destination: '/api/remote',
      },
      /** Adventure */
      {
        source: '/content/dam/:site/:locale/adventures/:pathname*',
        destination: '/adventure',
      },
    ]
  },

  webpack: config => {
    config.module.rules = config.module.rules.map(rule => {
      if (!rule.oneOf) return rule

      rule.oneOf = rule.oneOf.map(x => {
        if (x.test && x.test.toString() === '/\\.module\\.css$/') {
          delete x.issuer
          return x
        }

        return x
      })

      return rule
    })

    return config
  },
})

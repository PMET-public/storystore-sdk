const { createProxyMiddleware } = require('http-proxy-middleware')
const { URL, URLSearchParams } = require('url')

const ADDON_ID = 'storybook-variables'

module.exports = function expressMiddleware(router) {
  router.use('/content/dam/', (req, res, next) => {
    const cookie = req.headers.cookie.match(new RegExp(ADDON_ID + '=([^;]+)'))
    const settings = cookie ? JSON.parse(decodeURIComponent(cookie[1])) : null

    const searchQuery = new URL(req.headers.referer).search
    const id = new URLSearchParams(searchQuery).get('id')

    const target = new URL(settings ? settings[id].graphQlEndpoint : process.env.GRAPHQL_URL).origin
    const auth = settings ? settings[id].graphQlBasicAuth : process.env.GRAPHQL_AUTH

    createProxyMiddleware({
      auth,
      target,
      changeOrigin: true,
    })(req, res, next)
  })
}

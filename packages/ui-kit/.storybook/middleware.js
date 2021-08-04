const { createProxyMiddleware } = require('http-proxy-middleware')
const { URL, URLSearchParams } = require('url')
const express = require('express')
const path = require('path')

const ADDON_ID = 'storybook-variables'

module.exports = function expressMiddleware(router) {
  router.use('/__aem/', (req, res, next) => {
    const cookie = req.headers.cookie && req.headers.cookie.match(new RegExp(ADDON_ID + '=([^;]+)'))
    const settings = cookie ? JSON.parse(decodeURIComponent(cookie[1])) : null

    const searchQuery = new URL(req.headers.referer).search
    const id = new URLSearchParams(searchQuery).get('id')

    const target = new URL(settings && settings[id] ? settings[id].graphQlEndpoint : process.env.GRAPHQL_URL).origin
    const auth = settings && settings[id] ? settings[id].graphQlBasicAuth : process.env.GRAPHQL_AUTH

    createProxyMiddleware({
      auth,
      target,
      changeOrigin: true,
      pathRewrite: { '^/__aem': '' },
    })(req, res, next)
  })

  router.use('/__assets/:site/', (req, res, next) => {
    const site = req.params.site
    const pathname = path.join(__dirname, `../src/experiences/${site}/assets`)
    express.static(pathname)(req, res, next)
  })
}

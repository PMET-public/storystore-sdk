const { createProxyMiddleware, fixRequestBody } = require('http-proxy-middleware')
const { URL, URLSearchParams } = require('url')
const express = require('express')
const path = require('path')
const { cookies } = require('@storystore/toolbox')

module.exports = function expressMiddleware(router) {
  /** Static Assets */
  router.use('/__assets/:site/', (req, res, next) => {
    const site = req.params.site
    const pathname = path.join(__dirname, `../src/experiences/${site}/assets`)
    express.static(pathname)(req, res, next)
  })

  /** AEM Proxy */
  router.use(['^/__graphql', '^/content'], (req, res, next) => {
    const cookie = cookies.getCookieValueFromString(req.headers.cookie, 'storybook-variables')
    const settings = JSON.parse(cookie)
    const searchQuery = new URL(req.headers.referer).search
    const id = new URLSearchParams(searchQuery).get('id')

    const {
      AEM_HOST = process.env.AEM_HOST,
      AEM_AUTH = process.env.AEM_AUTH,
      AEM_GRAPHQL_PATH = process.env.AEM_GRAPHQL_PATH,
    } = (settings || {})[id] || {}

    const endpoint = new URL(AEM_GRAPHQL_PATH, AEM_HOST)

    createProxyMiddleware({
      auth: AEM_AUTH,
      target: endpoint.origin,
      changeOrigin: false,
      onProxyReq: fixRequestBody,
      pathRewrite: {
        __graphql: endpoint.pathname,
      },
    })(req, res, next)
  })
}

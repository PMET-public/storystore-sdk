const { createProxyMiddleware, fixRequestBody } = require('http-proxy-middleware')
const { URL, URLSearchParams } = require('url')
const express = require('express')
const path = require('path')
const { cookies } = require('@storystore/toolbox')

const ADDON_ID = 'storybook-variables'

module.exports = function expressMiddleware(router) {
  /** Static Assets */
  router.use('/__assets/:site/', (req, res, next) => {
    const site = req.params.site
    const pathname = path.join(__dirname, `../src/experiences/${site}/assets`)
    express.static(pathname)(req, res, next)
  })

  /** AEM Proxy */
  router.use(['^/__graphql', '^/content'], (req, res, next) => {
    const cookie = cookies.getCookieValueFromString(req.headers.cookie, ADDON_ID)
    const settings = JSON.parse(cookie)
    const searchQuery = new URL(req.headers.referer).search
    const id = new URLSearchParams(searchQuery).get('id')

    const {
      AEMEndpoint = process.env.AEM_HOST,
      AEMBasicAuth = process.env.AEM_AUTH,
      graphQlPath = process.env.AEM_GRAPHQL_PATH,
    } = (settings || {})[id] || {}

    const endpoint = new URL(graphQlPath, AEMEndpoint)

    createProxyMiddleware({
      auth: AEMBasicAuth,
      target: endpoint.origin,
      changeOrigin: false,
      onProxyReq: fixRequestBody,
      pathRewrite: {
        __graphql: endpoint.pathname,
      },
    })(req, res, next)
  })
}

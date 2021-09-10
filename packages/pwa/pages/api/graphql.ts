import { NextApiRequest, NextApiResponse } from 'next'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { cookies } from '@storystore/toolbox'
import { URL } from 'url'
import { runMiddleware } from '../../lib/run-middleware'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const settings = JSON.parse(cookies.getCookieValueFromString(req.headers.cookie, 'STORYSTORE_SETTINGS') || '{}')
  const endpoint = new URL(settings.AEM_GRAPHQL_URL || process.env.AEM_GRAPHQL_URL)
  const auth = settings.AEM_GRAPHQL_AUTH ?? process.env.AEM_GRAPHQL_AUTH

  await runMiddleware(
    req,
    res,
    createProxyMiddleware({
      auth,
      target: endpoint.origin,
      changeOrigin: false,
      pathRewrite: { '^/__graphql': endpoint.pathname },
    })
  )
}

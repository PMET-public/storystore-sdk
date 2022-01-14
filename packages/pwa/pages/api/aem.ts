import { NextApiRequest, NextApiResponse } from 'next'
import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware'
import { cookies } from '@storystore/toolbox'
import { runMiddleware } from '../../lib/run-middleware'
import { URL } from 'url'

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookie = cookies.getCookieValueFromString(req.headers.cookie, 'STORYSTORE_SETTINGS')
  const settings = JSON.parse(cookie)

  const AEM_HOST = settings?.AEM_HOST ?? process.env.AEM_HOST
  const AEM_AUTH = settings?.AEM_AUTH ?? process.env.AEM_AUTH
  const AEM_GRAPHQL_PATH = settings?.AEM_GRAPHQL_PATH ?? process.env.AEM_GRAPHQL_PATH

  return runMiddleware(
    req,
    res,
    createProxyMiddleware({
      logLevel: process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      target: new URL(AEM_HOST).origin,
      auth: AEM_AUTH,
      changeOrigin: true,
      selfHandleResponse: true,
      // ws: true,
      pathRewrite: {
        '/api/aem/graphql': AEM_GRAPHQL_PATH,
      },

      onProxyRes: responseInterceptor(async responseBuffer => {
        return responseBuffer
      }),

      onError({ code }: any) {
        if (code === 'ECONNREFUSED' || code === 'ENOTFOUND') {
          res.status(404).json({})
        }
      },
    })
  )
}

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

  const COMMERCE_HOST = settings?.COMMERCE_HOST ?? process.env.COMMERCE_HOST
  const COMMERCE_AUTH = settings?.COMMERCE_AUTH ?? process.env.COMMERCE_AUTH

  return runMiddleware(
    req,
    res,
    createProxyMiddleware({
      logLevel: process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      target: new URL(COMMERCE_HOST).origin,
      auth: COMMERCE_AUTH,
      changeOrigin: true,
      selfHandleResponse: true,
      // ws: true,
      pathRewrite: {
        '/api/magento/graphql': '/graphql',
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

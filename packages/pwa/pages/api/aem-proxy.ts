import { NextApiRequest, NextApiResponse } from 'next'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { cookies } from '@storystore/toolbox'
import { runMiddleware } from '../../lib/run-middleware'
import { URL } from 'url'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookie = cookies.getCookieValueFromString(req.headers.cookie, 'STORYSTORE_SETTINGS')
  const settings = JSON.parse(cookie)

  const AEM_HOST = settings?.AEM_HOST ?? process.env.AEM_HOST
  const AEM_AUTH = settings?.AEM_AUTH ?? process.env.AEM_AUTH
  const AEM_GRAPHQL_PATH = settings?.AEM_GRAPHQL_PATH ?? process.env.AEM_GRAPHQL_PATH

  await runMiddleware(
    req,
    res,
    createProxyMiddleware({
      target: new URL(AEM_HOST).origin,
      auth: AEM_AUTH,
      changeOrigin: true,
      pathRewrite: {
        '/__graphql': AEM_GRAPHQL_PATH,
      },
      onError({ code }: any) {
        if (code === 'ECONNREFUSED' || code === 'ENOTFOUND') {
          res.status(404)
          res.send({})
        }
      },
    })
  )
}

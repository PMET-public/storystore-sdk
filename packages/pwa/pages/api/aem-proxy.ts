import { NextApiRequest, NextApiResponse } from 'next'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { runMiddleware } from '../../lib/run-middleware'
import { URL } from 'url'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const target = new URL(process.env.AEM_HOST).origin

  const origin = new URL(process.env.NEXT_PUBLIC_URL).origin

  const auth = process.env.AEM_AUTH

  const graphQLPath = process.env.AEM_GRAPHQL_PATH

  await runMiddleware(
    req,
    res,
    createProxyMiddleware({
      target,
      auth,
      changeOrigin: false,
      headers: {
        origin,
      },
      pathRewrite: {
        '/__graphql': graphQLPath,
      },

      onError: ({ code }: any) => {
        if (code === 'ECONNREFUSED' || code === 'ENOTFOUND') {
          res.status(404)
          res.send({})
        }
      },
    })
  )
}

import { NextApiRequest, NextApiResponse } from 'next'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { cookies } from '@storystore/toolbox'
import { URL } from 'url'

export const config = {
  api: {
    bodyParser: false,
  },
}

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const overrideTarget = cookies.getCookieValueFromString(req.headers.cookie, 'AEM_GRAPHQL_URL')
  const endpoint = new URL(overrideTarget || process.env.NEXT_PUBLIC_AEM_GRAPHQL_URL)

  const overrideAuth = cookies.getCookieValueFromString(req.headers.cookie, 'AEM_GRAPHQL_AUTH')
  const auth = overrideAuth || process.env.NEXT_PUBLIC_AEM_GRAPHQL_AUTH

  await runMiddleware(
    req,
    res,
    createProxyMiddleware({
      auth,
      target: endpoint.origin,
      changeOrigin: true,
      pathRewrite: { '^/__graphql': endpoint.pathname },
    })
  )
}

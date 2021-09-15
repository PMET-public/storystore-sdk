import { NextApiRequest, NextApiResponse } from 'next'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { runMiddleware } from '../../lib/run-middleware'
import { getEnvironmentVariables } from '../../lib/graphql-variables'
import { auth } from '@storystore/toolbox'
import { URL } from 'url'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { AEM_GRAPHQL_URL, AEM_GRAPHQL_AUTH } = getEnvironmentVariables(req)

  const endpoint = new URL(AEM_GRAPHQL_URL)

  await runMiddleware(
    req,
    res,
    createProxyMiddleware({
      target: endpoint.origin,
      changeOrigin: false,
      pathRewrite: { '^/__graphql': endpoint.pathname },
      headers: {
        Authorization: AEM_GRAPHQL_AUTH && auth.getBasicAuthenticationHeader(AEM_GRAPHQL_AUTH.split(':')),
      },
      // @ts-ignore
      onError: ({ code }) => {
        if (code === 'ECONNREFUSED' || code === 'ENOTFOUND') {
          res.status(404)
          res.send({})
        }
      },
    })
  )
}

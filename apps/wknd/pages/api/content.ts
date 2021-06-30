import { NextApiRequest, NextApiResponse } from 'next'
import http from 'http'
import https from 'https'
import { URL } from 'url'

export const config = {
  api: {
    bodyParser: false,
  },
}

const DEFAULT_AEM_GRAPHQL_URL = 'http://localhost:4502/content/graphql/global/endpoint.json'

const contentApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const url = new URL(req.cookies.AEM_GRAPHQL_URL || DEFAULT_AEM_GRAPHQL_URL)

  const credentials = req.cookies.AEM_GRAPHQL_AUTH || 'admin:admin'

  const [username, password] = credentials.split(':')

  const basicAuth =
    username && password ? 'Basic ' + Buffer.from(username + ':' + password).toString('base64') : undefined

  const options = {
    hostname: url.hostname,
    port: url.port,
    path: url.pathname,
    method: req.method,
    headers: {
      ...req.headers,
      Authorization: basicAuth,
    },
  }

  const httpx = url.protocol === 'https:' ? https : http

  return new Promise((resolve, reject) => {
    const proxy = httpx.request(options, _res => {
      _res.pipe(res)
    })

    req
      .pipe(proxy)
      .on('response', result => {
        res.status(result.statusCode)
        resolve(result)
      })
      .on('error', error => {
        console.log({ error })
        reject(error)
      })
  })
}

export default contentApi

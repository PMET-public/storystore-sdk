import { IncomingMessage } from 'http'
import getAbsoluteUrl from 'next-absolute-url'

export const getServerSideGraphQlEndpoint = (req: IncomingMessage) => {
  return {
    ssrGraphQLEndpoint: getAbsoluteUrl(req, req.headers.origin).origin + '/__graphql',
  }
}

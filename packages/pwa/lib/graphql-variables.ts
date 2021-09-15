import { IncomingMessage } from 'http'
import { cookies, auth } from '@storystore/toolbox'

export const getEnvironmentVariables = (req: IncomingMessage) => {
  const settings = JSON.parse(cookies.getCookieValueFromString(req.headers.cookie, 'STORYSTORE_SETTINGS') || '{}')

  const AEM_GRAPHQL_URL = new URL(settings.AEM_GRAPHQL_URL || process.env.AEM_GRAPHQL_URL).href
  const AEM_GRAPHQL_AUTH = settings.AEM_GRAPHQL_AUTH ?? process.env.AEM_GRAPHQL_AUTH

  return {
    AEM_GRAPHQL_URL,
    AEM_GRAPHQL_AUTH,
  }
}

export const getServerSideApolloClientContext = (req: IncomingMessage) => {
  const { AEM_GRAPHQL_URL, AEM_GRAPHQL_AUTH } = getEnvironmentVariables(req)
  return {
    env: {
      uri: new URL(AEM_GRAPHQL_URL).href,
      basicAuth: AEM_GRAPHQL_AUTH && auth.getBasicAuthenticationHeader(AEM_GRAPHQL_AUTH.split(':')),
    },
  }
}

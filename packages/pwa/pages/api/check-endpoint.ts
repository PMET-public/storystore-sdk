import { NextApiRequest, NextApiResponse } from 'next'
import { auth } from '@storystore/toolbox'

import { ApolloClient, InMemoryCache } from '@apollo/client'
import gql from 'graphql-tag'

const QUERY = gql`
  query CheckEndpointQuery {
    __schema {
      description
    }
  }
`

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { AEM_GRAPHQL_URL, AEM_GRAPHQL_AUTH }: any = req.query || {}

  if (!AEM_GRAPHQL_URL) {
    res.send({ errors: { AEM_GRAPHQL_URL: { status: 404, message: 'Missing enpoint URL.' } } })
  }

  const authorization = AEM_GRAPHQL_AUTH ? auth.getBasicAuthenticationHeader(AEM_GRAPHQL_AUTH.split(':')) : undefined

  const client = new ApolloClient({
    uri: AEM_GRAPHQL_URL,
    headers: {
      authorization,
    },
    cache: new InMemoryCache({}),
  })

  try {
    const { data } = await client.query({ query: QUERY })

    res.send({
      status: res.statusCode,
      success: !!data,
    })
  } catch (error) {
    const { status = 500, statusText = error.message } = error.networkError?.response || {}

    switch (status) {
      case 401:
        return res.send({
          errors: {
            AEM_GRAPHQL_AUTH: {
              status,
              message: 'The GraphQL credentials provided are incorrect.',
            },
          },
        })

      case 403:
        return res.send({
          errors: {
            AEM_GRAPHQL_AUTH: {
              status,
              message: 'The GraphQL credentials provided are incorrect.',
            },
          },
        })

      case 404:
        return res.send({
          errors: {
            AEM_GRAPHQL_AUTH: { status, message: `The GraphQL endpoint provided can't be found.` },
          },
        })

      case 504:
        return res.send({
          errors: {
            AEM_GRAPHQL_URL: {
              status,
              message: `Can't connect to the GraphQL endpoint. Please make sure AEM is running.`,
            },
          },
        })

      default:
        if (error.networkError?.name === 'ServerParseError') {
          // It looks like it's not a proper GraphQL reponse
          return res.send({
            errors: {
              AEM_GRAPHQL_URL: {
                status: 500,
                message: 'Please make sure you are providing the URL to your AEM GraphQL endpoint.',
              },
            },
          })
        }

        return res.send({
          errors: {
            AEM_GRAPHQL_URL: {
              status: 500,
              message: statusText,
            },
          },
        })
    }
  }
}

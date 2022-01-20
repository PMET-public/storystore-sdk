import { useMemo } from 'react'
import merge from 'deepmerge'
import isEqual from 'lodash.isequal'
import { ApolloClient, InMemoryCache, NormalizedCacheObject, HttpLink, ApolloLink } from '@apollo/client'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject>

const cache = new InMemoryCache({
  typePolicies: {
    /**
     * Use the same Key for all Product Types to make it easier to access
     */
    SimpleProduct: {
      keyFields: ({ url_key }) => `Product:${url_key}`,
    },
    VirtualProduct: {
      keyFields: ({ url_key }) => `Product:${url_key}`,
    },
    DownloadableProduct: {
      keyFields: ({ url_key }) => `Product:${url_key}`,
    },
    GiftCardProduct: {
      keyFields: ({ url_key }) => `Product:${url_key}`,
    },
    BundleProduct: {
      keyFields: ({ url_key }) => `Product:${url_key}`,
    },
    GroupedProduct: {
      keyFields: ({ url_key }) => `Product:${url_key}`,
    },
    ConfigurableProduct: {
      keyFields: ({ url_key }) => `Product:${url_key}`,
    },

    Query: {
      fields: {
        categoryList(existing, { args, canRead, toReference }) {
          /**
           * Look for Category reference in Cache
           */
          if (args?.filters?.ids?.eq) {
            const reference = toReference({
              __typename: 'CategoryTree',
              id: args.filters.ids.eq,
            })
            return canRead(reference) ? [{ ...reference }] : [{ ...existing }]
          }
          return existing
        },
        products(existing, { args, canRead, toReference }) {
          /**
           * Look for Product reference in Cache
           */
          if (args?.filter?.url_key?.eq) {
            const reference = toReference({
              __typename: 'Product',
              id: args.filter.url_key.eq,
            })
            return canRead(reference) ? { ...existing, items: [{ ...reference }] } : { ...existing }
          }
          return { ...existing }
        },
      },
    },
  },
})

const link = new HttpLink({
  uri: new URL(process.env.NEXT_PUBLIC_ADOBE_ENDPOINT).href,
  credentials: 'same-origin',
  useGETForQueries: true,
})

const createApolloClient = () => {
  return new ApolloClient({
    connectToDevTools: process.browser,
    queryDeduplication: true,
    ssrMode: !process.browser,
    cache,
    link,
  })
}

export const initializeApollo = (initialState: { [key: string]: any } | null = null) => {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))),
      ],
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState(client: any, pageProps: any) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo(state), [state])
  return store
}

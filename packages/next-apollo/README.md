# Apollo Wrapper for Next.js

## Getting Started

### Install

`yarn add @storystore/next-apollo`

### Initalize Apollo Client

[pages/\_app.js](pages/_app.js)

```
import { initApolloClient, useApollo } from '@storystore/next-apollo'

initApolloClient(
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: 'https://nextjs-graphql-with-prisma-simple.vercel.app/api', // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination(),
          },
        },
      },
    }),
  })
)

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
```

---

## Examples

- App: [pages/\_app.js](pages/_app.js)
- Server-side rendering (SSR): [pages/ssr.js](pages/ssr.js)
- Client-side rendering (CSR) : [pages/index.js](pages/index.js)
- Static generated (SSG): [pages/client-only.js](pages/client-only.js)

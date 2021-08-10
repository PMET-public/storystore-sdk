export const settings = {
  fields: {
    graphQlEndpoint: {
      label: 'GraphQL URL',
      placeholder: 'https://...',
      defaultValue: new URL(process.env.AEM_GRAPHQL_URL).href,
    },
    graphQlBasicAuth: {
      label: 'GraphQL Auth',
      placeholder: 'username:password',
      defaultValue: process.env.AEM_GRAPHQL_AUTH,
    },
  },
}

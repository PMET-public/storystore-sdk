export const settings = {
  fields: {
    AEMEndpoint: {
      label: 'AEM URL',
      placeholder: 'https://...',
      defaultValue: process.env.AEM_HOST,
    },
    AEMBasicAuth: {
      label: 'AEM Auth',
      placeholder: 'username:password',
      defaultValue: process.env.AEM_AUTH,
    },
    graphQlPath: {
      label: 'AEM GraphQL Path',
      placeholder: '/content/_cq_graphql/global/endpoint.json',
      defaultValue: process.env.AEM_GRAPHQL_PATH,
    },
  },
}

export const settings = {
  title: 'AEM Settings',
  fields: {
    AEM_HOST: {
      label: 'AEM Host',
      placeholder: 'https://...',
      defaultValue: process.env.AEM_HOST,
    },
    AEM_AUTH: {
      label: 'AEM Auth',
      placeholder: 'username:password',
      defaultValue: process.env.AEM_AUTH,
    },
    AEM_GRAPHQL_PATH: {
      label: 'AEM GraphQL Path',
      placeholder: '/content/_cq_graphql/global/endpoint.json',
      defaultValue: process.env.AEM_GRAPHQL_PATH,
    },
  },
}

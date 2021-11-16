import { GetServerSideProps, NextPage } from 'next'
import { Home, HOME_QUERY, HOME_AEM_MODEL_PAGE_PATH } from '@storystore/ui-kit/dist/experiences/wknd/pages'
import { addApolloState, getApolloClient } from '@storystore/next-apollo'
import { fetchAEMModel } from '@storystore/ui-kit/lib'

const HomePage: NextPage<any> = ({ ...props }) => {
  return <Home {...props} />
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  /** Get GraphQL Queries */
  const apolloClient = getApolloClient()

  /** Get AEM Page Model */
  const model = await fetchAEMModel(HOME_AEM_MODEL_PAGE_PATH).catch(() => {})

  await apolloClient
    .query({
      query: HOME_QUERY,
      context: {
        headers: {
          cookie: req.headers.cookie,
        },
      },
    })
    .catch(() => {})

  return addApolloState(apolloClient, {
    props: { model },
  })
}

export default HomePage

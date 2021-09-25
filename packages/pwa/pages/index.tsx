import { GetServerSideProps, NextPage } from 'next'
import { Home, HOME_QUERY, HOME_AEM_MODEL_PAGE_PATH } from '@storystore/ui-kit/dist/experiences/wknd/pages'
import { getPropsFromAEMModelPath } from '@storystore/ui-kit/lib'
import { addApolloState, getApolloClient } from '@storystore/next-apollo'

const HomePage: NextPage = ({ ...props }) => {
  return <Home {...props} />
}

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = getApolloClient()

  try {
    await apolloClient.query({ query: HOME_QUERY })
  } catch (error) {}

  const model = await getPropsFromAEMModelPath(HOME_AEM_MODEL_PAGE_PATH)

  return addApolloState(apolloClient, {
    props: { model },
  })
}

export default HomePage

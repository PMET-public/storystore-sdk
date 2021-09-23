import { GetServerSideProps, NextPage } from 'next'
import { Home, HOME_QUERY } from '@storystore/ui-kit/dist/experiences/wknd/pages'
import { addApolloState, getApolloClient } from '@storystore/next-apollo'

const HomePage: NextPage = ({ ...props }) => {
  return <Home AEMModelPath="/content/wknd-adventures/us/en/home" {...props} />
}

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = getApolloClient()

  try {
    await apolloClient.query({ query: HOME_QUERY })
  } catch (error) {}

  return addApolloState(apolloClient, {
    props: {},
  })
}

export default HomePage

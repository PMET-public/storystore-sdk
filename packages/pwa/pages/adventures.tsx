import { GetServerSideProps, NextPage } from 'next'
import { WKND } from '@storystore/ui-kit/experiences'
import { addApolloState, getApolloClient } from '@storystore/next-apollo'

const Adventures: NextPage = props => {
  return <WKND.Adventures {...props} />
}

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = getApolloClient()

  await apolloClient.query({ query: WKND.ADVENTURES_QUERY })

  return addApolloState(apolloClient, {
    props: {},
  })
}

export default Adventures

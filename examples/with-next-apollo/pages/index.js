import Launches, { PAST_LAUNCHES_QUERY } from '../components/Launches'
import { getApolloClient, addApolloState } from '@storystore/next-apollo'

const IndexPage = () => <Launches />

export async function getStaticProps() {
  const apolloClient = getApolloClient()

  await apolloClient.query({
    query: PAST_LAUNCHES_QUERY,
  })

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  })
}

export default IndexPage

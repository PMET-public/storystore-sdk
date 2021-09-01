import { GetServerSideProps, NextPage } from 'next'
import { WKND } from '@storystore/ui-kit/experiences'
import { Link } from '@storystore/ui-kit'
import { addApolloState, getApolloClient } from '@storystore/next-apollo'

const Home: NextPage = props => {
  return <WKND.Home heroCTA={<Link href="/adventures">View Adventures</Link>} {...props} />
}

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = getApolloClient()

  await apolloClient.query({ query: WKND.HOME_QUERY })

  return addApolloState(apolloClient, {
    props: {},
  })
}

export default Home

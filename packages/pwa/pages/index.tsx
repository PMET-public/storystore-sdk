import { GetServerSideProps, NextPage } from 'next'
import { WKND } from '@storystore/ui-kit/experiences'
import { Link } from '@storystore/ui-kit'
import { addApolloState, getApolloClient } from '@storystore/next-apollo'
import { getServerSideGraphQlEndpoint } from '../lib/ssr-graphql-endpoint'

const Home: NextPage = props => {
  return <WKND.Home heroCTA={<Link href="/adventures">View Adventures</Link>} {...props} />
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const apolloClient = getApolloClient()

  await apolloClient.query({ query: WKND.HOME_QUERY, context: { clientName: 'aem' } })

  return addApolloState(apolloClient, {
    props: {
      ...getServerSideGraphQlEndpoint(req),
    },
  })
}

export default Home

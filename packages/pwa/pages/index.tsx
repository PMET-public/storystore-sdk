import { GetServerSideProps, NextPage } from 'next'
import { Home, HOME_QUERY } from '@storystore/ui-kit/dist/experiences/wknd/pages'
import { Link } from '@storystore/ui-kit'
import { addApolloState, getApolloClient } from '@storystore/next-apollo'
import { getServerSideGraphQlEndpoint } from '../lib/ssr-graphql-endpoint'

const HomePage: NextPage = props => {
  return <Home heroCTA={<Link href="/adventures">View Adventures</Link>} {...props} />
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const apolloClient = getApolloClient()

  await apolloClient.query({ query: HOME_QUERY, context: { clientName: 'aem' } })

  return addApolloState(apolloClient, {
    props: {
      ...getServerSideGraphQlEndpoint(req),
    },
  })
}

export default HomePage

import { GetServerSideProps, NextPage } from 'next'
import { Home, HOME_QUERY } from '@storystore/ui-kit/dist/experiences/wknd/pages'
import { Link } from '@storystore/ui-kit'
import { addApolloState, getApolloClient } from '@storystore/next-apollo'
import { getServerSideApolloClientContext } from '../lib/graphql-variables'

const HomePage: NextPage = ({ ...props }) => {
  return <Home heroCTA={<Link href="/adventures">View Adventures</Link>} {...props} />
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const apolloClient = getApolloClient()

  try {
    await apolloClient.query({
      query: HOME_QUERY,
      context: { ...getServerSideApolloClientContext(req) },
    })
  } catch (error) {}

  return addApolloState(apolloClient, {
    props: {},
  })
}

export default HomePage

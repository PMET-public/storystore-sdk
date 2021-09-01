import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { WKND } from '@storystore/ui-kit/experiences'
import { addApolloState, getApolloClient } from '@storystore/next-apollo'

const Adventure: NextPage = ({ ...props }) => {
  const { asPath } = useRouter()

  return <WKND.Adventure path={asPath} {...props} />
}

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const apolloClient = getApolloClient()

  const path = req.url

  await apolloClient.query({ query: WKND.ADVENTURE_QUERY, variables: { path } })

  return addApolloState(apolloClient, {
    props: {},
  })
}

export default Adventure

import { GetServerSideProps, NextPage } from 'next'
import { Home, HOME_QUERY, HOME_AEM_MODEL_PAGE_PATH } from '@storystore/ui-kit/dist/experiences/wknd/pages'
import { getPropsFromAEMModel, getThemePropsFromAEMModel } from '@storystore/ui-kit/lib'
import { addApolloState, getApolloClient } from '@storystore/next-apollo'
import { themeVar } from './_app'
import { useMemo } from 'react'

const HomePage: NextPage<any> = ({ theme, ...props }) => {
  useMemo(() => themeVar(theme), [theme])

  return <Home {...props} />
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  /** Get GraphQL Queries */
  const apolloClient = getApolloClient()

  await apolloClient
    .query({
      query: HOME_QUERY,
      fetchPolicy: 'network-only',
      context: {
        headers: {
          cookie: req.headers.cookie,
        },
      },
    })
    .catch(() => {})

  /** Get AEM Model */
  const model = await fetch(new URL(HOME_AEM_MODEL_PAGE_PATH + '.model.json', process.env.NEXT_PUBLIC_URL).href, {
    headers: { cookie: req.headers.cookie },
  })
    .then(async res => await res.json())
    .catch(() => undefined)

  return addApolloState(apolloClient, {
    props: { model: getPropsFromAEMModel(model), theme: getThemePropsFromAEMModel(model) },
  })
}

export default HomePage

import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { Adventure, ADVENTURE_QUERY } from '@storystore/ui-kit/dist/experiences/wknd/pages'
import { addApolloState, getApolloClient } from '@storystore/next-apollo'
import { getServerSideGraphQlEndpoint } from '../lib/ssr-graphql-endpoint'
import { useCallback, useEffect, useState } from 'react'
import { MY_PASSPORT } from '../lib/variables'

const AdventurePage: NextPage = ({ ...props }) => {
  const { asPath } = useRouter()

  const [passport, setPassport] = useState({})

  useEffect(() => {
    setPassport(JSON.parse(localStorage.getItem(MY_PASSPORT) || '{}'))
  }, [])

  const bookmarked = !!passport[asPath]?.bookmark
  const checkedIn = !!passport[asPath]?.checkIn

  const handleOnCheckIn = useCallback(
    (id: string) => {
      const timestamp = new Date().getTime()

      let newValues = { ...passport }

      if (newValues[id]?.checkIn) {
        delete newValues[id].checkIn
      } else {
        newValues = {
          ...newValues,
          [id]: {
            checkIn: timestamp,
          },
        }
      }

      setPassport(newValues)
      localStorage.setItem(MY_PASSPORT, JSON.stringify(newValues))
    },
    [passport]
  )

  const handleOnBookmark = useCallback(
    (id: string) => {
      const timestamp = new Date().getTime()

      let newValues = { ...passport }

      if (newValues[id]?.bookmark) {
        delete newValues[id].bookmark
      } else {
        newValues = {
          ...newValues,
          [id]: {
            bookmark: timestamp,
          },
        }
      }

      setPassport(newValues)
      localStorage.setItem(MY_PASSPORT, JSON.stringify(newValues))
    },
    [passport]
  )

  return (
    <Adventure
      path={asPath}
      {...props}
      checkedIn={checkedIn}
      onCheckIn={handleOnCheckIn}
      bookmarked={bookmarked}
      onBookmark={checkedIn ? undefined : handleOnBookmark}
    />
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const apolloClient = getApolloClient()

  const { site, locale, pathname: _pathname } = query

  const pathname = typeof _pathname === 'string' ? _pathname : _pathname.join('/')

  const path = `/content/dam/${site}/${locale}/adventures/${pathname}`

  await apolloClient.query({ query: ADVENTURE_QUERY, context: { clientName: 'aem' }, variables: { path } })

  return addApolloState(apolloClient, {
    props: {
      ...getServerSideGraphQlEndpoint(req),
    },
  })
}

export default AdventurePage

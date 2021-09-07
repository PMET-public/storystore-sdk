import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { WKND } from '@storystore/ui-kit/experiences'
import { addApolloState, getApolloClient } from '@storystore/next-apollo'
import { useCallback, useEffect, useState } from 'react'
import { MY_PASSPORT } from '../lib/variables'

const Adventure: NextPage = ({ ...props }) => {
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
    <WKND.Adventure
      path={asPath}
      {...props}
      checkedIn={checkedIn}
      onCheckIn={handleOnCheckIn}
      bookmarked={bookmarked}
      onBookmark={checkedIn ? undefined : handleOnBookmark}
    />
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const apolloClient = getApolloClient()

  const path = req.url

  await apolloClient.query({ query: WKND.ADVENTURE_QUERY, variables: { path } })

  return addApolloState(apolloClient, {
    props: {},
  })
}

export default Adventure

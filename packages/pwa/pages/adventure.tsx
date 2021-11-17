import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { Adventure, ADVENTURE_AEM_MODEL_PAGE_PATH } from '@storystore/ui-kit/dist/experiences/wknd/pages'
import { fetchAEMModel } from '@storystore/ui-kit/lib'
import { useCallback, useEffect, useState } from 'react'
import { MY_PASSPORT } from '../lib/variables'
import { trackEvent } from '../lib/tracker'

const getPathFromQuery = (query: any) => {
  if (!query?.path) return

  const { site, locale, path } = query
  const pathAsString = typeof path === 'string' ? path : path.join('/')

  return `/content/dam/${site}/${locale}/adventures/${pathAsString}`
}

const AdventurePage: NextPage = ({ ...props }) => {
  const { query } = useRouter()

  const path = getPathFromQuery(query)

  const [passport, setPassport] = useState({})

  useEffect(() => {
    setPassport(JSON.parse(localStorage.getItem(MY_PASSPORT) || '{}'))
  }, [])

  const bookmarked = !!passport[path]?.bookmark
  const checkedIn = !!passport[path]?.checkIn

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

      /** Track reset variables */
      trackEvent({
        category: 'Adventure',
        action: 'Checked-In',
        label: id,
      })
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

      /** Track reset variables */
      trackEvent({
        category: 'Adventure',
        action: 'Bookmarked',
        label: id,
      })
    },
    [passport]
  )

  return (
    <Adventure
      {...props}
      path={path}
      checkedIn={checkedIn}
      onCheckIn={handleOnCheckIn}
      bookmarked={bookmarked}
      onBookmark={checkedIn ? undefined : handleOnBookmark}
    />
  )
}

export const getServerSideProps: GetServerSideProps = async ({}) => {
  /** Get AEM Page Model */
  const model = await fetchAEMModel(ADVENTURE_AEM_MODEL_PAGE_PATH).catch(() => {})

  return {
    props: { model },
  }
}

export default AdventurePage

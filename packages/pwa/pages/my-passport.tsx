import { GetServerSideProps, NextPage } from 'next'
import { MyPassport, MY_PASSPORT_AEM_MODEL_PAGE_PATH } from '@storystore/ui-kit/dist/experiences/wknd/pages'
import { getPropsFromAEMModel } from '@storystore/ui-kit/lib'
import { MY_PASSPORT } from '../lib/variables'
import { useEffect, useState } from 'react'

const MyPassportPage: NextPage = ({ ...props }) => {
  const [passport, setPassport] = useState<{ checkIns?: string[]; bookmarks?: string[] }>({})

  useEffect(() => {
    const _passport = JSON.parse(localStorage.getItem(MY_PASSPORT) || '{}')

    const checkIns = Object.keys(_passport)
      .filter(id => !!_passport[id].checkIn)
      .map(id => id)

    const bookmarks = Object.keys(_passport)
      .filter(id => !!_passport[id].bookmark)
      .map(id => id)

    setPassport({ checkIns, bookmarks })
  }, [])

  return <MyPassport checkIns={passport.checkIns} bookmarks={passport.bookmarks} {...props} />
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  /** Get AEM Model */
  const model = await fetch(
    new URL(MY_PASSPORT_AEM_MODEL_PAGE_PATH + '.model.json', process.env.NEXT_PUBLIC_URL).href,
    { headers: { cookie: req.headers.cookie } }
  )
    .then(async res => await res.json())
    .catch(() => undefined)

  return {
    props: { model: getPropsFromAEMModel(model) },
  }
}

export default MyPassportPage

import { GetServerSideProps, NextPage } from 'next'
import { MyPassport, MY_PASSPORT_AEM_MODEL_PAGE_PATH } from '@storystore/ui-kit/dist/experiences/wknd/pages'
import { MY_PASSPORT } from '../lib/variables'
import { useEffect, useState } from 'react'
import { fetchAEMModel } from '@storystore/ui-kit/dist/lib'

const MyPassportPage: NextPage<any> = ({ ...props }) => {
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

export const getServerSideProps: GetServerSideProps = async () => {
  /** Get AEM Page Model */
  const model = await fetchAEMModel(MY_PASSPORT_AEM_MODEL_PAGE_PATH)

  return {
    props: { model },
  }
}

export default MyPassportPage

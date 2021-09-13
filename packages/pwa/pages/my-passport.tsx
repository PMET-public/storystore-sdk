import { NextPage } from 'next'
import { MyPassport } from '@storystore/ui-kit/dist/experiences/wknd/pages'
import { MY_PASSPORT } from '../lib/variables'
import { useEffect, useState } from 'react'

const MyPassportPage: NextPage = () => {
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

  return <MyPassport checkIns={passport.checkIns} bookmarks={passport.bookmarks} />
}

export default MyPassportPage

import { NextPage } from 'next'
import { WKND } from '@storystore/ui-kit/experiences'
import { MY_PASSPORT } from '../lib/variables'
import { useEffect, useState } from 'react'

const MyPassport: NextPage = () => {
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

  return <WKND.MyPassport checkIns={passport.checkIns} bookmarks={passport.bookmarks} />
}

export default MyPassport

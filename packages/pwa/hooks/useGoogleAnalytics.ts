import { useEffect, useState } from 'react'
import ReactGA from 'react-ga'
import Router from 'next/router'

export const googleAnalytics = ReactGA

const handleRouteChange = (url: string, { shallow }) => {
  if (!shallow) {
    googleAnalytics.pageview(url)
  }
}

export const useInitGoogleAnalytics = (uid?: string) => {
  const [clientId, setClientId] = useState()

  /** Initialize GA */
  useEffect(() => {
    if (!uid) return

    googleAnalytics.initialize(uid, { debug: false })

    googleAnalytics.ga((tracker: any) => {
      setClientId(tracker.get('clientId'))
    })
  }, [uid])

  /** Register Pave View on page load / route change */
  useEffect(() => {
    if (!clientId) return

    const dimension1 = clientId

    const dimension2 = new Date().toISOString()

    googleAnalytics.set({
      dimension1,
      dimension2,
    })

    googleAnalytics.pageview(window.location.pathname)

    Router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [clientId])
}

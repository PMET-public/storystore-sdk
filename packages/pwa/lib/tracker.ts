import { useEffect, useState } from 'react'
import ReactGA from 'react-ga'
import Router from 'next/router'

const GOOGLE_ANALYTICS_UID = process.env.NEXT_PUBLIC_TRACKER_GA

const getPWAFlavor = () => {
  if (process.env.NODE_ENV === 'development') return 'sdk'
  return 'pkg'
}

export const trackPageView = (url: string) => {
  /** Track Google Analytics */
  if (GOOGLE_ANALYTICS_UID) {
    ReactGA.pageview(url)
  }
}

type TrackEvent = {
  category: string
  action: string
  label?: string
}

export const trackEvent = ({ category, action, label }: TrackEvent) => {
  if (GOOGLE_ANALYTICS_UID) {
    ReactGA.event({ category, action, label })
  }
}

export const trackModal = (modal: string) => {
  if (GOOGLE_ANALYTICS_UID) {
    ReactGA.modalview(modal)
  }
}

const handleRouteChange = (url: string, { shallow }) => {
  if (!shallow) {
    trackPageView(url)
  }
}

export const useTrackers = () => {
  const [gaGlientId, setGAClientId] = useState()

  /** Initialize */
  useEffect(() => {
    if (GOOGLE_ANALYTICS_UID) {
      ReactGA.initialize(GOOGLE_ANALYTICS_UID, { debug: false })

      ReactGA.ga((tracker: any) => {
        setGAClientId(tracker.get('clientId'))
      })
    }
  }, [])

  /** Register Pave View on page load / route change */
  useEffect(() => {
    /** Google Analytics */
    if (GOOGLE_ANALYTICS_UID && gaGlientId) {
      const dimension1 = gaGlientId
      const dimension2 = new Date().toISOString()
      const dimension3 = process.env.NEXT_PUBLIC_VERSION
      const dimension4 = getPWAFlavor()

      ReactGA.set({ dimension1, dimension2, dimension3, dimension4 })
    }

    /** Track page view on load */
    trackPageView(window.location.pathname)

    /** track page view on Next.js route change */
    Router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [gaGlientId])
}

import { useEffect, useCallback, useState } from 'react'

export const useNetworkStatus = (callback?: (state: boolean) => void) => {
  const [status, setState] = useState(true)

  const handleNetworkChange = useCallback(() => {
    const { onLine } = navigator
    setState(onLine)
    callback?.(onLine)
  }, [])

  useEffect(handleNetworkChange, [])

  useEffect(() => {
    window.addEventListener('online', handleNetworkChange)
    window.addEventListener('offline', handleNetworkChange)

    return () => {
      window.removeEventListener('online', handleNetworkChange)
      window.removeEventListener('offline', handleNetworkChange)
    }
  }, [])

  return status
}

import { useEffect, useCallback } from 'react'

export const useNetworkStatus = (callback?: (state: boolean) => void) => {
  const handleNetworkChange = useCallback(() => {
    const { onLine } = navigator
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
}

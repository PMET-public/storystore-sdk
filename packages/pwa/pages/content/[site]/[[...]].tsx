import { SkeletonLoader } from '@storystore/ui-kit'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { AEMResponsiveGrid } from '../../../components'

const HomePage: NextPage = () => {
  const { asPath, isReady } = useRouter()

  if (!isReady)
    return (
      <SkeletonLoader
        uniqueKey="page-loader"
        animate
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ height: 'var(--app-body-height)' }}
      >
        <rect width="100%" height="100%" />
      </SkeletonLoader>
    )

  const pagePath = asPath.split('.html')?.[0]

  return (
    <div>
      <AEMResponsiveGrid pagePath={pagePath} itemPath="root/responsivegrid" />
    </div>
  )
}

export default HomePage

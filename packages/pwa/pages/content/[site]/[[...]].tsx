import { ModelManager } from '@adobe/aem-spa-page-model-manager'
import { SkeletonLoader } from '@storystore/ui-kit'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { Utils } from '@adobe/aem-react-editable-components'
import { AEMResponsiveGrid } from '../../../components'

const HomePage: NextPage<{ pageModel?: any }> = ({ pageModel }) => {
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
      <AEMResponsiveGrid pagePath={pagePath} itemPath="root/responsivegrid" {...pageModel} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const pageModel = Utils.modelToProps(await ModelManager.getData(req.url))

  return {
    props: { pageModel },
  }
}

export default HomePage

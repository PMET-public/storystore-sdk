// import { ModelManager } from '@adobe/aem-spa-page-model-manager'
import { AuthoringUtils, ModelManager } from '@adobe/aem-spa-page-model-manager'
import { SkeletonLoader } from '@storystore/ui-kit'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { Utils } from '@adobe/aem-react-editable-components'
import { AEMResponsiveGrid } from '../../../components'

const HomePage: NextPage<any> = ({ responsivegrid }) => {
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
      <AEMResponsiveGrid pagePath={pagePath} itemPath="root/responsivegrid" {...responsivegrid} />
    </div>
  )
}

/** Server-Side Rendering */
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const url = req.url

  const model = await ModelManager.getData(url)

  const responsivegrid = model?.[':items']?.root?.[':items']?.responsivegrid
    ? Utils.modelToProps(model[':items'].root[':items'].responsivegrid)
    : {}

  return {
    props: {
      responsivegrid,
    },
  }
}

export default HomePage

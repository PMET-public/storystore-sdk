// import { ModelManager } from '@adobe/aem-spa-page-model-manager'
import { SkeletonLoader } from '@storystore/ui-kit'
import {
  // GetServerSideProps,
  NextPage,
} from 'next'
import { useRouter } from 'next/router'
// import { Utils } from '@adobe/aem-react-editable-components'
import { AEMResponsiveGrid } from '../../../components'

const HomePage: NextPage<{ pageModel?: any }> = ({ pageModel }) => {
  const { asPath, isReady } = useRouter()
  console.log({ asPath })

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

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const url = req.url

//   let pageModel = {}

//   if (url !== `/content/${process.env.NEXT_PUBLIC_AEM_SITE}`) {
//     // do not if it's the root page (authoring)
//     pageModel = { ...Utils.modelToProps(await ModelManager.getData(url)) }
//   }

//   return {
//     props: {
//       pageModel,
//     },
//   }
// }

export default HomePage

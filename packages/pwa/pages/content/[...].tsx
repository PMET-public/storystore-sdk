import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { AEMResponsiveGrid } from '../../components/AEMResponsiveGrid'
import { Fragment } from 'react'
import { ModelManager, ModelClient } from '@adobe/aem-spa-page-model-manager'
import { Error } from '@storystore/ui-kit'

type PageModel = {
  [key: string]: string | number
}

export type PageProps = {
  pageModel: PageModel
  error: any
}

const DynamicPage: NextPage<PageProps> = ({ pageModel = {}, error }) => {
  const { asPath } = useRouter()
  const path = asPath.replace('.html', '')

  if (error) return <Error status={error} />

  return (
    <Fragment key={asPath}>
      <AEMResponsiveGrid pagePath={path} itemPath="root/responsivegrid" {...pageModel} />
    </Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let pageModel = {}
  let error: any

  try {
    pageModel = await ModelManager.getData({ modelClient: new ModelClient(process.env.NEXT_PUBLIC_URL), path: req.url })
  } catch (e) {
    error = e.response.status
  }

  return {
    props: { pageModel, error },
  }
}

export default DynamicPage

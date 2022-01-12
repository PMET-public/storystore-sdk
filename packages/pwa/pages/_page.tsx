import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { AEMPage } from '@storystore/ui-kit/AEM'
import { Fragment } from 'react'

const DynamicPage: NextPage<any> = () => {
  const { asPath } = useRouter()
  const path = asPath.replace('.html', '')

  return (
    <Fragment key={asPath}>
      <AEMPage pagePath={path} />
    </Fragment>
  )
}

export default DynamicPage

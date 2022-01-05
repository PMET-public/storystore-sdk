import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { AEMComponent } from '@storystore/ui-kit/AEM'

const DynamicPage: NextPage<any> = () => {
  const { asPath } = useRouter()

  return <AEMComponent.Page pagePath={asPath} />
}

export default DynamicPage

import { NextPage } from 'next'

import { AEMResponsiveGrid } from '../../../../../../components'

const HOME_AEM_MODEL_PAGE_PATH = `/content/${process.env.NEXT_PUBLIC_AEM_SITE}/us/en/home`

const HomePage: NextPage = () => {
  return (
    <div>
      <AEMResponsiveGrid pagePath={HOME_AEM_MODEL_PAGE_PATH} itemPath="root/responsivegrid" />
    </div>
  )
}

export default HomePage

import { GetServerSideProps, NextPage } from 'next'
import { Home, HOME_AEM_MODEL_PAGE_PATH } from '@storystore/ui-kit/dist/experiences/wknd/pages'
import { fetchAEMModel } from '@storystore/ui-kit/dist/lib'

const HomePage: NextPage<any> = ({ ...props }) => {
  return <Home {...props} />
}

export const getServerSideProps: GetServerSideProps = async () => {
  /** Get AEM Page Model */
  const model = await fetchAEMModel(HOME_AEM_MODEL_PAGE_PATH)

  return {
    props: { model },
  }
}

export default HomePage

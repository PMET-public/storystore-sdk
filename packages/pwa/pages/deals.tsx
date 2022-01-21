import { ModelManager } from '@adobe/aem-spa-page-model-manager'
import { Block, Heading } from '@storystore/ui-kit'
import { GetServerSideProps, NextPage } from 'next'
import { AEMExperienceFragment } from '../components/AEMExperienceFragment'
import { getAEMModelProps } from '../lib/aem-model'

const DEALS_XF_PATH = '/content/experience-fragments/venia/us/en/site/deals/master'

const DealsPage: NextPage<any> = ({ deals }) => {
  return (
    <Block gap="md" contained padded style={{ paddingTop: 'var(--spacing-xl)', paddingBottom: 'var(--spacing-xl)' }}>
      <Heading>KRISSHOP.COM DEALS</Heading>
      <AEMExperienceFragment pagePath={DEALS_XF_PATH} {...getAEMModelProps(deals)} />
    </Block>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const deals = await ModelManager.getData(DEALS_XF_PATH)

  return {
    props: {
      deals,
    },
  }
}

export default DealsPage

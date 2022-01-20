import { Block, Heading } from '@storystore/ui-kit'
import { NextPage } from 'next'
import { AEMExperienceFragment } from '../components/AEMExperienceFragment'

const DealsPage: NextPage = () => {
  return (
    <Block gap="md" contained padded style={{ paddingTop: 'var(--spacing-xl)', paddingBottom: 'var(--spacing-xl)' }}>
      <Heading>KRISSHOP.COM DEALS</Heading>
      <AEMExperienceFragment pagePath="/content/experience-fragments/venia/us/en/site/deals/master" />
    </Block>
  )
}

export default DealsPage
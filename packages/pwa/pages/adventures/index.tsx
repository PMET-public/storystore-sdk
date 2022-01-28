import { Block, Heading } from '@storystore/ui-kit'
import { NextPage } from 'next'

const DealsPage: NextPage<any> = () => {
  return (
    <Block
      gap="md"
      contained
      padded
      style={{ paddingTop: 'var(--spacing-xl)', paddingBottom: 'var(--spacing-xl)' }}
    ></Block>
  )
}

export default DealsPage

import { useQuery } from '@apollo/client'
import { Block, Heading, Html, Link, Text, Tile, TileSkeleton } from '@storystore/ui-kit'
import { NextPage } from 'next'
import NextImage from '../../components/NextImage'

import DEALS_QUERY from './deals.graphql'

const DealsPage: NextPage<any> = () => {
  const { data } = useQuery(DEALS_QUERY, { fetchPolicy: 'cache-and-network' })

  return (
    <Block gap="md" contained padded style={{ paddingTop: 'var(--spacing-xl)', paddingBottom: 'var(--spacing-xl)' }}>
      <Heading>KRISSHOP.COM DEALS</Heading>
      <Block columns={{ sm: '1fr', md: '1fr 1fr', xl: '1fr 1fr 1fr' }} gap="md">
        {data?.deals?.items.map(({ _path, name, description, image, category }) => (
          <Tile
            key={_path}
            root={<Link href={`/${category}`} />}
            heading={<Heading size="md">{name}</Heading>}
            image={
              <NextImage
                width={image.width}
                height={image.height}
                loading="lazy"
                objectFit="cover"
                alt={name}
                src={image._path}
              />
            }
            subheading={<Text root={<Html htmlString={description.html} />} size="sm" />}
          />
        )) || [
          <>
            <TileSkeleton animate />
            <TileSkeleton animate />
            <TileSkeleton animate />
            <TileSkeleton animate />
            <TileSkeleton animate />
            <TileSkeleton animate />
            <TileSkeleton animate />
            <TileSkeleton animate />
            <TileSkeleton animate />
          </>,
        ]}
      </Block>
    </Block>
  )
}

export default DealsPage

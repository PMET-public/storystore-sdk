import { useQuery } from '@apollo/client'
import { Block, Carousel, Heading, Html, Link, Price, Text, Tile, TileSkeleton } from '@storystore/ui-kit/components'
import { AEMContainer } from '../../components/AEMContainer'
import { NextPage } from 'next'
import NextImage from '../../components/NextImage'

import style from './home.module.css'

import ArrowRightIcon from 'remixicon-react/ArrowRightLineIcon'

import HOME_QUERY from './home.graphql'

const HomePage: NextPage = () => {
  const { loading, data } = useQuery(HOME_QUERY, {
    fetchPolicy: 'cache-and-network',
  })

  return (
    <Block gap="xl" style={{ paddingBottom: 'var(--spacing-2xl)' }}>
      {/* Hero */}
      <div className={style.hero}>
        <AEMContainer pagePath="content/experience-fragments/venia/us/en/site/home-hero/pwa" itemPath="root" />
      </div>

      {/* Highlights */}
      <Block gap="md" contained>
        <Block columns="1fr auto" gap="sm" vAlign="center" padded>
          <Heading size={{ sm: 'xl', md: '2xl' }}>Highlights</Heading>
          <Link href="/deals">
            <Block gap="xxs" columns="auto auto" vAlign="center" root={<Text size="sm" weight="semibold" />}>
              <span>View All</span>
              <ArrowRightIcon size="1.3em" />
            </Block>
          </Link>
        </Block>

        <AEMContainer pagePath="content/experience-fragments/venia/us/en/site/highlights/master" itemPath="root" />
      </Block>

      {/* Products */}
      <Block gap="md" contained>
        <Block columns="1fr auto" gap="sm" vAlign="center" padded>
          <Heading size={{ sm: 'xl', md: '2xl' }}>Electronics</Heading>
          <Link href="/category/NDQ=">
            <Block gap="xxs" columns="auto auto" vAlign="center" root={<Text size="sm" weight="semibold" />}>
              <span>View All</span>
              <ArrowRightIcon size="1.3em" />
            </Block>
          </Link>
        </Block>

        <Carousel gap="md" show={{ sm: 1, md: 2, lg: 3, xl: 4 }} peak padded>
          {data?.electronics?.items.map(({ name, url_key, thumbnail, price_range, categories }) => (
            <Tile
              key={url_key}
              surface
              vignette
              root={<Link href={`/product/${url_key}`} />}
              heading={<Heading size="sm">{name}</Heading>}
              className={style.tile}
              image={
                <NextImage
                  width={600}
                  height={600}
                  loading="lazy"
                  objectFit="cover"
                  alt={thumbnail.label || name}
                  src={thumbnail.url}
                />
              }
              subheading={
                <Price
                  currency={price_range.minimum_price.regular_price.currency}
                  label={
                    price_range.minimum_price.regular_price < price_range.maximum_price.regular_price
                      ? 'Starting at'
                      : undefined
                  }
                  regular={price_range.minimum_price.regular_price.value}
                  special={
                    price_range.minimum_price.regular_price.value > price_range.minimum_price.final_price.value
                      ? price_range.minimum_price.final_price.value
                      : undefined
                  }
                />
              }
              tags={categories?.map(({ name }) => `#${name}`)}
            />
          )) || [
            <TileSkeleton key="1" animate={loading} />,
            <TileSkeleton key="2" animate={loading} />,
            <TileSkeleton key="3" animate={loading} />,
            <TileSkeleton key="4" animate={loading} />,
            <TileSkeleton key="5" animate={loading} />,
          ]}
        </Carousel>
      </Block>
    </Block>
  )
}

export default HomePage

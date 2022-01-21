import { useQuery } from '@apollo/client'
import { Block, Button, Carousel, Heading, Link, Price, Text, Tile, TileSkeleton } from '@storystore/ui-kit/components'
import { AEMExperienceFragment } from '../components/AEMExperienceFragment'
import { GetServerSideProps, NextPage } from 'next'
import NextImage from '../components/NextImage'
import { ModelManager } from '@adobe/aem-spa-page-model-manager'

import style from './index.module.css'

import StoreIcon from 'remixicon-react/Store3LineIcon'
import DealsIcon from 'remixicon-react/PriceTag3LineIcon'

import PRODUCTS_QUERY from '../graphql/products.graphql'
import { getAEMModelProps } from '../lib/aem-model'

const HERO_XF_PATH = '/content/experience-fragments/venia/us/en/site/home-hero/pwa'
const DEALS_XF_PATH = '/content/experience-fragments/venia/us/en/site/deals/pwa-home'

const HomePage: NextPage<any> = ({ hero, deals }) => {
  const productsQuery = useQuery(PRODUCTS_QUERY, {
    variables: {
      search: '',
      pageSize: 9,
    },
  })

  return (
    <Block gap="xl" style={{ paddingBottom: 'var(--spacing-2xl)' }}>
      {/* Hero */}
      <div className={style.hero}>
        <AEMExperienceFragment pagePath={HERO_XF_PATH} {...getAEMModelProps(hero)} />
      </div>

      {/* Deals */}
      <Block gap="md" contained>
        <Block columns="1fr auto" gap="sm" vAlign="center" padded>
          <Heading size="2xl">Highlights</Heading>

          <Button root={<Link href="/deals" />} icon={<DealsIcon />} size="xs" transparent variant="cta">
            View All
          </Button>
        </Block>

        <AEMExperienceFragment pagePath={DEALS_XF_PATH} {...getAEMModelProps(deals)} />
      </Block>

      {/* Products */}
      <Block gap="md" contained>
        <Block columns="1fr auto" gap="sm" vAlign="center" padded>
          <Heading size="2xl">Electronics</Heading>
          <Button root={<Link href="/category/NDQ=" />} icon={<StoreIcon />} size="xs" transparent variant="cta">
            View All
          </Button>
        </Block>

        <Carousel gap="md" show={{ sm: 1, md: 2, lg: 3, xl: 4 }} peak padded>
          {productsQuery.data?.products?.items.map(({ name, url_key, thumbnail, price_range, categories }) => (
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
            <TileSkeleton key="1" animate />,
            <TileSkeleton key="2" animate />,
            <TileSkeleton key="3" animate />,
            <TileSkeleton key="4" animate />,
          ]}
        </Carousel>
      </Block>
    </Block>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const hero = await ModelManager.getData(HERO_XF_PATH)
  const deals = await ModelManager.getData(DEALS_XF_PATH)

  return {
    props: {
      hero,
      deals,
    },
  }
}

export default HomePage

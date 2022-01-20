import { gql, useQuery } from '@apollo/client'
import { Block, Button, Carousel, Heading, Link, Price, Text, Tile } from '@storystore/ui-kit/components'
import { AEMExperienceFragment } from '../components/AEMExperienceFragment'
import { NextPage } from 'next'

import style from './index.module.css'

import StoreIcon from 'remixicon-react/Store3LineIcon'
import DealsIcon from 'remixicon-react/PriceTag3LineIcon'

const COMMERCE_QUERY = gql`
  query COMMERCE_QUERY($search: String, $filter: ProductAttributeFilterInput, $pageSize: Int) {
    products(search: $search, filter: $filter, pageSize: $pageSize) {
      total_count
      items {
        uid: id
        url_key
        name
        categories {
          name
        }

        thumbnail {
          label
          url
        }
        price_range {
          minimum_price {
            final_price {
              currency
              value
            }
            regular_price {
              value
            }
          }
          maximum_price {
            regular_price {
              value
            }
          }
        }
      }
    }
  }
`

const HomePage: NextPage = () => {
  const { loading, data, error } = useQuery(COMMERCE_QUERY, {
    variables: {
      search: '',
      pageSize: 9,
    },
    context: { clientName: 'commerce' },
  })

  if (loading) return <h1>⏳ Loading</h1>

  if (error) return <div>💩 {error.message}</div>

  return (
    <Block gap="3xl" style={{ paddingBottom: 'var(--spacing-2xl)' }}>
      {/* Hero */}
      <div className={style.hero}>
        <AEMExperienceFragment pagePath="/content/experience-fragments/venia/us/en/site/home-hero/pwa" />
      </div>

      {/* Deals */}
      <Block gap="lg" contained>
        <Block columns={{ sm: '1fr', md: '1fr auto' }} gap="md" padded>
          <Block root={<Heading size="2xl" accent />}>
            <div>Our Highlights</div>
            <Text size="md">Deals you may like.</Text>
          </Block>

          <Button root={<Link href="/deals" />} icon={<DealsIcon />} size="sm" transparent variant="cta">
            View All
          </Button>
        </Block>

        <AEMExperienceFragment pagePath="/content/experience-fragments/venia/us/en/site/deals/pwa-home" />
      </Block>

      {/* Products */}
      {data?.products?.items && (
        <Block gap="lg" contained>
          <Block columns={{ sm: '1fr', md: '1fr auto' }} gap="md" padded>
            <Block root={<Heading size="2xl" accent />}>
              <div>New Arrivals</div>
              <Text size="md">Shop the widest range of products</Text>
            </Block>
            <Button root={<Link href="/products/NDI=" />} icon={<StoreIcon />} size="sm" transparent variant="cta">
              View All
            </Button>
          </Block>

          <Carousel gap="md" show={{ sm: 1, md: 2, xl: 3 }} padded peak>
            {data.products.items.map(({ name, url_key, thumbnail, price_range, categories }) => (
              <Tile
                key={url_key}
                surface
                vignette
                root={<Link href={`/product/${url_key}`} />}
                heading={<Heading size="xs">{name}</Heading>}
                image={
                  <img width={400} height={500} loading="lazy" alt={thumbnail.label || name} src={thumbnail.url} />
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
            ))}
          </Carousel>
        </Block>
      )}
    </Block>
  )
}

export default HomePage

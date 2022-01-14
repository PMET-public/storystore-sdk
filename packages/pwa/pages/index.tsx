import { gql, useQuery } from '@apollo/client'
import { Block, Carousel, Heading, Link, Price, Tile } from '@storystore/ui-kit/components'
import { AEMExperienceFragment } from '@storystore/ui-kit/AEM'
import { NextPage } from 'next'

const COMMERCE_QUERY = gql`
  query COMMERCE_QUERY {
    storeConfig {
      id
      base_url
    }

    products(search: "", pageSize: 9) {
      total_count
      items {
        id
        url_key
        name
        media_gallery {
          id: url
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

const ProductItem = ({ name, url_key, media_gallery, price_range }) => (
  <Tile
    root={<Link href={`/product/${url_key}`} />}
    heading={<Heading size="sm">{name}</Heading>}
    image={
      <img width={300} height={300} loading="lazy" alt={media_gallery[0].label || name} src={media_gallery[0].url} />
    }
    subheading={
      <Price
        currency={price_range.minimum_price.regular_price.currency}
        label={
          price_range.minimum_price.regular_price < price_range.maximum_price.regular_price ? 'Starting at' : undefined
        }
        regular={price_range.minimum_price.regular_price.value}
        special={
          price_range.minimum_price.regular_price.value > price_range.minimum_price.final_price.value
            ? price_range.minimum_price.final_price.value
            : undefined
        }
      />
    }
  />
)

const HomePage: NextPage = () => {
  const { loading, data, error } = useQuery(COMMERCE_QUERY, { context: { clientName: 'commerce' } })

  if (loading) return <h1>⏳ Loading</h1>

  if (error) return <div>💩 {error.message}</div>

  return (
    <Block gap="xl" padded>
      <AEMExperienceFragment pagePath="/content/experience-fragments/venia/us/en/site/home-hero/pwa" />

      {data?.products?.items && (
        <Block gap="md" contained>
          <Heading>New Arrivals</Heading>
          <Carousel gap="lg" show={{ sm: 1, md: 3, xl: 4 }} padded peak>
            {data.products.items.map(({ id, name, url_key, media_gallery, price_range }) => (
              <ProductItem key={id} {...{ id, name, url_key, media_gallery, price_range }} />
            ))}
          </Carousel>
        </Block>
      )}

      {data?.products?.items && (
        <Block gap="md" contained>
          <Heading>New Arrivals</Heading>
          <Carousel gap="lg" show={{ sm: 1, md: 3, xl: 4 }} padded peak>
            {data.products.items.map(({ id, name, url_key, media_gallery, price_range }) => (
              <ProductItem key={id} {...{ id, name, url_key, media_gallery, price_range }} />
            ))}
          </Carousel>
        </Block>
      )}
    </Block>
  )
}

export default HomePage

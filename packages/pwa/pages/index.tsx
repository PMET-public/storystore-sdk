import { gql, useQuery } from '@apollo/client'
import { Block, Carousel, Heading, Link, Price, Tile } from '@storystore/ui-kit/components'
import { AEMExperienceFragment } from '../components/AEMExperienceFragment'
import { NextPage } from 'next'

const COMMERCE_QUERY = gql`
  query COMMERCE_QUERY($search: String, $filter: ProductAttributeFilterInput, $pageSize: Int) {
    products(search: $search, filter: $filter, pageSize: $pageSize) {
      total_count
      items {
        uid: id
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
    surface
    root={<Link href={`/product/${url_key}`} />}
    heading={<Heading size="sm">{name}</Heading>}
    image={
      <img width={400} height={500} loading="lazy" alt={media_gallery[0].label || name} src={media_gallery[0].url} />
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
  const { loading, data, error } = useQuery(COMMERCE_QUERY, {
    variables: {
      search: '',
      // filter: null,
      pageSize: 9,
    },
    context: { clientName: 'commerce' },
  })

  if (loading) return <h1>⏳ Loading</h1>

  if (error) return <div>💩 {error.message}</div>

  return (
    <Block gap="xl">
      <AEMExperienceFragment pagePath="/content/experience-fragments/venia/us/en/site/home-hero/pwa" />

      {data?.products?.items && (
        <Block gap="md" contained>
          <Heading padded>New Arrivals</Heading>
          <Carousel gap="md" show={{ sm: 1, md: 3 }} padded peak>
            {data.products.items.map(({ name, url_key, media_gallery, price_range }) => (
              <ProductItem key={url_key} {...{ name, url_key, media_gallery, price_range }} />
            ))}
          </Carousel>
        </Block>
      )}
    </Block>
  )
}

export default HomePage

import { useQuery } from '@apollo/client'
import { Block, Button, Heading, Link, Price, SkeletonLoader, Tile, TileSkeleton } from '@storystore/ui-kit/components'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import CATEGORY_QUERY from './category.graphql'

import NextImage from '../../components/NextImage'

// Styles
import style from './products.module.css'

const ProductsPage: NextPage = () => {
  const router = useRouter()

  const { uid = 'NDI=' } = router.query

  const { loading, error, data } = useQuery(CATEGORY_QUERY, {
    fetchPolicy: 'cache-and-network',
    returnPartialData: true,
    variables: {
      filters: {
        category_uid: {
          eq: uid,
        },
      },
      filter: {
        category_uid: {
          eq: uid,
        },
      },
      pageSize: 9,
    },
  })

  const categories = data?.categoryList?.[0]
  const products = data?.products

  return (
    <Block padded contained style={{ paddingBottom: 'var(--spacing-xl)' }}>
      <div className={style.categories}>
        <Heading size="md">
          {categories?.name || (
            <SkeletonLoader animate={loading} width="10em" height="1em">
              <rect width="100%" height="100%" />
            </SkeletonLoader>
          )}
        </Heading>

        {categories?.children?.map(({ name, uid }) => (
          <Button key={uid} root={<Link href={`/category/${uid}`} />} transparent size="xs">
            {name}
          </Button>
        ))}
      </div>

      {/* Products */}
      <Block columns={{ sm: '1fr', md: '1fr 1fr', xl: '1fr 1fr 1fr' }} gap="md">
        {error || (loading && !products?.items) ? (
          <>
            <TileSkeleton animate={loading} />
            <TileSkeleton animate={loading} />
            <TileSkeleton animate={loading} />
            <TileSkeleton animate={loading} />
            <TileSkeleton animate={loading} />
            <TileSkeleton animate={loading} />
            <TileSkeleton animate={loading} />
            <TileSkeleton animate={loading} />
            <TileSkeleton animate={loading} />
          </>
        ) : (
          products?.items?.map(({ name, url_key, thumbnail, price_range, categories }) => (
            <Tile
              key={url_key}
              surface
              vignette
              root={<Link href={`/product/${url_key}`} />}
              heading={<Heading size="xs">{name}</Heading>}
              image={
                <NextImage
                  width={600}
                  height={600}
                  loading="lazy"
                  alt={thumbnail.label || name}
                  src={thumbnail.url}
                  objectFit="cover"
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
          ))
        )}
      </Block>
    </Block>
  )
}

export default ProductsPage

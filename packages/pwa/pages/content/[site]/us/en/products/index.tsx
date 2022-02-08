import { ServerError, useQuery } from '@apollo/client'
import { Block, Error, Link, Pills, Price, Tile, TileSkeleton } from '@storystore/ui-kit'
import { useNetworkStatus } from '@storystore/ui-kit/hooks'
import { useInfiniteScroll } from '@storystore/ui-kit/hooks'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import NextImage from '../../../../../../components/NextImage'

// GraphQL Query
import PRODUCTS_QUERY from './products.graphql'

const ProductsPage: NextPage = () => {
  // Get current pathname for links
  const { asPath } = useRouter()

  const getProductLink = useCallback(
    (path: string) => {
      const pathname = asPath.split('.html')?.[0]
      return pathname + '/product?path=' + path
    },
    [asPath]
  )

  // Network Online/Offline State
  const online = useNetworkStatus()

  //   Filters
  const [search, setSearch] = useState('')

  const [fetchingMore, setFetchingMore] = useState(false)

  // GraphQL Data
  const { error, data, loading, fetchMore } = useQuery(PRODUCTS_QUERY, {
    variables: { search, pageSize: 12 },
    context: { commerce: true },
  })

  const page = data?.products?.page_info || { current_page: 1, total_pages: 1 }

  const products = data?.products?.items

  const listRef = useRef(null)

  const handlSearchUpdate = useCallback(values => {
    console.log({ values })
  }, [])

  useInfiniteScroll(
    () => {
      setFetchingMore(true)

      fetchMore({
        variables: {
          currentPage: page.current_page + 1, // next page
        },
      })
        .catch(() => {})
        .then(() => {
          setFetchingMore(false)
        })
    },
    {
      disabled: loading || fetchingMore || !(page.current_page < page.total_pages),
      threshold: 400,
      contentRef: listRef,
    }
  )

  // Error View
  if (error) {
    const status = (error.networkError as ServerError)?.statusCode
    return <Error status={online ? status : 'Offline'} />
  }

  return (
    <Block rows="auto 1fr" padded style={{ height: '100%' }} contained>
      <div ref={listRef}>
        <Block gap="md" columns={{ sm: '1fr', md: '1fr 1fr', xl: '1fr 1fr 1fr' }}>
          {products?.map(({ url_key, name, price_range, thumbnail }) => (
            <Tile
              root={<Link href={getProductLink(url_key)} />}
              key={url_key}
              heading={name}
              surface
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
              image={<NextImage src={thumbnail.url} alt={thumbnail.label} width={400} height={400} />}
            />
          ))}

          {((!products && loading) || fetchingMore) && (
            <>
              <TileSkeleton />
              <TileSkeleton />
              <TileSkeleton />
              <TileSkeleton />
              <TileSkeleton />
              <TileSkeleton />
              <TileSkeleton />
              <TileSkeleton />
            </>
          )}
        </Block>
      </div>
    </Block>
  )
}

export default ProductsPage

import { FunctionComponent, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import { classes } from '../../../../lib'
import style from './Adventures.module.css'
import { Error, Block, Tile, TileSkeleton, Link, Heading } from '../../../../components'

export type AdventuresProps = {
  filter?: unknown
}

export const ADVENTURES_QUERY = gql`
  query ADVENTURES_QUERY($filter: AdventureModelFilter) {
    adventureList(filter: $filter) {
      items {
        id: _path
        adventureActivity
        adventureTitle
        adventureTripLength
        adventurePrimaryImage {
          ... on ImageRef {
            id: _path
            src: _path
          }
        }
      }
    }
  }
`

export const Adventures: FunctionComponent<AdventuresProps> = ({ filter }) => {
  const { error, data, loading, previousData } = useQuery(ADVENTURES_QUERY, { variables: { filter } })

  useEffect(() => {
    if (previousData) {
      window.scrollTo(0, 0) // reset scroll
    }
  }, [previousData])

  if (error) return <Error status={(error.networkError as any)?.response?.status} style={{ height: '100%' }} />

  return (
    <Block gap="md" columns={{ sm: '1fr', md: '1fr 1fr ', lg: '1fr 1fr 1fr', xl: '1fr 1fr 1fr 1fr' }}>
      {loading
        ? Array(5)
            .fill(null)
            .map((_, key) => (
              <TileSkeleton
                key={key}
                uniqueKey={`adventure--${key}`}
                className={classes([style.tile, style.more])}
                surface
              />
            ))
        : data.adventureList.items.map(
            ({ id, adventurePrimaryImage, adventureTitle, adventureTripLength, adventureActivity }: any) => (
              <Tile
                root={<Link href={id} />}
                className={classes([style.tile, [style.more, data.adventureList.items.length > 3]])}
                key={id}
                image={
                  <img
                    loading="lazy"
                    src={'/__aem' + adventurePrimaryImage?.src}
                    width={400}
                    height={400}
                    alt={adventureTitle}
                  />
                }
                heading={<Heading root={<h3 />}>{adventureTitle}</Heading>}
                tags={[`${adventureTripLength} ${adventureActivity}`]}
                surface
              />
            )
          )}
    </Block>
  )
}
